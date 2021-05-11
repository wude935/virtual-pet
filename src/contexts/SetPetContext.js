import { useContext, createContext, useEffect, useState, useMemo } from "react";
import FeedWav from '../sound/feed.wav';
import PlayWav from '../sound/play.wav';
import CleanWav from '../sound/clean.wav';
import SetGameContext from "./SetGameContext";

let SetPetContext = createContext();
export default SetPetContext;

// component that wraps the gamecontext
export function PetProviderContext(props) {
    const startPet = {
        name: "Your Pet",
        type: "",
        alive: true,
        hunger: 100,
        boredom: 100,
        hygiene: 100,
        action: undefined
    }

    const [pet, setPet] = useState(startPet);
    const {game, setGame} = useContext(SetGameContext);
    const feedSound = new Audio(FeedWav)
    const playSound = new Audio(PlayWav)
    const cleanSound = new Audio(CleanWav)

    useMemo(() => {
        // checks if the pet is alive
        if (pet.hunger == 0 || pet.boredom == 0 || pet.hygiene == 0) {
          setPet({ ...pet, alive: false })
        }
    }, [pet.hunger, pet.boredom, pet.hygiene])

    // increases hunger by 30 and boredom by 15 but lowers hygiene by 20
    function feed() {
        setPet({ ...pet, hunger: Math.min(100, pet.hunger + 40), boredom: Math.min(100, pet.boredom + 15), hygiene: Math.max(0, pet.hygiene - 10), action: 'feed'})
        // change the number based on the number of miliseconds the animation takes
        setTimeout(() => setPet({...pet, action: undefined}), 2000)
        if (!game.mute){
            feedSound.play()
        }
    }

    // increases boredom by 50 but lowers hunger by 10 and hygiene by 20
    function play() {
        setPet({ ...pet, hunger: Math.max(0, pet.hunger - 10), boredom: Math.min(100, pet.boredom + 50), hygiene: Math.max(0, pet.hygiene - 20), action: 'play' })
        // change the number based on the number of miliseconds the animation takes
        setTimeout(() => setPet({...pet, action: undefined}), 2000)
        if (!game.mute){
            playSound.play()
        }
    }

    // increases hygiene by 40 and boredom by 5
    function clean() {
        setPet({ ...pet, boredom: Math.min(100, pet.boredom + 5), hygiene: Math.min(100, pet.hygiene + 40), action: 'clean' })
        // change the number based on the number of miliseconds the animation takes
        setTimeout(() => setPet({...pet, action: undefined}), 2000)
        if (!game.mute){
            cleanSound.play()
        }
    }

    function name(name) {
        setPet({ ...pet, name: name })
    }

    function reset(){
        setPet(startPet)
    }

    const petActions = {
        feed: feed,
        play: play,
        clean: clean, 
        name: name,
        reset: reset
    }

    return (
        <SetPetContext.Provider value={{pet, setPet, petActions}}>
            {props.children}
        </SetPetContext.Provider>
    );
}

