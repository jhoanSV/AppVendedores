import React, {useState, useEffect} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, FlatList } from "react-native";
import { getClientes, SearClientesTodos } from '../api';
import ClienteList from '../components/ClienteList';
import Layout from '../components/Layout';
import { TouchableOpacity } from "react-native-gesture-handler";
import { setGlobal, getGlobal } from '../components/context/user';

const LClientes = () => {
  const [clientes, setClientes] = useState([]);
  
  const searClientesTodos = async(text) => {
    const data = await SearClientesTodos(text);
    setClientes(data);
  };
  const loadClientes = async(text) => {
    const data = await getClientes({
      "CodVendedor": getGlobal('User').slice(1, -1),
      "busqueda": text
    });
    setClientes(data);
  };
  
  const handleSubmit = (text) => {
    if (text === ''){
        searClientesTodos(getGlobal('User').slice(1, -1))
    } else if (text !== '') {
        loadClientes(text)
    }
  };

  useEffect(()=> {
    handleSubmit("")
  },[])

  return (
    
    <Layout>
      <TextInput 
        style={ styles.input }
        placeholder="Buscar..."
        onChangeText={text=> {handleSubmit(text)}}
      />
        <View style={styles.container}>
          <Text style={[styles.text, {width: 100, margin: 5}]}>Nit</Text>
          <Text style={[styles.text, {width: 300, margin: 5}]}>Ferreteria</Text>
          <Text style={[styles.text, {width: 200, margin: 5}]}>Contacto</Text>
          <Text style={[styles.text, {width: 95, margin: 5}]}>Ruta</Text>
        </View>
        <ClienteList Clientes={clientes}/>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#193773',
    borderBottomColor: '#F2CB05', 
    borderBottomWidth: 5,
    padding: 5
},
  text: {
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 8,
    color: '#FFFF',
  },
  input: {
    height: 40,
    width: 700,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    
    borderRadius: 40,
    backgroundColor: '#ffff',
    borderColor: '#F2CB05',
    borderWidth: 2
  },
})

export default LClientes;
