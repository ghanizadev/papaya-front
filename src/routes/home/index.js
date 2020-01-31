import React, { useState, useEffect, useContext } from 'react';
import {
	Background,
	Logo,
	SideBar,
	Header,
	SubHeader,
	SidebarButton,
	Container,
	Overlay,
	Button
} from './components';
import ProductInterface from './products';
import ProviderInterface from './providers';
import DeliveryInterface from './deliveries';
import TablesInterface from './tables';
import SettingsInterface from './settings';
import ManagementInterface from './management';
import ClientsInterface from './clients';
import { Context } from '../../context';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import {findAllTables} from '../components/functions';
import axios from 'axios';
import io from 'socket.io-client';

import {LoadNullMenu, loadTablesMenu} from './utils/menus';

const {dialog, app } = window.require('electron').remote;
const ipcRenderer = window.require('electron').ipcRenderer;

const quitConfirm = {
	type: 'question',
	buttons: ['Cancelar', 'Trocar de usuário', 'Sair'],
	defaultId: 0,
	cancelId: 0,
	title: 'Sair',
	message: 'Deseja sair?',
	detail: 'Escolha sua opção:',
};

const Home = props => {
	const [user, setUser] = useState('Jean');
	const [page, setPage] = useState('Mesas');
	const [cookies, setCookies, removeCookies] = useCookies();
	const { navigate } = props;

	const state = useContext(Context);


	const updateUser = () => {
		const decoded = jwtDecode(state.context.auth.access_token);
		const email = decoded.email;

		const headers = {
			'Authorization': `Bearer ${state.context.auth.access_token}`,
			'Content-Type': 'application/json'
		};
	
		axios.get(`${process.env.REACT_APP_API}/api/v1/user?email=${email}`, {
			headers
		})
			.then(({data}) => {
				setUser(data[0].name);
			})
			.catch(error => console.log(error));
	};

	const ioConnection = () => {
		const socket = io.connect(process.env.REACT_APP_API);
		socket.on('update', () => {
			findAllTables(state.context.auth.access_token)
				.then(result => {
					if(result.status === 200)
						state.setContext({...state.context, tables: result.data });
				})
				.catch(error => {
					console.log(error);
				});
		});
	};

	useEffect(()=> {
		updateUser();
		findAllTables(state.context.auth.access_token)
			.then(answer => {
				if(answer.status === 200){
					state.setContext({...state.context, tables: answer.data});
					ioConnection();
				}
			});
	}, []);

	const getCurrentPage = () => {
		switch (page.toLowerCase()) {
		case 'mesas':
			loadTablesMenu(state.context.auth.access_token);
			return <TablesInterface />;
		case 'produtos':
			return <ProductInterface />;
		case 'fornecedores':
			return <ProviderInterface />;
		case 'clientes':
			return <ClientsInterface />;
		case 'configurações':
			return <SettingsInterface />;
		case 'gerenciamento':
			return <ManagementInterface />;
		case 'entregas':
			LoadNullMenu();
			return <DeliveryInterface />;
		default:
			return <TablesInterface />;
		}
	};

	return (
		<div>
			<Background>
				<Header>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<h1 style={{ marginRight: 15 }}>{page}</h1>
					</div>
					<div>
						<span>
							Bem vindo {user}!{' '}
							<a
								href="#"
								onClick={() => {
									const id = dialog.showMessageBox(quitConfirm);
									switch(id){
									case 2:
										app.quit();
										break;
									case 1:
										LoadNullMenu();
										navigate('/');
										break;
									default:
										break;
									}
								}}
							>
								sair
							</a>
						</span>
					</div>
				</Header>
				<SubHeader>
					{page && page === 'Mesas' ? (
						<>
							<Button onClick={()=> 
								ipcRenderer.send('openModal', {
									title: 'Abrir mesa',
									size: {
										width: 300,
										height: 120,
									},
									modal: true,
									url: `/open?access_token=${state.context.auth.access_token}`,
									resizable: false,
									fulscreenable: false
								})
							}>Abrir mesa (F2)</Button>
							<Button onClick={()=> 
							ipcRenderer.send('openModal', {
								title: 'Lista de espera',
								size: {
									width: 500,
									height: 800,
								},
								modal: true,
								url: `/list?access_token=${state.context.auth.access_token}`,
								resizable: false,
								fulscreenable: false
							})
							}>Lista de espera (F3)</Button>
							<Button onClick={()=> 
							ipcRenderer.send('openModal', {
								title: 'Adicionar produto',
								size: {
									width: 800,
									height: 600,
								},
								modal: true,
								url: `/add?access_token=${state.context.auth.access_token}`,
								resizable: false,
								fulscreenable: false
							})
							}>Adicionar produto (F4)</Button>
							<Button onClick={()=>
								ipcRenderer.send('refresh', {})
							}>Atualizar mesas (F5)</Button>
						</>
					) : null}
				</SubHeader>
				<SideBar>
					<SidebarButton selected={page === 'Mesas'} onClick={() => setPage('Mesas')}>Mesas</SidebarButton>
					<SidebarButton selected={page === 'Entregas'} onClick={() => setPage('Entregas')}>Entregas</SidebarButton>
					<SidebarButton selected={page === 'Clientes'} onClick={() => setPage('Clientes')}>Clientes</SidebarButton>
					<SidebarButton selected={page === 'Produtos'} onClick={() => setPage('Produtos')}>Produtos</SidebarButton>
					<SidebarButton selected={page === 'Fornecedores'} onClick={() => setPage('Fornecedores')}>Fornecedores</SidebarButton>
					<SidebarButton selected={page === 'Gerenciamento'} onClick={() => setPage('Gerenciamento')}>Gerenciamento</SidebarButton>
					<SidebarButton selected={page === 'Configurações'} onClick={() => setPage('Configurações')}>Configurações</SidebarButton>
				</SideBar>
				<Logo />
				<Container>{getCurrentPage()}</Container>
			</Background>
			<Overlay />
		</div>
	);
};

export default Home;
