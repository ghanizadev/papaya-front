import React, {
  useState,
  Children,
  useReducer,
  useEffect,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Input, Button, Search, TextArea,
} from '../../../../components';
import {
  getFlavor, getTables, getPizzaSizes, getMembers, addProduct,
} from './function';

import arrow from '../../../../../assets/arrow.png';
import addPizza from '../../../../../assets/add_pizza.png';
import addOthers from '../../../../../assets/add_others.png';

const { ipcRenderer } = require('electron');

const Container = styled.div`
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
  transition: all 0.3s;
  position: relative;
`;

const ProductButton = styled.button`
  height: 120px;
  width: 120px;
  margin: 15px;
  border: none;
  background-color: transparent;
  transition: all 0.2s ease-in;

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
    <CloseButtonContainer onClick={() => onClose()}>
      &times;
    </CloseButtonContainer>
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
  width: 420px;
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
  width: 400px;
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
  const { flavor, onRemove, onAdditional } = props;

  return (
    <FlavorItemContainer>
      <h3 style={{ margin: 0 }}>{flavor.name}</h3>
      <h5 style={{ margin: 0 }}>{flavor.code}</h5>
      <p style={{ margin: 0, fontSize: 10, color: '#666' }}>
        {flavor.description.join(', ')}
      </p>
      <TextArea
        label="Adicionais"
        onChange={(e) => {
          onAdditional(e.target.value, flavor);
        }}
      />
      <CloseButton onClose={onRemove} />
    </FlavorItemContainer>
  );
};

FlavorItem.propTypes = {
  flavor: PropTypes.shape({
    description: PropTypes.arrayOf(PropTypes.string),
    group: PropTypes.string,
    variation: PropTypes.string,
    small: PropTypes.number,
    medium: PropTypes.number,
    large: PropTypes.number,
    code: PropTypes.string,
    name: PropTypes.string,
    provider: PropTypes.string,
  }).isRequired,
  onAdditional: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

const Page = (props) => {
  const { children, visible } = props;

  return <Wrapper style={{ height: visible ? '100%' : 0 }}>{children}</Wrapper>;
};

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  visible: PropTypes.bool.isRequired,
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: '15px',
          width: '100%',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={onClean}>Limpar</Button>
        <Button onClick={onConfirm}>Confirmar</Button>
      </div>
    </FlavorBoxContainer>
  );
};

FlavorBox.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClean: PropTypes.func,
  onConfirm: PropTypes.func,
};

FlavorBox.defaultProps = {
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

const AddEndpoint = (props) => {
  // eslint-disable-next-line react/prop-types
  const { location } = props;
  const [page, setPage] = useState('table');

  const [searchItems, setSearchItems] = useState([]);
  const [product, setProduct] = useState({
    quantity: 1,
    price: 0,
    owner: 'Geral',
  });
  const [tables, setTables] = useState([]);
  const [pizzaSizes, setPizzaSizes] = useState([]);
  const [owners, setOwners] = useState([]);
  const [additionals, setAdditionals] = useState([]);


  const [token, setToken] = useState('');

  const [flavors, dispatchFlavors] = useReducer(reducer, initialState);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const search = location.pathname.substring(location.pathname.indexOf('?'));
    const params = new URLSearchParams(search);
    setToken(params.get('access_token'));

    getTables(params.get('access_token'))
      .then((answer) => {
        const T = answer.data;

        setTables(T);
      })
      .catch((error) => {
        window.alert('Erro!', error.message);
      });

    getPizzaSizes(params.get('access_token'))
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

        <label htmlFor="table-input">
          Selecione uma mesa:
          <br />
          <input
            onChange={(e) => {
              const { orderId } = tables.find(
                (table) => table.number === e.target.value,
              );
              setProduct({ ...product, orderId });
            }}
            list="table-list"
            id="table-input"
            name="table-input"
            style={{
              maxWidth: 250,
            }}
          />
        </label>

        <datalist id="table-list">
          {tables && tables.map((table) => <option value={table.number}>{table.number}</option>)}
        </datalist>

        <NextButton
          onClick={() => {
            if (product.orderId) {
              getMembers(product.orderId, token)
                .then((res) => {
                  if (!Array.isArray(res.data)) {
                    window.alert(`Erro (${res.data.error})! Mensagem: ${res.data.error_description}`);
                  } else {
                    setOwners(res.data);
                  }
                  setPage('owner');
                })
                .catch((error) => {
                  window.alert(`Problema no servidor (${error.message})`);
                });
            } else window.alert('Selecione uma mesa!');
          }}
        >
          <img
            src={arrow}
            alt=""
            style={{ objectFit: 'contain', width: 32, height: 32 }}
          />
        </NextButton>
      </Page>
      <Page visible={getVisible('owner')}>
        <h2>À quem pertence?</h2>
        <div style={{ width: 50 }} />

        <label htmlFor="owner-input">
          Selecione um membro:
          <br />
          <input
            onChange={(e) => {
              setProduct({ ...product, owner: e.target.value });
            }}
            defaultValue="Geral"
            list="owner-list"
            id="owner-input"
            name="owner-input"
            style={{
              maxWidth: 250,
            }}
          />
        </label>

        <datalist id="owner-list">
          {owners && owners.map((owner) => <option value={owner}>{owner}</option>)}
        </datalist>

        <NextButton
          onClick={() => {
            if (product.owner !== '') setPage('pick');
            else {
              window.alert(
                'O nome do integrante não pode estar em branco, caso queria, deixe definido como "Geral"',
              );
            }
          }}
        >
          <img
            src={arrow}
            alt=""
            style={{ objectFit: 'contain', width: 32, height: 32 }}
          />
        </NextButton>
      </Page>
      <Page visible={getVisible('pick')}>
        <h2>Escolha o produto:</h2>
        <div style={{ width: 50 }} />
        <ProductButton
          onClick={() => {
            setPage('pizzasize');
            setProduct({ ...product, type: 'pizza' });
          }}
        >
          <img
            src={addPizza}
            alt=""
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </ProductButton>
        <ProductButton
          onClick={() => {
            setPage('product');
            setProduct({ ...product, type: 'product' });
          }}
        >
          <img
            src={addOthers}
            alt=""
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </ProductButton>
      </Page>
      <Page visible={getVisible('pizzasize')}>
        <h2>Tamanho da pizza</h2>
        <div style={{ width: 50 }} />
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {pizzaSizes
            && pizzaSizes.map(({
              code, name, ref, description,
            }) => (
              <ProductButton
                onClick={() => {
                  setPage('pizzaflavor');
                  setProduct({
                    ...product, code: `${code}*`, size: ref, name,
                  });
                }}
              >
                <img
                  src={addPizza}
                  alt=""
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: '100%',
                  }}
                />
                <p>
                  <div>{name}</div>
                  <div>
                    (
                    {description}
                    )
                  </div>
                </p>
              </ProductButton>
            ))}
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
                const currentItem = searchItems.find(
                  ({ code }) => code === item.value,
                );
                dispatchFlavors({ type: 'add', payload: currentItem });

                setProduct({
                  ...product,
                  code: `${product.code}${item.value}`,
                });
              }
            }}
            onChange={(e) => {
              getFlavor(token, e.target.value).then((result) => {
                if (result.status === 200) {
                  setSearchItems(result.data);
                  return;
                }

                window.alert(`Falhou com o código${result.status}`);
              });
            }}
            data={searchItems.map((item) => ({
              label: `${item.name}${
                item.variation !== 'UNICO' ? ` (${item.variation})` : ''
              }`,
              value: item.code,
            }))}
          />
          <FlavorBox
            onClean={() => dispatchFlavors({ type: 'clean' })}
            onConfirm={() => {
              setPage('confirm');

              const prices = flavors.data.map(
                (flavor, _, arr) => flavor[product.size] / arr.length,
              ) || 0;

              const adds = [];

              flavors.data.forEach((flavor) => {
                // @TODO: terminar a iteracao dos adicionais
              });
              const final = prices.reduce((sum, currentValue) => sum + currentValue);

              setProduct({
                ...product,
                price: final,
                flavors: flavors.data,
                additionals: '',
              });
            }}
          >
            {flavors
              && flavors.data.map((flavor) => (
                <FlavorItem
                  onRemove={() => {
                    setProduct({
                      ...product,
                      flavors: product.flavors.filter(flavor),
                      code: product.code.split(flavor.code).join(''),
                    });
                    dispatchFlavors({ type: 'del', payload: flavor });
                  }}
                  onAdditional={(text, { code }) => {
                    let tmp = additionals;

                    const add = tmp.find((item) => item.startsWith(code));

                    if (!add) { tmp.push(`${code}:${text.split(',').map((item) => item.trim()).join(';')}`); } else {
                      tmp = tmp.map((item) => {
                        if (item.startsWith(code)) { return `${code}:${text.split(',').map((item) => item.trim()).join(';')}`; }

                        return item;
                      });
                    }
                    setAdditionals(tmp);
                  }}
                  flavor={flavor}
                  key={flavor.code}
                />
              ))}
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
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img
            src={addPizza}
            alt=""
            style={{
              objectFit: 'contain', width: 128, height: 128, margin: 10,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 420 }}>
            <h3>{`${product.quantity}x ${product.name} (${product.orderId})`}</h3>
            <div>{`Código: ${product.code}`}</div>
            <div>{`Pertencente à: ${product.owner}`}</div>
            <h4>{`R$ ${product.price.toFixed(2).replace('.', ',')}`}</h4>
            <span>
              Sabores:
              {' '}
              {flavors.data.map((flavor, index, arr) => {
                let adds = additionals.find((item) => item.startsWith(flavor.code));
                if (adds) adds = adds.split(':')[1].split(';').join(', ');

                if (arr.length === 1) return `${flavor.name.toLowerCase()}${adds ? ` (${adds})` : ''}.`;

                if (index + 1 === arr.length) return `e ${flavor.name.toLowerCase()}${adds ? ` (${adds})` : ''}.`;

                return `${flavor.name.toLowerCase()}${adds ? ` (${adds})` : ''},`;
              })
                .join(' ')}
            </span>
          </div>
        </div>
        <div style={{
          position: 'absolute', right: 15, bottom: 15, height: 30, width: 120,
        }}
        >
          <Button onClick={() => {
            const body = [
              {
                code: product.code,
                owner: product.owner,
                quantity: product.quantity,
                additionals,
              },
            ];

            ipcRenderer.invoke('log', body);

            addProduct(body, product.orderId, token)
              .then((result) => {
                if (result.status === 201) {
                  ipcRenderer.invoke('closeAll');
                } else {
                  window.alert(`Erro! ${result.data.error_description}`);
                }
              })
              .catch((error) => {
                window.alert(`Erro interno! ${error.message}`);
              });
          }}
          >
            Confirmar

          </Button>
        </div>
      </Page>
    </Container>
  );
};

export default AddEndpoint;
