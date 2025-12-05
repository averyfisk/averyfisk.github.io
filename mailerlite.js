// ===============================
// Avery Fisk – MailerLite Integration
// Single Opt-In | Group ID Required
// ===============================

const API_KEY = "e*********I";  // your key
const GROUP_ID = "172943688547173758"; // your MailerLite group ID

async function subscribeUser(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email-input");
    const email = emailInput.value.trim();
    const statusBox = document.getElementById("status-message");

    if (!email) {
        statusBox.textContent = "Please enter a valid email.";
        statusBox.style.color = "#ff5a5a";
        return;
    }

    statusBox.textContent = "Adding you...";
    statusBox.style.color = "#999";

    try {
        const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                email: email,
                groups: [GROUP_ID]
            })
        });

        const result = await response.json();

        if (!response.ok) {
            statusBox.textContent = result.message || "There was an issue. Try again.";
            statusBox.style.color = "#ff5a5a";
            return;
        }

        statusBox.textContent = "You're in. Check your inbox.";
        statusBox.style.color = "#4CAF50";
        emailInput.value = "";

    } catch (error) {
        statusBox.textContent = "Network error. Try again.";
        statusBox.style.color = "#ff5a5a";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("email-form");
    if (form) {
        form.addEventListener("submit", subscribeUser);
    }
});