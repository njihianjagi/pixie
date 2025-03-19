import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { supabase } from "../services/supabaseClient";

const WelcomeUpload = ({ onAvatarGeneration, onError, userId }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);

      // Create preview image
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
  });

  const handleUpload = async () => {
    if (!file || !userId) return;

    try {
      setUploading(true);

      // 1. Upload image to Supabase Storage
      const fileName = `${userId}-source-${Date.now()}`;
      const filePath = `source-images/${fileName}`;

      const { data, error } = await supabase.storage
        .from("user-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      // 2. Get public URL of the uploaded image
      const { data: urlData } = supabase.storage
        .from("user-images")
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      // 3. Trigger avatar generation process by calling your backend API
      // This endpoint will trigger the Trigger.dev workflow
      const response = await axios.post("/api/generate-avatar", {
        imageUrl,
        userId,
      });

      // 4. Return process ID for tracking generation status
      const { processId } = response.data;

      // 5. Notify parent component that processing has started
      onAvatarGeneration(processId, imageUrl);
    } catch (error) {
      console.error("Error during file upload:", error);
      onError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="welcome-container">
      <h1>Create Your 3D Avatar</h1>

      <p className="instructions">
        Upload a well-lit image of your face to create a magical 3D avatar. For
        best results, make sure your face is clearly visible and centered.
      </p>

      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />

        {preview ? (
          <div className="preview-container">
            <img src={preview} alt="Preview" className="image-preview" />
            <button
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
                setPreview(null);
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="dropzone-content">
            <div className="upload-icon">📷</div>
            {isDragActive ? (
              <p>Drop the image here...</p>
            ) : (
              <p>Drag & drop an image here, or click to select</p>
            )}
          </div>
        )}
      </div>

      <button
        className="generate-btn"
        disabled={!file || uploading}
        onClick={handleUpload}
      >
        {uploading ? "Uploading..." : "Generate Avatar"}
      </button>
    </div>
  );
};

export default WelcomeUpload;
