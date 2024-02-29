import React, { useEffect, useState } from 'react'
import {View,
        Text,
        StyleSheet,
        Button,
        ScrollView} from 'react-native';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';

function DetalleProducto({ navigation, route }) {
  const [ isAgotado, setIsAgotado ] = useState(false);
  const isFocused = useIsFocused()

  function formatNumber(number){
    return new Intl.NumberFormat().format(number);
  }

  function colorNota(){
    if(route.params.Agotado === 1){
      const obj = {color: '#D6320E' }
      return obj;
    }
  }

  const Agotado =()=>{
    if(route.params.Agotado === 1) {
      setIsAgotado(true);
    } else {
      setIsAgotado(false);
    }
  }

  useEffect(()=> {
    Agotado()
  },[isFocused]);

  return (
    
    <View style={styles.container}>
      <Icon name='west'onPress={() => navigation.goBack()} />
      {isAgotado && (<View style={styles.avisoAgotado}> 
        <Text style={styles.subTitle}>Producto agotado</Text>
      </View>)}
      <ScrollView>
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
        <Text style={[styles.text, colorNota()]}>{route.params.Nota}</Text>
        <Text style={styles.subTitle}>Detalle:</Text>
        <Text style={[styles.text, colorNota()]}>{route.params.Detalle}</Text>
      </ScrollView>
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
  avisoAgotado: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'red'
  }
});

export default DetalleProducto;