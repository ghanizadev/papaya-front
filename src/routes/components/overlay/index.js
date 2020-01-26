import React from 'react';
import CheckoutInterface from './checkoutInterface';
import {order} from '../../home/utils/mock';
import { Provider } from './checkoutContext';


export const Checkout = () => {
	return (
		<Provider>
			<CheckoutInterface data={order} />
		</Provider>
	);
};