document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        loadView("dashboard");
    } else {
        loadView("login");
    }
});

/* ================= ROUTER ================= */

function loadView(name) {
    fetch(`views/${name}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("app").innerHTML = html;

            if (name === "login") {
                bindLogin();
            } else {
                bindLogout();
                showLoggedUser();
                markActiveMenu(name);
            }
        })
        .catch(err => {
            console.error("Błąd ładowania widoku:", err);
        });
}

/* ================= SIDEBAR (DELEGACJA) ================= */

document.addEventListener("click", (e) => {
    const item = e.target.closest(".menu-item");
    if (!item) return;

    const view = item.getAttribute("data-view");
    if (!view) return;

    loadView(view);
});

/* ================= MENU STATE ================= */

function markActiveMenu(view) {
    const items = document.querySelectorAll(".menu-item");
    items.forEach(i => i.classList.remove("active"));

    const active = document.querySelector(`.menu-item[data-view="${view}"]`);
    if (active) {
        active.classList.add("active");
    }
}

/* ================= AUTH ================= */

function bindLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = form.querySelector('input[type="text"]').value;

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);

        loadView("dashboard");
    });
}

function bindLogout() {
    const btn = document.getElementById("logoutBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        loadView("login");
    });
}

function showLoggedUser() {
    const username = localStorage.getItem("username");
    const info = document.getElementById("userInfo");

    if (info && username) {
        info.textContent = `Zalogowany użytkownik: ${username}`;
    }
}
