const API_URL = "http://localhost:3000"; // Change to your deployed server URL when hosting.

// Register function
async function register() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
    const regMsg = document.getElementById("reg-msg");

    if (!username || !password) {
        regMsg.textContent = "Please fill out all fields.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            regMsg.textContent = data.message;
        } else {
            regMsg.textContent = data.message;
        }
    } catch (error) {
        regMsg.textContent = "An error occurred. Please try again.";
    }
}

// Login function
async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const loginMsg = document.getElementById("login-msg");

    if (!username || !password) {
        loginMsg.textContent = "Please fill out all fields.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
            loginMsg.textContent = data.message;
            setTimeout(() => {
                window.location.href = "https://www.mcdonalds.com/de/de-de.html";
            }, 1000); // Redirect after 1 second
        } else {
            loginMsg.textContent = data.message;
        }
    } catch (error) {
        loginMsg.textContent = "An error occurred. Please try again.";
    }
}