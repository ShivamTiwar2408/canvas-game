var cnvsheight = 500;
var cnvswidth = 600;
var boxSide = 20;
var velocity = 1;
var obstacleSize = 25;
var obstaclevelocity = 0.7;
var foodRadius = 6;
var score = 0;
var paused = false;
var gameOver = false;
var fps = 60;
var damage = 0;
var numberOfLifes = 4;
var  b , obstacles = [] , f;

function empty(){
    obstacles = [];
    b = undefined;
    f = undefined;
}

var g = document.getElementById("game");
g.setAttribute("width" , cnvswidth);
g.setAttribute("height" , cnvsheight);
cntx = g.getContext("2d");
var pauseImg = document.getElementById("pause");
var gameoverImg = document.getElementById("gameover");
var bgImg = document.getElementById("background");
var oImg = document.getElementById("obstacle");
var rl = document.getElementById("remainingLife");
var scoreEL = document.getElementById("score");
var highestEL = document.getElementById("highest");
document.title = "Box";

function setHighestScore(value){
    localStorage.setItem("highestScore", value);
}
function getHighestScore(){
    var item = localStorage.getItem("highestScore");
    if (item == null) return 0;
    else return item;
}

highestEL.innerHTML = getHighestScore();

var keyHandlers  = {
    "ArrowRight" : function() { b.velocityX = velocity ; b.velocityY = 0 }, 
    "ArrowLeft" : function() { b.velocityX = -(velocity) ; b.velocityY = 0 } ,
    "ArrowUp" : function() { b.velocityX = 0 ; b.velocityY = -(velocity)  }  , 
    "ArrowDown" : function() { b.velocityX = 0 ; b.velocityY = velocity }  ,
    "Space" : function() { paused = !paused} 
} 

function instantiate(){
    obstacles.push ( new obstacle(obstacleSize ,obstaclevelocity, cnvswidth ,  cnvsheight));
    b = new box(cnvswidth/2 , cnvsheight/2 , boxSide , 0 , 0 , cnvswidth ,  cnvsheight);
    f = new food( cnvswidth ,  cnvsheight , foodRadius);
    setScore(0);
}

instantiate();


function food(limitX , limitY , radius){
    this.colors = ["red" , "black"]; //["red" , "blue" , "green" , "#0FD1F3" , "red" ,  "#786C97" , "red" ,  "#D3D910" , "red" ,  "#04FEF3"];
    this.radius =  radius;
    this.positionY =  Math.ceil(Math.random() * (limitY - 2*radius ));
    this.positionX =  Math.ceil(Math.random() * (limitX - 2*radius));
    this.flip = 0;
    this.reposition = function(cntx){
        //cntx.clearRect(this.positionX , this.positionY , 2 * this.radius ,  2 * this.radius);
        this.positionY =  Math.ceil(Math.random() * limitY);
        this.positionX = Math.ceil(Math.random() * limitX);
    }
    this.render = function (cntx) {
        this.flip = (this.flip + 1) % this.colors.length;
        cntx.fillStyle = this.colors[this.flip];
        //cntx.arc(this.positionX , this.positionY , this.radius , 0 , 2*Math.PI);
        //cntx.fill();
        cntx.fillRect(this.positionX , this.positionY , 2 * this.radius , 2 * this.radius);
    }
}

function box(positionX , positionY , dimension , velocityX , velocityY, limitX , limitY){
    this.positionX = positionX;
    this.positionY =  positionY;
    this.dimension =  dimension; 
    this.velocityX = velocityX;
    this.velocityY = velocityY;
    this.limitX = limitX;
    this.limitY = limitY;
    this.reset = function(){
        this.positionY = limitY/2;
        this.positionX = limitX/2;
        this.velocityX = 0;
        this.velocityY = 0;
        reduceLife();
    }
    this.onCollision = this.reset;
    this.move = function(){
        if (paused) return;

        if (this.positionX >  (this.limitX - (dimension)) 
        || this.positionY >  (this.limitY - (dimension)) 
        || this.positionX < 0
        || this.positionY < 0
         ){
            this.onCollision();
        }

        this.positionX = this.positionX + this.velocityX;
        this.positionY = this.positionY + this.velocityY;
    }
    this.color = "white";
    this.render = function (cntx) {
        this.move();
        cntx.fillStyle= this.color ;
        cntx.fillRect(this.positionX , this.positionY , this.dimension , this.dimension);
    }
}

