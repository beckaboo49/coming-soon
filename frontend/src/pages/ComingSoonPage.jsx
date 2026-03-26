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
        toast.success("EARLY_ACCESS_GRANTED", {
          description: `You'll be notified when the system goes online: ${email}`,
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

  return (
    <div 
      data-testid="coming-soon-page" 
      className="min-h-screen bg-[#060606] blueprint-grid flex flex-col px-6"
    >
      {/* Top Left Logo */}
      <div className="py-6">
        <a href="/" className="inline-flex items-center gap-1 group">
          <span className="font-mono text-xl text-[#00E5FF] transition-all group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
            {`>_`}
          </span>
          <span className="font-mono text-sm tracking-[0.2em] text-[#F3F4F6] uppercase">
            THE_SYSTEMIC_ARCHITECT
          </span>
        </a>
      </div>

      <div className="flex-1 flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        {/* System Status */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-[#00E5FF]/70 uppercase">
            <span className="w-2 h-2 bg-[#00E5FF] animate-pulse"></span>
            // SYSTEM_EXPANSION_IN_PROGRESS
          </span>
        </div>

        {/* Main Title */}
        <h1 
          data-testid="coming-soon-headline"
          className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F3F4F6] uppercase mb-4"
        >
          SYSTEM
          <br />
          <span className="text-[#00E5FF]">OFFLINE</span>
        </h1>

        <p className="text-base text-[#9CA3AF] mb-12 max-w-md mx-auto">
          The AI-Proof Blog Architecture Toolkit is being deployed. Enter your access code to receive priority initialization.
        </p>

        {/* Progress Bar Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-[#9CA3AF]">DEPLOYMENT_PROGRESS</span>
            <span className="font-mono text-xs text-[#00E5FF]">{progress}%</span>
          </div>
          
          {/* Progress Bar Container */}
          <div className="h-2 bg-[#0F0F0F] border border-[#262626] overflow-hidden">
            <div 
              className="h-full bg-[#00E5FF] transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-[#00E5FF] animate-pulse opacity-50"></div>
            </div>
          </div>

          {/* Status Messages */}
          <div className="mt-4 space-y-1 text-left font-mono text-xs text-[#9CA3AF]/60">
            <p className={progress >= 20 ? "text-[#00E5FF]/70" : ""}>
              {progress >= 20 ? "✓" : "○"} CORE_INFRASTRUCTURE_LOADED
            </p>
            <p className={progress >= 45 ? "text-[#00E5FF]/70" : ""}>
              {progress >= 45 ? "✓" : "○"} CONTENT_ARCHITECTURE_DEPLOYED
            </p>
            <p className={progress >= 65 ? "text-[#00E5FF]/70" : ""}>
              {progress >= 65 ? "✓" : "○"} MONETIZATION_LAYER_CONFIGURED
            </p>
            <p className={progress >= 87 ? "text-[#00E5FF]/70 animate-pulse" : ""}>
              {progress >= 87 ? "◉" : "○"} FINAL_CALIBRATION_IN_PROGRESS...
            </p>
          </div>
        </div>

        {/* Terminal Email Capture */}
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
              <span className="ml-4 font-mono text-xs text-[#9CA3AF]">early_access.sh</span>
            </div>

            {/* Terminal Content */}
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="text-left mb-4">
                <p className="font-mono text-xs text-[#9CA3AF]">
                  // REQUEST_EARLY_ACCESS
                </p>
                <p className="font-mono text-xs text-[#9CA3AF]/60 mt-1">
                  // Be first in line when the system goes online
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
                {isLoading ? "PROCESSING..." : "REQUEST_PRIORITY_ACCESS"}
              </button>
            </form>
          </div>
        </div>

        {/* Footer Status */}
        <div className="mt-12 flex items-center justify-center gap-3">
          <div className="w-2 h-2 bg-[#FFBD2E] animate-pulse"></div>
          <span className="font-mono text-xs tracking-[0.1em] text-[#9CA3AF]">
            STATUS: <span className="text-[#FFBD2E]">DEPLOYING</span> | ETA: <span className="text-[#00E5FF]">SOON</span>
          </span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;
