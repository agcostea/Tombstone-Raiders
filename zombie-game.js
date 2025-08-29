
import { zombieTypes, getRandomZombie } from './zombie-data.js';
import { updateInfo, updateSlots } from './zombie-ui.js';

let slots = [null,null,null,null];
let coins = 0;
let round = 1;
const maxRounds = 8;
let currentZombie = null;

const zombieImg = document.getElementById('zombie');
const alertBox = document.getElementById('alert-box');
const alertText = document.getElementById('alert-text');
const alertOk = document.getElementById('alert-ok');

function showAlert(text, callback){
  alertText.innerHTML = text;
  alertBox.classList.add('show');
  alertOk.onclick = ()=>{
    alertBox.classList.remove('show');
    if(callback) callback();
  };
}

function newZombie(){
  currentZombie = getRandomZombie();
  zombieImg.src = currentZombie.img;
  zombieImg.style.transform = 'translateX(0px)';
  updateInfo(round, maxRounds, coins, slots);
}

function keepZombie(){
  let emptyIndex = slots.indexOf(null);
  if(emptyIndex!=-1){
    slots[emptyIndex]=currentZombie;
    updateSlots(slots);
    showAlert(`You caught a ${currentZombie.name}! `, ()=> nextTurn());
  } else {
    showAlert("All slots are full! Discard one first.", ()=>{ zombieImg.style.transform='translateX(0px)'; });
  }
}

function nextTurn(){
  round++;
  if(round>maxRounds){
    endGame();
  } else {
    newZombie();
  }
}

function endGame(){
  const totalValue = slots.reduce((a,b)=>a+(b?.value||0),0);
  coins += totalValue;
  const rent = 100;
  coins -= rent;
  let details = slots.map(z=>z?`${z.name} = ${z.value} coins`:'').filter(Boolean).join("<br>");
  showAlert(`8 rounds survived!<br>Your zombies:<br>${details}<br>Total: ${totalValue}<br>Graveyard rent: ${rent}<br>Coins left: ${coins}`, ()=>{
    slots=[null,null,null,null];
    round=1;
    updateSlots(slots);
    newZombie();
  });
}


let startX=0, currentX=0, isDragging=false;
function getX(e) {
  if(e.touches) return e.touches[0].clientX;
  return e.clientX;
}
zombieImg.addEventListener('pointerdown', (e)=>{
  startX = getX(e);
  isDragging = true;
  zombieImg.setPointerCapture && zombieImg.setPointerCapture(e.pointerId);
});
zombieImg.addEventListener('pointermove', (e)=>{
  if(!isDragging) return;
  currentX = getX(e) - startX;
  zombieImg.style.transform = `translateX(${currentX}px) rotate(${currentX/10}deg)`;
});
zombieImg.addEventListener('pointerup', ()=>{
  isDragging=false;
  if(currentX>40) keepZombie();
  else if(currentX<-40) nextTurn();
  else zombieImg.style.transform='translateX(0px)';
  currentX=0;
});
zombieImg.addEventListener('touchstart', (e)=>{
  startX = getX(e);
  isDragging = true;
});
zombieImg.addEventListener('touchmove', (e)=>{
  if(!isDragging) return;
  currentX = getX(e) - startX;
  zombieImg.style.transform = `translateX(${currentX}px) rotate(${currentX/10}deg)`;
});
zombieImg.addEventListener('touchend', ()=>{
  isDragging=false;
  if(currentX>40) keepZombie();
  else if(currentX<-40) nextTurn();
  else zombieImg.style.transform='translateX(0px)';
  currentX=0;
});
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('img').forEach(img=>{
    img.setAttribute('draggable','false');
    img.oncontextmenu = ()=>false;
  });
  updateSlots(slots);
  newZombie();
});
