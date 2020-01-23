import React, { useEffect, useState } from 'react';
import {Tab, TabList, Tabs, TabPanel} from 'react-tabs';
import {Input, Select, Button, TextArea, Results} from '../../components';
import 'react-tabs/style/react-tabs.css';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import {fetchDeliveries} from './functions';
import { useCookies } from 'react-cookie';
import  {districts} from '../utils';

const Map = ReactMapboxGl({
	accessToken:
        'pk.eyJ1IjoiZ2hhbml6YWRldiIsImEiOiJjazVqeHYyOTgwOGJ1M21wbHp3NHd6OGRlIn0.dkBkyxRxOupRyQ_wjGQkCA',
});

const headerOptions = {
	ref: {
		label: 'Referência',
		size: 2
	},
	code: {
		label: 'Código',
		size: 3
	},
	title: {
		label: 'Produto',
		size: 5,
	},
	description: {
		label: 'Quantidade',
		size: 5
	},
    
	unity: {
		label: 'Preço',
		size: 2,
		format: item => `R$ ${item.toFixed(2).toString().replace('.', ',')}`

	},
	price : {
		label: 'Preço Final',
		size: 2,
		format: item => `R$ ${item.toFixed(2).toString().replace('.', ',')}`
	}
};

const headerButtons = [
	{title: 'Adicionar produtos', onButtonClick: () => {console.log('OK');}}
];

 
const DeliveryInterface = () => {
	const [deliveries, setDeliveries] = useState([]);
	const [cookies] = useCookies();
	const [balloon, setBalloon] = useState(false);

	const PizzaMarker = props => {
		const {delivery} = props;
		const {street, number, district, ref} = delivery.address;

		const timeFormat = time => {
			let factor = new Date().getTime() - new Date(time).getTime();
			factor = factor / 60000;
			if(factor > 60){
				return `${Math.floor(factor/60)}h ${Math.floor(factor - (Math.floor(factor/60) * 60))}m`;
			}
			return Math.floor(factor) + ' minuto(s)';
		};


		return (
			<div>
				<div style={{display: (props.delivery.active && balloon) ? 'block' : 'none', minHeight: 120, width: 200, zIndex: 1, backgroundColor: '#fbfbfb', margin: '0 0 0 16px', padding: 10, border: '0.5px solid lightgray', borderRadius: 5}}>
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
						<span style={{fontSize: 14, fontWeight: 'bold', color: '#444'}}>{delivery.costumer}</span>
						<span style={{fontSize: 16, color: '#555'}}>{delivery.orderId}</span>
					</div>
					<span style={{fontSize: 10, color: '#666'}}>Aberto há {timeFormat(delivery.createdAt)}</span>
					<br />
					<span style={{fontSize: 11, color: '#555'}}>{street}, nº {number}, {district} - Florianópolis (referência: {ref})</span>
				</div>
				<img
					src={require('../../../assets/marker.png')}
					onMouseEnter={()=>{
						setBalloon(true);
						setDeliveries(deliveries.map(item => {
							if(item == props.delivery)
								item.active = true;
							else
								item.active = false;
							return item;
						}));
					}}
					onMouseLeave={()=> {
						setBalloon(false);
						setDeliveries(deliveries.map(item => {item.active = true; return item;}));
					}}
					style={{opacity: !props.delivery.active ? 0.15 : 1, height: 32, width: 32, margin: '0 0 0 -16px', objectFit: 'contain'}}
				/>
			</div>
		);
	};

	useEffect(()=>{
		fetchDeliveries(cookies.authorization)
			.then(result => {
				if(result.status === 200){
					result.json()
						.then(json => {
							const result = json.map(item => {item.active = true; return item;});
							setDeliveries(result);
						});
				}
			});
	}, []);

	return (
		<Tabs>
			<TabList>
				<Tab>Nova entrega</Tab>
				<Tab>Mapa de entregas</Tab>
			</TabList>

			<TabPanel style={{padding: '65px 25px 25px 25px'}}>
				
				<div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
					<h3>Entrega</h3>
					<div style={{display: 'flex', flexDirection: 'row'}}>
						<Input
							label='Código'
							placeholder="00000"
							proportion={1}
							size={5}
							onChange={()=>{}}
						/>
						<Input
							label='Nome'
							placeholder="Digite aqui o nome do cliente"
							onChange={()=>{}}
							proportion={4}
						/>
						<Input
							label='Telefone'
							placeholder="(00) 00000-0000"
							onChange={()=>{}}
							proportion={2}
						/>

					</div>

					<div style={{display: 'flex', flexDirection: 'row'}}>
						<Input
							label="Endereço"
							placeholder="Rua Altamiro Barcelos Dutra"
							onChange={()=>{}} 
							proportion={5}
						/>

						<Input
							label="Número"
							placeholder="1396"
							proportion={2}
							onChange={()=>{}} 
						/>
					</div>

					<div style={{display: 'flex', flexDirection: 'row'}}>
						<Select label="Bairro" onChange={()=>{}}>
							{districts.map((item, index)=> <option key={index} value={item}>{item}</option>)}
						</Select>

						<Select label="Cidade" onChange={()=>{}}>
							<option value="Florianópolis">Florianópolis</option>
						</Select>
					</div>

					<TextArea
						label="Adicionais"
						multiline
						placeholder="Digite aqui quaisquer informações adicionais"
						onChange={()=>{}}
					/>
				</div>
				<div style={{display: 'flex', flexDirection: 'row'}}>

					<Select label="Tipo de pagamento" onChange={()=>{}}>
						<option value="DINHEIRO">DINHEIRO</option>
						<option value="CARTAO">CARTÃO</option>
						<option value="OUTRO">OUTRO</option>
					</Select>

					<Input label='Troco (R$)' placeholder="" onChange={()=>{}}  size={2} proportion={1} />

				</div>
				<Results  headerOptions={headerOptions} headerButtons={headerButtons} />
				<div style={{display: 'flex', flexDirection: 'row', position: 'absolute', right: 25, bottom: 25}}>
					<Button title="Salvar o produto atual" onClick={()=> {}}>Salvar</Button>
					<Button title="Limpar o formulário para novo cadastro" onClick={()=> {}}>Limpar</Button>
				</div>

			</TabPanel>
			<TabPanel>
				<Map
					style="mapbox://styles/mapbox/streets-v9"
					center={[-48.428469,-27.575378]}
					zoom={[14]}
					containerStyle={{
						position: 'absolute',
						top: 65,
						left: 25,
						bottom: 25,
						right: 25
					}}
				>
					{deliveries && deliveries.map((delivery, index) => {
						return (
							<Marker key={index} anchor="bottom-left" coordinates={[delivery.address.geo.Longitude, delivery.address.geo.Latitude]}>
								<PizzaMarker delivery={delivery}/>
							</Marker>
						);
					})}

				</Map>

			</TabPanel>
			<TabPanel style={{padding: 25}}>
				
			</TabPanel>
		</Tabs>
	);
};

export default DeliveryInterface;