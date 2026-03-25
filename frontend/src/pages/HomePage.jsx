import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Database, Cpu } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Seed data on first load
  useEffect(() => {
    const seedData = async () => {
      try {
        await axios.post(`${API}/seed`);
      } catch (e) {
        console.log("Seed already done or error:", e);
      }
    };
    seedData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/subscribe`, { email });
      if (response.data.success) {
        toast.success(response.data.message, {
          description: `Access granted for: ${email}`,
        });
        setEmail("");
      }
    } catch (error) {
      toast.error("SUBSCRIPTION_FAILED", {
        description: error.response?.data?.detail || "Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Database className="w-6 h-6" strokeWidth={1.25} />,
      title: "SYSTEMIC_ARCHITECTURE",
      description: "Build content systems that compound, not just articles that decay.",
    },
    {
      icon: <Cpu className="w-6 h-6" strokeWidth={1.25} />,
      title: "AI_PROOF_METHODOLOGY",
      description: "Frameworks and structures that AI cannot replicate or replace.",
    },
    {
      icon: <Zap className="w-6 h-6" strokeWidth={1.25} />,
      title: "AUTOMATED_REVENUE",
      description: "Infrastructure that converts traffic into revenue 24/7.",
    },
  ];

  return (
    <div data-testid="home-page" className="min-h-screen pt-16">
      {/* Hero Section */}
      <section 
        data-testid="hero-section"
        className="relative min-h-[90vh] flex items-center justify-center blueprint-grid overflow-hidden"
      >
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(https://static.prod-images.emergentagent.com/jobs/68235137-35d5-4f7f-ba5b-c75906e07605/images/5c434010c3a24787b4621fb4f0c89b1883ac3746fed0c94daad88b4ce5e788c1.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/80 via-transparent to-[#060606]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center">
          {/* System Init Message */}
          <div className="mb-8">
            <span className="inline-block font-mono text-xs tracking-[0.2em] text-[#00E5FF]/70 uppercase">
              // INITIALIZING_SYSTEM...
            </span>
          </div>

          {/* Glitch Headline */}
          <h1 
            data-testid="hero-headline"
            className="font-mono text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#F3F4F6] uppercase mb-6 glitch-text"
          >
            THE SYSTEMIC
            <br />
            <span className="text-[#00E5FF]">ARCHITECT</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base lg:text-lg text-[#9CA3AF] max-w-2xl mx-auto mb-12 leading-relaxed">
            Build AI-proof blog infrastructure that generates authority, automates growth, and compounds revenue—systematically.
          </p>

          {/* Terminal Email Capture */}
          <div 
            data-testid="terminal-email-capture"
            className="max-w-lg mx-auto"
          >
            <div className="border border-[#262626] bg-[#0F0F0F]/80 p-6">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#262626]">
                <div className="w-3 h-3 bg-[#FF5F56]"></div>
                <div className="w-3 h-3 bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 bg-[#27CA3F]"></div>
                <span className="ml-4 font-mono text-xs text-[#9CA3AF]">access_terminal.sh</span>
              </div>

              {/* Terminal Content */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#00E5FF]">&gt;</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER_ACCESS_CODE@EMAIL.COM"
                    data-testid="terminal-email-input"
                    className="flex-1 bg-transparent border-none outline-none font-mono text-[#00E5FF] placeholder:text-[#00E5FF]/30 text-sm"
                  />
                  <span 
                    className="font-mono text-[#00E5FF]"
                    style={{ opacity: cursorVisible ? 1 : 0 }}
                  >
                    █
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  data-testid="terminal-email-submit"
                  className="w-full py-3 border border-[#00E5FF] text-[#00E5FF] font-mono text-xs tracking-[0.15em] uppercase transition-all hover:bg-[#00E5FF]/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "PROCESSING..." : "INITIALIZE_ACCESS"}
                </button>
              </form>

              <p className="mt-4 font-mono text-xs text-[#9CA3AF]/60 text-center">
                // JOIN 1,000+ ARCHITECTS BUILDING SYSTEMIC CONTENT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        data-testid="features-section"
        className="py-24 px-6 md:px-12 bg-[#060606]"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF] uppercase">
              // CORE_MODULES
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F3F4F6] uppercase mt-4">
              THE INFRASTRUCTURE
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                data-testid={`feature-card-${index}`}
                className="border border-[#262626] bg-[#0F0F0F] p-8 transition-all hover:border-[#00E5FF]/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] group"
              >
                <div className="text-[#00E5FF] mb-6 transition-all group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
                  {feature.icon}
                </div>
                <h3 className="font-mono text-sm tracking-[0.1em] text-[#F3F4F6] uppercase mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#9CA3AF] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        data-testid="cta-section"
        className="py-24 px-6 md:px-12 blueprint-grid"
      >
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs tracking-[0.2em] text-[#00E5FF] uppercase">
            // FLAGSHIP_PRODUCT
          </span>
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F3F4F6] uppercase mt-4 mb-6">
            AI-PROOF BLOG ARCHITECTURE TOOLKIT
          </h2>
          <p className="text-base text-[#9CA3AF] max-w-2xl mx-auto mb-8">
            The complete blueprint for building a content system that establishes authority, resists AI disruption, and generates revenue on autopilot.
          </p>
          <Link
            to="/depot"
            data-testid="cta-depot-link"
            className="inline-flex items-center gap-3 px-8 py-4 border border-[#00E5FF] text-[#00E5FF] font-mono text-xs tracking-[0.15em] uppercase transition-all hover:bg-[#00E5FF]/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
          >
            ACCESS_BLUEPRINT
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
