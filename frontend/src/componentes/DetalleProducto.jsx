import React from 'react'
import { View, Text, StyleSheet, Button} from 'react-native';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'

function DetalleProducto({ navigation, route }) {
  function formatNumber(number){
    return new Intl.NumberFormat().format(number);
  }

  function colorNota(text){
    if(text === 'AGOTADO'){
      const obj = {color: '#D6320E' }
      return obj;
    }
  }
  return (
    
    <View style={styles.container}>
      <Icon name='west'onPress={() => navigation.goBack()} />
      <Text style={styles.subTitle}>Cod:</Text>
      <Text style={styles.text}>{route.params.cod}</Text>
      <Text style={styles.subTitle}>Descripción:</Text>
      <Text style={styles.text}>{route.params.Descripcion}</Text>
      <Text style={styles.subTitle}>Empaque:</Text>
      <Text style={styles.text}>{route.params.UnidadOpaquete}</Text>
      <Text style={styles.text}>{route.params.EsUnidadOpaquete}</Text>
      <Text style={styles.subTitle}>Sub categoria:</Text>
      <Text style={styles.text}>{route.params.SubCategoria}</Text>
      <Text style={styles.subTitle}>Precio de venta:</Text>
      <Text style={styles.text}>$ {formatNumber(route.params.PVenta)}</Text>
      <Text style={styles.subTitle}>Nota:</Text>
      <Text style={[styles.text, colorNota(route.params.Nota)]}>{route.params.Nota}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    padding: 10,
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
});

export default DetalleProducto;