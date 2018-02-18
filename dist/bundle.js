!function(t){var i={};function n(e){if(i[e])return i[e].exports;var o=i[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=i,n.d=function(t,i,e){n.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(i,"a",i),i},n.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},n.p="",n(n.s=0)}([function(t,i){var n,e,o=window.innerHeight/5*3,s=window.innerWidth/2,h=22,r=4,l=25,c=1.5,a=16,m=0,p=!1,d=!1,u=0,f=4,x=[],y=!1;var v=document.getElementById("game");v.setAttribute("width",s),v.setAttribute("height",o),cntx=v.getContext("2d");var g=document.getElementById("remainingLife"),X=document.getElementById("score"),Y=document.getElementById("highest");document.title="PacMan";var w={setItem:function(t,i){localStorage.setItem(CryptoJS.MD5(t).toString(),CryptoJS.AES.encrypt(i.toString(),"key").toString())},getItem:function(t){let i=localStorage.getItem(CryptoJS.MD5(t).toString());return null!=i?CryptoJS.AES.decrypt(i,"key").toString(CryptoJS.enc.Utf8):null}},S=new Image;function M(){var t=w.getItem("highestScore");return null==t?0:t}S.src="./dist/Images/googlespritesheet2.png",Y.innerHTML=M();var D={ArrowRight:function(){n&&n.moveRight()},ArrowLeft:function(){n&&n.moveLeft()},ArrowUp:function(){n&&n.moveUp()},ArrowDown:function(){n&&n.moveDown()},Space:function(){p=!p}};function I(t,i,n){this.animation=[{x:183,y:177},{x:183,y:197},{x:183,y:217},{x:183,y:237}],this.image=this.animation[Math.ceil(Math.random()*(this.animation.length-1))],this.dimension=n,this.posY=Math.ceil(Math.random()*(i-2*n)),this.posX=Math.ceil(Math.random()*(t-2*n)),this.render=function(t){t.drawImage(S,this.image.x,this.image.y,13,12,this.posX,this.posY,this.dimension,this.dimension)}}function b(t,i,o,s,h,l,c){this.posX=t,this.posY=i,this.dimension=o,this.velX=s,this.velY=h,this.lmtX=l,this.lmtY=c,this.reset=function(){this.posY=c/2,this.posX=l/2,function(){100===(u+=100/f)&&function(){m>parseInt(M())&&(t=m,w.setItem("highestScore",t));var t;d=!0,x=[],n=void 0,e=void 0}();g.style.width=u+"%"}(),this.motionDirection="Up",y=!1},this.kill=function(){this.i=-1,this.motionDirection="Dead",this.velX=0,this.velY=0,y=!0},this.motionDirection="Up",this.onCollision=this.kill,this.i=0,this.motionGuide={Up:[{x:14,y:55},{x:34,y:55},{x:54,y:15}],Left:[{x:14,y:15},{x:34,y:15},{x:54,y:15}],Right:[{x:14,y:35},{x:34,y:35},{x:54,y:15}],Down:[{x:14,y:75},{x:34,y:75},{x:54,y:15}],Dead:[{x:14,y:255},{x:34,y:255},{x:54,y:255},{x:74,y:255},{x:94,y:255},{x:114,y:255},{x:134,y:255},{x:154,y:255},{x:174,y:255},{x:194,y:255},{x:214,y:255},{x:-1,y:-1}]},this.moveRight=function(){this.velX=r,this.velY=0,this.motionDirection="Right"},this.moveLeft=function(){this.velX=-r,this.velY=0,this.motionDirection="Left"},this.moveUp=function(){this.velX=0,this.velY=-r,this.motionDirection="Up"},this.moveDown=function(){this.velX=0,this.velY=r,this.motionDirection="Down"},this.move=function(){p||(!(this.posX>this.lmtX-o||this.posY>this.lmtY-o||this.posX<0||this.posY<0)||0===this.velX&&0===this.velY||this.onCollision(),this.posX=this.posX+this.velX,this.posY=this.posY+this.velY)},this.render=function(t){this.move();let i=this.motionGuide[this.motionDirection],n=5*i.length;this.i=(this.i+1)%n;let e=i[Math.floor(this.i/5)];-1===e.x&&-1===e.y&&this.reset(),t.drawImage(S,e.x,e.y,13,14,this.posX,this.posY,this.dimension,this.dimension)}}function A(t,i,n,e){var o=e/5+Math.ceil(Math.random()*(e/5*4-t)),s=n/5+Math.ceil(Math.random()*(n/5*4-t)),h=Math.random()>=.5?i:0,r=Math.random()>=.5?i:h===i?0:i;this.animation=[{x:54,y:95},{x:54,y:115},{x:54,y:135},{x:54,y:155}],this.image=this.animation[Math.ceil(Math.random()*(this.animation.length-1))],b.call(this,s,o,t,h,r,n,e),this.move=function(){p||((this.posX>this.lmtX-t||this.posX<0)&&(this.velX=-this.velX),(this.posY>this.lmtY-t||this.posY<0)&&(this.velY=-this.velY),this.posX=this.posX+this.velX,this.posY=this.posY+this.velY)},this.onCollision=function(){this.velX=-this.velX,this.velY=-this.velY},this.render=function(t){this.move(),t.fillStyle=this.color,t.drawImage(S,this.image.x,this.image.y,15,15,this.posX,this.posY,this.dimension,this.dimension)}}function C(t,i){if(i instanceof b&&0===i.velX&&0===i.velY)return!1;let n=i.posX,e=i.posY;if(n>=t.posX&&n<=t.posX+t.dimension&&e>=t.posY&&e<=t.posY+t.dimension)return!0;let o=i.posX+i.dimension,s=i.posY;if(o>=t.posX&&o<=t.posX+t.dimension&&s>=t.posY&&s<=t.posY+t.dimension)return!0;let h=i.posX,r=i.posY+i.dimension;if(h>=t.posX&&h<=t.posX+t.dimension&&r>=t.posY&&r<=t.posY+t.dimension)return!0;let l=i.posX+i.dimension,c=i.posY+i.dimension;return l>=t.posX&&l<=t.posX+t.dimension&&c>=t.posY&&c<=t.posY+t.dimension}function U(t){X.innerText=t}function k(){return cntx.fillStyle="black",cntx.fillRect(0,0,s,o),d?(cntx.fillStyle="white",cntx.font="bold 80px Neue Swift",cntx.fillText("Game",s/3,o/3),cntx.fillText("Over",s/3,o/3+80),cntx.font="bold 20px Arial",void cntx.fillText("Press F5 to play again",s/3,o/3+160)):p?(cntx.fillStyle="white",cntx.font="bold 80px Neue Swift",cntx.fillText("Paused",s/4,o/2.5),cntx.font="bold 20px Arial",void cntx.fillText("Press Space Bar to resume",s/4,o/2.5+80)):(n&&n.render(cntx),e&&e.render(cntx),x.forEach(t=>{t.render(cntx),C(t,n)&&n.kill()}),void(n&&e&&C(n,e)&&(e=new I(s,o,a),U(++m),m&&m%5==0&&x.push(new A(l,c,s,o)))))}x.push(new A(l,c,s,o)),n=new b(s/2,o/2,h,0,0,s,o),e=new I(s,o,a),U(0),window.onload=function(){document.onkeydown=function(t){if((!p&&!y||"Space"===t.code)&&0==t.altKey&&0==t.ctrlKey){var i=D[t.code];"function"==typeof i&&i()}},setInterval(function(){k()},1e3/60)}}]);