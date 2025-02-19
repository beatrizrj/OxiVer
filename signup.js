const { ipcRenderer } = require("electron");

document.getElementById("signup-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const user = document.getElementById("user").value.trim();
    const email = document.getElementById("email").value.trim();
    const cedula = document.getElementById("cedula").value.trim();
    const cc = document.getElementById("cc").value.trim();

    if (!name || !user || !email || !cedula || !cc) {
        alert("Preencha todos os campos!");
        return;
    }

    const submitButton = document.getElementById("register-btn");
    submitButton.disabled = true;

    try {
        const response = await fetch("http://localhost:3000/patients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, sns: cedula })
        });

        if (!response.ok) throw new Error("Erro ao registrar paciente.");

        alert("Paciente registrado com sucesso!");
        ipcRenderer.send("signup-success"); 

    } catch (error) {
        console.error("Erro:", error);
        alert("Erro ao registrar paciente.");
    } finally {
        submitButton.disabled = false;
    }
});