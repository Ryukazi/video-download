import React, { useState, useEffect } from 'react';
import { getRandomCharacters } from '../services/api';

const FloatingCharacters = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const loadCharacters = async () => {
            const images = await getRandomCharacters(6); // Fetch 6 images

            // Generate random positions and properties for each image
            const charsWithProps = images.map((img, index) => ({
                id: index,
                src: img,
                style: {
                    left: `${Math.random() * 90}%`, // Random horizontal position
                    top: `${Math.random() * 80 + 10}%`, // Random vertical position (avoiding very top)
                    animationDelay: `${Math.random() * 5}s`, // Random animation start
                    animationDuration: `${10 + Math.random() * 10}s`, // Random float speed
                    transform: `scale(${0.5 + Math.random() * 0.5})`, // Random size
                    zIndex: -1
                }
            }));

            setCharacters(charsWithProps);
        };

        loadCharacters();
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {characters.map((char) => (
                <div
                    key={char.id}
                    className="floating-char absolute"
                    style={char.style}
                >
                    <img
                        src={char.src}
                        alt="Anime Character"
                        className="w-48 h-auto object-cover rounded-xl opacity-40 hover:opacity-60 transition-opacity duration-500"
                    />
                </div>
            ))}
        </div>
    );
};

export default FloatingCharacters;
