margin = 10;
cnvsheight = 700;
cnvswidth = 800;
boxSide= 20;
velocity = 0.5;
foodRadius = 6;
score = 0;
level = 0;
paused = false;

g = document.getElementById("game");
g.setAttribute("width" , cnvswidth);
g.setAttribute("height" , cnvsheight);
cntx = g.getContext("2d");
i = document.getElementById("pause");
b = new box(cnvswidth/2 , cnvsheight/2 , boxSide , 0 , 0 , cnvswidth ,  cnvsheight);
f = new food( cnvswidth ,  cnvsheight , foodRadius);

keyHandlers  = {
    "ArrowRight" : function() { b.velocityX = velocity ; b.velocityY = 0 }, 
    "ArrowLeft" : function() { b.velocityX = -(velocity) ; b.velocityY = 0 } ,
    "ArrowUp" : function() { b.velocityX = 0 ; b.velocityY = -(velocity)  }  , 
    "ArrowDown" : function() { b.velocityX = 0 ; b.velocityY = velocity }  ,
    "Space" : function() { paused = !paused} 
} 



function food(limitX , limitY , radius){
    this.colors = ["red" , "blue" , "green" , "#0FD1F3" , "red" ,  "#786C97" , "red" ,  "#D3D910" , "red" ,  "#04FEF3"];
    this.radius =  radius;
    this.positionY = margin +  Math.ceil(Math.random() * (limitY - 3 * margin));
    this.positionX = margin + Math.ceil(Math.random() * (limitX - 3 * margin));
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
    }
    this.move = function(){
        if (paused) return;

        if (this.positionX >  (this.limitX - dimension) 
                || this.positionY >  (this.limitY - dimension) 
                || this.positionX < 0 
                || this.positionY < 0
            ){
            this.reset();
        }

        this.positionX = this.positionX + this.velocityX;
        this.positionY = this.positionY + this.velocityY;
    }
    this.render = function (cntx) {
        this.move();
        cntx.fillStyle="white";
        cntx.fillRect(this.positionX , this.positionY , this.dimension , this.dimension);
    }
}

function obstacle (){

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

function setScore(){
    document.getElementById("score").innerText = score;
}

function increaseDifficulty(){
    level++;
    velocity = 1.5 * velocity;
}

function draw(){
    cntx.fillStyle = "blue";
    cntx.fillRect(0, 0, cnvswidth , cnvsheight);
    cntx.fillStyle = "black";
    cntx.fillRect(margin, margin, cnvswidth - 2 * margin, cnvsheight - 2 * margin);
    if (paused){
        cntx.drawImage(i,  cnvswidth/6 , cnvsheight/3);
        return;
    }
    b.render(cntx);
    f.render(cntx);  
    if ( colision_detection (b , f) ){
        f = new food( cnvswidth ,  cnvsheight , foodRadius);
        score++;
        setScore();
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
    setScore();
    setInterval(function(){
       draw();
    } , 5)
}