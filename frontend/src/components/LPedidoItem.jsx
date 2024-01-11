import React, {useEffect} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity, onLongPress } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { setGlobal, getGlobal } from '../components/context/user';

import 'intl';
import 'intl/locale-data/jsonp/en';

const LPedidoItem = ({ task }) => {
    
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

  function colorNota(text){
    if(text === 'Ingresado'){
      return {backgroundColor: '#F2F2F2' }
    } else if (text === 'Alistado') {
      return {backgroundColor: '#FBD9B1' }
    } else if (text === 'Verificado') {
      return {backgroundColor: '#FBD9B1' }
    } else if (text === 'En ruta') {
      return {backgroundColor: '#FABD1F' }
    } else if (text === 'Entregado') {
      return {backgroundColor: '#4DBE25' }
    } else if (text === 'No entregado') {
      return {backgroundColor: '#DA4404' }
    } else if (text === 'Cerrado') {
      return {backgroundColor: '#398A1C'}
    }
  }

  function EstadoDelPedido(text){
    if(text!==''){
      return task.ProcesoDelPedido
    }
    else{
      return task.Estado
    }
  }

  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetallesDelPedido', {NDePedido: task.NDePedido, Ferreteria: task.Ferreteria, Direccion: task.Direccion, Barrio: task.Barrio, FechaFactura: task.FechaFactura,  FechaDeEntrega: task.FechaDeEntrega, VrFactura: task.VrFactura, Estado: task.Estado, ProcesoDelPedido: task.ProcesoDelPedido })}>
      <View style={[styles.itemContainer, colorNota(EstadoDelPedido(task.ProcesoDelPedido))]}>
        <Text style={[styles.itemText, {width: 80}]}>{task.NDePedido}</Text>
        <Text style={[styles.itemText, {width: 300}]}>{task.Ferreteria}</Text>
        <Text style={[styles.itemText, {width: 150}]}>{task.FechaFactura}</Text>
        <Text style={[styles.itemText, {width: 150}]}>{task.FechaDeEntrega}</Text>
        <Text style={[styles.itemText, {width: 100}]}>$ {formatNumber(task.VrFactura)}</Text>
        <Text style={[styles.itemText, {width: 100}]}>{EstadoDelPedido(task.ProcesoDelPedido)}</Text>
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

export default LPedidoItem;