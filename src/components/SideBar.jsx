import React, { useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import "../App.css";

export function SideBar() {
  const [lockStatus, setLockStatus] = useState(false);

  const handleLock = () => {
    setLockStatus(!lockStatus);
  };

  function LockButton() {
    return (
      <div className="side-bar-button" id="lock-button" onClick={handleLock}>
        {!lockStatus ? <FaUnlock /> : <FaLock />}
      </div>
    );
  }

  return (
    <div id="side-bar">
      <LockButton isLocked={lockStatus} />
      <div id="options" style={{ pointerEvents: lockStatus ? "none" : "auto" }}>
        <button className="side-bar-button">
          <h4>Favorites</h4>
        </button>
        <button className="side-bar-button">
          <h4>Add Custom</h4>
        </button>
        <button className="side-bar-button">
          <h4>Settings</h4>
        </button>
      </div>
    </div>
  );
}
