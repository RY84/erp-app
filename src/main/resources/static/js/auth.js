document.addEventListener("DOMContentLoaded", () => {

    const loginInput = document.getElementById("login");
    const passwordInput = document.getElementById("password");
    const loginBtn = document.getElementById("loginBtn");

    // jeżeli nie jesteśmy na ekranie logowania – nic nie rób
    if (!loginBtn || !loginInput || !passwordInput) {
        return;
    }

    loginBtn.addEventListener("click", () => {
        const login = loginInput.value.trim();
        const password = passwordInput.value.trim();

        if (login === "" || password === "") {
            alert("Uzupełnij login i hasło.");
            return;
        }

        // MOCK logowania
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", login);
        localStorage.setItem("role", "ADMIN");

        // ZOSTAJEMY NA index.html
        // app.js sam załaduje właściwy widok (empty)
        window.location.reload();
    });

});
