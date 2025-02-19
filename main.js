/* const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
    console.log("Criando janela...");

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadFile("signup.html");

    mainWindow.on("closed", () => {
        console.log("Janela fechada");
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (!mainWindow) {
            createWindow();
        }
    });
});

// Ouve o evento para trocar de página após registo
ipcMain.on("signup-success", () => {
    if (mainWindow) {
        console.log("Troca para pacientes.html");
        mainWindow.loadFile("patients.html"); // Troca a página sem criar nova janela
    }
});

app.on("window-all-closed", () => {
    console.log("Todas as janelas foram fechadas.");
    if (process.platform !== "darwin") {
        app.quit();
    }
});



const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    // Load patients.html directly for testing
    mainWindow.loadFile("patientlist.html"); // Load the patient list page

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    // Re-create the window if the app is re-activated on macOS
    app.on("activate", () => {
        if (!mainWindow) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
*/

const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile("patientlist.html"); // Agora abre diretamente a página da lista de pacientes

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});