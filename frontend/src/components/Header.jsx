import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "[COMMAND]", path: "/" },
    { name: "[DEPOT]", path: "/depot" },
    { name: "[BRIEFINGS]", path: "/briefings" },
    { name: "[THE_STACK]", path: "/stack" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header 
      data-testid="site-header"
      className="fixed top-0 left-0 right-0 z-50 bg-[#060606]/95 backdrop-blur-sm border-b border-[#262626]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            data-testid="logo-link"
            className="flex items-center gap-1 group"
          >
            <span className="font-mono text-xl text-[#00E5FF] transition-all group-hover:drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">
              {`>_`}
            </span>
            <span className="font-mono text-sm tracking-[0.2em] text-[#F3F4F6] uppercase">
              THE_SYSTEMIC_ARCHITECT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.path.replace("/", "") || "home"}`}
                className={`font-mono text-xs tracking-[0.15em] transition-all ${
                  isActive(link.path)
                    ? "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]"
                    : "text-[#9CA3AF] hover:text-[#00E5FF]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden text-[#F3F4F6] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={1.5} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            data-testid="mobile-nav"
            className="md:hidden py-6 border-t border-[#262626]"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-link-${link.path.replace("/", "") || "home"}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-mono text-sm tracking-[0.15em] py-2 transition-all ${
                    isActive(link.path)
                      ? "text-[#00E5FF]"
                      : "text-[#9CA3AF] hover:text-[#00E5FF]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
