const btn = document.getElementById("btn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

const colors = ["#ff3c3c", "#ffd93c", "#3cff8f", "#3cc7ff", "#d93cff"];
let particles = [];

btn.onclick = () => {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  const color = colors[Math.floor(Math.random() * colors.length)];
  balloon.style.background = color;
  balloon.style.left = Math.random() * (innerWidth - 50) + "px";

  document.body.appendChild(balloon);

  balloon.animate(
    [{ transform: "translateY(0)" }, { transform: "translateY(-120vh)" }],
    { duration: 3500, easing: "linear", fill: "forwards" }
  );

  setTimeout(() => {
    const rect = balloon.getBoundingClientRect();
    explode(rect.left + 25, rect.top + 35, color);
    afterExplosion();
    balloon.style.display = "none";
  }, 3300);
};

function explode(x, y, color) {
  for (let i = 0; i < 80; i++) {
    particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 1.2) * 8,
      life: 100,
      color
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.vy += 0.15; // گرانش
    p.x += p.vx;
    p.y += p.vy;
    p.life--;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  particles = particles.filter(p => p.life > 0);
  requestAnimationFrame(animate);
}

animate();


let musicPlayed = false;


const music = document.getElementById("music");
const message = document.getElementById("message");

function afterExplosion() {
  // فقط یک بار موزیک پخش شود
  if (!musicPlayed) {
    music.currentTime = 0;
    music.play();
    musicPlayed = true;
  }

  // نمایش متن
  message.classList.add("show");

  // گفتن جمله
  const speech = new SpeechSynthesisUtterance("بیا اشتی کنیم");
  speech.lang = "fa-IR";
  speech.rate = 0.9;
  speechSynthesis.speak(speech);
}

