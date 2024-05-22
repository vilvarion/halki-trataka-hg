import './ConfigScreen.scss';
import {useSaveState} from "../appSaveState";
import {TCatPattern} from "../types/global";
import TitleCatOptions from "../components/title/TitleCatOptions";
import Button from "../components/ui/Button";
import {useProgressState} from "../appProgressState";
import ConfigOption from "../components/config/ConfigOption";
import { motion } from "framer-motion";
import {screenAnimTransition} from "../utils/animation";

export default function ConfigScreen() {
  const {screen, setProgress} = useProgressState();
  const {useEyeTracking, useBreathingGuide, useTextGuide, setState} = useSaveState();

  const handleContinue = () => {
    setProgress({screen: useEyeTracking ? "camera" : "meditation"});
  }

  return (
    <motion.main className={'config-screen'}
                 transition={screenAnimTransition}
                 initial={{ opacity: 0, x: "30%"}}
                 animate={{ opacity: 1, x: "0%" }}
                 exit={{ opacity: 0, x: "30%" }}>

      <h2>Config</h2>

      <section className={'config-center'}>
        <div className="config-menu">

          <ConfigOption value={useEyeTracking}
                        onChange={value => setState({useEyeTracking: value})}
                        label={`Use camera tracking`}
                        text={"Your frontal/web camera will be used to track\n if you have blinked during the session"} />

          <ConfigOption value={useBreathingGuide}
                        onChange={value => setState({useBreathingGuide: value})}
                        label={`Breathing guide`}
                        text={`Show the inhale / exhale ring around the focusing point.`} />

          <ConfigOption value={useTextGuide}
                        onChange={value => setState({useTextGuide: value})}
                        label={`Reflective text guiding`}
                        text={`Guides like: notice your thoughts, observe them, let them go.`} />

        </div>

        <nav className="config-nav">
          <Button type={"secondary"} onClick={() => setProgress({screen: "title"})}>BACK</Button>
          <Button type={"primary"} onClick={handleContinue}>CONTINUE</Button>
        </nav>
      </section>
    </motion.main>
  )
}