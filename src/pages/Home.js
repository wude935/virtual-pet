import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState, useMemo } from 'react';
import Canvas from '../components/Canvas/Canvas'
import InteractMenu from '../components/InteractMenu/InteractMenu'
import MainMenu from '../components/MainMenu/MainMenu';
import './Home.css';
import P5Wrapper from "react-p5-wrapper";

function Home() {
  const startPet = {
    name: "Your Pet",
    type: "",
    alive: true,
    hunger: 100,
    boredom: 100,
    hygiene: 100
  }

  const [game, setGame] = useState(
    {
      start: false
    }
  )
  const [pet, setPet] = useState(startPet)
  const [test, setTest] = useState(false)

  // increases hunger by 30 and boredom by 15 but lowers hygiene by 20
  function feed() {
    setPet({ ...pet, hunger: Math.min(100, pet.hunger + 40), boredom: Math.min(100, pet.boredom + 15), hygiene: Math.max(0, pet.hygiene - 10) })
  }

  // increases boredom by 50 but lowers hunger by 10 and hygiene by 20
  function play() {
    setPet({ ...pet, hunger: Math.max(0, pet.hunger - 10), boredom: Math.min(100, pet.boredom + 50), hygiene: Math.max(0, pet.hygiene - 20) })
  }

  // increases hygiene by 40 and boredom by 5
  function clean() {
    setPet({ ...pet, boredom: Math.min(100, pet.boredom + 5), hygiene: Math.min(100, pet.hygiene + 40) })
  }

  function name(name) {
    setPet({ ...pet, name: name })
  }

  let a = 300;
  let b = 300;
  let speed = 3;

  useMemo(() => {
    // checks if the pet is alive
    if (pet.hunger == 0 || pet.boredom == 0 || pet.hygiene == 0) {
      setPet({ ...pet, alive: false })
    }
  }, [pet.hunger, pet.boredom, pet.hygiene])

  useEffect(() => {
    if (game.start) {
      let petTimer
      // decreases stats if the pet is alive
      if (pet.alive) {
        petTimer = setTimeout(() => {
          return (
            setPet({ ...pet, hunger: pet.hunger - .5, boredom: pet.boredom - 1, hygiene: pet.hygiene - .3 })
          );
        }, 1000);
      }
      // otherwise, say confirmation
      else {
        let playAgain = window.confirm(pet.name + " died! Play again?")
        if (playAgain) {
          setPet(startPet)
          setGame({ ...game, start: false })
        }
      }
      return () => {
        if (petTimer) {
          clearTimeout(petTimer);
        }
      };
    }
  }, [pet, game.start]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pet.name || "Virtual Pet"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="layoutContainer">
          <div className="contentContainer">
            {
              game.start ?
                <>
                  <Canvas game={game} pet={pet} />
                  <InteractMenu pet={pet} actions={{ feed, play, clean }}></InteractMenu>
                </>
                :
                <MainMenu game={game} setGame={setGame} name={name}></MainMenu>
            }

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
