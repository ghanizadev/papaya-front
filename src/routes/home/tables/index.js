import React, { useEffect, useContext } from 'react';
import { Tables, Table, ScrollView} from '../../components';
import {findAllTables} from '../../components/functions';
import {Consumer, Context} from '../../../context';
import { useCookies } from 'react-cookie';

const getData = data => {
	let result = [];
	if (data.length > 0) {
		result = data.map((table, index) => <Table key={index} load={table} />);
		return result;
	}
	return <span>Nenhuma mesa aberta!</span>;
};

const TablesInterface = () =>  {
	const state = useContext(Context);
	const [cookies] = useCookies();

	useEffect(()=> {
		findAllTables(cookies.authorization.access_token)
			.then(result => {
				if(result.status === 200)
					state.setContext({...state.context, tables: result.data });
			})
			.catch(error => {
				console.log(error);
			});
	},[]);

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
