import React from 'react';
import { View, Text, FlatList} from 'react-native';
import LPedidoItem from './LPedidoItem';

const LPedidosList =({ Lpedido }) => {
  const renderItem=({ item })=>{
    return <LPedidoItem task={ item }/>
  }  
  
  return (
        <FlatList
          data={Lpedido}
          renderItem={renderItem}
        />    
    );
};

export default LPedidosList;