function obstacle(dimension , velocity , limitX , limitY){
    var positionY = limitY/5 +  Math.ceil(Math.random() * ( (4 * (limitY /5)) - dimension));
    var positionX = limitX/5 +  Math.ceil(Math.random() * ( (4 * (limitX /5)) - dimension));  
    var velocityX =  Math.random() >= 0.5 ? velocity : 0;
    var velocityY =  velocityX === velocity ? 0 : velocity;

    box.call(this , positionX , positionY , dimension , velocityX , velocityY, limitX , limitY);

    this.onCollision = function(){
        this.velocityX = -(this.velocityX);
        this.velocityY = -(this.velocityY);
    }
    this.color = "#045FB4";
}


function colision_detection (r , c){

    let cirlce_centreX = c.positionX + c.radius;
    let cirlce_centreY = c.positionY + c.radius;
    return (
        cirlce_centreX >= r.positionX 
    && cirlce_centreX <= (r.positionX + r.dimension)
    && cirlce_centreY >= r.positionY 
    && cirlce_centreY <= (r.positionY + r.dimension)
    )
}

function setScore(value){
    scoreEL.innerText = value;
}

function increaseDifficulty(){
    velocity = 1.2 * velocity;
    obstacles.push ( new obstacle(obstacleSize ,obstaclevelocity, cnvswidth ,  cnvsheight));
}

function setGameOver(){
    if (score > parseInt(getHighestScore())){
        setHighestScore(score);
    }
    gameOver = true;
    empty();
}

function reduceLife(){
    damage = damage +  (100 / numberOfLifes);
    if (damage === 100){
        setGameOver();
    }
    rl.style.width = damage + "%";
}

function writeGameOverMessage(){
    cntx.fillStyle = "white";
    cntx.font = "bold 80px Neue Swift";
    cntx.fillText("Game",  cnvswidth/3 , cnvsheight/3);
    cntx.fillText("Over",  cnvswidth/3 , cnvsheight/3 + 80);
    cntx.font = "bold 20px Arial";
    cntx.fillText("Press F5 to play again",  cnvswidth/3 , cnvsheight/3 + 160);
    //cntx.drawImage(gameoverImg,  cnvswidth/10 , cnvsheight/10);
}

function writePausedMessage(){
    cntx.fillStyle = "white";
    cntx.font = "bold 80px Neue Swift";
    cntx.fillText("Paused",cnvswidth/4 , cnvsheight/2.5);
    cntx.font = "bold 20px Arial";
    cntx.fillText("Press Space Bar to resume", cnvswidth/4 , cnvsheight/2.5 + 80);
    //cntx.drawImage(pauseImg,  cnvswidth/10 , cnvsheight/3);
}

function renderBackGround(){
    //cntx.fillStyle = "black";
    //cntx.fillRect(0, 0, cnvswidth , cnvsheight);
    cntx.drawImage(bgImg,  0, 0);
    // cntx.fillStyle = "black";
    //cntx.fillRect(0, 0, cnvswidth , cnvsheight );
}

function draw(){
    renderBackGround();
    if (gameOver){
        writeGameOverMessage();
        return;
    }
    if (paused){
        writePausedMessage();
        return;
    }
    if (b) { b.render(cntx); }
    if (f) { f.render(cntx); }
    obstacles.forEach(o => {
        o.render(cntx);  
    });
    if(colision_detection(b,f)){
        f = new food( cnvswidth ,  cnvsheight , foodRadius);
        score++;
        setScore(score);
        if (score && score % 5 == 0 ) {
            increaseDifficulty();
        }
    }
}
	
function bindKeyEvents(){
    document.onkeydown = function (e){
      if (paused && e.code !== "Space") return;
       if (e.altKey == false && e.ctrlKey == false)
       {
            keyHandlers[e.code]();
       }
    }
}

window.onload =  function(){
    bindKeyEvents();
    setInterval(function(){
       draw();
    } , 1000/fps)
}