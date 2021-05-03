
import './Canvas.css';
import { useCallback } from "react";
import Sketch from "react-p5";
import { BackgroundSyncPlugin } from 'workbox-background-sync';

let a = 300;
let b = 300;
let speed = 3;

function Canvas(props) {
    var numFrames = 11;
    let img;
    function preload(p5) {
        img = p5.loadImage('./standing.png');
      }

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(canvasParentRef.offsetWidth, canvasParentRef.offsetHeight).parent(canvasParentRef);
        var i;
        // for (i = 0; i < x_sprite.length; i++){
        //     var imgName = "x_running-" + p5.nf(i+1, 2) + ".gif";
        //     x_sprite.push(p5.loadImage(imgName));
        //   }
        console.log(img);
    };

    const draw = useCallback((p5, canvasParentRef) => {
        var frame = p5.frameCount % numFrames;
        p5.image(img, 250, 250);
        // p5.image(x_sprite[frame], 250, 250);
        // if (props.game.start) {
        //     if (props.pet.boredom > 10) {
        //         p5.background("rgb(100%,100%,100%)");
        //     }
        //     else {
        //         p5.background("rgb(100%,10%,10%)");
        //     }
        //     p5.stroke(255);
        //     p5.strokeWeight(4);
        //     p5.noFill();
        //     p5.rect(a, b, 100, 200);
        //     if (a >= p5.width) {
        //         speed = -3;
        //     }
        //     if (a === 0) {
        //         speed = 3;
        //     }
        //     a = a + speed;
        // }
    }, [props.pet, props.game]);

    return (
        <Sketch setup={setup} draw={draw} className="canvas" />
    );
}

export default Canvas;