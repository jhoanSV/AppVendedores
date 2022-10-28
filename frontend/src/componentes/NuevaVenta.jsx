import React,{useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, FlatList, Pressable, ProgressBarAndroidComponent, Modal} from 'react-native';
import { getTasks, SearchTasks } from '../api';
import DesTaskList from '../components/DesTaskList';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'
import { BorderlessButton } from 'react-native-gesture-handler';
import PedidoItem from '../components/PedidoItem';
import PedidoList from '../components/PedidoList';

//import { useState } from 'react';

function NuevaVenta({ navigation, route }) {
  const [input, setInput] = useState('');
  const [pedido, setPedido] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleAviso, setVisibleAviso] = useState(false);
  const [visibleAvisoProducto, setVisibleAvisoProducto] = useState(false);
  setTimeout(() => {  
    setVisibleAvisoProducto(false)
  }, 5000);

  const ModalPopUpAvisoProducto = ({visible, children}) => {
    const [showModal, setShowModal] = useState(visible);
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal]}>
            <View style={[{flexDirection: 'row', backgroundColor: '#D6320E', borderBottomColor: '#F2CB05', borderBottomWidth: 6,}]}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Aviso</Text>
              <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setVisibleAvisoProducto(false)}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#D6320E'}]}>Producto repetido, verifique el pedido</Text>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalPopUpAviso = ({visible, children}) => {
    const [showModal, setShowModal] = useState(visible);
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal]}>
            <View style={[{flexDirection: 'row', backgroundColor: '#D6320E', borderBottomColor: '#F2CB05', borderBottomWidth: 6,}]}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Aviso</Text>
              <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setVisibleAviso(false)}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#D6320E'}]}>¿Esta seguro que desea cancelar este pedido?</Text>
            <TouchableOpacity style={[styles.buttonLogin, {position: 'absolute', bottom: 5, width: 290, backgroundColor: '#D6320E'}]} onPress={()=>{cancelarPedido(),setVisibleAviso(false)}}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Cancelar pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalPopUpEnviarPedido = ({visible, children}) =>{
    const [showModal, setShowModal] = useState(visible);
    return (
      <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal]}>
            <View style={[{flexDirection: 'row', backgroundColor: '#193773', borderBottomColor: '#F2CB05', borderBottomWidth: 6,}]}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Notas del pedido</Text>
              <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setVisible(false)}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.text]}>Fecha de entrega:</Text>
            <TouchableOpacity style={[styles.buttonLogin, {position: 'absolute', bottom: 5, width: 290, backgroundColor: '#193773'}]} onPress={()=>setVisible(true)}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Enviar pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const cadenaDeIngresados = '(' + route.params.Ferreteria + ',' +')'

  const eliminarProducto=(Cod)=>{
    var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
    pedido.splice(index, 1)
  };

  const cancelarPedido=()=>{
    setPedido([])
    handleSubmit('')
    navigation.navigate('LClientes')
  };

  function sumaTotal(){
    if(pedido.length !== 0){
      return new Intl.NumberFormat().format(pedido.reduce((sum, value) => (typeof value.Cantidad == "number" ? sum + (value.Cantidad*value.PVenta) : sum), 0));
    }
  }; 
  // fin intento de suma
  const agregarPedido=(objeto)=>{
    var index = pedido.map(codigo => codigo.cod).indexOf(objeto.cod);
    if(index === -1) {
      pedido.push(objeto)
    } else if(index !== -1) {
      setVisibleAvisoProducto(true)
    }
  };
  
  const aumentarCantidad=(Cod)=>{
    if(pedido.length !== 0){
      var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
      pedido[index].Cantidad = pedido[index].Cantidad + 1
      handleSubmit('')
    }
  };
  
  const disminuirCantidad=(Cod)=>{
    if(pedido.length !== 0){
      var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
      pedido[index].Cantidad = pedido[index].Cantidad - 1
      handleSubmit('')
      if(pedido[index].Cantidad<1){
        pedido.splice(index, 1)
        handleSubmit('')
      }
    }
  };

  const modificarCantidad=(Cod,Cantidad)=>{
    if(pedido.length !== 0){
      var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
      pedido[index].Cantidad = Cantidad
      handleSubmit('')
    }
  };

  const [tasks, setTasks] = React.useState([]);
    const searchTasks = async(text) => {
    const data = await SearchTasks(text);
    setTasks(data);
  };
  const handleSubmit = (text) => {
    if (text === ''){
      setInput(text)
      setTasks([])
    } else {
      setInput(text)
      searchTasks(text)
    }
  };
  function seachInput (){
    if(input !== ''){
      return styles.input2
    } else {
      return styles.input
    }
  }
  function seachDesplegable (){
    if(input !== ''){
      return <DesTaskList tasks={tasks} agregarPedido={agregarPedido} handleSubmit={handleSubmit}/>
    } else {
      return
    }
  }
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', right: 5, margin: 5}}>
        <Icon name='west'onPress={() => navigation.goBack()} style={styles.goBlack}/>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text style={styles.subTitle}>Ferreteria:</Text>
          <Text style={styles.text}>{route.params.Ferreteria}</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>Ruta:</Text>
          <Text style={styles.text}>{route.params.Ruta}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text style={styles.subTitle}>Dirección:</Text>
          <Text style={styles.text}>{route.params.Direccion}</Text>
        </View>
        <View>
          <Text style={styles.subTitle}>Barrio:</Text>
          <Text style={styles.text}>{route.params.Barrio}</Text>
        </View>
      </View>
      <TextInput
        style={ seachInput() }
        placeholder="Buscar producto..."
        value={input}
        onChangeText={text=> {handleSubmit(text)}}
      />
      {seachDesplegable()}
      <View>
        <PedidoList Pedido={pedido} aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} modificarCantidad={modificarCantidad}/>
      </View>
      <View style={{backgroundColor:'#F2CB05', height: 40, alignItems:'flex-end'}}>
        <Text style={[styles.subTitle,{right: 0}]}>Total: {sumaTotal()} </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: '#D6320E',}]} onPress={()=>setVisibleAviso(true)}>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: '#193773', right: 0}]} onPress={()=>setVisible(true)}>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Agregar pedido</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ModalPopUpEnviarPedido visible={visible}></ModalPopUpEnviarPedido>
      <ModalPopUpAviso visible={visibleAviso}></ModalPopUpAviso>
      <ModalPopUpAvisoProducto visible={visibleAvisoProducto}></ModalPopUpAvisoProducto>
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
    width: 170,
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
    width: 320,
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
    width: 320,
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
    
  }
});

export default NuevaVenta;