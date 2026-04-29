import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Layers, ArrowRight, Sparkles } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { industries } from "../data/industries";

gsap.registerPlugin(ScrollTrigger);



const industryData = industries.reduce((acc, industry) => {
    acc[industry.slug] = industry;
    return acc;
}, {});


export default function IndustryDetailPage() {
    const { slug } = useParams();
    const [mounted, setMounted] = useState(false);


    const sectionRef = useRef(null);
    const featuresRef = useRef([]);
    const solutionsRef = useRef([]);

    const imageRevealRef = useRef(null);
    const contentRevealRef = useRef(null);
    const hoverTl = useRef({});

    const solutionsBadgeRef = useRef(null);
    const solutionsTitleRef = useRef(null);
    const featuresBadgeRef = useRef(null);
    const featuresTitleRef = useRef(null);

    const industry = industryData[slug] || industries[0];

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(contentRevealRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(imageRevealRef.current,
                { scale: 0.9, opacity: 0, x: 50 },
                {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(solutionsBadgeRef.current,
                { y: -30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: solutionsBadgeRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(solutionsTitleRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: solutionsBadgeRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(featuresBadgeRef.current,
                { y: -30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: featuresBadgeRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(featuresTitleRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: featuresBadgeRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(featuresRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: "back.out(1.2)",
                    scrollTrigger: {
                        trigger: featuresRef.current[0],
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            gsap.fromTo(solutionsRef.current,
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: solutionsRef.current[0],
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );



            gsap.to('.industry-badge', {
                y: -4,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });


        }, sectionRef);

        return () => ctx.revert();
    }, [mounted, industry]);

    const handleFeatureMouseEnter = (index) => {
        const card = featuresRef.current[index];
        if (!card) return;

        if (hoverTl.current[`feature-${index}`]) {
            hoverTl.current[`feature-${index}`].kill();
        }

        const tl = gsap.timeline();
        tl.to(card, {
            scale: 1.05,
            y: -8,
            boxShadow: "0 25px 30px -12px rgba(0, 0, 0, 0.25)",
            borderColor: "#000000",
            duration: 0.4,
            ease: "power2.out"
        });

        hoverTl.current[`feature-${index}`] = tl;
    };

    const handleFeatureMouseLeave = (index) => {
        const card = featuresRef.current[index];
        if (!card) return;

        if (hoverTl.current[`feature-${index}`]) {
            hoverTl.current[`feature-${index}`].kill();
        }

        const tl = gsap.timeline();
        tl.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            borderColor: "#E5E7EB",
            duration: 0.4,
            ease: "power2.out"
        });

        hoverTl.current[`feature-${index}`] = tl;
    };

    const handleSolutionMouseEnter = (index) => {
        const card = solutionsRef.current[index];
        if (!card) return;

        if (hoverTl.current[`solution-${index}`]) {
            hoverTl.current[`solution-${index}`].kill();
        }

        const tl = gsap.timeline();
        tl.to(card.querySelector('p'), {
            x: 4,
            duration: 0.4,
            ease: "power2.out"
        }, 0)
            .to(card.querySelector('.w-3.h-3.bg-black'), {
                scale: 1.5,
                duration: 0.4,
                ease: "back.out(1.2)"
            }, 0);

        hoverTl.current[`solution-${index}`] = tl;
    };

    const handleSolutionMouseLeave = (index) => {
        const card = solutionsRef.current[index];
        if (!card) return;

        if (hoverTl.current[`solution-${index}`]) {
            hoverTl.current[`solution-${index}`].kill();
        }

        const tl = gsap.timeline();
        tl.to(card.querySelector('p'), {
            x: 0,
            duration: 0.3,
            ease: "power2.out"
        }, 0)
            .to(card.querySelector('.w-3.h-3.bg-black'), {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            }, 0);

        hoverTl.current[`solution-${index}`] = tl;
    };


    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>{industry.title} | Industries | RidenTech</title>
                <meta name="description" content={industry.subtitle} />
                <meta property="og:title" content={`${industry.title} | Industries | RidenTech`} />
                <meta property="og:description" content={industry.subtitle} />
                <meta property="og:image" content={industry.image} />
            </Helmet>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Link
                    to="/industries"
                    className="group inline-flex items-center text-sm text-gray-600 hover:text-black transition-colors  relative overflow-hidden"
                >
                    <span className="absolute inset-0 bg-gray-100 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 -z-10"></span>
                    <ChevronLeft className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1" />
                    Back to Industries
                </Link>
            </div>

            <section ref={sectionRef} className="py-12 md:py-16 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        <div ref={contentRevealRef} className="relative">

                            <div className="relative inline-block mb-4 group">
                                <h1 className="  font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900">
                                    {industry.title}
                                </h1>
                            </div>

                            <h2 className=" text-xl text-gray-700 mb-6 leading-relaxed">
                                {industry.subtitle}
                            </h2>

                            <p className=" text-gray-600 leading-relaxed text-lg">
                                {industry.description}
                            </p>

                        </div>

                        <div ref={imageRevealRef} className="relative group">
                            <div className="relative h-[300px] md:h-[450px] w-full  rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={industry.image}
                                    alt={industry.title}
                                    className="industry-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%23f3f4f6' width='600' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='18'%3ENo Image%3C/text%3E%3C/svg%3E";
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div
                            ref={solutionsBadgeRef}
                            className="inline-flex items-center bg-accent/10 border border-accent/20 text-gray-900 rounded-full px-5 py-2.5 mb-6 shadow-lg"
                        >
                            <Layers className="w-4 h-4 mr-2 text-accent" />
                            <span className="text-sm  text-gray-800 tracking-wide">WHAT WE OFFER</span>
                        </div>

                        <h2
                            ref={solutionsTitleRef}
                            className="  font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-2"
                        >
                            Our <span className="text-accent italic">Solutions</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {industry.solutions.map((solution, index) => (
                            <div
                                key={index}
                                ref={el => solutionsRef.current[index] = el}
                                className="group relative bg-white p-6 rounded-xl border border-gray-200 transition-all duration-500 cursor-pointer overflow-hidden hover:shadow-2xl hover:shadow-black/10"
                                onMouseEnter={() => handleSolutionMouseEnter(index)}
                                onMouseLeave={() => handleSolutionMouseLeave(index)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="absolute inset-0 bg-accent transform scale-0 group-hover:scale-100 transition-transform duration-700 ease-out rounded-xl opacity-0 group-hover:opacity-5"></div>

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-accent rounded-full group-hover:scale-150 group-hover:bg-accent/80 transition-all duration-500"></div>
                                        <div className="absolute inset-0 w-3 h-3 bg-accent rounded-full animate-ping opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                                    </div>

                                    <p className=" text-gray-800 group-hover:text-gray-900 transition-all duration-500 group-hover:translate-x-1 text-base md:text-lg">
                                        {solution}
                                    </p>

                                    <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-500 text-gray-700" />
                                </div>

                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <div
                            ref={featuresBadgeRef}
                            className="inline-flex items-center bg-accent/10 border border-accent/20 text-gray-900 rounded-full px-5 py-2.5 mb-6 shadow-lg"
                        >
                            <Sparkles className="w-4 h-4 mr-2 text-accent" />
                            <span className="text-sm  text-gray-800 tracking-wide">KEY CAPABILITIES</span>
                        </div>

                        <h2
                            ref={featuresTitleRef}
                            className="  font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-2"
                        >
                            What Makes Us <span className="text-accent italic">Different</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {industry.features.map((feature, index) => (
                            <div
                                key={index}
                                ref={el => featuresRef.current[index] = el}
                                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 cursor-default group relative overflow-hidden"
                                onMouseEnter={() => handleFeatureMouseEnter(index)}
                                onMouseLeave={() => handleFeatureMouseLeave(index)}
                            >
                                <div className="absolute inset-0 bg-gray-50 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>

                                <div className="relative z-10">
                                    <div className="mb-4">
                                        {/* Icon removed by user request */}
                                    </div>
                                    <h3 className=" font-semibold text-lg text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className=" text-sm text-gray-600">
                                        {feature.description}
                                    </p>
                                    <div className="w-0 h-0.5 bg-accent mt-4 group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
