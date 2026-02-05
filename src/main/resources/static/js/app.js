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

            if (view === "transport") {
                initTransportMap();
            }
        });
}

/* ================= TRANSPORT MAP ================= */

let leafletLoaded = false;
let transportMap = null;

function initTransportMap() {
    if (!leafletLoaded) {
        leafletLoaded = true;

        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(css);

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

        script.onload = () => {
            createTransportMap();
        };

        document.body.appendChild(script);
    } else {
        createTransportMap();
    }
}

function createTransportMap() {
    const container = document.getElementById("transport-map");
    if (!container) return;

    // jeżeli mapa istniała wcześniej — usuń ją poprawnie
    if (transportMap) {
        transportMap.remove();
        transportMap = null;
    }

    transportMap = L.map(container).setView(
        [52.2297, 21.0122], // Polska
        6
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap"
    }).addTo(transportMap);

    // SPA + layout + Chrome subpixel rounding fix
    setTimeout(() => {
        const mapEl = document.getElementById("transport-map");
        if (!mapEl) return;

        const rect = mapEl.getBoundingClientRect();

        mapEl.style.width  = Math.floor(rect.width)  + "px";
        mapEl.style.height = Math.floor(rect.height) + "px";

        transportMap.invalidateSize();
    }, 200);
}

/* ================= NAVIGATION ================= */

function bindNavigation() {
    document.querySelectorAll("[data-view]").forEach(item => {
        item.addEventListener("click", () => {
            const view = item.dataset.view;
            if (!view) return;
            loadView(view);
        });
    });
}

/* ================= HISTORY ================= */

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

/* ================= MAP RESIZE FIX ================= */

window.addEventListener("resize", () => {
    if (!transportMap) return;

    clearTimeout(window.__mapResizeTimer);

    window.__mapResizeTimer = setTimeout(() => {
        transportMap.invalidateSize();
    }, 150);
});
