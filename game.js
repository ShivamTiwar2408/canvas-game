
function draw(){
	var cnv =  document.getElementById("game");
	var cntx = cnv.getContext("2d");
	cntx.fillStyle="black";
	cntx.fillRect(0 , 0 , 100 , 100);
}
	

document.onload =  function(){
	draw();
}
