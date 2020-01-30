import React, {useState, useContext} from 'react';
import { Input, Button } from '../../../components';
import {openTable} from './functions';
import {useCookies} from 'react-cookie';
import { Context } from '../../../../../context';

const {dialog} = window.require('electron').remote;
const ipcRenderer = window.require('electron').ipcRenderer;

const OpenTableEndpoint = props => {
	const { navigate } = props;
	const [body, setBody] = useState({tableNumber: 1});

	const state = useContext(Context);

	return(
		<div style={{width: 300, height: 120, display: 'flex', alignContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
			<Input containerStyle={{width: 270}} label="Mesa" type="number" defaultValue={1} onChange={e => setBody({...body, tableNumber: e.target.value})}/>
			<Input containerStyle={{width: 270}} label="Usuário" placeholder="Visitante" onChange={e => setBody({...body, customer: e.target.value})} />
			<Button onClick={()=>{
				try{
					openTable(state.context.auth.access_token, body)
						.then(result => {
							if (result.status === 201){
								dialog.showMessageBox({
									type: 'info',
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
									defaultId: 0,
									cancelId: 0,
									title: 'Erro',
									message: 'Não autorizado',
									detail: 'Tente refazer o login e repita a operação',
								});
							} else if(result.status === 400){
								dialog.showMessageBox({
									type: 'error',
									defaultId: 0,
									cancelId: 0,
									title: 'Erro',
									message: result.data.error,
									detail: result.data.error_description,
								});
							}
						})
						.catch(error => {
							dialog.showMessageBox({
								type: 'error',
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
			}}>Abrir Mesa</Button>
		</div>
	);
};

export default OpenTableEndpoint;