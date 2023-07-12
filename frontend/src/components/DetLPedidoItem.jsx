import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions} from 'react-native'
import { TouchableOpacity, onLongPress } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import 'intl';
import 'intl/locale-data/jsonp/en';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetLPedidoItem = ({ item }) => {
  
  function formatNumber(number){
    return new Intl.NumberFormat().format(number);
  };

  function valorTotal(cantidad, Pventa){
    return formatNumber(cantidad*Pventa)
  };

  return (
    <View>
        <View style={styles.itemContainer}>
            <View style={{flexDirection: 'column', width: windowWidth*0.67}}>
                <Text style={[styles.itemText, {width: 80, fontWeight: 'bold'}]}>{item.Codigo}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.itemText, {width: 200}]}>{item.Descripcion}</Text>
                    <Text style={[styles.itemText, {width: 40, fontWeight: 'bold'}]}>{item.Cantidad}</Text>
                    <Text style={[styles.itemText, {width: 200}]}>PT: $ {valorTotal(item.Cantidad, item.VrUnitario)}</Text>
                </View>
                <Text style={[styles.itemText, {width: 100}]}>PU: $ {item.VrUnitario}</Text>
            </View>
        </View>
    </View>
  )
};

const styles = StyleSheet.create({  
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#F2CB05', 
        borderBottomWidth: 1,
    },
    itemText: {
        flexDirection: 'row',
        margin: 5,
    }
})

export default DetLPedidoItem;