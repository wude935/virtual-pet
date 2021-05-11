
import './Canvas.css';
import React, { useCallback, useEffect, useMemo, useContext } from "react";
import Sketch from "react-p5";
import SetGameContext from '../../contexts/SetGameContext'
import SetPetContext from '../../contexts/SetPetContext'
import img1 from "../../images/standing.gif";
import img2 from "../../images/bored.gif";
import img3 from "../../images/run.gif";
import img4 from "../../images/food1.png";
import img5 from "../../images/food2.png";
import img6 from "../../images/ded.png";
import img7 from "../../images/ball.png";
import img8 from "../../images/bath.gif";
import img9 from "../../images/eat.gif";

let x;
let y;
// idle animations
let stand;
let bored;
let run;
let food1;
let food2;
let eat;
let ded;
let ball;
let bath;
let tempy;
function Canvas(props) {
    const {game, setGame} = useContext(SetGameContext);
    const {pet, setPet, petActions} = useContext(SetPetContext);

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasParentRef.offsetWidth, canvasParentRef.offsetHeight).parent(canvasParentRef);
        stand = p5.loadImage(img1);
        bored = p5.loadImage(img2);
        run = p5.loadImage(img3);
        food1 = p5.loadImage(img4);
        food2 = p5.loadImage(img5);
        ded = p5.loadImage(img6);
        ball = p5.loadImage(img7);
        bath = p5.loadImage(img8);
        eat = p5.loadImage(img9);
        console.log(stand)
        console.log(bored)
        console.log(run)
        console.log(food1)
        console.log(food2)
        console.log(ded)
        console.log(ball)
        console.log(bath)
        console.log(eat)

        // location of pet at all times
        x = p5.width/2-100;
        y = p5.height-300;
        tempy = 0;
    };

    const draw = useCallback((p5, canvasParentRef) => {
        p5.background("rgb(100%, 100%, 100%)");
        if (game.start) {
            //HERE IS THE CODE CAITLIN
            // go to setpetcontext line 57 and change the time it takes the animation to run
            // feed
            stand.resize(300, 0);
            p5.image(stand, x, y);
            if (pet.action == "feed"){
                console.log('run animation')
                food2.resize(300,0);
                p5.image(food2, 400, p5.height-300)

                // runs to food and eats
                if (x < 350){
                    p5.image(run, x, y);
                    x += 5;
                }
                else if (x>450){
                    p5.image(run, x, y);
                    x -= 5;
                }
                else {
                    eat.resize(300, 0);
                    p5.image(eat, x, y);
                }
            
            }

            // play
            if (pet.action == "play"){
                p5.background("rgb(100%, 100%, 100%)");
                ball.resize(200,0);
                run.resize(300, 0);
                p5.image(ball, 100, p5.height-200);
                if (x < 50){
                    p5.image(run, x, y);
                    x += 5;
                }
                else if (x>150){
                    p5.image(run, x, y);
                    x -= 5;
                }
                else {
                    p5.image(stand, x, y);
                }
            }
            
            // clean
            if (pet.action == "clean"){
                p5.background("rgb(100%, 100%, 100%)");
                bath.resize(300, 0);
                p5.image(bath, x, y);
            }
            if (!pet.alive){
                p5.background("rgb(100%, 100%, 100%)");
                p5.image(ded, x, y);
                ded.resize(300, 0);
            }
        }
    }, [pet, game]);

    return (
        <Sketch setup={setup} draw={draw} className="canvas" />
    );
}


export default React.memo(Canvas);