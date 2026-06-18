import React, { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "components/HeroSection";
import {
    FiMail, FiPhone, FiMapPin, FiClock, FiSend,
    FiGithub, FiTwitter, FiLinkedin, FiInstagram,
    FiCheckCircle, FiArrowRight
} from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
    const [mounted, setMounted] = useState(false);
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const cardRefs = useRef([]);
    const socialRefs = useRef([]);
    const footerRef = useRef(null);
    const [formStatus, setFormStatus] = useState({ submitted: false, success: false, message: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const timeoutId = setTimeout(() => {
            if (!sectionRef.current) return;

            const ctx = gsap.context(() => {
                const elements = [];
                if (titleRef.current) elements.push(titleRef.current);
                if (subtitleRef.current) elements.push(subtitleRef.current);

                if (elements.length > 0) {
                    gsap.fromTo(elements,
                        { y: 40, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            stagger: 0.2,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }

                if (formRef.current) {
                    gsap.fromTo(formRef.current,
                        { y: 50, opacity: 0, scale: 0.98 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: formRef.current,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }

                const validCardRefs = cardRefs.current.filter(ref => ref !== null);
                if (validCardRefs.length > 0) {
                    gsap.fromTo(validCardRefs,
                        { y: 30, opacity: 0, scale: 0.95 },
                        {
                            y: 0,
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            stagger: 0.15,
                            ease: "back.out(1.4)",
                            scrollTrigger: {
                                trigger: cardsContainerRef.current,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }

                const validSocialRefs = socialRefs.current.filter(ref => ref !== null);
                if (validSocialRefs.length > 0) {
                    gsap.fromTo(validSocialRefs,
                        { scale: 0, opacity: 0 },
                        {
                            scale: 1,
                            opacity: 1,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "back.out(1.7)",
                            scrollTrigger: {
                                trigger: cardsContainerRef.current,
                                start: "top 80%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }

                if (footerRef.current) {
                    gsap.fromTo(footerRef.current,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: footerRef.current,
                                start: "top 90%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            }, sectionRef);

            return () => ctx.revert();
        }, 200);

        return () => {
            clearTimeout(timeoutId);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [mounted]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus({ submitted: true, success: true, message: 'Thank you! We\'ll get back to you soon.' });

        setTimeout(() => {
            setFormStatus({ submitted: false, success: false, message: '' });
            setFormData({
                name: '',
                email: '',
                message: ''
            });
        }, 3000);
    };

    if (!mounted) {
        return (
            <div className="min-h-screen bg-white">
                <HeroSection
                    title="CONTACT US"
                    subtitle="Building a legacy of innovation and trust"
                    backgroundImage="/img-4.jpg"
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Helmet>
                <title>Contact Us | RidenTech</title>
                <meta name="description" content="Get in touch with RidenTech for your next software project. We're here to help you innovate." />
            </Helmet>
            <HeroSection
                title="CONTACT US"
                subtitle="Building a legacy of innovation and trust"
                backgroundImage="/img-4.jpg"
            />

            <section ref={sectionRef} className="py-16 md:py-20 px-4 md:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 ref={titleRef} className=" font-semibold text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-4">
                            Get in{" "}
                            <span className="text-accent italic ">
                                Touch
                            </span>
                        </h2>
                        <p ref={subtitleRef} className=" text-gray-600 max-w-2xl mx-auto">
                            Have a project in mind? We'd love to hear about it. Fill out the form and we'll get back to you within 24 hours.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        <div className="lg:col-span-7">
                            <div
                                ref={formRef}
                                className="bg-accent rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                            >
                                <div className="p-6 bg-accent">
                                    <div className="flex items-center gap-3">
                                        <FiSend className="w-6 h-6 text-white" />
                                        <h3 className=" text-xl text-white">
                                            Send Us a Message
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8 bg-gray-50">
                                    {formStatus.submitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FiCheckCircle className="w-10 h-10 text-green-600" />
                                            </div>
                                            <h3 className=" font-semibold text-xl text-gray-900 mb-2">Message Sent!</h3>
                                            <p className=" text-gray-600">{formStatus.message}</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div>
                                                <label className="block  text-sm font-medium text-gray-700 mb-2">
                                                    Your Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white text-gray-900"
                                                    placeholder="John Doe"
                                                />
                                            </div>

                                            <div>
                                                <label className="block  text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white text-gray-900"
                                                    placeholder="john@example.com"
                                                />
                                            </div>

                                            <div>
                                                <label className="block  text-sm font-medium text-gray-700 mb-2">
                                                    Your Message *
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows="5"
                                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors bg-white text-gray-900 resize-none"
                                                    placeholder="Tell us about your project..."
                                                ></textarea>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full bg-gray-900 text-white py-4 rounded-full  font-medium transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02] hover:shadow-xl hover:shadow-gray-900/20 overflow-hidden relative"
                                            >
                                                <span className="relative z-10">Send Message</span>
                                                <FiArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                                            </button>

                                            <p className="text-xs text-gray-500 text-center mt-4">
                                                By submitting this form, you agree to our privacy policy and terms of service.
                                            </p>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5">
                            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-200 sticky top-24">
                                <h3 className=" text-2xl text-gray-900 mb-6">
                                    Contact Information
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div
                                        ref={el => cardRefs.current[0] = el}
                                        className="group bg-white p-4 rounded-xl border border-gray-200 shadow-md cursor-pointer flex items-start gap-3 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-gray-900 text-lg flex-shrink-0">
                                            <FiMail />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className=" text-base font-semibold mb-0.5 text-gray-900">
                                                Email
                                            </h3>
                                            <p className=" text-gray-600 text-sm">team@riden.tech</p>
                                        </div>
                                        <FiArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-center" />
                                    </div>

                                    <div
                                        ref={el => cardRefs.current[1] = el}
                                        className="group bg-white p-4 rounded-xl border border-gray-200 shadow-md cursor-pointer flex items-start gap-3 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-gray-900 text-lg flex-shrink-0">
                                            <FiPhone />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className=" text-base font-semibold mb-0.5 text-gray-900">
                                                Call
                                            </h3>
                                            <p className=" text-gray-600 text-sm">+1 7787704050</p>
                                        </div>
                                        <FiArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-center" />
                                    </div>

                                    <div
                                        ref={el => cardRefs.current[2] = el}
                                        className="group bg-white p-4 rounded-xl border border-gray-200 shadow-md cursor-pointer flex items-start gap-3 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-gray-900 text-lg flex-shrink-0">
                                            <FiMapPin />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className=" text-base font-semibold mb-0.5 text-gray-900">
                                                Visit
                                            </h3>
                                            <p className=" text-gray-600 text-sm">15850 26 Ave, Surrey, BC V3Z 2N6, Canada</p>
                                        </div>
                                        <FiArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-center" />
                                    </div>
                                </div>

                                <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <FiClock className="w-5 h-5 text-gray-700" />
                                        <h4 className=" font-semibold text-gray-900">Office Hours</h4>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Monday - Friday</span>
                                            <span className=" text-gray-900">9:00 AM - 5:00 PM</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Sunday</span>
                                            <span className=" text-gray-900">Closed</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200">
                                    <h4 className=" font-semibold text-gray-900 mb-4">Follow Us</h4>
                                    <div className="flex gap-3">
                                        {[
                                            { icon: <FiGithub className="w-5 h-5" />, href: "#", label: "GitHub" },
                                            { icon: <FiTwitter className="w-5 h-5" />, href: "#", label: "Twitter" },
                                            { icon: <FiLinkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
                                            { icon: <FiInstagram className="w-5 h-5" />, href: "#", label: "Instagram" }
                                        ].map((social, index) => (
                                            <a
                                                key={index}
                                                ref={el => socialRefs.current[index] = el}
                                                href={social.href}
                                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-accent hover:text-white transition-all duration-300 hover:scale-110 border border-gray-200"
                                                aria-label={social.label}
                                            >
                                                {social.icon}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
