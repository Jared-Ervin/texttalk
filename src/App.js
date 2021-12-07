import "./App.css";
import React, { useState } from "react";

function App() {
  const [phrase, setPhrase] = useState([""]);

  function WordBox(props) {
    const handleClick = (event) => {
      const targetWord = event.target.textContent;
      console.log(targetWord);
      setPhrase([...phrase, targetWord]);
    };

    return (
      <div className="word-box" onClick={handleClick}>
        <h3>{props.word}</h3>
      </div>
    );
  }

  function OutputBar() {
    const handleSubmit = () => {
      alert(phrase.join(" "));
    };

    const handleUndo = () => {
      const lastElement = phrase.pop();
      setPhrase(phrase.filter((element) => phrase.element !== lastElement));
    };

    const handleDelete = () => {
      setPhrase([""]);
    };

    return (
      <div id="output-bar">
        <h1 id="active-phrase">{phrase.join(" ")}</h1>
        <span></span>
        <div id="output-buttons">
          <button className="button" onClick={handleSubmit}>
            Submit
          </button>
          <button className="button" onClick={handleUndo}>
            Undo
          </button>
          <button className="button" onClick={handleDelete}>
            Clear
          </button>
        </div>
      </div>
    );
  }

  function WordGrid() {
    const initalWordList = [
      "I",
      "You",
      "We",
      "They",
      "She",
      "Him",
      "Need",
      "Want",
      "Give",
      "Share",
      "Take",
      "Help",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "asdfasdf",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "adsfasdf",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "adsfadsfhg",
      "",
      "",
      "",
      "zvcbsdf",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ].map((word) => <WordBox word={word} />);

    return (
      <div className="word-grid">
        <div className="row">{initalWordList.slice(0, 10)}</div>
        <div className="row">{initalWordList.slice(10, 20)}</div>
        <div className="row">{initalWordList.slice(20, 30)}</div>
        <div className="row">{initalWordList.slice(30, 40)}</div>
        <div className="row">{initalWordList.slice(40, 50)}</div>
        <div className="row">{initalWordList.slice(50, 60)}</div>
      </div>
    );
  }

  return (
    <div id="container">
      <OutputBar phrase={phrase}/>
      <WordGrid/>
    </div>
  );
}

export default App;
