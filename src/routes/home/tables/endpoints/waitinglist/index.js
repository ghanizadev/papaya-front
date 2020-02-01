import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Context } from '../../../../../context';

const ipcRenderer = window.require('electron').ipcRenderer;

const Container = styled.div`
	width: 500px;
	height: 800px;
	box-sizing: border-box;
	overflow: auto;
	padding: 15px;
`;

const Item = styled.button`
	width: 100%;
	height: 50px;
	display: flex;
	border: none;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 15px;
	background-color: #f5f5f5;
	box-sizing: border-box;
	margin: 0 0 5px 0;
	transition: all .2s ease-in;

	&:hover {
		transform: scale(1.05);
		background-color: #ed9140;
	}

	&:hover * {
		color: #f5f5f5;
	}

`;

const Name = styled.div`
	font-size: 14pt;
	color: #333;
	font-weight: bold;
`;

const TimeComponent = styled.div`
	font-size: 10pt;
	color: #666;
`;

const openTable = ( token, name, id) => {
	ipcRenderer.send('openModal', {
		title: 'Abrir mesa',
		size: {
			width: 300,
			height: 120,
		},
		modal: true,
		url: `/open?access_token=${token}&name=${name}&id=${id}`,
		resizable: false,
		fulscreenable: false
	});

	window.close();
}

const fetchList = token =>
	axios.get(`${process.env.REACT_APP_API}/api/v1/waitinglist`,
	{
		headers:{
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		validateStatus: status => status < 500
	})

const WaitingListEndpoint = props => {
	const {location} = props;

	const [list, setList] = useState();

	const search = location.pathname.substring(location.pathname.indexOf('?'));
	const params = new URLSearchParams(search);
	const access_token = params.get('access_token');

	useEffect(() => {
		fetchList(access_token)
		.then(result => {
			if(result.status === 200){
				setList(result.data);
				return;
			}
			window.alert('Erro ao tentar atualizar a lista ('+ result.status +')')
		})
		.catch(() => window.alert('Erro ao tentar atualizar a lista'));
	}, [])

	const formatTime = time => {
		let factor = new Date().getTime() - new Date(time).getTime();
		factor = factor / 60000;
		
		if(factor > 60){
			return `${Math.floor(factor/60)}h ${Math.floor(factor - (Math.floor(factor/60) * 60))}m`
		}
		return Math.floor(factor) + ' minuto(s)';
	};


	return (
		<Container>
			{list && list.map((item, index) => 
						<Item onClick={() => openTable(access_token, item.name, item._id)}>
							<Name>{index + 1}. {item.name}</Name>
							<TimeComponent>Na lista há {formatTime(item.createdAt)}</TimeComponent>
						</Item>
				)}
		</Container>
	);

};

export default WaitingListEndpoint;