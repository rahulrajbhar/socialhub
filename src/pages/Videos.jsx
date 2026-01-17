import { useState } from 'react';

export default function Videos() {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Welcome to SocialHub',
      author: 'Demo User',
      views: 234,
      thumbnail: '🎬',
      duration: '2:34',
    },
  ]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleUpload = () => {
    const title = prompt('Enter video title:');
    if (title) {
      const newVideo = {
        id: videos.length + 1,
        title: title,
        author: 'You',
        views: 0,
        thumbnail: '🎥',
        duration: '0:00',
      };
      setVideos([newVideo, ...videos]);
      alert('Video uploaded! (Demo - no actual upload)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">📹 Videos</h1>
          <button
            onClick={handleUpload}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            ⬆️ Upload
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        {selectedVideo ? (
          // Video Player
          <div className="mb-4">
            <button
              onClick={() => setSelectedVideo(null)}
              className="text-blue-500 hover:underline mb-4"
            >
              ← Back to Videos
            </button>
            <div className="bg-black rounded-lg overflow-hidden mb-4">
              <div className="bg-gray-800 h-96 flex items-center justify-center text-6xl">
                📹
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedVideo.title}
            </h2>
            <div className="flex gap-4 text-gray-600 mb-4">
              <span>{selectedVideo.author}</span>
              <span>{selectedVideo.views.toLocaleString()} views</span>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition">
                👍 Like
              </button>
              <button className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition">
                ➕ Subscribe
              </button>
            </div>
          </div>
        ) : (
          // Video Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              >
                <div className="bg-gray-300 h-40 flex items-center justify-center text-6xl relative">
                  {video.thumbnail}
                  <span className="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-gray-800 line-clamp-2 mb-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{video.author}</p>
                  <p className="text-sm text-gray-500">
                    {video.views.toLocaleString()} views
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
