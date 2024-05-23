import './ConfigScreen.scss';
import {useSaveState} from "../components/state/appSaveState";
import Button from "../components/ui/Button";
import {useProgressState} from "../components/state/appProgressState";
import ConfigOption from "../components/config/ConfigOption";
import { motion } from "framer-motion";
import {screenAnimTransition, screenReducedTransiton} from "../utils/animation";

export default function ConfigScreen() {
  const {screen, setProgress} = useProgressState();
  const {useEyeTracking, useBreathingGuide, useTextGuide, useCalmMode, setState} = useSaveState();

  return (
    <motion.main className={'config-screen'}
                 transition={useCalmMode ? screenReducedTransiton : screenAnimTransition}
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
                        label={`Reflective guiding`}
                        text={`Guides like: notice your thoughts, observe them, let them go.`} />

          <ConfigOption value={useCalmMode}
                        onChange={value => setState({useCalmMode: value})}
                        label={`Calm mode`}
                        text={`Reduced animation and lesser color intensity`} />

        </div>

        <nav className="config-nav">
          <Button type={"secondary"} onClick={() => setProgress({screen: "title"})}>BACK</Button>
          <Button type={"primary"} onClick={() => setProgress({screen: "focusing"})}>CONTINUE</Button>
        </nav>
      </section>
    </motion.main>
  )
}