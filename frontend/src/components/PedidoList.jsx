import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import PedidoItem from './PedidoItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        height: windowHeight*0.49,//320,
        width: windowWidth * 0.94,//320,
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