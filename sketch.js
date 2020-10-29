var knife,knifeimage;
var fruit1image,fruit2image,fruit3image,fruit4image;
var fruit,alien;
var alienanim;
var fruitsgroup;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var score=0;
var cutsound,gameover;
function preload(){
  knifeimage=loadImage("sword.png");
 fruit1image=loadImage("fruit1.png");
   fruit2image=loadImage("fruit2.png");
   fruit3image=loadImage("fruit3.png");
   fruit4image=loadImage("fruit4.png");
   alienanim=loadAnimation("alien1.png","alien2.png");
  
  gameoverimage=loadImage("gameover.png");
  cutsound=loadSound("knifeSwooshSound.mp3");
  gameover=loadSound("gameover.mp3")
}
function setup(){
  createCanvas(400,400);
  knife=createSprite(200,200,20,20)
  knife.addImage("knife",knifeimage);
  knife.addImage("gameover",gameoverimage);
  knife.scale=0.5;
  
  fruitsgroup=new Group();
  aliensgroup=new Group();
}
function draw(){

   background("lightblue");
  text("score="+score,340,40);
  if(gamestate===PLAY){
    knife.y=mouseY;
  knife.x=mouseX;
  fruits();
  aliens();
    if(fruitsgroup.isTouching(knife)){
      score=score+1;
      fruitsgroup.destroyEach();
      cutsound.play();
      
    }
    if(aliensgroup.isTouching(knife)){
      gamestate=END;
      gameover.play();
    }
  }
  else if(gamestate===END){
    knife.changeAnimation("gameover",gameoverimage);
    aliensgroup.destroyEach();
    fruitsgroup.setLifetimeEach(0);
    knife.x=200;
    knife.y=200;
    knife.scale=1.3;
  }
  
  
  
  drawSprites();
  
}
function fruits(){
  if(frameCount % 60===0){
        fruit=createSprite(430,200,20,20)
    var select=Math.round(random(1,2))
      if(select===1){
         fruit.x=400;
        fruit.velocityX=-(5+score/4);
         
         }else{
        fruit.x=0;
           fruit.velocityX=(5+score/4);
      }
    

    
    fruit.y=Math.round(random(15,385));
    
    var rand=Math.round(random(1,4));
    switch(rand){
      case 1: fruit.addImage("fruit1",fruit1image);
        break;
      case 2: fruit.addImage("fruit2",fruit2image);
        break;
      case 3: fruit.addImage("fruit3",fruit3image);
        break;
      case 4: fruit.addImage("fruit4",fruit4image);
        break;
        default:break;
        
    }
    fruit.scale=0.2;
    fruit.lifetime=100;
    fruitsgroup.add(fruit);
  }
}

function aliens(){
  if(frameCount % 200===0){
    alien=createSprite(430,200,20,20)
    alien.y=Math.round(random(5,395));
    alien.velocityX=-(5+score/10);
   alien.addAnimation("alien",alienanim);
    alien.scale=0.9;
    alien.lifetime=100;
    aliensgroup.add(alien);
  }
}










