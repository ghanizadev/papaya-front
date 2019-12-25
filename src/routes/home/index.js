import React from 'react';
import {Background, Logo, SideBar, Header, SubHeader, Button, Container} from './components';

const Home = () => {
	return (
		<Background>
			<Header/>
			<SubHeader />
			<SideBar>
				<Button>Pedidos</Button>
				<Button>Clientes</Button>
				<Button>Produtos</Button>
				<Button>Fornecedores</Button>
				<Button>Gerenciamento</Button>
				<Button>Configurações</Button>
			</SideBar>
			<Logo />
			<Container />
		</Background>
	);
};

export default Home;