
export function updateInfo(round, maxRounds, coins, slots) {
  const infoDiv = document.getElementById('info');
  infoDiv.innerHTML = `Round: ${round}/${maxRounds} <br> Coins: ${coins} <br> Zombies: ${slots.filter(s=>s).length}/4`;
}

export function updateSlots(slots) {
  const slotDivs = document.querySelectorAll('.slot');
  for(let i=0; i<slots.length; i++){
    const div = slotDivs[i];
    div.innerHTML = " Zombie Slot";
    if(slots[i]){
      div.innerHTML = `<img src="${slots[i].img}" alt="${slots[i].name}" draggable="false" oncontextmenu="return false;"><div class="rarity-label">${slots[i].name}</div>`;
    }
  }
}
