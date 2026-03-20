import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const TrainingSection = ({ supportItems, trainingImage, handleNavigation }) => {
    return (
        <section className="py-24 bg-[#121212] relative overflow-hidden" >
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3 order-2 md:order-1">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#C8A96A] relative inline-block pb-4 mb-6 tracking-tight">
                            Training & <span className="text-[#F5E6C8]">Support</span> System
                            <span className="absolute bottom-0 left-0 w-24 h-1 bg-gradient-to-r from-[#C8A96A] to-transparent"></span>
                        </h2>
                        <p className="text-[#F5E6C8]/80 text-base font-light leading-relaxed mb-8">
                            We believe success comes with knowledge and guidance. That’s why we provide structured training programs, online resources, offline seminars, and continuous mentorship to help every partner grow confidently.
                        </p>
                        <h3 className="text-xs font-bold text-[#C8A96A] uppercase tracking-[3px] mt-6 mb-4">Support Includes</h3>
                        <div className="grid grid-cols-1 gap-3 mb-10">
                            {supportItems.map((item, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <div className="w-1.5 h-1.5 bg-[#C8A96A] rounded-full"></div>
                                    <span className="text-sm text-[#F5E6C8]/70 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => handleNavigation('/training')}
                            className="inline-flex items-center text-[#C8A96A] text-sm font-bold hover:text-[#D4AF37] transition-all group tracking-widest uppercase"
                        >
                            Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </div>
                    <div className="relative order-1 md:order-2 group">
                        <img src={trainingImage} alt="Training" className="rounded-3xl shadow-2xl w-full h-[350px] object-cover border border-[#C8A96A]/10" />
                        <div className="absolute -bottom-6 -left-6 bg-[#1A1A1A] p-5 rounded-2xl shadow-2xl border border-[#C8A96A]/20 glass-morphism">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#C8A96A]/20 rounded-xl flex items-center justify-center">
                                    <Play className="w-6 h-6 text-[#C8A96A]" fill="currentColor" />
                                </div>
                                <div>
                                    <div className="font-bold text-[#F5E6C8] text-sm">Leadership Programs</div>
                                    <div className="text-[10px] text-[#C8A96A] font-bold uppercase tracking-widest mt-1">Top 10 in India</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrainingSection;
