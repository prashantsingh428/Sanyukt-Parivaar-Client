import React, { useState, useEffect } from 'react';
import api, { API_URL } from '../../api';
import NewsDetailsModal from '../../components/NewsDetailsModal';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const NewsSection = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const { data } = await api.get(`/news?t=${new Date().getTime()}`);

            if (data.success) {
                setNewsItems(data.data);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewsClick = (news) => {
        setSelectedNews(news);
        setIsModalOpen(true);
    };

    const getImageUrl = (url) => {
        if (!url) return "https://via.placeholder.com/600x400";
        if (url.startsWith('http')) return url;
        // If the URL already starts with /uploads, don't prepend it again
        const path = url.startsWith('/uploads') ? url : `/uploads/${url}`;
        return `${API_URL}${path}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const d = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (d.toDateString() === today.toDateString()) {
            return "Today";
        } else if (d.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
        }
    };

    if (loading) {
        return (
            <div className="py-24 bg-[#121212] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C8A96A]"></div>
            </div>
        );
    }

    if (!loading && newsItems.length === 0) {
        return (
            <section className="py-24 bg-[#121212] text-center" >
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#F5E6C8] mb-4">
                        Latest News & <span className="text-[#C8A96A]">Updates</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent mx-auto mb-8"></div>
                    <p className="text-[#F5E6C8]/40 max-w-2xl mx-auto text-lg font-light">
                        No news updates available at the moment. Please check back later or visit the admin panel to add news.
                    </p>
                </div>
            </section>
        );
    }
    return (
        <section className="py-24 bg-[#121212] relative overflow-hidden" >
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-center text-[#F5E6C8] mb-4">
                    Latest News & <span className="text-[#C8A96A]">Updates</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent mx-auto mb-8"></div>
                <p className="text-center text-[#F5E6C8]/60 mb-16 max-w-2xl mx-auto text-sm md:text-lg font-light leading-relaxed">
                    Stay updated with the latest company announcements, seminar schedules, product launches, and success stories from our growing Sanyukt Parivaar family.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {newsItems.map((news) => (
                        <div
                            key={news._id}
                            onClick={() => handleNewsClick(news)}
                            className="group bg-[#1A1A1A] rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col border border-[#C8A96A]/10 hover:border-[#C8A96A]/30 gold-glow-hover"
                        >
                            {/* Cover Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={getImageUrl(news.image)}
                                    alt={news.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-[#C8A96A] text-[#0D0D0D] text-[10px] font-bold tracking-widest uppercase rounded-lg shadow-lg">
                                        {news.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-3 mb-4 text-[#F5E6C8]/40 text-xs font-medium">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5 text-[#C8A96A]" />
                                        <span>{formatDate(news.createdAt)}</span>
                                    </div>
                                    <span className="text-[#F5E6C8]/20">•</span>
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5 text-[#C8A96A]" />
                                        <span>{news.readTime}</span>
                                    </div>
                                </div>

                                <h4 className="font-bold text-[#F5E6C8] text-lg mb-4 leading-snug group-hover:text-[#C8A96A] transition-colors duration-300 line-clamp-2">
                                    {news.title}
                                </h4>

                                <p className="text-sm text-gray-500 line-clamp-2 mb-6 flex-1">
                                    {news.content}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-[#C8A96A]/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] flex items-center justify-center font-bold text-[10px]">
                                            {news.authorAvatar || (news.author ? news.author[0] : 'A')}
                                        </div>
                                        <span className="text-xs font-semibold text-[#F5E6C8]/70">{news.author || 'Admin'}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-[#C8A96A] font-bold text-xs group-hover:gap-2 transition-all">
                                        READ MORE <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <NewsDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                news={selectedNews}
            />
        </section>
    );
};

export default NewsSection;
