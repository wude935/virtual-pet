import './MainMenu.css';
import React, { useState, useEffect } from "react";
import { IonButton } from '@ionic/react'
import { setSyntheticLeadingComments } from 'typescript';

function MainMenu(props) {
    return (
        <div className="MainMenu">
            <h2>Main Menu</h2>
            <label>Pet Name:</label>
            <input onBlur={(event) => props.name(event.target.value)} />
            <IonButton onClick={() => props.setGame({ ...props.game, start: true })}>Start</IonButton>
        </div>
    );
};

export default MainMenu;