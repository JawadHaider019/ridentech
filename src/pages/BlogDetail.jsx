import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Twitter, Facebook, Linkedin, Copy, Check, User } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getPublicPost } from '../api/blogApi';
import MarkdownRenderer from "../components/MarkdownRenderer";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPostPage() {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const normalizePost = (post) => ({
        ...post,
        imageUrl: post.featured_image_url || post.featured_image || post.imageUrl || '',
        category: post.category?.name || post.category || '',
        status: (post.status || '').toLowerCase(),
        readTime: post.read_time || post.readTime || 0,
        createdAt: post.created_at || post.createdAt,
        metaDescription: post.meta_description || post.metaDescription || '',
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await getPublicPost(slug);
                let data = null;

                if (response?.post) data = response.post;
                else if (response?.data) data = response.data;
                else data = response;

                // Handles Laravel nested .data object wrappers
                if (data && data.data && typeof data.data === 'object' && !Array.isArray(data.data)) {
                    data = data.data;
                }

                if (data) {
                    setPost(normalizePost(data));
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }),
            year: date.getFullYear()
        };
    };

    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const metaRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const authorRef = useRef(null);
    const shareRef = useRef(null);

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!post) return;

        const ctx = gsap.context(() => {
            gsap.set([titleRef.current, metaRef.current, imageRef.current, contentRef.current, authorRef.current, shareRef.current], {
                opacity: 0,
                y: 30
            });

            gsap.to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            gsap.to(metaRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none none"
                }
            });

            gsap.to(imageRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });

            gsap.to(contentRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    toggleActions: "play none none none"
                }
            });

            gsap.to(authorRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    toggleActions: "play none none none"
                }
            });

            gsap.to(shareRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 40%",
                    toggleActions: "play none none none"
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [post]);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className=" text-4xl text-gray-900 mb-4">Post Not Found</h1>
                <Link to="/blogs" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900  transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                </Link>
            </div>
        );
    }

    const postDate = formatDate(post.createdAt);

    return (
        <section ref={sectionRef} className="py-16 bg-white text-gray-900 relative overflow-hidden">
            <Helmet>
                <title>{post.title} | RidenTech Blog</title>
                <meta name="description" content={post.metaDescription || post.excerpt} />
                <meta property="og:title" content={`${post.title} | RidenTech Blog`} />
                <meta property="og:description" content={post.metaDescription || post.excerpt} />
                <meta property="og:image" content={post.imageUrl} />
                <meta property="og:type" content="article" />
            </Helmet>
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-100 rounded-full filter blur-3xl opacity-20"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900  transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Blog
                    </Link>
                </div>

                <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm  font-semibold uppercase tracking-wider rounded-full">
                        {post.category || 'General'}
                    </span>
                </div>

                <h1 ref={titleRef} className=" text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
                    {post.title}
                </h1>

                <div ref={metaRef} className="flex flex-wrap items-center gap-6 mb-8 text-gray-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm ">{postDate.day} {postDate.month}, {postDate.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm ">{post.readTime} min read</span>
                    </div>
                </div>

                <div ref={imageRef} className="relative h-[400px] w-full mb-12 rounded-2xl overflow-hidden shadow-xl">
                    <img
                        src={post.imageUrl || '/img-placeholder.jpg'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect fill='%23f3f4f6' width='800' height='400'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='20'%3EImage Not Found%3C/text%3E%3C/svg%3E";
                        }}
                    />
                </div>

                <div
                    ref={contentRef}
                    className="max-w-none text-gray-700 mb-12"
                >
                    <MarkdownRenderer content={post.content} />
                </div>

                <div ref={authorRef} className="flex items-start gap-6 p-8 bg-gray-50 rounded-2xl mb-12">
                    <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-900 flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                        <User size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl  text-gray-900 mb-2">RidenTech Team</h4>
                        <p className="text-gray-600  text-sm leading-relaxed max-w-2xl">
                            Our team of industry experts and technology enthusiasts is dedicated to sharing the latest insights,
                            trends, and innovations in the digital landscape. We empower businesses to ride the wave of digital transformation.
                        </p>
                    </div>
                </div>

                <div ref={shareRef} className="flex items-center justify-between pt-8 border-t border-gray-200">
                    <span className=" text-sm font-medium text-gray-700">Share this article:</span>
                    <div className="flex items-center gap-3">
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <Twitter className="w-4 h-4 text-gray-700" />
                        </a>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <Facebook className="w-4 h-4 text-gray-700" />
                        </a>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                        >
                            <Linkedin className="w-4 h-4 text-gray-700" />
                        </a>
                        <button
                            onClick={handleCopyLink}
                            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-700" />}
                        </button>
                    </div>
                </div>

                <div className="w-full mt-16 h-px bg-gray-200"></div>
            </div>
        </section>
    );
}
