// -------------------------------
// GIFs
// -------------------------------
const gifs = [
    "images/tracer.gif",
    "images/lucio.gif",
    "images/zarya.gif",
    "images/genji.gif"
];

const gifColors = {
    "images/tracer.gif": "#ff9a00",
    "images/lucio.gif": "#00ff00",
    "images/zarya.gif": "#ff4fd8",
    "images/genji.gif": "#00ff9d"
};


// -------------------------------
// عناصر HTML
// -------------------------------
const wrapper = document.querySelector(".btn-wrapper");
const btn = wrapper.querySelector(".ow-button");

let gifImg = null;
let tracerEffect = null;

let hoverActive = false;
let loopTimeout = null;

let lightningPlayed = false;


// -------------------------------
// اختيار GIF عشوائي
// -------------------------------
function randomGif() {
    return gifs[Math.floor(Math.random() * gifs.length)];
}


// -------------------------------
// تشغيل اللوب
// -------------------------------
function playGifLoop() {
    if (!hoverActive) return;

    const selectedGif = randomGif();

    // الصورة داخل الزر
    gifImg.style.backgroundImage = `url(${selectedGif})`;

    // لون الإطار حسب الشخصية
    btn.style.boxShadow = `0 0 15px ${gifColors[selectedGif]}`;
    btn.style.border = `2px solid ${gifColors[selectedGif]}`;


    // ---------------------------------
    // ⚡ تأثير ترسير — لمرة واحدة
    // ---------------------------------
    if (selectedGif.includes("tracer") && !lightningPlayed) {

        lightningPlayed = true;

        tracerEffect = document.createElement("img");
        tracerEffect.classList.add("tracer-effect");
        tracerEffect.src = "images/lightning.apng";
        wrapper.appendChild(tracerEffect);

        // حذف الوميض بعد انتهاءه
        setTimeout(() => {
            if (tracerEffect) {
                tracerEffect.style.opacity = "0";

                setTimeout(() => {
                    tracerEffect.remove();
                    tracerEffect = null;
                }, 450);

            }
        }, 900);
    }

    loopTimeout = setTimeout(playGifLoop, 5000);
}



// -------------------------------
// EVENTS
// -------------------------------
btn.addEventListener("mouseenter", () => {
    hoverActive = true;

    lightningPlayed = false;

    if (!gifImg) {
        gifImg = document.createElement("div");
        gifImg.classList.add("gif-overlay");
        btn.appendChild(gifImg);
    }

    playGifLoop();
});


btn.addEventListener("mouseleave", () => {
    hoverActive = false;

    lightningPlayed = false;

    clearTimeout(loopTimeout);

    if (gifImg) gifImg.style.backgroundImage = "";

    btn.style.boxShadow = "";
    btn.style.border = "";
});





// ------------------------------------------
// HOLOGRAM CARD LOGIC (FINAL TOGGLE SYSTEM)
// ------------------------------------------

const holoCard = document.querySelector(".holo-card");
const marker = document.querySelector(".map-marker");
const closeBtn = document.querySelector(".holo-close");



// الضغط على الماركر يفتح البطاقة (للجوال)
marker.addEventListener("click", () => {
    holoCard.classList.remove("hidden");
    holoCard.classList.add("active");
});

// زر الإغلاق
closeBtn.addEventListener("click", () => {
    holoCard.classList.remove("active");
    holoCard.classList.add("hidden");
});

// الضغط خارج البطاقة
document.addEventListener("click", (e) => {
    if (!holoCard.contains(e.target) && !marker.contains(e.target)) {
        holoCard.classList.remove("active");
        holoCard.classList.add("hidden");
    }
});
