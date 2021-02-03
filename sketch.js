var r=1,ball,sword,z,q=1,br;
var fx1,fx2,fx3,fx4;
var score=0;
var gmst="start";
var nifsoh;
var gmov;
 
function preload(){
  sw=loadImage("s.png");
  
  f1=loadImage("fruit3.png");
  f2=loadImage("fruit4.png");
  f3=loadImage("fruit1.png");
  f4=loadImage("fruit2.png");
  
  fc1=loadImage("fruit3 copy.png");
  fc2=loadImage("fruit4 copy.png");
  fc3=loadImage("fruit1 copy.png");
  fc4=loadImage("fruit2 copy.png");
  
  bo=loadImage("bomb.png");
  ex=loadImage("exp copy.png");
  
  st=loadImage("fruit-ninja-for-pc.png");
  
  bk=loadImage("bkgrdfn.png");
  
  gm = loadImage("gameover.png");
  
  nifsoh = loadSound("knifeSwooshSound.mp3");
  gmov = loadSound("gameover.mp3");
  
}
function setup() {
  createCanvas(400, 600);
  background=createSprite(200,300,100,100);
  background.addImage(bk);
  
  sword=createSprite(200,350,20,50);
  sword.addImage(sw);
  sword.scale= .3;
  sword.setCollider("rectangle",30,-50,20,150,45);
  sword.visible=false;
  
  
  fx1=createSprite(200,350,20,50);
  fx1.addImage(fc1);
  fx1.scale =.2;
  fx1.visible=false;
  
  sta=createSprite(200,300,100,100);
  sta.addImage(st);
  sta.scale=.27 
  
  gmor = createSprite(200,300,20,20);
  gmor.addImage(gm);
  gmor.scale = 1.5;
  gmor.visible = false;
  
  ballg = new Group();
  ebomb = new Group();
  
  fill("white"); 
  text.size = 30;
}

function draw() {
  if(gmst==="start"){
   drawSprites();
    text("Use Mouse to move the Sword",120,450);
    text("Press left Mouse Button to Start",120,500);
    if(mouseDown()){
      gmst="Play";  
      sta.visible=false;
      sword.visible=true;
    } 
  } 
  
  if(gmst==="Play"){
    sword.x=mouseX;
    sword.y=mouseY;
    if(frameCount%80===0){
      fx1.visible=false;
      callball();
    }
    br=Math.round(random(120,200));
    if(frameCount%br===0){
      bomb();
    }
    
    if(sword.isTouching(ballg)){
      ballg.destroyEach();
      fx1.x=ball.x;
      fx1.y=ball.y;
      fx1.visible=true;
      nifsoh.play();
      score = score + 1;
      if(z==1){
       fx1.addImage(fc1); 
      }
      else if(z==2){
       fx1.addImage(fc2); 
      }
      else if(z==3){
       fx1.addImage(fc3); 
      }
      else if(z==4){
        fx1.addImage(fc4); 
      }
    }
    if(sword.isTouching(ebomb)){
      gmst="end";
      fx1.x=bom.x;
      fx1.y=bom.y;
      fx1.visible=true;
      fx1.addImage(ex);
      gmov.play();
      ballg.destroyEach();
    ebomb.destroyEach();
    ballg.velocityX = 0;
    ebomb.velocityX = 0;
    sword.visible = false;
    gmor.visible = true;
    }
   drawSprites();
  }
  text("score :"+score,300,50);
  
  if(gmst==="end"){
   text("Press left mouse button to restart",200,400);
    
    if(mouseDown("leftButton")){
      reset();
    }
  }
}


function callball(){
  ball=createSprite(200,200,30,30);
  ball.lifetime = 100;
  ball.y=Math.round(random(80,300));
  ball.scale=.2;
  z=Math.round(random(1,4,));
  if(z===1){
      ball.addImage(f1);
  }
  else if(z===2){
      ball.addImage(f2);
  }
  else if(z===3){
      ball.addImage(f3);
  }
  else if(z===4){
      ball.addImage(f4);
  }
  r=Math.round(random(1,2));
  if(r===1){
    ball.x=0; 
    ball.velocityX= +(5+5*score/10);
  }
  else if(r===2){
    ball.x=400; 
    ball.velocityX=-(5+5*score/10);
  }
  sword.depth=ball.depth+1;
  ballg.add(ball);
}   

function bomb(){
  bom=createSprite(200,200,30,30);
  bom.lifetime = 100;
  bom.y=Math.round(random(50,300));
  bom.scale=.1;
  bom.addImage(bo);
  q=Math.round(random(1,2));
  if(q===1){
    bom.x=0; 
    bom.velocityX=+5;
  }
  else if(q===2){
    bom.x=400; 
    bom.velocityX=-5;
  }
  ebomb.add(bom);
}

function reset(){
  gmst = "Play";
  score = 0;
  sword.visible = true;
  gmor.visible = false;
  fx1.visible = false;
}