import * as path from "path";
import * as os from "os";
import {
  app,
  BrowserWindow,
  session,
  globalShortcut,
  ipcMain,
  clipboard,
  Notification,
} from "electron";
import singleInstance from "./singleInstance";
import dynamicRenderer from "./dynamicRenderer";
import titleBarActionsModule from "./modules/titleBarActions";
import updaterModule from "./modules/updater";
import macMenuModule from "./modules/macMenu";
import { Gemini } from "./clients/gemini";
import { Chatgpt } from "./clients/openai";

// Initilize
// =========
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = "true";
const isProduction = process.env.NODE_ENV !== "development";
const platform: "darwin" | "win32" | "linux" = process.platform as any;
const architucture: "64" | "32" = os.arch() === "x64" ? "64" : "32";
const headerSize = 32;
const modules = [titleBarActionsModule, macMenuModule, updaterModule];

// Initialize app window
// =====================
function createWindow() {
  console.log("System info", { isProduction, platform, architucture });
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1440,
    height: 1024,
    minWidth: 1024,
    minHeight: 676,
    backgroundColor: "#000",
    webPreferences: {
      devTools: !isProduction,
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },

    titleBarStyle: "default",
    // frame: platform === 'darwin',
    frame: true, // <= Remove this line if you wanted to implement your own title bar
    titleBarOverlay: platform === "darwin" && { height: headerSize },
    title: "Bernard",
  });

  // Lock app to single instance
  if (singleInstance(app, mainWindow)) return;

  // Open the DevTools.
  !isProduction &&
    mainWindow.webContents.openDevTools({
      mode: "bottom",
    });

  return mainWindow;
}

// App events
// ==========
app.whenReady().then(async () => {
  if (!isProduction) {
    try {
      await session.defaultSession.loadExtension(
        path.join(__dirname, "../..", "__extensions", "vue-devtools")
      );
    } catch (err) {
      console.log("[Electron::loadExtensions] An error occurred: ", err);
    }
  }

  // globalShortcut.register('Shift+CommandOrControl+A', async () => {
  //   console.log(await Gemini.chat('list me major cities in Japan'))
  // })

  const mainWindow = createWindow();
  if (!mainWindow) return;
  ipcMain.on("send-data", (_, data) => {
    globalShortcut.unregisterAll();
    Array.from(data).forEach((keybinding: any) => {
      if (keybinding.enabled) {
        globalShortcut.register(
          `Shift+CommandOrControl+${keybinding.key}`,
          async () => {
            const context = clipboard.readText();
            new Notification({
              title: keybinding.name,
              body: context,
              silent: true,
            }).show();
            // GoogleGemini = "GoogleGemini",
            // OpenAIChatGpt35 = "ChatGpt35",
            let result = "";
            if (keybinding.type === "GoogleGemini") {
              const gemini = new Gemini();
              gemini.API_KEY = keybinding.api_key;
              result = await gemini.chat(`${keybinding.prompt}\n${context}`);
            }
            if (keybinding.type === "ChatGpt35") {
              const chatgpt = new Chatgpt();
              chatgpt.API_KEY = keybinding.api_key;
              result = await chatgpt.chat(`${keybinding.prompt}\n${context}`);
            }

            new Notification({
              title: `[Done]${keybinding.name}`,
              body: result,
              silent: true,
            }).show();
          }
        );
      }
    });
  });

  // Load renderer process
  dynamicRenderer(mainWindow);

  // Initialize modules
  console.log("-".repeat(30) + "\n[+] Loading modules...");
  modules.forEach((module) => {
    try {
      module(mainWindow);
    } catch (err: any) {
      console.log("[!] Module error: ", err.message || err);
    }
  });

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // if (BrowserWindow.getAllWindows().length === 0) createWindow()
    mainWindow.show();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
