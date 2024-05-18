import {useRef} from "react";

export default function Debug() {

  const goFullScreen = () => {
    const doc = document.documentElement;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    }
  }




  return (
    <div style={{position: "absolute", top: 0, right: 0}}>
      <button onClick={goFullScreen}>fullscreen</button>
    </div>
  );
}