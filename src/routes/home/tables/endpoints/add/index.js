import React, {
  useState, Children, useReducer, useEffect, useRef,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import path from 'path';
import {
  Input, Button, Search, TextArea,
} from '../../../../components';
import { getFlavor, getTables, getPizzaSizes } from './function';
import { Select } from '../../../components';

import arrow from '../../../../../assets/arrow.png';
import addPizza from '../../../../../assets/add_pizza.png';
import addOthers from '../../../../../assets/add_others.png';
import addSmall from '../../../../../assets/add_small.png';
import addMedium from '../../../../../assets/add_medium.png';
import addLarge from '../../../../../assets/add_large.png';

const Container = styled.div`
	width: 800px;
	height: 600px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

const Wrapper = styled.div`
	width: 800px;
	height: 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	box-sizing: border-box;
	transition: all .3s;
	position: relative;
`;

const ProductButton = styled.button`
	height: 120px;
	width: 120px;
	margin: 15px;
	border: none;
  background-color: transparent;
	transition: all .2s ease-in;

	&:hover {
		transform: scale(1.05);
		box-shadow: 5px 10px 8px #888888;
	}
`;

const CloseButtonContainer = styled.button`
	width: 30px;
	height: 30px;
	border-radius: 15px;
	border: none;
	position: absolute;
	top: 5px;
	right: 5px;
	background-color: tomato;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	font-weight: bold;
`;

const CloseButton = (props) => {
  const { onClose } = props;
  return (
    <CloseButtonContainer onClick={() => onClose()}>&times;</CloseButtonContainer>
  );
};

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
};

const FlavorBoxContainer = styled.div`
	height: 0;
	opacity: 0;
	border: none;
	border-radius: 15px;
	width: 500px;
	margin: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	transition: all 500ms ease-in;
	overflow: hidden;
`;

const FlavorItemContainer = styled.div`
	height: 150px;
	width: 480px;
	margin: 0 5px;
	border-radius: 15px;
	border: solid 1px whitesmoke;
	padding: 15px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
	box-sizing: border-box;
`;

const NextButton = styled.button`
	height: 42px;
	width: 42px;
	margin: 0 5px;
	border: none;
  background-color: transparent;
	padding: 5px;
	box-sizing: border-box;
`;

const FlavorItem = (props) => {
  const { flavor, onRemove } = props;

  return (
    <FlavorItemContainer>
      <h3 style={{ margin: 0 }}>{flavor.name}</h3>
      <h5 style={{ margin: 0 }}>{flavor.code}</h5>
      <p style={{ margin: 0, fontSize: 10, color: '#666' }}>{flavor.description.join(', ')}</p>
      <TextArea label="Adicionais" />
      <CloseButton onClose={onRemove} />
    </FlavorItemContainer>
  );
};

FlavorItem.propTypes = {
  flavor: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const Page = (props) => {
  const { children, visible } = props;

  return (
    <Wrapper style={{ height: visible ? 600 : 0 }}>
      {children}
    </Wrapper>
  );
};

Page.propTypes = {
  children: PropTypes.any,
  visible: PropTypes.bool.isRequired,
};

Page.defaultProps = {
  children: [],
};

export const FlavorBox = (props) => {
  const { children, onConfirm, onClean } = props;

  const onItem = {
    height: '500px',
    border: 'solid 1px whitesmoke',
    padding: '15px',
    margin: '15x auto',
    opacity: 1,
  };

  return (
    <FlavorBoxContainer style={Children.count(children) > 0 ? onItem : {}}>
      <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
        {children}
      </div>
      <div style={{
        display: 'flex', flexDirection: 'row', margin: '15px', width: '100%', justifyContent: 'flex-end',
      }}
      >
        <Button onClick={onClean}>Limpar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </div>
    </FlavorBoxContainer>
  );
};

FlavorBox.propTypes = {
  children: PropTypes.any,
  onClean: PropTypes.func,
  onConfirm: PropTypes.func,
};

FlavorBox.defaultProps = {
  children: [],
  onClean: () => {},
  onConfirm: () => {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const tmp = state.data;
      tmp.push(action.payload);
      return { data: tmp };
    }
    case 'del': {
      const data = state.data.filter((item) => item !== action.payload);
      return { data };
    }
    case 'clean': {
      return { data: [] };
    }
    default:
      throw new Error();
  }
}

const initialState = { data: [] };


export const AddEndpoint = () => {
  const [page, setPage] = useState('table');

  const [searchItems, setSearchItems] = useState([]);
  const [query, setQuery] = useState({});
  const [Item, setItem] = useState({});
  const [tables, setTables] = useState([]);
  const [pizzaSizes, setPizzaSizes] = useState([]);

  const [flavors, dispatchFlavors] = useReducer(reducer, initialState);

  const { search } = window.location;
  const params = new URLSearchParams(search);
  const token = params.get('access_token');

  useEffect(() => {
    getTables(token)
      .then((answer) => {
        const T = answer.data;

        setTables(T);
      })
      .catch((error) => {
        window.alert('Erro!', error.message);
      });
    
    getPizzaSizes(token)
      .then((answer) => {
        const T = answer.data;

        setPizzaSizes(T);
      })
      .catch((error) => {
        window.alert('Erro!', error.message);
      });
  }, []);

  const getVisible = (number) => page === number;

  return (
    <Container>
      <Page visible={getVisible('table')}>
        <h2>Qual a mesa?</h2>
        <div style={{ width: 50 }} />
        <Select onChange={ e => setQuery({...query, orderId: e.target.value}) } containerStyle={{ maxWidth: 250 }}>
          <option value={null}>Selecione...</option>
          {tables.map((table) => <option value={table.orderId}>{table.number}</option>)}
        </Select>
        <NextButton onClick={() => {
          if(query.orderId)
            setPage('pick');
          else
            window.alert('Selecione uma mesa!');
        }}>
          <img src={arrow} style={{ objectFit: 'contain', width: 32, height: 32 }} />
        </NextButton>
      </Page>
      <Page visible={getVisible('pick')}>
        <h2>Escolha o produto:</h2>
        <div style={{ width: 50 }} />
        <ProductButton onClick={() => { setPage('pizzasize') ; setItem({...Item, type: 'pizza'}); }}>
          <img src={addPizza} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
        </ProductButton>
        <ProductButton onClick={() => {setPage('product'); setItem({...Item, type: 'product'}); }} >
        <img src={addOthers} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
        </ProductButton>
      </Page>
      <Page visible={getVisible('pizzasize')}>
        <h2>Tamanho da pizza</h2>
        <div style={{ width: 50 }} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
        {pizzaSizes && pizzaSizes.map(({code, name, description, flavorLimit}) => {
          return (
          <ProductButton onClick={() => {setPage('pizzaflavor'); setItem({...Item, code}); }}>
            <img src={addPizza} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
            <p>
              <div>{name}</div>
              <div>({description})</div>
            </p>
          </ProductButton>
          )
        })}
        </div>
      </Page>
      <Page visible={getVisible('pizzaflavor')}>
        <h2>Quais os sabores?</h2>
        <div style={{ width: 50 }} />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Search
            label="Pesquisar"
            onSelect={(item) => {
              if (item.value) {
                const currentItem = searchItems.find(({ code }) => code === item.value);
                dispatchFlavors({ type: 'add', payload: currentItem });
                setItem({...Item, code: `${Item.code}${item.value}`});
              }
            }}
            onChange={(e) => {
					  getFlavor(token, e.target.value)
					    .then((result) => {
					      if (result.status === 200) {266
					        setSearchItems(result.data);
					        return;
					      }

					      window.alert(`Falhou com o código${result.status}`);
					    });
            }}
            data={searchItems.map((item) => ({
              label: `${item.name}${item.variation !== 'UNICO' ? ` (${item.variation})` : ''}`,
              value: item.code,
            }))}
          />
          <FlavorBox onClean={() => dispatchFlavors({ type: 'clean' })} onConfirm={() => { setPage('confirm'); }}>
            {flavors && flavors.data.map((flavor, index) => <FlavorItem onRemove={() => { setItem({...Item, flavors: Item.flavors.filter(flavor), code: Item.code.split(flavor.code).join('')}); dispatchFlavors({ type: 'del', payload: flavor }); }} flavor={flavor} key={index} />)}
          </FlavorBox>
        </div>
      </Page>
      <Page visible={getVisible('product')}>
        <h2>Produtos</h2>
        <div style={{ width: 50 }} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Input label="Pesquisar" placeholder="Digite aqui sua pesquisa..." />
        </div>
      </Page>
      <Page visible={getVisible('confirm')}>
        <h2>Confirmar?</h2>
        <div style={{ width: 50 }} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <img src={addPizza} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
          <span>{`Código: ${Item.code}`}</span>
        </div>
      </Page>
    </Container>
  );
};

export default AddEndpoint;
