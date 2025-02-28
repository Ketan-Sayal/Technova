import React, { useState, useEffect } from "react";
import { hero_img2, hero_img3, hero_img4 } from "../assets";
import { useNavigate } from "react-router-dom";

const images = [hero_img2, hero_img3, hero_img4];

const captions = [
  {
    title: "Together, We Can Make a Difference",
    subtitle: "Your support can provide food, shelter, and education to those in need.",
  },
  {
    title: "Hope Begins with Us",
    subtitle: "Join hands to create a future filled with opportunities for everyone.",
  },
  {
    title: "Every Act of Kindness Matters",
    subtitle: "Be the reason someone smiles today. Your contribution can change lives.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative overflow-hidden h-[700px] w-full bg-cover bg-center flex items-center justify-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative text-center text-white px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg animate-fadeIn">
          {captions[currentIndex].title}
        </h1>
        <h3 className="text-lg md:text-2xl font-medium mt-4 max-w-2xl mx-auto animate-fadeIn delay-200">
          {captions[currentIndex].subtitle}
        </h3>
        <button 
        onClick={()=>{
            navigate('/home');
        }}
        className="mt-6 px-6 py-3 bg-yellow-500 text-black font-bold text-lg rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 animate-fadeIn delay-400">
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
