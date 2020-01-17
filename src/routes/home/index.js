import React, { useState, useContext, useEffect } from 'react';
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
import Tables from '../tables';
import { Context, Provider } from '../../context';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const Home = props => {
	const [user, setUser] = useState('Jean');
	const [page, setPage] = useState('Jean');
	const [cookies, setCookies, removeCookies] = useCookies('authorization');
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

	const state = useContext(Context);

	const getCurrentPage = () => {
		switch (page) {
		case 'orders':
			return <Tables />;
		case 'products':
			return <ProductInterface />;
		default:
			return <Tables />;
		}
	};

	return (
		<Provider>
			<Background>
				<Header>
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<h3 style={{ marginRight: 15 }}>La Solana</h3>
						<h4>Central de gerenciamento</h4>
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
					<SidebarButton onClick={() => setPage('orders')}>Pedidos</SidebarButton>
					<SidebarButton>Clientes</SidebarButton>
					<SidebarButton onClick={() => setPage('products')}>Produtos</SidebarButton>
					<SidebarButton>Fornecedores</SidebarButton>
					<SidebarButton>Gerenciamento</SidebarButton>
					<SidebarButton>Configurações</SidebarButton>
				</SideBar>
				<Logo />
				<Container>{getCurrentPage()}</Container>
			</Background>
			<Overlay />
		</Provider>
	);
};

export default Home;
