document.addEventListener("DOMContentLoaded", () => {
    loadView("dashboard");
});

/* ROUTER */
function loadView(name) {
    fetch(`views/${name}.html`)
        .then(r => r.text())
        .then(html => {
            document.getElementById("view").innerHTML = html;
            setActive(name);
        });
}

/* SIDEBAR */
document.addEventListener("click", e => {
    const item = e.target.closest(".menu-item");
    if (!item) return;

    loadView(item.dataset.view);
});

/* ACTIVE */
function setActive(view) {
    document.querySelectorAll(".menu-item").forEach(i => {
        i.classList.toggle("active", i.dataset.view === view);
    });
}
