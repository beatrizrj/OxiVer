const { contextBridge, ipcRenderer } = require("electron");

// Expor ipcRenderer de forma segura
contextBridge.exposeInMainWorld("electron", {
    ipcRenderer: ipcRenderer
});
