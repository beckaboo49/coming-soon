import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, FileCode, Target, Users, ArrowRight, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const ProductPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const specs = [
    { label: "FILE_TYPE", value: "Blueprint / Digital Toolkit" },
    { label: "FORMAT", value: "PDF + Notion Templates" },
    { label: "GOAL", value: "Future-Proof Content Architecture" },
    { label: "ACCESS_LEVEL", value: "Architect's Clearance" },
    { label: "UPDATES", value: "Lifetime Access" },
    { label: "SUPPORT", value: "Private Community" },
  ];

  const features = [
    "Complete AI-Proof Content Framework",
    "27+ Interconnected Notion Templates",
    "Content Architecture Blueprint",
    "Monetization Layer System",
    "Email Automation Sequences",
    "Authority Positioning Guide",
    "SEO Systemic Strategy",
    "Affiliate Infrastructure Setup",
  ];

  const handleCheckout = () => {
    // Placeholder for Payhip integration
    toast.info("CHECKOUT_INITIALIZED", {
      description: "Payhip checkout modal would open here. Configure your Payhip product URL to enable.",
    });
    setIsModalOpen(true);
  };

  return (
    <div data-testid="product-page" className="min-h-screen pt-16 bg-[#060606]">
      {/* Hero Section */}
      <section className="py-24 px-6 md:px-12 blueprint-grid">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-8">
            <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF]/70 uppercase">
              // THE_DEPOT / FLAGSHIP_PRODUCT
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Blueprint Visual */}
            <div className="relative">
              <div className="border border-[#262626] bg-[#0F0F0F] p-8">
                {/* Product Mockup */}
                <div className="aspect-[4/3] relative overflow-hidden mb-6">
                  <img
                    src="https://static.prod-images.emergentagent.com/jobs/68235137-35d5-4f7f-ba5b-c75906e07605/images/21e52e087e163e20d6552815e5dcd22cf3ef245c754b3b73d09ee571809ef24f.png"
                    alt="AI-Proof Blog Architecture Toolkit"
                    className="w-full h-full object-contain"
                    data-testid="product-mockup"
                  />
                </div>

                {/* Version Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#9CA3AF]">VERSION: 2.0</span>
                  <span className="font-mono text-xs text-[#00E5FF]">ARCHITECT_EDITION</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l border-t border-[#00E5FF]/30"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r border-b border-[#00E5FF]/30"></div>
            </div>

            {/* Right: System Specs */}
            <div className="space-y-8">
              <div>
                <h1 
                  data-testid="product-title"
                  className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F3F4F6] uppercase mb-4"
                >
                  AI-PROOF BLOG
                  <br />
                  <span className="text-[#00E5FF]">ARCHITECTURE TOOLKIT</span>
                </h1>
                <p className="text-base text-[#9CA3AF] leading-relaxed">
                  The complete infrastructure blueprint for building a content system that establishes lasting authority, resists AI disruption, and generates systematic revenue.
                </p>
              </div>

              {/* Technical Specs */}
              <div className="border border-[#262626] bg-[#0F0F0F]">
                <div className="p-4 border-b border-[#262626]">
                  <span className="font-mono text-xs tracking-[0.15em] text-[#00E5FF] uppercase">
                    // SYSTEM_SPECIFICATIONS
                  </span>
                </div>
                <div className="divide-y divide-[#262626]">
                  {specs.map((spec, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4"
                      data-testid={`spec-${spec.label.toLowerCase().replace(/_/g, "-")}`}
                    >
                      <span className="font-mono text-xs text-[#9CA3AF]">{spec.label}:</span>
                      <span className="font-mono text-xs text-[#F3F4F6]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & CTA */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-3xl text-[#00E5FF]">$97</span>
                  <span className="font-mono text-sm text-[#9CA3AF] line-through">$197</span>
                  <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider">LAUNCH_PRICING</span>
                </div>

                <button
                  onClick={handleCheckout}
                  data-testid="product-checkout-trigger"
                  className="w-full py-4 border border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-sm tracking-[0.15em] uppercase transition-all hover:bg-[#00E5FF]/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                >
                  INITIALIZE_ACCESS
                </button>

                <p className="font-mono text-xs text-[#9CA3AF]/60 text-center">
                  // INSTANT_DELIVERY | SECURE_CHECKOUT | LIFETIME_ACCESS
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 md:px-12 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF] uppercase">
              // INCLUDED_MODULES
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6] uppercase mt-4">
              SYSTEM COMPONENTS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                data-testid={`feature-item-${index}`}
                className="flex items-center gap-4 p-4 border border-[#262626] bg-[#060606] transition-all hover:border-[#00E5FF]/30"
              >
                <Check className="w-5 h-5 text-[#00E5FF] flex-shrink-0" strokeWidth={1.5} />
                <span className="font-mono text-sm text-[#F3F4F6]">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-6 md:px-12 blueprint-grid">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF] uppercase">
              // TARGET_OPERATORS
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6] uppercase mt-4">
              WHO THIS IS FOR
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FileCode className="w-6 h-6" strokeWidth={1.25} />,
                title: "CONTENT_CREATORS",
                description: "Writers and bloggers ready to build systematic, AI-resistant content infrastructure."
              },
              {
                icon: <Target className="w-6 h-6" strokeWidth={1.25} />,
                title: "COURSE_CREATORS",
                description: "Educators looking to establish authority and build automated revenue systems."
              },
              {
                icon: <Users className="w-6 h-6" strokeWidth={1.25} />,
                title: "CONSULTANTS",
                description: "Experts ready to package their methodology into scalable digital assets."
              }
            ].map((useCase, index) => (
              <div
                key={index}
                className="border border-[#262626] bg-[#0F0F0F] p-8 transition-all hover:border-[#00E5FF]/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
              >
                <div className="text-[#00E5FF] mb-6">
                  {useCase.icon}
                </div>
                <h3 className="font-mono text-sm tracking-[0.1em] text-[#F3F4F6] uppercase mb-4">
                  {useCase.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#0F0F0F]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-[#F3F4F6] uppercase mb-6">
            READY TO BUILD YOUR
            <br />
            <span className="text-[#00E5FF]">SYSTEMIC INFRASTRUCTURE</span>?
          </h2>
          <p className="text-base text-[#9CA3AF] mb-8">
            Join 500+ architects who have deployed this system to build lasting authority and revenue.
          </p>
          <button
            onClick={handleCheckout}
            data-testid="product-checkout-bottom"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#00E5FF] bg-[#00E5FF]/10 text-[#00E5FF] font-mono text-sm tracking-[0.15em] uppercase transition-all hover:bg-[#00E5FF]/20 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            INITIALIZE_ACCESS — $97
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* Placeholder Modal for Payhip */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#060606]/90 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="border border-[#262626] bg-[#0F0F0F] p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-6">
              <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF] uppercase">
                // PAYHIP_CHECKOUT_PLACEHOLDER
              </span>
              <p className="text-sm text-[#9CA3AF]">
                This is where the Payhip checkout modal would appear. Configure your Payhip product URL to enable real checkout.
              </p>
              <div className="pt-4 border-t border-[#262626]">
                <p className="font-mono text-xs text-[#9CA3AF]/60 mb-4">
                  INTEGRATION_READY: Add your Payhip embed code here
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 border border-[#262626] text-[#9CA3AF] font-mono text-xs uppercase transition-all hover:border-[#00E5FF]/50"
                >
                  CLOSE_MODAL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
