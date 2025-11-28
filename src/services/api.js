const API_BASE_URL = 'https://universal-dl-one.vercel.app/';

/**
 * Fetches video data from the Universal Downloader API.
 * @param {string} url - The URL of the video to download.
 * @returns {Promise<object>} - The JSON response from the API.
 */
export const fetchVideoData = async (url) => {
    try {
        console.log('fetchVideoData called with URL:', url);

        // Detect platform from URL
        let endpoint = '';
        const lowerUrl = url.toLowerCase();

        if (lowerUrl.includes('instagram.com') || lowerUrl.includes('instagr.am')) {
            endpoint = '/instagram';
        } else if (lowerUrl.includes('tiktok.com') || lowerUrl.includes('vm.tiktok.com')) {
            endpoint = '/tiktok';
        } else if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
            endpoint = '/youtube';
        } else if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch') || lowerUrl.includes('fb.com')) {
            endpoint = '/facebook';
        } else if (lowerUrl.includes('pinterest.com') || lowerUrl.includes('pin.it')) {
            endpoint = '/pinterest';
        } else if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com') || lowerUrl.includes('t.co')) {
            endpoint = '/twitter';
        } else if (lowerUrl.includes('reddit.com')) {
            endpoint = '/reddit';
        } else if (lowerUrl.includes('spotify.com')) {
            endpoint = '/spotify';
        } else {
            throw new Error('Unsupported platform. Please check the URL and try again.');
        }

        const fetchUrl = `${API_BASE_URL}${endpoint}?url=${encodeURIComponent(url)}`;
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
const ANIME_CHARACTERS = ['luffy', 'zoro', 'ichigo', 'goku', 'shi hao'];

/**
 * Fetches anime images from Pinterest API
 * @param {string} query - Search query (character name)
 * @returns {Promise<object>} - The JSON response with image URLs
 */
export const fetchPinterestImages = async (query) => {
    try {
        const response = await fetch(`https://denish-pin.vercel.app/api/search-download?query=${encodeURIComponent(query)}`);

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
