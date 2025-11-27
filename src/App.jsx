import React, { useState } from 'react';
import Header from './components/Header';
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
    <div className="container py-10 flex-1 flex flex-col items-center justify-center min-h-screen">
      <Header />

      <main className="w-full max-w-4xl mx-auto px-4">
        <UrlInput onSearch={handleSearch} isLoading={loading} />

        <PlatformIcons />

        {error && (
          <div className="mt-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center animate-fade-in">
            {error}
          </div>
        )}

        {result && <ResultCard data={result} />}
      </main>

      <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Universal Downloader. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
