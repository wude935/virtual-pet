import './SettingsModal.css';
import React, { useState, useEffect, useContext } from "react";
import { IonButton, IonModal, IonContent } from '@ionic/react'
import SetGameContext from '../../contexts/SetGameContext'

function SettingsModal(props) {
    const {game, setGame, gameReset} = useContext(SetGameContext)

    return (
        <IonModal isOpen={props.isOpen}>
            <IonContent>
                <div className='modalContent'>
                    <h2>Settings</h2>
                    <IonButton onClick={() => setGame({...game, mute: !game.mute})}>{game.mute ? 'Unmute' : 'Mute'}</IonButton>
                    <IonButton onClick={() => gameReset()}>Reset Game</IonButton>
                    <IonButton onClick={() => props.setShowModal(!props.isOpen)}>Close</IonButton>
                    <h3>Scores</h3>
                    {
                        game.highScores.map((highScore) => {
                            return (
                                <p key={highScore.id}>{highScore.name}: {highScore.score}</p>
                            )
                        })
                    }
                </div>
            </IonContent>
        </IonModal>
    );
};

export default SettingsModal;