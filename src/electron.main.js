const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');

let mainWindow;

const menuTemplate = [
	{
		label: 'Filter',
		submenu: [
			{
				label: 'Hello',
				accelerator: 'Shift+CmdOrCtrl+H',
				click() {
					console.log('Oh, hi there!');
				}
			}
		]
	}
];
const menuMain = Menu.buildFromTemplate(menuTemplate);

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

	mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
		if (frameName === 'Pagamento') {
			// open window as modal
			event.preventDefault();
			Object.assign(options, {
				modal: true,
				title: 'Novo Pagamento',
				parent: mainWindow,
				width: 1000,
				height: 800,
			});
			const win = new BrowserWindow(options);

			win.on('page-title-updated', function(e) {
				e.preventDefault();
			});

			win.setMenuBarVisibility(false);
			win.fullScreenable = false;
			win.resizable = false;
			win.center();
			
			event.newGuest = win;
		}
	});
}

app.on('ready', () => {
	console.log(path.join(__dirname, '../public/logo192.png'));
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