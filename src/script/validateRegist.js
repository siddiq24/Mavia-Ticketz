const regForm = document.querySelector("form");
const email = document.querySelector("#email");
const pass = document.querySelector("#password");
const msgE = document.querySelector(".alert.email");
const msgP = document.querySelector(".alert.pass");

// Regex buat email dan pssword
const regEm = /^[a-zA-Z0-9._-]+@(gmail|yahoo)\.com$/;
const regPw = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*></]).+$/;

// Ambil data user dari localStorage, jika belum ada buat array kosong
let users = JSON.parse(localStorage.getItem("users")) || [];

regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validasi input
    msgE.textContent = (email.value.length === 0) ? "⚠️email tidak boleh kosong" :
        (!regEm.test(email.value)) ? "⚠️email tidak valid" : "";
    msgP.textContent = (pass.value.length === 0) ? "⚠️password tidak boleh kosong" :
        (pass.value.length < 8) ? "⚠️password harus lebih dari 8 karakter" :
            (!regPw.test(pass.value)) ? "⚠️password harus mengandung huruf kecil, huruf kapital, dan simbol" : "";


    // isValid
    console.log(email.value)
    console.log(pass.value)

    if (msgE.textContent === "" && msgP.textContent === "") {
        const emailExist = users.some(user => user.email === email.value);

        if (emailExist) {
            alert("🚫 Email sudah terdaftar. Gunakan email lain.");
        } else {
            const newUser = {
                email: email.value,
                password: pass.value
            };
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            alert("✅ Registrasi berhasil!");
            email.value = "";
            pass.value = "";
            document.location.href = "/src/pages/home-page.html"
        }
    }
});

const eye = document.querySelector(".password-input>.eye-icon")
eye.addEventListener("click", () => {
    const pasw = document.querySelector("#password")
    pasw.type = (pasw.type == "password") ? "text" : "password"
})

