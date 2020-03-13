import React, {
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import card from '../../../../../assets/card.png';
import money from '../../../../../assets/money.png';

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

const BigButton = styled.button`
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

const PayEndpoint = (props) => {
  // eslint-disable-next-line react/prop-types
  const { location } = props;
  const [page, setPage] = useState('table');

  const [token, setToken] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const search = location.pathname.substring(location.pathname.indexOf('?'));
    const params = new URLSearchParams(search);
    setToken(params.get('access_token'));
  }, []);

  const getVisible = (number) => page === number;

  return (
    <Container>
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
          <h2>Qual a forma de pagamento?</h2>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
          >
            <BigButton>
              <img
                src={money}
                alt=""
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </BigButton>
            <BigButton>
              <img
                src={card}
                alt=""
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </BigButton>
          </div>
        </div>
      </Page>
    </Container>
  );
};

export default PayEndpoint;
