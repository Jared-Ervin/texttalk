import React from "react";
import { WordBox } from "../WordBox";
import { wordGrids } from "./wordGrids";

export function WordGrid(props) {
  const [appState, setAppState] = props.appState;
  const voice = props.voice;
  const synth = props.synth;

  const activeWords = wordGrids[appState.activeGridId];
  const activeWordGrid = activeWords.map((obj, index) => (
    <WordBox
      key={index}
      word={obj.word}
      childGridId={obj.childGrid}
      last={obj.last}
      appState={[appState, setAppState]}
      voice={voice}
      synth={synth}
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
