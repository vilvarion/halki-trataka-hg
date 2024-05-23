import {motion} from "framer-motion";
import Button from "./ui/Button";

export default function FailedPopup({onContinue, onRetry}: {onContinue: () => void, onRetry: () => void}) {

  return (
    <motion.div
      transition={{duration: .3, ease: "easeInOut"}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <div className={'focusing-failed'}>

        <div className="__blinked">You have blinked!</div>


        <div className="__buttons">
          <Button type={"secondary"} onClick={onContinue} sub={"continue"}>No, I'm not!</Button>
          <Button type={"primary"} onClick={onRetry} sub={"go back and prep for next try"}>Retry</Button>
        </div>
      </div>
    </motion.div>
  )
}