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






// ----------------------------
// KING'S ROW CARD — CLEAN FIX
// ----------------------------

const kingsMarker = document.querySelector(".map-marker");
const kingsCard   = document.querySelector(".holo-card");
const kingsClose  = document.querySelector(".holo-close");

// فتح البطاقة - smooth open
kingsMarker.addEventListener("click", () => {
    kingsCard.classList.remove("hidden");

    setTimeout(() => {
        kingsCard.classList.add("active");
    }, 20);
});

// زر الإغلاق (X)
kingsClose.addEventListener("click", () => {
    closeKings();
});

// إغلاق عند الضغط خارج البطاقة
document.addEventListener("click", (e) => {
    // اذا البطاقة مو مفتوحة خلها ساكته
    if (!kingsCard.classList.contains("active")) return;

    // اذا ضغط داخل البطاقة أو على الماركر لا تقفل
    if (kingsCard.contains(e.target) || e.target.closest(".map-marker")) return;

    // غير كذا... قفل البطاقة
    closeKings();
});

// دالة الإغلاق
function closeKings() {
    kingsCard.classList.remove("active");
    setTimeout(() => kingsCard.classList.add("hidden"), 200);
}







// ----------------------------
// OMNIC ALERT CARD — CLEAN FIX
// ----------------------------

const omnicMarker = document.querySelector(".omnic-alert");
const omnicCard = document.getElementById("omnicCard");
const omnicClose = document.querySelector(".holo-close-omnic");

// فتح بطاقة OMNIC - smooth open
omnicMarker.addEventListener("click", () => {
    omnicCard.classList.remove("hidden");

    setTimeout(() => {
        omnicCard.classList.add("active");
    }, 20);
});

// زر الإغلاق (X)
omnicClose.addEventListener("click", () => {
    closeOmnic();
});

// إغلاق عند الضغط خارج البطاقة
document.addEventListener("click", (e) => {
    // اذا البطاقة مو مفتوحة خلنا ساكتين
    if (!omnicCard.classList.contains("active")) return;

    // اذا ضغط داخل البطاقة أو على الماركر لا تسوي شيء
    if (omnicCard.contains(e.target) || e.target.closest(".omnic-alert")) return;

    // غير كذا... قفل البطاقة
    closeOmnic();
});


// دالة الإغلاق
function closeOmnic() {
    omnicCard.classList.remove("active");
    setTimeout(() => omnicCard.classList.add("hidden"), 200);
}
