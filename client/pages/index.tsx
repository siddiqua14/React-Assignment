import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Index = (): JSX.Element => {
  const [message, setMessage] = useState<string>('Loading...');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:5000/api/home')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to load message');
      });
  }, []);

  const navigateToHotels = () => {
    router.push('/hotel-details'); // Navigate to the /hotels page
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center text-white">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-xl mb-6">{message}</p>
        <button
          onClick={navigateToHotels}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Go to Hotels
        </button>
      </div>
    </div>
  );
};

export default Index;
