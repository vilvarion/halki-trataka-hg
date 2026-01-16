import {useEffect} from "react";
import {AnimatePresence} from "framer-motion";

import {useProgressState} from "./components/state/appProgressState";
import {useSaveState} from "./components/state/appSaveState";
import TitleScreen from "./screens/TitleScreen";
import ConfigScreen from "./screens/ConfigScreen";
import FocusingScreen from "./screens/FocusingScreen";
import FinishScreen from "./screens/FinishScreen";
import packageJson from '../package.json';

function AppManager() {
  const {screen} = useProgressState();
  const {useCalmMode, setState} = useSaveState();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Turning ON calm mode if user prefers reduced motion
    if (mediaQuery.matches)
      setState({useCalmMode: true});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className={`app ${useCalmMode ? '--calm-mode' : ''} ${screen !== 'title'?'--overflow-hidden':''}`}>

      <div className="appver">Ver: {packageJson.version}</div>

      <AnimatePresence>
        {screen === "title" && (<TitleScreen/>)}
        {screen === "config" && (<ConfigScreen/>)}
        {screen === "focusing" && <FocusingScreen/>}
        {screen === "finish" && <FinishScreen/>}
      </AnimatePresence>
    </main>
  );
}

export default AppManager;
