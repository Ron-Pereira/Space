//craeting all the sprites
let ground;
let jet, earth;
let lazer, bullet;
let enemy1, enemy2, enemy3;
let villan;
var jet_img,
  earth_img,
  earth_img_2,
  enemy1_img,
  enemy2_img,
  enemy3_img,
  villan_img,
  lazer_img;
var bg;
var score = 0;
var earth_life = 1000;
var villan_life = 1000;
var jet_life = 900;

function preload() {
  //loading all the assets
  jet_img = loadImage("jet_img.png");
  earth_img = loadAnimation("earth.png");
  earth_img_2 = loadAnimation("13.png");
  enemy1_img = loadImage("enemy_ship.png");
  enemy2_img = loadImage("enemy_ship.png");
  enemy3_img = loadImage("enemy_ship.png");
  villan_img = loadImage("villan_ship.png");
  bg = loadImage("bg.jpg");
  lazer_img = loadImage("10.png");
  bullet_img = loadImage("11.png");
}

function setup() {
  //setting up all the sprites
  createCanvas(1535.5, 717.9);
  frameRate(80);

  //creating groups
  lazerGroup = new Group();
  bulletGroup = new Group();

  jet = createSprite(490, 350, 40, 40);
  jet.addImage(jet_img);
  jet.scale = 0.09;
  jet.y = World.mouseY;

  /*  jet = createSprite(490, mouseY, 40, 40);
  jet.addImage(jet_img);
  jet.scale = 0.09;
  //jet.y = mouseY; */

  jet.velocityX = 0;
  jet.velocityY = 0;

  enemy1 = createSprite(1150, 90, 40, 40);
  enemy1.addImage(enemy1_img);
  enemy1.scale = 0.2;

  /*enemy2 = createSprite(1120, 350, 40, 40);
  enemy2.addImage(enemy2_img);
  enemy2.scale = 0.1;*/

  enemy3 = createSprite(1150, 615, 40, 40);
  enemy3.addImage(enemy3_img);
  enemy3.scale = 0.2;

  villan = createSprite(1400, 350, 40, 40);
  villan.addImage(villan_img);
  villan.scale = 0.2;
  villan.debug = false;
  villan.velocityY = 10;
  //villan.setCollider("rectangle", 0, 0, 1545, 300);

  earth = createSprite(205, 350, 40, 40);
  earth.addAnimation(earth_img);
  earth.scale = 0.5;

  rectMode(CENTER);
  textSize(15);
}

function draw() {
  background(bg);
  bullets();
  //image(bg_img,0,0);
  //push()
  //fill(255);
  //pop();
  jet.velocityX = 0;
  jet.velocityY = 0;

  edges = createEdgeSprites();
  villan.bounceOff(edges);
  jet.bounceOff(edges);

  if (keyDown("UP")) {
    jet.velocityX = 0;
    jet.velocityY = -5;
  }

  if (keyDown("DOWN")) {
    jet.velocityX = 0;
    jet.velocityY = 5;
  }

  if (keyDown("space")) {
    createlazer();
  }
  if (lazerGroup.isTouching(villan)) {
    villan_life = villan_life - 10;
  }

  if (bulletGroup.isTouching(earth)) {
    earth_life = earth_life - 10;
  }

  if (bulletGroup.isTouching(jet)) {
    jet_life = jet_life - 10;
  }

  if (lazerGroup.isTouching(bulletGroup)) {
    bulletGroup.destroyEach();
  }

  if (earth_life <= 450) {
    earth.changeAnimation("hi", earth_img_2);
  }

  text("Villan Life : " + villan_life, 1300, 30);

  text("Earth Life : " + earth_life, 10, 30);

  text("Jet Life : " + jet_life, 10, 50);

  drawSprites();
}

function createlazer() {
  if (frameCount % 10 === 0) {
    lazer = createSprite(550, 100, 5, 5);
    lazer.addImage(lazer_img);
    lazer.scale = 0.3;
    lazer.velocityX = 25;
    lazer.lifetime = 33;
    lazer.y = jet.y;
    lazerGroup.add(lazer);
  }
}

function bullets() {
  if (frameCount % 60 === 0) {
    bullet = createSprite(1250, 100, 5, 5);
    bullet.addImage(bullet_img);
    bullet.scale = 0.1;
    bullet.velocityX = -6;
    bullet.lifetime = 135;
    bullet.setFrame = 0.1;
    bullet.y = villan.y;
    bulletGroup.add(bullet);
  }
}
