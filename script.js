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


// ----------------------------
// MISSION 3 — ALIVE CARD
// ----------------------------

const mission3Marker = document.querySelector(".mission3-marker");
const mission3Card   = document.getElementById("mission3Card");
const mission3Close  = document.querySelector(".holo-close-m3");

// فتح البطاقة
mission3Marker.addEventListener("click", () => {
    mission3Card.classList.remove("hidden");

    setTimeout(() => {
        mission3Card.classList.add("active");
    }, 20);
});

// إغلاق البطاقة عند الضغط على ×
mission3Close.addEventListener("click", () => {
    closeMission3();
});

// إغلاق عند الضغط خارج البطاقة
document.addEventListener("click", (e) => {

    if (!mission3Card.classList.contains("active")) return;

    // تجاهل الضغط إذا كان داخل البطاقة أو على الماركر
    if (mission3Card.contains(e.target) || e.target.closest(".mission3-marker")) return;

    closeMission3();
});

function closeMission3() {
    mission3Card.classList.remove("active");
    setTimeout(() => mission3Card.classList.add("hidden"), 250);
}




// فتح بطاقة اللوت بوكس عند الضغط على المشن الرابعة
document.querySelector('.mission4-marker').addEventListener('click', () => {
    const card = document.getElementById('lootbox-card');
    card.classList.remove('hidden');
});

// عند الضغط على OPEN
document.getElementById('lootbox-open-btn').addEventListener('click', () => {

    const img = document.getElementById('lootbox-main-img');
    const openBtn = document.getElementById('lootbox-open-btn');

    // اخفاء الرسالة
    document.getElementById('lootbox-message').style.opacity = 0;

    // اخفاء زر OPEN
    openBtn.style.opacity = 0;
    openBtn.style.pointerEvents = "none";

    // تشغيل الجيف
    img.src = "images/Legendary Loot box ow.gif";

// مدة تشغيل الجيف قبل عرض المنتج
const gifDuration = 3250; // 2.5 ثانية (تقدر تعدلها)

setTimeout(() => {

    const products = [
        "images/ROSEGOLD NEW.png",
        "images/PINK NEW.png",
        "images/Watchpoint.png",
        "images/game pass bundle .png",
        "images/ranked.png",
        "images/starter pack.png",
        "images/Perks.png"
    ];

    const randomItem = products[Math.floor(Math.random() * products.length)];

    // عرض المنتج
img.src = randomItem;

// حركة لطيفة
img.style.transform = "scale(1.1)";
setTimeout(() => img.style.transform = "scale(1)", 200);

// استخراج اسم الملف
const fileName = randomItem.split("/").pop();

// إظهار رسالة المنتج
const resultBox = document.getElementById("lootbox-result-msg");
const resultText = document.getElementById("lootbox-result-text");
const resultLink = document.getElementById("lootbox-result-link");

resultText.textContent = productMessages[fileName] || "مبروك! لقد حصلت على منتج جديد 🔥";
resultLink.href = productLinks[randomItem] || "#";

resultBox.classList.remove("hidden");

// وهج حسب اللون
const glow = glowColors[fileName] || "rgba(255,255,255,0.7)";
img.style.boxShadow = `
0 0 18px ${glow},
0 0 30px ${glow}
`;


    

}, gifDuration);

});


// زر الإغلاق (لو بتضيفه)
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("lootbox-close")) {
        document.getElementById('lootbox-card').classList.add('hidden');
    }
});



// ألوان الوهج لكل منتج
const glowColors = {
    "ROSEGOLD NEW.png": "rgba(255, 150, 200, 0.8)",   // وردي ذهبي
    "PINK NEW.png": "rgba(255, 90, 170, 0.8)",        // وردي قوي
    "Watchpoint.png": "rgba(95, 15, 245, 0.8)",      // أزرق
    "game pass bundle .png": "rgba(68, 180, 58, 0.8)", // أخضر
    "ranked.png": "rgba(170, 80, 255, 0.8)",          // بنفسجي
    "starter pack.png": "rgba(255, 150, 80, 0.8)",    // برتقالي
    "Perks.png": "rgba(77, 82, 94, 0.8)"           // أصفر
};

