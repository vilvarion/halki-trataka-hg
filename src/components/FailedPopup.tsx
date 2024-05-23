import {screenAnimTransition, screenReducedTransiton} from "../utils/animation";
import {motion} from "framer-motion";
import {useSaveState} from "./state/appSaveState";
import Button from "./ui/Button";

export default function FailedPopup({onContinue, onRetry}: {onContinue: () => void, onRetry: () => void}) {

  const {useCalmMode} = useSaveState();


  return (
    <motion.div
      transition={useCalmMode ? screenReducedTransiton : screenAnimTransition}
      initial={{opacity: 0, scale: 1.2}}
      animate={{opacity: 1, scale: 1}}
      exit={{opacity: 0, scale: 1.2}}>
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