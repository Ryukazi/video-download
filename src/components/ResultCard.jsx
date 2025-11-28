import React from 'react';

const ResultCard = ({ data }) => {
    if (!data || !data.status) return null;

    const { platform, result } = data;

    // Extract video/audio URL, description, creator, and thumbnail based on platform
    let mediaUrl = null;
    let description = '';
    let creator = '';
    let thumbnail = null;
    let isAudio = false;

    if (platform === 'TikTok') {
        // TikTok: Prioritize videoHd, then video, then videos[0]
        mediaUrl = result?.videoHd || result?.video || result?.videos?.[0];
        description = result?.description || 'TikTok Video';
        creator = result?.creator || data.creator;
        thumbnail = result?.thumbnail;
    } else if (platform === 'YouTube') {
        // YouTube: mp4 or url
        mediaUrl = result?.mp4 || result?.url;
        description = result?.title || 'YouTube Video';
        creator = result?.creator || data.creator;
    } else if (platform === 'Instagram') {
        // Instagram: data.videoUrl or videoUrl or root videoUrl
        mediaUrl = result?.data?.videoUrl || result?.videoUrl || data?.videoUrl;
        description = result?.data?.filename || 'Instagram Video';
        creator = data.creator;
        thumbnail = result?.data?.thumbnail;
    } else if (platform === 'Facebook') {
        // Facebook: hd_link or sd_link
        mediaUrl = result?.data?.[0]?.hd_link || result?.data?.[0]?.sd_link;
        description = result?.data?.[0]?.title || 'Facebook Video';
        creator = result?.creator || data.creator;
        thumbnail = result?.data?.[0]?.thumbnail;
    } else if (platform === 'Twitter' || platform === 'Pinterest') {
        // Twitter & Pinterest: url
        mediaUrl = result?.url;
        description = result?.caption || result?.title || `${platform} Video`;
        creator = result?.author || data.creator;
        thumbnail = result?.thumbnail || result?.medias?.[0]?.thumbnail;
    } else if (platform === 'Reddit') {
        // Reddit: result.data.medias[0].url
        mediaUrl = result?.data?.medias?.[0]?.url;
        description = result?.data?.title || 'Reddit Video';
        creator = result?.data?.author || data.creator;
        thumbnail = result?.data?.thumbnail;
    } else if (platform === 'Spotify') {
        // Spotify: result.data.downloadLinks[0].url (audio)
        mediaUrl = result?.data?.downloadLinks?.[0]?.url;
        description = result?.data?.title || 'Spotify Track';
        creator = result?.data?.author || data.creator;
        thumbnail = result?.data?.thumbnail;
        isAudio = true;
    } else {
        // Generic fallback
        mediaUrl = result?.url || result?.video || result?.mp4 || result?.videoHd;
        description = result?.title || result?.description || 'Media Found';
        creator = result?.creator || data.creator;
        thumbnail = result?.thumbnail;
    }

    return (
        <div className="glass-card max-w-2xl mx-auto mt-6 sm:mt-8 md:mt-10 animate-fade-in delay-300">
            <div className="flex flex-col gap-4 sm:gap-6">
                {/* Media Player */}
                {mediaUrl && !isAudio ? (
                    <div className="w-full rounded-lg overflow-hidden shadow-lg bg-black aspect-video">
                        <video
                            src={mediaUrl}
                            poster={thumbnail}
                            controls
                            className="w-full h-full object-contain"
                            playsInline
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : isAudio && mediaUrl ? (
                    <div className="w-full rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6">
                        {thumbnail && (
                            <img
                                src={thumbnail}
                                alt={description}
                                className="w-32 h-32 mx-auto rounded-lg shadow-lg object-cover mb-4"
                            />
                        )}
                        <audio
                            src={mediaUrl}
                            controls
                            className="w-full"
                        >
                            Your browser does not support the audio tag.
                        </audio>
                    </div>
                ) : (
                    thumbnail && (
                        <div className="w-full">
                            <img
                                src={thumbnail}
                                alt={description || 'Media thumbnail'}
                                className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video"
                            />
                        </div>
                    )
                )}

                {/* Media Info */}
                <div className="flex-1">
                    {platform && (
                        <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2 block">
                            {platform}
                        </span>
                    )}

                    <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                        {description}
                    </h3>

                    {creator && (
                        <p className="text-sm text-gray-400 mb-4">
                            By {creator}
                        </p>
                    )}

                    {/* Download Button */}
                    <div className="flex flex-col gap-3 mt-4">
                        {mediaUrl && (
                            <a
                                href={mediaUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary w-full text-center"
                                download
                            >
                                {isAudio ? '🎵 Download Audio' : '📥 Download Video'}
                            </a>
                        )}

                        {!mediaUrl && (
                            <p className="text-red-400 text-sm">No download links found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
