import React, { useState, useEffect } from 'react';
import "../index.css";
import { auth, database } from './Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { set, ref } from 'firebase/database';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); // Toggle between login and signup
  const navigate = useNavigate();

  useEffect(() => {
    // Reset form fields when toggling between login and sign-up
    setEmail('');
    setPassword('');
    setUsername('');
  }, [isSignUp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's profile with the username
        await updateProfile(user, {
          displayName: username, // Save username in Firebase user profile
        });

        // Create a reference in the Realtime Database under the user's UID
        const userRef = ref(database, 'users/' + user.uid);

        // Set the initial user data
        await set(userRef, {
          username: username,
          todos: null, // Empty array to start with
          notes: null, // Empty array for notes
        });

        console.log('Sign up successful!');
        navigate('/home'); // Redirect to the Home page after sign-up
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Login successful!');
        navigate('/home'); // Redirect to the Home page after login
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F2937] flex flex-col items-center p-8">
      {/* App Title and Description */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-200 mb-4">Productivity App</h1>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Boost your productivity with our suite of apps, designed to help you stay organized, track tasks, enjoy music, and more.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 w-full max-w-5xl">
        {/* Card 1 */}
        <div className="card bg-white/20 rounded-lg p-6 backdrop-blur-md text-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2">Todo App</h2>
          <p className="text-sm">Manage your tasks and stay organized with the Todo app.</p>
        </div>
        {/* Card 2 */}
        <div className="card bg-white/20 rounded-lg p-6 backdrop-blur-md text-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2">Weather App</h2>
          <p className="text-sm">Stay up-to-date with current weather information.</p>
        </div>
        {/* Card 3 */}
        <div className="card bg-white/20 rounded-lg p-6 backdrop-blur-md text-gray-100 hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2">Music Player</h2>
          <p className="text-sm">Listen to your favorite music anytime.</p>
        </div>
      </div>

      {/* Centered 2 Cards in Bottom Row */}
      <div className="flex justify-center gap-8 mb-12 w-full max-w-5xl">
        {/* Card 4 */}
        <div className="card bg-white/20 rounded-lg p-6 backdrop-blur-md text-gray-100 w-full max-w-xs hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2">Notes App</h2>
          <p className="text-sm">Take quick notes and keep track of your thoughts.</p>
        </div>
        {/* Card 5 */}
        <div className="card bg-white/20 rounded-lg p-6 backdrop-blur-md text-gray-100 w-full max-w-xs hover:scale-105 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2">Pomodoro Timer</h2>
          <p className="text-sm">Boost your productivity with the Pomodoro technique.</p>
        </div>
      </div>

      {/* Authentication Form */}
      <div className="auth-section w-full max-w-md p-8 rounded-lg shadow-lg backdrop-blur-md bg-opacity-40 bg-white/20">
        <h2 className="text-3xl font-bold text-gray-200 text-center mb-6">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 bg-transparent border border-gray-300 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          <button
            type="submit"
            className="w-full py-2 bg-white/30 text-[#E0E0E0] font-semibold rounded-lg hover:scale-105 hover:bg-white/50 transition duration-300"
          >
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
        </form>
        <div className="mt-4 text-center text-gray-300">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#E0E0E0] hover:underline"
              >
                Login
              </button>
            </span>
          ) : (
            <span>
              Don’t have an account?{' '}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-[#E0E0E0] hover:underline"
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
