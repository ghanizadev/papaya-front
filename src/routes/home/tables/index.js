import React, {useEffect, useContext} from 'react';
import { Tables, Table, ScrollView} from '../../components';
import {findAllTables} from '../../components/functions';
import {Context, Consumer} from '../../../context';
import io from 'socket.io-client';

const TablesInterface = () => {

	const state = useContext(Context);

	useEffect(() => {
		findAllTables('')
			.then(result => {
				state.setContext({...state.context, serverData: result.data });
			})
			.catch(error => {
				console.log(error);
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

	const getData = data => {
		let result = [];
		if (data.length > 0) {
			result = data.map((table, index) => <Table key={index} load={table} />);
			return result;
		}
		return <span>Nenhuma mesa aberta!</span>;
	};

	return (
		<Consumer>
			{({context}) => (
				<Tables>
					<ScrollView>
						{/*context.serverData && context.serverData.map((table, index) => <Table key={index} load={table} />) */}
						{getData(context.serverData)}
						<div style={{minWidth: 7}} />
					</ScrollView>
				</Tables>)}
		</Consumer>
	);
};

export default TablesInterface;
