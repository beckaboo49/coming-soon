import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "PRIVACY_PROTOCOL", path: "/privacy" },
    { name: "TERMS_OF_SERVICE", path: "/terms" },
    { name: "AFFILIATE_DISCLOSURE", path: "/disclosure" },
  ];

  const socialLinks = [
    { 
      name: "Pinterest", 
      url: "https://pinterest.com", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.94-.2-2.4.04-3.43.2-.93 1.37-5.82 1.37-5.82s-.35-.7-.35-1.72c0-1.61.94-2.82 2.1-2.82 1 0 1.48.75 1.48 1.65 0 1-.64 2.5-.97 3.9-.28 1.17.59 2.12 1.74 2.12 2.08 0 3.68-2.2 3.68-5.37 0-2.81-2.02-4.78-4.9-4.78-3.34 0-5.3 2.5-5.3 5.09 0 1 .4 2.1.88 2.7.1.12.11.22.08.34-.09.38-.3 1.17-.34 1.34-.05.22-.18.26-.41.16-1.55-.72-2.5-2.97-2.5-4.78 0-3.89 2.82-7.46 8.15-7.46 4.28 0 7.6 3.05 7.6 7.12 0 4.25-2.68 7.67-6.4 7.67-1.25 0-2.42-.65-2.83-1.42l-.77 2.93c-.28 1.08-1.04 2.43-1.55 3.26A12 12 0 1 0 12 0z"/>
        </svg>
      )
    },
    { 
      name: "Facebook", 
      url: "https://facebook.com", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/>
        </svg>
      )
    },
    { 
      name: "Instagram", 
      url: "https://instagram.com", 
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>
        </svg>
      )
    },
  ];

  return (
    <footer 
      data-testid="site-footer"
      className="bg-[#060606] border-t border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="font-mono text-lg text-[#00E5FF]">
                {`>_`}
              </span>
              <span className="font-mono text-xs tracking-[0.2em] text-[#F3F4F6] uppercase">
                THE_SYSTEMIC_ARCHITECT
              </span>
            </div>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              Building AI-proof content infrastructure. Systematic approaches to audience building, monetization, and digital product architecture.
            </p>
          </div>

          {/* Quick Start */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs tracking-[0.15em] text-[#00E5FF] uppercase">
              // QUICK_ACCESS
            </h4>
            <div className="space-y-2">
              <Link 
                to="/depot" 
                data-testid="footer-depot-link"
                className="block font-mono text-xs text-[#9CA3AF] hover:text-[#00E5FF] transition-colors"
              >
                → AI-Proof Blog Architecture Toolkit
              </Link>
              <Link 
                to="/briefings" 
                data-testid="footer-briefings-link"
                className="block font-mono text-xs text-[#9CA3AF] hover:text-[#00E5FF] transition-colors"
              >
                → Latest Briefings
              </Link>
              <Link 
                to="/stack" 
                data-testid="footer-stack-link"
                className="block font-mono text-xs text-[#9CA3AF] hover:text-[#00E5FF] transition-colors"
              >
                → Required Infrastructure
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs tracking-[0.15em] text-[#00E5FF] uppercase">
              // CONNECT
            </h4>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-link-${social.name.toLowerCase()}`}
                  className="text-[#9CA3AF] hover:text-[#00E5FF] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)] transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8 pt-8 border-t border-[#262626]">
          {footerLinks.map((link, index) => (
            <span key={link.path} className="flex items-center">
              <Link
                to={link.path}
                data-testid={`footer-legal-${link.name.toLowerCase().replace(/_/g, "-")}`}
                className="font-mono text-xs text-[#9CA3AF] hover:text-[#00E5FF] transition-colors"
              >
                {link.name}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="text-[#262626] mx-4">|</span>
              )}
            </span>
          ))}
        </div>

        {/* Affiliate Disclaimer */}
        <div className="text-center mb-8">
          <p className="font-mono text-xs text-[#9CA3AF]/60 tracking-wider">
            // AFFILIATE_DISCLOSURE: SYSTEM_MAINTENANCE_SUPPORTED_BY_REFERRALS
          </p>
        </div>

        {/* Status Bar */}
        <div 
          data-testid="system-status-indicator"
          className="flex items-center justify-center gap-3 pt-8 border-t border-[#262626]"
        >
          <div className="status-dot rounded-none"></div>
          <span className="font-mono text-xs tracking-[0.1em] text-[#9CA3AF]">
            STATUS: <span className="text-[#00E5FF]">ONLINE</span> | SYSTEM_STABILITY: <span className="text-[#00E5FF]">100%</span> | © {currentYear} THE_SYSTEMIC_ARCHITECT
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
