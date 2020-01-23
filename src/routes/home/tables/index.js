import React from 'react';
import { Tables, Table, ScrollView} from '../../components';
import {Consumer} from '../../../context';

const getData = data => {
	let result = [];
	if (data.length > 0) {
		result = data.map((table, index) => <Table key={index} load={table} />);
		return result;
	}
	return <span>Nenhuma mesa aberta!</span>;
};

const TablesInterface = () =>  {

	return (
		<Consumer>
			{({context}) => (
				<Tables>
					<ScrollView>
						{getData(context.tables)}
						<div style={{minWidth: 7}} />
					</ScrollView>
				</Tables>)}
		</Consumer>
	);
};

export default TablesInterface;
