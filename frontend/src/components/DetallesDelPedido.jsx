import React,{useState, useEffect, useRef, Fragment } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Image, Dimensions, RefreshControl, FlatList} from 'react-native';
import DetLPedidoItem from '../components/DetLPedidoItem';
import DateTimePicker from '@react-native-community/datetimepicker'
import { setGlobal, getGlobal } from '../components/context/user';
import { CargadoConExito, progress, Logo_color } from "../../assets";
import { captureRef } from 'react-native-view-shot';
import Warning from '../components/modal/Warning';
import Loading from '../components/modal/Loading';
import * as Sharing from 'expo-sharing';
import { useIsFocused } from '@react-navigation/native';
import { DetallePedido } from '../api'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DetallesDelPedido({ navigation, route }) {
    const [refreshing, setrefreshing] = useState(false)
    const [Pedido, setPedido] = useState([]);
    Const [permisos, setPermisos] = useState(false);

    const permissions = () => {
        if(getGlobal('Position')==='Asesor comercial'){
            setPermisos(false); 
        } else if(getGlobal('Position')==='Entregas'){
            setPermisos(true);
        }
    };

    function formatNumber(number){
        return new Intl.NumberFormat().format(number);
    };

    useEffect(() => {
        buscarPedido()
    },[]);
    
    const buscarPedido = async () => {
        const ElPedido = await DetallePedido(route.params.NDePedido)
        setPedido(ElPedido)
    };

    const renderItem=({ item })=>{
        return <DetLPedidoItem item={ item }/>
    };

    function colorNota(text){
        if(text === 'Ingresado'){
          return {backgroundColor: '#F2F2F2'}
        } else if (text === 'Alistado') {
          return {backgroundColor: '#FBD9B1'}
        } else if (text === 'Verificado') {
          return {backgroundColor: '#FBD9B1'}
        } else if (text === 'En ruta') {
          return {backgroundColor: '#FABD1F'}
        } else if (text === 'Entregado') {
          return {backgroundColor: '#4DBE25'}
        } else if (text === 'No entregado') {
          return {backgroundColor: '#DA4404'}
        }
    }
    
    return (
        <View style={[styles.container]}>
            <View style={[ styles.ContenedorEstado, colorNota(route.params.Estado)]}>
                <Text style={[styles.subTitle, {color: '#000000'}]}>
                    Estado: {route.params.Estado}
                </Text>
                <View style={{alignItems:'flex-end', flex: 1 }}>
                    <Text style={[styles.subTitle, {color: '#000000'}]}>
                        {route.params.NDePedido}
                    </Text>
                </View>
            </View>
            <ScrollView 
                horizontal={true} 
                refreshControl={<RefreshControl 
                                refreshing={refreshing} 
                                onRefresh={()=>actualizar()}/>}>
                <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                    <View>
                    <Text style={styles.subTitle}>Empresa:</Text>
                    <Text style={styles.text}>{route.params.Ferreteria}</Text>
                    </View>
                    <View>
                    <Text style={styles.subTitle}>Dirección:</Text>
                    <Text style={styles.text}>{route.params.Direccion}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'column'}}>
                <View>
                    <Text style={styles.subTitle}>Ruta:</Text>
                    <Text style={styles.text}>{route.params.Ruta}</Text>
                    </View>
                    <View>
                    <Text style={styles.subTitle}>Barrio:</Text>
                    <Text style={styles.text}>{route.params.Barrio}</Text>
                    </View>
                </View>
                </View>
            </ScrollView>

            <View>
                <ScrollView horizontal={true}>
                    <FlatList
                        data={Pedido}
                        style={styles.containerL}
                        renderItem={renderItem}
                    />
                </ScrollView>
            </View>
        
            <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
                
                <View style={{backgroundColor:'#F2CB05', height: windowHeight*0.058, alignItems:'flex-end'}}>
                    <Text style={[styles.subTitle,{right: 0}]}>Total: {formatNumber(route.params.VrFactura)}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                    <View>
                        <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: '#D6320E',}]} onPress={()=>setVisibleAviso(true)}>
                            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: '#193773', right: 0}]} onPress={()=>verificarAgregarPedido()}>
                            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Agregar pedido</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container : {
    //padding: 10,
    paddingBottom: 10
  },
  subTitle: {
    fontSize: 20, 
    fontWeight: 'bold', 
    margin: 8,
    color: '#193773',
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
    margin: 2,
    bottom: 0,
    width: windowWidth * 0.49,//170,
    //alignItems:'center',
  },
  buttons: {
    width: 255,
    justifyContent:'center',
    alignItems:'center',
    //position:'absolute',
  },
  input: {
    height: 40,
    width: windowWidth * 0.94,//320,
    margin: 12,
    //marginBottom: 0,
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#ffff',
    borderColor: '#F2CB05',
    borderWidth: 2,
    //borderBottomWidth: 0,
    //BorderlessButton: 0
  },
  input2: {
    height: 40,
    width: windowWidth * 0.94,//320,
    margin: 12,
    marginBottom: 0,
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: '#ffff',
    borderColor: '#F2CB05',
    borderWidth: 2,
    borderBottomWidth: 0,
  },
  ModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedorModal: {
    backgroundColor: '#FFFF',
    width: 300,
    height: 300,
  },
  logo: {
    position: 'relative',
    width: 270,
    height: 270,
  },
  container2: {
    height: windowHeight* 0.13, //90,
    width: windowWidth * 0.94,//320,
    margin: 12,
    marginTop: 0,
    borderWidth: 0,
    padding: 0,
    backgroundColor: '#ffff',
    borderColor: '#F2CB05',
    borderWidth: 2,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    },
  ContenedorEstado: {
    flexDirection: 'row', 
    ustifyContent: 'space-between',
    },
  containerL: {
        height: windowHeight*0.49,
        width: windowWidth,
        margin: 12,
        marginTop: 0,
        borderWidth: 0,
        padding: 0,
        backgroundColor: '#ffff',
        borderColor: '#F2CB05',
        borderWidth: 1,
    }
});

export default DetallesDelPedido;
