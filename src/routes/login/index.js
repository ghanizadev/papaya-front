import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.png';
import { login } from './functions';
import { LoginHolder, Input, Button } from '../components';
import { Context } from '../../context';

const { dialog } = window.require('electron').remote;


const notAuthorized = {
  type: 'warning',
  buttons: ['Ok'],
  title: 'Atenção',
  message: 'Falha no login.',
  detail: 'Seu usuário e/ou senha estão incorretos',
};

const error = {
  type: 'error',
  buttons: ['Ok'],
  title: 'Erro',
  message: 'Erro desconhecido.',
  detail: 'O servidor retornou um status desconhecido, por favor, entre em contato com o administrador',
};

const credentials = {
  username: process.env.NODE_ENV === 'development' ? 'admin@admin.com' : '',
  password: process.env.NODE_ENV === 'development' ? 'tr4df2g5wp' : '',
};


const Login = (props) => {
  const { navigate } = props;

  const [username, setUsername] = useState(credentials.username);
  const [password, setPassword] = useState(credentials.password);

  const [handler, setHandler] = useState({});

  const state = useContext(Context);

  useEffect(() => {
    if (handler.status) {
      switch (handler.status) {
        case 201:
          state.setContext({ ...state.context, auth: handler.load });
          navigate('/home');
          break;
        case 403:
          dialog.showMessageBox(notAuthorized);
          break;
        default:
          dialog.showMessageBox(error);
          break;
      }
    }
  }, [handler]);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <LoginHolder>
        <img src={logo} alt="La Solana Logo" style={{ maxWidth: '75%', margin: 15 }} />
        <div style={{ width: '60%' }}>
          <Input label="Email" type="email" defaultValue={username} onChange={(e) => setUsername(e.target.value)} placeholder="e-mail" />
          <Input
            label="Senha"
            type="password"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="senha"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                login(username, password, (answer) => {
                  setHandler(answer);
                });
              }
            }}
          />
        </div>

        <Button onClick={(e) => {
          e.preventDefault();
          login(username, password, (answer) => {
            setHandler(answer);
          });
        }}
        >
          Entrar
        </Button>
      </LoginHolder>
    </div>
  );
};

Login.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Login;
