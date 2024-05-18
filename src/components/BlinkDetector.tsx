import {useEffect, useRef, useState} from "react";
import {useAnimationFrame} from "framer-motion"
import {delay} from "../utils/animation";
import {FaceLandmarker, FilesetResolver, DrawingUtils} from '@mediapipe/tasks-vision';
import {webcamAllowed} from "../utils/browser";
import detectBlink from "../utils/eyeDetection";

export default function BlinkDetector () {
  const drawingRef = useRef<DrawingUtils | null>(null);
  const detectorRef = useRef<FaceLandmarker | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const time = useRef<number>(-1);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const [faceDetected, setFaceDetected] = useState(false);
  const [leftEyeOpen, setLeftEyeOpen] = useState(false);
  const [rightEyeOpen, setRightEyeOpen] = useState(false);


  useEffect(() => {
    if(webcamAllowed()) startVideo();
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
          videoRef.current.addEventListener("loadeddata", startFaceDetection);
        }
      });
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
    setLoading(false);

    if(canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      drawingRef.current = new DrawingUtils(ctx as CanvasRenderingContext2D);
    }
    setReady(true);
  }

  const detectionLoop = async () => {
    if(ready && detectorRef.current && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const lastVideoTime = time.current;
      const faceLandmarker = detectorRef.current;

      let startTimeMs = performance.now();
      if (lastVideoTime !== video.currentTime) {
        time.current = video.currentTime;
        const results = faceLandmarker.detectForVideo(video, startTimeMs);

        if(results && results.faceBlendshapes[0]) {
          if(!faceDetected) setFaceDetected(true);

          const { blink, leftBlink, rightBlink} = detectBlink(results.faceBlendshapes[0]);

          if(leftEyeOpen !== leftBlink) setLeftEyeOpen(leftBlink);
          if(rightEyeOpen !== rightBlink) setRightEyeOpen(rightBlink);

          if(blink) console.log("Blink detected");

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
    <div>
      <video  ref={videoRef} className={`webcam`} playsInline autoPlay />
      <canvas ref={canvasRef} className="output_canvas"/>
      Face detected: {faceDetected.toString()} <br/>
      Left eye: {leftEyeOpen.toString()} <br/>
      Right eye: {rightEyeOpen.toString()} <br/>
    </div>
  )
}