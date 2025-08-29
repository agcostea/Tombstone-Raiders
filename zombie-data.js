
export const zombieTypes = [
  {name: "Common Zombie", value: 5, img: "ZombieImages/babyzombie.png", weight: 50},
  {name: "Rare Zombie", value: 10, img: "ZombieImages/tall zombie.png", weight: 30},
  {name: "Epic Zombie", value: 20, img: "ZombieImages/zombie2.png", weight: 10},
  {name: "Exotic Zombie", value: 40, img: "ZombieImages/fat zombie.png", weight: 7},
];

export function getRandomZombie() {
  const total = zombieTypes.reduce((a,b)=>a+b.weight,0);
  let r = Math.random()*total;
  for(const z of zombieTypes){
    if(r < z.weight) return z;
    r -= z.weight;
  }
}
