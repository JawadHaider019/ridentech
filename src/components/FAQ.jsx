import { useState, useEffect, useRef } from "react";
import { ChevronDown, HelpCircle, Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "What services does RidenTech offer?",
    answer: "We provide a full range of software development services including Custom Software Development, Web & PWA Engineering, Mobile App Development, API & Systems Integration, AI & Machine Learning, Cloud Architecture, DevOps & Automation, UI/UX Design, E-Commerce Solutions, and Database Architecture."
  },
  {
    question: "How long does it take to develop a project?",
    answer: "Project timelines vary based on the scope and complexity of the project. However, we are committed to delivering all projects efficiently and within the agreed deadlines. During the initial consultation, we provide a clear timeline tailored to your specific requirements."
  },
  {
    question: "What is your development process?",
    answer: "We follow an agile methodology with these phases: Discovery & Planning, Design & Prototyping, Development & Sprints, Testing & QA, Deployment, and Ongoing Support. Transparent communication is maintained throughout the process."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "We offer lifetime support to our clients, ensuring your systems continue to run smoothly at all times. In addition, we provide flexible maintenance options for updates, improvements, and ongoing technical assistance as your business grows."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "We specialize in a comprehensive stack of modern technologies including React, Next.js, Node.js, PHP, Laravel, and Python; databases like MySQL, PostgreSQL, and MongoDB; mobile development with Flutter and Dart; and cloud infrastructure using AWS and CloudFlare."
  },
  {
    question: "How do you handle project pricing?",
    answer: "We provide flexible pricing models including fixed-price for well-defined projects, time & materials for evolving requirements, and dedicated team models for long-term partnerships and ongoing collaborations."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const faqItemsRef = useRef([]);
  const answersRef = useRef({});
  const ctaRef = useRef(null);
  const headerRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Initialize accordion states after mounting
    faqData.forEach((_, i) => {
      const el = answersRef.current[i];
      if (el) {
        if (i === openIndex) {
          gsap.set(el, { height: "auto", opacity: 1, display: "block" });
          const item = faqItemsRef.current[i];
          if (item) {
            gsap.set(item, { borderColor: "#9ca3af", boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)" });
            const arrow = item.querySelector('.chevron-icon');
            if (arrow) gsap.set(arrow, { rotation: 180 });
          }
        } else {
          gsap.set(el, { height: 0, opacity: 0, display: "none" });
        }
      }
    });

    const ctx = gsap.context(() => {
      // Create a master timeline for the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 30%",
          toggleActions: "play none none none"
        }
      });

      // Set initial states for entrance animations
      const initialTargets = [badgeRef.current, titleRef.current, subtitleRef.current, ...faqItemsRef.current.filter(Boolean), ctaRef.current].filter(Boolean);
      if (initialTargets.length > 0) {
        gsap.set(initialTargets, {
          opacity: 0,
          y: 50
        });
      }

      // Badge animation - fade in from top with bounce
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { y: -50, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)"
          }
        );
      }

      // Title animation - dramatic reveal
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { y: 100, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power4.out"
          },
          "-=0.4"
        );
      }

      // Subtitle animation - slide up
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
          },
          "-=0.3"
        );
      }

      // FAQ items stagger animation with entrance effects
      const validFaqItems = faqItemsRef.current.filter(Boolean);
      if (validFaqItems.length > 0) {
        tl.fromTo(validFaqItems,
          {
            y: 60,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
          },
          "-=0.2"
        );
      }

      // CTA animation with pop effect
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.4)"
          },
          "-=0.2"
        );
      }

      // Parallax effect for background elements
      gsap.to('.faq-bg-1', {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to('.faq-bg-2', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    const currentSection = sectionRef.current;
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === currentSection) t.kill(true);
      });
    };
  }, [mounted, openIndex]);

  const toggleFAQ = (index) => {
    const isAlreadyOpen = openIndex === index;
    const newOpenIndex = isAlreadyOpen ? null : index;

    // 1. Close current open item
    if (openIndex !== null) {
      const prevAnswer = answersRef.current[openIndex];
      const prevItem = faqItemsRef.current[openIndex];
      const prevArrow = prevItem?.querySelector('.chevron-icon');

      if (prevAnswer) {
        gsap.to(prevAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            prevAnswer.style.display = "none";
          }
        });
      }

      if (prevArrow) {
        gsap.to(prevArrow, {
          rotation: 0,
          duration: 0.4,
          ease: "power2.inOut"
        });
      }

      const prevBorderColor = "#e5e7eb";
      gsap.to(prevItem, {
        borderColor: prevBorderColor,
        boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        duration: 0.3
      });
    }

    // 2. Open new item
    if (!isAlreadyOpen) {
      const newAnswer = answersRef.current[index];
      const newItem = faqItemsRef.current[index];
      const currentArrow = newItem?.querySelector('.chevron-icon');

      if (newAnswer) {
        newAnswer.style.display = "block";
        newAnswer.style.height = "auto";
        const height = newAnswer.scrollHeight;
        newAnswer.style.height = "0px";

        gsap.to(newAnswer, {
          height: height,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            newAnswer.style.height = "auto";
          }
        });

        const lines = newAnswer.querySelectorAll('p');
        gsap.fromTo(lines,
          { y: 10, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.05,
            delay: 0.1,
            ease: "power2.out"
          }
        );
      }

      if (currentArrow) {
        gsap.to(currentArrow, {
          rotation: 180,
          duration: 0.4,
          ease: "power2.out"
        });
      }

      gsap.to(newItem, {
        borderColor: "#9ca3af",
        boxShadow: "0 10px 25px -5px rgb(0 0 0 / 0.1)",
        duration: 0.3
      });

      gsap.fromTo(newItem,
        { scale: 1 },
        {
          scale: 1.01,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        }
      );
    }

    setOpenIndex(newOpenIndex);
  };

  if (!mounted) {
    return (
      <section ref={sectionRef} className="w-full bg-white py-16 px-6 md:px-20 overflow-hidden relative" />
    );
  }

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 px-6 md:px-20 overflow-hidden relative">
      <div className="faq-bg-1 absolute top-40 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-30 pointer-events-none"></div>
      <div className="faq-bg-2 absolute bottom-40 left-1/3 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <div ref={headerRef}>
              <div ref={badgeRef} className="inline-flex items-center bg-accent/10 border border-accent/20 text-gray-900 rounded-full px-5 py-2 mb-6 shadow-md">
                <HelpCircle className="w-4 h-4 mr-2 text-accent" />
                <span className="text-sm font-medium tracking-wide uppercase ">Questions</span>
              </div>
              <h2 ref={titleRef} className="  font-semibold text-5xl md:text-6xl text-gray-900 mb-4 leading-tight">
                Frequently Asked
                <span className="text-accent italic block mt-1">Questions</span>
              </h2>
              <p ref={subtitleRef} className="text-base md:text-lg  text-gray-600 max-w-md leading-relaxed">
                Everything you need to know about working with us and our innovative technology solutions.
              </p>
            </div>

            <div ref={ctaRef} className="bg-gray-50 border border-gray-200 rounded-2xl p-8 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="absolute top-0 right-0 p-3 opacity-30 group-hover:scale-110 transition-transform duration-500">
                <Mail className="w-24 h-24 text-accent" />
              </div>
              <h3 className="  font-semibold text-2xl text-gray-900 mb-4 relative z-10">
                Still Have More Questions?
              </h3>
              <p className="  text-gray-600 mb-8 relative z-10">
                If you&apos;re curious or need more info, feel free to reach out we&apos;re here to help!
              </p>
              <Link to="/contact" className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-900/20   overflow-hidden">
                <span className="relative z-10">Contact Us Now</span>
                <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  ref={el => faqItemsRef.current[index] = el}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden"
                  style={{
                    transform: isOpen ? 'scale(1.01)' : 'scale(1)',
                    transition: 'transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
                  }}
                >
                  <button onClick={() => toggleFAQ(index)} className="w-full px-6 py-6 flex items-center justify-between text-left group outline-none">
                    <span className={`  font-semibold text-lg pr-8 transition-colors duration-300 ${isOpen ? 'text-gray-900' : 'text-gray-700 group-hover:text-black'}`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? 'bg-accent text-white rotate-180' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'}`}>
                      <ChevronDown className="w-5 h-5 chevron-icon" />
                    </div>
                  </button>
                  <div ref={el => answersRef.current[index] = el} className="overflow-hidden opacity-0 hidden h-0">
                    <div className="px-6 pb-8">
                      <div className="h-px w-full bg-gray-100 mb-6"></div>
                      <p className="  text-gray-600 leading-relaxed text-[17px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
