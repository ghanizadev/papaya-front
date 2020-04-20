import React, {
  useContext, useRef, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Context } from '../../context';
import { findFlavor, addProduct } from './functions';

import logo from '../../assets/logo.png';

export const MessageBox = styled.div`
  width: 30%;
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

export const Loading = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingMessage = styled.span`
  font-size: 14pt;
  color: #333;
`;

export const LoadingTitle = styled.span`
  font-size: 11pt;
  color: #444;
`;


export const LoginHolder = styled.div`
  height: 45vh;
  width: 45vh;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 15px;
  opacity: 1;
`;

export const Tables = styled.div`
  padding: 25px;
  position: relative;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
    overflow: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
`;

const WaitingPaymentTableContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #666;
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

const WaitingPaymentTableButtom = styled.button`
  height: min-content;
  font-weight: bold;
  background-color: transparent;
  border: none;
  color: #666;
  border-bottom: 1px solid #666;
  font-size: 16pt;
`;

const BusyTableProductContainer = styled.div`
  height: min-content;
  display: flex;
  flex-direction: column;
  overflow: hidden scroll;
  flex: 1;
`;

const BusyTableProductButton = styled.button`
  height: min-content;
  background-color: #fdfdfd;
  width: 100%;
  border: none;
  color: #888;
  border-bottom: 1px solid #aaa;
  font-size: 11pt;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: unset;
  padding: 5px;
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

const AddProductClose = styled.button`
  height: 30px;
  background-color: #fdfdfd;
  width: 100%;
  border: none;
  color: tomato;
  border-bottom: 1px solid tomato;
  font-size: 14pt;
`;

const AddProductSubmit = styled.button`
  height: 30px;
  background-color: #fdfdfd;
  width: 100%;
  border: none;
  color: #5cd191;
  border-bottom: 1px solid #5cd191;
  font-size: 14pt;
`;
const AddProductFlavor = styled.button`
  height: 30px;
  background-color: #fdfdfd;
  width: 100%;
  border: none;
  color: #666;
  border-bottom: 1px solid #666;
  font-size: 12pt;
`;

const AddProductFlavorSubmit = styled.button`
  height: 30px;
  background-color: #fdfdfd;
  width: 100%;
  border: none;
  color: #ffbe5b;
  border-bottom: 1px solid #ffbe5b;
  font-size: 14pt;
`;


const AddPizza = styled.button`
  height: 100px;
  width: 100px;
  background-color: #ddd;
  border: none;
  color: #ffbe5b;
  margin: 15px;
`;


const AddProduct = styled.button`
  height: 100px;
  width: 100px;
  background-color: #ddd;
  border: none;
  color: #ffbe5b;
  margin: 15px;
`;

const CloseButton = styled.button`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  font-size: 14pt;
  background-color: tomato;
  border: none;
  color: #fdfdfd;
  position: absolute;
  top: 0;
  right: 0;
`;

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
  align-items: center;
  margin: 3.5vw 0 0 18vw;
  justify-content: flex-start;
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

export const SidebarButton = styled.button`
  width: 100%;
  height: 58px;
  font-size: 18pt;
  color: #fdfdfd;
  background-color: #ffbe5b;
  text-align: center;
  padding: 5px;
  border: 0.25px solid #dcdcdc;
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 5px;
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
  max-height: 30px;
  min-height: 30px;
  width: 100%;
  border: .5px solid lightgray;
  box-sizing: border-box;
    border-radius: 5px;
    padding: 3px 5px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
  margin: 5px;
  position: relative;
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

const InputItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  margin: 36px 0 0 0;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 4px 10px 0 rgba(0,0,0,0.12);
`;

const InputItem = styled.button`
  width: 100%;
  height: 30px;
  color: #444;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: #fbfbfb;
  border: .25px solid whitesmoke;
  padding: 5px;
  box-sizing: border-box;

  &:hover{
    background-color: #ffbe5b;
    color: #fbfbfb;
  }
`;

export const Button = styled.button`
    height: 30px;
    border: none;
    width: 120px;
    margin: 0 0 0 5px;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    background-color: #ed9140;
    transition: all 0.15s ease-out;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      background-color: #ebebeb;
      color: #333;
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

const ResultsTable = styled.div`
  box-sizing: border-box;
    width: 100%;
  height: 100%;
  overflow: auto;
