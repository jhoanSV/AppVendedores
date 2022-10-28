import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import PedidoItem from './PedidoItem';

const PedidoList =({ Pedido, aumentarCantidad, disminuirCantidad, modificarCantidad }) => {
  const renderItem=({ item })=>{
    return <PedidoItem item={ item } aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} modificarCantidad={modificarCantidad} />
  }  
  
  return (
        <FlatList
          data={Pedido}
          renderItem={renderItem}
          style={styles.container}
        />    
    );
};

const styles = StyleSheet.create({
    container: {
        height: 320,
        width: 320,
        margin: 12,
        marginTop: 0,
        borderWidth: 0,
        padding: 0,
        backgroundColor: '#ffff',
        borderColor: '#F2CB05',
        borderWidth: 1,
    }
  });

export default PedidoList;