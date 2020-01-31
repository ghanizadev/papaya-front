import React, {useState, useContext} from 'react';
import { Input, Button } from '../../../components';
import {openTable} from './functions';

const {dialog} = window.require('electron').remote;

const openFlow = (location, body) => {
	try{
		const search = location.pathname.substring(location.pathname.indexOf('?'));
		const params = new URLSearchParams(search);
		const access_token = params.get('access_token');

		openTable(access_token, body)
			.then(result => {
				if (result.status === 201){
					dialog.showMessageBox({
						type: 'info',
						buttons: ['Ok'],
						defaultId: 0,
						cancelId: 0,
						title: 'Sucesso',
						message: `A mesa ${result.data.number} foi aberta!`,
						detail: `A ordem do pedido é o ${result.data.order.orderId}`,
					});
					window.close();
				}else if(result.status === 403){
					dialog.showMessageBox({
						type: 'error',
						buttons: ['Ok'],
						defaultId: 0,
						cancelId: 0,
						title: 'Erro',
						message: 'Não autorizado',
						detail: 'Tente refazer o login e repita a operação',
					});
				} else if(result.status === 400){
					let title;
					let message;
					switch(result.data.error){
						case 'invalid_table':
							title = 'Mesa já em uso';
							message = `A mesa que você está tentando abrir (${body.tableNumber}) já está em uso`;
							break;
						default:
							title = result.data.error;
							message = result.data.error_description;
							break;
					}
					dialog.showMessageBox({
						type: 'error',
						buttons: ['Ok'],
						defaultId: 0,
						cancelId: 0,
						title: 'Erro',
						message: title,
						detail: message,
					});
				}
			})
			.catch(error => {
				dialog.showMessageBox({
					type: 'error',
					buttons: ['Ok'],
					defaultId: 0,
					cancelId: 0,
					title: 'Erro',
					message: 'Um erro inesperado aconteceu',
					detail: 'Caso persista, contacte o administrador',
				});
				console.error(error);
			});
	}catch(e){
		console.log(e);
		window.alert(e);
	}
}

const OpenTableEndpoint = props => {
	const { location } = props;
	const [body, setBody] = useState({tableNumber: 1});

	return(
		<div style={{width: 300, height: 120, display: 'flex', alignContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
			<Input containerStyle={{width: 270}} label="Mesa" type="number" defaultValue={1} onChange={e => setBody({...body, tableNumber: e.target.value})}/>
			<Input containerStyle={{width: 270}} label="Usuário" placeholder="Visitante" onChange={e => setBody({...body, customer: e.target.value})} />
			<Button onClick={()=>{''
				openFlow(location, body);
			}}>Abrir Mesa</Button>
		</div>
	);
};

export default OpenTableEndpoint;