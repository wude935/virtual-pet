
import './Canvas.css';
import { useCallback } from "react";
import Sketch from "react-p5";
import img1 from "../../images/standing.gif";
import img2 from "../../images/bored.gif";

let a = 300;
let b = 300;
let speed = 3;
let stand;
let bored;
function Canvas(props) {

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasParentRef.offsetWidth, canvasParentRef.offsetHeight).parent(canvasParentRef);
        stand = p5.loadImage(img1);
        bored = p5.loadImage(img2);
        console.log(stand)
        console.log(bored)
    };

    const draw = useCallback((p5, canvasParentRef) => {
        if (props.game.start) {
            if (props.pet.boredom <= 10) {
                p5.background("rgb(100%,10%,10%)");
                p5.image(bored, 0, 200);
                bored.resize(300, 0);
            }
            else {
                p5.background("rgb(100%,100%,100%)");
                p5.image(stand, 0, 200);
                stand.resize(300, 0);
            }
            p5.stroke(255);
            p5.strokeWeight(4);
            p5.noFill();
            p5.rect(a, b, 100, 200);
            if (a >= p5.width) {
                speed = -3;
            }
            if (a === 0) {
                speed = 3;
            }
            a = a + speed;
        }
    }, [props.pet, props.game]);

    return (
        <Sketch setup={setup} draw={draw} className="canvas" />
    );
}

export default Canvas;