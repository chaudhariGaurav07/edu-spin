// src/pages/StoryMode.js
import React, { useState } from "react";
import "./../styles/StoryMode.css";

const stories = [
  {
    id: 1,
    title: "The Clever Rabbit",
    content: "Once upon a time, in a dense forest, a clever rabbit outwitted a hungry lion...",
    image: "/images/rabbit.png",
    audio: "/audio/rabbit-story.mpeg"
  },
  {
    id: 2,
    title: "The Brave Little Ant",
    content: "A small ant decided to save her friends from a big flood using her courage...",
    image: "/images/ant.png",
    audio: "/audio/ant-story.mpeg"
  },
  {
    id: 3,
    title: "The Magical Tree",
    content: "A boy found a magical tree that granted wishes, but only to those who were kind...",
    image: "/images/tree.png",
    audio: "/audio/tree-story.mpeg"
  }
];

const StoryMode = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
    setIsPlaying(false);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="story-container">
      <h1>Story Mode</h1>
      <div className="story-card">
        <img src={stories[currentStory].image} alt="Story" className="story-image" />
        <h2>{stories[currentStory].title}</h2>
        <p>{stories[currentStory].content}</p>
        <audio ref={audioRef} src={stories[currentStory].audio} />
        <button className="audio-btn" onClick={toggleAudio}>
          {isPlaying ? "Pause Story" : "Play Story"}
        </button>
      </div>
      <div className="nav-buttons">
        <button onClick={prevStory}>Previous</button>
        <button onClick={nextStory}>Next</button>
      </div>
    </div>
  );
};

export default StoryMode;
