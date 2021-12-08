import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { SideBar } from "./Components/SideBar";
import { wordGrids } from "./wordGrids";

const initialState = {
  phrase: [],
  activeGridId: 0,
  prevGridIds: [],
  isPhraseComplete: false,
}

function App() {

  const [appState, setAppState] = useState(initialState)

  function WordBox(props) {
    const handleClick = (event) => {
      const targetWord = props.word;
      if (targetWord === "") return;

      const phrase = appState.isPhraseComplete ? [targetWord]: [...appState.phase, targetWord]
      const prevGridIds = appState.isPhraseComplete ? [] : [...appState.prevGridIds, appState.activeGridId]

      setAppState({
        phrase: phrase,
        prevGridIds: prevGridIds,
        activeGridId: props.childGridId || 0,
        isPhraseComplete: props.last
      })
    };

    return (
      <div className="word-box" onClick={handleClick}>
        <h3>{props.word}</h3>
      </div>
    );
  }

  function OutputBar() {
    const handleUndo = () => {
      // undoing more than once has unexpected results for the word grid

      setAppState({
        phrase: appState.phrase.slice(0,-1),
        activeGridId: appState.prevGridIds.at(-1),
        prevGridIds: appState.prevGridIds.slice(0,-1),
        isPhraseComplete: appState.isPhraseComplete
      })
    };

    const handleClear = () => {
      setAppState(initialState)
    };

    return (
      <div id="top-bar">
        <div id="output-bar">
          <h1 id="active-phrase">{phrase.join(" ")}</h1>
        </div>
        <span></span>
        <div id="output-buttons">
          <button className="button" id="undo-button" onClick={handleUndo}>
            Undo
          </button>
          <button className="button" id="clear-button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
    );
  }

  function WordGrid() {
    const activeWords = wordGrids[activeGridId];
    const activeWordGrid = activeWords.map((obj) => (
      <WordBox word={obj.word} childGridId={obj.childGrid} last={obj.last} />
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

  return (
    <div id="container">
      <SideBar />
      <div id="main-window">
        <OutputBar phrase={phrase} />
        <WordGrid />
      </div>
    </div>
  );
}

export default App;
