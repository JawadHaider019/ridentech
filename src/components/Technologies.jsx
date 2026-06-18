// components/Technologies.jsx
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiPhp,
  SiFigma,
  SiFlutter,
  SiPython,
  SiDart,
  SiFirebase,
  SiPostgresql,
  SiBootstrap,
  SiCloudflare,
  SiGithub
} from 'react-icons/si';
import { TbBrandJavascript } from 'react-icons/tb';
import { DiCodeigniter } from 'react-icons/di';
import { BiLogoJquery } from 'react-icons/bi';
import { FaAws } from 'react-icons/fa';
import { Code2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  // Row 1 - Frontend
  { name: "React", icon: SiReact, color: "text-[#61DAFB]" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-gray-900" },
  { name: "JavaScript", icon: TbBrandJavascript, color: "text-[#FFCA28]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "Bootstrap", icon: SiBootstrap, color: "text-[#7952B3]" },

  // Row 2 - Backend
  { name: "PHP", icon: SiPhp, color: "text-[#777BB4]" },
  { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]" },
  { name: "CodeIgniter", icon: DiCodeigniter, color: "text-[#EE4323]" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]" },
  { name: "Python", icon: SiPython, color: "text-[#3776AB]" },

  // Row 3 - Database & Mobile
  { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#336791]" },
  { name: "MongoDB", icon: SiMongodb, color: "text-[#47A248]" },
  { name: "Firebase", icon: SiFirebase, color: "text-[#FFCA28]" },
  { name: "Flutter", icon: SiFlutter, color: "text-[#02569B]" },
  { name: "Dart", icon: SiDart, color: "text-[#0175C2]" },

  // Row 4 - DevOps & Tools
  { name: "AWS", icon: FaAws, color: "text-[#FF9900]" },
  { name: "CloudFlare", icon: SiCloudflare, color: "text-[#F38020]" },
  { name: "GitHub", icon: SiGithub, color: "text-gray-900" },
  { name: "jQuery", icon: BiLogoJquery, color: "text-[#0769AD]" },
  { name: "Ajax", icon: TbBrandJavascript, color: "text-[#FF6C37]" },
  { name: "Figma", icon: SiFigma, color: "text-[#F24E1E]" },
];

export default function Technologies() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const badgeRef = useRef(null);
  const iconsContainerRef = useRef(null);
  const iconRefs = useRef([]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      // Badge animation
      if (badgeRef.current) {
        tl.fromTo(badgeRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
        );
      }

      // Title animation
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          "-=0.3"
        );
      }

      // Icons stagger animation
      const validIcons = iconRefs.current.filter(Boolean);
      if (validIcons.length > 0) {
        tl.fromTo(validIcons,
          {
            scale: 0.8,
            opacity: 0,
            y: 20
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "back.out(1.2)"
          },
          "-=0.2"
        );
      }
    }, sectionRef);

    const currentSection = sectionRef.current;
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === currentSection) t.kill();
      });
    };
  }, [mounted]);

  if (!mounted) return <section ref={sectionRef} className="py-12 md:py-16 bg-white" />;

  return (
    <section
      ref={sectionRef}
      className="py-12 bg-white overflow-hidden relative"
    >

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center bg-accent/10 border border-accent/20 text-gray-900 rounded-full px-5 py-2.5 mb-6 shadow-lg"
          >
            <Code2 className="w-4 h-4 mr-2 text-accent" />
            <span className="text-[10px] md:text-xs      font-semibold tracking-[0.2em] uppercase">
              Technology Stack
            </span>
          </div>

          {/* Title */}
          <h2
            ref={titleRef}
            className="  font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-2"
          >
            Built With<span className="text-accent italic "> Precision</span>
          </h2>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="     text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed"
          >
            We leverage a world-class tech stack to deliver scalable,
            high-performance digital solutions tailored to your business.
          </p>
        </div>

        {/* Icons Grid - Perfectly Centered */}
        <div
          ref={iconsContainerRef}
          className="flex justify-center"
        >
          <div className="flex flex-wrap justify-center gap-2 w-full max-w-4xl mx-auto">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon;

              return (
                <div
                  key={index}
                  ref={el => iconRefs.current[index] = el}
                  className={`
                    flex flex-col items-center justify-center group p-3 
                    rounded-xl bg-white border border-transparent 
                    transition-all duration-300 hover:duration-200
                  
                 `}

                >
                  {/* Icon */}
                  <div className={`
                    text-5xl ${tech.color}
                  transition-all duration-300
                                `}>
                    <IconComponent />
                  </div>

                  {/* Name - Enhanced hover effect */}
                  <span className={`
              text - gray - 400 text-xs  mt - 2
              font - medium text - center
              transition - all duration - 300
              group - hover:translate-y-0
                  `}>
                    {tech.name}
                  </span>


                </div>
              );
            })}
          </div>
        </div>

      </div >
    </section >
  );
}
