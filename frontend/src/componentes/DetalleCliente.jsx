import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button} from 'react-native';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'
import { useState } from 'react';

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
  return (
    
    <View style={styles.container}>
      <Icon name='west'onPress={() => navigation.goBack()} style={styles.goBlack}/>
      <ScrollView style={styles.scroll}>
        <Text style={styles.subTitle}>Cod:</Text>
        <Text style={styles.text}>{route.params.Cod}</Text>
        <Text style={styles.subTitle}>Nit:</Text>
        <Text style={styles.text}>{route.params.Nit}</Text>
        <Text style={styles.subTitle}>Ferretetia:</Text>
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
        <Text style={styles.text}>{route.params.Nota}</Text>
      </ScrollView>
        <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate('NuevaVenta', cliente)}>
          <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Agregar pedido</Text>
        </TouchableOpacity>
      
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