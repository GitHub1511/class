//add variables
var trex,trex_running,trex_collided,ground,invisibleGround,groundImg;
var cloudImg,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6
var CloudGroup, ObstacleGroup;
var score1;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverImg, restartImg;
var gameOver,restart;

function preload() {
  
  cloudImg=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");

  trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadImage("trex_collided.png");
  groundImg=loadImage("ground2.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 275);
  
  //create trex sprite
  trex = createSprite(50,230,20,20);
  trex.addAnimation("running",trex_running);
  trex.scale=0.5;
  
  //create ground sprite
  ground = createSprite(300,260,600,30);
  ground.addImage("ground",groundImg);
  
  //give the ground velocity
  ground.velocityX = -4;
  
  //add illusion of trex moving
  ground.width=ground.width/2;
  
  trex.addAnimation("collided",trex_collided);
  
  gameOver = createSprite(275,140,10,10);
  restart = createSprite(290, 170,10,10);

  score1 = 0
  
  //create invisible ground sprite (the one that the trex will collide with)
  invisibleGround = createSprite(300,280,600,30);
  
  CloudGroup = new Group();
  ObstacleGroup = new Group();
  
  //make the invisibleGround invisible
  invisibleGround.visible = false;
  
  
}

function draw(){
  background("white");
  
  
  
  if (gameState===PLAY){
    
    gameOver.visible = false;
    restart.visible = false;
    
    //add illusion of trex moving (2nd step)
    if (ground.x<0) {
      ground.x=ground.width/2;
    }
    
    ground.velocityX = -4;
    
    //make the trex collide with the invisible ground instead of normal ground     to   give a realistic effect.
    trex.collide(invisibleGround);
    
    score1 = score1 + Math.round(getFrameRate()/40);
    
    //make the trex jump but only when it's on the ground.
    if (keyWentDown("space")&& trex.y>=241) {
      trex.velocityY = -15;
    }
    
    //add gravity
    trex.velocityY=trex.velocityY + 0.8;
    
    spawnObstacles();
    spawnClouds();
    
    if (ObstacleGroup.isTouching(trex)) {
      gameState=END;
    }
    
  } else if (gameState===END){
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    
    ObstacleGroup.setVelocityXEach(0);
    CloudGroup.setVelocityXEach(0);
    
    trex.changeAnimation("collided",trex_collided);
    
    ObstacleGroup.setLifetimeEach(-1);
    CloudGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
    gameOver.addImage(gameOverImg);
    
    restart.visible = true;
    restart.addImage(restartImg);
    restart.scale = 0.5
    
    
    
    if (mousePressedOver(restart)) {
      reset();
    }
    
    
  }
  
  
  
  text("score " + score1,270,30);
  
  
  
  
  
  
  //console.log(trex.y);
  
  
  
    
  //make it so you can see the coordinates of the mouse
  text(mouseX+","+mouseY,mouseX,mouseY);  
  
  
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(620,100,10,10);
    cloud.velocityX = -4
    cloud.y=random(65,130);
    cloud.addImage(cloudImg);
    cloud.scale = 0.6
    cloud.depth = trex.depth -1;
    
    cloud.lifetime = 620/3.5
    
    CloudGroup.add(cloud);
  }  
}

function spawnObstacles() {
    if (frameCount % 60 === 0) {
    var obstacle = createSprite(620,240,10,10);
    obstacle.velocityX = -4
    var rand=Math.round(random(1,6));
    
    if (rand === 1) {
      obstacle.addImage(obstacle1);
    }
      
    if (rand === 2) {
      obstacle.addImage(obstacle2);
    }
    
    if (rand === 3) {
      obstacle.addImage(obstacle3);
    }
    
    if (rand === 4) {
      obstacle.addImage(obstacle4);
    }
      
    if (rand === 5) {
      obstacle.addImage(obstacle5);
    }
      
    if (rand === 6) {
      obstacle.addImage(obstacle6);
    }  
      
    
    obstacle.scale = 0.5
    
    
    obstacle.lifetime = 620/3.5
    
    ObstacleGroup.add(obstacle);
  }
}

function reset() {
  gameState=PLAY;
  
  gameOver.visible=false;
  restart.visible=false;
  
  ObstacleGroup.destroyEach();
  CloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
}







  