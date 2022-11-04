import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity, onLongPress } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import 'intl';
import 'intl/locale-data/jsonp/en';

const TasksItem = ({ task }) => {

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
    <TouchableOpacity onPress={() => navigation.navigate('DetalleProducto', {cod: task.cod, Descripcion: task.Descripcion, UnidadOpaquete: task.UnidadOpaquete, EsUnidadOpaquete: task.EsUnidadOpaquete,SubCategoria: task.SubCategoria,  PVenta: task.PVenta, Nota: task.Nota})}>
    <View style={styles.itemContainer}>
        <Text style={[styles.itemText, {width: 80}]}>{task.cod}</Text>
        <Text style={[styles.itemText, {width: 400}]}>{task.Descripcion}</Text>
        <Text style={[styles.itemText, {width: 55}]}>{task.UnidadOpaquete}</Text>
        <Text style={[styles.itemText, {width: 40}]}>{task.EsUnidadOpaquete}</Text>
        <Text style={[styles.itemText, {width: 200}]}>{task.SubCategoria}</Text>
        <Text style={[styles.itemText, {width: 100}]}>$ {formatNumber(task.PVenta)}</Text>
        <Text style={[styles.itemText, colorNota(task.Nota)]}>{task.Nota}</Text>
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

export default TasksItem;