import React, { useState, useContext } from 'react';
import {
	Background,
	Logo,
	SideBar,
	Header,
	SubHeader,
	Button,
	Container,
	Overlay
} from './components';
import { ProductInterface } from './views';
import Tables from '../tables';
import { Context, Provider } from '../../context';
import { useCookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

const Home = props => {
	const [user, setUser] = useState('Jean');
	const [page, setPage] = useState('Jean');
	const [cookies, setCookies, removeCookies] = useCookies('authorization');
	const history = useHistory();

	const state = useContext(Context);

	if (cookies.authorization) {
		//TODO pegar info do usuario no banco
		const decoded = jwtDecode(cookies.authorization.access_token);
		const email = decoded.email;
		if (user !== email) setUser(email);
	}

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
					<Button onClick={() => setPage('orders')}>Pedidos</Button>
					<Button>Clientes</Button>
					<Button onClick={() => setPage('products')}>Produtos</Button>
					<Button>Fornecedores</Button>
					<Button>Gerenciamento</Button>
					<Button>Configurações</Button>
				</SideBar>
				<Logo />
				<Container>{getCurrentPage()}</Container>
			</Background>
			<Overlay />
		</Provider>
	);
};

export default Home;
