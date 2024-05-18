import {useRef} from "react";

export default function Debug() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const goFullScreen = () => {
    const doc = document.documentElement;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    }
  }

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if(videoRef.current)
          videoRef.current.srcObject = stream;
      });
  }


  return (
    <div style={{position: "absolute", top: 0, left: 0, width: "100%"}}>
      <button onClick={goFullScreen}>fullscreen</button>
      <button onClick={startCamera}>camera</button>
      <video autoPlay ref={videoRef} className={`webcam`}/>
    </div>
  );
}