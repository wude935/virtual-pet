
import './Canvas.css';
import { useCallback } from "react";
import Sketch from "react-p5";
import test from "../../images/app.js"

let a = 300;
let b = 300;
let speed = 3;
let img;
function Canvas(props) {

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasParentRef.offsetWidth, canvasParentRef.offsetHeight).parent(canvasParentRef);
        img = p5.loadImage(test);
        img.p5.resize(50,0)
        console.log(img)
    };

    const draw = useCallback((p5, canvasParentRef) => {
        if (props.game.start) {
            if (props.pet.boredom > 10) {
                p5.background("rgb(0%,100%,10%)");
            }
            else {
                p5.background("rgb(100%,10%,10%)");
            }
            p5.stroke(255);
            p5.strokeWeight(4);
            p5.noFill();
            p5.rect(a, b, 100, 200);
            p5.image(img, 100, 100);
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