import React, { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

// استيراد المكونات الجاهزة تبعك
import Loading from '../Allcomponent/Loading'; 
import CraftCard from '../Allcomponent/CraftCard';
import VenueSlider from '../Allcomponent/Slider'; // تأكدي أن السلايدر بملف منفصل بهذا الاسم

const crafts = [
    { id: 1, title: "Floral Designer", desc: "Petals & Elegance", icon: "🌸" },
    { id: 2, title: "Cake Artisan", desc: "Sweet Masterpieces", icon: "🎂" },
    { id: 3, title: "Grand Hall", desc: "Prestigious Venues", icon: "🏰" },
    { id: 4, title: "Photography", desc: "Timeless Memories", icon: "📸" },
    { id: 5, title: "Event Planner", desc: "Seamless Luxury", icon: "🎉" },
    { id: 6, title: "Music & DJ", desc: "Royal Beats", icon: "🎵" },
];

const Services = () => {
    const [showSlider, setShowSlider] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCardClick = () => {
        toast.success("أهلاً بعودتك ✨", {
            duration: 3000,
            style: {
                background: '#111',
                color: '#fff',
                border: '1px solid #DCC8BB',
                padding: '16px',
                borderRadius: '12px',
                fontWeight: 'bold'
            },
        });

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setShowSlider(true);
        }, 2000);
    };

    return (
        <>
            <Toaster position="top-right" />

            <div
                style={{
                    backgroundColor: '#f4e9e2',
                    minHeight: '100vh',
                    padding: '60px 20px',
                    fontFamily: 'serif',
                    position: 'relative',
                    boxSizing: 'border-box'
                }}
            >
                {/* واجهة التحميل باستخدام المكون تبعك */}
                {isLoading && (
                    <div className="modal-overlay">
                        <Loading />
                    </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h1 style={{ color: '#8d6e63', fontSize: '38px', marginBottom: '10px', fontStyle: 'italic' }}>
                        Select Your Craft
                    </h1>
                    <p style={{ color: '#a1887f', letterSpacing: '3px', fontSize: '13px', fontWeight: 'bold' }}>
                        JOIN THE ROYAL FAMILY
                    </p>
                </div>

                {/* شبكة الكروت */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '30px',
                        maxWidth: '1000px',
                        margin: '0 auto'
                    }}
                >
                    {crafts.map((item) => (
                        <CraftCard 
                            key={item.id}
                            title={item.title}
                            desc={item.desc}
                            icon={item.icon}
                            onClick={handleCardClick}
                        />
                    ))}
                </div>

                {/* الواجهة المنبثقة وجواتها السلايدر كمكون منفصل */}
                {showSlider && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <button
                                className="close-btn"
                                onClick={() => setShowSlider(false)}
                            >
                                ✕
                            </button>
                            <VenueSlider />
                        </div>
                    </div>
                )}

                {/* الستستايل الخاص بالـ Modal والهوفير للكروت */}
                <style>{`
                    .royal-card:hover {
                        transform: translateY(-10px);
                        background-color: #d7ccc8 !important;
                    }

                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.7);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 9999;
                    }

                    .modal-content {
                        background: #DCC8BB;
                        padding: 30px;
                        border-radius: 40px;
                        width: 90%;
                        max-width: 1100px;
                        position: relative;
                        animation: slideIn 0.3s ease-out;
                    }

                    .close-btn {
                        position: absolute;
                        top: 15px;
                        right: 20px;
                        background: #DCC8BB;
                        border: none;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        color: white;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 14px;
                        font-weight: bold;
                    }

                    @keyframes slideIn {
                        from { transform: scale(0.9); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `}</style>
            </div>
        </>
    );
};

export default Services;