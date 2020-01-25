import React, { useState, useEffect, useContext } from 'react';
import {
	Background,
	Logo,
	SideBar,
	Header,
	SubHeader,
	SidebarButton,
	Container,
	Overlay
} from './components';
import ProductInterface from './products';
import ProviderInterface from './providers';
import DeliveryInterface from './deliveries';
import TablesInterface from './tables';
import SettingsInterface from './settings';
import ManagementInterface from './management';
import ClientsInterface from './clients';
import WaitingListInterface from './waitinglist';
import { Context } from '../../context';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import {findAllTables} from '../components/functions';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import io from 'socket.io-client';

const {dialog, app} = window.require('electron').remote;

const quitConfirm = {
	type: 'warning',
	buttons: ['Cancelar', 'Trocar de usuário', 'Sair'],
	defaultId: 0,
	cancelId: 0,
	title: 'Sair',
	message: 'Deseja sair?',
	detail: 'Escolha sua opção:',
};

const Home = () => {
	const [user, setUser] = useState('Jean');
	const [page, setPage] = useState('Mesas');
	const [cookies, , removeCookies] = useCookies('authorization');
	const history = useHistory();

	const state = useContext(Context);

	const updateUser = () => {
		if (cookies.authorization) {
			const decoded = jwtDecode(cookies.authorization.access_token);
			const email = decoded.email;

			const headers = {
				'Authorization': `Bearer ${global.token}`,
				'Content-Type': 'application/json'
			};
		
			Axios.get(`${process.env.REACT_APP_API}/api/v1/user?email=${email}`, {
				headers
			})
				.then(({data}) => {
					setUser(data[0].name);
				})
				.catch(error => console.log(error));
		}
	};

	const ioConnection = () => {
		const socket = io.connect(process.env.REACT_APP_API);
		socket.on('update', () => {
			findAllTables(cookies.authorization.access_token)
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
		findAllTables(cookies.authorization.access_token)
			.then(answer => {
				if(answer.status === 200){
					state.setContext({...state.context, tables: answer.data});
					ioConnection();
				}
			});
	}, []);

	// const state = useContext(Context);

	const getCurrentPage = () => {
		switch (page.toLowerCase()) {
		case 'mesas':
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
			return <DeliveryInterface />;
		case 'lista de espera':
			return <WaitingListInterface />;
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
									const id = dialog.showMessageBoxSync(quitConfirm);

									console.log(id);
									switch(id){
									case 2:
										app.quit();
										break;
									case 1:
										history.push('/');
										removeCookies('authorization');
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
				<SubHeader />
				<SideBar>
					<SidebarButton selected={page === 'Mesas'} onClick={() => setPage('Mesas')}>Mesas</SidebarButton>
					<SidebarButton selected={page === 'Entregas'} onClick={() => setPage('Entregas')}>Entregas</SidebarButton>
					<SidebarButton selected={page === 'Lista de espera'} onClick={() => setPage('Lista de espera')}>Lista de espera</SidebarButton>
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
