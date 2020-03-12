import React, { useEffect, useContext } from 'react';
import { Tables, Table, ScrollView } from '../../components';
import { findAllTables } from '../../components/functions';
import { Consumer, Context } from '../../../context';

const getData = (data) => {
  let result = [];
  if (data.length > 0) {
    result = data.map((table) => <Table key={table.orderId} load={table} />);
    return result;
  }
  return (
    <div>
      <span>Nenhuma mesa aberta!</span>
    </div>
  );
};

const TablesInterface = () => {
  const state = useContext(Context);

  useEffect(() => {
    findAllTables(state.context.auth.access_token)
      .then((result) => {
        if (result.status === 200) { state.setContext({ ...state.context, tables: result.data }); }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Consumer>
      {({ context }) => (
        <Tables>
          <ScrollView>
            {getData(context.tables)}
            <div style={{ minWidth: 7 }} />
          </ScrollView>
        </Tables>
      )}
    </Consumer>
  );
};

export default TablesInterface;
