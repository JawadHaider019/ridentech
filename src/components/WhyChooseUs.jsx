import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Rocket,
  Shield,
  Zap,
  Users,
  Clock,
  Headphones,
  ArrowRight,
  Sparkles
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Rapid Development",
    description: "Launch your MVP in as little as 4 weeks with our agile methodology and experienced team."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Quality Assured",
    description: "Rigorous testing and code reviews ensure robust, scalable, and secure applications."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Cutting-Edge Tech",
    description: "We use modern frameworks and tools to build fast, efficient, and future-proof solutions."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Expert Team",
    description: "Senior developers, designers, and strategists with 10+ years of combined experience."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "On-Time Delivery",
    description: "We respect your timeline and deliver projects on schedule without compromising quality."
  },

  {
    icon: <Headphones className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Round-the-clock assistance to ensure your applications run smoothly at all times."
  }
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });

      // Badge animation
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
        );
      }

      // Title animation
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" },
          "-=0.3"
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Cards stagger animation
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        tl.fromTo(validCards,
          {
            y: 50,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out"
          },
          "-=0.2"
        );
      }

      // CTA animation
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.2)" },
          "-=0.2"
        );
      }



    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-16 overflow-hidden relative"
    >
      {/* Background decorative elements - subtle gray */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-gray-100 rounded-full filter blur-3xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-200 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-accent/10 border border-accent/20 text-gray-900 rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            <Sparkles className="w-4 h-4 mr-2 text-accent" />
            <span className="text-sm font-medium tracking-wide">WHY CHOOSE US</span>
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="  font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-2"
          >
            We Build<span className="text-accent italic "> Partnerships</span>
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className=" text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Not just developers, we're your strategic partners in success, delivering excellence at every step.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 px-4"
        >
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center mb-5 group-hover:bg-accent transition-colors duration-300">
                <div className="text-gray-100 group-hover:text-white transition-colors duration-300">
                  {reason.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="  font-semibold text-xl text-gray-900 mb-3">
                {reason.title}
              </h3>

              {/* Description */}
              <p className=" text-gray-600 text-sm leading-relaxed">
                {reason.description}
              </p>

              {/* Decorative line on hover */}
              <div className="w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-500 mt-4"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div ref={ctaRef} className="text-center mt-6">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-sm font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:shadow-gray-900/20   overflow-hidden"
          >
            <span className="relative z-10">Start Your Project</span>
            <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </Link>

        </div>
      </div>
    </section>
  );
}
