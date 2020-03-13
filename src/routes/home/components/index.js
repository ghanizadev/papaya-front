import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Context } from '../../../context';

import logo from '../../../assets/logo.png';

export const Background = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: column;
	padding: calc(5.25vw + 45px) 45px 45px calc(18vw + 45px);
	box-sizing: border-box;
`;

export const Logo = styled.div`
	background-image: url(${logo});
	background-size: 75%;
	background-position: center;
	background-repeat: no-repeat;
	padding: 25px;
	position: absolute;
	top: 0;
	left: 0;
	height: 12vw;
	width: 18vw;
	box-sizing: border-box;
`;

export const Header = styled.div`
	height: 3.5vw;
	color: #fff;
	background-color: #ffbe5b;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	padding: 0 25px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0 0 0 18vw;
	justify-content: space-between;
`;

export const SubHeader = styled.div`
	height: 1.75vw;
	color: #fff;
	background-color: #f1f1f1;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	padding: 0 25px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	margin: 3.5vw 0 0 18vw;
`;

export const SideBar = styled.div`
	width: 18vw;
	padding: calc(12vw + 25px) 0 25px 0;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	box-sizing: border-box;
	background-color: #fff;
`;

export const SidebarButtonContainer = styled.button`
	width: 100%;
	height: 58px;
	font-size: 18pt;
	color: #fdfdfd;
	background-color: #ffbe5b;
	text-align: center;
	padding: 5px;
	border: 0.25px solid #dcdcdc;
`;

export const SidebarButton = (props) => {
  const { selected } = props;
  return (
    <SidebarButtonContainer
      style={{
        color: selected ? '#ffbe5b' : '#fdfdfd',
        backgroundColor: selected ? '#fdfdfd' : '#ffbe5b',
      }}
      {...props}
    />
  );
};

SidebarButton.propTypes = {
  selected: PropTypes.bool,
};

SidebarButton.defaultProps = {
  selected: false,
};

export const ServerInfoButton = styled.button`
	width: 100%;
	height: 58px;
	font-size: 18pt;
	color: #333;
	background-color: whitesmoke;
	text-align: center;
	padding: 5px;
	border: 0.25px solid #dcdcdc;
`;


ServerInfoButton.propTypes = {
  selected: PropTypes.bool,
};

ServerInfoButton.defaultProps = {
  selected: false,
};

export const Container = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 5px;
	position: relative;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
`;

const OverlayBackground = styled.div`
	position: absolute;
	top: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.35);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const OverlayBox = styled.div`
	min-width: 50%;
	width: 50%;
	height: min-content;
	border-radius: 7px;
	background-color: #fff;
	border: none;
	padding: 15px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const InputContainer = styled.div`
    height: 30px;
    border: .5px solid lightgray;
    border-radius: 5px;
    padding: 3px 5px;
	max-height: 30px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    margin: 5px;
`;

const TextAreaContainer = styled.div`
    height: 100px;
    border: .5px solid lightgray;
    border-radius: 5px;
    padding: 5px;
    flex: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
    margin: 5px;
`;

const InputLabel = styled.span`
    color: gray;
    white-space: nowrap;
`;

const ButtonComponent = styled.button`
    height: 30px;
    border: none;
    min-width: 120px;
    margin: 0 0 0 5px;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    background-color: #ed9140;
	padding: 0 15px;
	margin: 5px;

	&:disabled {
	background-color: gray;
	}
`;

const InputComponent = styled.input`
    height: 100%;
    border: none;
    width: 100%;
    margin: 0 0 0 5px;
    background-color: transparent;
`;

const TextAreaComponent = styled.textarea`
    height: 100%;
    border: none;
    width: 100%;
    margin: 0 0 0 5px;
	background-color: transparent;
	padding: 3px;
	resize: none;
`;

const SelectComponent = styled.select`
    height: 100%;
    border: none;
    width: 100%;
    margin: 0 0 0 5px;
    background-color: transparent;
`;

export const ContentHeader = styled.div`
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

export const ContentContainer = styled.div`
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

export const Results = (props) => (
  <ResultsContainer>
    <ResultsTable>
      <tr style={{ backgroundColor: '#ed9140', color: 'white' }}>
        <th>Código</th>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Unidade</th>
        <th>Preço</th>
      </tr>
      {props && props.data.map((item, index) => (
        <tr style={{ backgroundColor: index & 1 ? 'whitesmoke' : 'white', color: '#444' }} key={index}>
          <td style={{ textAlign: 'center' }}>{item.code}</td>
          <td style={{ textAlign: 'center' }}>{item.name}</td>
          <td style={{ textAlign: 'center' }}>{item.description}</td>
          <td style={{ textAlign: 'center' }}>{item.unity}</td>
          <td style={{ textAlign: 'center' }}>{`R$ ${item.price.toFixed(2).toString().replace('.', ',')}`}</td>
        </tr>
      ))}
    </ResultsTable>
  </ResultsContainer>
);

export const Input = (props) => {
  const {
    label, containerStyle, disabled, proportion, multiline,
  } = props;

  let currentContainerStyle = containerStyle || {};
  if (proportion > 0) currentContainerStyle.flexGrow = proportion;
  if (multiline) currentContainerStyle = { ...currentContainerStyle, minHeight: 100, justifyContent: 'flex-start' };

  return (
    <InputContainer style={currentContainerStyle}>
      <InputLabel style={{ backgroundColor: disabled ? '#fff' : null }}>{label}</InputLabel>
      <InputComponent {...props} />
    </InputContainer>
  );
};

export const TextArea = (props) => {
  const {
    label, containerStyle, disabled, proportion,
  } = props;

  const currentContainerStyle = containerStyle || {};
  if (proportion > 0) currentContainerStyle.flexGrow = proportion;

  return (
    <TextAreaContainer style={currentContainerStyle}>
      <InputLabel style={{ backgroundColor: disabled ? '#fff' : null }}>{label}</InputLabel>
      <TextAreaComponent draggable={false} {...props} />
    </TextAreaContainer>
  );
};

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  proportion: PropTypes.number,
};

TextArea.defaultProps = {
  containerStyle: {},
  disabled: false,
  proportion: 1,
};

export const Select = (props) => {
  const {
    label, children, containerStyle, proportion,
  } = props;

  const currentContainerStyle = containerStyle || {};
  if (proportion > 0) currentContainerStyle.flexGrow = proportion;

  return (
    <InputContainer style={currentContainerStyle}>
      <InputLabel>{label}</InputLabel>
      <SelectComponent {...props}>{children}</SelectComponent>
    </InputContainer>
  );
};

export const Button = (props) => (
  <ButtonComponent {...props} />
);

export const Overlay = () => (
  <Context.Consumer>
    {({ context }) => (
      <OverlayBackground
        style={{ display: context.overlay.visible ? 'flex' : 'none' }}
      >
        <OverlayBox>{context.overlay.component}</OverlayBox>
      </OverlayBackground>
    )}
  </Context.Consumer>
);

Results.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  proportion: PropTypes.number,
  multiline: PropTypes.bool,
};

Input.defaultProps = {
  proportion: 0,
  multiline: false,
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  proportion: PropTypes.number,
};

Select.defaultProps = {
  proportion: 1,
  disabled: false,
  containerStyle: {},
  children: [],
};
