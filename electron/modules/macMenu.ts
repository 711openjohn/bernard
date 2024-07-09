import { app, BrowserWindow, Menu } from 'electron'

// Helpers
// =======
const template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = []

// Module
// ======
export default (mainWindow: BrowserWindow) => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (process.platform === 'darwin') {
    // OS X
    const name = 'electron'
    template.unshift({
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click() {
            app.quit()
          },
        },
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click() {
            // Reload the current window
            if (mainWindow) {
              mainWindow.reload()
            }
          },
        },
        {
          label: 'Edit',
          submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
            { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
            { type: 'separator' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
            { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectAll' },
          ],
        },
        ...(isDevelopment
          ? [
              {
                label: 'Toggle Developer Tools',
                accelerator: 'Alt+Command+I',
                click() {
                  // Open the DevTools.
                  if (mainWindow) {
                    mainWindow.webContents.toggleDevTools()
                  }
                },
              },
            ]
          : []),
      ],
    })

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    console.log('[-] MODULE::macMenu Initialized')
  }
}
