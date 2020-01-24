import React, {useState, useEffect, useContext} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Consumer, Context } from './checkoutContext';

const Tab = styled.button`
	height: 50px;
	width: 100%;
	border-style: solid;
	border-width: 1px 0 1px 1px;
	border-color: #aaa;
	border-radius: 5px 0 0 5px;
	background-color: whitesmoke;
	margin: 1px 1px;
`;

const TabList = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	border: none;
`;

const TabPanel = styled.div`
	flex: 3;
	display: flex;
	height: 100%;
	flex-direction: column;
	padding: 25px;
	border-style: solid;
	border-width: 1px;
	border-color: #aaa;
	border-radius: 0 5px 5px 5px;
	background-color: whitesmoke;
	box-sizing: border-box;
	margin: 1px 0;
`;

const Container = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 25px;
	box-sizing: border-box;
`;

const UserCheckoutContainer = styled.div`
	width: 100%;
	min-height: 100%;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
`;

const UserItemsContainer = styled.div`
	width: 40%;
	min-height: 100%;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
`;

const ItemsScrollView = styled.div`
	width: 100%;
	flex: 1;
	padding: 5px;
	overflow: hidden scroll;
	background-color: white;
`;

const ItemButtonContainer = styled.button`
	border: none;
	background-color: whitesmoke;
	height: 40px;
	width: 100%;
`;

const PaymentContainer = styled.div`
	width: 60%;
	min-height: 100%;
	display: flex;
	flex-direction: column;
`;

const Payment = () => {
	return (
		<Consumer>
			{({context}) => {
				return (<PaymentContainer>
					<h3>Pagamento</h3>
					{context.selectedItems.map((item, index) => (<span key={index}>{item.code} - {item.title}</span>))}
				</PaymentContainer>);
			}}
		</Consumer>

	);
};

const ItemButton = props => {
	const {item} = props;
	return (
		<ItemButtonContainer {...props}>
			<div>{item.title}</div>
			<div>{item.description}</div>
		</ItemButtonContainer>
	);
};

ItemButton.propTypes = {
	item: PropTypes.object.isRequired
};

const UserItems = props => {
	const {items} = props;
	const [selectedItems, setSelectedItems] = useState([]);

	const state = useContext(Context);

	const selectItem = item => {
		let local = selectedItems;

		if(local.includes(item)){
			local = local.filter(query => query !== item);
			setSelectedItems(local);
		}
		else{
			local.push(item);
			setSelectedItems(local);
		}

		state.setContext({...state.context, selectedItems: local});
	};

	return (
		<UserItemsContainer>
			<h3>Itens</h3>
			<ItemsScrollView>
				{items.map((item, index) => {
					return (
						<ItemButton item={item} onClick={() => {selectItem(item);}} key={index} />
					);
				})}
			</ItemsScrollView>
		</UserItemsContainer>
	);
};

UserItems.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const UserCheckout = props => {
	const {user} = props;

	return (
		<UserCheckoutContainer {...props}>
			<UserItems items={user.items} />
			<Payment/>
		</UserCheckoutContainer>
	);
};

UserCheckout.propTypes = {
	user: PropTypes.object
};

UserCheckout.defaultProps = {
	user: {name: 'Usuário', items: []}
};

const CheckoutInterface = props => {
	const {data} = props;
	const [page, setPage] = useState(0);
	const [userData, setUserData] = useState([]);

	const getUsers = () => {
		let users = [];

		data.items.forEach((item) => {
			if(!users.includes(item.owner)){
				users.push(item.owner);
			}
		});

		users = users.map(user => {
			const filtered = data.items.filter((item) => item.owner === user);

			return {name: user, items: filtered};
		});
		

		return users;
	};

	const state = useContext(Context);

	useEffect(()=>{
		setUserData(getUsers());
	}, []);

	useEffect(() => {
		state.setContext({...state.context, selectedItems: []});
	}, [page]);

	return (
		<Container>
			<TabList>
				{userData.map((user,index) => <Tab style={{zIndex: page === index ? 1 : null}} onClick={() => setPage(index)} key={index}>{user.name}</Tab>)}
			</TabList>
			<TabPanel>
				{userData.map((user,index) =>{
					return (
						<UserCheckout user={user} style={{display: page === index ? null : 'none'}} key={index} />
					);
				})}
			</TabPanel>
		</Container>
	);
};

CheckoutInterface.propTypes = {

	data: PropTypes.object.isRequired
};

export default CheckoutInterface;