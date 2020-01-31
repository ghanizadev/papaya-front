'use strict';

const {app, BrowserWindow, Menu, session, globalShortcut, ipcMain } = require('electron');
const path = require('path')
const url = require('url')

const TITLE = 'La Solana - Gerenciamento';

let mainWindow;
let modals = []

let dev = false;
if ( process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath) ) {
  dev = true;
}

const menuTemplate = [
	{
		label: 'Arquivo',
		submenu: [
			{
				label: 'Abrir',
				accelerator: 'Shift+CmdOrCtrl+A',
				click() {
					console.log('Abrindo...');
				}
			}
		]
	},
	{
		label: 'Mesas',
		submenu: [
			{
				label: 'Abrir mesa',
				accelerator: 'F2',
				click() {
					openWindow({modal: true, title: 'Abrir Mesa', size: {width: 300, height: 120}, resizable: false, url: '/open', fullscreenable: false});
				}
			},
			{
				label: 'Lista de espera',
				accelerator: 'F3',
				click() {
					openWindow({modal: true, title: 'Lista de espera', size: {width: 400, height: 600}, resizable: false, url: '/list', fullscreenable:  false});
				}
			},
			{
				label: 'Adicionar Produtos',
				accelerator: 'F4',
				click() {
					openWindow({modal: true, title: 'Lista de espera', size: {width: 400, height: 600}, resizable: false, url: '/add', fullscreenable:  false});
				}
			}
		]
	}
];
const menuMain = Menu.buildFromTemplate(menuTemplate);

const openWindow = args => {

  const win = new BrowserWindow({
    modal: args.modal || true,
    title: args.title || null,
    parent: mainWindow,
    width: args.size.width || 1000,
    height: args.size.height || 800,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInSubFrames: true
    }
  });
  win.on('page-title-updated', function(e) {
    e.preventDefault();
  });

  win.on('close', () => {
    modals = modals.filter(modal => modal !== win);
  });

  win.on('ready-to-show', () => win.show());
  
  let openURL;
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    openURL = url.format({
      protocol: 'http:',
      host: 'localhost:8080/',
      hash: args.url,
      slashes: true
    });
  } else {
    openURL = url.format({
      protocol: 'file:',
      host: path.join(__dirname, 'dist', 'index.html'),
      hash: args.url,
      slashes: true
    });
  }

  win.loadURL(openURL);
  win.setMenuBarVisibility(false);
  win.setResizable(args.resizable || false);
  win.setFullScreenable(args.fullscreenable || false);
  win.center();

  modals.push(win);	
};

ipcMain.on('log', (event, arg) => {
  event.preventDefault();
  console.log(arg);
})

ipcMain.on('openModal', (event, args) => {
  
	event.preventDefault();	
  openWindow(args);
  
});


function createWindow() {
  mainWindow = new BrowserWindow({
    title: TITLE,
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
			nativeWindowOpen: true,
			nodeIntegration: true,
			nodeIntegrationInSubFrames: true,
		}
  });

  let indexPath;
  if ( dev && process.argv.indexOf('--noDevServer') === -1 ) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: '',
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      hash: path.join(__dirname, 'dist', 'index.html'),
      slashes: true
    });
  }
  mainWindow.loadURL( indexPath );

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.setTitle(TITLE);
    mainWindow.setMinimizable(true);

    if ( dev ) {
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('page-title-updated', event => event.preventDefault())

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', () => {

	globalShortcut.register('Esc', ()=> {
		modals.forEach(modal => modal.close());
	});

	globalShortcut.register('F12', () => {
    mainWindow.webContents.openDevTools()
  });

	Menu.setApplicationMenu(menuMain);
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
