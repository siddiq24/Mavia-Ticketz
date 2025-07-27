// Cek status login saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const signin = document.querySelectorAll('.signin');
    const signup = document.querySelectorAll('.signup');
    const logout = document.getElementById('logoutBtn1');
    const logout2 = document.getElementById('logoutBtn2');
    const userProfile = document.querySelector('.user-profile');
    const logo = document.querySelector('.logo')

    if (loggedInUser !== null) {
        signin.forEach(e => e.classList.add("hidden"));
        signup.forEach(e => e.classList.add("hidden"));
        logout.classList.remove("hidden");
        logout2.classList.remove("hidden");
        userProfile.classList.remove("hidden");
        logo.style.marginRight = 0
        logout.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Berhasil logout');
            localStorage.removeItem('loggedInUser');
            window.location.href = "/src/pages/home-page.html";
        });
        logout2.addEventListener('click', function (e) {
            e.preventDefault();
            alert('Berhasil logout');
            localStorage.removeItem('loggedInUser');
            window.location.href = "/src/pages/home-page.html";
        });
    } else {
        signin.forEach(e => e.classList.remove("hidden"));
        signup.forEach(e => e.classList.remove("hidden"));
        logout.classList.add("hidden");
        userProfile.classList.add("hidden");
        logo.style.marginRight = "auto"
    }
});

function toggleMenu() {
    const nav = document.querySelector('.navigation');
    nav.classList.toggle('active');
    document.querySelector('.mobile-menu-button').classList.toggle('active');
}

const avatar = document.querySelector('#userAvatar');
avatar.addEventListener('click', () => {
    document.querySelector('.dropdown').classList.toggle('hidden')
})