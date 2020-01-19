import React from 'react';
import {Tab, TabList, Tabs, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const ManagementInterface = props => {
    return (
		<Tabs>
			<TabList>
				<Tab>Desempenho do dia</Tab>
				<Tab>Adicionar Cliente</Tab>
				<Tab>Alterar Cliente</Tab>
			</TabList>

			<TabPanel style={{padding: 25}}>
			</TabPanel>
			<TabPanel style={{padding: 25}}>
				
			</TabPanel>
            <TabPanel style={{padding: 25}}>
				
            </TabPanel>
		</Tabs>
    );
}

export default ManagementInterface;