import { useState } from 'react';

export default function Stories() {
  const [stories, setStories] = useState([
    {
      id: 1,
      author: 'Demo User',
      content: 'Welcome! 👋',
      timestamp: Date.now(),
      emoji: '😊',
    },
  ]);
  const [selectedStory, setSelectedStory] = useState(null);

  const handleAddStory = () => {
    const content = prompt('What is your story?');
    if (content) {
      const emoji = prompt(
        'Add an emoji (optional):',
        '😊'
      ) || '😊';
      const newStory = {
        id: stories.length + 1,
        author: 'You',
        content: content,
        timestamp: Date.now(),
        emoji: emoji,
      };
      setStories([newStory, ...stories]);
      alert('Story posted! (Auto-deletes after 24 hours)');
    }
  };

  const isStoryExpired = (timestamp) => {
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    return now - timestamp > twentyFourHours;
  };

  const activeStories = stories.filter((story) => !isStoryExpired(story.timestamp));

  const getTimeAgo = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor(diff / (60 * 1000));

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'now';
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">📖 Stories</h1>
          <button
            onClick={handleAddStory}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            ➕ Add Story
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {selectedStory ? (
          // Story Viewer
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <button
              onClick={() => setSelectedStory(null)}
              className="text-blue-500 hover:underline mb-4"
            >
              ← Back to Stories
            </button>

            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-8 mb-4 min-h-96 flex flex-col justify-center items-center text-white">
              <div className="text-8xl mb-4">{selectedStory.emoji}</div>
              <p className="text-3xl font-bold text-center">{selectedStory.content}</p>
            </div>

            <div className="text-center text-gray-600">
              <p className="text-sm">
                {selectedStory.author} • {getTimeAgo(selectedStory.timestamp)}
              </p>
              <p className="text-xs text-gray-500 mt-1">⏰ Expires in 24 hours</p>
            </div>
          </div>
        ) : (
          // Stories Grid
          <div>
            {activeStories.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-4xl mb-4">📵</p>
                <p>No active stories. Create one! 🎬</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeStories.map((story) => (
                  <div
                    key={story.id}
                    onClick={() => setSelectedStory(story)}
                    className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white cursor-pointer hover:shadow-lg transition transform hover:scale-105"
                  >
                    <div className="text-5xl mb-3">{story.emoji}</div>
                    <h3 className="font-bold text-lg line-clamp-2 mb-2">
                      {story.content}
                    </h3>
                    <div className="flex justify-between items-center text-sm">
                      <span>{story.author}</span>
                      <span className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded">
                        {getTimeAgo(story.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Expired Stories Notice */}
            {stories.length > activeStories.length && (
              <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg text-yellow-800 text-sm">
                ℹ️ {stories.length - activeStories.length} story/stories have expired
                and been deleted
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
