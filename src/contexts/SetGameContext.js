import { /*useContext,*/ createContext, useEffect, useState } from "react";

let SetGameContext = createContext();
export default SetGameContext;

// component that wraps the gamecontext
export function GameProviderContext(props) {
    const [game, setGame] = useState(
        {
            start: false,
            mute: false,
            score: 0,
            highScores: []
        }
    );

    function gameReset(name){
        let temp = game.highScores
        temp.push({name: name, score: game.score, id: temp.length})
        setGame({...game, start: false, score: 0, highScores: temp})
    }

    return (
        <SetGameContext.Provider value={{game, setGame, gameReset}}>
            {props.children}
        </SetGameContext.Provider>
    );
}