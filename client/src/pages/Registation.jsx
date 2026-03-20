import React, { useState, useEffect, useRef } from 'react';
import {
    Users,
    Phone,
    Mail,
    Home,
    ChevronDown,
    MapPin,
    Building,
    Flag,
    TreePine,
    Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

import { addressData } from '../data/addressData';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const stateDropdownRef = useRef(null);
    const districtDropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        sponsorId: '',
        sponsorName: '',
        userName: '',
        fatherName: '',
        position: '',
        gender: '',
        mobile: '',
        email: '',
        shippingAddress: '',
        state: '',
        district: '',
        city: '',
        password: '',
        assemblyArea: '',
        block: '',
        villageCouncil: '',
        village: '',
        packageType: 'none',
    });

    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const [isDistrictDropdownOpen, setIsDistrictDropdownOpen] = useState(false);
    const [stateSearch, setStateSearch] = useState('');
    const [districtSearch, setDistrictSearch] = useState('');

    const states = Object.keys(addressData).sort();

    const filteredStates = states.filter(s =>
        s.toLowerCase().includes(stateSearch.toLowerCase())
    );

    // Safe access to districts with error handling
    const getDistrictsForState = (state) => {
        try {
            if (!state) return [];
            const stateData = addressData[state];
            return stateData ? Object.keys(stateData) : [];
        } catch (error) {
            console.error("Error getting districts:", error);
            return [];
        }
    };

    const districts = getDistrictsForState(formData.state);

    const filteredDistricts = districts.filter(d =>
        d.toLowerCase().includes(districtSearch.toLowerCase())
    );


    useEffect(() => {
        const fetchSponsorName = async () => {
            if (formData.sponsorId.length >= 3) { // Trigger only for reasonable length
                try {
                    const res = await api.get(`/sponsor/${formData.sponsorId}`);
                    if (res.data.name) {
                        setFormData(prev => ({ ...prev, sponsorName: res.data.name }));
                    }
                } catch (err) {
                    setFormData(prev => ({ ...prev, sponsorName: '' }));
                }
            } else {
                setFormData(prev => ({ ...prev, sponsorName: '' }));
            }
        };

        const timeoutId = setTimeout(fetchSponsorName, 500); // Debounce
        return () => clearTimeout(timeoutId);
    }, [formData.sponsorId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target)) {
                setIsStateDropdownOpen(false);
            }
            if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target)) {
                setIsDistrictDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
        setSuccess('');
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setProfileImage(reader.result);
        reader.readAsDataURL(file);
    };

    const validateForm = () => {
        if (!agreed) {
            setError("Please accept the terms and conditions");
            return false;
        }

        const requiredFields = [
            { field: 'sponsorId', message: 'Sponsor ID' },
            { field: 'userName', message: 'User Name' },
            { field: 'fatherName', message: 'Father Name' },
            { field: 'position', message: 'Position' },
            { field: 'gender', message: 'Gender' },
            { field: 'mobile', message: 'Mobile Number' },
            { field: 'email', message: 'Email ID' },
            { field: 'password', message: 'Password' },
            { field: 'shippingAddress', message: 'Shipping Address' },
            { field: 'state', message: 'State' },
            { field: 'district', message: 'District' },
            { field: 'assemblyArea', message: 'Assembly' },
            { field: 'block', message: 'Block' },
            { field: 'villageCouncil', message: 'Village Council' },
            { field: 'village', message: 'Village' }
        ];

        for (let item of requiredFields) {
            if (!formData[item.field] || formData[item.field].trim() === '') {
                setError(`Please enter ${item.message}`);
                return false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.mobile)) {
            setError("Please enter a valid 10-digit mobile number");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        if (!validateForm()) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const payload = { ...formData };
            if (profileImage) payload.profileImage = profileImage;
            const response = await api.post("/register", payload);

            if (response.data) {
                setSuccess("Registration successful! Redirecting to verification...");

                localStorage.setItem('registrationEmail', formData.email);
                localStorage.setItem('registrationMobile', formData.mobile);

                setTimeout(() => {
                    navigate("/verify-otp", {
                        state: {
                            email: formData.email,
                            mobile: formData.mobile
                        }
                    });
                }, 1500);
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Registration failed. Please try again.");
            } else if (error.request) {
                setError(`No response from server. Check if backend is live at: ${api.defaults.baseURL}`);
            } else {
                setError("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] font-sans text-[#F5E6C8] selection:bg-[#C8A96A]/30 p-4 md:p-6 lg:p-12 relative overflow-hidden">
            {/* Elegant Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-[#C8A96A]/5 rounded-full blur-[140px] animate-pulse"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] animate-pulse delay-700"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Breadcrumb - Deluxe Edition */}
                <div className="flex items-center space-x-3 mb-12 animate-slide-right">
                    <div className="p-2 bg-[#1A1A1A] border border-[#C8A96A]/10 rounded-lg shadow-xl">
                        <Home className="h-4 w-4 text-[#C8A96A]" />
                    </div>
                    <Link to="/" className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F5E6C8]/40 hover:text-[#C8A96A] transition-colors">Origins</Link>
                    <div className="w-1 h-1 rounded-full bg-[#C8A96A]/20"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C8A96A]">Elite Membership</span>
                </div>

                {/* Main Grid */}
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl animate-slide-up">
                        <div className="bg-[#1A1A1A] rounded-[3rem] shadow-4xl overflow-hidden border border-[#C8A96A]/10 group hover:border-[#C8A96A]/20 transition-all duration-700">
                            {/* Header - Elite Gold */}
                            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] px-10 py-12 text-center relative overflow-hidden border-b border-[#C8A96A]/10">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8A96A]/5 rounded-full blur-3xl"></div>
                                
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#F5E6C8] tracking-tight mb-4">
                                    Membership <span className="text-[#C8A96A]">Registration</span>
                                </h2>
                                <p className="text-[#C8A96A]/60 text-xs font-bold uppercase tracking-[0.3em] italic">Forge your legacy within Sanyukt Parivaar</p>
                            </div>

                            {/* Error Display */}
                            {error && (
                                <div className="mx-10 mt-10 p-5 bg-red-900/20 border border-red-500/30 text-red-400 rounded-2xl animate-slide-down text-sm font-bold flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    {error}
                                </div>
                            )}

                            {/* Success Display */}
                            {success && (
                                <div className="mx-10 mt-10 p-5 bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] rounded-2xl animate-slide-down text-sm font-bold flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#C8A96A] animate-pulse"></div>
                                    {success}
                                </div>
                            )}

                            {/* Form Body */}
                            <form onSubmit={handleSubmit} noValidate className="p-10 md:p-12">
                                <div className="grid grid-cols-1 gap-10">
                                    {/* Sponsor Section Header */}
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C8A96A]/20"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C8A96A]/40">Legacy Alignment</span>
                                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C8A96A]/20"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Sponsor Id */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Sponsor Identity <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                                <input
                                                    type="text"
                                                    name="sponsorId"
                                                    value={formData.sponsorId}
                                                    onChange={handleChange}
                                                    placeholder="Enter Sponsor ID"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-4 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Sponsor Name */}
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]/40">Verified Sponsor</label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="sponsorName"
                                                    value={formData.sponsorName}
                                                    onChange={handleChange}
                                                    placeholder="Sponsor Identity"
                                                    readOnly
                                                    className="w-full bg-[#0D0D0D]/50 border border-[#C8A96A]/10 rounded-2xl px-6 py-4 text-[#C8A96A]/60 placeholder:text-[#F5E6C8]/10 focus:outline-none transition-all font-serif italic text-sm cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Position Dropdown */}
                                    <div className="space-y-3 group/input">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Strategic Position <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Flag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors z-10" />
                                            <select
                                                name="position"
                                                value={formData.position}
                                                onChange={handleChange}
                                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-10 py-4 text-[#F5E6C8] appearance-none focus:border-[#C8A96A] outline-none transition-all font-medium text-sm cursor-pointer relative z-0"
                                                required
                                            >
                                                <option value="" className="bg-[#1A1A1A]">- Select Alignment -</option>
                                                <option value="Left" className="bg-[#1A1A1A]">Elite Left</option>
                                                <option value="Right" className="bg-[#1A1A1A]">Elite Right</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 pointer-events-none group-hover/input:text-[#C8A96A] transition-colors" />
                                        </div>
                                    </div>

                                    {/* Personal Identity Section Header */}
                                    <div className="flex items-center gap-4 mt-4 mb-2">
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C8A96A]/20"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C8A96A]/40">Personal Credentials</span>
                                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C8A96A]/20"></div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Name */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Legal Name <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                                <input
                                                    type="text"
                                                    name="userName"
                                                    value={formData.userName}
                                                    onChange={handleChange}
                                                    placeholder="Full Identity"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-4 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Father Name */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Lineage/Guardian <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <TreePine className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                                <input
                                                    type="text"
                                                    name="fatherName"
                                                    value={formData.fatherName}
                                                    onChange={handleChange}
                                                    placeholder="Guardian Name"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-4 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Gender Dropdown */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Gender Identity <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <select
                                                    name="gender"
                                                    value={formData.gender}
                                                    onChange={handleChange}
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-6 py-4 text-[#F5E6C8] appearance-none focus:border-[#C8A96A] outline-none transition-all font-medium text-sm cursor-pointer"
                                                    required
                                                >
                                                    <option value="" className="bg-[#1A1A1A]">- Select -</option>
                                                    <option value="Male" className="bg-[#1A1A1A]">Gentleman</option>
                                                    <option value="Female" className="bg-[#1A1A1A]">Lady</option>
                                                    <option value="Other" className="bg-[#1A1A1A]">Other</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 pointer-events-none group-hover/input:text-[#C8A96A] transition-colors" />
                                            </div>
                                        </div>

                                        {/* Mobile Number */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Secure Line <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    value={formData.mobile}
                                                    onChange={handleChange}
                                                    placeholder="10-Digit Secure Line"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-4 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                    required
                                                    maxLength="10"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Email ID */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Digital Mail <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Verified Email Address"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-4 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Secret Key <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="Authentication Key"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-6 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Logistics & Region Section Header */}
                                    <div className="flex items-center gap-4 mt-4 mb-2">
                                        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C8A96A]/20"></div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C8A96A]/40">Regional Logistics</span>
                                        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C8A96A]/20"></div>
                                    </div>

                                    {/* Shipping Address */}
                                    <div className="space-y-3 group/input">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Fulfillment Address <span className="text-red-500">*</span></label>
                                        <p className="text-[10px] text-[#F5E6C8]/30 mb-2 font-medium italic">
                                            Specify complete coordinates including City, Pincode & State.
                                        </p>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-4 h-4 w-4 text-[#C8A96A]/40 group-hover/input:text-[#C8A96A] transition-colors" />
                                            <textarea
                                                name="shippingAddress"
                                                value={formData.shippingAddress}
                                                onChange={handleChange}
                                                placeholder="Enter Full Address"
                                                rows="3"
                                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl pl-12 pr-4 py-4 text-[#F5E6C8] placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all font-medium text-sm resize-none"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* State Select */}
                                        <div className="space-y-3 relative" ref={stateDropdownRef}>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Jurisdiction/State <span className="text-red-500">*</span></label>
                                            <div
                                                onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                                                className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-6 py-4 flex items-center justify-between cursor-pointer focus:border-[#C8A96A] transition-all font-medium text-sm group/select"
                                            >
                                                <span className={formData.state ? 'text-[#F5E6C8]' : 'text-[#F5E6C8]/20'}>
                                                    {formData.state || '- Select -'}
                                                </span>
                                                <ChevronDown className={`h-4 w-4 text-[#C8A96A]/40 transition-transform group-hover/select:text-[#C8A96A] ${isStateDropdownOpen ? 'rotate-180' : ''}`} />
                                            </div>

                                            <AnimatePresence>
                                                {isStateDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="absolute z-[100] w-full mt-2 bg-[#1A1A1A] border border-[#C8A96A]/20 rounded-2xl shadow-4xl overflow-hidden"
                                                    >
                                                        <div className="p-4 bg-[#0D0D0D] border-b border-[#C8A96A]/10">
                                                            <div className="relative">
                                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40" />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search..."
                                                                    value={stateSearch}
                                                                    onChange={(e) => setStateSearch(e.target.value)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="w-full pl-10 pr-4 py-2 text-sm bg-[#1A1A1A] border border-[#C8A96A]/10 rounded-xl text-[#F5E6C8] focus:border-[#C8A96A] focus:outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="max-h-60 overflow-y-auto premium-scrollbar bg-[#1A1A1A]">
                                                            {filteredStates.length > 0 ? (
                                                                filteredStates.map((st) => (
                                                                    <div
                                                                        key={st}
                                                                        onClick={() => {
                                                                            setFormData({ ...formData, state: st, district: '', assemblyArea: '' });
                                                                            setIsStateDropdownOpen(false);
                                                                            setStateSearch('');
                                                                        }}
                                                                        className={`px-6 py-3.5 text-sm cursor-pointer transition-colors hover:bg-[#C8A96A]/10 hover:text-[#C8A96A] ${formData.state === st ? 'bg-[#C8A96A]/20 text-[#C8A96A] font-bold' : 'text-[#F5E6C8]/60'
                                                                            }`}
                                                                    >
                                                                        {st}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="px-6 py-8 text-sm text-[#F5E6C8]/20 text-center italic">
                                                                    Zero Results
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* District Select */}
                                        <div className="space-y-3 relative" ref={districtDropdownRef}>
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Sector/District <span className="text-red-500">*</span></label>
                                            <div
                                                onClick={() => {
                                                    if (!formData.state) return;
                                                    setIsDistrictDropdownOpen(!isDistrictDropdownOpen);
                                                }}
                                                className={`w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-6 py-4 flex items-center justify-between cursor-pointer focus:border-[#C8A96A] transition-all font-medium text-sm group/select ${!formData.state ? 'opacity-30 cursor-not-allowed' : ''}`}
                                            >
                                                <span className={formData.district ? 'text-[#F5E6C8]' : 'text-[#F5E6C8]/20'}>
                                                    {formData.district || '- Select -'}
                                                </span>
                                                <ChevronDown className={`h-4 w-4 text-[#C8A96A]/40 transition-transform group-hover/select:text-[#C8A96A] ${isDistrictDropdownOpen ? 'rotate-180' : ''}`} />
                                            </div>

                                            <AnimatePresence>
                                                {isDistrictDropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        className="absolute z-[100] w-full mt-2 bg-[#1A1A1A] border border-[#C8A96A]/20 rounded-2xl shadow-4xl overflow-hidden"
                                                    >
                                                        <div className="p-4 bg-[#0D0D0D] border-b border-[#C8A96A]/10">
                                                            <div className="relative">
                                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C8A96A]/40" />
                                                                <input
                                                                    type="text"
                                                                    placeholder="Search..."
                                                                    value={districtSearch}
                                                                    onChange={(e) => setDistrictSearch(e.target.value)}
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="w-full pl-10 pr-4 py-2 text-sm bg-[#1A1A1A] border border-[#C8A96A]/10 rounded-xl text-[#F5E6C8] focus:border-[#C8A96A] focus:outline-none"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="max-h-60 overflow-y-auto premium-scrollbar bg-[#1A1A1A]">
                                                            {filteredDistricts.length > 0 ? (
                                                                filteredDistricts.map((d) => (
                                                                    <div
                                                                        key={d}
                                                                        onClick={() => {
                                                                            setFormData({ ...formData, district: d, assemblyArea: '' });
                                                                            setIsDistrictDropdownOpen(false);
                                                                            setDistrictSearch('');
                                                                        }}
                                                                        className={`px-6 py-3.5 text-sm cursor-pointer transition-colors hover:bg-[#C8A96A]/10 hover:text-[#C8A96A] ${formData.district === d ? 'bg-[#C8A96A]/20 text-[#C8A96A] font-bold' : 'text-[#F5E6C8]/60'
                                                                            }`}
                                                                    >
                                                                        {d}
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <div className="px-6 py-8 text-sm text-[#F5E6C8]/20 text-center italic">
                                                                    Zero Results
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Assembly Input */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Legislative/Assembly Area <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="assemblyArea"
                                                    value={formData.assemblyArea}
                                                    onChange={handleChange}
                                                    placeholder="Enter Assembly Area"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-6 py-4 text-[#F5E6C8] font-medium placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all text-sm"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Block */}
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Administrative Block <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="block"
                                                    value={formData.block}
                                                    onChange={handleChange}
                                                    placeholder="Enter Block"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-6 py-4 text-[#F5E6C8] font-medium placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Village Council & Village */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Village Council <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="villageCouncil"
                                                    value={formData.villageCouncil}
                                                    onChange={handleChange}
                                                    placeholder="Enter Council Name"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-6 py-4 text-[#F5E6C8] font-medium placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3 group/input">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-[#C8A96A]">Local Village <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="village"
                                                    value={formData.village}
                                                    onChange={handleChange}
                                                    placeholder="Enter Village Name"
                                                    className="w-full bg-[#0D0D0D] border border-[#C8A96A]/20 rounded-2xl px-6 py-4 text-[#F5E6C8] font-medium placeholder:text-[#F5E6C8]/20 focus:border-[#C8A96A] outline-none transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Agreement Checkbox */}
                                    <div className="flex items-start space-x-4 pt-4 group/check">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="checkbox"
                                                id="agreement"
                                                checked={agreed}
                                                onChange={(e) => setAgreed(e.target.checked)}
                                                className="peer w-6 h-6 border-2 border-[#C8A96A]/30 rounded-lg bg-[#0D0D0D] appearance-none checked:bg-[#C8A96A] checked:border-[#C8A96A] transition-all cursor-pointer"
                                            />
                                            <Check className="absolute w-4 h-4 text-[#0D0D0D] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                        <label htmlFor="agreement" className="text-xs text-[#F5E6C8]/60 font-medium leading-relaxed cursor-pointer select-none group-hover/check:text-[#F5E6C8]/80 transition-colors">
                                            I solemnly swear to abide by the <Link to="/terms" className="text-[#C8A96A] hover:underline font-bold">Code of Conduct</Link> and <Link to="/privacy" className="text-[#C8A96A] hover:underline font-bold">Privacy Mandates</Link> of Sanyukt Parivaar.
                                        </label>
                                    </div>

                                    {/* Submit Section */}
                                    <div className="flex flex-col items-center gap-8 pt-10 border-t border-[#C8A96A]/10 mt-6 md:pb-8">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className={`w-full relative group/btn overflow-hidden py-5 bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] font-black text-sm tracking-[0.2em] uppercase rounded-2xl transition-all duration-500 shadow-2xl shadow-[#C8A96A]/20 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[#C8A96A]/40 hover:-translate-y-1 active:scale-[0.98]'
                                                }`}
                                        >
                                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000 skew-x-12"></div>
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                {loading ? (
                                                    <span className="flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-[#0D0D0D] rounded-full animate-bounce"></div>
                                                        <div className="w-1.5 h-1.5 bg-[#0D0D0D] rounded-full animate-bounce delay-100"></div>
                                                        <div className="w-1.5 h-1.5 bg-[#0D0D0D] rounded-full animate-bounce delay-200"></div>
                                                    </span>
                                                ) : (
                                                    <>Establish Identity <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" /></>
                                                )}
                                            </span>
                                        </button>

                                        <p className="text-[#F5E6C8]/40 text-[10px] font-black uppercase tracking-widest">
                                            Already a Peer?{' '}
                                            <Link to="/login" className="text-[#C8A96A] hover:text-[#D4AF37] transition-colors font-black border-b border-[#C8A96A]/0 hover:border-[#C8A96A]/100 ml-2">
                                                Sign In
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;