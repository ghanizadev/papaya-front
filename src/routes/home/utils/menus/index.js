const electron = window.require('electron');
const {Menu} = electron.remote;
const ipcRenderer = electron.ipcRenderer;

export const loadTablesMenu = (token) => {
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
						ipcRenderer.send('openModal', {
							title: 'Abrir mesa',
							size: {
								width: 300,
								height: 120,
							},
							modal: true,
							url: `/open?access_token=${token}`,
							resizable: false,
							fulscreenable: false
						});
					}
				},
				{
					label: 'Lista de espera',
					accelerator: 'F3',
					click() {
					}
				},
				{
					label: 'Adicionar Produtos',
					accelerator: 'F4',
					click() {
					}
				}
			]
		}
	];
	
    const menu = Menu.buildFromTemplate(menuTemplate);
    
    Menu.setApplicationMenu(menu);
}

export const LoadNullMenu = () => Menu.setApplicationMenu(null);