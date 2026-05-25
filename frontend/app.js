// Point this exactly to your working live AWS EC2 container port
const API_BASE = "http://16.171.36.172:5000";
let authToken = localStorage.getItem("token") || "";

// Toggle views on initial load if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
    if (authToken) showUploadSection();
});

async function handleAuth(type) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msgEl = document.getElementById("auth-message");

    if (!email || !password) {
        msgEl.innerText = "Please fill in all fields.";
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/auth/${type}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Authentication failed");

        if (type === "login") {
            authToken = data.token;
            localStorage.setItem("token", authToken);
            msgEl.style.color = "#10b981";
            msgEl.innerText = "Login successful! Loading dashboard...";
            setTimeout(showUploadSection, 1000);
        } else {
            msgEl.style.color = "#10b981";
            msgEl.innerText = "Account created successfully! You can log in now.";
        }
    } catch (err) {
        msgEl.style.color = "#ef4444";
        msgEl.innerText = err.message;
    }
}

function showUploadSection() {
    document.getElementById("auth-section").classList.add("hidden");
    document.getElementById("upload-section").classList.remove("hidden");
    loadFiles();
}

// Handle File Upload Form Submission
document.getElementById("upload-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("file-input");
    const msgEl = document.getElementById("upload-message");
    
    if (!fileInput.files[0]) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        const response = await fetch(`${API_BASE}/api/files/upload`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${authToken}` },
            body: formData
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Upload failed");

        msgEl.style.color = "#10b981";
        msgEl.innerText = "File uploaded successfully!";
        fileInput.value = ""; // Clear file selector
        loadFiles(); // Refresh files list
    } catch (err) {
        msgEl.style.color = "#ef4444";
        msgEl.innerText = err.message;
    }
});

async function loadFiles() {
    const listEl = document.getElementById("files-list");
    try {
        const response = await fetch(`${API_BASE}/api/files`, {
            headers: { "Authorization": `Bearer ${authToken}` }
        });
        const files = await response.json();
        
        listEl.innerHTML = files.map(file => `
            <li>
                <a href="${API_BASE}/uploads/${file.filename}" target="_blank">${file.originalname}</a>
            </li>
        `).join("");
    } catch (err) {
        listEl.innerHTML = `<li style="color: #ef4444">Failed to load files asset listing</li>`;
    }
}