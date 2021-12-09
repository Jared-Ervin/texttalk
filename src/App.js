import "./App.css";
import React, { useState, useEffect } from "react";
import {IoMdArrowBack} from "react-icons/io"
import { SideBar } from "./Components/SideBar";
import { wordGrids } from "./wordGrids";

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
    const activeVoice = synth.getVoices().find(element => element.name === "Google US English")
    setVoice(activeVoice);
  }, [synth]);

  // console.log(synth.getVoices()[4].name)

  function WordBox(props) {
    const msg = new SpeechSynthesisUtterance(props.word);
    msg.voice = voice;
    msg.rate = 0.7;
    msg.pitch = 1;


    const handleClick = () => {
      if (props.word === "") return;
      const phrase = appState.isPhraseComplete
        ? [props.word]
        : [...appState.phrase, props.word];
      const prevGridIds = appState.isPhraseComplete
        ? []
        : [...appState.prevGridIds, appState.activeGridId];
      synth.speak(msg);

      setAppState({
        phrase: phrase,
        prevGridIds: prevGridIds,
        activeGridId: props.childGridId || 0,
        isPhraseComplete: props.last,
      });
    };

    return (
      <div className="word-box" onClick={handleClick}>
        <h3>{props.word}</h3>
      </div>
    );
  }

  function OutputBar() {

    const handleUndo = () => {
      setAppState({
        phrase: appState.phrase.slice(0, -1),
        activeGridId: appState.prevGridIds.at(-1) || 0,
        prevGridIds: appState.prevGridIds.slice(0, -1),
        isPhraseComplete: initialAppState.isPhraseComplete,
      });
    };

    const handleClear = () => {
      setAppState(initialAppState);
    };

    const handleClick = () => {
      if (synth.speaking) return;
      const msg = new SpeechSynthesisUtterance(appState.phrase.join(" "));
      msg.voice = voice;
      msg.rate = 0.7;
      msg.pitch = 1;
      synth.speak(msg);
    };

    return (
      <div id="top-bar">
        <div id="output-bar" onClick={handleClick}>
          <h1 id="active-phrase">{appState.phrase.join(" ")}</h1>
        </div>
        <span></span>
        <div id="output-buttons-container">
          <button
            className="output-buttons"
            id="undo-button"
            onClick={handleUndo}
          >
            Undo
          </button>
          <button
            className="output-buttons"
            id="clear-button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }

  function WordGrid() {
    const activeWords = wordGrids[appState.activeGridId];
    const activeWordGrid = activeWords.map((obj, index) => (
      <WordBox
        key={index}
        word={obj.word}
        childGridId={obj.childGrid}
        last={obj.last}
      />
    ));

    return (
      <div className="word-grid">
        <div className="row">{activeWordGrid.slice(0, 10)}</div>
        <div className="row">{activeWordGrid.slice(10, 20)}</div>
        <div className="row">{activeWordGrid.slice(20, 30)}</div>
        <div className="row">{activeWordGrid.slice(30, 40)}</div>
        <div className="row">{activeWordGrid.slice(40, 50)}</div>
        <div className="row">{activeWordGrid.slice(50, 60)}</div>
      </div>
    );
  }

  const changeGridBack = () => {

    if (!appState.prevGridIds.at(-1)) return;

    const newGridId =  appState.prevGridIds.at(-1)

    setAppState({
      phrase: appState.phrase,
      prevGridIds: appState.prevGridIds,
      activeGridId: newGridId,
      isPhraseComplete: initialAppState.isPhraseComplete
    })
  }

  return (
    <div id="container">
      <SideBar />
      <div id="main-window">
        <OutputBar phrase={appState.phrase} />
        <div id="grid-change-button-container" >
        <button onClick={changeGridBack} id="back-button"><IoMdArrowBack /></button>
        </div>
        <WordGrid />
      </div>
    </div>
  );
}

export default App;
