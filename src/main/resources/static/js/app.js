document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        loadApp();
    } else {
        loadLogin();
    }
});

/* LOGIN */

function loadLogin() {
    fetch("views/login.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("root").innerHTML = html;
            bindLogin();
        });
}

function bindLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", e => {
        e.preventDefault();
        const login = form.querySelector("input").value;

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", login);

        loadApp();
    });
}

/* APP */

function loadApp() {
    fetch("views/app.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("root").innerHTML = html;
            showUser();
            bindLogout();
            bindSidebar();
            loadView("dashboard");
        });
}

function loadView(view) {
    fetch(`views/${view}.html`)
        .then(r => r.text())
        .then(html => {
            document.getElementById("view").innerHTML = html;
            setActive(view);
        });
}

/* SIDEBAR */

function bindSidebar() {
    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("click", () => {
            loadView(item.dataset.view);
        });
    });
}

/* LOGOUT */

function bindLogout() {
    const btn = document.getElementById("logoutBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        localStorage.clear();
        loadLogin();
    });
}

/* USER */

function showUser() {
    const user = localStorage.getItem("username");
    const info = document.getElementById("userInfo");
    if (info) info.textContent = `Zalogowany użytkownik: ${user}`;
}

/* MENU */

function setActive(view) {
    document.querySelectorAll(".menu-item").forEach(i =>
        i.classList.toggle("active", i.dataset.view === view)
    );
}
