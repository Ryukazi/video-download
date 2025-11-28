const API_ENDPOINTS = {
    instagram: (url) => `https://universal-dl-one.vercel.app/api/instagram?url=${encodeURIComponent(url)}`,
    tiktok: (url) => `https://universal-dl-one.vercel.app/api/tiktok?url=${encodeURIComponent(url)}`,
    youtube: (url) => `https://universal-dl-one.vercel.app/api/youtube?url=${encodeURIComponent(url)}`,
    facebook: (url) => `https://universal-dl-one.vercel.app/api/facebook?url=${encodeURIComponent(url)}`,
    pinterest: (url) => `https://universal-dl-one.vercel.app/api/pinterest?url=${encodeURIComponent(url)}`,
    twitter: (url) => `https://universal-dl-one.vercel.app/api/twitter?url=${encodeURIComponent(url)}`,
    reddit: (url) => `https://universal-dl-one.vercel.app/api/reddit?url=${encodeURIComponent(url)}`,
    spotify: (url) => `https://universal-dl-one.vercel.app/api/spotify?url=${encodeURIComponent(url)}`
};

const chooseApiUrl = (url) => {
    const lowerUrl = url.toLowerCase();
    if (lowerUrl.includes('instagram.com') || lowerUrl.includes('instagr.am')) return API_ENDPOINTS.instagram(url);
    if (lowerUrl.includes('tiktok.com') || lowerUrl.includes('vm.tiktok.com') || lowerUrl.includes('vt.tiktok.com')) return API_ENDPOINTS.tiktok(url);
    if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) return API_ENDPOINTS.youtube(url);
    if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch') || lowerUrl.includes('fb.com')) return API_ENDPOINTS.facebook(url);
    if (lowerUrl.includes('pinterest.com') || lowerUrl.includes('pin.it')) return API_ENDPOINTS.pinterest(url);
    if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com') || lowerUrl.includes('t.co')) return API_ENDPOINTS.twitter(url);
    if (lowerUrl.includes('reddit.com')) return API_ENDPOINTS.reddit(url);
    if (lowerUrl.includes('spotify.com')) return API_ENDPOINTS.spotify(url);
    return null;
};

/**
 * Fetches video data from the Universal Downloader API.
 * @param {string} url - The URL of the video to download.
 * @returns {Promise<object>} - The JSON response from the API.
 */
export const fetchVideoData = async (url) => {
    try {
        console.log('fetchVideoData called with URL:', url);

        const fetchUrl = chooseApiUrl(url);

        if (!fetchUrl) {
            throw new Error('Unsupported platform. Please check the URL and try again.');
        }

        console.log('Fetching from API:', fetchUrl);

        const response = await fetch(fetchUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch video data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API response:', data);

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Anime characters for Pinterest search
const ANIME_CHARACTERS = ['luffy', 'zoro', 'ichigo'];

/**
 * Fetches anime images from Pinterest API
 * @param {string} query - Search query (character name)
 * @returns {Promise<object>} - The JSON response with image URLs
 */
export const fetchPinterestImages = async (query) => {
    try {
        // Use the Vercel rewrite proxy to avoid CORS
        const response = await fetch(`/api/pinterest/search-download?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            throw new Error('Failed to fetch Pinterest images');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Pinterest API Error:', error);
        return null;
    }
};

/**
 * Gets a random anime character background image
 * @returns {Promise<string>} - Random image URL
 */
export const getRandomAnimeBackground = async () => {
    try {
        // Select random character
        const randomChar = ANIME_CHARACTERS[Math.floor(Math.random() * ANIME_CHARACTERS.length)];

        // Fetch images for that character
        const data = await fetchPinterestImages(randomChar);

        if (data && data.data && data.data.length > 0) {
            // Return random image from results
            const randomImage = data.data[Math.floor(Math.random() * data.data.length)];
            return randomImage;
        }

        return null;
    } catch (error) {
        console.error('Error getting anime background:', error);
        return null;
    }
};

/**
 * Gets multiple random anime character images
 * @param {number} count - Number of images to fetch
 * @returns {Promise<string[]>} - Array of image URLs
 */
export const getRandomCharacters = async (count = 5) => {
    try {
        const images = [];
        const usedChars = new Set();

        // Try to get unique characters
        for (let i = 0; i < count; i++) {
            let randomChar = ANIME_CHARACTERS[Math.floor(Math.random() * ANIME_CHARACTERS.length)];

            // Simple retry to avoid duplicates if possible
            if (usedChars.has(randomChar)) {
                randomChar = ANIME_CHARACTERS[Math.floor(Math.random() * ANIME_CHARACTERS.length)];
            }
            usedChars.add(randomChar);

            const data = await fetchPinterestImages(randomChar);
            if (data && data.data && data.data.length > 0) {
                const randomImage = data.data[Math.floor(Math.random() * data.data.length)];
                images.push(randomImage);
            }
        }
        return images;
    } catch (error) {
        console.error('Error getting random characters:', error);
        return [];
    }
};
