
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const YouTubeVideoDetails = ({ apiKey, videoId }) => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id={2Cb5t8L3MjM}&key={AIzaSyA2aBG3qhzXXqOx8ECJn_J3XSu8fUzTQ_0}`
        ).then(
          res=>res.json()
        );

        if (response.data.items.length > 0) {
          const videoInfo = response.data.items[0].snippet;
          setVideoDetails(videoInfo);
        } else {
          setError('Video not found');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getVideoDetails();
  }, [videoId, apiKey]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {videoDetails && (
        <div>
          <h1>{videoDetails.title}</h1>
          <p>{videoDetails.description}</p>
          <iframe
            title="YouTube Video"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default YouTubeVideoDetails;
