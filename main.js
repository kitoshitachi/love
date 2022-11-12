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
const config = {
  sentences: ["YOOOOOOOOO", "LOOOOOOOO", "BRUH Moment", "Ai lop du pac pac"],
  timePerLetter: 50,
}

const button = document.getElementById("start-button");
button.addEventListener("click", () => {
  var audio = document.getElementById("01");
  audio.volume = 0.4;
  audio.play();

  const buttonContainer = document.getElementById("start-button-container");
  buttonContainer.style = "animation: show 0.5s ease-out 0s 1 reverse forwards;";

  buttonContainer.addEventListener("animationend", () => {
    buttonContainer.remove();
    startProgress();
  })
})

function startProgress() {
  const progress = document.getElementById("progress");
  const quote = document.getElementById("quote");
  progress.removeAttribute("hidden");
  quote.removeAttribute("hidden");

  const sentences = config.sentences;
  let index = 0;
  
  const getDuration = (sentence) => sentence.length * config.timePerLetter;
  const loadPercentages = createLoadPercentages(sentences.length); 
  
  let duration = getDuration(sentences[index]);
  
  let prevPercentage = 0;

  let start = null;
  let reset = true;

  window.requestAnimationFrame(function step(timestamp) {
    if (reset) {
      quote.innerText = sentences[index];
      reset = false;
      start = timestamp;
    }
    
    const elapsed = timestamp - start;
    const percentage = prevPercentage + loadPercentages[index] * (Math.min(elapsed / duration, 1)) 
    console.log(percentage);
    progress.style = `width: ${percentage}%`;

    if (elapsed >= duration) {
      prevPercentage += loadPercentages[index];
      reset = true;
      index++;
      
      if (index === sentences.length) 
        return;
      else 
        setTimeout(() => window.requestAnimationFrame(step), randomRange(300, 1000));
    }
    else {
      window.requestAnimationFrame(step)
    }
  });
}


function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createLoadPercentages(amount) {
  const iv = new Array(amount).fill(0).map(_ => randomRange(30, 50));
  const sum = iv.reduce((sum, current) => sum + current, 0);
  return iv.map(value => (value / sum) * 100);
}
