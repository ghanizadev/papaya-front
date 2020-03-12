import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import io from 'socket.io-client';
import {
  Background,
  Logo,
  SideBar,
  Header,
  SubHeader,
  SidebarButton,
  ServerInfoButton,
  Container,
  Overlay,
  Button,
} from './components';
import ProductInterface from './products';
import ProviderInterface from './providers';
import DeliveryInterface from './deliveries';
import TablesInterface from './tables';
import SettingsInterface from './settings';
import ManagementInterface from './management';
import ClientsInterface from './clients';
import { Context } from '../../context';
import { findAllTables } from '../components/functions';
import getServer from './functions';

import { LoadNullMenu, loadTablesMenu } from './utils/menus';

const { dialog, app } = window.require('electron').remote;
const { ipcRenderer } = window.require('electron');

const quitConfirm = {
  type: 'question',
  buttons: ['Cancelar', 'Trocar de usuário', 'Sair'],
  defaultId: 0,
  cancelId: 0,
  title: 'Sair',
  message: 'Deseja sair?',
  detail: 'Escolha sua opção:',
};

const lostConnection = {
  type: 'warning',
  buttons: ['Ok'],
  defaultId: 0,
  cancelId: 0,
  title: 'Aviso',
  message: 'Conexão perdida',
  detail: 'A sua conexão com o servidor foi perdida, você será redirecionado à tela de login',
};

const Home = (props) => {
  const [user, setUser] = useState('Jean');
  const [page, setPage] = useState('Mesas');
  const { navigate } = props;

  const state = useContext(Context);


  const updateUser = () => {
    const decoded = jwtDecode(state.context.auth.access_token);
    const { email } = decoded;

    const headers = {
      Authorization: `Bearer ${state.context.auth.access_token}`,
      'Content-Type': 'application/json',
    };

    axios.get(`${process.env.REACT_APP_API}/api/v1/user?email=${email}`, {
      headers,
    })
      .then(({ data }) => {
        setUser(data[0].name);
      })
      .catch((error) => console.log(error));
  };

  const ioConnection = () => {
    const socket = io.connect(process.env.REACT_APP_API);
    socket.on('update', () => {
      findAllTables(state.context.auth.access_token)
        .then((res) => {
          if (res.status === 200) { state.setContext({ ...state.context, tables: res.data }); }
        })
        .catch((error) => {
          console.log(error);
        });
    });
    socket.on('disconnect', () => {
      state.setContext({ ...state.context, auth: {} });
      dialog.showMessageBox(lostConnection).then(() => {
        navigate('/');
        socket.close();
      });
    });
  };

  useEffect(() => {
    updateUser();
    findAllTables(state.context.auth.access_token)
      .then((answer) => {
        if (answer.status === 200) {
          state.setContext({ ...state.context, tables: answer.data });
          ioConnection();
        }
      });
  }, []);

  const getCurrentPage = () => {
    switch (page.toLowerCase()) {
      case 'mesas':
        loadTablesMenu(state.context.auth.access_token);
        return <TablesInterface />;
      case 'produtos':
        return <ProductInterface />;
      case 'fornecedores':
        return <ProviderInterface />;
      case 'clientes':
        return <ClientsInterface />;
      case 'configurações':
        return <SettingsInterface />;
      case 'gerenciamento':
        return <ManagementInterface />;
      case 'entregas':
        LoadNullMenu();
        return <DeliveryInterface />;
      default:
        return <TablesInterface />;
    }
  };

  return (
    <div>
      <Background>
        <Header>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <h1 style={{ marginRight: 15 }}>{page}</h1>
          </div>
          <div>
            <span>
              Bem vindo
              {' '}
              {user}
              !
              {' '}
              <button
                type="button"
                style={{
                  color: '#f5f5f5',
                  backgroundColor: 'transparent',
                  border: 'none',
                  textDecoration: 'underline',
                }}
                onClick={() => {
                  dialog.showMessageBox(quitConfirm)
                    .then(({ response }) => {
                      switch (response) {
                        case 2:
                          app.quit();
                          break;
                        case 1:
                          LoadNullMenu();
                          navigate('/');
                          break;
                        default:
                          break;
                      }
                    });
                }}
              >
                sair
              </button>
            </span>
          </div>
        </Header>
        <SubHeader>
          {page && page === 'Mesas' ? (
            <>
              <Button onClick={() => ipcRenderer.invoke('openModal', {
                title: 'Abrir mesa',
                size: {
                  width: 300,
                  height: 120,
                },
                modal: true,
                url: `open?access_token=${state.context.auth.access_token}`,
                resizable: false,
                fulscreenable: false,
              })}
              >
                Abrir mesa (F2)

              </Button>
              <Button onClick={() => ipcRenderer.invoke('openModal', {
                title: 'Lista de espera',
                size: {
                  width: 500,
                  height: 800,
                },
                modal: true,
                url: `list?access_token=${state.context.auth.access_token}`,
                resizable: false,
                fulscreenable: false,
              })}
              >
                Lista de espera (F3)

              </Button>
              <Button onClick={() => ipcRenderer.invoke('openModal', {
                title: 'Adicionar produto',
                size: {
                  width: 800,
                  height: 630,
                },
                modal: true,
                url: `add?access_token=${state.context.auth.access_token}`,
                resizable: false,
                fulscreenable: false,
              })}
              >
                Adicionar produto (F4)

              </Button>
              <Button onClick={() => ipcRenderer.invoke('refresh', {})}>
                Atualizar mesas (F5)

              </Button>
            </>
          ) : null}
        </SubHeader>
        <SideBar>
          <SidebarButton selected={page === 'Mesas'} onClick={() => setPage('Mesas')}>Mesas</SidebarButton>
          {/* Entregas */}
          <SidebarButton selected={page === 'Clientes'} onClick={() => setPage('Clientes')}>Clientes</SidebarButton>
          <SidebarButton selected={page === 'Produtos'} onClick={() => setPage('Produtos')}>Produtos</SidebarButton>
          <SidebarButton selected={page === 'Fornecedores'} onClick={() => setPage('Fornecedores')}>Fornecedores</SidebarButton>
          <SidebarButton selected={page === 'Gerenciamento'} onClick={() => setPage('Gerenciamento')}>Gerenciamento</SidebarButton>
          <SidebarButton selected={page === 'Configurações'} onClick={() => setPage('Configurações')}>Configurações</SidebarButton>
          <ServerInfoButton onClick={() => {}}>
            Servidor ID:
            {' '}
            {getServer()}
          </ServerInfoButton>
        </SideBar>
        <Logo />
        <Container>{getCurrentPage()}</Container>
      </Background>
      <Overlay />
    </div>
  );
};

Home.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Home;
