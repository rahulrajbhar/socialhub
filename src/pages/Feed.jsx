import { useState } from 'react';

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Demo User',
      content: 'Welcome to SocialHub! 🎉',
      image: null,
      likes: 5,
      liked: false,
      timestamp: new Date().toLocaleString(),
    },
  ]);
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim() || selectedImage) {
      const post = {
        id: posts.length + 1,
        author: 'You',
        content: newPost,
        image: imagePreview,
        likes: 0,
        liked: false,
        timestamp: new Date().toLocaleString(),
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setSelectedImage(null);
      setImagePreview(null);
    }
  };

  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Feed Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">📱 Feed</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* Create Post Form */}
        <div className="bg-white rounded-lg shadow mb-4 p-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            rows="3"
          />

          {imagePreview && (
            <div className="relative mb-3">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                ✕
              </button>
            </div>
          )}

          <div className="flex gap-2">
            <label className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg text-center cursor-pointer transition">
              📷 Add Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </label>
            <button
              onClick={handlePostSubmit}
              disabled={!newPost.trim() && !selectedImage}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
            >
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No posts yet. Be the first to post! 🚀</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {post.author[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.timestamp}</p>
                  </div>
                </div>

                {post.content && (
                  <p className="text-gray-800 mb-3">{post.content}</p>
                )}

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg mb-3"
                  />
                )}

                <div className="flex items-center gap-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-2 transition ${
                      post.liked
                        ? 'text-red-500 font-bold'
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    {post.liked ? '❤️' : '🤍'} {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition">
                    💬 Comment
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition">
                    ↗️ Share
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