const productLinks = {
    "images/PINK NEW.png": "https://www.instagram.com/p/DPWcb1bCdGc/?igsh=ZGVsZmd1NTkzOTlw",
    "images/ROSEGOLD NEW.png": "https://www.instagram.com/p/DPWcwXtCZFb/?igsh=MXd1aDh0cXU0czBvNQ==",
    "images/Watchpoint.png": "https://www.instagram.com/p/DGpmDojJ9OT/?igsh=eG0ydTNtMGdzaHJw",
    "images/game pass bundle .png": "https://www.instagram.com/p/DG9iD83BZ81/?igsh=MXJwZzNhYjhnNWg2Yg==",
    "images/ranked.png": "https://www.instagram.com/p/DGpmgt4pCq4/?igsh=MXE2M3lxM2N5aTV5NA==",
    "images/starter pack.png": "https://www.instagram.com/p/DGplQyvJTt5/?igsh=YTZsOWNnYW1xeW5j",
    "images/Perks.png": "https://www.instagram.com/p/DGpkMS8p6-7/?igsh=MWxxOGs0Z2JuZzQ0cg=="
};



const productMessages = {
    "PINK NEW.png": "حظك رهييييب اليوم… طلعت لك بينك ميرسي! 🔥",
    "ROSEGOLD NEW.png": "والله وضعك اليوم خرافي… روز غولد ميرسي طالعة لك! 😭💘",
    "Watchpoint.png": "باقة قوية… تعرف على حزمة الواتش بوينت من هنا 👇",
    "game pass bundle .png": "شكلها بتكرف السيزون كامل… هذي حزمة القيم باس 😂👇",
    "ranked.png": "اختصرت الطريق على نفسك! ولتبسيط الطريق أكثر… اضغط الرابط 👇",
    "starter pack.png": "باقة بداية ممتازة تزيد مخزونك… شوف تفاصيلها هنا 👇",
    "Perks.png": "هذي perks رهيبة وتزوّد حسابك… شوفها من هنا 👇"
};



// إغلاق البطاقة عند الضغط خارجها (الإصلاح النهائي)
document.addEventListener("click", (e) => {
    const card = document.getElementById("lootbox-card");

    // لو البطاقة مخفية لا نسوي شيء
    if (card.classList.contains("hidden")) return;

    // لو الضغط على المشن 4 نفسه → لا تقفل
    if (e.target.closest(".mission4-marker")) return;

    // لو الضغط كان داخل البطاقة → تجاهل
    if (card.contains(e.target)) return;

    // لو الضغط خارج البطاقة → نقفل
    closeLootboxCard();
});


function closeLootboxCard() {
    const card = document.getElementById('lootbox-card');

    // شغل أنميشن الخروج
    card.classList.add('hide');
    card.classList.remove('show');

    setTimeout(() => {
        card.classList.add('hidden');
        card.classList.remove('hide');

        // reset داخل الكارد
        resetLootboxCard();
    }, 280); // نفس مدة الأنميشن
}

// الضغط خارج البطاقة
document.addEventListener('click', (e) => {
    const card = document.getElementById('lootbox-card');

    if (card.classList.contains('hidden')) return;
    if (e.target.closest('.mission4-marker')) return;
    if (card.contains(e.target)) return;

    closeLootboxCard();
});




document.querySelector('.mission4-marker').addEventListener('click', () => {
    const card = document.getElementById('lootbox-card');

    card.classList.remove('hidden');
    
    // مهم جداً – يسمح للأنميشن يشتغل
    setTimeout(() => {
        card.classList.add('show');
    }, 10);
});


function resetLootboxCard(){
    const img = document.getElementById('lootbox-main-img');
    const openBtn = document.getElementById('lootbox-open-btn');
    const msg = document.getElementById('lootbox-message');
    const result = document.getElementById('lootbox-result-msg');

    img.src = "images/Legendary_Loot_Box.png";
    img.style.boxShadow = "none";

    openBtn.style.opacity = 1;
    openBtn.style.pointerEvents = "auto";

    msg.style.opacity = 1;

    result.classList.add("hidden");
}


