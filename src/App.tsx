import React from 'react';
import Debug from "./components/Debug";
import ConcentrationScreen from "./screens/ConcentrationScreen";
import BlinkDetector from "./components/BlinkDetector";

function App() {
  return (
    <main className="app">
      <Debug/>
      <BlinkDetector />
      {/*<ConcentrationScreen/>*/}
    </main>
  );
}

export default App;
