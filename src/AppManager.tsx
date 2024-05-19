import React, {useState} from 'react';
import Debug from "./components/Debug";
import MeditationScreen from "./screens/MeditationScreen";
import BlinkDetector from "./components/BlinkDetector";
import TitleScreen from "./screens/TitleScreen";

function AppManager() {

  const [screen, setScreen] = useState("title");
  return (
    <main className="app">
      <Debug/>
      {/*<BlinkDetector />*/}
      {/*<ConcentrationScreen/>*/}

      {screen === "title" && (<TitleScreen/>)}

      {screen === "meditation" && <MeditationScreen/>}
    </main>
  );
}

export default AppManager;
