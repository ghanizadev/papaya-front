import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputContainer = styled.div`
    height: 30px;
    border: .5px solid lightgray;
    border-radius: 5px;
    padding: 3px 5px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin: 5px;
`;

const InputLabel = styled.span`
    color: gray;
    white-space: nowrap
`;

const ButtonComponent = styled.button`
    height: 30px;
    border: none;
    width: 120px;
    margin: 0 0 0 5px;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    background-color: #ed9140;
`;

const InputComponent = styled.input`
    height: 100%;
    border: none;
    width: 100%;
    margin: 0 0 0 5px;
    background-color: transparent;
`;

const SelectComponent = styled.select`
    height: 100%;
    border: none;
    width: 100%;
    margin: 0 0 0 5px;
    background-color: transparent;
`;

export const Header = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	width: 100%;
	height: 40px;
	max-height: 40px;
	background-color: #ffbe5b;
	box-sizing: border-box;
	padding: 0 15px;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	font-size: 14pt;
	border-radius: 5px 5px 0 0;
	color: #fdfdfd;
`;

export const Container = styled.div`
    padding: 65px 25px 25px 25px;
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const ResultsTable = styled.table`
    margin: 5px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

const ResultsContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid gray;
    border-radius: 5px;
    margin: 5px;
    box-sizing: border-box;
    overflow: hidden scroll;
    position: relative;

`;

export const Results = props => {
	return (
		<ResultsContainer>
			<ResultsTable>
				<tr style={{backgroundColor: '#ed9140', color: 'white'}}>
					<th>Código</th>
					<th>Nome</th>
					<th>Descrição</th>
					<th>Unidade</th>
					<th>Preço</th>
				</tr>
				{props && props.data.map((item, index) => {
					return (
						<tr style={{backgroundColor: index & 1 ? 'whitesmoke': 'white', color: '#444'}} key={index}>
							<td style={{textAlign: 'center'}}>{item.code}</td>
							<td style={{textAlign: 'center'}}>{item.name}</td>
							<td style={{textAlign: 'center'}}>{item.description}</td>
							<td style={{textAlign: 'center'}}>{item.unity}</td>
							<td style={{textAlign: 'center'}}>{`R$ ${item.price.toFixed(2).toString().replace('.', ',')}`}</td>
						</tr>
					);
				})}
			</ResultsTable>
		</ResultsContainer>
	);
};

export const Input = props => {
	const {label, containerStyle, disabled} = props;
    
	return (
		<InputContainer style={containerStyle}>
			<InputLabel style={{backgroundColor: disabled ? '#fff': null}}>{label}</InputLabel>
			<InputComponent {...props} />
		</InputContainer>
	);
};

export const Select = props => {
	const {label, children, containerStyle} = props;
    
	return (
		<InputContainer style={containerStyle}>
			<InputLabel>{label}</InputLabel>
			<SelectComponent {...props}>{children}</SelectComponent>
		</InputContainer>
	);
};

export const Button = props => {
	return (
		<ButtonComponent {...props} />
	);
};

Results.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object)
};

Input.propTypes = {
	label: PropTypes.string.isRequired,
	containerStyle: PropTypes.object,
	disabled: PropTypes.bool,
};

Select.propTypes = {
	label: PropTypes.string.isRequired,
	containerStyle: PropTypes.object,
	disabled: PropTypes.bool,
	children: PropTypes.any
};