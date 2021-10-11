const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;



var engine, world;

var box1;

var gameState = 'onSling';

var score = 0;

function preload() {
  backgroundImage = loadImage('sprites/bg.png');

  getBackgroundImage();
}

function setup() {
  createCanvas(1200, 400);

  engine = Engine.create();
  world = engine.world;

  //First Floor
  box1 = new Box(800, 320, 70, 70);
  box2 = new Box(1000, 320, 70, 70);
  pig1 = new Pig1(910, 350);
  log1 = new Log(910, 270, 270, 90);

  //Second Floor
  box3 = new Box(826, 210, 70, 70);
  box4 = new Box(990, 210, 70, 70);
  pig2 = new Pig2(910, 190, 50, 50);
  log2 = new Log(910, 100, 300, 90);

  //Third Floor
  box5 = new Box(890, 50, 70, 70);
  log3 = new Log(880, 32, 150, 30);
  log4 = new Log(950, 33, 150, -30);

  bird = new Bird(200, 50);

  platform = new Ground(150, 305, 300, 170);

  slingshot = new SlingShot(bird.body, { x: 200, y: 50 });

  ground = new Ground(600, height, 1200, 20);
}

function draw() {
  if (backgroundImage) {
    background(backgroundImage);
  }

  Engine.update(engine);

  fill('white');
  textSize(30);
  text('Score: ' + score, width - 300, 50);

  box1.display();
  box2.display();
  pig1.display();
  pig1.Score();
  log1.display();

  box3.display();
  box4.display();
  pig2.display();
  pig2.Score();
  log2.display();

  box5.display();
  log3.display();
  log4.display();

  bird.display();
  platform.display();

  slingshot.display();

  ground.display();
}

function mouseDragged() {
  if (gameState != 'launch') {
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
  }
}
function mouseReleased() {
  slingshot.fly();
  gameState = 'onSling';
}

function keyPressed() {
  if (keyCode === 32 && (bird.body.speed < 1 || bird.body.speed > 50)) {
    slingshot.attach(bird.body);
    bird.tranjectory = [];
    Matter.Body.setPosition(bird.body, { x: 200, y: 50 });
  }
}

async function getBackgroundImage() {
  var response = await fetch(
    'http://worldtimeapi.org/api/timezone/Asia/Kolkata'
  );
  var responseJson = await response.json();

  var datetime = responseJson.datetime;
  var hour = datetime.slice(11, 13);

  if (hour >= 6 && hour <= 18) {
    bg = 'sprites/bg.png';
  } else {
    bg = 'sprites/bg2.jpg';
  }

  backgroundImage = loadImage(bg);

  console.log(hour);
}
