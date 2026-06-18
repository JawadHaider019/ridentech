import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lightbulb, TrendingUp, Heart, BarChart3, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const featuresRef = useRef([]);
  const imageRef = useRef(null);
  const ctaRef = useRef(null);
  const borderLineRef = useRef(null);

  // Features data from your input
  const features = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Innovate to Lead",
      description: "Foster creativity and embrace innovation to stay ahead of the competition."
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Optimize for Growth",
      description: "Streamline processes and resources to maximize efficiency and profitability."
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Engage with Purpose",
      description: "Build meaningful relationships with customers through authentic connections."
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Scale with Strategy",
      description: "Expand your business by implementing structured, scalable plans for long-term success."
    }
  ];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', () => { }); // Placeholder to match structure if needed, but not really needed anymore


    const ctx = gsap.context(() => {
      // Set initial states
      const initialTargets = [
        badgeRef.current, titleRef.current, headingRef.current,
        descriptionRef.current, ...featuresRef.current.filter(Boolean),
        borderLineRef.current, ctaRef.current, imageRef.current
      ].filter(Boolean);

      if (initialTargets.length > 0) {
        gsap.set(initialTargets, {
          opacity: 0,
          y: 30
        });
      }

      // Explicitly set scaleX for borderLineRef if it exists
      if (borderLineRef.current) {
        gsap.set(borderLineRef.current, { scaleX: 0 });
      }

      // Create a master timeline with delays
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          once: true // Only animate once
        }
      });

      // Badge animation with delay
      if (badgeRef.current) {
        masterTl.to(badgeRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out"
        }, 0.1); // 0.1s delay
      }

      // Title and subtitle with staggered delay
      const titleTargets = [titleRef.current].filter(Boolean);
      if (titleTargets.length > 0) {
        masterTl.to(titleTargets, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power4.out"
        }, 0.2); // 0.2s delay
      }

      // Heading with delay
      if (headingRef.current) {
        masterTl.to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out"
        }, 0.3); // 0.3s delay
      }

      // Image animation with delay
      if (imageRef.current) {
        masterTl.fromTo(imageRef.current,
          {
            opacity: 0,
            scale: 0.9,
            rotation: 2
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            ease: "power3.out"
          },
          0.4 // 0.4s delay
        );
      }

      // Description with delay
      if (descriptionRef.current) {
        masterTl.to(descriptionRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out"
        }, 0.5); // 0.5s delay
      }

      // Features with staggered delay
      const validFeatures = featuresRef.current.filter(el => el);
      if (validFeatures.length > 0) {
        validFeatures.forEach((feature, index) => {
          masterTl.to(feature, {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out"
          }, 0.6 + (index * 0.1)); // Staggered starting at 0.6s
        });
      }

      // Border line with delay
      if (borderLineRef.current) {
        masterTl.to(borderLineRef.current, {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, 1.0); // 1.0s delay
      }

      // CTA with delay
      if (ctaRef.current) {
        masterTl.to(ctaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.2)"
        }, 1.2); // 1.2s delay
      }




      // Parallax effect for background elements (continuous)
      gsap.to('.mission-bg-1', {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to('.mission-bg-2', {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    const currentSection = sectionRef.current;
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === currentSection) t.kill(true);
      });
    };
  }, [mounted]);

  // Hover handlers for feature items
  const handleFeatureEnter = (e) => {
    gsap.to(e.currentTarget, {
      x: 5,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(e.currentTarget.querySelector('.feature-icon'), {
      scale: 1.1,
      backgroundColor: '#1f2937',
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleFeatureLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    gsap.to(e.currentTarget.querySelector('.feature-icon'), {
      scale: 1,
      backgroundColor: '#111827',
      duration: 0.3,
      ease: "power2.out"
    });
  };

  if (!mounted) return <section ref={sectionRef} className="relative py-16 bg-white overflow-hidden" />;

  return (
    <section ref={sectionRef} className="relative py-16 bg-white overflow-hidden  ">
      {/* Background decorative elements with parallax */}
      <div className="mission-bg-1 absolute top-40 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="mission-bg-2 absolute bottom-20 left-20 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          {/* Floating Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-accent/10 border border-accent/20 text-gray-900 rounded-full px-5 py-2.5 mb-6 shadow-lg opacity-0"
          >
            <Zap className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium tracking-wide">OUR MISSION</span>
          </div>

          {/* Titles with animation */}
          <h2 ref={titleRef} className="  font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 ">
            Your Success,
            <span className="relative">
              Our  <span className="text-accent italic ">Priority.</span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:items-stretch">
          <div className="relative order-2 lg:order-1 flex items-center">

            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] aspect-[1.1/1] mx-auto">
              <div
                ref={imageRef}
                className="absolute inset-0 w-full h-full shadow-2xl"
                style={{
                  clipPath: 'url(#aboutUsClipPath)',
                  WebkitClipPath: 'url(#aboutUsClipPath)',
                }}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: "url('/aboutus.jpg')"
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center gap-2">

            {/* Description Text */}
            <div ref={descriptionRef} className=" opacity-0">
              <p className="    text-md text-gray-600 leading-relaxed mb-1 ">
                We are dedicated to helping you achieve your goals with intuitive, user-friendly digital solutions. Our commitment to your success drives everything we do and sets us apart.
              </p>
              <p className="    text-md text-gray-600 leading-relaxed">
                Our approach combines strategic thinking with technical excellence to deliver solutions that not only meet but exceed expectations.
              </p>
            </div>

            {/* Features List */}
            <div className="flex flex-col gap-2 mb-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  ref={el => featuresRef.current[index] = el}
                  className="flex items-center space-x-3 cursor-pointer group opacity-0 "
                  onMouseEnter={handleFeatureEnter}
                  onMouseLeave={handleFeatureLeave}
                >
                  <div className="feature-icon w-12 h-12 bg-gray-900 text-accent rounded-lg flex items-center justify-center transition-all duration-300 shadow-[0_4px_10px_rgba(223,145,20,0.2)]">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="    text-lg text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="    text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA with animation */}
            <div ref={ctaRef} className="flex  opacity-0 justify-center md:justify-start">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-gray-900/20   overflow-hidden"
              >
                <span className="relative z-10">Contact Us</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive SVG ClipPath Definition */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <clipPath id="aboutUsClipPath" clipPathUnits="objectBoundingBox">
            <path d="M 0.037 0.082 L 0.37 0.082 A 0.037 0.041 0 0 0 0.407 0.041 L 0.407 0.041 A 0.037 0.041 0 0 1 0.444 0 L 0.963 0 A 0.037 0.041 0 0 1 1 0.041 L 1 0.959 A 0.037 0.041 0 0 1 0.963 1 L 0.037 1 A 0.037 0.041 0 0 1 0 0.959 L 0 0.122 A 0.037 0.041 0 0 1 0.037 0.082 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
};

export default AboutUs;
