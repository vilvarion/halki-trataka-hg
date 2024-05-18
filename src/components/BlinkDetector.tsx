import {useEffect, useRef, useState} from "react";
import '@mediapipe/face_mesh';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import {MediaPipeFaceMeshMediaPipeModelConfig} from "@tensorflow-models/face-landmarks-detection";
import {useAnimationFrame} from "framer-motion"
import {delay} from "../utils/animation";

export default function BlinkDetector () {
  const detectorRef = useRef<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    startVideo();
  }, []);

  // Starting the video stream
  const startVideo = async () => {
    const videoConfig = {
      'audio': false,
      'video': { facingMode: 'user' },
    };
    navigator.mediaDevices.getUserMedia(videoConfig)
      .then(stream => {
        if(videoRef.current) {
          videoRef.current.srcObject = stream;
          startFaceDetection();
        }
      });
  }

  // Loading the face detection model
  const startFaceDetection = async () => {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detectorConfig:MediaPipeFaceMeshMediaPipeModelConfig = {
      runtime: 'mediapipe',
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh',
      // solutionPath: 'base/node_modules/@mediapipe/face_mesh',
      refineLandmarks: true,
    };
    detectorRef.current = await faceLandmarksDetection.createDetector(model, detectorConfig);
    await delay(1000);

    const faces = await detectorRef.current
      .estimateFaces(videoRef.current as HTMLVideoElement, {flipHorizontal: false});

    const [face] = faces;
    if (face) {
      face.keypoints.forEach((keypoint) => {
        console.log(keypoint);

      })
    }


    setReady(true);
  }

  // Detecting faces in real time
  // useAnimationFrame(async (time, delta) => {
  //   if(ready && detectorRef.current && videoRef.current) {
  //     try {
  //       const faces = await detectorRef.current
  //         .estimateFaces(videoRef.current as HTMLVideoElement, {flipHorizontal: false});
  //       console.log(faces);
  //     } catch (e) {
  //       console.warn("------", e);
  //     }
  //   }
  // })

  return (
    <div>
      <video autoPlay ref={videoRef} className={`webcam`}/>
    </div>
  )
}