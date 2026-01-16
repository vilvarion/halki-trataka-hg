import {useEffect, useRef, useState} from "react";
import {useAnimationFrame} from "framer-motion";
import {FaceLandmarker, FilesetResolver} from '@mediapipe/tasks-vision';

import {delay} from "../utils/animation";
import {webcamAllowed} from "../utils/browser";
import detectBlink from "../utils/eyeDetection";
import type {IFaceState} from "../types/global";
import "./BlinkDetector.scss";

interface BlinkDetectorProps {
  onReady?: () => void;
  onStateChange?: (state: IFaceState) => void;
}

export default function BlinkDetector({onReady, onStateChange}: BlinkDetectorProps) {
  const streamRef = useRef<MediaStream | null>(null);
  const detectorRef = useRef<FaceLandmarker | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastVideoTimeRef = useRef<number>(-1);
  const [ready, setReady] = useState(false);

  const [faceDetected, setFaceDetected] = useState(false);
  const [leftEyeOpen, setLeftEyeOpen] = useState(false);
  const [rightEyeOpen, setRightEyeOpen] = useState(false);



  useEffect(() => {
    const videoElement = videoRef.current;

    try {
      if (webcamAllowed()) startVideo();
    } catch (e) {
      console.error(e);
    }

    return () => {
      console.log("Closing BlinkDetector");
      if (detectorRef.current) {
        detectorRef.current.close();
      }
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoElement) {
        videoElement.srcObject = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Starting the video stream
  const startVideo = async () => {
    const videoConfig = {
      'audio': false,
      'video': { facingMode: 'user' },
    };

    const stream = await navigator.mediaDevices.getUserMedia(videoConfig);
    if(streamRef.current) {
      streamRef.current = stream;
    }
    if(videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener("loadeddata", startFaceDetection);
    }
  }

  //
  // https://codepen.io/mediapipe-preview/pen/OJBVQJm
  const createFaceLandmarker = async () => {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
    );
    detectorRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
        delegate: "GPU"
      },
      outputFaceBlendshapes: true,
      runningMode: "VIDEO",
      numFaces: 1
    });
    return delay(500);
  }

  // Loading the face detection model
  const startFaceDetection = async () => {
    await createFaceLandmarker();
    setReady(true);
    onReady && onReady();
  }

  const detectionLoop = async () => {
    if(ready && detectorRef.current && videoRef.current) {
      const video = videoRef.current;
      const lastVideoTime = lastVideoTimeRef.current;
      const faceLandmarker = detectorRef.current;

      let startTimeMs = performance.now();
      if (lastVideoTime !== video.currentTime) {
        lastVideoTimeRef.current = video.currentTime;
        const results = faceLandmarker.detectForVideo(video, startTimeMs);

        if(results && results.faceBlendshapes[0]) {
          if(!faceDetected) setFaceDetected(true);

          const {leftBlink, rightBlink} = detectBlink(results.faceBlendshapes[0]);

          if(leftEyeOpen !== leftBlink) setLeftEyeOpen(leftBlink);
          if(rightEyeOpen !== rightBlink) setRightEyeOpen(rightBlink);

          onStateChange && onStateChange({faceDetected, leftEyeOpen, rightEyeOpen});

        } else {
          if(faceDetected) setFaceDetected(false);
        }
      }
    }
  }

  useAnimationFrame(async (time, delta) => {
    if(ready) await detectionLoop();
  })

  return (
    <div className={"blink-detector"}>
      <video  ref={videoRef} className={`webcam`} playsInline autoPlay />
    </div>
  )
}