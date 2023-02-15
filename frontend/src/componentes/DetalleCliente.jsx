import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button} from 'react-native';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'
import { useState } from 'react';
import Warning from '../components/modal/Warning';

function DetalleCliente({ navigation, route }) {
  const cliente={
    Cod: route.params.Cod,
    Nit: route.params.Nit,
    Ferreteria: route.params.Ferreteria, 
    Contacto: route.params.Contacto, 
    Telefono: route.params.Telefono, 
    Cel: route.params.Cel,
    Email: route.params.Email,
    Direccion: route.params.Direccion, 
    Barrio: route.params.Barrio,
    Ruta: route.params.Ruta,
    Nota: route.params.Nota
  }
  const [mostrar, setMostrar] = useState(false)
  function colorNota(text){
    if(text === 'BLOQUEADO'){
      const obj = {color: '#D6320E' }
      return obj;
    }
  }

  const navegar=(text)=>{
    if(text !== 'BLOQUEADO'){
      navigation.navigate('NuevaVenta', cliente)
    } else if (text === 'BLOQUEADO'){
      setMostrar(true)
    }
  }
  return (
    
    <View style={styles.container}>
      <Icon name='west'onPress={() => navigation.goBack()} style={styles.goBlack}/>
      <ScrollView style={styles.scroll}>
        <Text style={styles.subTitle}>Cod:</Text>
        <Text style={styles.text}>{route.params.Cod}</Text>
        <Text style={styles.subTitle}>Nit:</Text>
        <Text style={styles.text}>{route.params.Nit}</Text>
        <Text style={styles.subTitle}>Empresa:</Text>
        <Text style={styles.text}>{route.params.Ferreteria}</Text>
        <Text style={styles.subTitle}>Contacto:</Text>
        <Text style={styles.text}>{route.params.Contacto}</Text>
        <Text style={styles.subTitle}>Telefono:</Text>
        <Text style={styles.text}>{route.params.Telefono}</Text>
        <Text style={styles.subTitle}>Cel:</Text>
        <Text style={styles.text}>{route.params.Cel}</Text>
        <Text style={styles.subTitle}>Email:</Text>
        <Text style={styles.text}>{route.params.Email}</Text>
        <Text style={styles.subTitle}>Direrccion:</Text>
        <Text style={styles.text}>{route.params.Direccion}</Text>
        <Text style={styles.subTitle}>Barrio:</Text>
        <Text style={styles.text}>{route.params.Barrio}</Text>
        <Text style={styles.subTitle}>Ruta:</Text>
        <Text style={styles.text}>{route.params.Ruta}</Text>
        <Text style={styles.subTitle}>Nota:</Text>
        <Text style={[styles.text, colorNota(route.params.Nota)]}>{route.params.Nota}</Text>
      </ScrollView>
        <TouchableOpacity style={styles.buttonLogin} onPress={() => navegar(route.params.Nota)}>
          <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Agregar pedido</Text>
        </TouchableOpacity>
        <Warning visible={mostrar} title={'Cliente bloqueado'} warningText={'Este cliente se encuentra bloqueado, por favor comunicarse con la oficina principal'} setMostrar={setMostrar}/>
    </View>

  )
}

const styles = StyleSheet.create({
  container : {
    padding: 10,
    paddingBottom: 10
  },
  subTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    margin: 8,
    color: 'black',
  },
  text: {
    fontSize: 16,  
    marginLeft: 8,
    color: 'black',
  },
  scroll : {
    flex: 1,
    paddingBottom: 540
  },
  goBlack: {
    float: 'left'
  },
  buttonLogin : {
    borderRadius: 50,
    margin: 4,
    backgroundColor: '#193773',
    //justifyContent:'center',
    alignItems:'center',
  },
  buttons: {
    width: 255,
    justifyContent:'center',
    alignItems:'center',
    //position:'absolute',
  }
});

export default DetalleCliente;