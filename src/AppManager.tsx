import Debug from "./components/Debug";
import MeditationScreen from "./screens/MeditationScreen";
import TitleScreen from "./screens/TitleScreen";
import {useProgressState} from "./appProgressState";
import ConfigScreen from "./screens/ConfigScreen";
import {AnimatePresence } from "framer-motion";

function AppManager() {
  const {screen} = useProgressState();

  return (
    <main className="app">
      <Debug/>
      {/*<BlinkDetector />*/}
      {/*<ConcentrationScreen/>*/}

      <AnimatePresence>
        {screen === "title" && (<TitleScreen/>)}
        {screen === "config" && (<ConfigScreen/>)}
        {screen === "meditation" && <MeditationScreen/>}
      </AnimatePresence>
    </main>
  );
}

export default AppManager;
