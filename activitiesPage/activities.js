document.querySelectorAll(".start-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        alert("Start Quiz " + (index + 1));
        // هنا بنحط رابط اللعبة الحقيقية من Google AI
    });
});




