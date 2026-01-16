import {motion} from "framer-motion";

import {useProgressState} from "../components/state/appProgressState";
import {useSaveState} from "../components/state/appSaveState";
import {screenAnimTransition, screenReducedTransition} from "../utils/animation";
import Button from "../components/ui/Button";
import './FinishScreen.scss';

export default function FinishScreen() {
  const {setProgress} = useProgressState();
  const {catName, useCalmMode} = useSaveState();

  return (
    <motion.main className={'finish-screen'}
                 transition={useCalmMode ? screenReducedTransition : screenAnimTransition}
                 initial={{ opacity: 0, scale: 2}}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.5 }}>

      <h2>Success!</h2>

      <section className={'finish-center'}>

        <img src="/sprites/halki-loaf.png" style={{width: 240}} alt={`cat is happy`}/>


        <div className={"finish-wrapper"}>
          <div className="finish-speech">{catName}: - Thank you, human! Love nya!</div>
          <div className="finish-result">You did great! {catName} is content, happy and loaf!</div>
        </div>

        <Button type={"primary"} onClick={() => setProgress({screen: "title"})}>I'm awesome, back to title</Button>
      </section>
    </motion.main>
  )
  }