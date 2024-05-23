import {useSaveState} from "./state/appSaveState";
import "./Breathing.scss";
import {motion, useAnimationFrame} from "framer-motion"
import {useRef} from "react";

export default function Breathing() {
  const {breathingRate} = useSaveState();


  const phases = [
    {name: "Inhale", duration: breathingRate},
    {name: "Hold",   duration: breathingRate},
    {name: "Exhale", duration: breathingRate*2},
    {name: "Hold",   duration: breathingRate},
  ];

  const max = 10;

  //step1: 1s small ring, white
  //step2: 4s small->big ring, white->blue
  //step3: 4s big->big ring, white
  //step4: 8s big->small ring, pink


  return (
    <div className="breath-container">
      {/*<div className="breathing-guide">Inhale</div>*/}
      <motion.div
        className="breath-emitter"
        animate={{
          scale: [.2, .75, .75, .2],
          rotate: [0 ,0 , 180, 0, 0],
          boxShadow: [
            `0 0 ${max}vw ${max - 1}vw rgba(0,0,0,1), 0 0 ${max}vw ${max*1.5}vw rgba(255,255,255,0.1)`,
            `0 0 ${max}vw ${max - 1}vw rgba(0,0,0,1), 0 0 ${max}vw ${max*1.5}vw rgba(255,255,255,0.5)`,
            `0 0 ${max}vw ${max - 1}vw rgba(0,0,0,1), 0 0 ${max}vw ${max*1.5}vw rgba(255,255,255,0.5)`,
            `0 0 ${max}vw ${max - 1}vw rgba(0,0,0,1), 0 0 ${max}vw ${max*1.5}vw rgba(255,255,255,0.1)`
          ],
        }}
        transition={{
          duration: breathingRate * 3,
          ease: "easeInOut",
          times: [0, 0.25, 0.50, 1],
          repeat: Infinity,
          repeatDelay: breathingRate
        }}
      />
    </div>
  )
}