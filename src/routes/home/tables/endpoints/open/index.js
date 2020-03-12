import React, { useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { Input, Button } from '../../../components';
import { openTable } from './functions';

const { dialog } = window.require('electron').remote;

const openFlow = (access_token, body, id) => {
  try {
    openTable(access_token, body)
      .then((result) => {
        if (result.status === 201) {
          dialog.showMessageBox({
            type: 'info',
            buttons: ['Ok'],
            defaultId: 0,
            cancelId: 0,
            title: 'Sucesso',
            message: `A mesa ${result.data.number} foi aberta!`,
            detail: `A ordem do pedido é o ${result.data.order.orderId}`,
          }).then(() => {
            if (id !== '') {
              removeWaitingList(access_token, id)
                .then((result) => {
                  if (result.status === 200) window.close();
                  else window.alert(`Erro ao tentar atualizar lista! (${result.status})`);
                  window.close();
                })
                .catch(() => {
                  window.alert('Erro ao tentar atualizar lista!');
                  window.close();
                });
            } else { window.close(); }
          });
        } else if (result.status === 403) {
          dialog.showMessageBox({
            type: 'error',
            buttons: ['Ok'],
            defaultId: 0,
            cancelId: 0,
            title: 'Erro',
            message: 'Não autorizado',
            detail: 'Tente refazer o login e repita a operação',
          });
        } else if (result.status === 400) {
          let title;
          let message;
          switch (result.data.error) {
            case 'invalid_table':
              title = 'Mesa já em uso';
              message = `A mesa que você está tentando abrir (${body.tableNumber}) já está em uso`;
              break;
            default:
              title = result.data.error;
              message = result.data.error_description;
              break;
          }
          dialog.showMessageBox({
            type: 'error',
            buttons: ['Ok'],
            defaultId: 0,
            cancelId: 0,
            title: 'Erro',
            message: title,
            detail: message,
          });
        }
      })
      .catch((error) => {
        dialog.showMessageBox({
          type: 'error',
          buttons: ['Ok'],
          defaultId: 0,
          cancelId: 0,
          title: 'Erro',
          message: 'Um erro inesperado aconteceu',
          detail: 'Caso persista, contacte o administrador',
        });
        console.error(error);
      });
  } catch (e) {
    console.log(e);
    window.alert(e);
  }
};

const removeWaitingList = (token, id) => axios.delete(`${process.env.REACT_APP_API}/api/v1/waitinglist/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

const OpenTableEndpoint = (props) => {
  const { location } = props;
  const [body, setBody] = useState({ tableNumber: 1 });

  const search = location.pathname.substring(location.pathname.indexOf('?'));
  const params = new URLSearchParams(search);
  const accessToken = params.get('access_token');

  const name = params.get('name') || '';
  const id = params.get('id') || '';

  return (
    <div style={{
      width: 300, height: 120, display: 'flex', alignContent: 'space-between', alignItems: 'center', flexDirection: 'column',
    }}
    >
      <Input containerStyle={{ width: 270 }} label="Mesa" type="number" defaultValue={1} onChange={(e) => setBody({ ...body, tableNumber: e.target.value })} />
      <Input containerStyle={{ width: 270 }} label="Usuário" defaultValue={name !== '' ? name : null} placeholder="Visitante" onChange={(e) => setBody({ ...body, customer: e.target.value })} />
      <Button onClick={() => {
        openFlow(accessToken, body, id);
      }}
      >
        Abrir Mesa

      </Button>
    </div>
  );
};

export default OpenTableEndpoint;
