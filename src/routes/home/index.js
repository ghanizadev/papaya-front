import React, { useState, useEffect } from 'react';
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
import { Provider } from '../../context';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const Home = () => {
	const [user, setUser] = useState('Jean');
	const [page, setPage] = useState('Mesas');
	const [cookies, , removeCookies] = useCookies('authorization');
	const history = useHistory();

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

	useEffect(()=> {
		updateUser();
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
		<Provider>
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
									history.push('/');
									removeCookies('authorization');
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
		</Provider>
	);
};

export default Home;
