
import './Canvas.css';
import { useCallback } from "react";
import Sketch from "react-p5";
import img1 from "../../images/standing.gif";
import img2 from "../../images/bored.gif";
import img3 from "../../images/run.gif";
import img4 from "../../images/food1.png";
import img5 from "../../images/food2.png";
import img6 from "../../images/ded.png";

let x;
let y;
let stand;
let bored;
let run;
let food1;
let food2;
let ded;
function Canvas(props) {

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasParentRef.offsetWidth, canvasParentRef.offsetHeight).parent(canvasParentRef);
        stand = p5.loadImage(img1);
        bored = p5.loadImage(img2);
        run = p5.loadImage(img3);
        food1 = p5.loadImage(img4);
        food2 = p5.loadImage(img5);
        ded = p5.loadImage(img6);
        console.log(stand)
        console.log(bored)
        console.log(run)
        console.log(food1)
        console.log(food2)
        console.log(ded)
        x = p5.width/2-100;
        y = 0;
    };

    const draw = useCallback((p5, canvasParentRef) => {
        p5.background("rgb(100%, 100%, 100%)");
        if (props.game.start) {
            // bored
            if (props.pet.boredom <= 70) {
                p5.background("rgb(100%,10%,10%)");
                p5.image(run, x, p5.height-300);
                x -= 3;
                run.resize(300, 0);
            }
            else {
                p5.image(stand, x, p5.height-300);
                stand.resize(300, 0);
            }
            
            // hungry
            if (props.pet.hunger <= 60){
                food1.resize(300,0);
                if (y != p5.height-300){
                    p5.image(food1, 400, y);
                    y += 10;
                }
                else{
                    p5.image(food2, 400, p5.height-300)
                    food2.resize(300, 0);
                }
            }

            //ded
            if (!props.pet.alive){
                p5.background("rgb(100%, 100%, 100%)");
                p5.image(ded, x, p5.height-300);
                ded.resize(300, 0);
            }
        }
    }, [props.pet, props.game]);

    return (
        <Sketch setup={setup} draw={draw} className="canvas" />
    );
}


export default Canvas;