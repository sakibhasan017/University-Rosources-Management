import React, { useState, useEffect } from "react";
import "./Achievements.css";
import Frustsal1 from '../../assets/frutsal1.jpeg'
import Frustsal2 from '../../assets/frutsal2.jpeg'
import Cricket1 from '../../assets/cricket1.jpg'
import Cricket2 from '../../assets/cricket2.jpg'
import Cricket3 from '../../assets/cricket3.jpg'

const achievementsData = [
  {
    title: "",
    description: "ICT-8, Champion 🏆 of Intra ICT Futsal 2022.",
    images: [
      Frustsal1,
      Frustsal2,
    ],
  },
  {
    title: "",
    description: "ICT Dept, Runners-up🏆 of Inter Department Cricket Tournament 2024.",
    images: [
      Cricket1,
      Cricket2,
      Cricket3
    ],
  },
];

const Achievements = () => {
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [autoPlay, setAutoPlay] = useState(true);
  const [hoveredCarousel, setHoveredCarousel] = useState(null);

  useEffect(() => {
    const initialIndices = {};
    achievementsData.forEach((_, index) => {
      initialIndices[index] = 0;
    });
    setCurrentImageIndices(initialIndices);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentImageIndices(prev => {
        const newIndices = { ...prev };
        Object.keys(newIndices).forEach(key => {
          const achievementIndex = parseInt(key);
          const achievement = achievementsData[achievementIndex];
          newIndices[key] = (prev[key] + 1) % achievement.images.length;
        });
        return newIndices;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const nextImage = (achievementIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [achievementIndex]: (prev[achievementIndex] + 1) % achievementsData[achievementIndex].images.length
    }));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevImage = (achievementIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [achievementIndex]: (prev[achievementIndex] - 1 + achievementsData[achievementIndex].images.length) % 
                          achievementsData[achievementIndex].images.length
    }));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const goToImage = (achievementIndex, imageIndex) => {
    setCurrentImageIndices(prev => ({
      ...prev,
      [achievementIndex]: imageIndex
    }));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  return (
    <div className="achievements-container">
      <h1 className="achievements-title">Our Achievements</h1>

      <div className="achievements-list">
        {achievementsData.map((achievement, index) => (
          <div
            key={index}
            className={`achievement-item ${
              index % 2 === 0 ? "left-image" : "right-image"
            }`}
          >
            <div 
              className="achievement-image-carousel"
              onMouseEnter={() => setHoveredCarousel(index)}
              onMouseLeave={() => setHoveredCarousel(null)}
            >
              <div className="carousel-container">
                <img 
                  src={achievement.images[currentImageIndices[index] || 0]} 
                  alt={`${achievement.title} - Image ${currentImageIndices[index] + 1}`}
                  className="carousel-image"
                />
                
                {achievement.images.length > 1 && (
                  <>
                    <button 
                      className={`carousel-arrow carousel-arrow-left ${
                        hoveredCarousel === index ? 'visible' : 'hidden'
                      }`}
                      onClick={() => prevImage(index)}
                    >
                      ‹
                    </button>
                    <button 
                      className={`carousel-arrow carousel-arrow-right ${
                        hoveredCarousel === index ? 'visible' : 'hidden'
                      }`}
                      onClick={() => nextImage(index)}
                    >
                      ›
                    </button>
                  </>
                )}

                {achievement.images.length > 1 && (
                  <div className="carousel-indicators">
                    {achievement.images.map((_, imgIndex) => (
                      <button
                        key={imgIndex}
                        className={`indicator ${(currentImageIndices[index] || 0) === imgIndex ? 'active' : ''}`}
                        onClick={() => goToImage(index, imgIndex)}
                      />
                    ))}
                  </div>
                )}

                {achievement.images.length > 1 && (
                  <div className="image-counter">
                    {((currentImageIndices[index] || 0) + 1)} / {achievement.images.length}
                  </div>
                )}
              </div>
            </div>
            
            <div className="achievement-text">
              <h2>{achievement.title}</h2>
              <p>{achievement.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;