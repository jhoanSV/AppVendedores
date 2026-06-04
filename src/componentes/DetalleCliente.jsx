import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Dimensions, SafeAreaView, Linking} from 'react-native';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'
import { useState } from 'react';
import Warning from '../components/modal/Warning';
import { getTasks } from '../api';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function DetalleCliente({ navigation, route }) {
  const Cliente= route.params
  const [mostrar, setMostrar] = useState(false);
  const [mostrarGeo, setMostrarGeo] = useState(false);

  function colorNota(text){
    if(text === 'BLOQUEADO'){
      const obj = {color: '#D6320E' }
      return obj;
    }
  }

  const Geo =(input)=>{
    if (input !== ""){
      Linking.openURL('google.navigation:q='+ route.params.Geolocalizacion)
    } else {
      setMostrarGeo(true)
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
    <SafeAreaView style={[styles.container, {flex: 1}]}>
      <Icon name='west'onPress={() => navigation.goBack()} style={styles.goBlack}/>
      <View style={{flex: 1}}>{/*<View style={{height: windowHeight*0.78}}>*/}
      <ScrollView style={styles.scroll}>
        { Cliente.Estado === 'BLOQUEADO' &&
          <View style={{backgroundColor: '#D6320E', alignItems: 'center'}}>
            <Text style={[styles.text, {color: '#FFF'}]}> {Cliente.Estado} </Text>
          </View>
        }
        <Text style={styles.subTitle}>Cod:</Text>
        <Text style={styles.text}>{Cliente.Cod}</Text>
        <Text style={styles.subTitle}>Nit:</Text>
        <Text style={styles.text}>{Cliente.Nit}</Text>
        <Text style={styles.subTitle}>Empresa:</Text>
        <Text style={styles.text}>{Cliente.Ferreteria}</Text>
        <Text style={styles.subTitle}>Contacto:</Text>
        <Text style={styles.text}>{Cliente.Contacto}</Text>
        <Text style={styles.subTitle}>Telefono:</Text>
        <Text style={styles.text}>{Cliente.Telefono}</Text>
        <Text style={styles.subTitle}>Cel:</Text>
        <Text style={styles.text}>{Cliente.Cel}</Text>
        <Text style={styles.subTitle}>Email:</Text>
        <Text style={styles.text}>{Cliente.Email}</Text>
        <Text style={styles.subTitle}>Direrccion:</Text>
        <Text style={styles.text}>{Cliente.Direccion}</Text>
        <Text style={styles.subTitle}>Barrio:</Text>
        <Text style={styles.text}>{Cliente.Barrio}</Text>
        <Text style={styles.subTitle}>Ruta:</Text>
        <Text style={styles.text}>{Cliente.Ruta}</Text>
        <Text style={styles.subTitle}>Geolocalización:</Text>
        <TouchableOpacity onPress={() => Geo(Cliente.Geolocalizacion)}> 
          <Text style={[styles.text, {color: '#003baa', textDecorationLine: 'underline'} ]}>{Cliente.Geolocalizacion}</Text>
        </TouchableOpacity>
        <Text style={styles.subTitle}>Nota:</Text>
        <Text style={[styles.text]}>{Cliente.Nota}</Text>
      </ScrollView>
      </View>
      <TouchableOpacity style={styles.buttonLogin} onPress={() => navegar(Cliente.Estado)}>
        <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Agregar pedido</Text>
      </TouchableOpacity>
      <Warning visible={mostrar} title={'Cliente bloqueado'} warningText={'Este cliente se encuentra bloqueado, por favor comunicarse con la oficina principal'} setMostrar={setMostrar} SetConfirmation={()=>{}} ConfirmationText={'Entendido'}/>
      <Warning visible={mostrarGeo} title={'Sin Geolocalización'} warningText={'Este cliente aun no nuenta con geolocalización, por favor solicitarla a la oficina principal'} setMostrar={setMostrarGeo} SetConfirmation={()=>{}} ConfirmationText={'Entendido'}/>
    </SafeAreaView>

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
    //paddingBottom: windowHeight*0.78,//540
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
  
});

export default DetalleCliente;