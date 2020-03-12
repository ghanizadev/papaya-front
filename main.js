
const {
  app, BrowserWindow, Menu, globalShortcut, ipcMain,
} = require('electron');
const path = require('path');
const url = require('url');

const TITLE = 'La Solana - Gerenciamento';

let mainWindow;
let modals = [];

let dev = false;
if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
  dev = true;
}

const openWindow = (args) => {
  const win = new BrowserWindow({
    resizable: false,
    modal: args.modal || true,
    title: args.title || null,
    parent: mainWindow,
    width: args.size.width || 1000,
    height: args.size.height || 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
    },
  });
  win.on('page-title-updated', (e) => {
    e.preventDefault();
  });

  win.on('close', () => {
    modals = modals.filter((modal) => modal !== win);
  });

  win.on('ready-to-show', () => win.show());

  let openURL;
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    openURL = url.format({
      protocol: 'http',
      host: 'localhost:8080',
      pathname: args.url,
      slashes: true,
    });
  } else {
    openURL = url.format({
      protocol: 'file:',
      host: path.join(__dirname, 'dist', 'index.html'),
      hash: args.url,
      slashes: true,
    });
  }

  // console.log(openURL);

  win.loadURL(openURL);
  win.setMenuBarVisibility(false);
  win.resizable = args.resizable || false;
  win.fullScreenable = args.fullscreenable || false;
  win.center();

  modals.push(win);
};

ipcMain.handle('log', (event, arg) => {
  event.preventDefault();
  console.log(arg);
});

ipcMain.handle('refresh', (event) => {
  event.preventDefault();
  mainWindow.webContents.reload();
});

ipcMain.handle('closeAll', (event) => {
  event.preventDefault();
  modals.forEach((modal) => modal.close());
});

ipcMain.handle('openModal', (event, args) => {
  event.preventDefault();
  openWindow(args);
});


function createWindow() {
  mainWindow = new BrowserWindow({
    title: TITLE,
    width: 1024,
    height: 768,
    show: false,
    icon: path.join(__dirname, 'src', 'assets', 'config', 'ic_launcher.png'),
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true,
    },
  });

  let indexPath;
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: '',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }
  mainWindow.loadURL(indexPath);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.setTitle(TITLE);
    mainWindow.setMinimizable(true);
    mainWindow.setResizable(false);

    if (dev) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('page-title-updated', (event) => event.preventDefault());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  globalShortcut.register('Esc', () => {
    modals.forEach((modal) => modal.close());
  });

  globalShortcut.register('F12', () => {
    mainWindow.webContents.openDevTools();
  });

  Menu.setApplicationMenu(null);
  createWindow();
  mainWindow.maximize();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
