import "./App.css";
import React, { useState } from "react";
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

  function WordBox(props) {
    const handleClick = (event) => {
      if (props.word === "") return;
      const phrase = appState.isPhraseComplete
        ? [props.word]
        : [...appState.phrase, props.word];
      const prevGridIds = appState.isPhraseComplete
        ? []
        : [...appState.prevGridIds, appState.activeGridId];

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
        isPhraseComplete: appState.isPhraseComplete,
      });
    };

    const handleClear = () => {
      setAppState(initialAppState);
    };

    return (
      <div id="top-bar">
        <div id="output-bar">
          <h1 id="active-phrase">{appState.phrase.join(" ")}</h1>
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

  return (
    <div id="container">
      <SideBar />
      <div id="main-window">
        <OutputBar phrase={appState.phrase} />
        <WordGrid />
      </div>
    </div>
  );
}

export default App;
