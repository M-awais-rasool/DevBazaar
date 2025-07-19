import React, { useState, useEffect } from "react";
import { Command, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-sidebar') && !event.target.closest('.menu-trigger')) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (path: any) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: any) => {
    setIsMobileMenuOpen(false);

    if (sectionId === 'testimonials') {
      const testimonialSection = document.querySelector('.animate-marquee');
      if (testimonialSection) {
        const yOffset = -100;
        const y = testimonialSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (sectionId === 'cta') {
      const ctaSection = document.querySelector('.button-gradient');
      if (ctaSection) {
        const yOffset = -100;
        const y = ctaSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navItems = [
    { name: "Toolkits", href: "/viewAll", onClick: () => handleNavigation("/viewAll") },
    { name: "Blogs", href: "/blogs", onClick: () => handleNavigation("/blogs") },
    { name: "About", href: "/about", onClick: () => handleNavigation("/about") },
  ];

  return (
    <>
      {/* Main Navigation Header */}
      <header
        className={`fixed top-3.5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 rounded-full ${isScrolled
            ? "h-14 bg-black/40 backdrop-blur-xl border border-white/10 scale-95 w-[90%] max-w-2xl"
            : "h-14 bg-black w-[95%] max-w-3xl"
          }`}
      >
        <div className="mx-auto h-full px-4 sm:px-6">
          <nav className="flex items-center justify-between h-full">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <Command className="w-5 h-5 text-green-400" />
              <span className="font-bold text-base text-white">DevBazaar</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  className="text-sm text-gray-300 hover:text-green-400 transition-all duration-300 relative group overflow-hidden"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
                    aria-hidden="true"
                  />
                </button>
              ))}
              <button
                onClick={() => handleNavigation("/login")}
                className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm rounded-full hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
              >
                Become a Seller
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden menu-trigger p-2 text-white hover:text-green-400 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label="Toggle mobile menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`mobile-sidebar fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Command className="w-5 h-5 text-green-400" />
            <span className="font-bold text-white">DevBazaar</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-white hover:text-green-400 transition-colors duration-200"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col gap-2 p-6">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={(e) => {
                e.preventDefault();
                if (item.onClick) {
                  item.onClick();
                }
              }}
              className="text-left text-lg text-gray-300 hover:text-green-400 transition-all duration-300 relative group py-3 px-4 rounded-lg hover:bg-white/5"
            >
              <span className="relative z-10">{item.name}</span>
              <span
                className="absolute left-4 bottom-2 w-6 h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
                aria-hidden="true"
              />
            </button>
          ))}

          {/* Mobile CTA Button */}
          <button
            onClick={() => handleNavigation("/login")}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-medium rounded-full hover:from-green-500 hover:to-green-700 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Become a Seller
          </button>

          {/* Additional Mobile Actions */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <button
              onClick={() => scrollToSection('cta')}
              className="w-full text-left text-sm text-gray-400 hover:text-green-400 transition-colors duration-200 py-2 px-4 rounded-lg hover:bg-white/5"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;