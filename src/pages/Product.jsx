import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingCart, Star, ChevronUp, Trash2, ShieldCheck, Truck, RotateCcw, Info, Tag, Package } from 'lucide-react';
import api, { API_URL } from '../api';
import { useCart } from '../context/CartContext';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Box,
    Button,
    Snackbar,
    Alert,
    Divider,
    Chip,
    Fade,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react';
import ProductDetailsModal from '../components/ProductDetailsModal';

const ProductsPage = () => {
    const navigate = useNavigate();

    const { cartItems, addToCart, isInCart, removeFromCart } = useCart();
    const [expandedProduct, setExpandedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [imageErrors, setImageErrors] = useState({});
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Pharmacy and household",
        "Fashion",
        "Mobile",
        "Electronics",
        "Beauty & Cosmetics",
        "Toys and baby toys",
        "Food & health",
        "Auto & accessories",
        "Sports & games",
        "Books & education",
        "Furniture",
        "Footwear",
        "Jwellery & accessories",
        "Appliances",
        "Everyday needs",
        "Grocery"
    ];

    // Notifications State
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    // Modal State
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await api.get('/products');
            console.log('Products fetched:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const location = useLocation();
    useEffect(() => {
        if (products.length > 0 && location.state?.productId) {
            const product = products.find(p => p._id === location.state.productId);
            if (product) {
                setSelectedProduct(product);
                setIsModalOpen(true);
                // Clear state to prevent modal reappearing on back/refresh
                window.history.replaceState({}, document.title);
            }
        }
    }, [products, location.state]);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesCategory = selectedCategory === "All";
        if (!matchesCategory) {
            if (selectedCategory === "Beauty & Cosmetics") {
                matchesCategory = product.category === "Beauty & Cosmetics" || product.category === "Beauty and cosmetic home based products";
            } else {
                matchesCategory = product.category === selectedCategory;
            }
        }

        return matchesSearch && matchesCategory;
    });

    // Helper: check if user is logged in
    const isLoggedIn = () => {
        try {
            const user = localStorage.getItem('user');
            return user && JSON.parse(user);
        } catch {
            return false;
        }
    };

    // Buy Now function
    const buyNow = (product) => {
        if (!isLoggedIn()) {
            setSnackbar({ open: true, message: 'Please login first to buy products!', severity: 'error' });
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        if (product.stock > 0) {
            navigate('/checkout', {
                state: { product }
            });
        } else {
            setSnackbar({ open: true, message: `${product.name} is out of stock!`, severity: 'error' });
        }
    };

    // Toggle product details
    const openProductModal = (product) => {
        setIsDescExpanded(false); // Reset expansion state
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleAddToCart = (product) => {
        if (!isLoggedIn()) {
            setSnackbar({ open: true, message: 'Please login first to add items to cart!', severity: 'error' });
            setTimeout(() => navigate('/login'), 1500);
            return;
        }
        if (isInCart(product._id)) {
            setSnackbar({ open: true, message: `${product.name} is already in your cart!`, severity: 'warning' });
            return;
        }
        addToCart(product);
        setSnackbar({ open: true, message: `${product.name} added to cart!`, severity: 'success' });
    };

    const handleRemoveFromCart = (productId, productName) => {
        removeFromCart(productId);
        setSnackbar({ open: true, message: `${productName} removed from cart!`, severity: 'info' });
    };

    // Calculate discount percentage
    const calculateDiscount = (price, oldPrice) => {
        if (!oldPrice || oldPrice <= price) return null;
        const discount = ((oldPrice - price) / oldPrice) * 100;
        return Math.round(discount);
    };

    // Render rating stars
    const renderRatingStars = (rating) => {
        const stars = [];
        const roundedRating = Math.round(rating * 2) / 2;

        for (let i = 1; i <= 5; i++) {
            if (i <= roundedRating) {
                stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
            } else if (i - 0.5 === roundedRating) {
                stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />);
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
            }
        }
        return stars;
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount || 0);
    };


    const handleImageError = (productId) => {
        setImageErrors(prev => ({ ...prev, [productId]: true }));
        console.log(`Image load failed for product: ${productId}`);
    };

    // इमेज URL बनाने के लिए फंक्शन
    const getImageUrl = (imageName) => {
        if (!imageName) return null;
        if (imageName.startsWith('http')) return imageName;
        const path = imageName.startsWith('/uploads') ? imageName : `/uploads/${imageName}`;
        return `${API_URL}${path}`;
    };

    return (
        <div className="min-h-screen bg-[#0D0D0D] text-[#F5E6C8]">
            {/* Header with Cart */}
            {/* Premium Header Container */}
            <div className="bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-[#C8A96A]/20 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:flex w-12 h-12 bg-gradient-to-br from-[#C8A96A] to-[#D4AF37] rounded-2xl items-center justify-center shadow-lg shadow-gold-900/20 ring-4 ring-[#C8A96A]/10">
                                <ShoppingCart className="w-6 h-6 text-[#0D0D0D]" />
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#C8A96A] tracking-tight">
                                    Our Products
                                </h1>
                                <p className="text-[11px] md:text-xs text-[#F5E6C8]/60 font-medium uppercase tracking-[0.3em] mt-1">
                                    Trusted Quality • Premium Lifestyle
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {/* Modern Search Bar */}
                            <div className="relative flex-1 md:w-72 group">
                                <input
                                    type="text"
                                    placeholder="Search for items..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#1A1A1A] border border-[#C8A96A]/20 rounded-xl text-sm text-[#F5E6C8] focus:outline-none focus:ring-2 focus:ring-[#C8A96A]/20 focus:border-[#C8A96A] transition-all placeholder:text-gray-500"
                                />
                                <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-500 group-focus-within:text-[#C8A96A] transition-colors" />
                            </div>

                            {/* Premium Cart Button */}
                            <button
                                className="relative p-2.5 bg-[#1A1A1A] hover:bg-[#C8A96A]/10 rounded-xl border border-[#C8A96A]/20 hover:border-[#C8A96A]/50 transition-all duration-300 group"
                                onClick={() => navigate('/my-account/cart')}
                            >
                                <ShoppingCart className="w-6 h-6 text-[#C8A96A] group-hover:scale-110 transition-transform" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg border-2 border-[#0D0D0D]">
                                        {cartItems.reduce((acc, item) => acc + (item.cartQuantity || 1), 0)}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Navigation */}
            <div className="bg-[#0D0D0D] border-b border-[#C8A96A]/10 sticky top-[60px] md:top-[80px] z-10 overflow-x-auto no-scrollbar">
                <div className="max-w-7xl mx-auto px-4 py-3 flex gap-3 whitespace-nowrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                                ? "bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] shadow-lg shadow-gold-900/20"
                                : "bg-[#1A1A1A] text-[#F5E6C8]/60 hover:text-[#C8A96A] hover:bg-[#1A1A1A]/80 border border-transparent hover:border-[#C8A96A]/20"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#C8A96A] border-t-transparent shadow-[0_0_15px_rgba(200,169,106,0.3)]"></div>
                        <p className="mt-4 text-[#C8A96A] font-medium tracking-widest uppercase text-xs">Loading Excellence...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-[#1A1A1A] rounded-3xl border border-[#C8A96A]/10 glass-morphism">
                        <div className="text-6xl mb-4">✨</div>
                        <h3 className="text-xl font-serif font-bold text-[#C8A96A] mb-2">No items discovered</h3>
                        <p className="text-[#F5E6C8]/60">Try exploring our other premium categories</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filteredProducts.map((product, index) => {
                            const discount = calculateDiscount(product.price, product.oldPrice);
                            const hasImageError = imageErrors[product._id];
                            const imageUrl = getImageUrl(product.image);

                            return (
                                <div
                                    key={product._id}
                                    className="bg-[#1A1A1A] rounded-2xl border border-[#C8A96A]/10 hover:border-[#C8A96A]/40 transition-all duration-500 group animate-slide-up glass-morphism overflow-hidden relative"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    {/* Product Image */}
                                    <div className="relative h-64 bg-[#0D0D0D] overflow-hidden">
                                        {product.image && !hasImageError ? (
                                            <img
                                                src={imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                                onError={() => handleImageError(product._id)}
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-[#C8A96A]/40 bg-[#1A1A1A]">
                                                <Package className="w-12 h-12 mb-2" />
                                                <span className="text-[10px] uppercase tracking-tighter">Premium Collection</span>
                                            </div>
                                        )}

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                                        {/* Offer Badge */}
                                        {discount && (
                                            <div className="absolute top-3 left-3 bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] text-[10px] font-black px-3 py-1 rounded-full shadow-xl">
                                                {discount}% OFF
                                            </div>
                                        )}

                                        {/* Out of Stock Overlay */}
                                        {product.stock === 0 && (
                                            <div className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center backdrop-blur-sm">
                                                <span className="bg-[#3B2F2F] text-[#C8A96A] border border-[#C8A96A]/30 px-5 py-2 rounded-full text-xs font-bold shadow-2xl tracking-widest uppercase">
                                                    Reserved
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-5">
                                        {/* Rating */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="flex items-center gap-0.5">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star
                                                        key={star}
                                                        className={`w-3 h-3 ${star <= Math.round(product.rating || 5)
                                                            ? "fill-[#C8A96A] text-[#C8A96A]"
                                                            : "text-gray-700"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            {product.numReviews > 0 && (
                                                <span className="text-[10px] text-[#F5E6C8]/40 font-medium">
                                                    ({product.numReviews})
                                                </span>
                                            )}
                                        </div>

                                        {/* Product Name & Category */}
                                        <div className="mb-4">
                                            <span className="text-[9px] font-bold text-[#C8A96A] uppercase tracking-[0.2em] mb-1 block">
                                                {product.category === "Beauty and cosmetic home based products" ? "Beauty & Cosmetics" : product.category}
                                            </span>
                                            <h3 className="font-serif font-bold text-[#F5E6C8] text-base group-hover:text-[#C8A96A] transition-colors duration-300 leading-tight line-clamp-2 min-h-[2.5rem]">
                                                {product.name}
                                            </h3>
                                        </div>

                                        {/* Price Section */}
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-xl font-bold text-[#C8A96A]">
                                                    ₹{formatCurrency(product.price)}
                                                </span>
                                                {product.oldPrice && (
                                                    <span className="text-xs text-[#F5E6C8]/30 line-through">
                                                        ₹{formatCurrency(product.oldPrice)}
                                                    </span>
                                                )}
                                            </div>
                                            {product.bv && (
                                                <div className="px-2 py-0.5 rounded bg-[#C8A96A]/10 border border-[#C8A96A]/20">
                                                    <span className="text-[9px] font-bold text-[#C8A96A]">BV: {product.bv}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="grid grid-cols-2 gap-2 mt-auto">
                                            {isInCart(product._id) ? (
                                                <button
                                                    onClick={() => handleRemoveFromCart(product._id, product.name)}
                                                    className="py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 border border-[#3B2F2F] text-[#F5E6C8]/60 hover:bg-[#3B2F2F] hover:text-[#C8A96A]"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" /> Remove
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={product.stock === 0}
                                                    className={`py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 border border-[#C8A96A]/30 ${product.stock === 0
                                                        ? 'opacity-30 cursor-not-allowed'
                                                        : 'text-[#C8A96A] hover:bg-[#C8A96A] hover:text-[#0D0D0D]'
                                                        }`}
                                                >
                                                    <ShoppingCart className="w-3.5 h-3.5" /> Add
                                                </button>
                                            )}
                                            <button
                                                onClick={() => buyNow(product)}
                                                disabled={product.stock === 0}
                                                className={`py-2.5 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center shadow-lg ${product.stock > 0
                                                    ? 'bg-gradient-to-r from-[#C8A96A] to-[#D4AF37] text-[#0D0D0D] hover:shadow-gold-900/40 hover:-translate-y-0.5'
                                                    : 'bg-[#3B2F2F] text-[#C8A96A]/40 cursor-not-allowed'
                                                    }`}
                                            >
                                                Buy Now
                                            </button>
                                            <button
                                                onClick={() => openProductModal(product)}
                                                className="col-span-2 py-2 rounded-xl text-[10px] font-bold text-[#C8A96A]/60 hover:text-[#C8A96A] border border-[#C8A96A]/10 hover:border-[#C8A96A]/40 transition-all mt-1"
                                            >
                                                VIEW COLLECTION DETAILS
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Product Details Modal */}
            <ProductDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={(id, name) => handleRemoveFromCart(id, name)}
                onBuyNow={buyNow}
                isInCart={selectedProduct ? isInCart(selectedProduct._id) : false}
            />

            {/* Global Notifications Snackbar */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{
                        width: '100%',
                        borderRadius: '16px',
                        fontWeight: 700,
                        boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
                        bgcolor: '#1A1A1A',
                        color: '#C8A96A',
                        border: '1px solid #C8A96A/20',
                        '& .MuiAlert-icon': { color: '#C8A96A' }
                    }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ProductsPage;
