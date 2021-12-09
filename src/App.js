import "./App.css";
import React, { useState, useEffect } from "react";
import { WordGrid } from "./components/word_grids/WordGrid"
import { OutputBar } from "./components/OutputBar";
import { SideBar } from "./components/SideBar.jsx";

const initialAppState = {
  phrase: [],
  activeGridId: 0,
  prevGridIds: [],
  isPhraseComplete: false,
};

function App() {
  const [appState, setAppState] = useState(initialAppState);
  const [voice, setVoice] = useState();
  const synth = window.speechSynthesis;

  useEffect(() => {
    const activeVoice = synth
      .getVoices()
      .find((element) => element.name === "Google US English");
    setVoice(activeVoice);
  }, [synth]);

  return (
    <div id="container">
      <SideBar />
      <div id="main-window">
        <OutputBar
          appState={[appState, setAppState]}
          initialAppState={initialAppState}
          voice={voice}
          synth={synth}
        />
        <WordGrid
          appState={[appState, setAppState]}
          voice={voice}
          synth={synth}
        />
      </div>
    </div>
  );
}

export default App;
