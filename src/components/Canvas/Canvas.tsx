import Sketch from "react-p5";

function Canvas(props: any) {
    let a = 300;
    let b = 300;
    let speed = 3;

    function setup(p5: any, canvasParentRef: any) {
      //Canvas of size 1000x800 
    };
    
    function draw(p5: any) {
      p5.background("rgb(100%,10%,10%)");
      p5.stroke(255);
      p5.strokeWeight(4);
      p5.noFill();
      p5.ellipse(a, b, 100, 100);
      if (a >= p5.width) {
        speed = -3;
      }
      if (a === 90) {
        speed = 3;
      }
      a = a + speed;  
    };
    
    return (
        <Sketch setup={setup} draw={draw} className="p5Canvas" />          
    );
}

export default Canvas;