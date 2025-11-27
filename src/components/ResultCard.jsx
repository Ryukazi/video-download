import React from 'react';

const ResultCard = ({ data }) => {
    if (!data || !data.status) return null;

    const { platform, result } = data;

    // Extract video URL based on platform
    let videoUrl = null;
    let description = '';
    let creator = '';
    let thumbnail = null;

    if (platform === 'TikTok') {
        videoUrl = result?.data?.video_url || result?.video || result?.videoHd || (result?.videos && result.videos[0]);
        description = result?.data?.title || result?.description || 'TikTok Video';
        creator = result?.data?.author || result?.creator || data.creator;
    } else if (platform === 'YouTube') {
        videoUrl = result?.mp4 || result?.url || result?.video;
        description = result?.title || result?.description || 'YouTube Video';
        creator = result?.author || result?.creator;
    } else if (platform === 'Instagram') {
        videoUrl = result?.url || (result?.downloads && result.downloads[result.downloads.length - 1]) || result?.video;
        description = result?.title || result?.description || 'Instagram Video';
        creator = result?.author || result?.creator;
    } else if (platform === 'Facebook') {
        videoUrl = result?.data?.[0]?.hd_link || result?.data?.[0]?.sd_link || result?.video;
        description = result?.title || result?.description || 'Facebook Video';
        creator = result?.author || result?.creator;
    } else if (platform === 'Pinterest' || platform === 'Twitter') {
        videoUrl = result?.url || result?.video;
        description = result?.title || result?.description || `${platform} Video`;
        creator = result?.author || result?.creator;
    } else {
        // Generic fallback
        videoUrl = result?.url || result?.video || result?.videoHd || (result?.videos && result.videos[0]);
        description = result?.description || result?.title || 'Video Found';
        creator = result?.creator || data.creator;
    }

    // Get thumbnail
    if (result?.images && result.images.length > 0) {
        thumbnail = result.images[0];
    } else if (result?.thumbnail) {
        thumbnail = result.thumbnail;
    }

    return (
        <div className="glass-card max-w-2xl mx-auto mt-10 animate-fade-in delay-300">
            <div className="flex flex-col gap-6">
                {videoUrl ? (
                    <div className="w-full rounded-lg overflow-hidden shadow-lg bg-black aspect-video">
                        <video
                            src={videoUrl}
                            poster={thumbnail}
                            controls
                            className="w-full h-full object-contain"
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    thumbnail && (
                        <div className="w-full">
                            <img
                                src={thumbnail}
                                alt={description || 'Video thumbnail'}
                                className="w-full h-auto rounded-lg shadow-lg object-cover aspect-video"
                            />
                        </div>
                    )
                )}

                <div className="flex-1">
                    {platform && (
                        <span className="text-xs font-bold uppercase tracking-wider text-accent mb-2 block">
                            {platform}
                        </span>
                    )}

                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                        {description}
                    </h3>

                    {creator && (
                        <p className="text-sm text-gray-400 mb-4">
                            By {creator}
                        </p>
                    )}

                    <div className="flex flex-col gap-3 mt-4">
                        {videoUrl && (
                            <a
                                href={videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary w-full text-center"
                                download
                            >
                                Download Video
                            </a>
                        )}

                        {!videoUrl && (
                            <p className="text-red-400 text-sm">No download links found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
