import React, { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";
import axios from "axios";
import "./vacation.css";

const Vacation = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const imageResponse = await axios.get(
          "https://api.pexels.com/v1/search",
          {
            headers: {
              Authorization:
                "ZhQzWiPCEQ7WZBr8VoPrwy6QRdNP7pvuRXydUyZd4w5kRBC6MnkVmb8f",
            },
            params: {
              query: "england",
              per_page: 11,
            },
          }
        );

        const videoResponse = await axios.get(
          "https://api.pexels.com/videos/search",
          {
            headers: {
              Authorization:
                "ZhQzWiPCEQ7WZBr8VoPrwy6QRdNP7pvuRXydUyZd4w5kRBC6MnkVmb8f",
            },
            params: {
              query: "Europe",
              per_page: 7,
            },
          }
        );

        const images = imageResponse.data.photos.map((photo) => ({
          id: photo.id,
          type: "image",
          src: photo.src.large,
          alt: photo.alt,
        }));

        const videos = videoResponse.data.videos.map((video) => ({
          id: video.id,
          type: "video",
          src: video.video_files[0]?.link,
        }));

        setMedia([...images, ...videos].sort(() => Math.random() - 0.5));
      } catch (error) {
        console.error("Erro ao buscar mídia:", error);
      }
    };

    fetchMedia();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".fade-item");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [media]);

  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="px-4 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Explore a Europa</h1>
        <div className="h-1 w-16 bg-orange-500 mx-auto mt-2 mb-6"></div>
      </div>
      <Masonry
        breakpointCols={breakpointColumns}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {media.map((item) =>
          item.type === "image" ? (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow-lg fade-item opacity-0"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ) : (
            <div
              key={item.id}
              className="overflow-hidden rounded-lg shadow-lg fade-item opacity-0"
            >
              <video
                src={item.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              ></video>
            </div>
          )
        )}
      </Masonry>
    </div>
  );
};

export default Vacation;
