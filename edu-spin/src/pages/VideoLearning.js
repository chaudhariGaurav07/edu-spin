import React from "react";
import "./../styles/VideoLearning.css";

// Video data with YouTube links
const videos = [
  { id: 1, title: "Learn ABCs with Fun!", link: "https://www.youtube.com/watch?v=ccEpTTZW34g" },
  { id: 2, title: "Basic Math for Kids", link: "https://youtu.be/mjlsSYLLOSE?si=8AyFB_R4BrEd0ZzR" },
  { id: 3, title: "Fun Science Experiments", link: "https://youtu.be/1Q_4HXewiS0?si=LZnt_CRBbv1AG7vZ" },
  { id: 4, title: "Story Time: The Lion & The Mouse", link: "https://youtu.be/GxcGVCEEdcU?si=NmItGe_fniqa_35D" }
];

// Function to convert YouTube URL to embed format
const getEmbedUrl = (url) => {
  let videoId = "";
  
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("v=")[1]?.split("&")[0]; // Extract ID from watch URL
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0]; // Extract ID from shortened URL
  }

  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

const VideoLearning = () => {
  return (
    <div className="video-learning-container">
      <h1>📺 Video Learning</h1>
      <div className="video-list">
        {videos.map((video) => {
          const embedUrl = getEmbedUrl(video.link); // Get embed URL
          
          return (
            <div key={video.id} className="video-card">
              {embedUrl ? (
                <iframe
                  width="100%"
                  height="200"
                  src={embedUrl}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Error loading video</p> // Fallback if URL is incorrect
              )}
              <h3>{video.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoLearning;
