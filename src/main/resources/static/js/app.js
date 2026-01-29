document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        loadView("empty");
    } else {
        loadView("login");
    }
});

function loadView(name) {
    fetch(`views/${name}.html`)
        .then(response => response.text())
        .then(html => {
            document.getElementById("app").innerHTML = html;

            if (name === "login") {
                bindLogin();
            }

            if (name === "empty") {
                bindLogout();
                showLoggedUser();
            }
        })
        .catch(err => {
            console.error("Błąd ładowania widoku:", err);
        });
}

function bindLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = form.querySelector('input[type="text"]').value;

        // symulacja udanego logowania
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);

        loadView("empty");
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
