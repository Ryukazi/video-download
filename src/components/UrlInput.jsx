import React, { useState } from 'react';

const UrlInput = ({ onSearch, isLoading }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) {
            onSearch(url);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="input-group animate-fade-in delay-200 w-full px-2 sm:px-0">
            <input
                type="text"
                className="input-field"
                placeholder="Paste video URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
            />
            <button
                type="submit"
                className="btn btn-primary input-btn"
                disabled={isLoading}
            >
                {isLoading ? 'Processing...' : 'Download'}
            </button>
        </form>
    );
};

export default UrlInput;