`;

const ResultsContainer = styled.div`
  width: 100%;
    flex: 1;
    border: 1px solid gray;
    border-radius: 5px;
    margin: 5px;
    box-sizing: border-box;
    position: relative;

`;

export const Results = (props) => {
  const {
    data, headerOptions, headerButtons, title,
  } = props;
  const [headerItems, setHeaderItems] = useState([]);
  const [parentHeight, setParentHeight] = useState(500);

  const resulttable = useRef();
  const parent = useRef();

  useEffect(() => {
    const keys = Object.keys(headerOptions);

    let total = 0;
    keys.forEach((key) => {
      total += headerOptions[key].size;
    });

    const localHeaderItems = headerItems;

    keys.forEach((key) => {
      const headerItem = {};

      headerItem.label = headerOptions[key].label;
      headerItem.key = key;
      headerItem.width = (resulttable.current.offsetWidth / total) * headerOptions[key].size;
      localHeaderItems.push(headerItem);
    });

    setHeaderItems(localHeaderItems);
    setParentHeight(parent.current.offsetHeight);
  }, []);

  return (
    <ResultsContainer ref={parent}>
      <div
        style={{
          backgroundColor: '#ed9140',
          color: 'white',
          position: 'absolute',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
          top: 0,
          right: 0,
          left: 0,
          height: 42,
          display: 'flex',
          flexDirection: 'row',
          padding: '0 25px',
        }}
      >
        <h3>{title}</h3>
        <div>
          {(headerButtons && Array.isArray(headerItems)) && headerButtons.map((button, index) => (
            <button key={index} type="button" onClick={(e) => { button.onButtonClick(e); }}>{button.title}</button>
          ))}
        </div>

      </div>
      <div style={{
        backgroundColor: 'whitesmoke',
        color: '#444',
        position: 'absolute',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'flex-end',
        top: 42,
        right: 0,
        left: 0,
        height: 30,
        display: headerButtons.length > 0 ? 'flex' : 'none',
        flexDirection: 'row',
      }}
      >
        {headerItems && headerItems.map((item, index) => <div key={index} style={{ width: item.width }}>{item.label}</div>)}
      </div>

      <ResultsTable ref={resulttable} style={{ maxHeight: parentHeight, padding: headerButtons.length > 0 ? '72px 5px 5px 5px' : '42px 5px 5px 5px' }}>
        {data && data.map((item, index) => (
          <div
            style={{
              backgroundColor: index & 1 ? 'whitesmoke' : 'white',
              color: '#444',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              height: 30,
            }}
            key={index}
          >
            {headerItems && headerItems.map((headerItem, index) => (
              <div key={index} style={{ textAlign: 'center', width: headerItem.width || null }}>
                {headerOptions[headerItem.key].format !== undefined ? headerOptions[headerItem.key].format(item[headerItem.key]) : item[headerItem.key]}
              </div>
            ))}
          </div>
        ))}
      </ResultsTable>
    </ResultsContainer>
  );
};

Results.propTypes = {
  headerButtons: PropTypes.arrayOf(
    PropTypes.object,
  ),
  title: PropTypes.string,
  headerOptions: PropTypes.object,
};

Results.defaultProps = {
  headerButtons: [],
  title: 'Resultados',
  headerOptions: {},
};

export const Input = (props) => {
  const {
    label, containerStyle, disabled, proportion,
  } = props;

  const currentContainerStyle = containerStyle || {};
  if (proportion > 0) currentContainerStyle.flexGrow = proportion;

  return (
    <InputContainer style={currentContainerStyle}>
      <InputLabel style={{ backgroundColor: disabled ? '#fff' : null }}>{label}</InputLabel>
      <InputComponent {...props} />
    </InputContainer>
  );
};

export const Search = (props) => {
  const {
    label, containerStyle, disabled, proportion, data, onSelect,
  } = props;
  const [visible, setVisible] = useState(false);

  const currentContainerStyle = (containerStyle != null && containerStyle != {}) ? containerStyle : {};
  if (proportion > 0) Object.defineProperty(currentContainerStyle, 'flexGrow', { value: proportion });

  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  function handleClickOutside(event) {
    if (ref.current
      && inputRef.current
      && (!ref.current.contains(event.target)
      && !inputRef.current.contains(event.target))) {
      setVisible(false);
    }
  }

  return (
    <InputContainer style={{ ...currentContainerStyle, zIndex: 3 }}>
      <InputLabel style={{ backgroundColor: disabled ? '#fff' : null }}>{label}</InputLabel>
      <InputComponent
        ref={inputRef}
        onKeyPress={() => {
          if (inputRef.current.value === '') return setVisible(false);
          return setVisible(true);
        }}
        {...props}
      />
      <InputItemContainer ref={ref} style={{ display: visible ? 'flex' : 'none' }}>
        {data && data.map((item) => (
          <InputItem key={item.value} onClick={() => { onSelect(item); setVisible(false); }}>{item.label}</InputItem>
        ))}
      </InputItemContainer>
    </InputContainer>
  );
};

Search.propTypes = {
  onSelect: PropTypes.func,
  label: PropTypes.string,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  proportion: PropTypes.number,
  data: PropTypes.array,
};

Search.defaultProps = {
  onSelect: () => {},
  label: '',
  containerStyle: {},
  disabled: false,
  proportion: 1,
  data: [],
};

export const TextArea = (props) => {
  const {
    label, containerStyle, disabled, proportion,
  } = props;

  const currentContainerStyle = containerStyle || {};
  if (proportion > 0) Object.defineProperty(currentContainerStyle, 'flexGrow', { value: proportion });

  return (
    <TextAreaContainer style={currentContainerStyle}>
      <InputLabel style={{ backgroundColor: disabled ? '#fff' : null }}>{label}</InputLabel>
      <TextAreaComponent draggable={false} {...props} />
    </TextAreaContainer>
  );
};

TextArea.propTypes = {
  label: PropTypes.string,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  proportion: PropTypes.number,
};

TextArea.defaultProps = {
  label: '',
  containerStyle: {},
  disabled: false,
  proportion: 1,
};

export const Select = (props) => {
  const {
    label, children, containerStyle, proportion,
  } = props;

  const currentContainerStyle = containerStyle || {};
  if (proportion > 0) Object.defineProperty(currentContainerStyle, 'flexGrow', { value: proportion });

  return (
    <InputContainer style={currentContainerStyle}>
      <InputLabel>{label}</InputLabel>
      <SelectComponent {...props}>{children}</SelectComponent>
    </InputContainer>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  disabled: PropTypes.bool,
  children: PropTypes.any,
  proportion: PropTypes.number,
};

Select.defaultProps = {
  label: '',
  containerStyle: null,
  disaled: false,
  children: [],
  proportion: 1,
};

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


const ProductDescription = (props) => {
  const { product } = props;

  const state = useContext(Context);
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <h1>{product.title}</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>
          código:
          {' '}
          {product.code}
        </span>
        <span>
          grupo:
          {' '}
          {product.group}
        </span>
        <span>
          variação:
          {' '}
          {product.variation}
        </span>
        <span>
          descrição:
          {' '}
          {product.description.toString()}
        </span>
        <span>
          adicionais:
          {' '}
          {product.aditionals}
        </span>
        <span>
          preço:
          {' '}
          {product.price}
        </span>
      </div>
      <CloseButton onClick={() => { state.setContext({ ...state.context, overlay: { visible: false } }); }}>&times;</CloseButton>
    </div>
  );
};

ProductDescription.propTypes = {
  product: PropTypes.object,
};

ProductDescription.defaultProps = {
  product: {
    code: '0', title: 'NO TITLE', group: 'NO GROUP', variation: 'NO VARIATION', description: ['NO DESCRIPTION'], aditionals: 'NO ADDITIONALS', price: 0,
  },
};

const ProductDescriptionCustomer = (props) => {
  const { items, name } = props.customer;
  const [list, setList] = useState([]);

  const state = useContext(Context);
  return (
    <div style={{
      width: '100%', position: 'relative', padding: 25, boxSizing: 'border-box',
    }}
    >
      <p style={{ fontSize: 24, color: '#333', fontWeight: 'bold' }}>{name}</p>
      <p style={{ fontSize: 18, color: '#666', fontWeight: 'bold' }}>Produtos</p>
      <div style={{
        display: 'flex', flexDirection: 'column', overflow: 'hidden auto', maxHeight: '45vh',
      }}
      >
        {items && items.map((product, index) => (
          <div
            key={index}
            style={{
              border: '1px solid whitesmoke',
              margin: 8,
              borderRadius: 5,
              padding: 15,
            }}
          >
            <span style={{
              fontSize: 16, display: 'flex', color: '#444', fontWeight: 'bold', alignItems: 'center',
            }}
            >
              <input
                onClick={() => {
                  console.log(list);
                  const tmp = list;

                  if (list.includes(product)) {
                    tmp.pop(product);
                    setList(tmp);
                    return;
                  }
                  tmp.push(product);
                  setList(tmp);
                }}
                type="checkbox"
              />
              {product.title}
            </span>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 12, color: '#888', fontWeight: 'bold' }}>
                Descrição:
                {' '}
                {product.description.toString()}
                , adicionais:
                {' '}
                {product.aditionals}
              </span>
              <span style={{ fontSize: 20, color: '#1ad67e', fontWeight: 'bold' }}>
                R$
                {' '}
                {product.price.toFixed(2).toString().replace('.', ',')}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: 15,
      }}
      >
        <Button>Descontar</Button>
        <Button>Pagar total</Button>
      </div>
      <CloseButton onClick={() => { state.setContext({ ...state.context, overlay: { visible: false } }); }}>&times;</CloseButton>
    </div>
  );
};

ProductDescriptionCustomer.propTypes = {
  customer: PropTypes.object.isRequired,
};

const TableDescription = (props) => {
  const { order } = props;

  const state = useContext(Context);
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <h1>
        {order.tableNumber}
        .
        {order.customer}
      </h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>
          código:
          {' '}
          {order.orderId}
        </span>
        <span>
          entrega:
          {' '}
          {order.deliver}
        </span>
        <span>
          data de entrada:
          {' '}
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
        <span>
          última atualização:
          {' '}
          {new Date(order.updatedAt).toLocaleTimeString()}
        </span>
      </div>
      <CloseButton onClick={() => { state.setContext({ ...state.context, overlay: { visible: false } }); }}>&times;</CloseButton>
    </div>
  );
};

TableDescription.propTypes = {
  order: PropTypes.object.isRequired,
};


const AddComponent = (props) => {
  const state = useContext(Context);

  return (
    <div style={{
      position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-evenly', flexDirection: 'row',
    }}
    >
      <AddPizza onClick={() => state.setContext({ ...state.context, overlay: { visible: true, component: <AddPizzaComponent {...props} /> } })} />
      <AddProduct onClick={() => state.setContext({ ...state.context, overlay: { visible: true, component: <AddProductComponent {...props} /> } })} />
      <CloseButton onClick={() => state.setContext({ ...state.context, overlay: { visible: false } })}>&times;</CloseButton>
    </div>
  );
};

const AddProductComponent = (props) => {
  const { order } = props;
  const state = useContext(Context);

  const searchField = useRef();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProducts] = useState('');

  return (
    <div style={{
      display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', height: '165px', position: 'relative',
    }}
    >
      <h1 style={{ whiteSpace: 'nowrap' }}>Produtos | </h1>
      <br />
      <input type="number" min={1} defaultValue={1} step={1} style={{ width: 40, marginLeft: '5px' }} />
      <div style={{
        width: '100%', padding: '0 10px', position: 'relative', boxSizing: 'border-box',
      }}
      >
        <input
          type="text"
          ref={searchField}
          placeholder="Pesquise pelo seu produto..."
          style={{ width: '100%', boxSizing: 'border-box' }}
          onClick={() => { searchField.current.value = ''; }}
          onChange={() => {
            if (searchField.current.value === '') {
              return setProducts([]);
            }
            findFlavor(
              state.context.auth.token,
              searchField.current.value,
            ).then((result) => {
              setProducts(result.data);
            });
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 30,
            width: 'calc(100% - 20px)',
            boxSizing: 'border-box',
            display: products.length > 0 ? 'flex' : 'none',
            flexDirection: 'column',
            height: 'min-content',
            maxHeight: 200,
            overflowY: 'auto',
            backgroundColor: '#fdfdfd',
            boxShadow: '3px 3px 8px 3px #888888aa',
            border: '.5px solid #ddd',
            padding: 8,
          }}
        >
          {products && products.map(
            (product, index) => (
              <button
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  border: 'none',
                }}
                onClick={() => {
                  setSelectedProducts(product.code);
                  setProducts([]);
                  searchField.current.value = `${product.code} - ${product.name}${product.variation != 'UNICO' ? ` (${product.variation})` : ''}`;
                }}
                key={index}
              >
                {`${product.name}${product.variation != 'UNICO' ? ` (${product.variation})` : ''}`}
              </button>
            ),
          )}
        </div>
      </div>
      <button
        type="submit"
        style={{
          backgroundColor: '#ffbe5b',
          border: 'none',
          height: 30,
          borderRadius: 5,
          color: '#fdfdfd',
        }}
      >
        Adicionar

      </button>
      <CloseButton onClick={() => state.setContext({ ...state.context, overlay: { visible: false } })}>&times;</CloseButton>

    </div>
  );
};

const AddPizzaComponent = (props) => {
  const { order } = props;
  const state = useContext(Context);

  const [cookies] = useCookies();

  const code = useRef();
  const quantity = useRef();

  const [pizzaSize, setPizzaSize] = useState('12');
  const [pizzaFlavors, setPizzaFlavors] = useState([]);
  const [pizzaAditionals, setPizzaAditionals] = useState([]);

  const [currentAditional, setCurrentAditional] = useState('');
  const [aditionalsItems, setAditionalsItems] = useState([]);

  const [flavors, setFlavors] = useState([]);
  const [openFlavor, setOpenFlavors] = useState('');

  const getPizzaTitle = () => {
    switch (pizzaSize) {
      case '12':
        return 'Uma pizza grande com os sabores:';

      case '11':
        return 'Uma pizza média com os sabores:';

      case '10':
        return 'Uma pizza pequena com os sabores:';

      default:
        return 'Uma pizza grande com os sabores:';
    }
  };

  const callback = () => {
    const code = `${pizzaSize}*${pizzaFlavors.map((item) => item.code).join('')}`;

    const quantity = 1;

    const aditionals = pizzaAditionals;

    const body = [{ quantity, code, aditionals }];

    addProduct(state.context.auth.token, order.orderId, body)
      .then(() => {
        setOpenFlavors('');
        setAditionalsItems([]);
        setCurrentAditional('');

        state.setContext({ ...state.context, overlay: { visible: false } });
      })
      .catch((error) => {
        window.alert(`Error: \n${error}`);
      });
  };

  return (
    <div
      style={{
        display: 'inherited',
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderSizing: 'border-box',
        position: 'relative',
      }}
    >
      <CloseButton onClick={() => state.setContext({ ...state.context, overlay: { visible: false } })}>&times;</CloseButton>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <h1>Pizza</h1>
        <div
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 15,
                width: 150,
                height: 200,
                border: pizzaSize === '12' ? '1px solid #d2d2d2' : 'none',
                backgroundColor: 'transparent',
              }}
              onClick={() => {
                setPizzaSize('12');
              }}
            >
              <div
                className="pizzaImageHolder"
                style={{
                  height: '100px',
                  width: '100px',
                  backgroundColor: 'gray',
                }}
              />
              <span>Grande</span>
              <span>Até 12 fatias</span>
              <span>3 sabores</span>
              <span>R$ 00,00</span>
            </button>
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 15,
                width: 150,
                height: 200,
                border: pizzaSize === '11' ? '1px solid #d2d2d2' : 'none',
                backgroundColor: 'transparent',
              }}
              onClick={() => {
                setPizzaSize('11');
              }}
            >
              <div
                className="pizzaImageHolder"
                style={{
                  height: '85px',
                  width: '85px',
                  backgroundColor: 'gray',
                }}
              />
              <span>Média</span>
              <span>Até 9 fatias</span>
              <span>3 sabores</span>
              <span>R$ 00,00</span>
            </button>
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 15,
                width: 150,
                height: 200,
                border: pizzaSize === '10' ? '1px solid #d2d2d2' : 'none',
                backgroundColor: 'transparent',
              }}
              onClick={() => {
                setPizzaSize('10');
              }}
            >
              <div
                className="pizzaImageHolder"
                style={{
                  height: '60px',
                  width: '60px',
                  backgroundColor: 'gray',
                }}
              />
              <span>Pequena</span>
              <span>Até 8 fatias</span>
              <span>2 sabores</span>
              <span>R$ 00,00</span>
            </button>
          </div>
        </div>
        <span>{getPizzaTitle()}</span>

        <div
          style={{
            height: 60,
            width: '100%',
            padding: 15,
            border: '.25px solid #d2d2d2',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          {pizzaFlavors.map((flavor, index) => (
            <div
              key={index}
              style={{
                height: 30,
                color: '#333',
                fontSize: '11pt',
                border: '1px solid #ddd',
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 5px',
              }}
            >
              <span style={{ paddingLeft: 6, whiteSpace: 'nowrap' }}>{flavor.name}</span>
              <button
                type="button"
                style={{ border: 'none', backgroundColor: 'transparent' }}
                onClick={() => {
                  setPizzaFlavors(pizzaFlavors.filter((item) => item !== flavor));
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

          <div style={{ width: '100%' }}>
            <input
              type="text"
              ref={code}
              defaultValue=""
              placeholder="Digite sua pesquisa aqui"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                margin: '15px 0',
              }}
              onChange={() => {
                setOpenFlavors('');
                findFlavor(
                  state.context.auth.token,
                  code.current.value,
                ).then((result) => {
                  setFlavors(result.data);
                });
              }}
            />
            <div
              style={{
                height: '300px',
                overflow: 'hidden scroll',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                padding: '0 25px',
                boxSizing: 'border-box',
              }}
            >
              {flavors
                && flavors.map((flavor) => (
                  <div
                    key={flavors.indexOf(flavor)}
                    style={{
                      height: 'min-content',
                      width: '100%',
                      margin: '5px 0',
                    }}
                  >
                    <AddProductFlavor
                      type="button"
                      onClick={() => {
                        setOpenFlavors(
                          openFlavor === flavor.code ? '' : flavor.code,
                        );
                      }}
                    >
                      {`${flavor.name}${
                        flavor.variation === 'UNICO'
                          ? ''
                          : ` (${flavor.variation})`
                      }`}
                    </AddProductFlavor>
                    <div
                      style={{
                        display: openFlavor === flavor.code ? 'block' : 'none',
                        boxSizing: 'border-box',
                        border: '0.25px solid #d2d2d2',
                        color: '#333',
                        height: 'min-content',
                        overflow: 'hidden',
                        width: '90%',
                        padding: 15,
                        margin: 'auto',
                      }}
                    >
                      <span>
                        grupo:
                        <span style={{ color: '#666' }}>{flavor.group}</span>
                      </span>
                      <br />
                      <span>
                        código:
                        <span style={{ color: '#666' }}>{flavor.code}</span>
                      </span>
                      <br />
                      <span>
                        variação:
                        <span style={{ color: '#666' }}>
                          {flavor.variation}
                        </span>
                      </span>
                      <br />
                      <span>
                        ingredientes:
                        <span style={{ color: '#666' }}>
                          {flavor.description.map((ingredient, index, arr) => {
                            if (index === arr.length - 1) {
                              return `E ${ingredient}.`;
                            }
                            return `${ingredient}, `;
                          })}
                        </span>
                      </span>
                      <br />
                      <span>adicionais: </span>
                      <div
                        style={{
                          height: 60,
                          width: '100%',
                          border: '0.25px solid #d2d2d2',
                          display: 'flex',
                          padding: 5,
                          flexWrap: 'wrap',
                          overflow: 'hidden scroll',
                        }}
                      >
                        {aditionalsItems.map((aditional, index) => (
                          <div
                            key={index}
                            style={{
                              height: 30,
                              color: '#333',
                              fontSize: '11pt',
                              border: '1px solid #ddd',
                              borderRadius: 3,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              margin: '0 0 0 5px',
                            }}
                          >
                            <span style={{ paddingLeft: 6, whiteSpace: 'nowrap' }}>{aditional}</span>
                            <button
                              type="button"
                              style={{ border: 'none', backgroundColor: 'transparent' }}
                              onClick={() => {
                                setAditionalsItems(aditionalsItems.filter((item) => item !== aditional));
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                        <input
                          onChange={(e) => {
                            setCurrentAditional(e.target.value);
                            if (e.target.value == ',') e.target.value = '';
                          }}
                          type="text"
                          value={currentAditional}
                          style={{
                            border: 'none', padding: '0 0 0 6px', margin: 0, flex: 1, outline: 'none',
                          }}
                          onKeyPress={(e) => {
                            if (e.key == 'Enter') {
                              const temp = aditionalsItems;
                              temp.push(currentAditional.replace(',', '').trim().toLocaleUpperCase());
                              setAditionalsItems(temp);
                              setCurrentAditional('');
                            }
                          }}
                        />
                      </div>

                      <AddProductFlavorSubmit
                        onClick={() => {
                          switch (pizzaSize) {
                            case '10':
                              if (pizzaFlavors.length === 2) return window.alert('Máximo de 2 sabores para pizza pequena');
                              break;
                            case '11':
                              if (pizzaFlavors.length === 3) return window.alert('Máximo de 3 sabores para pizza média');
                              break;
                            case '12':
                              if (pizzaFlavors.length === 3) return window.alert('Máximo de 3 sabores para pizza grande');
                              break;
                            default:
                              if (pizzaFlavors.length === 3) return window.alert('Máximo de 3 sabores para pizza grande');
                              break;
                          }

                          const f = pizzaFlavors;
                          f.push(flavor);
                          setPizzaFlavors(f);

                          if (aditionalsItems.length !== 0) {
                            const a = pizzaAditionals;

                            aditionalsItems.forEach((item) => {
                              const add = `${flavor.code}:${item}`;
                              pizzaAditionals.push(add);
                            });

                            setPizzaAditionals(a);
                          }

                          setOpenFlavors('');
                          setAditionalsItems([]);
                          code.current.value = '';
                          setCurrentAditional('');
                        }}
                      >
                        Adicionar

                      </AddProductFlavorSubmit>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <AddProductSubmit
        onClick={() => {
          callback();
        }}
      >
        Adicionar
      </AddProductSubmit>
      <AddProductClose
        onClick={() => {
          state.setContext({ ...state.context, overlay: { visible: false } });
        }}
      >
        Fechar
      </AddProductClose>
    </div>
  );
};

AddProductComponent.propTypes = {
  order: PropTypes.object.isRequired,
};

const BusyTableProduct = (props) => {
  const {
    quantity, title, price, subtotal,
  } = props.product;
  const minus = /(REMOVIDO)/gi.test(title);

  const state = useContext(Context);

  return (
    <BusyTableProductButton
      style={{ backgroundColor: minus ? '#ffe8e4' : 'transparent' }}
      onClick={() => {
        state.setContext({ ...state.context, overlay: { visible: true, component: <ProductDescription {...props} /> } });
      }}
    >
      <span
        style={{
          textAlign: 'start',
          color: minus ? 'tomato' : '#333',
          marginVertical: 3,
        }}
      >
        {`${quantity}x ${title}`}
      </span>
      <span
        style={{
          textAlign: 'end',
          marginVertical: 3,
          color: minus ? '#ff745b' : '#aaa',
        }}
      >
        {`un R$ ${price
          .toFixed(2)
          .toString()
          .replace('.', ',')}
             => sub R$ ${subtotal
          .toFixed(2)
          .toString()
          .replace('.', ',')}`}
      </span>
    </BusyTableProductButton>
  );
};

BusyTableProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

const BusyTableProductCustomer = (props) => {
  const { items, name } = props.customer;

  const state = useContext(Context);

  return (
    <BusyTableProductButton
      onClick={() => {
        state.setContext({ ...state.context, overlay: { visible: true, component: <ProductDescriptionCustomer customer={props.customer} /> } });
      }}
    >
      <span
        style={{
          textAlign: 'start',
          color: '#444',
          marginVertical: 3,
        }}
      >
        {name}
      </span>
      {items && items.map(({
        quantity, title, price, subtotal,
      }, index) => (
        <div key={index} style={{ width: '100%', backgroundColor: /(REMOVIDO)/gi.test(title) ? '#ffe8e4' : 'transparent' }}>
          <span
            style={{
              textAlign: 'end',
              marginVertical: 3,
              color: /(REMOVIDO)/gi.test(title) ? '#ff745b' : '#666',
              fontSize: '12pt',
            }}
          >
            {`${quantity}x ${title}`}
          </span>
          <br />
          <span
            style={{
              textAlign: 'end',
              marginVertical: 3,
              color: /(REMOVIDO)/gi.test(title) ? '#ff745b' : '#888',
            }}
          >
            {`un R$ ${price
              .toFixed(2)
              .toString()
              .replace('.', ',')}
        => sub R$ ${subtotal
              .toFixed(2)
              .toString()
              .replace('.', ',')}`}
          </span>
        </div>
      ))}
    </BusyTableProductButton>
  );
};

BusyTableProduct.propTypes = {
  product: PropTypes.object.isRequired,
};

const BusyTable = (props) => {
  const { load } = props;

  const state = useContext(Context);
  const customers = {};
  load.order.items.forEach((item) => {
    const keys = Object.keys(customers);

    if (keys.includes(item.owner)) {
      customers[item.owner].push(item);
    } else {
      customers[item.owner] = [item];
    }
  });

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        maxHeight: '100%',
      }}
    >
      <h2 style={{ color: '#888', height: 'min-content' }}>
        {load.number}
        .
        {load.customer}
      </h2>
      <BusyTableProductContainer>
        {load.order.items.map((product, index) => (
          <BusyTableProduct
            key={index}
            product={product}
          />
        ))}
      </BusyTableProductContainer>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 'min-content',
          textAlign: 'right',
          padding: '10px 0',
        }}
      >
        <span style={{ fontSize: '10pt', color: '#888' }}>
          Total de produtos R$
          {' '}
          {load.order.total
            .toFixed(2)
            .toString()
            .replace('.', ',')}
        </span>
        <span style={{ fontSize: '10pt', color: '#888' }}>
          Taxa de Serviço R$
          {' '}
          {load.order.serviceTax
            .toFixed(2)
            .toString()
            .replace('.', ',')}
        </span>
        <span style={{ fontSize: '14pt', color: '#666' }}>
          Final R$
          {' '}
          {load.order.final
            .toFixed(2)
            .toString()
            .replace('.', ',')}
        </span>
      </div>
      <div style={{ minWidth: '100%', height: 'min-content' }}>
        <BusyTableAddProduct
          onClick={() => {
            state.setContext({
              ...state.context,
              overlay: {
                visible: true,
                component: <AddComponent order={load.order} />,
              },
            });
          }}
        >
          Adicionar
        </BusyTableAddProduct>
        <BusyTableDetails
          onClick={() => { state.setContext({ ...state.context, overlay: { visible: true, component: <TableDescription order={load.order} /> } }); }}
        >
          Detalhes

        </BusyTableDetails>
        <BusyTableCheckout>Fechar</BusyTableCheckout>
      </div>
    </div>
  );
};

BusyTable.propTypes = {
  load: PropTypes.object.isRequired,
  owners: PropTypes.bool,
};

BusyTable.defaultProps = {
  owners: false,
};

const FreeTable = (props) => (
  <FreeTableContainer>
    <FreeTableButtom> Abrir Mesa </FreeTableButtom>
  </FreeTableContainer>
);

const WaitingListTable = (props) => {
  const { load } = props;
  const state = useContext(Context);
  return (
    <WaitingPaymentTableContainer>
      <h2 style={{ color: '#444', margin: 0, width: '100%' }}>
        {load.number}
        .
        {load.customer}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img
          alt=""
          src={require('../../assets/hourglass.png')}
          style={{
            height: 80, width: 80, objectFit: 'contain', marginBottom: 15,
          }}
        />
        <h4 style={{ color: '#444', margin: 0, width: '100%' }}>Lista de espera</h4>
        <span>Próximo da lista</span>
        <WaitingPaymentTableButtom>{load.order.customer}</WaitingPaymentTableButtom>
      </div>
      <WaitingPaymentTableButtom
        onClick={() => { state.setContext({ ...state.context, overlay: { visible: true, component: <TableDescription order={load.order} /> } }); }}
        style={{ fontSize: 12 }}
      >
        detalhes
      </WaitingPaymentTableButtom>
    </WaitingPaymentTableContainer>
  );
};

const WaitingPaymentTable = (props) => {
  const { load } = props;
  const state = useContext(Context);

  return (
    <WaitingPaymentTableContainer>
      <h2 style={{ color: '#444', margin: 0, width: '100%' }}>
        {load.number}
        .
        {load.customer}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <img
          src={require('../../assets/draft.png')}
          style={{
            height: 80, width: 80, objectFit: 'contain', marginBottom: 15,
          }}
        />
        <WaitingPaymentTableButtom onClick={() => { window.open('/test', 'payment', ''); }}>Aguardando pagamento...</WaitingPaymentTableButtom>
      </div>
      <WaitingPaymentTableButtom
        onClick={() => { state.setContext({ ...state.context, overlay: { visible: true, component: <TableDescription order={load.order} /> } }); }}
        style={{ fontSize: 12 }}
      >
        detalhes
      </WaitingPaymentTableButtom>
    </WaitingPaymentTableContainer>
  );
};

export const Table = (props) => {
  const { load } = props;

  const status = () => {
    switch (load.status) {
      case 'FREE':
        return <FreeTable {...props} />;
      case 'BUSY':
        return <BusyTable {...props} />;
      case 'WAITING_PAYMENT':
        return <WaitingPaymentTable {...props} />;
      case 'ON_HOLD':
        return <WaitingListTable {...props} />;
      default:
        return <FreeTable {...props} />;
    }
  };

  return (
    <TableContainer>
      {status()}
    </TableContainer>
  );
};
