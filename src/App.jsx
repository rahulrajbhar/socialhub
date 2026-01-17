import { useState } from 'react';
import Feed from './pages/Feed';
import Videos from './pages/Videos';
import Stories from './pages/Stories';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPage, setCurrentPage] = useState('feed');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('feed');
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">SocialHub</h1>
          <p className="text-center text-gray-600 mb-8">All-in-One Social Platform</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg transition"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            Demo Mode - Any email/password works
          </p>
        </div>
      </div>
    );
  }

  // Main App with Navigation
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Render Current Page */}
      {currentPage === 'feed' && <Feed />}
      {currentPage === 'videos' && <Videos />}
      {currentPage === 'stories' && <Stories />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-2xl mx-auto px-4 flex justify-around">
          <button
            onClick={() => setCurrentPage('feed')}
            className={`flex-1 py-4 font-bold transition ${
              currentPage === 'feed'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            📱 Feed
          </button>
          <button
            onClick={() => setCurrentPage('videos')}
            className={`flex-1 py-4 font-bold transition ${
              currentPage === 'videos'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            📹 Videos
          </button>
          <button
            onClick={() => setCurrentPage('stories')}
            className={`flex-1 py-4 font-bold transition ${
              currentPage === 'stories'
                ? 'text-blue-500 border-t-2 border-blue-500'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            📖 Stories
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 py-4 font-bold text-red-500 hover:text-red-600 transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;