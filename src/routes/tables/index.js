import React, {useState, useEffect} from 'react';
import { Tables, Header, Table, ScrollView} from './components';
import {findAllTables} from './components/functions';

const TablesContainer = () => {
	const [tables, setTables] = useState(null);
	const [timer, setTimer] = useState(null);

	useEffect(() => {
		findAllTables('')
			.then(result => {
				setTables(result.data);
			})
			.catch(error => {
				window.alert(error.message);
			});
            
		keepUpdate();
		return clearInterval(timer);
	}, []);

	const keepUpdate = () => {
		const t = setInterval(() => {
			findAllTables('')
				.then(result => {
					setTables(result.data);
				})
				.catch(error => {
					window.alert(error.message);
				});
		}, 2000);
		setTimer(t);
	};

	const dataCallback = data => {
		setTables(data);
	};


	return (
		<Tables>
			<Header>Mesas</Header>
			<ScrollView>
				{tables && tables.map(table => <Table key={tables.indexOf(table)} load={table} callback={dataCallback} />) }
				<div style={{minWidth: 7}} />
			</ScrollView>
		</Tables>
	);
};

export default TablesContainer;
