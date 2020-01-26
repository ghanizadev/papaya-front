import styled from 'styled-components';

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

const InputComponent = styled.input`
    height: 100%;
    border: none;
    width: 100%;
    margin: 0 0 0 5px;
    background-color: transparent;
`;

export const Button = styled.button`
	width: 100%;
	height: 58px;
	font-size: 18pt;
	color: #6b6b6b;
	background-color: #fbfbfb;
	text-align: center;
	padding: 5px;
	border: 0.25px solid #dcdcdc;
`;