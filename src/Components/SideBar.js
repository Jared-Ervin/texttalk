import React from "react";
import "../App.css";

export function SideBar() {
    return (
        <div id="side-bar">
            <div className="side-bar-button" id="lock-button"><h4>Lock</h4></div>
            <div id="options">
            <div className="side-bar-button"><h4>Favorites</h4></div>
            <div className="side-bar-button"><h4>Add Custom</h4></div>
            <div className="side-bar-button"><h4>Settings</h4></div>
            </div>
        </div>

    )
}