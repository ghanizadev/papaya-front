import React, { useState, Children, useReducer, useEffect, useRef} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input, Button, Search, TextArea} from '../../../../components';
import { getFlavor } from './function';

const Container = styled.div`
	width: 800px;
	height: 600px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

const Wrapper = styled.div`
	width: 800px;
	height: 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	box-sizing: border-box;
	transition: all .3s;
	position: relative;
`;

const ProductButton = styled.button`
	height: 120px;
	width: 120px;
	margin: 15px;
	border: none;
	transition: all .2s ease-in;

	&:hover {
		transform: scale(1.05);
		box-shadow: 5px 10px 8px #888888;
	}
`;

const CloseButtonContainer = styled.button`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	border: none;
	position: absolute;
	top: 5px;
	right: 5px;
	background-color: tomato;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-weight: bold;
`;

const CloseButton = props => {
	const {onClose} = props;
	return (
		<CloseButtonContainer onClick={() => onClose()}>&times;</CloseButtonContainer>
	);
};

CloseButton.propTypes = {
	onClose: PropTypes.func.isRequired
};

const FlavorBoxContainer = styled.div`
	height: 0;
	opacity: 0;
	border: none;
	border-radius: 15px;
	width: 500px;
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	transition: all 500ms ease-in;
	overflow: hidden;
`;

const FlavorItemContainer = styled.div`
	height: 150px;
	width: 480px;
	margin: 0 5px;
	border-radius: 15px;
	border: solid 1px whitesmoke;
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	box-sizing: border-box;
`;

const FlavorItem = props => {
	const {flavor, onRemove} = props;

	return (
		<FlavorItemContainer>
			<h3 style={{margin: 0}}>{flavor.name}</h3>
			<h5 style={{margin: 0}}>{flavor.code}</h5>
			<p style={{margin: 0, fontSize: 10, color: '#666'}}>{flavor.description.join(', ')}</p>
			<TextArea label="Adicionais" />
			<CloseButton onClose={onRemove} />
		</FlavorItemContainer>
	);
};

FlavorItem.propTypes = {
	flavor: PropTypes.object.isRequired,
	onRemove: PropTypes.func.isRequired,
};

const Page = props => {
	const {children, visible} = props;

	return (
		<Wrapper style={{height: visible ? 600 : 0}}>
			{children}
		</Wrapper>
	);
};

Page.propTypes = {
	children: PropTypes.any,
	visible: PropTypes.bool.isRequired
};

Page.defaultProps = {
	children: []
};

export const FlavorBox = props => {
	const {children, onConfirm, onClean} = props;

	const onItem = {
		height: '500px',
		border: 'solid 1px whitesmoke',
		padding: '15px',
		margin: '15x auto',
		opacity: 1,
	};

	return (
		<FlavorBoxContainer style={Children.count(children) > 0 ? onItem : {}}>
			<div style={{display: 'flex', flexDirection: 'column', margin: 'auto'}}>
				{children}
			</div>
			<div style={{display: 'flex', flexDirection: 'row', margin: '15px', width: '100%', justifyContent: 'flex-end'}}>
				<Button onClick={onClean}>Limpar</Button>
				<Button onClick={onConfirm}>Confirmar</Button>
			</div>
		</FlavorBoxContainer>
	);
};

FlavorBox.propTypes = {
	children: PropTypes.any,
	onClean: PropTypes.func,
	onConfirm: PropTypes.func,
};

FlavorBox.defaultProps = {
	children: [],
	onClean: () => {},
	onConfirm: () => {},
};

function reducer(state, action) {
	switch (action.type) {
	case 'add':{
		const tmp = state.data;
		tmp.push(action.payload);
		return {data: tmp};
	}
	case 'del':{
		const data = state.data.filter(item => item !== action.payload);
		return {data};
	}
	case 'clean':{
		return {data: []};
	}
	default:
		throw new Error();
	}
}

const initialState = {data: []};


export const AddEndpoint = () => {
	const [page, setPage] = useState('pick');

	const [searchItems, setSearchItems] = useState([]);
	const [selectedItem, setSelectedItem] = useState({});

	const [flavors, dispatchFlavors] = useReducer(reducer, initialState);
	
	const search = window.location.search;
	const params = new URLSearchParams(search);
	const token = params.get('access_token');

	const getVisible = number => page === number;

	return (
		<Container>
			<Page visible={getVisible('pick')}>
				<h2>Escolha o produto:</h2>
				<div style={{width: 50}} />
				<ProductButton onClick={() => setPage('pizzasize')}/>
				<ProductButton onClick={() => setPage('product')}/>
			</Page>
			<Page visible={getVisible('pizzasize')}>
				<h2>Tamanho da pizza</h2>
				<div style={{width: 50}} />
				<div style={{display: 'flex', flexDirection: 'row'}}>
					<ProductButton onClick={() => setPage('pizzaflavor')}/>
					<ProductButton onClick={() => setPage('pizzaflavor')}/>
					<ProductButton onClick={() => setPage('pizzaflavor')}/>
				</div>
			</Page>
			<Page visible={getVisible('pizzaflavor')}>
				<h2>Quais os sabores?</h2>
				<div style={{width: 50}} />

				<div style={{display: 'flex', flexDirection: 'column'}}>
					<Search label="Pesquisar" onSelect={item => {
						if(item.value){
							const currentItem = searchItems.find(({code}) => code === item.value);
							dispatchFlavors({type: 'add', payload: currentItem});
						}

					}}
					onChange={e => {
						getFlavor(token, e.target.value)
							.then( result => {

								if(result.status === 200){
									setSearchItems(result.data);
									return;
								}

								window.alert('Falhou com o código' + result.status);
							});
					}}
					data={searchItems.map(item => {
						return {
							label: `${item.name}${item.variation !== 'UNICO' ? ` (${item.variation})` : ''}`,
							value: item.code
						};
					})}/>
					<FlavorBox onClean={() => dispatchFlavors({type: 'clean'})} onConfirm={() => {setPage('confirm');}}>
						{flavors && flavors.data.map((flavor, index) => {
							return <FlavorItem onAdditionalClick={()=>{setSelectedItem(flavor);}} onRemove={() => dispatchFlavors({type: 'del', payload: flavor})} flavor={flavor} key={index} />;
						})}
					</FlavorBox>
				</div>
			</Page>
			<Page visible={getVisible('product')}>
				<h2>Produtos</h2>
				<div style={{width: 50}} />

				<div style={{display: 'flex', flexDirection: 'row'}}>
					<Input labl="Pesquisar" placeholder="Digite aqui sua pesquisa..." />
				</div>
			</Page>
			<Page visible={getVisible('confirm')}>
				<h2>Confirmar?</h2>
				<div style={{width: 50}} />
				<div style={{display: 'flex', flexDirection: 'row'}}>
					<Input labl="Pesquisar" placeholder="Digite aqui sua pesquisa..." />
				</div>
			</Page>
		</Container>
	);
};

export default AddEndpoint;