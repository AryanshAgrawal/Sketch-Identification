function setup() {
    canvas = createCanvas(350, 250);
    canvas.position(460, 220);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    syth = window.speechSynthesis;
}

function clearCanvas() {
    background("white");
}

function preload() {
    classifier = ml5.imageClassifier('DoodleNet');
}
function draw() {
    strokeWeight(7);
    stroke("green");
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas() {
    classifier.classify(canvas, gotresult);
}
function gotresult(error, result) {
    if (error) {
        console.error(error);
    }
    console.log(result);
    document.getElementById("label").innerHTML="label: "+result[0].label;
    percent=Math.round(result[0].confidence*100);
    console.log(percent);
    document.getElementById("confidence").innerHTML="Confidence: "+percent+"%";
    utterthis=new SpeechSynthesisUtterance(result[0].label);
    syth.speak(utterthis);
}
