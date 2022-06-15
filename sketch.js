var girl ,girl_running, girl_caught;
var ghost ,ghostRun;
var forest ,forestImage;
var invisGround;
var obstacles ,obstacleImage;
var obstaclesGroup;
var gameOver, gameOverImage;
var restart,restartImage;
var play = 1;
var end = 0;
var gameState = play;

function preload(){
  girl_running = loadAnimation("Cartoon girl running.gif");
  girl_caught = loadImage("girl_caught.png");
  ghostRun = loadAnimation("Ghost cartoon.gif");
  forestImage = loadImage("forest bg.jpg");
  obstacleImage = loadImage("hole_image.png");
  restartImage = loadImage("restart.png");
  gameOverImage = loadImage("game_over.png");
}

function setup() {
  createCanvas(600,200);

  forest = createSprite (300,100);
  forest.addImage("forest",forestImage);
  forest.velocityX = -3;
 

  girl = createSprite(250,140)
  girl.addAnimation("running",girl_running);
  girl.addAnimation("stopped",girl_caught);
  girl.scale = 0.14;
  girl.debug = true;  

  ghost = createSprite(40,100)
  ghost.addAnimation("chasing",ghostRun);
  ghost.scale = 0.2;
  ghost.debug = true;

  invisGround = createSprite (width/2,height-10,width,3);
  invisGround.visible = false;

  gameOver = createSprite (400,50);
  gameOver.addImage("gameOver",gameOverImage);
  gameOver.scale = 0.1;

  restart = createSprite (500,50);
  restart.addImage("restart",restartImage);
  restart.scale = 0.1;

  obstaclesGroup = new Group();

}

function draw() {
  background("black");

  if(gameState===play){
    
    if(keyDown("space") && (girl.collide(invisGround))){
      girl.velocityY = -10;
    }

    //gravity
    girl.velocityY += 0.5;

    if(forest.x <= 280){
      forest.x = (300)
    }

    spawnObstacles();

    forest.velocityX = -3;

    gameOver.visible = false;
    restart.visible = false;

    if(girl.isTouching(obstaclesGroup)){
      gameState = end;
    }

  }
  else if(gameState===end){
    forest.velocityX = 0;

    gameOver.visible = true;
    restart.visible = true;  
    
    obstaclesGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);

    girl.velocityY = 0;
    girl.changeAnimation("stopped");

    if(mousePressedOver(restart)){
      resetGame();
    }
  
  }


  girl.collide( invisGround);

  spawnObstacles();
  drawSprites();
}

function spawnObstacles(){
  if(frameCount%60===0){
    obstacles = createSprite (width,175)
    obstacleImage.addImage(obstacleImage)
    obstacles.velocityX = -3;
    obstacles.scale = 0.3;
    obstacles.lifetime = width/3;
    obstaclesGroup.add(obstacles);
  }
}

function resetGame(){
  gameState = play;
  girl.changeAnimation("running");
  obstaclesGroup.destroyEach();
  
}