document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        loadApp(true);
    } else {
        loadLogin();
    }
});

/* ================= LOGIN ================= */

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

        // PO LOGINIE ZAWSZE PULPIT
        history.replaceState(null, "", "#dashboard");
        loadApp(false);
    });
}

/* ================= APP ================= */

function loadApp(allowHash) {
    fetch("views/app.html")
        .then(r => r.text())
        .then(html => {
            document.getElementById("root").innerHTML = html;

            showUser();
            bindLogout();
            bindNavigation();

            let startView = "dashboard";

            if (allowHash) {
                const hash = location.hash.replace("#", "");
                if (hash) startView = hash;
            }

            loadView(startView, false);
        });
}

/* ================= VIEW ROUTER ================= */

function loadView(view, push = true) {
    fetch(`views/${view}.html`)
        .then(r => r.text())
        .then(html => {
            document.getElementById("view").innerHTML = html;
            setActive(view);

            if (push) {
                history.pushState({ view }, "", `#${view}`);
            }
        });
}

/* ================= NAVIGATION ================= */
/* sidebar + topbar */

function bindNavigation() {
    document.querySelectorAll("[data-view]").forEach(item => {
        item.addEventListener("click", () => {
            const view = item.dataset.view;
            if (!view) return;
            loadView(view);
        });
    });
}

/* ================= HISTORY (WSTECZ / DALEJ) ================= */

window.addEventListener("popstate", e => {
    if (e.state && e.state.view) {
        loadView(e.state.view, false);
    }
});

/* ================= LOGOUT ================= */

function bindLogout() {
    const btn = document.getElementById("logoutBtn");
    if (!btn) return;

    btn.addEventListener("click", () => {
        localStorage.clear();
        location.reload();
    });
}

/* ================= USER ================= */

function showUser() {
    const user = localStorage.getItem("username");
    const info = document.getElementById("userInfo");

    if (info && user) {
        info.textContent = `Zalogowany użytkownik: ${user}`;
    }
}

/* ================= MENU STATE ================= */

function setActive(view) {
    document.querySelectorAll("[data-view]").forEach(item => {
        item.classList.toggle(
            "active",
            item.dataset.view === view
        );
    });
}
