import './MainMenu.css';
import React, { useState, useEffect, useContext } from "react";
import SetGameContext from "../../contexts/SetGameContext";
import { IonButton } from '@ionic/react'
import { setSyntheticLeadingComments } from 'typescript';
import SetPetContext from '../../contexts/SetPetContext';

function MainMenu(props) {
    const {game, setGame} = useContext(SetGameContext);
    const {pet, petActions} = useContext(SetPetContext); 

    return (
        <div className="MainMenu">
            <h2>Main Menu</h2>
            <label>Pet Name:</label>
            <input onBlur={(event) => petActions.name(event.target.value)} />
            <IonButton onClick={() => setGame({ ...game, start: true })}>Start</IonButton>
        </div>
    );
};

export default MainMenu;