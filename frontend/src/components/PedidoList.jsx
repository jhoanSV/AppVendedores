import React, {useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import PedidoItem from './PedidoItem';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PedidoList =({ Pedido, aumentarCantidad, disminuirCantidad, modificarCantidad }) => {
  const flatListRef = useRef(null);

  const handleTextInputFocus = (index) => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0,
      });
    }
  };
  

  const renderItem=({ item, index })=>{
    return <PedidoItem
            item={ item }
            index={ index }
            aumentarCantidad={aumentarCantidad}
            disminuirCantidad={disminuirCantidad}
            modificarCantidad={modificarCantidad}
            onTextInputFocus={handleTextInputFocus} />
  }  
  
  return (
      <ScrollView horizontal={true} style = {{ flexGrow: 1 }}>
        <FlatList
          data={Pedido}
          renderItem={renderItem}
          style={[styles.containerL, {flex: 1}]}
          keyExtractor={(item, index) => index.toString()}
          keyboardShouldPersistTaps="handled"
        />
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerL: {
        height: windowHeight*0.55,//320,
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