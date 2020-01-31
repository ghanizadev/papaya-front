import React from 'react';
import styled from 'styled-components';

const search = location.pathname.substring(location.pathname.indexOf('?'));
const params = new URLSearchParams(search);
const access_token = params.get('access_token');

const Container = styled.div`
	width: 400px;
	height: 600px;

`;

const WaitingListEndpoint = () => {
	return (
		<Container>

		</Container>
	);

};

export default WaitingListEndpoint;