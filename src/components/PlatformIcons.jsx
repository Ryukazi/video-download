import React from 'react';

const platforms = [
    { name: 'Instagram', color: '#E1306C' },
    { name: 'TikTok', color: '#000000' }, // TikTok black/white, handled by CSS usually but here simple
    { name: 'YouTube', color: '#FF0000' },
    { name: 'Facebook', color: '#1877F2' },
    { name: 'Pinterest', color: '#BD081C' },
    { name: 'Twitter', color: '#1DA1F2' },
    { name: 'Reddit', color: '#FF4500' },
    { name: 'Spotify', color: '#1DB954' },
];

const PlatformIcons = () => {
    return (
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 my-6 sm:my-8 px-2 animate-fade-in delay-100">
            {platforms.map((platform) => (
                <span
                    key={platform.name}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium glass text-gray-300 border border-white/10"
                >
                    {platform.name}
                </span>
            ))}
        </div>
    );
};

export default PlatformIcons;
