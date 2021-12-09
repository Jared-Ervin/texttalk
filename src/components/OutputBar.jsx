import React from "react";

export function OutputBar(props) {
  const [appState, setAppState] = props.appState;
  const initialAppState = props.initialAppState;
  const voice = props.voice;
  const synth = props.synth;

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
