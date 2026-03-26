import { useState } from "react";
import { toast } from "sonner";

const ToolkitLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckout = () => {
    // Placeholder for Payhip integration
    toast.info("CHECKOUT_INITIALIZED", {
      description: "Payhip checkout modal would open here. Configure your Payhip product URL to enable.",
    });
    setIsModalOpen(true);
  };

  return (
    <div 
      data-testid="toolkit-landing-page" 
      className="min-h-screen bg-[#060606] text-white font-mono selection:bg-[#00E5FF] selection:text-black"
    >
      {/* Header - Logo Only */}
      <nav className="p-6 border-b border-[#262626]">
        <a href="/" className="inline-flex items-center gap-1 group">
          <span className="text-[#00E5FF] text-2xl font-bold transition-all group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            {`>_`}
          </span>
          <span className="tracking-[0.2em] uppercase text-sm font-bold text-[#F3F4F6]">
            THE_SYSTEMIC_ARCHITECT
          </span>
        </a>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: THE BLUEPRINT (PRODUCT IMAGE MOCKUP) */}
          <div className="relative group order-2 lg:order-1">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-[#00E5FF] opacity-20 blur-xl group-hover:opacity-30 transition duration-500"></div>
            
            <div className="relative bg-[#0F0F0F] border border-[#262626] p-8">
              {/* Asset ID */}
              <div className="mb-6">
                <span className="font-mono text-xs text-[#00E5FF]/50 tracking-[0.15em]">
                  // ASSET_ID: AI_PROOF_TOOLKIT_V2.0
                </span>
              </div>

              {/* Product Mockup */}
              <div className="aspect-square flex items-center justify-center">
                <img
                  src="https://static.prod-images.emergentagent.com/jobs/68235137-35d5-4f7f-ba5b-c75906e07605/images/21e52e087e163e20d6552815e5dcd22cf3ef245c754b3b73d09ee571809ef24f.png"
                  alt="AI-Proof Blog Architecture Toolkit"
                  className="w-full h-full object-contain"
                  data-testid="toolkit-mockup"
                />
              </div>

              {/* Bottom Info */}
              <div className="mt-6 pt-6 border-t border-[#262626] flex items-center justify-between">
                <span className="text-xs text-[#9CA3AF]">FORMAT: PDF + NOTION</span>
                <span className="text-xs text-[#00E5FF]">ARCHITECT_EDITION</span>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-[#00E5FF]/40"></div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-[#00E5FF]/40"></div>
          </div>

          {/* RIGHT: THE TECHNICAL SPECIFICATIONS */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Label */}
            <div>
              <span className="inline-block px-3 py-1 border border-[#00E5FF]/30 bg-[#00E5FF]/5 text-[#00E5FF] text-xs tracking-[0.2em] uppercase">
                // FLAGSHIP_ASSET
              </span>
            </div>

            {/* Title */}
            <h1 
              data-testid="toolkit-headline"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase leading-tight tracking-tight"
            >
              AI-Proof Blog
              <br />
              <span className="text-[#00E5FF]">Architecture Toolkit</span>
            </h1>

            {/* Description */}
            <div className="space-y-6 border-l-2 border-[#262626] pl-6">
              <p className="text-[#9CA3AF] text-sm lg:text-base leading-relaxed">
                Stop building on shifting sand. This toolkit provides the structural blueprints to insulate your content from AI volatility while automating your revenue streams.
              </p>
              
              {/* What's Inside */}
              <div className="space-y-3">
                <span className="text-xs text-[#00E5FF]/70 tracking-[0.15em] uppercase">
                  // SYSTEM_COMPONENTS
                </span>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-[#00E5FF]">+</span>
                    <div>
                      <span className="text-[#F3F4F6] uppercase tracking-wide">01: STRATEGIC DEFENSE FRAMEWORK</span>
                      <p className="text-[#9CA3AF]/70 text-xs mt-1">AI-proof positioning & authority architecture</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00E5FF]">+</span>
                    <div>
                      <span className="text-[#F3F4F6] uppercase tracking-wide">02: AUTOMATION WORKFLOW SCHEMATICS</span>
                      <p className="text-[#9CA3AF]/70 text-xs mt-1">Email sequences & content pipelines</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#00E5FF]">+</span>
                    <div>
                      <span className="text-[#F3F4F6] uppercase tracking-wide">03: MONETIZATION ENGINE BLUEPRINTS</span>
                      <p className="text-[#9CA3AF]/70 text-xs mt-1">Revenue layers & affiliate infrastructure</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="space-y-4 pt-4">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl lg:text-4xl text-[#00E5FF] font-bold">$97</span>
                <span className="text-sm text-[#9CA3AF] line-through">$197</span>
                <span className="text-xs text-[#00E5FF]/70 uppercase tracking-wider">LAUNCH_PRICING</span>
              </div>

              <button
                onClick={handleCheckout}
                data-testid="toolkit-checkout-button"
                className="w-full bg-[#00E5FF] text-[#060606] font-bold py-4 uppercase tracking-[0.15em] text-sm shadow-[0_0_15px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all"
              >
                Initialize Access_Now
              </button>

              <p className="text-[10px] text-[#9CA3AF]/50 text-center uppercase tracking-[0.2em]">
                // Secure Transaction via Payhip Protocol
              </p>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="mt-24 pt-12 border-t border-[#262626]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <span className="text-2xl text-[#00E5FF] font-bold">500+</span>
              <p className="text-xs text-[#9CA3AF] mt-2 uppercase tracking-wider">ARCHITECTS DEPLOYED</p>
            </div>
            <div>
              <span className="text-2xl text-[#00E5FF] font-bold">27+</span>
              <p className="text-xs text-[#9CA3AF] mt-2 uppercase tracking-wider">NOTION TEMPLATES</p>
            </div>
            <div>
              <span className="text-2xl text-[#00E5FF] font-bold">∞</span>
              <p className="text-xs text-[#9CA3AF] mt-2 uppercase tracking-wider">LIFETIME UPDATES</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-[#00E5FF] animate-pulse"></div>
          <span className="font-mono text-xs text-[#9CA3AF]">
            STATUS: <span className="text-[#00E5FF]">ONLINE</span> | THE_SYSTEMIC_ARCHITECT
          </span>
        </div>
      </footer>

      {/* Payhip Placeholder Modal */}
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
                  INTEGRATION_READY: Add your Payhip embed code
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

export default ToolkitLandingPage;
