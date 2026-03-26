import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ComingSoonPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Animate progress bar to 87%
  useEffect(() => {
    const targetProgress = 87;
    const duration = 2000;
    const steps = 60;
    const increment = targetProgress / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= targetProgress) {
        setProgress(targetProgress);
        clearInterval(interval);
      } else {
        setProgress(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${API}/subscribe`, { email });
      if (response.data.success) {
        toast.success("BETA_ACCESS_GRANTED", {
          description: `You're on the list. System launch notification queued for: ${email}`,
        });
        setEmail("");
      }
    } catch (error) {
      toast.error("ACCESS_DENIED", {
        description: error.response?.data?.detail || "System error. Please retry.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      data-testid="coming-soon-page" 
      className="min-h-screen bg-[#060606] blueprint-grid flex flex-col px-6"
    >
      {/* Top Left Logo */}
      <div className="py-6">
        <div className="inline-flex items-center gap-1">
          <span className="font-mono text-xl text-[#00E5FF]">
            {`>_`}
          </span>
          <span className="font-mono text-sm tracking-[0.2em] text-[#F3F4F6] uppercase">
            THE_SYSTEMIC_ARCHITECT
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center pb-16">
        <div className="max-w-3xl w-full text-center">
          {/* System Status */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#00E5FF]/70 uppercase">
              <span className="w-2 h-2 bg-[#00E5FF] animate-pulse"></span>
              // SYSTEM_EXPANSION_IN_PROGRESS
            </span>
          </div>

          {/* Main Title - Brand Focused */}
          <h1 
            data-testid="coming-soon-headline"
            className="font-mono text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#F3F4F6] uppercase mb-6"
          >
            THE SYSTEM IS
            <br />
            <span className="text-[#00E5FF]">INITIALIZING</span>
          </h1>

          <p className="text-base lg:text-lg text-[#9CA3AF] mb-12 max-w-2xl mx-auto leading-relaxed">
            A new architecture for content creation is being deployed. One that resists AI disruption, compounds authority, and generates systematic revenue. The old way of blogging is obsolete.
          </p>

          {/* Progress Bar Section */}
          <div className="mb-12 max-w-xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#9CA3AF]">SYSTEM_DEPLOYMENT</span>
              <span className="font-mono text-xs text-[#00E5FF]">{progress}%</span>
            </div>
            
            {/* Progress Bar Container */}
            <div className="h-2 bg-[#0F0F0F] border border-[#262626] overflow-hidden">
              <div 
                className="h-full bg-[#00E5FF] transition-all duration-100 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-[#00E5FF] animate-pulse opacity-50"></div>
              </div>
            </div>

            {/* Status Messages - Brand/Platform Focused */}
            <div className="mt-6 space-y-2 text-left font-mono text-xs">
              <p className={progress >= 25 ? "text-[#00E5FF]/80" : "text-[#9CA3AF]/40"}>
                {progress >= 25 ? "✓" : "○"} AUTHORITY_FRAMEWORK_LOADED
              </p>
              <p className={progress >= 50 ? "text-[#00E5FF]/80" : "text-[#9CA3AF]/40"}>
                {progress >= 50 ? "✓" : "○"} AUTOMATION_INFRASTRUCTURE_DEPLOYED
              </p>
              <p className={progress >= 75 ? "text-[#00E5FF]/80" : "text-[#9CA3AF]/40"}>
                {progress >= 75 ? "✓" : "○"} REVENUE_ARCHITECTURE_CONFIGURED
              </p>
              <p className={progress >= 87 ? "text-[#00E5FF] animate-pulse" : "text-[#9CA3AF]/40"}>
                {progress >= 87 ? "◉" : "○"} FINAL_SYSTEM_CALIBRATION...
              </p>
            </div>
          </div>

          {/* Terminal Email Capture - Beta Access */}
          <div 
            data-testid="coming-soon-email-capture"
            className="max-w-md mx-auto"
          >
            <div className="border border-[#262626] bg-[#0F0F0F]/80 p-6">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#262626]">
                <div className="w-3 h-3 bg-[#FF5F56]"></div>
                <div className="w-3 h-3 bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 bg-[#27CA3F]"></div>
                <span className="ml-4 font-mono text-xs text-[#9CA3AF]">beta_access.sh</span>
              </div>

              {/* Terminal Content */}
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="text-left mb-4">
                  <p className="font-mono text-xs text-[#9CA3AF]">
                    // REQUEST_BETA_ACCESS
                  </p>
                  <p className="font-mono text-xs text-[#9CA3AF]/60 mt-1">
                    // Be first when The System goes live
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[#00E5FF]">&gt;</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER_ACCESS_CODE@EMAIL.COM"
                    data-testid="coming-soon-email-input"
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
                  data-testid="coming-soon-submit"
                  className="w-full py-3 border border-[#00E5FF] text-[#00E5FF] font-mono text-xs tracking-[0.15em] uppercase transition-all hover:bg-[#00E5FF]/10 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "PROCESSING..." : "REQUEST_BETA_ACCESS"}
                </button>
              </form>

              <p className="mt-4 font-mono text-xs text-[#9CA3AF]/40 text-center">
                // 847 ARCHITECTS ALREADY IN QUEUE
              </p>
            </div>
          </div>

          {/* Footer Status */}
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-[#FFBD2E] animate-pulse"></div>
            <span className="font-mono text-xs tracking-[0.1em] text-[#9CA3AF]">
              STATUS: <span className="text-[#FFBD2E]">DEPLOYING</span> | THE_SYSTEMIC_ARCHITECT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
