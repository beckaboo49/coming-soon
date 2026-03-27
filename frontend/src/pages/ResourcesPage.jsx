import { useState, useEffect } from "react";
import { ExternalLink, Mail, ShoppingBag, Briefcase, Palette, Globe } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Fallback resources if API returns empty (moved outside component for stable reference)
const defaultResources = [
  {
    id: "1",
    name: "EmailOctopus",
    description: "Email marketing infrastructure for systematic audience building.",
    review: "The backbone of my email automation system. Clean interface, reliable deliverability, and the free tier is generous enough to build a substantial list before scaling.",
    url: "https://emailoctopus.com",
    category: "EMAIL"
  },
  {
    id: "2",
    name: "Payhip",
    description: "Digital product delivery with frictionless checkout.",
    review: "Zero-hassle digital product sales. Handles payments, delivery, and VAT automatically. The modal checkout keeps customers on your site.",
    url: "https://payhip.com",
    category: "COMMERCE"
  },
  {
    id: "3",
    name: "Notion",
    description: "Documentation and content architecture hub.",
    review: "Where I architect every piece of content before it goes live. Perfect for building interconnected knowledge systems.",
    url: "https://notion.so",
    category: "PRODUCTIVITY"
  },
  {
    id: "4",
    name: "Carrd",
    description: "Rapid landing page deployment.",
    review: "When you need a landing page live in 15 minutes. Great for testing new offers before building full infrastructure.",
    url: "https://carrd.co",
    category: "WEB"
  },
  {
    id: "5",
    name: "Canva",
    description: "Visual asset creation for consistent branding.",
    review: "Essential for creating product mockups, social graphics, and visual documentation without design overhead.",
    url: "https://canva.com",
    category: "DESIGN"
  },
  {
    id: "6",
    name: "Gumroad",
    description: "Alternative digital commerce platform.",
    review: "Solid backup commerce platform with built-in audience features. Good for creators who want discovery alongside sales.",
    url: "https://gumroad.com",
    category: "COMMERCE"
  }
];

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = [
    { id: "EMAIL", label: "EMAIL", icon: <Mail className="w-4 h-4" strokeWidth={1.5} /> },
    { id: "COMMERCE", label: "COMMERCE", icon: <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> },
    { id: "PRODUCTIVITY", label: "PRODUCTIVITY", icon: <Briefcase className="w-4 h-4" strokeWidth={1.5} /> },
    { id: "DESIGN", label: "DESIGN", icon: <Palette className="w-4 h-4" strokeWidth={1.5} /> },
    { id: "WEB", label: "WEB", icon: <Globe className="w-4 h-4" strokeWidth={1.5} /> },
  ];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`${API}/resources`);
        setResources(response.data.length > 0 ? response.data : defaultResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResources(defaultResources);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = activeCategory
    ? resources.filter((r) => r.category === activeCategory)
    : resources;

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.id === category);
    return cat ? cat.icon : <Globe className="w-4 h-4" strokeWidth={1.5} />;
  };

  return (
    <div data-testid="resources-page" className="min-h-screen pt-16 bg-[#060606]">
      {/* Hero Section */}
      <section 
        className="relative py-24 px-6 md:px-12 border-b border-[#262626]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(6,6,6,0.9), rgba(6,6,6,0.95)), url(https://images.pexels.com/photos/17489152/pexels-photo-17489152.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF]/70 uppercase">
            // REQUIRED_INFRASTRUCTURE
          </span>
          <h1 
            data-testid="resources-headline"
            className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F3F4F6] uppercase mt-4"
          >
            THE STACK
          </h1>
          <p className="text-base text-[#9CA3AF] mt-4 max-w-2xl">
            The curated infrastructure that powers The Systemic Architect. Every tool here is battle-tested and essential for building systematic content architecture.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 px-6 md:px-12 border-b border-[#262626] bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              data-testid="filter-all-resources"
              className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-[0.1em] uppercase border transition-all ${
                !activeCategory
                  ? "border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10"
                  : "border-[#262626] text-[#9CA3AF] hover:border-[#00E5FF]/50"
              }`}
            >
              [ALL_MODULES]
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                data-testid={`filter-${cat.id.toLowerCase()}`}
                className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-[0.1em] uppercase border transition-all ${
                  activeCategory === cat.id
                    ? "border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/10"
                    : "border-[#262626] text-[#9CA3AF] hover:border-[#00E5FF]/50"
                }`}
              >
                {cat.icon}
                [{cat.label}]
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-6 md:px-12 blueprint-grid">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="text-center py-16">
              <span className="font-mono text-sm text-[#9CA3AF]">LOADING_MODULES...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => (
                <div
                  key={resource.id}
                  data-testid={`affiliate-link-item-${index}`}
                  className="border border-[#262626] bg-[#0F0F0F] transition-all hover:border-[#00E5FF]/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] group"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-[#262626]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center gap-2 text-[#00E5FF]">
                        {getCategoryIcon(resource.category)}
                        <span className="font-mono text-xs tracking-[0.1em] uppercase">
                          {resource.category}
                        </span>
                      </span>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9CA3AF] hover:text-[#00E5FF] transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                      </a>
                    </div>
                    <h3 className="font-mono text-lg font-semibold text-[#F3F4F6] uppercase group-hover:text-[#00E5FF] transition-colors">
                      {resource.name}
                    </h3>
                    <p className="text-sm text-[#9CA3AF] mt-2">
                      {resource.description}
                    </p>
                  </div>

                  {/* Review */}
                  <div className="p-6">
                    <span className="font-mono text-xs tracking-[0.1em] text-[#00E5FF]/70 uppercase">
                      // ARCHITECT'S_REVIEW
                    </span>
                    <p className="text-sm text-[#9CA3AF] mt-3 leading-relaxed">
                      "{resource.review}"
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-6">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 text-center border border-[#262626] text-[#9CA3AF] font-mono text-xs uppercase transition-all hover:border-[#00E5FF] hover:text-[#00E5FF] hover:bg-[#00E5FF]/5"
                    >
                      ACCESS_MODULE →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Affiliate Disclaimer */}
      <section className="py-12 px-6 md:px-12 border-t border-[#262626] bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-xs text-[#9CA3AF]/60 tracking-wider leading-relaxed">
            // AFFILIATE_DISCLOSURE: SYSTEM_MAINTENANCE_SUPPORTED_BY_REFERRALS
            <br />
            <span className="text-[#9CA3AF]/40 mt-2 block">
              Some links on this page are affiliate links. This means if you make a purchase through these links,
              I may receive a small commission at no extra cost to you. I only recommend tools I personally use
              and trust to build systematic content infrastructure.
            </span>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12 blueprint-grid">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF] uppercase">
            // COMPLETE_YOUR_STACK
          </span>
          <h2 className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6] uppercase mt-4 mb-6">
            NEED THE BLUEPRINT?
          </h2>
          <p className="text-base text-[#9CA3AF] mb-8">
            The AI-Proof Blog Architecture Toolkit shows you exactly how to configure and connect these tools into a systematic content machine.
          </p>
          <a
            href="/depot"
            data-testid="resources-depot-link"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#00E5FF] text-[#00E5FF] font-mono text-xs tracking-[0.15em] uppercase transition-all hover:bg-[#00E5FF]/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
          >
            ACCESS_TOOLKIT
            <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
