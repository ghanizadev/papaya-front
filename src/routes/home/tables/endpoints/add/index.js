import React from 'react';
import styled from 'styled-components';

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

				state.setContext({ ...state.context,  overlay: { visible: false } });
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
					state.setContext({ ...state.context,  overlay: { visible: false } });
				}}
			>
				Fechar
			</AddProductClose>
		</div>
	);
};

const AddComponent = props => {
	const state = useContext(Context);

	return (
		<div style={{position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row'}}>
			<AddPizza onClick={()=> state.setContext({...state.context, overlay: { visible: true, component: <AddPizzaComponent {...props} />}}) } />
			<AddProduct onClick={()=> state.setContext({...state.context, overlay: { visible: true, component: <AddProductComponent {...props} />}}) } />
		</div>
	);

};