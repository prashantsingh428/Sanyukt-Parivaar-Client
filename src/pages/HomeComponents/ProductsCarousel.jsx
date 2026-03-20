import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { API_URL } from '../../api';

const ProductsCarousel = ({ 
    products, 
    scroll, 
    carouselRef, 
    calculateDiscount, 
    imageErrors, 
    handleImageError, 
    renderStars, 
    addToCart, 
    onProductClick,
    handleNavigation 
}) => {
    return (
        <section className="py-24 bg-[#121212] relative overflow-hidden" >
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="text-center md:text-left max-w-2xl">
                        <span className="text-[#C8A96A] font-bold text-sm tracking-widest uppercase mb-3 block">
                            Discover Quality
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#F5E6C8] mb-4">
                            Featured <span className="text-[#C8A96A]">Products</span>
                        </h2>
                        <p className="text-[#F5E6C8]/60 text-lg font-light">
                            Our best-selling products are trusted by customers and partners for their quality and effectiveness.
                        </p>
                    </div>

                    {/* Custom Navigation - Right Corner */}
                    <div className="flex gap-3 flex-shrink-0">
                        <button
                            onClick={() => scroll('left')}
                            className="w-14 h-14 rounded-full border-2 border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A] hover:border-[#C8A96A] hover:bg-[#C8A96A]/10 transition-all duration-300"
                        >
                            <ChevronDown className="w-6 h-6 rotate-90" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#C8A96A] to-[#D4AF37] flex items-center justify-center text-[#0D0D0D] shadow-xl shadow-gold-900/20 hover:scale-105 transition-all duration-300"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Products Carousel */}
                <div
                    ref={carouselRef}
                    className="flex gap-8 overflow-x-auto pb-12 pt-4 snap-x snap-mandatory scrollbar-hide no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => {
                        const price = product.price || product.dp || 0;
                        const oldPrice = product.oldPrice || product.mrp || 0;
                        const bv = product.bv || 0;
                        const rating = product.rating || 5;
                        const reviews = product.numReviews || product.reviews || 0;
                        const category = product.category || "General";
                        const discount = calculateDiscount(oldPrice, price);

                        // Image logic
                        const getImageUrl = (image) => {
                            if (!image) return null;
                            if (image.startsWith('http')) return image;
                            const path = image.startsWith('/uploads') ? image : `/uploads/${image}`;
                            return `${API_URL}${path}`;
                        };

                        const imageUrl = getImageUrl(product.image);

                        return (
                            <div
                                key={product._id || product.slug}
                                className="min-w-[260px] sm:min-w-[300px] md:min-w-[340px] snap-center"
                            >
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="bg-[#1A1A1A] rounded-[32px] shadow-2xl border border-[#C8A96A]/10 overflow-hidden transition-all duration-500 group relative gold-glow-hover"
                                >
                                    {/* Product Image Container */}
                                    <div 
                                        className="relative h-64 overflow-hidden bg-[#0D0D0D] flex items-center justify-center cursor-pointer"
                                        onClick={() => onProductClick(product)}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>

                                        {imageUrl && !imageErrors[product._id || product.name] ? (
                                            <motion.img
                                                whileHover={{ scale: 1.15 }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                src={imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                                onError={() => handleImageError(product._id || product.name)}
                                            />
                                        ) : (
                                            <div className="text-9xl grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110">
                                                {product.fallbackIcon || "📦"}
                                            </div>
                                        )}

                                        {/* Top Utility Buttons */}
                                        <div className="absolute top-6 left-6 flex flex-col items-start gap-3 z-20">
                                            {parseInt(discount) > 0 && (
                                                <span className="w-fit bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                                    -{discount}%
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Float Area */}
                                        <div className="absolute bottom-6 right-6 z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCart(product);
                                                }}
                                                className="w-16 h-16 rounded-full bg-gradient-to-br from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
                                            >
                                                <ShoppingCart className="w-7 h-7" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Product Details */}
                                        <div
                                            className="p-6 cursor-pointer group/details"
                                            onClick={() => onProductClick(product)}
                                        >
                                            <div className="flex items-center gap-1.5 mb-3">
                                                {renderStars(rating)}
                                                <span className="text-[10px] font-bold text-[#F5E6C8]/40 uppercase tracking-widest ml-1">
                                                    {reviews} Reviews
                                                </span>
                                            </div>

                                            <div className="flex flex-col gap-1.5 mb-2">
                                                <h3 className="text-xl font-bold text-[#F5E6C8] truncate group-hover:text-[#C8A96A] group-hover/details:text-[#C8A96A] transition-colors">
                                                    {product.name}
                                                </h3>
                                                <span className="w-fit text-[10px] font-bold bg-[#C8A96A]/10 text-[#C8A96A] px-2 py-1 rounded-md uppercase tracking-wider border border-[#C8A96A]/20">
                                                    {category === "Beauty and cosmetic home based products" ? "Beauty & Cosmetics" : category}
                                                </span>
                                            </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-bold text-[#C8A96A]">
                                                    ₹{price}
                                                </span>
                                                {oldPrice > price && (
                                                    <span className="text-[#F5E6C8]/30 text-xs line-through font-medium">
                                                        MRP ₹{oldPrice}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <span className="bg-orange-50 text-[#F7931E] px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border border-orange-100">
                                                    BV {bv}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-col gap-3">
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleNavigation('/checkout', { state: { product } })}
                                                className="w-full py-4 bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] font-bold rounded-xl transition-all duration-300 uppercase tracking-widest text-xs flex items-center justify-center gap-2 group/btn shadow-lg"
                                            >
                                                <span>Instant Buy</span>
                                                <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                                            </motion.button>
                                            
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onProductClick(product);
                                                }}
                                                className="w-full py-4 border-2 border-[#C8A96A]/30 text-[#C8A96A] font-bold rounded-xl hover:bg-[#C8A96A] hover:text-[#0D0D0D] transition-all duration-300 uppercase tracking-widest text-xs"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-40 -right-20 w-80 h-80 bg-green-50 rounded-full blur-3xl opacity-50 z-0"></div>
            <div className="absolute bottom-40 -left-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-50 z-0"></div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
};

export default ProductsCarousel;
