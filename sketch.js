var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;

var divisions = [];
var particles = [];
var plinkos = [];

var divisionHeight=300;

var particle;

var score = 0;
var count = 0;

var gameState = "play";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
    
}
 
function draw() {
  background("black");

  textSize(20)
  text("Score : " + score, 20, 30);

  textSize(28);
  //display the 500s score
  text("500", 15, 575);
  text("500", 95, 575);
  text("500", 175, 575);
  text("500", 255, 575);
  
  //displaying the 100s score
  text("100", 335, 575);
  text("100", 415, 575);
  text("100", 495, 575);

  //displaying the 200s score
  text("200", 575, 575);
  text("200", 655, 575);
  text("200", 735, 575);

  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
   }
 
  for (var j = 0; j < particles.length; j++) {
     particles[j].display();
   }
   for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

   if(particle!=null) {
     particle.display();

     //Checking if below line
     if(particle.body.position.y > 760) {

       //First Set of Divisions - 500 points
       if(particle.body.position.x < 300) {
         score+=500;
         particle = null;

         if(count >= 5){
          gameState = "end";
        }
       }
       //Second Set of Divisions - 100 points
       else if(particle.body.position.x > 301 && particle.body.position.x < 600) {
        score+=100;
        particle = null;
          if(count >= 5) {
            gameState = "end";
          }
        } 
       //Third Set of Divisions - 200 points
       else if(particle.body.position.x > 601 && particle.body.position.x < 900) {
         score+=200;
         particle = null;
          if(count >=5) {
            gameState = "end";
          }
        }
      }
    }
    //Displaying Game Over
    if(gameState == "end") {
      textSize(72);
      fill("red");
      text("GAME OVER", 175, 350);
    } 
  }

function mousePressed() {
  if(gameState!="end") {
    count++;
    particle = new Particle(mouseX, 10, 10, 10);
  }
}