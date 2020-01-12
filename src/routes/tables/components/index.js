import React, { useContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { Context, Consumer } from '../../../context';
import { findFlavor, addProduct } from './functions';
import qs from 'qs';

export const Tables = styled.div`
	padding: 65px 25px 25px 25px;
	position: relative;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
`;

export const Header = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 40px;
	max-height: 40px;
	background-color: #ffbe5b;
	box-sizing: border-box;
	padding: 0 15px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 14pt;
	border-radius: 5px 5px 0 0;
	color: #fdfdfd;
`;

const TableContainer = styled.div`
	border-radius: 5px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
	margin: 25px 15px;
	padding: 15px;
	min-width: 16vw;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
`;

export const ScrollView = styled.div`    display: flex;
flex-direction: column;
    overflow: scroll hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start
    width: 100%;
    height: 100%;
`;

const FreeTableContainer = styled.div`
	min-height: 75%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const FreeTableButtom = styled.button`
	height: min-content;
	font-weight: bold;
	background-color: transparent;
	border: none;
	color: #40bd63;
	border-bottom: 1px solid lightgreen;
	font-size: 18pt;
`;

const BusyTableProductContainer = styled.div`
	height: min-content;
	display: flex;
	flex-direction: column;
	overflow: hidden scroll;
	flex: 1;
`;

const BusyTableProductButton = styled.button`
	height: min-content;
	background-color: #fdfdfd;
	width: 100%;
	border: none;
	color: #888;
	border-bottom: 1px solid #aaa;
	font-size: 11pt;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: unset;
	padding: 5px;
`;

const BusyTableAddProduct = styled.button`
	height: 30px;
	background-color: #fdfdfd;
	width: 100%;
	border: none;
	color: #40bd63;
	border-bottom: 1px solid #40bd63;
	font-size: 14pt;
`;

const BusyTableCheckout = styled.button`
	height: 30px;
	background-color: #fdfdfd;
	width: 100%;
	border: none;
	color: tomato;
	border-bottom: 1px solid tomato;
	font-size: 14pt;
`;

const BusyTableDetails = styled.button`
	height: 30px;
	background-color: #fdfdfd;
	width: 100%;
	border: none;
	color: #d9c31c;
	border-bottom: 1px solid #d9c31c;
	font-size: 14pt;
`;

const AddProductClose = styled.button`
	height: 30px;
	background-color: #fdfdfd;
	width: 100%;
	border: none;
	color: tomato;
	border-bottom: 1px solid tomato;
	font-size: 14pt;
`;

const AddProductSubmit = styled.button`
	height: 30px;
	background-color: #fdfdfd;
	width: 100%;
	border: none;
	color: #5cd191;
	border-bottom: 1px solid #5cd191;
	font-size: 14pt;
`;
const AddProductFlavor = styled.button`
	height: 30px;
	background-color: #fdfdfd;
	width: 100%;
	border: none;
	color: #666;
	border-bottom: 1px solid #666;
	font-size: 12pt;
`;

const AddProductFlavorSubmit = styled.button`
	height: 30px;
	background-color: #fdfdfd;
	width: 100%;
	border: none;
	color: #ffbe5b;
	border-bottom: 1px solid #ffbe5b;
	font-size: 14pt;
`;


const AddPizza = styled.button`
	height: 100px;
	width: 100px;
	background-color: #ddd;
	border: none;
	color: #ffbe5b;
	margin: 15px;
`;


const AddProduct = styled.button`
	height: 100px;
	width: 100px;
	background-color: #ddd;
	border: none;
	color: #ffbe5b;
	margin: 15px;
`;

const CloseButton = styled.button`
	height: 24px;
	width: 24px;
	border-radius: 12px;
	font-size: 14pt;
	background-color: tomato;
	border: none;
	color: #fdfdfd;
	position: absolute;
	top: 0;
	right: 0;
`;

const ProductDescription = props => {
	const {product} = props;

	const state = useContext(Context);
	return (
		<div style={{width: '100%', position: 'relative'}}>
			<h1>{product.title}</h1>
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<span>código: {product.code}</span>
				<span>grupo: {product.group}</span>
				<span>variação: {product.variation}</span>
				<span>descrição: {product.description.toString()}</span>
				<span>adicionais: {product.aditionals}</span>
				<span>preço: {product.price}</span>
			</div>
			<CloseButton onClick={()=>{state.setOverlay({...state.overlay, visible: false});}}>&times;</CloseButton>
		</div>
	);
};

const TableDescription = props => {
	const {order} = props;

	const state = useContext(Context);
	return (
		<div style={{width: '100%', position: 'relative'}}>
			<h1>{order.tableNumber}.{order.costumer}</h1>
			<div style={{display: 'flex', flexDirection: 'column'}}>
				<span>código: {order.orderId}</span>
				<span>entrega: {order.deliver}</span>
				<span>data de entrada: {new Date(order.createdAt).toLocaleDateString()}</span>
				<span>última atualização: {new Date(order.updatedAt).toLocaleTimeString()}</span>
			</div>
			<CloseButton onClick={()=>{state.setOverlay({...state.overlay, visible: false});}}>&times;</CloseButton>
		</div>
	);
};


const AddComponent = props => {
	const state = useContext(Context);

	return (
		<div style={{position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
			<AddPizza onClick={()=> state.setOverlay({...state.overlay, component: <AddPizzaComponent {...props} />}) } />
			<AddProduct onClick={()=> state.setOverlay({...state.overlay, component: <AddProductComponent {...props} />}) } />
			<CloseButton onClick={() => state.setOverlay({...state.overlay, visible: false})}>&times;</CloseButton>
		</div>
	);

};

const AddProductComponent = props => {
	const {order} = props;
	const state = useContext(Context);
	const [cookies] = useCookies();

	const searchField = useRef();

	const [products, setProducts] = useState([]);
	const [selectedProduct, setSelectedProducts] = useState('');

	return (
		<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width:'100%', height: '165px', position: 'relative'}}>
			<h1 style={{whiteSpace: 'nowrap'}}>Produtos | </h1>
			<br/>
			<input type="number" min={1} defaultValue={1} step={1} style={{width: 40, marginLeft: '5px'}}/>
			<div style={{width: '100%', padding: '0 10px', position: 'relative', boxSizing: 'border-box'}}>
				<input
					type="text" 
					ref={searchField}
					placeholder="Pesquise pelo seu produto..." 
					style={{width: '100%', boxSizing: 'border-box'}}
					onClick={() => {searchField.current.value = '';}}
					onChange={() => {
						if(searchField.current.value === ''){
							return setProducts([]);
						}
						findFlavor(
							cookies.authorization.access_token,
							searchField.current.value
						).then(result => {
							setProducts(result.data);
						});
					}}
				/>
				<div
					style={{
						position: 'absolute', 
						top: 30,
						width: 'calc(100% - 20px)',
						boxSizing: 'border-box',
						display: products.length > 0 ? 'flex': 'none',
						flexDirection: 'column',
						height: 'min-content',
						maxHeight: 200,
						overflowY: 'auto',
						backgroundColor: '#fdfdfd', 
						boxShadow: '3px 3px 8px 3px #888888aa', 
						border: '.5px solid #ddd',
						padding: 8
					}}>
					{products && products.map(
						(product, index) => 
							<button
								style={{
									backgroundColor: 'transparent',
									width: '100%',
									border: 'none'
								}}
								onClick={() => {
									setSelectedProducts(product.code);
									setProducts([]);
									searchField.current.value = `${product.code} - ${product.name}${product.variation != 'UNICO' ? ` (${product.variation})` : ''}`;
								}}
								key={index}>{`${product.name}${product.variation != 'UNICO' ? ` (${product.variation})` : ''}`}</button>)}
				</div>
			</div>
			<button
				type='submit'
				style={{
					backgroundColor: '#ffbe5b',
					border:'none',
					height: 30,
					borderRadius: 5,
					color: '#fdfdfd'
				}}>Adicionar</button>
			<CloseButton onClick={() => state.setOverlay({...state.overlay, visible: false})}>&times;</CloseButton>

		</div>
	);
};

const AddPizzaComponent = props => {
	const { order } = props;
	const state = useContext(Context);

	const [cookies] = useCookies();

	const code = useRef();
	const quantity = useRef();

	const [pizzaSize, setPizzaSize] = useState('12');
	const [pizzaFlavors, setPizzaFlavors] = useState([]);
	const [pizzaAditionals, setPizzaAditionals] = useState([]);

	const [currentAditional, setCurrentAditional] = useState('');
	const [aditionalsItems, setAditionalsItems] = useState([]);

	const [flavors, setFlavors] = useState([]);
	const [openFlavor, setOpenFlavors] = useState('');

	const getPizzaTitle = () => {

		switch (pizzaSize) {
		case '12':
			return 'Uma pizza grande com os sabores:';

		case '11':
			return 'Uma pizza média com os sabores:';

		case '10':
			return 'Uma pizza pequena com os sabores:';

		default:
			return 'Uma pizza grande com os sabores:';
		}
	};

	const callback = () => {
		
		let code = `${pizzaSize}*${pizzaFlavors.map(item => item.code).join('')}`;

		const quantity = 1;

		const aditionals = pizzaAditionals;

		const body = [{ quantity, code, aditionals }];

		addProduct(cookies.authorization.access_token, order.orderId, body)
			.then(() => {

				setOpenFlavors('');
				setAditionalsItems([]);
				setCurrentAditional('');

				state.setOverlay({ ...state.overlay, visible: false });
			})
			.catch(error => {
				window.alert(`Error: \n${error}`);
			});
	};

	return (
		<div
			style={{
				display: 'inherited',
				height: 'auto',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				borderSizing: 'border-box',
				position: 'relative'
			}}
		>
			<CloseButton onClick={() => state.setOverlay({...state.overlay, visible: false})}>&times;</CloseButton>
			<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
				<h1>Pizza</h1>
				<div
					style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
				>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							width: '100%',
							justifyContent: 'center'
						}}
					>
						<button
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								margin: 15,
								width: 150,
								height: 200,
								border: pizzaSize === '12' ? '1px solid #d2d2d2' : 'none',
								backgroundColor: 'transparent'
							}}
							onClick={() => {
								setPizzaSize('12');
							}}
						>
							<div
								className="pizzaImageHolder"
								style={{
									height: '100px',
									width: '100px',
									backgroundColor: 'gray'
								}}
							/>
							<span>Grande</span>
							<span>Até 12 fatias</span>
							<span>3 sabores</span>
							<span>R$ 00,00</span>
						</button>
						<button
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								margin: 15,
								width: 150,
								height: 200,
								border: pizzaSize === '11' ? '1px solid #d2d2d2' : 'none',
								backgroundColor: 'transparent'
							}}
							onClick={() => {
								setPizzaSize('11');
							}}
						>
							<div
								className="pizzaImageHolder"
								style={{
									height: '85px',
									width: '85px',
									backgroundColor: 'gray'
								}}
							/>
							<span>Média</span>
							<span>Até 9 fatias</span>
							<span>3 sabores</span>
							<span>R$ 00,00</span>
						</button>
						<button
							style={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								margin: 15,
								width: 150,
								height: 200,
								border: pizzaSize === '10' ? '1px solid #d2d2d2' : 'none',
								backgroundColor: 'transparent'
							}}
							onClick={() => {
								setPizzaSize('10');
							}}
						>
							<div
								className="pizzaImageHolder"
								style={{
									height: '60px',
									width: '60px',
									backgroundColor: 'gray'
								}}
							/>
							<span>Pequena</span>
							<span>Até 8 fatias</span>
							<span>2 sabores</span>
							<span>R$ 00,00</span>
						</button>
					</div>
				</div>
				<span>{getPizzaTitle()}</span>

				<div
					style={{
						height: 60,
						width: '100%',
						padding: 15,
						border: '.25px solid #d2d2d2',
						boxSizing: 'border-box',
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					{pizzaFlavors.map((flavor, index) => (
						<div
							key={index}
							style={{
								height: 30,
								color: '#333',
								fontSize: '11pt',
								border: '1px solid #ddd',
								borderRadius: 3,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								margin: '0 5px',
							}}
						>
							<span style={{ paddingLeft: 6, whiteSpace: 'nowrap' }}>{flavor.name}</span>
							<button
								type="button"
								style={{ border: 'none', backgroundColor: 'transparent' }}
								onClick={() => {
									setPizzaFlavors(pizzaFlavors.filter(item => item !== flavor));
								}}
							>
								&times;
							</button>
						</div>
					))}
				</div>
				
				<div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

					<div style={{ width: '100%' }}>
						<input
							type="text"
							ref={code}
							defaultValue=""
							placeholder="Digite sua pesquisa aqui"
							style={{
								width: '100%',
								boxSizing: 'border-box',
								margin: '15px 0'
							}}
							onChange={() => {
								setOpenFlavors('');
								findFlavor(
									cookies.authorization.access_token,
									code.current.value
								).then(result => {
									setFlavors(result.data);
								});
							}}
						/>
						<div
							style={{
								height: '300px',
								overflow: 'hidden scroll',
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
								padding: '0 25px',
								boxSizing: 'border-box'
							}}
						>
							{flavors &&
								flavors.map(flavor => (
									<div
										key={flavors.indexOf(flavor)}
										style={{
											height: 'min-content',
											width: '100%',
											margin: '5px 0'
										}}
									>
										<AddProductFlavor
											type="button"
											onClick={() => {
												setOpenFlavors(
													openFlavor === flavor.code ? '' : flavor.code
												);
											}}
										>
											{`${flavor.name}${
												flavor.variation === 'UNICO'
													? ''
													: ` (${flavor.variation})`
											}`}
										</AddProductFlavor>
										<div
											style={{
												display: openFlavor === flavor.code ? 'block' : 'none',
												boxSizing: 'border-box',
												border: '0.25px solid #d2d2d2',
												color: '#333',
												height: 'min-content',
												overflow: 'hidden',
												width: '90%',
												padding: 15,
												margin: 'auto'
											}}
										>
											<span>
												grupo:
												<span style={{ color: '#666' }}>{flavor.group}</span>
											</span>
											<br />
											<span>
												código:
												<span style={{ color: '#666' }}>{flavor.code}</span>
											</span>
											<br />
											<span>
												variação:
												<span style={{ color: '#666' }}>
													{flavor.variation}
												</span>
											</span>
											<br />
											<span>
												ingredientes:
												<span style={{ color: '#666' }}>
													{flavor.description.map((ingredient, index, arr) => {
														if (index === arr.length - 1) {
															return `E ${ingredient}.`;
														}
														return `${ingredient}, `;
													})}
												</span>
											</span>
											<br />
											<span>adicionais: </span>
											<div
												style={{
													height: 60,
													width: '100%',
													border: '0.25px solid #d2d2d2',
													display: 'flex',
													padding: 5,
													flexWrap: 'wrap',
													overflow: 'hidden scroll'
												}}
											>
												{aditionalsItems.map((aditional, index) => {
													return (
														<div
															key={index}
															style={{
																height: 30,
																color: '#333',
																fontSize: '11pt',
																border: '1px solid #ddd',
																borderRadius: 3,
																display: 'flex',
																alignItems: 'center',
																justifyContent: 'center',
																margin: '0 0 0 5px'
															}}
														>
															<span style={{ paddingLeft: 6, whiteSpace: 'nowrap' }}>{aditional}</span>
															<button
																type="button"
																style={{ border: 'none', backgroundColor: 'transparent' }}
																onClick={() => {
																	setAditionalsItems(aditionalsItems.filter(item => item !== aditional));
																}}
															>
																&times;
															</button>
														</div>
													);
												})}
												<input
													onChange={(e) => {
														setCurrentAditional(e.target.value);
														if (e.target.value == ',') e.target.value = '';
													}}
													type="text"
													value={currentAditional}
													style={{ border: 'none', padding: '0 0 0 6px', margin: 0, flex: 1, outline: 'none' }}
													onKeyPress={(e) => {
														if (e.key == 'Enter') {
															const temp = aditionalsItems;
															temp.push(currentAditional.replace(',', '').trim().toLocaleUpperCase());
															setAditionalsItems(temp);
															setCurrentAditional('');
														}
													}}
												/>
											</div>

											<AddProductFlavorSubmit
												onClick={() => {

													switch(pizzaSize){
													case '10':
														if(pizzaFlavors.length === 2) return window.alert('Máximo de 2 sabores para pizza pequena');
														break;
													case '11':
														if(pizzaFlavors.length === 3) return window.alert('Máximo de 3 sabores para pizza média');
														break;
													case '12':
														if(pizzaFlavors.length === 3) return window.alert('Máximo de 3 sabores para pizza grande');
														break;
													default: 
														if(pizzaFlavors.length === 3) return window.alert('Máximo de 3 sabores para pizza grande');
														break;
													}

													const f = pizzaFlavors;
													f.push(flavor);
													setPizzaFlavors(f);

													if (aditionalsItems.length !== 0) {
														const a = pizzaAditionals;

														aditionalsItems.forEach(item => {
															const add = `${flavor.code}:${item}`;
															pizzaAditionals.push(add);
														});

														setPizzaAditionals(a);
													}

													setOpenFlavors('');
													setAditionalsItems([]);
													code.current.value = '';
													setCurrentAditional('');

												}}>Adicionar</AddProductFlavorSubmit>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
			<AddProductSubmit
				onClick={() => {
					callback();
				}}
			>
				Adicionar
			</AddProductSubmit>
			<AddProductClose
				onClick={() => {
					state.setOverlay({ ...state.overlay, visible: false });
				}}
			>
				Fechar
			</AddProductClose>
		</div>
	);
};

AddProductComponent.propTypes = {
	order: PropTypes.object.isRequired
};

const BusyTableProduct = props => {
	const { quantity, title, price, subtotal } = props.product;
	const minus = /(REMOVIDO)/gi.test(title);

	const state = useContext(Context);

	return (
		<BusyTableProductButton
			style={{ backgroundColor: minus ? '#ffe8e4' : 'transparent' }}
			onClick={() => {
				state.setOverlay({visible: true, component: <ProductDescription {...props} />});
			}}
		>
			<span
				style={{
					textAlign: 'start',
					color: minus ? 'tomato' : '#333',
					marginVertical: 3
				}}
			>
				{`${quantity}x ${title}`}
			</span>
			<span
				style={{
					textAlign: 'end',
					marginVertical: 3,
					color: minus ? '#ff745b' : '#aaa'
				}}
			>
				{`un R$ ${price
					.toFixed(2)
					.toString()
					.replace('.', ',')}
             => sub R$ ${subtotal
			.toFixed(2)
			.toString()
			.replace('.', ',')}`}
			</span>
		</BusyTableProductButton>
	);
};

BusyTableProduct.propTypes = {
	product: PropTypes.object.isRequired
};

const BusyTable = props => {
	const { load } = props;

	const state = useContext(Context);

	return (
		<div
			style={{
				boxSizing: 'border-box',
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				flexGrow: 1,
				maxHeight: '100%'
			}}
		>
			<h2 style={{ color: '#888', height: 'min-content' }}>
				{load.number}.{load.order.costumer}
			</h2>
			<BusyTableProductContainer>
				{load.order.items.map((product, index) => (
					<BusyTableProduct
						key={index}
						product={product}
					/>
				))}
			</BusyTableProductContainer>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: 'min-content',
					textAlign: 'right',
					padding: '10px 0'
				}}
			>
				<span style={{ fontSize: '10pt', color: '#888' }}>
					Total de produtos R${' '}
					{load.order.total
						.toFixed(2)
						.toString()
						.replace('.', ',')}
				</span>
				<span style={{ fontSize: '10pt', color: '#888' }}>
					Taxa de Serviço R${' '}
					{load.order.serviceTax
						.toFixed(2)
						.toString()
						.replace('.', ',')}
				</span>
				<span style={{ fontSize: '14pt', color: '#666' }}>
					Final R${' '}
					{load.order.final
						.toFixed(2)
						.toString()
						.replace('.', ',')}
				</span>
			</div>
			<div style={{ minWidth: '100%', height: 'min-content' }}>
				<BusyTableAddProduct
					onClick={() => {
						state.setOverlay({
							visible: true,
							component: <AddComponent order={load.order} />
						});
					}}
				>
					Adicionar
				</BusyTableAddProduct>
				<BusyTableDetails
					onClick={()=>{state.setOverlay({visible: true, component: <TableDescription order={load.order} />});}}
				>Detalhes</BusyTableDetails>
				<BusyTableCheckout>Fechar</BusyTableCheckout>
			</div>
		</div>
	);
};

BusyTable.propTypes = {
	load: PropTypes.object.isRequired
};

const FreeTable = props => (
	<FreeTableContainer>
		<FreeTableButtom> Abrir Mesa </FreeTableButtom>
	</FreeTableContainer>
);

export const Table = props => (
	<TableContainer>
		<BusyTable {...props} />
	</TableContainer>
);
