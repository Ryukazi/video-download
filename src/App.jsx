import React, { useState } from 'react';
import Hero from './components/Hero';
import UrlInput from './components/UrlInput';
import PlatformIcons from './components/PlatformIcons';
import ResultCard from './components/ResultCard';
import { fetchVideoData } from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (url) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchVideoData(url);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <main className="w-full max-w-4xl mx-auto px-2 sm:px-4 pb-10">
        <UrlInput onSearch={handleSearch} isLoading={loading} />

        <PlatformIcons />

        {error && (
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center animate-fade-in mx-2 sm:mx-0">
            {error}
          </div>
        )}

        {result && <ResultCard data={result} />}
      </main>

      <footer className="mt-auto py-4 sm:py-6 text-center text-gray-500 text-xs sm:text-sm px-4">
        <p>© {new Date().getFullYear()} Universal Downloader. All rights reserved.</p>
      </footer>
    </div>
  );
}
}

export default App;
