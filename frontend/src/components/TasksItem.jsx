import React, {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity, onLongPress } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { setGlobal, getGlobal } from '../components/context/user';

import 'intl';
import 'intl/locale-data/jsonp/en';

const TasksItem = ({ task }) => {

  const cargo = (text) => {
    if (text === 'Asesor externo') {
      return 0.05
    }else {
      return 0
    }}
  
  const porcent = cargo(getGlobal('Position').slice(1, -1))

  function formatNumber(number){
    return new Intl.NumberFormat().format(number);
  }
  
  /*function colorNota(text){
    if(text === 'AGOTADO'){
      const obj = {backgroundColor: '#D6320E' }
      return obj;
    }
  }*/

  function colorNota(){
    if(task.Agotado === 1 ){
      const obj = {backgroundColor: '#D6320E' }
      return obj;
    }
  }


  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetalleProducto', {cod: task.cod,
                                                                            Descripcion: task.Descripcion,
                                                                            Agotado: task.Agotado,
                                                                            UnidadOpaquete: task.UnidadOpaquete,
                                                                            EsUnidadOpaquete: task.EsUnidadOpaquete,
                                                                            SubCategoria: task.SubCategoria,
                                                                            PVenta: task.PVenta + (task.PVenta*porcent),
                                                                            Nota: task.Nota,
                                                                            Detalle: task.Detalle })}>
    <View style={[styles.itemContainer, colorNota(task.Nota)]}>
        <Text style={[styles.itemText, {width: 80}]}>{task.cod}</Text>
        <Text style={[styles.itemText, {width: 400}]}>{task.Descripcion}</Text>
        <Text style={[styles.itemText, {width: 95}]}>{task.EsUnidadOpaquete}</Text>
        <Text style={[styles.itemText, {width: 100}]}>$ {formatNumber(task.PVenta + (task.PVenta*porcent))}</Text>
        <Text style={[styles.itemText, {width: 200}]}>{task.SubCategoria}</Text>
        <Text style={[styles.itemText]}>{task.Nota}</Text>
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