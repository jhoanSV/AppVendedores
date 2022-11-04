import React from 'react';
import {FlatList} from 'react-native';
import ClienteItem from './ClienteItem';

const ClienteList =({ Clientes }) => {
  const renderItem=({ item })=>{
    return <ClienteItem Clientes={ item }/>
  }  
  
  return (
        <FlatList
          data={Clientes}
          renderItem={renderItem}
        />    
    );
};

export default ClienteList;