
import React, {useState, useContext, useEffect} from 'react';
import {Context} from '../../../context';
import {find, save} from './functions';
import {Results, Container, Header, Input, Select, Button} from '../components';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import {Tab, TabList, Tabs, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const ProductInterface = props => {
	const [cookies] = useCookies('authorization');
	const [data, setData] = useState([]);
	const state = useContext(Context);
	const history = useHistory();
	const [selectedGroup, setSelectedGroup] = useState('1');
	const [selectedSubgroup, setSelectedSubgroup] = useState('01');
	const [selectedVariation, setSelectedVariation] = useState('00');
	const [body, setBody] = useState({
		code: 0,
		price: 0,
		tax: 70,
		final: 0,
		group: '1',
		subgroup: '01',
		variation: '00'
	});

	const [provider, setProvider] = useState({name: '', cnpj: ''})


	const getProvider = provider => {
		if(cookies.authorization){
			fetch(process.env.REACT_APP_API + '/api/v1/provider?providerId=' + provider)
			.then(result => {
				if(result.status === 200){
					result.json()
					.then(answer =>{
						if(answer.length && answer.length > 0){
							setProvider(answer[0]);
						}
					})
				}
			})
		}
	}

	if(data.length === 0 && cookies.authorization)
		find(cookies.authorization.access_token)
			.then(response => {
				if(response.status === 200){
					setData(response.data);
				}
			}).catch((error) => {
				if(error.response.status === 403){
					window.alert('Você não tem permissão para cessar este conteúdo');
				}
			});
	else if (!cookies.authorization) history.push('/');

	useEffect(() => {
		setBody({...body, ref: `${selectedGroup}${selectedSubgroup}${selectedVariation}` });
	}, [selectedGroup, selectedSubgroup, selectedVariation]);

	const subgroups = {
		'1': {
			'01': 'AGUA 500ML/600ML',
			'02': 'REFRIGERANTE 250ML',
			'03': 'REFRIGERANTE 350ML',
			'04': 'SUCOS NATURAIS',
			'05': 'SUCOS DE POLPA',
			'06': 'VITAMINAS'
		},
		'2':{
			'01': 'CERVEJAS LATA 350ML',
			'02': 'CERVEJAS GARRAFA 600ML',
			'03': 'CAIPIRAS',
			'04': 'UÍSQUES',
			'05': 'DOSES',
			'06': 'VINHOS NACIONAIS',
			'07': 'VINHOS IMPORTADOS'
		},
		'3': {
			'01': 'ACAI'
		}
	};

	const dataMock = [
		{
			'group': '1',
			'subgroup': '04',
			'variation': '01',
			'unity': 'UN',
			'provider': 'LASOLANA',
			'_id': '5e1e6d95899d256e1140280d',
			'code': '10401',
			'ref': '10401',
			'name': 'SUCO NATURAL',
			'description': 'SABOR LIMÃO',
			'price': 7,
			'createdAt': '2020-01-15T01:40:37.973Z',
			'updatedAt': '2020-01-15T01:40:37.973Z',
			'__v': 0
		},
		{
			'group': '1',
			'subgroup': '04',
			'variation': '02',
			'unity': 'UN',
			'provider': 'LASOLANA',
			'_id': '5e1e6e40eef7666fc39fd789',
			'code': '10402',
			'ref': '10402',
			'name': 'SUCO NATURAL',
			'description': 'SABOR LARANJA',
			'price': 7,
			'createdAt': '2020-01-15T01:43:28.736Z',
			'updatedAt': '2020-01-15T01:43:28.736Z',
			'__v': 0
		},
		{
			'group': '1',
			'subgroup': '05',
			'variation': '01',
			'unity': 'UN',
			'provider': 'LASOLANA',
			'_id': '5e1e6ef9eef7666fc39fd78a',
			'code': '10501',
			'ref': '10501',
			'name': 'SUCO DE POLPA',
			'description': 'SABOR MORANGO',
			'price': 7,
			'createdAt': '2020-01-15T01:46:33.590Z',
			'updatedAt': '2020-01-15T01:46:33.590Z',
			'__v': 0
		},
		{
			'group': '1',
			'subgroup': '05',
			'variation': '02',
			'unity': 'UN',
			'provider': 'LASOLANA',
			'_id': '5e1e6f19eef7666fc39fd78b',
			'code': '10502',
			'ref': '10502',
			'name': 'SUCO DE POLPA',
			'description': 'SABOR MARACUJA',
			'price': 7,
			'createdAt': '2020-01-15T01:47:05.537Z',
			'updatedAt': '2020-01-15T01:47:05.537Z',
			'__v': 0
		},
		{
			'group': '1',
			'subgroup': '05',
			'variation': '03',
			'unity': 'UN',
			'provider': 'LASOLANA',
			'_id': '5e1e6fc1eef7666fc39fd78c',
			'code': '10503',
			'ref': '10503',
			'name': 'SUCO DE POLPA',
			'description': 'SABOR MANGA',
			'price': 7,
			'createdAt': '2020-01-15T01:49:53.596Z',
			'updatedAt': '2020-01-15T01:49:53.596Z',
			'__v': 0
		}
	];

	return (
		<Container>
			<Header>Produtos</Header>
			
			<Tabs>
				<TabList>
					<Tab>Pesquisar</Tab>
					<Tab>Adicionar Produto</Tab>
					<Tab>Alterar Produto</Tab>
				</TabList>
	
				<TabPanel>
					<div style={{padding: 25}}>
						<Input label="Pesquisar" placeholder="Digite algo para pesquisar" />
						<Results data={dataMock}/>
					</div>
				</TabPanel>
				<TabPanel>
					<div style={{width: '100%', display: 'flex', margin:'auto', flexDirection: 'column'}}>
						<h3>Produto</h3>
						<div style={{display: 'flex', flexDirection: 'row'}}>
							<Input label='Código' placeholder="00000000000"  size={13} onChange={e => { setBody({...body, code: e.target.value}); }} />
							<Input
								label='Referência'
								placeholder="00000"
								size={5}
								value={body.ref}
								onChange={e => { setBody({...body, ref: e.target.value}); }}
							/>

						</div>

						<Input
							label="Nome"
							placeholder="Digite aqui o nome do produto"
							onChange={e => { setBody({...body, name: e.target.value}); }} 
						/>

						<Input
							label="Descrição"
							multiline
							placeholder="Digite aqui a descrição completa do produto"
							onChange={e => { setBody({...body, description: e.target.value}); }}
						/>

						<div style={{display: 'flex', flexDirection: 'row'}}>

							<Select label="Grupo" onChange={e => {setBody({...body, group: e.target.value});}}>
								<option value="1">1 - BEBIDAS SEM ALCOOL</option>
								<option value="2">2 - BEBIDAS COM ALCOOL</option>
								<option value="3">3 - OUTROS</option>
							</Select>
							<Select label="Subgrupo" onChange={e => setBody({...body, subgroup: e.target.value})}>
								{subgroups && Object.keys(subgroups[body.group]).map(item => {
									return (<option key={item} value={item}>{`${item} - ${subgroups[body.group][item]}`}</option>);
								})}
							</Select>
							<Input label='Variação' type="number" min={0} placeholder="00" onChange={e => {setBody({...body, variation: e.target.value});}} containerStyle={{width: 150}} size={2} />
							
							<Select label="Unidade" placeholder="Selecione" onChange={e => { setBody({...body, unity: e.target.value}); }} containerStyle={{width: 150}}>

								<option value="UN">UN</option>
								<option value="FD">FD</option>
								<option value="LT">LT</option>
								<option value="KG">KG</option>
								<option value="PC">PC</option>
								<option value="CX">CX</option>

							</Select>
						</div>
						<div style={{display: 'flex', flexDirection: 'row'}}>

							<Input type="number" label='Preço (R$)' onChange={e => { setBody({...body, price: e.target.value}); }} placeholder="0,00" />
							<Input type="number" label='Acréscimo (%)' onChange={e => { setBody({...body, tax: e.target.value}); }} placeholder="70" />
							<Input
								label='Valor de Venda (R$)'
								onChange={e => { setBody({...body, final: e.target.value}); }}
								placeholder={(body.price * (1 + (body.tax * 0.01))).toFixed(2).toString().replace('.', ',')}
							/>

						</div>

					</div>
					<div>
						<h3>Fornecedor</h3>
						<div style={{display: 'flex', flexDirection: 'row'}}>
							<Input label='Código' placeholder="0000" onChange={e => { getProvider(e.target.value)}} />
							<Input label='Nome' placeholder="Nome do fornecedor" value={provider.name} readonly />
							<Input label='CNPJ' placeholder="CNPJ do fornecedor" value={provider.cnpj} readonly />
						</div>
					</div>
					<div style={{display: 'flex', flexDirection: 'row', position: 'absolute', bottom: 25, right: 25}}>

						<Button title="Salvar o produto atual" onClick={()=> {
							let local = body;

							local.ref = `${local.group}${local.subgroup}${local.variation}`;

							if(local.code == 0){
								local.code = local.ref;
							}

							if(local.final === 0 && local.price > 0) {
								local.final = local.price * (1 + (local.tax * 0.01));
							}

							save(global.token || cookies.authorization.access_token, local)
								.then(result => {
									window.alert('Produto salvo com sucesso!');
								}).catch(error => {
									console.log(error);
									window.alert('Erro ao salvar o produto...');
								});
						}}>Salvar</Button>
						<Button title="Limpar o formulário para novo cadastro" onPress={()=> {window.alert('Ok');}}>Limpar</Button>

					</div>
				</TabPanel>
			</Tabs>
		</Container>
	);
};

export default ProductInterface;