import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity, onLongPress } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import PedidoList from '../components/PedidoList';

import 'intl';
import 'intl/locale-data/jsonp/en';
import { useState } from 'react';

const DesTasksItem = ({ agregarPedido, item, handleSubmit }) => {
  const AlPedido= ()=>{
    if(item.Nota !== 'AGOTADO'){
      agregarPedido({cod: item.cod, Descripcion: item.Descripcion, UnidadOpaquete: item.UnidadOpaquete, EsUnidadOpaquete: item.EsUnidadOpaquete, SubCategoria: item.SubCategoria, PVenta: item.PVenta, Cantidad: 1, Costo: item.Costo, Nota: item.Nota});
      handleSubmit('')
    }
  }
  function formatNumber(number){
    return new Intl.NumberFormat().format(number);
  }
  function colorNota(text){
    if(text === 'AGOTADO'){
      const obj = {color: '#D6320E' }
      return obj;
    }
  }
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>AlPedido()}>
    <View style={styles.itemContainer}>
        <Text style={[styles.itemText, {width: 80}, colorNota(item.Nota)]}>{item.cod}</Text>
        <Text style={[styles.itemText, {width: 400}, colorNota(item.Nota)]}>{item.Descripcion}</Text>
        <Text style={[styles.itemText, {width: 100}, colorNota(item.Nota)]}>$ {formatNumber(item.PVenta)}</Text>
    </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({  
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomColor: 'black', 
        borderBottomWidth: 1,
        
    },
    itemText: {
        flexDirection: 'row',
        margin: 5,
    },
})

export default DesTasksItem;