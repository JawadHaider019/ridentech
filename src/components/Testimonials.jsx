import { useState, useRef, useEffect } from "react";
import { ArrowUpRight, Star, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

// Country flags using flagcdn.com
const countryFlags = {
  "USA": "https://flagcdn.com/w20/us.png",
  "UK": "https://flagcdn.com/w20/gb.png",
  "Canada": "https://flagcdn.com/w20/ca.png",
  "Australia": "https://flagcdn.com/w20/au.png",
  "Germany": "https://flagcdn.com/w20/de.png",
  "India": "https://flagcdn.com/w20/in.png"
};

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingRef = useRef(null);
  const carouselRef = useRef(null);
  const trackRef = useRef(null);
  const ctaRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef(null);
  const currentXRef = useRef(0);

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const testimonials = [
    {
      id: 1,
      quote: "Riden Tech transformed our outdated systems into a modern, efficient platform. Their team understood our vision and delivered beyond expectations.",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
      rating: 5,
      location: "USA"
    },
    {
      id: 2,
      quote: "The mobile app they built for us increased user engagement by 150%. Professional, responsive, and truly talented developers.",
      author: "Michael Chen",
      role: "Founder, GrowthLabs",
      rating: 5,
      location: "Canada"
    },
    {
      id: 3,
      quote: "Working with Riden Tech was seamless. They didn't just code—they contributed ideas that made our product significantly better.",
      author: "Emma Williams",
      role: "Product Manager, InnovateCo",
      rating: 5,
      location: "UK"
    },
    {
      id: 4,
      quote: "Exceptional quality and attention to detail. The team delivered our e-commerce platform ahead of schedule and under budget.",
      author: "David Miller",
      role: "Director, RetailPlus",
      rating: 5,
      location: "Australia"
    },
    {
      id: 5,
      quote: "Their expertise in cloud architecture helped us scale effortlessly. Highly recommended for any complex technical project.",
      author: "Lisa Anderson",
      role: "CTO, ScaleUp",
      rating: 5,
      location: "Germany"
    },
    {
      id: 6,
      quote: "The UI/UX design work was outstanding. They created an intuitive interface that our users love. Will definitely work with them again.",
      author: "Raj Patel",
      role: "Founder, DesignHub",
      rating: 5,
      location: "India"
    },
    {
      id: 7,
      quote: "From concept to launch, Riden Tech was with us every step. Their technical guidance saved us months of development time.",
      author: "Jennifer Lee",
      role: "Startup Founder",
      rating: 5,
      location: "USA"
    },
    {
      id: 8,
      quote: "The API integration they built connects seamlessly with our legacy systems. Clean code, thorough documentation, and great communication.",
      author: "Thomas Wright",
      role: "IT Director, FinanceCorp",
      rating: 5,
      location: "UK"
    }
  ];

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials
  ];

  // Initialize animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      const initialTargets = [badgeRef.current, titleRef.current, subtitleRef.current, headingRef.current, ctaRef.current].filter(Boolean);
      if (initialTargets.length > 0) {
        gsap.set(initialTargets, {
          opacity: 0,
          y: 50
        });
      }

      // Create a timeline for header animations that plays when section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true
        }
      });

      // Badge animation - fade in and slide down
      if (badgeRef.current) {
        tl.to(badgeRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        });
      }

      // Title animations with stagger
      const titleTargets = [titleRef.current, subtitleRef.current].filter(Boolean);
      if (titleTargets.length > 0) {
        tl.to(titleTargets, {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power4.out"
        }, "-=0.4");
      }

      // Heading description animation
      if (headingRef.current) {
        tl.to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.2");
      }

      // CTA animation
      if (ctaRef.current) {
        tl.to(ctaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.2)"
        }, "-=0.2");
      }

      // Continuous bouncing animation for badge
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          y: -5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 1
        });
      }

      // Initialize carousel animation
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth / 4;

        // Store current position
        currentXRef.current = 0;

        // Create infinite scroll animation
        animationRef.current = gsap.to(trackRef.current, {
          x: -trackWidth,
          duration: 80,
          ease: "none",
          repeat: -1,
          onUpdate: function () {
            // Store current x position
            if (trackRef.current) {
              const transform = window.getComputedStyle(trackRef.current).transform;
              if (transform !== 'none') {
                const matrix = new DOMMatrix(transform);
                currentXRef.current = matrix.m41;
              }
            }
          }
        });

        // Pause on hover
        trackRef.current.addEventListener('mouseenter', () => {
          if (animationRef.current && !isMobile) {
            animationRef.current.pause();
            setIsPaused(true);
          }
        });

        trackRef.current.addEventListener('mouseleave', () => {
          if (animationRef.current && !isMobile) {
            animationRef.current.resume();
            setIsPaused(false);
          }
        });

        // Touch events for mobile
        if (isMobile) {
          trackRef.current.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (animationRef.current) {
              animationRef.current.pause();
              setIsPaused(true);
            }
          });

          trackRef.current.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (animationRef.current) {
              setTimeout(() => {
                animationRef.current.resume();
                setIsPaused(false);
              }, 100);
            }
          });
        }

        // Initialize draggable for mobile
        if (isMobile && trackRef.current) {
          Draggable.create(trackRef.current, {
            type: "x",
            edgeResistance: 0.65,
            inertia: true,
            onDragStart: function () {
              if (animationRef.current) {
                animationRef.current.pause();
              }
            },
            onDragEnd: function () {
              setTimeout(() => {
                if (animationRef.current && !isPaused) {
                  animationRef.current.resume();
                }
              }, 200);
            }
          });
        }
      }
    }, sectionRef);

    return () => {
      // Clean up animation
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ctx.revert();
    };
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="py-12 bg-white relative overflow-hidden text-gray-900">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-20 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-20 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Updated to match reference style */}
        <div ref={headerRef} className="text-center mb-16">
          {/* Floating Badge - Exact match */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-accent/10 border border-accent/20 text-gray-900 rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            <Zap className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium tracking-wide">CLIENT TESTIMONIALS</span>
          </div>

          {/* Titles with animation */}
          <h2 ref={titleRef} className=" text-5xl md:text-6xl text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <h2 ref={subtitleRef} className=" text-5xl md:text-6xl text-gray-900 mb-6">
            <span className="relative">
              About Riden Tech
            </span>
          </h2>

          {/* Heading with animation */}
          <p ref={headingRef} className=" text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from the people and companies we've helped transform through
            innovative technology solutions and dedicated partnership.
          </p>
        </div>

        {/* Running Carousel */}
        <div className="mt-12 relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Carousel Track */}
          <div ref={carouselRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6 cursor-default"
              style={{ width: "fit-content" }}
            >
              {duplicatedTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="min-w-[320px] md:min-w-[380px] lg:min-w-[400px] select-none"
                >
                  {/* Testimonial Card - Black/White Theme */}
                  <div className="relative h-[300px] my-5">
                    <div className="relative h-full bg-white p-6 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group hover:border-gray-400">

                      {/* Large Quote Mark */}
                      <div className="absolute top-4 right-4 text-8xl font-serif text-gray-200 group-hover:text-gray-300 transition-colors duration-300">
                        "
                      </div>

                      {/* Rating stars - Gray theme */}
                      <div className="flex gap-1 mb-3 relative z-10">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating
                              ? 'text-gray-800 fill-gray-800'
                              : 'text-gray-200 fill-gray-200'
                              }`}
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="flex-1 relative z-10">
                        <p className="  text-gray-700 text-sm leading-relaxed line-clamp-4">
                          "{testimonial.quote}"
                        </p>
                      </div>

                      {/* Author info with flag */}
                      <div className="pt-4 border-t border-gray-100 mt-4 relative z-10">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className=" text-sm font-semibold text-gray-900">
                              {testimonial.author}
                            </h4>
                            <p className="  text-xs text-gray-500">
                              {testimonial.role}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="relative w-5 h-3.5 overflow-hidden rounded-sm shadow-sm">
                              <img
                                src={countryFlags[testimonial.location]}
                                alt={`${testimonial.location} flag`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                            <span className="  text-xs text-gray-500">
                              {testimonial.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div ref={ctaRef} className="text-center mt-16">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-gray-900/20   overflow-hidden"
          >
            <span className="relative z-10">Start Your Success Story</span>
            <ArrowUpRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Link>
        </div>
      </div>
    </section>
  );
}
