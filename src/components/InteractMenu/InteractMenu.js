import './InteractMenu.css';
import React, { useState, useEffect, useContext } from "react";
import { IonButton } from '@ionic/react'
import { gameController } from 'ionicons/icons';
import SetGameContext from '../../contexts/SetGameContext';
import SetPetContext from '../../contexts/SetPetContext';



function InteractMenu(props) {
  const {game, setGame} = useContext(SetGameContext);
  const {pet, setPet, petActions} = useContext(SetPetContext);

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
    if (!pet.action) {
      switch(event.keyCode) {
        case 70:
          petActions.feed()
          break;
        case 80:
          petActions.play()
          break;
        case 67:
          petActions.clean();
          break;
        default:
          break;
      }
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
        <Stats label="Hunger" value={pet.hunger}></Stats>
        <Stats label="Boredom" value={pet.boredom}></Stats>
        <Stats label="Hygiene" value={pet.hygiene}></Stats>
        <p>Score: {game.score}</p>
      </div>
      <IonButton onClick={() => petActions.feed()} disabled={!pet.alive || pet.action}>Feed</IonButton>
      <IonButton onClick={() => petActions.play()} disabled={!pet.alive || pet.action}>Play</IonButton>
      <IonButton onClick={() => petActions.clean()} disabled={!pet.alive || pet.action}>Clean</IonButton>
    </div>
  );
};

export default InteractMenu;
