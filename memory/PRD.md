# The Systemic Architect - PRD

## Original Problem Statement
Build a comprehensive Digital Headquarters for 'The Systemic Architect' empire with:
- Command Center (Home Page) with glitch headline, blueprint grid, terminal email capture
- Depot (Product Page) for AI-Proof Blog Architecture Toolkit
- Signal (Blog/Briefings) with systemic tags and notes
- Infrastructure (The Stack) for affiliate resources
- Technical requirements: Electric Blue (#00E5FF) + Deep Black (#060606), JetBrains Mono + Inter fonts

## User Personas
1. **Content Creators** - Writers/bloggers building systematic, AI-resistant content infrastructure
2. **Course Creators** - Educators establishing authority and automated revenue systems
3. **Consultants** - Experts packaging methodology into scalable digital assets

## Core Requirements
- Terminal-style email capture with EmailOctopus integration (fallback to MongoDB)
- Blueprint grid background (40px CSS grid)
- Glitch text effect on headlines
- Sharp corners (no rounded borders)
- Electric Blue neon glow on hover
- Mobile-responsive "Command" experience

## What's Been Implemented (Jan 2026)
- [x] Homepage with glitch headline, terminal email capture, features grid
- [x] Depot product page with isometric mockup, system specs, Payhip placeholder
- [x] Briefings blog page with tag filtering ([STRATEGY], [AUTOMATION], [MONETIZATION])
- [x] Individual blog post pages with systemic notes, suggested infrastructure
- [x] The Stack affiliate resources page with category filtering
- [x] Header with encrypted access bar navigation
- [x] Footer with system status bar, social links, affiliate disclaimer
- [x] Backend API: posts, resources, subscription endpoints
- [x] MongoDB integration for data storage
- [x] Seeded sample blog posts and affiliate resources

## Tech Stack
- Frontend: React 19, Tailwind CSS, Lucide React icons
- Backend: FastAPI, Motor (async MongoDB)
- Database: MongoDB
- Fonts: JetBrains Mono (headings), Inter (body)

## P0 Features (Complete)
- Homepage with email capture
- Product showcase page
- Blog with filtering
- Affiliate resources page
- Navigation and footer

## P1 Features (Backlog)
- Payhip actual integration (placeholder currently)
- EmailOctopus list integration (requires valid list ID)
- Blog search functionality enhancement
- Admin panel for content management

## P2 Features (Future)
- Newsletter automation sequences
- Analytics dashboard
- A/B testing for conversion
- Membership/gated content

## Next Tasks
1. Configure Payhip product URL for real checkout
2. Add EmailOctopus list ID for direct list subscription
3. Add more blog content
4. Set up actual affiliate tracking links
