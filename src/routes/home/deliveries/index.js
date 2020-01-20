import React, { useEffect, useState } from 'react';
import {Tab, TabList, Tabs, TabPanel} from 'react-tabs';
import {Input, Select, Button, TextArea} from '../../components';
import 'react-tabs/style/react-tabs.css';
import ReactMapboxGl, { Layer, Marker } from 'react-mapbox-gl';
import {fetchDeliveries} from './functions';
import { useCookies } from 'react-cookie';

const Map = ReactMapboxGl({
    accessToken:
        'pk.eyJ1IjoiZ2hhbml6YWRldiIsImEiOiJjazVqeHYyOTgwOGJ1M21wbHp3NHd6OGRlIn0.dkBkyxRxOupRyQ_wjGQkCA',
  });


 
const DeliveryInterface = props => {
    const [deliveries, setDeliveries] = useState([]);
    const [cookies] = useCookies();
    const [balloon, setBalloon] = useState(false);

    const PizzaMarker = props => {
        const {delivery} = props;
        const {street, number, district, ref} = delivery.address;
        let factor = new Date().getTime() - new Date(delivery.createdAt).getTime();
        factor = factor / 60000;
        if(factor > 60){
            factor = `${Math.floor(factor/60)}h ${Math.floor(factor - (Math.floor(factor/60) * 60))}m`
        } else factor = Math.floor(factor) + ' minutos';

        return (
            <div>
                <div style={{display: (props.delivery.active && balloon) ? 'block' : 'none', minHeight: 120, width: 200, zIndex: 1, backgroundColor: '#fbfbfb', margin: '0 0 0 16px', padding: 10, border: '0.5px solid lightgray', borderRadius: 5}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
                        <span style={{fontSize: 14, fontWeight: 'bold', color: '#444'}}>{delivery.costumer}</span>
                        <span style={{fontSize: 16, color: '#555'}}>{delivery.orderId}</span>
                    </div>
                    <span style={{fontSize: 10, color: '#666'}}>Aberto há {factor}</span>
                    <br />
                    <span style={{fontSize: 11, color: '#555'}}>{street}, nº {number}, {district} - Florianópolis (referência: {ref})</span>
                </div>
                <img
                    src={require('../../../assets/marker.png')}
                    onMouseEnter={()=>{
                        setBalloon(true);
                        setDeliveries(deliveries.map(item => {
                            if(item == props.delivery)
                                item.active = true;
                            else
                                item.active = false;
                            return item
                        }))
                    }}
                    onMouseLeave={()=> {
                        setBalloon(false);
                        setDeliveries(deliveries.map(item => {item.active = true; return item}))
                    }}
                    style={{opacity: !props.delivery.active ? 0.15 : 1, height: 32, width: 32, margin: '0 0 0 -16px', objectFit: 'contain'}}
                />
            </div>
        )
    }

    useEffect(()=>{
        fetchDeliveries(cookies.authorization)
        .then(result => {
            if(result.status === 200){
                result.json()
                .then(json => {
                    const result = json.map(item => {item.active = true; return item});
                    setDeliveries(result);
                })
            }
        })
    }, [])

    return (
		<Tabs>
			<TabList>
                <Tab>Nova entrega</Tab>
				<Tab>Mapa de entregas</Tab>
				<Tab>Alterar Cliente</Tab>
			</TabList>

			<TabPanel>
				
			</TabPanel>
			<TabPanel>
            <Map
                style="mapbox://styles/mapbox/streets-v9"
                center={[-48.428469,-27.575378]}
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
                {deliveries && deliveries.map((delivery, index) => {
                    return (
                    <Marker key={index} anchor="bottom-left" coordinates={[delivery.address.geo.Longitude, delivery.address.geo.Latitude]}>
                        <PizzaMarker delivery={delivery}/>
                    </Marker>
                    );
                })}


            </Map>

			</TabPanel>
            <TabPanel style={{padding: 25}}>
				
            </TabPanel>
		</Tabs>
    );
}

export default DeliveryInterface;