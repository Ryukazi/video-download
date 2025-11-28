import React, { useState, useEffect } from 'react';
import { getRandomAnimeBackground } from '../services/api';

const Hero = () => {
    const [backgroundImage, setBackgroundImage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load anime background on mount
        const loadBackground = async () => {
            const imageUrl = await getRandomAnimeBackground();
            if (imageUrl) {
                setBackgroundImage(imageUrl);
            }
            setLoading(false);
        };

        loadBackground();
    }, []);

    return (
        <div className="hero-section">
            {/* Background Image with Overlay */}
            <div className="hero-background">
                {backgroundImage && (
                    <img
                        src={backgroundImage}
                        alt="Anime background"
                        className={`hero-bg-image ${loading ? 'loading' : 'loaded'}`}
                    />
                )}
                <div className="hero-overlay"></div>
            </div>

            {/* Hero Content */}
            <div className="hero-content">
                <h1 className="hero-title animate-fade-in">
                    Download Any Video. <span className="gradient-text">Instantly.</span>
                </h1>
                <p className="hero-subtitle animate-fade-in delay-100">
                    High-quality, fast, and 100% free. Your favorite content, offline.
                </p>
                <div className="hero-features animate-fade-in delay-200">
                    <div className="feature-badge">
                        <span className="feature-icon">⚡</span>
                        <span>Lightning Fast</span>
                    </div>
                    <div className="feature-badge">
                        <span className="feature-icon">🎬</span>
                        <span>HD Quality</span>
                    </div>
                    <div className="feature-badge">
                        <span className="feature-icon">🔒</span>
                        <span>100% Free</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
