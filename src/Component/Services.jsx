import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { Link } from 'react-router-dom';
import imgLazord from '../assets/imgLazord.jpg'; 
import imgBahia from '../assets/imgBahia.jpg';
import imgJalaa from '../assets/imgJalaa.jpg';

// استيراد المكونات الجاهزة تبعك
import Loading from '../Allcomponent/Loading'; 
import DashboardCard from '../Allcomponent/Card'; 

// البيانات الـ 6 الأصلية للواجهة الأولى
const crafts = [
    { id: 1, title: "Floral Designer", desc: "Petals & Elegance", icon: "🌸", bg: "#d7ccc8", color: "#5d4037" },
    { id: 2, title: "Cake Artisan", desc: "Sweet Masterpieces", icon: "🎂", bg: "#f5f5f5", color: "#616161" },
    { id: 3, title: "Grand Hall", desc: "Prestigious Venues", icon: "🏰", bg: "#e0f2f1", color: "#00695c" },
    { id: 4, title: "Photography", desc: "Timeless Memories", icon: "📸", bg: "#e8eaf6", color: "#283593" },
    { id: 5, title: "Event Planner", desc: "Seamless Luxury", icon: "🎉", bg: "#fce4ec", color: "#c2185b" },
    { id: 6, title: "Music & DJ", desc: "Royal Beats", icon: "🎵", bg: "#efebe9", color: "#4e342e" },
];

const moviesData = [
    { 
        id: 1, 
        title: "صالة لازورد", 
        location: "دمشق - المزة", 
        capacity: "السعة: 500 شخص", 
        rating: "8.9", 
        image: imgLazord 
    },
    { 
        id: 2, 
        title: "صالة البهية", 
        location: "دمشق - طريق المطار", 
        capacity: "السعة: 700 شخص", 
        rating: "9.2",
        image: imgBahia 
    },
    { 
        id: 3, 
        title: "صالة الجلاء", 
        location: "دمشق - أوتوستراد المزة", 
        capacity: "السعة: 400 شخص", 
        rating: "8.5",
        image: imgJalaa 
    },
];

