```javascript
import React, { useState, useEffect } from 'react';
import { getRandomCharacters } from '../services/api';

const FloatingCharacters = () => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const loadCharacter = async () => {
            // Fetch just 1 random character image
            const images = await getRandomCharacters(1);
            
            if (images.length > 0) {
                setCharacter({
                    src: images[0],
                    style: {
                        // Center-ish position but floating
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: -1,
                        opacity: 0.15 // Subtle background
                    }
                });
            }
        };

        loadCharacter();
    }, []);

    if (!character) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
            <div className="floating-bg-char">
                <img 
                    src={character.src} 
                    alt="Anime Background" 
                    className="max-w-[80vw] max-h-[80vh] object-contain opacity-20 filter blur-sm sm:blur-0 transition-all duration-1000"
                />
            </div>
        </div>
    );
};

export default FloatingCharacters;
```
