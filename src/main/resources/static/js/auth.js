document.addEventListener("DOMContentLoaded", () => {

    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");

    if (!loginBtn) {
        return; // zabezpieczenie: nie jesteśmy na stronie logowania
    }

    loginBtn.addEventListener("click", () => {
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        if (login === "" || password === "") {
            alert("Uzupełnij login i hasło.");
            return;
        }

        // MOCK logowania (na razie)
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", login);
        localStorage.setItem("role", "ADMIN");

        // Przejście do panelu
        window.location.href = "views/empty.html";
    });

});
