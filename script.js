document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("gregorianDate");
    const convertBtn = document.getElementById("convertBtn");
    const hijriResult = document.getElementById("hijriResult");

    const islamicMonths = [
        "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' al-Thani",
        "Jumada al-Awwal", "Jumada al-Thani", "Rajab", "Sha'ban",
        "Ramadan", "Shawwal", "Dhu al-Qi'dah", "Dhu al-Hijjah"
    ];

    // Accurate Ku-top/Tabish Hijri Calculation
    function g2h(d, m, y) {
        if (m < 3) {
            y -= 1;
            m += 12;
        }
        let a = Math.floor(y / 100);
        let b = 2 - a + Math.floor(a / 4);
        let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524.5;
        
        let z = Math.floor(jd + 0.5);
        let f = (jd + 0.5) - z;
        let l = z - 1948440 + 10632;
        let n = Math.floor((l - 1) / 10631);
        l = l - 10631 * n + 354;
        let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
        l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
        
        let month = Math.floor((24 * l) / 709);
        let day = l - Math.floor((709 * month) / 24);
        let year = 30 * n + j - 30;

        return `${day} ${islamicMonths[month - 1]}, ${year} AH`;
    }

    // Set Default Today
    const today = new Date();
    dateInput.valueAsDate = today;
    hijriResult.innerText = g2h(today.getDate(), today.getMonth() + 1, today.getFullYear());

    convertBtn.addEventListener("click", () => {
        const val = dateInput.value;
        if (!val) {
            hijriResult.innerText = "Please select a date.";
            return;
        }
        const [y, m, d] = val.split("-").map(Number);
        hijriResult.innerText = g2h(d, m, y);
    });
});