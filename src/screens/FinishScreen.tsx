import './ConfigScreen.scss';
import {useSaveState} from "../components/state/appSaveState";
import Button from "../components/ui/Button";
import {useProgressState} from "../components/state/appProgressState";
import ConfigOption from "../components/config/ConfigOption";
import { motion } from "framer-motion";
import {screenAnimTransition, screenReducedTransiton} from "../utils/animation";

export default function FinishScreen() {
  const {screen, setProgress} = useProgressState();
  const {useEyeTracking, useBreathingGuide, useTextGuide, useCalmMode, setState} = useSaveState();

  return (
    <motion.main className={'finish-screen'}
                 transition={useCalmMode ? screenReducedTransiton : screenAnimTransition}
                 initial={{ opacity: 0, x: "30%"}}
                 animate={{ opacity: 1, x: "0%" }}
                 exit={{ opacity: 0, x: "30%" }}>

      <h2>Config</h2>

      <section className={'finish-center'}>

        <nav className="finish-nav">
          <Button type={"secondary"} onClick={() => setProgress({screen: "title"})}>I'm awesome, back to title</Button>
        </nav>
      </section>
    </motion.main>
  )
}