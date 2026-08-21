const icons = ["🥨","🧀","🥩","🍔","🥓","🌯"];
let deck = shuffle(icons.concat(icons))
  .map((icon, id) => ({ id, icon, matched:false }));
let flipped = [];
let lock = false;

function shuffle(arr){
  const a = arr.slice();
  for(let i = a.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function flipCard(id){
  if(lock) return;
  const card = deck.find(c => c.id === id);
  if(card.matched || flipped.includes(id)) return;

  flipped.push(id);
  render();

  if(flipped.length === 2){
    lock = true;
    const [a, b] = flipped.map(fid => deck.find(c => c.id === fid));
    setTimeout(() => {
      if(a.icon === b.icon){ a.matched = true; b.matched = true; }
      flipped = [];
      lock = false;
      render();
      if(deck.every(c => c.matched)){
        document.getElementById("status").textContent = "¡Completaste el tablero!";
      }
    }, 700);
  }
}

function render(){
  const el = document.getElementById("board");
  el.innerHTML = "";
  deck.forEach(card => {
    const btn = document.createElement("button");
    const shown = card.matched || flipped.includes(card.id);
    btn.className = "card" + (card.matched ? " matched" : (shown ? " flipped" : ""));
    btn.textContent = shown ? card.icon : "❓";
    btn.onclick = () => flipCard(card.id);
    el.appendChild(btn);
  });
}
render();