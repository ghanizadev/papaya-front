import React, { useEffect, useState } from 'react';
import {Tab, TabList, Tabs, TabPanel} from 'react-tabs';
import {Input, Select, Button, TextArea} from '../../components';
import 'react-tabs/style/react-tabs.css';
import ReactMapboxGl, { Layer, Marker } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiZ2hhbml6YWRldiIsImEiOiJjazVqeHYyOTgwOGJ1M21wbHp3NHd6OGRlIn0.dkBkyxRxOupRyQ_wjGQkCA',
  });

const PizzaMarker = () => {
    const [balloon, setBalloon] = useState(false);
    return (
        <div>
            <div style={{display: balloon ? 'block' : 'none', height: 80, width: 120, backgroundColor: '#fbfbfb', margin: '0 0 0 16px', padding: 10, border: '0.5px solid lightgray', borderRadius: 5}}>
                <span>teste</span>
            </div>
            <img
                src={require('../../../assets/marker.png')}
                onMouseEnter={()=>setBalloon(true)}
                onMouseLeave={()=>setBalloon(false)}
                style={{height: 32, width: 32, margin: '0 0 0 -16px', objectFit: 'contain'}}
            />
        </div>
    )
}
 
const DeliveryInterface = props => {

    return (
		<Tabs>
			<TabList>
				<Tab>Cadastro de cliente</Tab>
				<Tab>Alterar dados</Tab>
				<Tab>Alterar Cliente</Tab>
			</TabList>

			<TabPanel style={{padding: 25}}>
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={[-48.427276, -27.575254]}
                zoom={[14]}
                containerStyle={{
                    position: 'absolute',
                    top: 65,
                    left: 25,
                    bottom: 25,
                    right: 25
                }}
                >
                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>

                </Layer>
                <Marker anchor="bottom-left" coordinates={[-48.427276, -27.575254]}>
                    <PizzaMarker />
                </Marker>
            </Map>

			</TabPanel>
			<TabPanel style={{padding: 25}}>
				
			</TabPanel>
            <TabPanel style={{padding: 25}}>
				
            </TabPanel>
		</Tabs>
    );
}

export default DeliveryInterface;