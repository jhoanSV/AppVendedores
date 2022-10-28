import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { TouchableOpacity, onLongPress } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import 'intl';
import 'intl/locale-data/jsonp/en';

const PedidoItem = ({ item, aumentarCantidad, disminuirCantidad, modificarCantidad }) => {
  const [input, setInput] = useState('' + item.Cantidad);
  function formatNumber(number){
    return new Intl.NumberFormat().format(number);
  };

  const CambiarCantidad=(texto)=>{
    if(texto=== ''){
      setInput('')
    } else if(texto!== ''){
      modificarCantidad(item.cod, parseInt(texto))
      setInput('' + item.Cantidad)
    }
  }

  function colorNota(text){
    if(text === 'AGOTADO'){
      const obj = {color: '#D6320E' }
      return obj;
    }
  };
  function valorTotal(cantidad, Pventa){
    return formatNumber(cantidad*Pventa)
  }
  const navigation = useNavigation()
  return (
    <TouchableOpacity>
        <View style={styles.itemContainer}>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.itemText, {width: 80, fontWeight: 'bold'}]}>{item.cod}</Text>
            <Text style={[styles.itemText, {width: 200}]}>{item.Descripcion}</Text>
            <Text style={[styles.itemText, {width: 100}]}>PU: $ {formatNumber(item.PVenta)}</Text>
            <Text style={[styles.itemText, {width: 100}]}>PT: $ {valorTotal(item.Cantidad, item.PVenta)}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}>
            <View>
              <TextInput
                keyboardType="numeric"
                style={{width: 60,
                        height: 60,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor: '#D9D9D9'}}
                placeholder="0"
                value={input}
                onChangeText={text=>{CambiarCantidad(text)}}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.botonMasMenos} onPress={()=>{aumentarCantidad(item.cod); setInput('' + item.Cantidad)}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFF'}}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botonMasMenos} onPress={()=>{disminuirCantidad(item.cod);setInput('' + item.Cantidad)}}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: '#FFFF'}}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </TouchableOpacity>
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
    },
    botonMasMenos: {
      backgroundColor: '#193773', 
      width: 30,
      height: 30,
      justifyContent:'center',
      alignItems:'center',
    }
})

export default PedidoItem;