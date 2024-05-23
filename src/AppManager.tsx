import Debug from "./components/Debug";
import MeditationScreen from "./screens/MeditationScreen";
import TitleScreen from "./screens/TitleScreen";
import {useProgressState} from "./components/state/appProgressState";
import ConfigScreen from "./screens/ConfigScreen";
import {AnimatePresence } from "framer-motion";
import {useEffect} from "react";
import {useSaveState} from "./components/state/appSaveState";
import FocusingScreen from "./screens/FocusingScreen";

function AppManager() {
  const {screen} = useProgressState();
  const {useCalmMode, setState} = useSaveState();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Turning ON calm mode if user prefers reduced motion
    if (mediaQuery.matches)
      setState({useCalmMode: true});
  }, []);

  return (
    <main className={`app ${useCalmMode ? '--calm-mode' : ''} ${screen !== 'title'?'--overflow-hidden':''}`}>
      <Debug/>
      {/*<BlinkDetector />*/}
      {/*<ConcentrationScreen/>*/}

      <AnimatePresence>
        {screen === "title" && (<TitleScreen/>)}
        {screen === "config" && (<ConfigScreen/>)}
        {screen === "focusing" && <FocusingScreen/>}
      </AnimatePresence>
    </main>
  );
}

export default AppManager;
