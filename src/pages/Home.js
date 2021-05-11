import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonButton, IonIcon } from '@ionic/react';
import React, { useEffect, useRef, useState, useMemo, useContext } from 'react';
import SetGameContext from '../contexts/SetGameContext'
import Canvas from '../components/Canvas/Canvas'
import InteractMenu from '../components/InteractMenu/InteractMenu'
import MainMenu from '../components/MainMenu/MainMenu';
import SettingsModal from '../components/SettingsModal/SettingsModal'
import FeedWav from '../sound/feed.wav';
import PlayWav from '../sound/play.wav';
import CleanWav from '../sound/clean.wav';
import { settings } from 'ionicons/icons';
import './Home.css';
import SetPetContext from '../contexts/SetPetContext';

function Home() {
  const {game, setGame, gameReset} = useContext(SetGameContext);
  const {pet, setPet, petActions} = useContext(SetPetContext);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (game.start) {
      let petTimer
      // decreases stats if the pet is alive
      if (pet.alive) {
        petTimer = setTimeout(() => {
          setGame({...game, score: game.score + 1});
          return (
            setPet({ ...pet, hunger: pet.hunger - .5, boredom: pet.boredom - 1, hygiene: pet.hygiene - .3 })
          );
        }, 100);
      }
      // otherwise, say confirmation
      else {
        let playAgain = window.confirm(pet.name + " died! Play again?")
        if (playAgain) {
          let temp = pet.name
          petActions.reset()
          gameReset(temp)
        }
      }
      return () => {
        if (petTimer) {
          clearTimeout(petTimer);
        }
      };
    }
  }, [pet.hunger, pet.boredom, pet.hygiene, pet.alive, game]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pet.name || "Virtual Pet"}</IonTitle>
          <IonButtons slot="primary">
            <IonButton color="primary" onClick={() => setShowModal(!showModal)}>
              <IonIcon icon={settings}/>
            </IonButton>
        </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="layoutContainer">
          <div className="contentContainer">
            {
              game.start ?
                <>
                  <Canvas/>
                  <InteractMenu></InteractMenu>
                </>
                :
                <MainMenu></MainMenu>
            }

          </div>
        </div>
        <SettingsModal isOpen={showModal} setShowModal={setShowModal}></SettingsModal>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);
