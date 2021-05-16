const { ipcRenderer, contextBridge } = require('electron');
const names = require("./names/defaultNames.json");

contextBridge.exposeInMainWorld(
    'electron',
    {
        async saveLeague(file, content) {
            return await ipcRenderer.invoke("saveLeague", file, content);
        },
        async openLeague(file) {
            return await ipcRenderer.invoke("openLeague", file);
        },
        getNames() {
            return names;
        }
    }
)