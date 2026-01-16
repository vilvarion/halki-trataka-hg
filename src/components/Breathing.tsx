import {motion} from "framer-motion";

import {useSaveState} from "./state/appSaveState";
import "./Breathing.scss";

export default function Breathing() {
  const {breathingRate} = useSaveState();
  const max = 10;

  return (
    <div className="breath-container">
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