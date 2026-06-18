import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Custom Software Development",
    description: [
      "Custom software solutions built using modern technologies like React, Next.js, and Node.js.",
      "Scalable and secure architecture designed to grow with your business needs.",
      "Clean, maintainable code with best practices and thorough testing for reliable performance."
    ],
    image: "/softdev.jpg"
  },
  {
    title: "Web & PWA Engineering",
    description: [
      "High-performance Progressive Web Apps (PWAs) that load fast and work offline.",
      "Responsive, SEO-friendly web applications with a seamless user experience.",
      "Cross-platform solutions that reduce development cost and time."
    ],
    image: "/webdev.jpg"
  },
  {
    title: "Mobile App Development",
    description: [
      "Custom mobile applications for iOS and Android with native and cross-platform technologies.",
      "Intuitive UI/UX with smooth performance and engaging user experiences.",
      "Integration with device features like camera, GPS, and push notifications."
    ],
    image: "/mobdev.jpg"
  },
  {
    title: "API & Systems Integration",
    description: [
      "Secure API development and seamless integration with third-party services.",
      "RESTful and GraphQL APIs optimized for performance and scalability.",
      "Efficient data synchronization across your business systems and platforms."
    ],
    image: "/api.jpg"
  },
  {
    title: "AI & Machine Learning",
    description: [
      "AI-powered solutions to automate processes and improve decision-making.",
      "Custom machine learning models tailored to your business requirements.",
      "Smart data analysis, content generation, and workflow automation."
    ],
    image: "/aiml.jpg"
  },
  {
    title: "Cloud Architecture",
    description: [
      "Scalable cloud solutions using AWS, Google Cloud, and Microsoft Azure.",
      "High-availability infrastructure with secure and cost-optimized deployments.",
      "Infrastructure as code for reliable and consistent environments."
    ],
    image: "/cloud.jpg"
  },
  {
    title: "DevOps & Automation",
    description: [
      "Automated CI/CD pipelines for faster and more efficient deployments.",
      "Continuous integration, testing, and monitoring for high-quality delivery.",
      "Optimized workflows that improve team productivity and system reliability."
    ],
    image: "/devops.jpg"
  },
  {
    title: "UI/UX Design",
    description: [
      "Modern, user-friendly designs focused on engagement and conversion.",
      "User-centered design approach backed by research and usability testing.",
      "Interactive prototypes and design systems created in Figma."
    ],
    image: "/uxui.jpg"
  },
  {
    title: "E-Commerce Solutions",
    description: [
      "Custom e-commerce platforms with secure payment gateway integration.",
      "Advanced features like inventory management, order tracking, and analytics.",
      "Optimized for conversions, speed, and mobile-first shopping experiences."
    ],
    image: "/ecommerce.jpg"
  },
  {
    title: "Database Architecture",
    description: [
      "Robust database design for scalability, performance, and security.",
      "SQL and NoSQL solutions tailored to your application needs.",
      "Data migration, optimization, and ongoing database management services."
    ],
    image: "/database.jpg"
  }
];

