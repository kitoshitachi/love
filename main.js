"use strict";


document.addEventListener("mousemove",function(e){
    var body = document.querySelector("body");
    var heart = document.createElement("span");
    var x = e.offsetX;
    var y = e.offsetY;
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    

    body.appendChild(heart);

})