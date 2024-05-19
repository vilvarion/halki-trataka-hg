import {useAppState} from "../appState";
import "./Breathing.scss";
import { motion } from "framer-motion"

export default function Breathing() {
  const {breathingRate} = useAppState();



  const phases = [
    {name: "Inhale", duration: breathingRate},
    {name: "Hold",   duration: breathingRate},
    {name: "Exhale", duration: breathingRate*2},
    {name: "Hold",   duration: breathingRate},
  ];

  return (
    <div className="breath-container">
      <div className="breathing-guide">Inhale</div>
      <motion.div
        className="breath-emitter"
        animate={{
          scale: [.2, .75, .75, .2, .2],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"]
        }}
        transition={{
          duration: breathingRate * 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: breathingRate
        }}
      />
    </div>
  )
}