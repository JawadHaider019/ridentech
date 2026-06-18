// components/MarqueeService.jsx (Simplified)
import { useEffect, useRef } from "react";
import { Star } from "lucide-react";

const MarqueeService = () => {
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let startTime = null;
    const speed = 0.004;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const translateX = -((elapsed * speed) % 50);

      marquee.style.transform = `translate3d(${translateX}%, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const items = [
    "Software Development",
    "Web Development",
    "Mobile App Development",
    "API & Systems Integration",
    "UI/UX Design",
    "Database Architecture",
    "Digital Marketing",
    "Brand Strategy",
    "DevOps & Automation"
  ];

  return (
    <section className="w-full h-[10vh] bg-black flex items-center overflow-hidden">

      <div className="relative overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap will-change-transform"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Duplicate items 2 times for seamless loop */}
          {[...Array(2)].map((_, copyIndex) => (
            <div key={copyIndex} className="flex items-center">
              {items.map((item, index) => (
                <div key={`${copyIndex}-${index}`} className="flex items-center mx-2">
                  {/* Rounded button */}
                  <div className="group relative">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/20 rounded-full py-2.5 px-6 cursor-pointer">
                      <span className="text-white font-medium text-sm   tracking-wide ">
                        {item}
                      </span>
                    </div>



                  </div>
                  {/* <div className="bg-accent/50 border -rotate-45 rounded-full p-2.5 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div> */}

                  {/* Star separator */}
                  <Star className="w-4 h-4 text-accent mx-4 md:mx-6" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeService;
