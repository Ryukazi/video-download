const API_BASE_URL = '/api';

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
