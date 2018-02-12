var cnvsht = 500;
var cnvswd = 600;
var boxSide = 20;
var vel = 4;
var obtclSize = 25;
var obstacleVel = 0.7;
var foodSide = 15;
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
g.setAttribute("width" , cnvswd);
g.setAttribute("height" , cnvsht);
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
    "ArrowRight" : function() { if (b) { b.velX = vel ; b.velY = 0 }}, 
    "ArrowLeft" : function() { if (b) { b.velX = -(vel) ; b.velY = 0 } } ,
    "ArrowUp" : function() { if (b) { b.velX = 0 ; b.velY = -(vel)  } } , 
    "ArrowDown" : function() { if(b) { b.velX = 0 ; b.velY = vel } },
    "Space" : function() { paused = !paused} 
} 

function instantiate(){
    obstacles.push ( new obstacle(obtclSize ,obstacleVel, cnvswd ,  cnvsht));
    b = new box(cnvswd/2 , cnvsht/2 , boxSide , 0 , 0 , cnvswd ,  cnvsht);
    f = new food( cnvswd ,  cnvsht , foodSide);
    setScore(0);
}

instantiate();


function food(lmtX , lmtY , dimension){
    this.colors = ["red" , "black"]; //["red" , "blue" , "green" , "#0FD1F3" , "red" ,  "#786C97" , "red" ,  "#D3D910" , "red" ,  "#04FEF3"];
    this.dimension =  dimension;
    this.posY =  Math.ceil(Math.random() * (lmtY - 2*dimension ));
    this.posX =  Math.ceil(Math.random() * (lmtX - 2*dimension));
    this.flip = 0;
    this.render = function (cntx) {
        this.flip = (this.flip + 1) % this.colors.length;
        cntx.fillStyle = this.colors[this.flip];
        //cntx.arc(this.posX , this.posY , this.dimension , 0 , 2*Math.PI);
        //cntx.fill();
        cntx.fillRect(this.posX , this.posY , this.dimension , this.dimension);
    }
}

function box(posX , posY , dimension , velX , velY, lmtX , lmtY){
    this.posX = posX;
    this.posY =  posY;
    this.dimension =  dimension; 
    this.velX = velX;
    this.velY = velY;
    this.lmtX = lmtX;
    this.lmtY = lmtY;
    this.reset = function(){
        this.posY = lmtY/2;
        this.posX = lmtX/2;
        this.velX = 0;
        this.velY = 0;
        reduceLife();
    }
    this.onCollision = this.reset;
    this.move = function(){
        if (paused) return;

        if (this.posX >  (this.lmtX - (dimension)) 
        || this.posY >  (this.lmtY - (dimension)) 
        || this.posX < 0
        || this.posY < 0
         ){
            this.onCollision();
        }

        this.posX = this.posX + this.velX;
        this.posY = this.posY + this.velY;
    }
    this.color = "white";
    this.render = function (cntx) {
        this.move();
        cntx.fillStyle= this.color ;
        cntx.fillRect(this.posX , this.posY , this.dimension , this.dimension);
    }
}

function obstacle(dimension , vel , lmtX , lmtY){
    var posY = lmtY/5 +  Math.ceil(Math.random() * ( (4 * (lmtY /5)) - dimension));
    var posX = lmtX/5 +  Math.ceil(Math.random() * ( (4 * (lmtX /5)) - dimension));  
    var velX =  Math.random() >= 0.5 ? vel : 0;
    var velY =  velX === vel ? 0 : vel;

    box.call(this , posX , posY , dimension , velX , velY, lmtX , lmtY);

    this.onCollision = function(){
        this.velX = -(this.velX);
        this.velY = -(this.velY);
    }
    this.color = "#045FB4";
}


function colision_detection (large , small){

    if (small instanceof box && small.velX === 0 && small.velY === 0) return false;

    let cnr1_x = small.posX;
    let cnr1_y = small.posY;
    
    if (
        cnr1_x >= large.posX 
    && cnr1_x <= (large.posX + large.dimension)
    && cnr1_y >= large.posY 
    && cnr1_y <= (large.posY + large.dimension)
    ) return true;

    let cnr2_x = small.posX + small.dimension;
    let cnr2_y = small.posY;

    if (
        cnr2_x >= large.posX 
    && cnr2_x <= (large.posX + large.dimension)
    && cnr2_y >= large.posY 
    && cnr2_y <= (large.posY + large.dimension)
    ) return true;
    
    let cnr3_x = small.posX;
    let cnr3_y = small.posY + small.dimension;

    if (
        cnr3_x >= large.posX 
    && cnr3_x <= (large.posX + large.dimension)
    && cnr3_y >= large.posY 
    && cnr3_y <= (large.posY + large.dimension)
    ) return true;
    
    let cnr4_x = small.posX + small.dimension;
    let cnr4_y = small.posY + small.dimension;

    if (
        cnr4_x >= large.posX 
    && cnr4_x <= (large.posX + large.dimension)
    && cnr4_y >= large.posY 
    && cnr4_y <= (large.posY + large.dimension)
    ) return true;

    return false;
}

function setScore(value){
    scoreEL.innerText = value;
}

function increaseDifficulty(){
    obstacles.push ( new obstacle(obtclSize ,obstacleVel, cnvswd ,  cnvsht));
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
    cntx.fillText("Game",  cnvswd/3 , cnvsht/3);
    cntx.fillText("Over",  cnvswd/3 , cnvsht/3 + 80);
    cntx.font = "bold 20px Arial";
    cntx.fillText("Press F5 to play again",  cnvswd/3 , cnvsht/3 + 160);
}

function writePausedMessage(){
    cntx.fillStyle = "white";
    cntx.font = "bold 80px Neue Swift";
    cntx.fillText("Paused",cnvswd/4 , cnvsht/2.5);
    cntx.font = "bold 20px Arial";
    cntx.fillText("Press Space Bar to resume", cnvswd/4 , cnvsht/2.5 + 80);
}

function renderBackGround(){
    cntx.drawImage(bgImg,  0, 0);
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
        if ( colision_detection(o,b) ){
            b.reset();
        }
    });
    if( b && f && colision_detection(b,f)){
        f = new food( cnvswd ,  cnvsht , foodSide);
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
           var f =  keyHandlers[e.code];
           if (typeof f === "function") f();
       }
    }
}

window.onload =  function(){
    bindKeyEvents();
    setInterval(function(){
       draw();
    } , 1000/fps)
}