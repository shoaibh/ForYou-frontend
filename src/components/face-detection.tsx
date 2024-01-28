import * as faceapi from 'face-api.js';
import { useEffect, useRef } from 'react';
import {CameraFeed} from './camera-feed';

const FaceDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models'; // Correct path relative to the public directory
  
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);
        console.log("Models loaded successfully");
      } catch (e) {
        console.error("Failed to load models", e);
      }
    };
  
    loadModels();
  }, []);
  

  const handleCameraFeed = async () => {
    if (videoRef.current) {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withAgeAndGender();
      console.log(detections); // Process detections for age and gender
    }
  };

  return (
    <div>
      <div className='rounded border-2 border-purple-900 border-solid max-w-350 mx-auto mt-24 rounded-full overflow-hidden max-h-350 h-350 bg-cover'>
        <CameraFeed ref={videoRef} />
        </div>
      <button onClick={handleCameraFeed}>Detect Faces</button>
    </div>
  );
};

export default FaceDetection;
