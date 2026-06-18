import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Search } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from 'components/HeroSection';
import { getPublicPosts } from '../api/blogApi';
gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
    const sectionRef = useRef(null);
    const filterRef = useRef(null);
    const rowsRef = useRef([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState(["All"]);

    const normalizePost = (post) => ({
        ...post,
        imageUrl: post.featured_image_url || post.featured_image || post.imageUrl || '',
        category: post.category?.name || post.category || '',
        status: (post.status || '').toLowerCase(),
        readTime: post.read_time || post.readTime || 0,
        createdAt: post.created_at || post.createdAt,
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getPublicPosts();

                let extracted = [];
                if (Array.isArray(response)) extracted = response;
                else if (response?.posts && Array.isArray(response.posts)) extracted = response.posts;
                else if (response?.data) {
                    if (Array.isArray(response.data)) extracted = response.data;
                    else if (response.data.data && Array.isArray(response.data.data)) extracted = response.data.data;
                }

                const normalized = extracted.map(normalizePost);
                const publishedBlogs = normalized.filter(b => b.status === 'published');
                setBlogs(publishedBlogs);

                // Extract unique categories
                const cats = ["All", ...new Set(publishedBlogs.map(b => b.category))];
                setCategories(cats.filter(c => c));
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);


    useEffect(() => {
        if (isLoading) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(filterRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 65%",
                        toggleActions: "play none none none"
                    }
                }
            );

            rowsRef.current.forEach(row => {
                if (row) {
                    gsap.set(row.children, {
                        opacity: 0,
                        y: 50
                    });
                }
            });

            rowsRef.current.forEach((row) => {
                if (row) {
                    gsap.to(row.children, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 85%",
                            end: "bottom 20%",
                            toggleActions: "play none none none"
                        }
                    });
                }
            });


        }, sectionRef);

        return () => ctx.revert();
    }, [isLoading]);

    const filteredPosts = blogs.filter(post => {
        const matchesCategory = activeCategory === "All" || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getRows = (posts) => {
        const rows = [];
        for (let i = 0; i < posts.length; i += 3) {
            rows.push(posts.slice(i, i + 3));
        }
        return rows;
    };

    const rows = getRows(filteredPosts);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }),
            year: date.getFullYear()
        };
    };

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <HeroSection
                title="NEWS & BLOGS"
                subtitle="Insights, stories, and updates from our team"
                backgroundImage="/img-18.jpg"
            />
            <section ref={sectionRef} className="mt-10 pb-16 bg-white relative overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div ref={filterRef} className="mb-12">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex flex-wrap gap-3 justify-center">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm  font-medium transition-all duration-300 ${activeCategory === category
                                            ? "bg-accent     text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full md:w-64">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 pl-10 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400  text-gray-900"
                                />
                                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    {filteredPosts.length > 0 ? (
                        <div className="space-y-8 mt-16">
                            {rows.map((row, rowIndex) => (
                                <div
                                    key={rowIndex}
                                    ref={el => rowsRef.current[rowIndex] = el}
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {row.map((post) => {
                                        const date = formatDate(post.createdAt);
                                        return (
                                            <Link
                                                to={`/blogs/${post.slug}`}
                                                key={post.id}
                                                className="group bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-gray-400"
                                            >
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    <img
                                                        src={post.imageUrl || '/img-placeholder.jpg'}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect fill='%23f3f4f6' width='400' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='14'%3ENo Image%3C/text%3E%3C/svg%3E";
                                                        }}
                                                    />
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-accent text-white text-xs  font-semibold uppercase tracking-wider rounded-full shadow-sm">
                                                            {post.category || 'General'}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="p-6">
                                                    <div className="flex items-center gap-4 mb-3 text-gray-500">
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-4 h-4" />
                                                            <span className="text-sm ">{date.day} {date.month}, {date.year}</span>
                                                        </div>
                                                    </div>
                                                    <h3 className=" text-xl font-semibold text-gray-900 mb-3 line-clamp-1 group-hover:text-gray-700 transition-colors duration-300">
                                                        {post.title}
                                                    </h3>



                                                    <div className="flex items-left justify-between mt-4 pt-4 border-t border-gray-100">
                                                        <div className="flex items-center gap-1  transition-colors duration-300">
                                                            <span className=" text-accent text-sm font-medium">Read More</span>
                                                            <ArrowRight className=" text-accent w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className=" text-xl text-gray-500">No articles found matching your criteria.</p>
                        </div>
                    )}


                </div>
            </section>
        </div>
    );
}
