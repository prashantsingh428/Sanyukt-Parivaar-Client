import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import api from '../api';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: '',
        email: ''  // Email field add kiya
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            console.log('Submitting contact form:', formData);

            // Send data to backend
            const response = await api.post('/contact', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message
            });

            console.log('Contact form response:', response.data);

            // Show success message
            setSubmitSuccess(true);
            setFormData({
                name: '',
                email: '',  // Email bhi clear karo
                phone: '',
                message: ''
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);

        } catch (error) {
            console.error('Contact form error:', error);

            if (error.response) {
                setError(error.response.data.message || 'Failed to send message. Please try again.');
            } else if (error.request) {
                setError('No response from server. Please check your internet connection.');
            } else {
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Embed Google Map URL for Chandrapur location
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.116773634476!2d79.296244!3d19.979614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd2d8f9b8b8b8b9%3A0x123456789abcdef!2sTukum%2C%20Chandrapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin";

    return (
        <div className="min-h-screen bg-[#0D0D0D] font-sans text-[#F5E6C8] selection:bg-[#C8A96A]/30">
            {/* Elegant Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#C8A96A]/5 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 px-4 py-16 md:py-24">
                {/* Main Heading */}
                <div className="text-center mb-20 animate-slide-down">
                    <div className="inline-block mb-4 px-6 py-1.5 rounded-full border border-[#C8A96A]/20 bg-[#C8A96A]/5">
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#C8A96A]">Seamless Connection</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#F5E6C8] mb-8 tracking-tight drop-shadow-2xl">
                        Contact <span className="text-[#C8A96A]">Concierge</span>
                    </h1>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent mx-auto"></div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left Column - Contact Form */}
                    {/* Left Column - Contact Form */}
                    <div className="animate-slide-left">
                        <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-[#C8A96A]/10 shadow-3xl overflow-hidden flex flex-col h-full group hover:border-[#C8A96A]/30 transition-all duration-700">
                            {/* Form Header */}
                            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-10 border-b border-[#C8A96A]/10">
                                <h2 className="text-3xl font-serif font-bold text-[#F5E6C8]">
                                    Direct Inquiry
                                </h2>
                                <p className="text-[#C8A96A]/60 mt-3 text-xs font-bold uppercase tracking-widest italic">
                                    Your message, our priority.
                                </p>
                            </div>

                            {/* Form Body */}
                            <form onSubmit={handleSubmit} className="p-10 flex-1 flex flex-col gap-8">
                                {submitSuccess && (
                                    <div className="p-5 bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] rounded-2xl animate-slide-down flex items-center space-x-3 text-sm font-bold">
                                        <Send className="h-5 w-5" />
                                        <span>Concierge notified. Expect a response shortly.</span>
                                    </div>
                                )}

                                {error && (
                                    <div className="p-5 bg-red-900/20 border border-red-500/30 text-red-400 rounded-2xl animate-slide-down text-sm font-bold">
                                        {error}
                                    </div>
                                )}

                                <div className="space-y-8 flex-1">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Name */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Legal Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Enter Full Name"
                                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl p-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                required
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Access Number</label>
                                            <div className="relative group/input">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Phone (Optional)"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-4 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Digital Mail</label>
                                        <div className="relative group/input">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Enter Email Address"
                                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-4 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Inquiry Details</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Compose your message here..."
                                            rows="4"
                                            className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl p-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm resize-none"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Send Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group relative w-full p-5 bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] font-black uppercase tracking-widest text-xs rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-gold-900/30 active:scale-[0.98] disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        {isSubmitting ? 'Transmitting...' : (
                                            <>
                                                Relay Message
                                                <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Column - Contact Information */}
                    <div className="animate-slide-right">
                        <div className="bg-[#1A1A1A] rounded-[2.5rem] border border-[#C8A96A]/10 shadow-3xl overflow-hidden flex flex-col h-full group hover:border-[#C8A96A]/30 transition-all duration-700">
                            {/* Info Header */}
                            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-10 border-b border-[#C8A96A]/10">
                                <h2 className="text-3xl font-serif font-bold text-[#F5E6C8]">
                                    Global Presence
                                </h2>
                                <p className="text-[#C8A96A]/60 mt-3 text-xs font-bold uppercase tracking-widest italic">
                                    Our doors are open to your vision.
                                </p>
                            </div>

                            <div className="p-10 space-y-12">
                                {[
                                    { icon: MapPin, title: 'Elite Headquarters', content: 'Sanyukt Parivaar & Rich Life Pvt.Ltd.,\nBhatiniya, Gopinathpur, Harraiya,\nBasti - 272130, Uttar Pradesh', link: null },
                                    { icon: Phone, title: 'Private Line', content: '+91 78803 70057', link: 'tel:+917880370057' },
                                    { icon: Mail, title: 'Secured Email', content: 'info@sanyuktparivaar.com', link: 'mailto:info@sanyuktparivaar.com' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-6 group/item">
                                        <div className="w-14 h-14 rounded-2xl bg-[#0D0D0D] border border-[#C8A96A]/20 flex items-center justify-center text-[#C8A96A] group-hover/item:bg-[#C8A96A] group-hover/item:text-[#0D0D0D] transition-all duration-500 shadow-lg">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-serif font-bold text-[#F5E6C8] mb-2 uppercase tracking-wide group-hover/item:text-[#C8A96A] transition-colors">{item.title}</h4>
                                            {item.link ? (
                                                <a href={item.link} className="text-[#F5E6C8]/60 text-sm font-medium hover:text-[#C8A96A] transition-colors whitespace-pre-line ring-0 outline-none">
                                                    {item.content}
                                                </a>
                                            ) : (
                                                <p className="text-[#F5E6C8]/60 text-sm font-medium whitespace-pre-line leading-relaxed">
                                                    {item.content}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Map Integration */}
                                <div className="pt-6">
                                    <div className="relative h-64 rounded-[2rem] overflow-hidden border border-[#C8A96A]/20 group/map">
                                        <iframe
                                            src={mapUrl}
                                            className="absolute inset-0 w-full h-full grayscale opacity-40 group-hover/map:grayscale-0 group-hover/map:opacity-80 transition-all duration-1000"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            title="Location"
                                        ></iframe>
                                        <div className="absolute inset-0 pointer-events-none border border-[#C8A96A]/10 rounded-[2rem]"></div>
                                        <a
                                            href="https://maps.google.com/?q=Tukum+Chandrapur+Maharashtra"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0D0D0D]/80 backdrop-blur-md border border-[#C8A96A]/30 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#0D0D0D] transition-all duration-500 pointer-events-auto"
                                        >
                                            Expand Domain Map
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ContactUs;