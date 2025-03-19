import React, { useState, useEffect } from "react";
import axios from "axios";

const ProcessingScreen = ({
  processId,
  sourceImageUrl,
  onComplete,
  onError,
}) => {
  const [status, setStatus] = useState("Starting avatar generation...");
  const [progress, setProgress] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    // Set up polling to check processing status
    const checkStatus = async () => {
      try {
        const response = await axios.get(`/api/avatar-status/${processId}`);
        const {
          status: currentStatus,
          progress: currentProgress,
          avatarUrl: url,
        } = response.data;

        setStatus(currentStatus);
        setProgress(currentProgress);

        if (url) {
          setAvatarUrl(url);
          onComplete(url);
        } else if (currentStatus === "failed") {
          onError("Failed to generate avatar. Please try again.");
        } else {
          // Continue polling
          setTimeout(checkStatus, 2000);
        }
      } catch (error) {
        console.error("Error checking avatar status:", error);
        setStatus("Error checking status");
        onError("Failed to connect to server. Please try again.");
      }
    };

    // Start polling
    checkStatus();

    // Cleanup
    return () => clearTimeout(checkStatus);
  }, [processId, onComplete, onError]);

  // For demo purposes, simulate progress if backend polling isn't implemented
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !processId) {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 10;

          if (newProgress === 30) {
            setStatus("Analyzing facial features...");
          } else if (newProgress === 60) {
            setStatus("Creating 3D model...");
          } else if (newProgress === 90) {
            setStatus("Applying magical effects...");
          } else if (newProgress >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              // Mock avatar URL (in production this would come from the backend)
              const mockAvatarUrl = "https://models.readyplayer.me/sample.glb";
              setAvatarUrl(mockAvatarUrl);
              onComplete(mockAvatarUrl);
            }, 500);
            return 100;
          }

          return newProgress;
        });
      }, 800);

      return () => clearInterval(timer);
    }
  }, [processId, onComplete]);

  return (
    <div className="processing-container">
      <h2>Generating Your Avatar...</h2>

      {sourceImageUrl && (
        <div className="source-image">
          <img src={sourceImageUrl} alt="Source" className="source-thumbnail" />
        </div>
      )}

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <p className="status-message">{status}</p>

      <p className="wait-message">
        This may take a few seconds. Please relax while we create your magical
        avatar.
      </p>

      <button className="cancel-btn" onClick={() => window.location.reload()}>
        Cancel
      </button>
    </div>
  );
};

export default ProcessingScreen;
