import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { SideBar } from "./Components/SideBar";
import { wordGrids } from "./wordGrids";

function App() {
  const [phrase, setPhrase] = useState([""]);
  const [activeGridId, setActiveGridId] = useState(0);

  // Keeping track of previous gridId
  const prevGridIdRef = useRef();
  useEffect(() => {
    prevGridIdRef.current = activeGridId;
  });
  const prevGridId = prevGridIdRef.current;
  // console.log(activeGridId);
  // console.log(prevGridId);
  // if (prevGridId !== undefined) {
  //   console.log(wordGrids[prevGridId][0].last);
  // }

  function WordBox(props) {
    const handleClick = (event) => {
      if (props.word === "") return;
      if (!props.last) {
        setPhrase([...phrase, props.word]);
        setActiveGridId(props.childGridId);
      } else {
        setPhrase([...phrase, props.word]);
        setActiveGridId(0);
      }

      if (prevGridId === undefined) return;
      if (wordGrids[prevGridId][0].last === true) {
        setPhrase([props.word]);
      }
    };

    return (
      <div className="word-box" onClick={handleClick}>
        <h3>{props.word}</h3>
      </div>
    );
  }

  function OutputBar() {
    const handleUndo = () => {
      setPhrase(phrase.slice(0,-1));
      setActiveGridId(prevGridId);
    };

    const handleClear = () => {
      setPhrase([""]);
      setActiveGridId(0);
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
