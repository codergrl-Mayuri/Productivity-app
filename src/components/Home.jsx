import React, { useEffect } from 'react';
import { signOut, getAuth } from 'firebase/auth'; // Ensure you import these correctly
import { useNavigate } from 'react-router-dom';
import Grid from './Grid'; // Import Grid component

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      // Re-enable scrolling when this component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(); // Get the auth instance
    try {
      await signOut(auth); // Pass the auth instance to signOut
      navigate('/'); // Navigate back to the MainPage after logout
    } catch (error) {
      console.error('Error during sign out:', error); // Handle errors if any
    }
  };

  return (
    <div className="h-screen p-4 overflow-hidden relative">
      <Grid /> {/* Render the Grid component */}
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute bottom-5 right-5 px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
