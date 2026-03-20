import React from 'react';
import { Shield } from 'lucide-react';

const AboutSection = ({ aboutImage, teamImages }) => {
    return (
        <section className="py-20 bg-[#121212] relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#C8A96A] inline-block relative pb-4 tracking-tight">
                        Who We Are
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent"></span>
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
                    <div className="space-y-3 text-gray-700 leading-relaxed order-2 md:order-1">
                        <h3 className="text-xl md:text-4xl font-serif font-bold text-[#F5E6C8] mb-6 leading-tight">
                            Sanyukt Parivaar & <br/>
                            <span className="text-[#C8A96A]">Rich Life Pvt.Ltd.</span>
                        </h3>
                        <p className="text-base text-[#F5E6C8]/80 font-light leading-relaxed">
                            Sanyukt Parivaar & Rich Life Pvt.Ltd. was founded with a clear vision to create financial independence through ethical direct selling. We believe in growing together as one family, where every member gets equal opportunity, proper training, and long-term support.
                        </p>
                        <p className="text-base text-[#F5E6C8]/80 font-light leading-relaxed">
                            Our company focuses on personal development, leadership growth, and community success while promoting reliable lifestyle, wellness, and personal care products.
                        </p>
                    </div>
                    <div className="relative order-1 md:order-2">
                        <img src={aboutImage} alt="About Us" className="rounded-lg shadow-xl w-full h-[300px] md:h-[350px] object-cover" />
                        <div className="absolute -bottom-6 -left-6 bg-[#1A1A1A] p-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-[#C8A96A]/20 glass-morphism animate-bounce" style={{ animationDuration: '4s' }}>
                            <div className="bg-[#C8A96A]/20 p-3 rounded-xl">
                                <Shield className="w-6 h-6 text-[#C8A96A]" />
                            </div>
                            <div className="flex flex-col pr-2">
                                <span className="text-2xl font-bold text-[#C8A96A] leading-none">100%</span>
                                <span className="text-[10px] font-bold text-[#F5E6C8]/60 uppercase tracking-[2px] mt-1">Certified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
