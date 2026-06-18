import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Rocket, Star, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const statsRef = useRef([]);
  const imageRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Initial animations with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });


      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      }

      // Title and subtitle animation with stagger
      const titleTargets = [titleRef.current, subtitleRef.current].filter(Boolean);
      if (titleTargets.length > 0) {
        tl.fromTo(titleTargets,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power4.out"
          },
          "-=0.3"
        );
      }

      // Heading animation
      if (headingRef.current) {
        tl.fromTo(headingRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Image animation with shape reveal and scale
      if (imageRef.current) {
        tl.fromTo(imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
            rotation: 2
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 0.7,
            ease: "power3.out"
          },
          "-=0.4"
        );
      }

      // Description animation with fade and slide
      if (descriptionRef.current) {
        tl.fromTo(descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
      }

      // Stats animation with scale and stagger
      const filteredStats = statsRef.current.filter(Boolean);
      if (filteredStats.length > 0) {
        tl.fromTo(filteredStats,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.4)"
          },
          "-=0.4"
        );
      }



      // CTA button animation
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
          "-=0.3"
        );
      }

      // Subtle pulse animation for stats on hover
      filteredStats.forEach(stat => {
        stat.addEventListener('mouseenter', () => {
          gsap.to(stat, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        stat.addEventListener('mouseleave', () => {
          gsap.to(stat, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Parallax effect for background elements
      gsap.to('.about-bg-1', {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to('.about-bg-2', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Subtle floating animation for image (only on desktop)
      if (window.innerWidth >= 1024 && imageRef.current) {
        gsap.to(imageRef.current, {
          y: 8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [mounted]);

  // Initial mount trigger
  useEffect(() => {
    setMounted(true);
  }, []);



  return (
    <section ref={sectionRef} className="relative py-16 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-2 sm:mb-10 ">

          <div
            ref={badgeRef}
            className="inline-flex items-center bg-accent/10 border border-accent/20 text-gray-900 rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            <Zap className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium tracking-wide">WHO WE ARE</span>
          </div>

          <h2
            ref={titleRef}
            className="  font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-2"
          >
            We're on a Mission to
          </h2>
          <h2
            ref={subtitleRef}
            className="  font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-6"
          >
            Transform <span className="text-accent italic ">Digital</span>
          </h2>

          {/* Heading with animation */}
          <p ref={headingRef} className=" text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            We’re a  team of creators, thinkers, and problem-solvers passionate about turning your ideas into powerful digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12  items-center">
          {/* Left Side - Image with Responsive Clip Path */}
          <div className="relative order-2 md:order-1">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] aspect-[1.1/1] mx-auto">
              <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full shadow-2xl"
                style={{
                  clipPath: 'url(#aboutClipPath)',
                  WebkitClipPath: 'url(#aboutClipPath)',
                }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/about.jpg')"
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 md:order-2 space-y-6 text-center lg:text-left">
            {/* Description Text */}
            <div ref={descriptionRef} className="space-y-4">
              <p className=" text-base text-gray-600 leading-relaxed">
                At RidenTech, we believe great software is built through strong collaboration. Our team combines technical expertise with creative problem-solving to deliver solutions that aren’t just functional they’re exceptional.
              </p>
              <p className=" text-base text-gray-600 leading-relaxed">
                We take the time to understand your vision, challenges, and goals. Then we get to work, building high-quality products that create real impact for your business.
              </p>
            </div>

            {/* Stats Row - Icons only (as requested) */}
            <div className="grid grid-cols-3 gap-2 pt-4">
              {/* Expert Team */}
              <div
                ref={el => statsRef.current[0] = el}
                className="text-center cursor-pointer group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <div className="  text-sm font-semibold text-gray-900">EXPERT TEAM</div>
                <div className=" text-xs text-gray-500 mt-1">Skilled professionals</div>
              </div>

              {/* Fast Delivery */}
              <div
                ref={el => statsRef.current[1] = el}
                className="text-center cursor-pointer group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Rocket className="w-8 h-8 text-accent" />
                </div>
                <div className="  text-sm font-semibold text-gray-900">FAST DELIVERY</div>
                <div className=" text-xs text-gray-500 mt-1">Quick turnaround</div>
              </div>

              {/* Client Satisfaction */}
              <div
                ref={el => statsRef.current[2] = el}
                className="text-center cursor-pointer group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300 mx-auto">
                  <Star className="w-8 h-8 text-accent" />
                </div>
                <div className="  text-sm font-semibold text-gray-900">SATISFACTION</div>
                <div className=" text-xs text-gray-500 mt-1">Happy clients</div>
              </div>
            </div>



            {/* CTA with animation */}
            <div ref={ctaRef} className="pt-2">
              <Link
                to="/about"
                className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-gray-900/20   overflow-hidden"
              >
                <span className="relative z-10">Learn More</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* Responsive SVG ClipPath Definition (Same as Hero for consistency or adjusted) */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="aboutClipPath" clipPathUnits="objectBoundingBox">
            <path d="M 0.037 0.082 L 0.37 0.082 A 0.037 0.041 0 0 0 0.407 0.041 L 0.407 0.041 A 0.037 0.041 0 0 1 0.444 0 L 0.963 0 A 0.037 0.041 0 0 1 1 0.041 L 1 0.959 A 0.037 0.041 0 0 1 0.963 1 L 0.037 1 A 0.037 0.041 0 0 1 0 0.959 L 0 0.122 A 0.037 0.041 0 0 1 0.037 0.082 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};

export default About;