export default function Services() {
  const [expanded, setExpanded] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const serviceItemsRef = useRef([]);
  const [mounted, setMounted] = useState(false);

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle hover-based expansion
  const handleMouseEnter = (idx) => {
    setHoveredIndex(idx);
    setExpanded(idx);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setExpanded(null);
  };

  // Main Scroll Animation
  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      // Entrance animations for header
      if (badgeRef.current) {
        gsap.fromTo(badgeRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true }
          }
        );
      }

      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power4.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true }
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, delay: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 90%", once: true }
          }
        );
      }

      // Entrance animations for service items
      const items = serviceItemsRef.current.filter(Boolean);
      if (items.length > 0) {
        gsap.fromTo(items,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true }
          }
        );
      }

    }, sectionRef);
    return () => ctx.revert();
  }, [mounted]);

  return (
    <section ref={sectionRef} className="w-full bg-black text-white py-12 px-6 md:px-20 overflow-hidden relative">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16">
        <div
          ref={badgeRef}
          className="inline-flex items-center bg-white text-gray-700 rounded-full px-4 py-2 mb-6 border border-gray-200"
        >
          <Code2 className="w-4 h-4 mr-2 text-accent" />
          <span className="text-sm tracking-wider text-accent">Expertise</span>
        </div>

        <h2
          ref={titleRef}
          className="  font-semibold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-4 leading-tight"
        >
          Your Needs, <span className="text-accent italic">Our Expertise</span>
        </h2>

        <p
          ref={subtitleRef}
          className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg"
        >
          We deliver comprehensive digital solutions tailored to your business needs, combining innovation, technology, and strategic thinking to help you achieve scalable growth and long-term success.
        </p>
      </div>

      {/* Service List - 10 Main Services */}
      <div className="max-w-7xl mx-auto mt-16 relative z-10 flex flex-col">
        {SERVICES.slice(0, 10).map((service, idx) => {
          const isOpen = expanded === idx;
          const isHovered = hoveredIndex === idx;

          return (
            <div
              key={idx}
              ref={el => serviceItemsRef.current[idx] = el}
              className={`group relative flex flex-col lg:flex-row items-start lg:items-center px-0 transition-all duration-500 cursor-pointer border-t border-gray-800/50 ${isOpen ? "bg-white/5 px-4 md:px-8 py-7 md:py-10" : "hover:bg-white/5 hover:px-2 md:hover:px-4 py-5 md:py-7"}`}
              onMouseEnter={() => isDesktop && handleMouseEnter(idx)}
              onMouseLeave={() => isDesktop && handleMouseLeave()}
              onClick={() => {
                if (!isDesktop) {
                  setExpanded(isOpen ? null : idx);
                }
              }}
            >
              {/* Top Row for Mobile (Number + Title + Arrow) */}
              <div className="flex w-full items-center justify-between lg:contents">
                <div className="flex items-center gap-4 lg:contents">
                  <div className="lg:w-1/12 flex items-center">
                    <span className={`  text-3xl md:text-4xl lg:text-5xl font-semibold transition-all duration-500 ${isOpen ? "text-accent -translate-x-4 text-5xl md:text-6xl lg:text-7xl -rotate-90  " : "text-gray-800 "}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title - Column 2 Part 1 */}
                  <div className="lg:w-7/12 flex flex-col items-start justify-center">
                    <h3 className={`text-lg md:text-xl lg:text-2xl font-medium transition-all duration-500 ${isOpen ? "text-white" : "text-gray-400"}`}>
                      {service.title}
                    </h3>

                    {/* Description - Desktop Position */}
                    <div className={`hidden lg:block transition-all duration-700 overflow-hidden ${isOpen ? 'opacity-100 max-h-40 mt-1' : 'opacity-0 max-h-0'}`}>
                      <div className="flex flex-col gap-1">
                        {service.description.map((desc, i) => (
                          <p key={i} className="  text-gray-400 lg:text-sm leading-relaxed max-w-lg">
                            {desc}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow Indicator (Mobile) - Always visible */}
                <div className="lg:hidden">
                  <ArrowUpRight
                    className={`w-5 h-5 transition-all duration-300 ${isOpen ? "text-accent" : "text-gray-600"
                      } ${isHovered ? "rotate-12 scale-110 text-accent" : "rotate-0"
                      }`}
                  />
                </div>
              </div>

              {/* Description Reveal - Mobile Position */}
              <div className={`lg:hidden w-full transition-all duration-700 overflow-hidden ${isOpen ? 'opacity-100 max-h-96 mt-4' : 'opacity-0 max-h-0'}`}>
                <div className="flex flex-col gap-2 pl-12 md:pl-16">
                  {service.description.map((desc, i) => (
                    <p key={i} className="  text-gray-400 text-xs md:text-sm leading-relaxed">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>

              {/* Image Reveal - Desktop Only */}
              <div className="hidden lg:flex   lg:w-[400px] justify-end overflow-hidden transition-all duration-700 ease-in-out pr-6">
                <div
                  className={`w-full aspect-video lg:aspect-auto  overflow-hidden rounded-xl relative transition-all duration-700 ${isOpen ? 'opacity-100 scale-100 h-48' : 'opacity-0 scale-95 h-32'}`}
                >
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </div>

              {/* Arrow Indicator (Desktop) - Always visible, rotates on hover */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden xl:block transition-all duration-300">
                <ArrowUpRight
                  className={`w-8 h-8 transition-all duration-300 ${isOpen ? "text-white" : "text-gray-600"
                    } ${isHovered ? "rotate-90 scale-110" : "rotate-0"
                    }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
