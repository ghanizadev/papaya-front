const {app, BrowserWindow, Menu, ipcMain, session } = require('electron');
const path = require('path');

let mainWindow;
let token;

const menuTemplate = [
	{
		label: 'Arquivo',
		submenu: [
			{
				label: 'Hello',
				accelerator: 'Shift+CmdOrCtrl+H',
				click() {
					console.log('Oh, hi there!');
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
					openWindow({modal: true, title: 'Abrir Mesa', size: {width: 300, height: 120}, resizable: false, url: '/home/tables/open', fullscreenable: false});
				}
			},
			{
				label: 'Lista de espera',
				accelerator: 'F3',
				click() {
					openWindow({modal: true, title: 'Lista de espera', size: {width: 400, height: 600}, resizable: false, url: '/home/tables/list', fullscreenable:  false});
				}
			}
		]
	}
];
const menuMain = Menu.buildFromTemplate(menuTemplate);

const openWindow = args => {
	session.defaultSession.cookies.get({})
		.then((cookies) => {
			const auth = cookies.find(cookie => cookie.name = 'authorization');
			const decoded = decodeURIComponent(auth.value);
			const json = JSON.parse(decoded);

			const win = new BrowserWindow({
				modal: args.modal || true,
				title: args.title || null,
				parent: mainWindow,
				width: args.size.width || 1000,
				height: args.size.height || 800,
				webPreferences: {
					nodeIntegration: true,
					nodeIntegrationInSubFrames: true
				}
			});
			win.on('page-title-updated', function(e) {
				e.preventDefault();
			});
		
			win.loadURL('http://192.168.100.2:8080' + args.url + '?access_token=' + json.access_token);
			win.setMenuBarVisibility(false);
			win.setResizable(args.resizable || false);
			win.setFullScreenable(args.fullscreenable || false);
			win.center();
		}).catch((error) => {
			console.log(error);
		});
	
};

ipcMain.handle('openModal', (event, args) => {
  
	event.preventDefault();
	return new Promise((resolve, reject) => {
		try {
			openWindow(args);
		}catch(e) {
			reject(e);
		}
		resolve();
	});
});

function createWindow () {
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 800,
		icon: path.join(__dirname, '../public/logo192.png'),
		webPreferences: {
			nativeWindowOpen: true,
			nodeIntegration: true,
			nodeIntegrationInSubFrames: true,
		}
	});

	mainWindow.loadURL('http://localhost:8080');

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', () => {
	Menu.setApplicationMenu(menuMain);
	createWindow();
	mainWindow.maximize();
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
	if (mainWindow === null) createWindow();
});