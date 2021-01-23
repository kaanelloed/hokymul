const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require("fs").promises

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "icons/favicon32x32.png",
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

ipcMain.handle("saveLeague", async (event, fileName, fileContent) => {
  const result = await fs.writeFile(fileName, fileContent);
  return result;
})

ipcMain.handle("openLeague", async (event, fileName) => {
  const result = await fs.readFile(fileName, 'utf8');
  return result;
})