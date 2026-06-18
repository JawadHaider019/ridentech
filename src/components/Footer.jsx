import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Sparkles } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);
  const columnsRef = useRef([]);
  const newsletterRef = useRef(null);
  const bigLogoRef = useRef(null);
  const privacyLinksRef = useRef(null);
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Targets to animate — visible by default, revealed on scroll
    const revealTargets = [
      newsletterRef.current,
      ...columnsRef.current.filter(Boolean),
      privacyLinksRef.current,
    ].filter(Boolean);

    if (revealTargets.length > 0) {
      gsap.set(revealTargets, { opacity: 0, y: 35 });
    }
    if (bigLogoRef.current) {
      gsap.set(bigLogoRef.current, { opacity: 0, y: 20 });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Reveal newsletter + columns + privacy in stagger
            gsap.to(revealTargets, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
            });
            // Big logo fades in last
            if (bigLogoRef.current) {
              gsap.to(bigLogoRef.current, {
                opacity: 1,
                y: 0,
                duration: 1.2,
                delay: 0.4,
                ease: "power4.out",
              });
            }
            // Ambient sparkle pulse
            gsap.to(".sparkle-icon", {
              scale: 1.1,
              rotate: 5,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: 0.8,
            });
            // Ambient logo pulse
            if (bigLogoRef.current) {
              gsap.to(bigLogoRef.current, {
                scale: 1.03,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.5,
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.08 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    const targets = [...revealTargets];
    const logo = bigLogoRef.current;
    return () => {
      observer.disconnect();
      gsap.killTweensOf([...targets, logo, ".sparkle-icon"]);
      gsap.set([...targets, logo], { clearProps: "all" });
    };
  }, [mounted, pathname]);

  // Function to handle service navigation (same as in Navbar)
  const handleServiceNavigation = (e, href, serviceTitle) => {
    e.preventDefault();

    // Create a URL-friendly ID from the service title
    const serviceId = serviceTitle.toLowerCase()
      .replace(/[&]/g, 'and')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    // If we're already on the services page, just scroll
    if (pathname === '/services') {
      setTimeout(() => {
        const element = document.getElementById(serviceId);
        if (element) {
          const yOffset = -100;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Navigate to services page with hash
      navigate(`/services#${serviceId}`);
    }
  };


  // Hover handlers for links
  const handleLinkEnter = (e) => {
    gsap.to(e.currentTarget, {
      x: 5,
      color: "#ffffff",
      duration: 0.2,
      ease: "power1.out"
    });
  };

  const handleLinkLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: "#9ca3af",
      duration: 0.2,
      ease: "power1.out"
    });
  };

  // Hover handlers for subscribe button
  const handleSubscribeEnter = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(255,255,255,0.2)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleSubscribeLeave = (e) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Services data - 6 main services (matching your SERVICES array in Services.jsx)
  const services = [
    { name: "Custom Software Development", href: "/services", id: "custom-software-development" },
    { name: "Web & PWA Engineering", href: "/services", id: "web-pwa-engineering" },
    { name: "Mobile App Development", href: "/services", id: "mobile-app-development" },
    { name: "API & Systems Integration", href: "/services", id: "api-systems-integration" },
    { name: "AI & Machine Learning", href: "/services", id: "ai-machine-learning" },
    { name: "Cloud Architecture", href: "/services", id: "cloud-architecture" }
  ];

  // Industries data - 8 industries (matching your industries array in Industries page)
  const industries = [
    { name: "Healthcare & Life Sciences", href: "/industries/healthcare-life-sciences" },
    { name: "Finance & Legal", href: "/industries/finance-legal" },
    { name: "Retail & E-Commerce", href: "/industries/retail-ecommerce" },
    { name: "Education & EdTech", href: "/industries/education-edtech" },
    { name: "Real Estate & Construction", href: "/industries/real-estate-construction" },
    { name: "Non-Profit & Government", href: "/industries/non-profit-government" }
  ];

  if (!mounted) return (
    <footer
      ref={footerRef}
      className="w-full bg-black text-white overflow-hidden relative"
      style={{
        zIndex: 20,
        minHeight: "100vh",
        marginTop: 0,
        paddingTop: "4rem",
        paddingBottom: "2rem"
      }}
    />
  );

  return (
    <footer
      ref={footerRef}
      className="w-full bg-black text-white overflow-hidden relative"
      style={{
        zIndex: 20,
        minHeight: "100vh",
        marginTop: 0,
        paddingTop: "4rem",
        paddingBottom: "2rem"
      }}
    >
      {/* Main Footer Content */}
      <div
        ref={contentRef}
        className="w-full h-full px-6 md:px-20"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Newsletter Section */}
          <div
            ref={newsletterRef}
            className="mb-20 border-b border-gray-800 pb-16"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
              {/* Left: Badge + Title */}
              <div className="flex-shrink-0 max-w-xl">
                <div className="flex items-center gap-2 mb-4 bg-accent/10 w-fit px-3 py-1.5 rounded-full border border-accent/20">
                  <Sparkles className="sparkle-icon w-4 h-4 text-accent" />
                  <span className=" text-xs text-accent tracking-wider font-semibold">NEWSLETTER</span>
                </div>
                <h2 className=" font-semibold text-2xl md:text-3xl lg:text-4xl text-white leading-tight">
                  Get the latest tips for social media growth and marketing straight to your inbox!
                </h2>
              </div>

              <div className="flex-shrink-0 w-full lg:max-w-xl mt-6 lg:mt-0">
                <div className="flex items-center border border-white/20 rounded-full bg-white/5 backdrop-blur-sm max-w-md lg:max-w-none">
                  <input
                    type="email"
                    placeholder="jhon@example.com"
                    className="flex-1 min-w-0 px-4 md:px-6 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
                  />
                  <button
                    onMouseEnter={handleSubscribeEnter}
                    onMouseLeave={handleSubscribeLeave}
                    className="subscribe-btn shrink-0 rounded-full group relative inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 bg-white text-black overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(223,145,20,0.5)] text-xs md:text-sm font-medium"
                  >
                    <span className="relative z-10">Subscribe</span>
                    <Send className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Links Grid - 4 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Column 1: Quick Links */}
            <div ref={el => columnsRef.current[0] = el} className="space-y-4">
              <h3 className=" text-accent text-xs tracking-wider uppercase">QUICK LINKS</h3>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About', href: '/about' },
                  { name: 'Services', href: '/services' },
                  { name: 'Industries', href: '/industries' },
                  { name: 'Blogs', href: '/blogs' },
                  { name: 'Contact', href: '/contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link  text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Services - 6 main services (with hash navigation) */}
            <div ref={el => columnsRef.current[1] = el} className="space-y-4">
              <h3 className=" text-accent text-xs tracking-wider uppercase">Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={`/services#${service.id}`}
                      onClick={(e) => handleServiceNavigation(e, service.href, service.name)}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link  text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block cursor-pointer"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Industries - 8 industries (with proper links) */}
            <div ref={el => columnsRef.current[2] = el} className="space-y-4">
              <h3 className=" text-accent text-xs tracking-wider uppercase">Industries</h3>
              <ul className="space-y-2">
                {industries.map((industry) => (
                  <li key={industry.name}>
                    <Link
                      to={industry.href}
                      onMouseEnter={handleLinkEnter}
                      onMouseLeave={handleLinkLeave}
                      className="footer-link  text-gray-400 hover:text-white transition-colors duration-300 text-sm inline-block"
                    >
                      {industry.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info */}
            <div ref={el => columnsRef.current[3] = el} className="space-y-4">
              <h3 className=" text-accent text-xs tracking-wider">CONTACT US</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 group">
                  <Phone className="w-4 h-4 text-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <a
                    href="tel:+17787704050"
                    onMouseEnter={handleLinkEnter}
                    onMouseLeave={handleLinkLeave}
                    className="footer-link  text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    +1 778 770 4050
                  </a>
                </div>

                <div className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-gray-100 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <a
                    href="mailto:team@riden.tech"
                    onMouseEnter={handleLinkEnter}
                    onMouseLeave={handleLinkLeave}
                    className="footer-link  text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                  >
                    team@riden.tech
                  </a>
                </div>

                <div className="flex items-start gap-3 group">
                  <MapPin className="w-4 h-4 text-gray-100 flex-shrink-0 mt-1 transition-transform duration-300 group-hover:rotate-12" />
                  <span className=" text-gray-300 text-sm">
                    15850 26 Ave, Surrey, BC V3Z 2N6, Canada
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar & Privacy Links */}
          <div className="border-t border-gray-800 pt-6 relative z-[60] pointer-events-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <p className=" text-xs text-gray-400">
                © {currentYear} RidenTech. All rights reserved.
              </p>


              {/* Social Links */}
              <div className="flex items-center gap-3">
                {[
                  { Icon: FaFacebookF, href: "https://facebook.com", label: "Facebook", hoverColor: "#1877F2" },
                  { Icon: FaXTwitter, href: "https://x.com", label: "X", hoverColor: "#ffffff" },
                  { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram", hoverColor: "#E1306C" },
                  { Icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn", hoverColor: "#0A66C2" },
                  { Icon: FaYoutube, href: "https://youtube.com", label: "YouTube", hoverColor: "#FF0000" },
                ].map(({ Icon, href, label, hoverColor }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="relative z-[60] py-2 px-2 hover:bg-white/5 w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 pointer-events-auto"
                    onMouseEnter={e => {
                      e.currentTarget.style.color = hoverColor;
                      e.currentTarget.style.borderColor = hoverColor;
                      e.currentTarget.style.boxShadow = `0 0 10px ${hoverColor}66`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '';
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.boxShadow = '';
                    }}
                  >
                    <Icon className="w-5 h-5 pointer-events-none" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={bigLogoRef}
        className="w-full text-center mt-8 pb-4 pointer-events-none overflow-hidden"
      >
        <h1 className=" font-semibold text-[15vw] md:text-[20vw] lg:text-[18vw] uppercase text-accent/5 hover:text-accent/20 leading-[0.8] tracking-tight select-none transition-all duration-500 hover:scale-105 inline-block">
          RIDENTECH
        </h1>
      </div>
    </footer>
  );
}
