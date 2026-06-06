import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaPhone, FaArrowRight } from "react-icons/fa";
import {
  getSectionPath,
  navigateToSection,
  scrollToSectionById,
} from "../../lib/sectionNavigation";
export const SECTIONS = [
  { id: "hme", label: "Home" },
  { id: "tst", label: "Trust Stats" },
  { id: "why", label: "Why Choose Us" },
  { id: "svc", label: "Services" },
  { id: "scs", label: "Screenshots" },
  { id: "cmp", label: "Companies" },
  { id: "awd", label: "Awards" },
  { id: "abt", label: "About" },
  { id: "fdr", label: "Founder" },
  { id: "tml", label: "Testimonials" },
  { id: "cns", label: "Consultation" },
  { id: "faq", label: "FAQ" },
  { id: "cst", label: "Success Stories" },
  { id: "cpr", label: "Comparison" },
];

const getCurrentSectionId = () => {
  const pathId = window.location.pathname.replace(/^\/+/, "");
  if (pathId) return pathId;

  const hashId = window.location.hash.replace(/^#/, "");
  if (hashId) return hashId;

  return "hme";
};

const updateSectionUrl = (id, method) => {
  window.history[method](null, "", getSectionPath(id));
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  const sections = SECTIONS.map((s) => s.id);

  // Background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll Spy → URL updates while scrolling
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 120;

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;

        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          updateSectionUrl(id, "replaceState");
        }
      });
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Click scroll
  const scrollToSection = (e, id) => {
    const navbarHeight = navRef.current?.offsetHeight || 80;
    navigateToSection(e, id, navbarHeight, "pushState");

    setIsOpen(false);
  };

  // Direct open scroll
  useEffect(() => {
    const targetSection = getCurrentSectionId();

    if (SECTIONS.some((section) => section.id === targetSection)) {
      updateSectionUrl(targetSection, "replaceState");
    }

    setTimeout(() => {
      const navbarHeight = navRef.current?.offsetHeight || 80;
      scrollToSectionById(targetSection, navbarHeight);
    }, 200);
  }, []);

  // Navbar visible links (only main ones)
  const navLinks = [
    "hme",
    "why",
    "svc",
    "cst",
    "tml",
    "abt",
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#111827]/95 backdrop-blur-md shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex justify-between items-center">

          {/* Logo */}
          <a href={getSectionPath("hme")} onClick={(e) => scrollToSection(e, "hme")}>
            <img
              src="/images/icons/logo.png"
              alt="AlGrowthexa"
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((id) => {
              const section = SECTIONS.find((s) => s.id === id);
              return (
                <a
                  key={id}
                  href={getSectionPath(id)}
                  onClick={(e) => scrollToSection(e, id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    scrolled
                      ? "text-neutral-300 hover:text-white hover:bg-white/5"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {section.label}
                </a>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+918979779337"
              className={`p-2.5 rounded-full transition-colors ${
                scrolled
                  ? "bg-neutral-800 text-primary-400 hover:bg-neutral-700"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <FaPhone size={16} />
            </a>

            <a
              href={getSectionPath("cns")}
              onClick={(e) => scrollToSection(e, "cns")}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-md flex items-center gap-2 ${
                scrolled
                  ? "bg-primary-600 hover:bg-primary-700 text-white"
                  : "bg-white text-primary-600 hover:bg-white/90"
              }`}
            >
              <span>Book Call</span>
              <FaArrowRight size={12} />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-72 bg-[#111827] z-50 p-6 lg:hidden shadow-xl"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="mb-6 text-white/80"
            >
              <FaTimes size={24} />
            </button>

            <div className="space-y-4">
              {navLinks.map((id) => {
                const section = SECTIONS.find((s) => s.id === id);
                return (
                  <a
                    key={id}
                    href={getSectionPath(id)}
                    onClick={(e) => scrollToSection(e, id)}
                    className="block text-white/90 hover:text-white text-lg"
                  >
                    {section.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
