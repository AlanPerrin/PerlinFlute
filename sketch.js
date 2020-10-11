let mic;
let fft;
var inc = 0.1;
var scl = 10;

var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;



function setup() {
    createCanvas(960, 540);

    // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();
  fft = new p5.FFT(0, 16);
  fft.setInput(mic);


    cols = floor(width / scl);
    rows = floor(height / scl);
    fr = createP('');
    bg = color('rgba(255, 255, 255, 1)');


    flowfield = new Array(cols * rows);

    for (var i = 0; i < 1000; i++) {
        particles[i] = new Particle();
    }
    background(bg);

};

function draw() {
  let vol = mic.getLevel();
  //vol = vol * 1000;
  let spectrum = fft.analyze();
  let vol2 = parseInt(vol);
  let spectrum2 = spectrum[2]+spectrum[1]+spectrum[2]+spectrum[3]+spectrum[4];
  let spectrum2b = int(map(spectrum2, 0,2000, 0,255));
  let spectrum3 = spectrum[5]+spectrum[6]+spectrum[7]+spectrum[8]+spectrum[9]+spectrum[10];
  let spectrum3b = int(map(spectrum3, 0,600, 0,255));
  let spectrum4 = spectrum[11]+spectrum[12]+spectrum[13]+spectrum[14]+spectrum[15];
  let spectrum4b = int(map(spectrum4, 0,50, 0,255));
  //let colorChange = color('rgba(0, 0, 200, 0.5)');
  let volumcolor = String(`rgba(${spectrum2b}, ${spectrum3b}, ${spectrum4b}, ${vol})`);
  let colorChange = color(volumcolor);
  
  //this.particleColor = color('rgba(255, 0, 255, 0.5)');
      
  //let asdf = 10;
  //console.log(`This is ${asdf} times easier!`);
 
 
    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;

        }
        yoff += inc;
        zoff += 0.0001;
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show(colorChange);
    }

   // fr.html('FPS:' + floor(frameRate()));
    //console.log(spectrum2b);
   // console.log(vol);

  //change this number for sensitiviy
  if (vol < 0.005) { 
        background(bg);};
};