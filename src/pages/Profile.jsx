import { useState, useEffect } from 'react';
import { logOut, getCurrentUser } from '../utils/auth';

export default function Profile({ user, onLogout }) {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const { user: currentUser } = await getCurrentUser();
      if (currentUser) {
        setUserEmail(currentUser.email);
      }
    };
    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    const { error } = await logOut();
    if (!error) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 mt-10">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">👤</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <p className="text-gray-600 text-sm">Logged in as:</p>
          <p className="text-gray-800 font-bold">{userEmail}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition"
        >
          Log Out
        </button>

        <p className="text-center text-gray-500 text-sm mt-6">
          More profile features coming soon! 🎉
        </p>
      </div>
    </div>
  );
}
