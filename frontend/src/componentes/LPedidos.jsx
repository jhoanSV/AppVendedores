import React, {useState, useEffect} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, FlatList } from "react-native";
import { pedidosEnviados } from '../api';
import { getGlobal } from '../components/context/user';
import LPedidosList from '../components/LPedidosList';
import Layout from '../components/Layout';
import { useIsFocused } from '@react-navigation/native';

import { TouchableOpacity } from "react-native-gesture-handler";


const LPedidos = () => {
    const [orders, setOrders] = useState([]);
    const [searchorder, setSearchOrder] = useState([]);
    const isFocused = useIsFocused()
    
    useEffect(()=> {
        loadOrders()
      },[isFocused]);
    
    const loadOrders = async() => {
        const data = await pedidosEnviados(getGlobal('User'));
        setOrders(data);
        setSearchOrder(data)
    }

    const BuscarOder = async(text) => {
        const data = orders
        const filtro = data.filter((data) => data.NDePedido.toString().includes(text)||data.Ferreteria.toLowerCase().includes(text) || data.Estado.toLowerCase().includes(text))
        setSearchOrder(filtro)
    }
    
    return (
    
        <View style={ styles.Background }>
            <TextInput 
                style={ styles.input }
                placeholder="Buscar..."
                onChangeText={(text)=>{BuscarOder(text.toLowerCase())}}
            />
            <Layout>
                <View style={styles.container}>
                    <Text style={[styles.text, {width: 80, margin: 5}]}>N°Pedido</Text>
                    <Text style={[styles.text, {width: 300, margin: 5}]}>Ferreteria</Text>
                    <Text style={[styles.text, {width: 150, margin: 5}]}>Fecha</Text>
                    <Text style={[styles.text, {width: 150, margin: 5}]}>Fecha entrega</Text>
                    <Text style={[styles.text, {width: 100, margin: 5}]}>Valor</Text>
                    <Text style={[styles.text, {width: 100, margin: 5}]}>Estado</Text>
                </View>
                <LPedidosList Lpedido={searchorder}/>
            </Layout>
        </View>
      );
}

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
        width: '95%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
        
        borderRadius: 40,
        backgroundColor: '#ffff',
        borderColor: '#F2CB05',
        borderWidth: 2
    },
    Background: {
        backgroundColor: '#222f3e',
        padding: 10,
        flex: 1,
    },
})

export default LPedidos;