const Services = () => {
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCardClick = () => {
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setShowResults(true); 
        }, 2000);
    };

    return (
        <>
            <Toaster position="top-right" />

            <div className={`services-page-container ${showResults ? 'dark-theme' : 'light-theme'}`}>
                
                {/* واجهة التحميل المنبثقة */}
                {isLoading && (
                    <div className="loading-overlay">
                        <Loading />
                    </div>
                )}

                {showResults ? (
                    /* ---------------- الصفحة الثانية: صفحة الصالات (تظهر بعد الضغط) ---------------- */
                    <div className="results-container" dir="rtl">
                        <button className="back-button" onClick={() => setShowResults(false)}>
                            ← العودة للقائمة رئيسية
                        </button>

                        <div className="movies-grid" style={{ marginTop: '20px' }}>
                            {moviesData.map((venue) => (
                                <div key={venue.id} className="movie-card">
                                    <div className="card-image-wrapper">
                                        <img src={venue.image} alt={venue.title} className="card-img" />
                                    </div>
                                    <div className="card-content">
                                        <div className="card-header">
                                            <h3 className="movie-title">{venue.title}</h3>
                                            <span className="heart-icon">🤍</span>
                                        </div>
                                        <div className="rating-container">
                                            <span className="star-icon">★</span>
                                            <span className="rating-value">{venue.rating}</span>
                                        </div>
                                        
                                        <p className="venue-info">📍 {venue.location}</p>
                                        <p className="venue-info">👥 {venue.capacity}</p>
                                        
                                        {/* 💡 التعديل هنا: تم تغيير الـ to لتوجه مباشرة إلى مسار التفاصيل العام بدون الـ ID */}
                                        <Link 
                                            to="/servicesdetails" 
                                            className="show-details-btn" 
                                            style={{ direction: 'ltr', textDecoration: 'none' }}
                                        >
                                            Show Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* ---------------- الواجهة الأولى: اختيار الـ Crafts (الأساسية) ---------------- */
                    <div className="main-selection-view">
                        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <h1 style={{ color: '#8d6e63', fontSize: '38px', marginBottom: '10px', fontStyle: 'italic' }}>
                                Select Your Craft
                            </h1>
                            <p style={{ color: '#a1887f', letterSpacing: '3px', fontSize: '13px', fontWeight: 'bold' }}>
                                JOIN THE ROYAL FAMILY
                            </p>
                        </div>

                        <div className="crafts-grid">
                            {crafts.map((item) => (
                                <div key={item.id} className="grid-card-wrapper" onClick={handleCardClick}>
                                    <DashboardCard 
                                        title={item.title} 
                                        bg={item.bg} 
                                        color={item.color}
                                        icon={<span style={{ fontSize: '32px' }}>{item.icon}</span>}
                                    >
                                        <p style={{ textAlign: 'center', color: '#64748B', margin: 0, fontSize: '14px' }}>
                                            {item.desc}
                                        </p>
                                    </DashboardCard>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* استايل الـ CSS الشامل والمقسم حسب الثيم */}
                <style>{`
                    .services-page-container {
                        min-height: 100vh;
                        padding: 60px 20px;
                        box-sizing: border-box;
                        transition: background-color 0.5s ease;
                    }

                    .light-theme {
                        background-color: #f4e9e2;
                        font-family: serif;
                    }

                    .dark-theme {
                        background-color: #121212;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }

                    .loading-overlay {
                        position: fixed;
                        top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0, 0, 0, 0.75);
                        display: flex; align-items: center; justify-content: center;
                        z-index: 9999;
                    }

                    .crafts-grid {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 30px;
                        max-width: 1000px;
                        margin: 0 auto;
                    }

                    .grid-card-wrapper {
                        cursor: pointer;
                        transition: transform 0.3s;
                    }
                    .grid-card-wrapper:hover {
                        transform: translateY(-8px);
                    }

                    .back-button {
                        background: none;
                        border: 1px solid #333;
                        color: #aaa;
                        padding: 8px 16px;
                        border-radius: 20px;
                        cursor: pointer;
                        margin-bottom: 25px;
                        transition: 0.3s;
                        font-weight: bold;
                    }
                    .back-button:hover { background: #222; color: #fff; }

                    .movies-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        gap: 30px;
                        max-width: 1100px;
                        margin: 0 auto;
                    }

                    .movie-card {
                        background-color: #181818;
                        border-radius: 16px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        border: 1px solid #222;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    }

                    .card-image-wrapper {
                        width: 100%;
                        height: 260px;
                        background: #252525;
                    }

                    .card-img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }

                    .card-content {
                        padding: 22px;
                        display: flex;
                        flex-direction: column;
                        flex-grow: 1;
                    }

                    .card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        color: #fff;
                        margin-bottom: 5px;
                    }

                    .movie-title { font-size: 22px; font-weight: bold; margin: 0; }

                    .rating-container { display: flex; align-items: center; gap: 5px; margin-bottom: 15px; }
                    .rating-value { color: #fff; font-weight: bold; font-size: 14px; }
                    .star-icon { color: #ffcc00; font-size: 16px; }

                    .venue-info { 
                        font-size: 14px; 
                        color: #bbb; 
                        margin: 0 0 10px 0; 
                        text-align: right;
                    }

                    .show-details-btn {
                        display: block;
                        background: none; border: none; color: #3b82f6; font-weight: bold;
                        font-size: 14px; cursor: pointer; padding: 10px 0 0 0; 
                        width: fit-content; transition: 0.2s; margin-top: auto;
                    }
                    .show-details-btn:hover { color: #60a5fa; text-decoration: underline; }

                    @media (max-width: 768px) {
                        .crafts-grid { grid-template-columns: 1fr; }
                    }
                `}</style>
            </div>
        </>
    );
};

export default Services;