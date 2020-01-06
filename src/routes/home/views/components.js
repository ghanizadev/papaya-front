import React, {useContext} from 'react';
import styled from 'styled-components';
import {Context, Consumer} from '../../../context';

export const Tables = styled.div`
    padding: 65px 25px 25px 25px;
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
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

const TableContainer = styled.div`
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
    margin: 25px 15px;
    padding: 15px;
    min-width: 16vw;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
`;

export const ScrollView = styled.div`    display: flex;
flex-direction: column;
    overflow: scroll hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start
    width: 100%;
    height: 100%;
`;

const FreeTableContainer = styled.div`
    min-height: 75%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FreeTableButtom = styled.button`
    height: min-content;
    font-weight: bold;
    background-color: transparent;
    border: none;
    color: #40bd63;
    border-bottom: 1px solid lightgreen;
    font-size: 18pt;
`;

const BusyTableProductContainer = styled.div`
    height: min-content;
    display: flex;
    flex-direction: column;
`;

const BusyTableProduct = styled.button`
    height: 30px;
    background-color: #fdfdfd;
    width: 100%;
    border: none;
    color: #888;
    border-bottom: 1px solid #aaa;
    font-size: 11pt;
    display: flex;
    justify-content: space-between;
`;

const BusyTableAddProduct = styled.button`
    height: 30px;
    background-color: #fdfdfd;
    width: 100%;
    border: none;
    color: #40bd63;
    border-bottom: 1px solid #40bd63;
    font-size: 14pt;
`;

const BusyTableCheckout = styled.button`
    height: 30px;
    background-color: #fdfdfd;
    width: 100%;
    border: none;
    color: tomato;
    border-bottom: 1px solid tomato;
    font-size: 14pt;
`;

const BusyTableDetails = styled.button`
    height: 30px;
    background-color: #fdfdfd;
    width: 100%;
    border: none;
    color: #d9c31c;
    border-bottom: 1px solid #d9c31c;
    font-size: 14pt;
`;

export const Background = styled.div`
    position:relative;
    height: 100%;
    width: 100%;
    display: flex;
    box-sizing: border-box;
    padding: 15px;
`;

const FieldBox = styled.button`
    min-width: 100%;
    min-height: 100px;
    max-height: 100px;
    background-color: #fdfdfd;
    border: 0.25px solid #f2f2f2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px 25px;
    box-sizing: border-box;
    margin: 6px 10px 10px 0;
`;

const Field = ({item}) => {
    return(
        <FieldBox style={{fontSize: '10pt', color:'#888'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                <span style={{fontSize: '16pt', fontWeight: 'bold', color: '#333'}}>{`${item.code} - ${item.name}`}</span>
                <span >{item.variation}</span>
                <span>Grupo {item.group}/Subgrupo {item.subgroup}</span>
            </div>
            <span style={{fontSize: '18pt', width: '100%', textAlign:"right",color: '#333'}}>R$ {item.price.toFixed(2).replace(".", ',')}</span>
        </FieldBox>
    );
}

const FieldContainer = styled.div`
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 10px 0 rgba(0, 0, 0, 0.12);
    width: 100%;
    flex: 1;
    display: flex;
    align-items: start;
    flex-direction: column;
    overflow: hidden scroll;
`;


export const ResultField = (props) => {
    const {data} = props;
    return (
        <FieldContainer>
            {data.map((item, index) => 
                <Field key={index} item ={item} />
            )}
        </FieldContainer>
    );
}

const BusyTable = props => {
    const { number, status } = props;
    const name = status ? status : "Mesa livre"

    const state = useContext(Context);

    return (
        <div style={{boxSizing: 'border-box', width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1}}>
            <h2 style={{color: '#888', height: 'min-content'}}>{number}. {name}</h2>
            <BusyTableProductContainer style={{flexGrow: 1}}>
                <BusyTableProduct><span>1x Produto A</span><span>R$ 0,00</span></BusyTableProduct>
                <BusyTableProduct><span>2x Produto B</span><span>R$ 0,00</span></BusyTableProduct>
                <BusyTableProduct><span>1x Produto C</span><span>R$ 0,00</span></BusyTableProduct>
                <BusyTableProduct><span>3x Produto D</span><span>R$ 0,00</span></BusyTableProduct>
            </BusyTableProductContainer>
            <div style={{minWidth: '100%', height: 'min-content'}}>
                <BusyTableAddProduct onClick={() => {state.setOverlay({visible: true, message: "Produtos", callback: () => console.log("Ok")})}}>Adicionar</BusyTableAddProduct>
                <BusyTableDetails>Detalhes</BusyTableDetails>
                <BusyTableCheckout>Fechar</BusyTableCheckout>
            </div>
        </div>
    );
}

const FreeTable = props => {
    return (
        <FreeTableContainer>
            <FreeTableButtom > Abrir Mesa </FreeTableButtom>
        </FreeTableContainer>
    );
}

export const Table = props => {
    return (
        <TableContainer>
            <BusyTable {...props} />
        </TableContainer>
    );
}