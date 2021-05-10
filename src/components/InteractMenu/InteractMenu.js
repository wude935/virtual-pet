import './InteractMenu.css';
import React, { useState, useEffect } from "react";
import { IonButton } from '@ionic/react'



function InteractMenu(props) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    }
  },[])
  
  // press f to feed
  // press p to play
  // press c to clean
  function handleKeyPress(event) {
    switch(event.keyCode) {
      case 70:
        props.actions.feed()
        break;
      case 80:
        props.actions.play()
        break;
      case 67:
        props.actions.clean();
        break;
      default:
        break;
    }
  }

  function Stats(props) {
    return (
      <div className="stats">
        <div className="statsLabel">{props.label || "no label"}</div>
        <div className="statsBackgroundBar">
          <div className="statsForegroundBar" style={{ width: `${props.value}%` }}>
          </div>
          <div className="statsValue">
            {/* {Math.round(props.value) + "%"} */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="interactMenu">
      <div className="statsContainer">
        <Stats label="Hunger" value={props.pet.hunger}></Stats>
        <Stats label="Boredom" value={props.pet.boredom}></Stats>
        <Stats label="Hygiene" value={props.pet.hygiene}></Stats>
      </div>
      <IonButton onClick={() => props.actions.feed()} disabled={!props.pet.alive}>Feed</IonButton>
      <IonButton onClick={() => props.actions.play()} disabled={!props.pet.alive}>Play</IonButton>
      <IonButton onClick={() => props.actions.clean()} disabled={!props.pet.alive}>Clean</IonButton>
    </div>
  );
};

export default InteractMenu;
