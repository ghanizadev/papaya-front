import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-masked-input';

import { getTables } from './function';
import { Button } from '../../../../components';

import card from '../../../../../assets/card.png';
import money from '../../../../../assets/money.png';
import arrow from '../../../../../assets/arrow.png';

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

const SquareButton = styled.button`
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

const Next = styled.button`
  height: 42px;
  width: 42px;
  marginHorizontal: 0 5px;
  border: none;
  background-color: transparent;
  padding: 5px;
  box-sizing: border-box;
`;

const PayEndpoint = (props) => {
  // eslint-disable-next-line react/prop-types
  const { location } = props;

  const [tables, setTables] = useState([]);
  const [selected, setSelected] = useState({});
  const [page, setPage] = useState('table');
  const [type, setType] = useState('');

  const [payment, setPayment] = useState({
    value: 0,
  });

  const [token, setToken] = useState('');

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
  }, []);

  const getVisible = (number) => page === number;

  return (
    <Container>
      {/* @TODO: Relativo ao botao que foi pressionada */ }
      <Page visible={getVisible('table')}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 15,
          height: '100%',
          width: '100%',
        }}
        >
          <h2>Qual a mesa?</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          >
            <label htmlFor="table-input">
              Selecione uma mesa:
              {' '}
              <input
                onChange={(e) => {
                  const { orderId } = tables.find(
                    (table) => table.number === e.target.value,
                  );
                  setSelected({ ...selected, orderId });
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
              {tables
              && tables.map((table) => <option value={table.number}>{table.number}</option>)}
            </datalist>

            <Next
              onClick={() => {
                if (selected.orderId) {
                  setPage('type');
                } else window.alert('Selecione uma mesa!');
              }}
            >
              <img
                src={arrow}
                alt=""
                style={{ objectFit: 'contain', width: 32, height: 32 }}
              />
            </Next>

          </div>
        </div>
      </Page>
      <Page visible={getVisible('type')}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 15,
          height: '100%',
          width: '100%',
        }}
        >
          <h2>Qual a forma de pagamento?</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          >
            <SquareButton
              onClick={() => {
                setType('money');
                setPage('method');
              }}
            >
              <img
                src={money}
                alt=""
                style={{
                  objectFit: 'contain', width: '100%', height: '100%',
                }}
              />
            </SquareButton>
            <SquareButton
              onClick={() => {
                setType('card');
                setPage('method');
              }}
            >
              <img
                src={card}
                alt=""
                style={{
                  objectFit: 'contain', width: '100%', height: '100%',
                }}
              />
            </SquareButton>
          </div>
        </div>
      </Page>
      <Page visible={getVisible('money')}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          margin: 15,
          padding: 50,
          flex: 1,
        }}
        >
          <img
            src={money}
            alt=""
            style={{
              objectFit: 'contain', width: 150, height: 150, margin: 35,
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
          >
            <h2>Pagamento em cartão</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Total de produtos</span>
              <span>R$ 0,00</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>
                <input type="checkbox" />
                {' '}
                Taxa de serviço
              </span>
              <span>R$ 0,00</span>
            </div>
            <div style={{ minHeight: 1, backgroundColor: '#333', width: '100%' }} />
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Subtotal</span>
              <span>R$ 0,00</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 35,
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Dinheiro</span>
              <CurrencyInput mask="R$ 999,99" onChange={(e) => { setPayment({ ...payment, value: e.target.event }); }} style={{ width: 100 }} name="generalmoney-amount" />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              width: '100%',
            }}
            >
              <span>Saldo</span>
              <span>R$ 0,00</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Troco</span>
              <span>R$ 0,00</span>
            </div>
          </div>
          <Button
            style={{
              position: 'absolute',
              right: 15,
              bottom: 15,
            }}
            onClick={() => window.close()}
          >
            Confirmar
          </Button>
        </div>
      </Page>
      <Page visible={getVisible('money')}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          margin: 15,
          padding: 50,
          flex: 1,
        }}
        >
          <img
            src={money}
            alt=""
            style={{
              objectFit: 'contain', width: 150, height: 150, margin: 35,
            }}
          />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
          >
            <h2>Pagamento em dinheiro</h2>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Total de produtos</span>
              <span>R$ 0,00</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Taxa de serviço</span>
              <span>R$ 0,00</span>
            </div>
            <div style={{ minHeight: 1, backgroundColor: '#333', width: '100%' }} />
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 5,
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Subtotal</span>
              <span>R$ 0,00</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 35,
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Dinheiro</span>
              <CurrencyInput mask="R$ 999,99" onChange={(e) => { setPayment({ ...payment, value: e.target.event }); }} style={{ width: 100 }} name="generalmoney-amount" />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
              width: '100%',
            }}
            >
              <span>Saldo</span>
              <span>R$ 0,00</span>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}
            >
              <span>Troco</span>
              <span>R$ 0,00</span>
            </div>
          </div>
          <Button
            style={{
              position: 'absolute',
              right: 15,
              bottom: 15,
            }}
            onClick={() => window.close()}
          >
            Confirmar
          </Button>
        </div>
      </Page>
    </Container>
  );
};

export default PayEndpoint;
