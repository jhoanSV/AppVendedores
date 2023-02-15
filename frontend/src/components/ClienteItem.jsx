import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity, onLongPress } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ClienteItem = ({ Clientes }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate('DetalleCliente', {Cod: Clientes.Cod, Nit: Clientes.Nit, Ferreteria: Clientes.Ferreteria, Contacto: Clientes.Contacto, Telefono: Clientes.Telefono,  Cel: Clientes.Cel, Email: Clientes.Email, Direccion: Clientes.Direccion, Barrio: Clientes.Barrio, Ruta:  Clientes.Ruta, Nota: Clientes.Nota})}>
    <View style={styles.itemContainer}>
        <Text style={[styles.itemText, {width: 100}]}>{Clientes.Nit}</Text>
        <Text style={[styles.itemText, {width: 300}]}>{Clientes.Ferreteria}</Text>
        <Text style={[styles.itemText, {width: 200}]}>{Clientes.Contacto}</Text>
        <Text style={[styles.itemText, {width: 95}]}>{Clientes.Ruta}</Text>
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

export default ClienteItem;