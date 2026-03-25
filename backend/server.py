from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import requests
from hashlib import md5

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# EmailOctopus config
EMAILOCTOPUS_API_KEY = os.environ.get('EMAILOCTOPUS_API_KEY', '')
EMAILOCTOPUS_BASE_URL = "https://api.emailoctopus.com"

# Create the main app
app = FastAPI(title="The Systemic Architect API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ MODELS ============

class SubscriberCreate(BaseModel):
    email: EmailStr

class SubscriberResponse(BaseModel):
    success: bool
    message: str
    email: Optional[str] = None

class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    slug: str
    excerpt: str
    content: str
    tag: str  # STRATEGY, AUTOMATION, MONETIZATION
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    suggested_posts: List[str] = []  # List of related post slugs

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    tag: str
    suggested_posts: List[str] = []

class Resource(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    review: str
    url: str
    category: str

# ============ EMAILOCTOPUS SERVICE ============

class EmailOctopusService:
    def __init__(self):
        self.api_key = EMAILOCTOPUS_API_KEY
        self.base_url = EMAILOCTOPUS_BASE_URL
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
    
    def get_lists(self):
        """Get all lists from EmailOctopus"""
        try:
            response = requests.get(
                f"{self.base_url}/api/1.6/lists",
                headers=self.headers,
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except Exception as e:
            logger.error(f"Error fetching lists: {e}")
            return None
    
    def add_subscriber(self, list_id: str, email: str):
        """Add subscriber to a list"""
        try:
            data = {
                "email_address": email,
                "status": "SUBSCRIBED"
            }
            response = requests.post(
                f"{self.base_url}/api/1.6/lists/{list_id}/contacts",
                json=data,
                headers=self.headers,
                timeout=10
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 409:
                # Already subscribed
                return {"status": "MEMBER_EXISTS_WITH_EMAIL_ADDRESS"}
            raise
        except Exception as e:
            logger.error(f"Error adding subscriber: {e}")
            raise

emailoctopus_service = EmailOctopusService()

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "The Systemic Architect API - STATUS: ONLINE"}

# EmailOctopus routes
@api_router.get("/emailoctopus/lists")
async def get_emailoctopus_lists():
    """Get all EmailOctopus lists"""
    lists = emailoctopus_service.get_lists()
    if lists:
        return lists
    raise HTTPException(status_code=500, detail="Failed to fetch lists")

@api_router.post("/subscribe/{list_id}", response_model=SubscriberResponse)
async def subscribe_to_list(list_id: str, subscriber: SubscriberCreate):
    """Subscribe email to a specific list"""
    try:
        result = emailoctopus_service.add_subscriber(list_id, subscriber.email)
        
        if result.get("status") == "MEMBER_EXISTS_WITH_EMAIL_ADDRESS":
            return SubscriberResponse(
                success=True,
                message="ACCESS_ALREADY_GRANTED",
                email=subscriber.email
            )
        
        # Also store in MongoDB for backup
        await db.subscribers.update_one(
            {"email": subscriber.email},
            {"$set": {
                "email": subscriber.email,
                "subscribed_at": datetime.now(timezone.utc).isoformat(),
                "list_id": list_id
            }},
            upsert=True
        )
        
        return SubscriberResponse(
            success=True,
            message="ACCESS_GRANTED",
            email=subscriber.email
        )
    except Exception as e:
        logger.error(f"Subscription error: {e}")
        raise HTTPException(status_code=400, detail=f"SUBSCRIPTION_FAILED: {str(e)}")

@api_router.post("/subscribe", response_model=SubscriberResponse)
async def subscribe_fallback(subscriber: SubscriberCreate):
    """Fallback subscription - stores in MongoDB when no list specified"""
    try:
        # Store in MongoDB
        await db.subscribers.update_one(
            {"email": subscriber.email},
            {"$set": {
                "email": subscriber.email,
                "subscribed_at": datetime.now(timezone.utc).isoformat()
            }},
            upsert=True
        )
        
        return SubscriberResponse(
            success=True,
            message="ACCESS_GRANTED",
            email=subscriber.email
        )
    except Exception as e:
        logger.error(f"Subscription error: {e}")
        raise HTTPException(status_code=400, detail=f"SUBSCRIPTION_FAILED: {str(e)}")

# Blog routes
@api_router.get("/posts", response_model=List[BlogPost])
async def get_posts(tag: Optional[str] = None):
    """Get all blog posts, optionally filtered by tag"""
    query = {}
    if tag:
        query["tag"] = tag.upper()
    
    posts = await db.posts.find(query, {"_id": 0}).sort("created_at", -1).to_list(100)
    
    for post in posts:
        if isinstance(post.get('created_at'), str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
    
    return posts

@api_router.get("/posts/{slug}", response_model=BlogPost)
async def get_post(slug: str):
    """Get single blog post by slug"""
    post = await db.posts.find_one({"slug": slug}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="POST_NOT_FOUND")
    
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    
    return post

@api_router.post("/posts", response_model=BlogPost)
async def create_post(post_data: BlogPostCreate):
    """Create a new blog post"""
    post = BlogPost(**post_data.model_dump())
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.posts.insert_one(doc)
    return post

# Resources routes
@api_router.get("/resources", response_model=List[Resource])
async def get_resources():
    """Get all affiliate resources"""
    resources = await db.resources.find({}, {"_id": 0}).to_list(100)
    return resources

@api_router.post("/resources", response_model=Resource)
async def create_resource(resource: Resource):
    """Create a new resource"""
    doc = resource.model_dump()
    await db.resources.insert_one(doc)
    return resource

# Seed data endpoint (for initial setup)
@api_router.post("/seed")
async def seed_data():
    """Seed initial blog posts and resources"""
    
    # Sample blog posts
    posts = [
        {
            "id": str(uuid.uuid4()),
            "title": "The Architecture of AI-Proof Content Systems",
            "slug": "ai-proof-content-systems",
            "excerpt": "Why your blog needs a systemic architecture that AI cannot replicate, and how to build one from the ground up.",
            "content": """<p>In an age where AI can generate content at scale, the true differentiator is <strong>architecture</strong>—not just words, but the systematic structure behind them.</p>

<div class="systemic-note">
<strong>SYSTEMIC_NOTE:</strong> The future belongs to those who build systems, not those who write articles. Your content should be a blueprint, not a paragraph.
</div>

<h2>The Three Pillars of AI-Proof Architecture</h2>

<p>1. <strong>Interconnected Knowledge Graphs</strong> - Every piece of content should link to and reinforce other pieces.</p>
<p>2. <strong>Personal Authority Markers</strong> - Embed your unique methodology, frameworks, and terminology.</p>
<p>3. <strong>System Documentation</strong> - Treat your content like technical documentation for your expertise.</p>

<div class="systemic-note">
<strong>ACTION_ITEM:</strong> Map your content architecture before writing a single word. The structure IS the strategy.
</div>""",
            "tag": "STRATEGY",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "suggested_posts": ["automation-blueprint", "monetization-funnel"]
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Automation Blueprint: The Email Sequence Architecture",
            "slug": "automation-blueprint",
            "excerpt": "Build email sequences that operate like precision machinery—systematic, reliable, and converting 24/7.",
            "content": """<p>Your email list is not a list. It's a <strong>conversion machine</strong>. And like any machine, it needs proper engineering.</p>

<div class="systemic-note">
<strong>SYSTEMIC_NOTE:</strong> Every email should have exactly ONE purpose: move the subscriber to the next stage of the system.
</div>

<h2>The 7-Day Initialization Sequence</h2>

<p><strong>Day 0:</strong> Welcome + System Overview (Set expectations)</p>
<p><strong>Day 1:</strong> Quick Win Delivery (Build trust)</p>
<p><strong>Day 3:</strong> Authority Positioning (Share your framework)</p>
<p><strong>Day 5:</strong> Social Proof Integration (Case studies)</p>
<p><strong>Day 7:</strong> Soft CTA (Introduce paid offerings)</p>

<div class="systemic-note">
<strong>TECHNICAL_SPEC:</strong> Optimal send times: 8:47 AM or 7:23 PM local time. Odd times increase open rates by 12-18%.
</div>""",
            "tag": "AUTOMATION",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "suggested_posts": ["ai-proof-content-systems", "monetization-funnel"]
        },
        {
            "id": str(uuid.uuid4()),
            "title": "Monetization Funnel: The Revenue Architecture",
            "slug": "monetization-funnel",
            "excerpt": "Transform your content ecosystem into a revenue-generating infrastructure with systematic monetization layers.",
            "content": """<p>Revenue isn't random. It's <strong>architected</strong>. Your monetization strategy should be as systematic as your content strategy.</p>

<div class="systemic-note">
<strong>SYSTEMIC_NOTE:</strong> The goal isn't to sell—it's to build infrastructure that converts traffic into revenue automatically.
</div>

<h2>The Four-Layer Revenue Stack</h2>

<p><strong>Layer 1: Affiliate Infrastructure</strong> - Curated tools you actually use, positioned as "Required Infrastructure"</p>
<p><strong>Layer 2: Digital Products</strong> - Packaged expertise (toolkits, templates, blueprints)</p>
<p><strong>Layer 3: Services</strong> - High-touch implementation (consulting, audits)</p>
<p><strong>Layer 4: Licensing</strong> - Your frameworks licensed to others</p>

<div class="systemic-note">
<strong>REVENUE_RULE:</strong> Each layer should feed into the next. Affiliate links → Product sales → Service inquiries → Licensing deals.
</div>""",
            "tag": "MONETIZATION",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "suggested_posts": ["ai-proof-content-systems", "automation-blueprint"]
        }
    ]
    
    # Sample resources
    resources = [
        {
            "id": str(uuid.uuid4()),
            "name": "EmailOctopus",
            "description": "Email marketing infrastructure for systematic audience building.",
            "review": "The backbone of my email automation system. Clean interface, reliable deliverability, and the free tier is generous enough to build a substantial list before scaling.",
            "url": "https://emailoctopus.com",
            "category": "EMAIL"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Payhip",
            "description": "Digital product delivery with frictionless checkout.",
            "review": "Zero-hassle digital product sales. Handles payments, delivery, and VAT automatically. The modal checkout keeps customers on your site.",
            "url": "https://payhip.com",
            "category": "COMMERCE"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Notion",
            "description": "Documentation and content architecture hub.",
            "review": "Where I architect every piece of content before it goes live. Perfect for building interconnected knowledge systems.",
            "url": "https://notion.so",
            "category": "PRODUCTIVITY"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Carrd",
            "description": "Rapid landing page deployment.",
            "review": "When you need a landing page live in 15 minutes. Great for testing new offers before building full infrastructure.",
            "url": "https://carrd.co",
            "category": "WEB"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Canva",
            "description": "Visual asset creation for consistent branding.",
            "review": "Essential for creating product mockups, social graphics, and visual documentation without design overhead.",
            "url": "https://canva.com",
            "category": "DESIGN"
        },
        {
            "id": str(uuid.uuid4()),
            "name": "Gumroad",
            "description": "Alternative digital commerce platform.",
            "review": "Solid backup commerce platform with built-in audience features. Good for creators who want discovery alongside sales.",
            "url": "https://gumroad.com",
            "category": "COMMERCE"
        }
    ]
    
    # Insert if not exists
    for post in posts:
        await db.posts.update_one(
            {"slug": post["slug"]},
            {"$set": post},
            upsert=True
        )
    
    for resource in resources:
        await db.resources.update_one(
            {"name": resource["name"]},
            {"$set": resource},
            upsert=True
        )
    
    return {"message": "DATA_SEEDED", "posts": len(posts), "resources": len(resources)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
