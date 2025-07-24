const regForm = document.querySelector("form");
const email = document.querySelector("#email");
const pass = document.querySelector("#password");
const msgE = document.querySelector(".alert.email");
const msgP = document.querySelector(".alert.pass");

// Regex untuk email dan password
const regEm = /^[a-zA-Z0-9._-]+@(gmail|yahoo)\.com$/;
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*></]).+$/;

// Cek jika user sudah login
const loggedInUser = localStorage.getItem("loggedInUser");
if (loggedInUser) {
    window.location.href = "/src/pages/home-page.html";
}

regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Ambil data user dari localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Validasi input
    msgE.textContent = (email.value.length === 0) ? "⚠️email tidak boleh kosong" :
        (!regEm.test(email.value)) ? "⚠️email tidak valid" : "";
    msgP.textContent = (pass.value.length === 0) ? "⚠️password tidak boleh kosong" :
        (pass.value.length < 8) ? "⚠️password harus lebih dari 8 karakter" :
            (!regPw.test(pass.value)) ? "⚠️password harus mengandung huruf kecil, huruf kapital, dan simbol" : "";

    if (msgE.textContent === "" && msgP.textContent === "") {
        const user = users.find(user => user.email === email.value && user.password === pass.value);

        if (user) {
            // Simpan data user yang login
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "/src/pages/home-page.html";
        } else {
            alert("Email atau password salah");
        }
    }
});

const eye = document.querySelector(".password-input>.eye-icon")
eye.addEventListener("click", () => {
    const pasw = document.querySelector("#password")
    pasw.type = (pasw.type == "password") ? "text" : "password"
})