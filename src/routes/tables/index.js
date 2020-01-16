import React, {useState, useEffect, useContext} from 'react';
import { Tables, Header, Table, ScrollView} from './components';
import {findAllTables} from './components/functions';
import {Context, Consumer} from '../../context';
import io from 'socket.io-client';

const TablesContainer = () => {

	const state = useContext(Context);

	useEffect(() => {
		findAllTables('')
			.then(result => {
				state.setContext({...state.context, serverData: result.data });
			})
			.catch(error => {
				console(error);
			});

		const socket = io.connect(process.env.REACT_APP_API);
		socket.on('update', () => {
			findAllTables('')
				.then(result => {
					state.setContext({...state.context, serverData: result.data });
				})
				.catch(error => {
					console.log(error);
				});
		});
	}, []);

	return (
		<Consumer>
			{({context}) => (<Tables>
				<Header>Mesas</Header>
				<ScrollView>
					{context.serverData && context.serverData.map((table, index) => <Table key={index} load={table} />) }
					<div style={{minWidth: 7}} />
				</ScrollView>
			</Tables>)}
		</Consumer>
	);
};

export default TablesContainer;
