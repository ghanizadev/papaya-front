import React, {useState, useContext} from 'react';
import {Context} from '../../../context';
import { Tables, Header, Table, ScrollView, Background, ResultField} from './components';
import {findAllProducts} from './functions';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import {Tab, TabList, Tabs, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


export const TablesOrders = props => {
	return (
		<Tables>
			<Header>Mesas</Header>
			<ScrollView>
				<Table number={1}/>
				<Table number={2}/>
				<Table number={3}/>
				<Table number={4}/>
				<Table number={5}/>
				<Table number={6}/>
				<Table number={7}/>
				<Table number={8}/>
				<Table number={9}/>
				<Table number={10}/>
				<Table number={11}/>
				<Table number={12}/>
				<Table number={13}/>
				<Table number={14}/>
				<Table number={15}/>
				<Table number={16}/>
				<Table number={17}/>
				<Table number={18}/>
				<Table number={19}/>
				<Table number={20}/>
				<Table number={21}/>
				<Table number={22}/>
				<Table number={23}/>
				<Table number={24}/>
				<div style={{minWidth: 7}} />
			</ScrollView>
		</Tables>
	);
};

export const ProductInterface = props => {
	const [cookies] = useCookies('authorization');
	const [data, setData] = useState([]);
	const state = useContext(Context);
	const history = useHistory();

	if(data.length === 0 && cookies.authorization)
		findAllProducts(cookies.authorization.access_token)
			.then(response => {
				if(response.status === 200){
					setData(response.data);
				}
			}).catch((error) => {
				if(error.response.status === 403){
					state.setOverlay({visible: true, message: 'Você não tem permissão para acessar este conteúdo', callback: () => {}});
				}
			});
	else if (!cookies.authorization) history.push('/');

	console.log(data);

	return (
		<Background>
			<Header>Produtos</Header>
			<Tables>
				<Tabs>
					<TabList>
						<Tab>Pesquisar</Tab>
						<Tab>Title 2</Tab>
					</TabList>
	
					<TabPanel>
						<span>Pesquisa</span>
						<input placeholder="Digite algo para pesquisar" />
						<ResultField data={data}/>
					</TabPanel>
					<TabPanel>
						<div>
							<h3>Adicionar produtos</h3>
							<input placeholder="Código" />
							<input placeholder="Nome" />
							<input placeholder="Referência" />
							<input placeholder="Descrição" />
							
						</div>
					</TabPanel>
				</Tabs>
			</Tables>
		</Background>
		
		
	);
};
