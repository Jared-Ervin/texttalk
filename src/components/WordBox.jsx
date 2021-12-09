import React from "react";

export function WordBox(props) {
  const [appState, setAppState] = props.appState;
  const voice = props.voice;
  const synth = props.synth;
  const word = props.word;
  const childGridId = props.childGridId;
  const last = props.last;

  const msg = new SpeechSynthesisUtterance(word);
  msg.voice = voice;
  msg.rate = 0.7;
  msg.pitch = 1;

  const handleClick = () => {
    if (props.word === "") return;
    const phrase = appState.isPhraseComplete
      ? [word]
      : [...appState.phrase, word];
    const prevGridIds = appState.isPhraseComplete
      ? []
      : [...appState.prevGridIds, appState.activeGridId];
    synth.speak(msg);

    setAppState({
      phrase: phrase,
      prevGridIds: prevGridIds,
      activeGridId: childGridId || 0,
      isPhraseComplete: last,
    });
  };

  return (
    <div className="word-box" onClick={handleClick}>
      <h3>{word}</h3>
    </div>
  );
}
