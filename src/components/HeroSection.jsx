import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection({
    title = "WHAT WE DO",
    subtitle = "We blend innovative design, strategic insights, and cutting-edge technology to build digital experiences that drive growth, engagement, and lasting impact for your business.",
    backgroundImage = null,
}) {
    const [mounted, setMounted] = useState(false);

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        setMounted(true);

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const timeoutId = setTimeout(() => {
            if (!sectionRef.current) return;

            const ctx = gsap.context(() => {
                // Header animations only
                if (titleRef.current) {
                    gsap.fromTo(
                        titleRef.current,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            ease: "power4.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 95%",
                                once: true,
                            },
                        }
                    );
                }

                if (subtitleRef.current) {
                    gsap.fromTo(
                        subtitleRef.current,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            delay: 0.1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 95%",
                                once: true,
                            },
                        }
                    );
                }

                if (buttonRef.current) {
                    gsap.fromTo(
                        buttonRef.current,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            delay: 0.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 95%",
                                once: true,
                            },
                        }
                    );
                }
            }, sectionRef);

            return () => ctx.revert();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <section
            ref={sectionRef}
            className={`w-full min-h-[60vh] lg:h-[75vh] flex items-center justify-center pt-24 pb-16 px-6 md:px-20 overflow-hidden relative ${!backgroundImage ? "bg-white" : ""}`}
        >
            {/* Background Image lazily loaded */}
            {backgroundImage && (
                <img
                    src={backgroundImage}
                    alt="Hero Background"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            )}

            {/* Dark Overlay if background image exists */}
            {backgroundImage && (
                <div className="absolute inset-0 bg-gray-900/60 z-0"></div>
            )}

            {/* Header Only - No Image - Z-index to be above overlay */}
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="relative mb-6 md:mb-8 flex justify-center">
                    <h1
                        ref={titleRef}
                        className={`  font-semibold text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-black uppercase leading-[0.9] md:leading-[0.85] tracking-tight ${backgroundImage ? "text-white" : "text-gray-900"}`}
                    >
                        {title}
                    </h1>
                </div>

                {subtitle && (
                    <p
                        ref={subtitleRef}
                        className={`  text-base md:text-lg  max-w-2xl md:max-w-4xl mx-auto leading-relaxed ${backgroundImage ? "text-gray-200" : "text-gray-600"}`}
                    >
                        {subtitle}
                    </p>
                )}

                <div className="mt-8 md:mt-10 flex justify-center opacity-0" ref={buttonRef}>
                    <Link
                        to="/contact"
                        className={`group relative inline-flex items-center gap-2 px-8 md:px-10 py-3.5 md:py-4 rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl ${backgroundImage ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}
                    >
                        <span className="relative z-10   font-semibold tracking-wide text-sm md:text-base">
                            Get in Touch
                        </span>
                        <div className={`absolute inset-0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${backgroundImage ? "bg-gradient-to-r from-gray-200 to-white" : "bg-gradient-to-r from-accent to-accent/90"}`} />
                        <svg
                            className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
