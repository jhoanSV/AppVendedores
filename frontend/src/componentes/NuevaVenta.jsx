import React,{useState, useEffect, useRef, Fragment } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, FlatList, Pressable, ProgressBarAndroidComponent, Modal, Platform, Image, Dimensions} from 'react-native';
import { getTasks, SearchTasks, consecutivos, consPrefactura } from '../api';
import DesTaskList from '../components/DesTaskList';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'
import { BorderlessButton } from 'react-native-gesture-handler';
import PedidoItem from '../components/PedidoItem';
import PedidoList from '../components/PedidoList';
import DateTimePicker from '@react-native-community/datetimepicker'
import { setGlobal, getGlobal } from '../components/context/user';
import { aTablas } from '../api';
import { CargadoConExito, progress, Logo_color } from "../../assets";
import { captureRef } from 'react-native-view-shot';
import Warning from '../components/modal/Warning';
//import { Share } from 'react-native-share';
//import {shareImageFromUri} from 'react-native-share-image';
import * as Sharing from 'expo-sharing';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function NuevaVenta({ navigation, route }) {
  const viewRef = useRef();
  const [input, setInput] = useState('');
  const [pedido, setPedido] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleAviso, setVisibleAviso] = useState(false);
  const [visibleAvisoProducto, setVisibleAvisoProducto] = useState(false);
  const [visibleEnvioExitoso, setVisibleEnvioExitoso]= useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  const [textDate, setTextDate] = useState('');
  const [avisoRojo, setAvisoRojo] = useState(false);
  const [notaRojo, setNotaRojo] = useState('');
  const [visiblevCargando, setVisiblevCargando] = useState(false);
  const [recordatorio, setRecordatorio ] = useState(false);
  const [confirmar, setConfirmar] = useState({
    "NPedido": "NpreFactura",
    "Cliente": "route.params.Ferreteria",
    "Valor": "sumaTotal().replace(/,/g, '')",
    "FechaDesde": "hoyDate",
    "FechaHasta": "textDate"
  });

  useEffect(()=> {
    handleSubmit('')
  },[]);

  function formatNumber(number){
    return new Intl.NumberFormat().format(number);
  };

  const shareImage = async() => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7
      });
      //shareImageFromUri(uri);
      Sharing.shareAsync(uri)
      setTimeout(() => {  
        setRecordatorio(false)
      }, 2000);
    } catch (errors) { 
      console.error(errors);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const aLaTablaDeIngresados = async (cadena) => {
    aTablas({
      "tabla": "tabladeingresados",
      "cadenaDeInsercion": cadena
    })

  };

  const enviarPedido = async()=> {
      if (textDate === ''){
        setAvisoRojo(true)
        //setNotaRojo('Escoja una fecha de envio')
        setTimeout(() => {  
          setAvisoRojo(false)
        }, 2000);
      } else {
        try {
          setVisiblevCargando(true)
          let aTablaDeIngresados = '';
          let hoy = new Date(Date.now());
          let hoyDate = hoy.getDate() + '/' + (hoy.getMonth()+1) + '/' + hoy.getFullYear();
          let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()
          const dias = [
            'domingo',
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sábado',
          ];
          const numeroDia = hoy.getDay();
          const numeroDiaSeleccionado = new Date(date).getDay()
          const nombreDia = dias[numeroDia];
          const nombreDiaSeleccionado = dias[numeroDiaSeleccionado];
          let N = await consecutivos();
          let NpreFactura = N[0]["PreFactura"]
          let OdePedido = N[0]["ODePedido"] + 1
          const aEstados = '(' + '\'' + NpreFactura + '\'' + ',' + '\'' + route.params.Cod + '\'' + ',' + '\'' + route.params.Ferreteria + '\'' + ',' + '\'' + hoyDate + '\'' + ',' + '\'' + sumaTotal().replace(/,/g, '') + '\'' + ',' + '\'' +'Contado' + '\'' +',' + '\'' + 'Ingresado' + '\'' + ',' + '\'' + '' + '\'' + ',' + '\'' + hoyDate + '\'' +',' + '\'' + textDate + '\'' + ',' + '\'' + '' + '\'' +')';
          pedido.map((pedido, index) => {
            aTablaDeIngresados = aTablaDeIngresados + '(' + '\'' + NpreFactura + '\'' + ',' + '\'' + OdePedido +  '\'' + ',' + '\'' + pedido.Cantidad + '\'' +',' +  '\'' + pedido.cod +  '\'' + ',' + '\'' + pedido.Descripcion + '\'' +',' + '\'' +  pedido.PVenta +  '\'' + ',' +  '\'' + pedido.Costo +  '\'' + ',' +  '\'' +  route.params.Cod  + '\'' + ',' +  '\'' + getGlobal('User') +  '\'' + ',' +  '\'' +  hoyDate +  '\'' + ',' +  '\'' + textDate +  '\'' + ',' +  '\'' + 'Contado' +  '\'' + ',' + '\'' + hora +  '\'' + ',' +  '\'' + 'F' +  '\'' + ',' +  '\'' +  hoyDate +  '\'' + ')'  + ','
          })
          aTablaDeIngresados = aTablaDeIngresados.slice(0, -1);
            aLaTablaDeIngresados(aTablaDeIngresados)
            aTablas({
              "tabla": "tabladeestados",
              "cadenaDeInsercion": aEstados
            })
            consPrefactura(NpreFactura + 1)
            setTextDate('')
            setVisibleEnvioExitoso(true)
            setVisiblevCargando(false)
            setTimeout(() => {  
              setVisibleEnvioExitoso(false)
              cancelarPedido()
              setRecordatorio(true)
            }, 2000);
            console.log(aTablaDeIngresados)
            console.log(aEstados)
            setConfirmar({
              "NPedido": NpreFactura,
              "Cliente": route.params.Ferreteria,
              "Valor": sumaTotal().replace(/,/g, ''),
              "FechaDesde": nombreDiaSeleccionado + ' ' + textDate,
              "FechaHasta": "O a mas tardar un día habil despúes"
            })
        }catch (error) {
          setVisiblevCargando(false)
          setNotaRojo('Error al enviar')
          setAvisoRojo(true)
          setTimeout(() => {  
            setAvisoRojo(false)
          }, 2000);
          console.log(error)

        }
      }
    
  };

  const ModalConfirmacion = ({visible, children}) => {
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal, {height: 370,}]} >
            <View style={[{flexDirection: 'row', backgroundColor: '#193773', borderBottomColor: '#F2CB05', borderBottomWidth: 6,}]}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Recordatorio</Text>
              <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setRecordatorio(false)}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>X</Text>
              </TouchableOpacity>
            </View>
            <Fragment>
            <View style={{borderColor: '#193773', borderWidth: 2, marginBottom: 5, backgroundColor: '#FFFF'}} ref={viewRef}>
              <Image style={[{position: 'relative',width: 100, height: 50, marginLeft: 5}]} source={ Logo_color } resizeMode='contain' />
              <Text style={[styles.text, {position: 'absolute', right: 5, fontSize: 20, color: '#4DBE25', fontWeight: 'bold'}]}>!Enviado con exito!</Text>
              <Text style={[styles.text, {color: '#193773', fontWeight: 'bold'}]}>N° de pedido: {confirmar.NPedido}</Text>
              <Text style={[styles.text, {color: '#193773', fontWeight: 'bold'}]}>Empresa:</Text>
              <Text style={[styles.text, {color: '#193773'}]}>{confirmar.Cliente}</Text>
              <Text style={[styles.text, {color: '#193773', fontWeight: 'bold'}]}>Valor:</Text>
              <Text style={[styles.text, {color: '#193773'}]}>$ {formatNumber(confirmar.Valor)}</Text>
              <Text style={[styles.text, {color: '#193773', fontWeight: 'bold'}]}>Fecha de entrega:</Text>
              <Text style={[styles.text, {color: '#193773'}]}>{confirmar.FechaDesde}</Text>
              <Text style={[styles.text, {color: '#193773'}]}>{confirmar.FechaHasta}</Text>
              <Text style={[styles.subTitle, {color: '#193773', margin: 5, fontWeight: 'bold'}]}>WWW.FERRESIERRA.COM</Text>
            </View>
            </Fragment>
            <TouchableOpacity style={[styles.buttonLogin, {position: 'absolute', bottom: 5, width: 290, backgroundColor: '#193773'}]} onPress={()=>shareImage()}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Compartir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); //Platform.OS === 'android'
    setDate(currentDate)
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
    setTextDate(fDate)
  };

  const ModalCargando = ({visible, children}) => {
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal, { justifyContent: 'center', alignItems: 'center', borderRadius: 60 }]}>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#193773'}]}>Enviando...</Text>
            <Image style={[styles.logo]} source={ progress } resizeMode='contain' />
          </View>
        </View>
      </Modal>
    );
  };

  const ModalEnvioExitoso = ({visible, children}) => {
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal, {justifyContent: 'center', alignItems: 'center'}]}>
            <Image style={[styles.logo]} source={ CargadoConExito } resizeMode='contain' />
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
              <TouchableOpacity onPress={()=>showMode('date')}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  'black'}]}>Fecha</Text>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  'black'}]}>{textDate}</Text>
              </TouchableOpacity>
            {show && (<DateTimePicker
              testID='dateTimePicker'
              //open={show}
              value={date}
              mode='date'
              is24Hour={true}
              //display='default'
              onChange={onChange}
            />)}
            <TouchableOpacity style={[styles.buttonLogin, {position: 'absolute', bottom: 5, width: 290, backgroundColor: '#193773'}]} onPress={()=>enviarPedido()}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Enviar pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const verificarAgregarPedido = () => {
    if (pedido.length !== 0){
      setVisible(true)
    } else {
      setAvisoRojo(true)
      setNotaRojo('No hay productos para enviar')
      setTimeout(() => {  
        setAvisoRojo(false)
      }, 2000);
    }
  };

  const cancelarPedido=()=>{
    setPedido([])
    setVisible(false)
    handleSubmit('')
    setTextDate('')
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
      setTimeout(() => {  
        setVisibleAvisoProducto(false)
      }, 2000);
    }
  };
  
  const aumentarCantidad=(Cod, paquete)=>{
    if(pedido.length !== 0){
      var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
      pedido[index].Cantidad = pedido[index].Cantidad + paquete
      handleSubmit('')
    }
  };
  
  const disminuirCantidad=(Cod, paquete)=>{
    if(pedido.length !== 0){
      var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
      pedido[index].Cantidad = pedido[index].Cantidad - paquete
      handleSubmit('')
      if(pedido[index].Cantidad<1){
        pedido.splice(index, 1)
        handleSubmit('')
      }
    }
  };

  const modificarCantidad=(Cod,Cantidad,paquete)=>{
    if(pedido.length !== 0){
      var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
      var NuevaCantidad = Math.ceil(Cantidad/paquete)*paquete
      pedido[index].Cantidad = NuevaCantidad
      handleSubmit('')
      if(pedido[index].Cantidad<1){
        pedido.splice(index, 1)
        handleSubmit('')
      }
    }
  };

  const [tasks, setTasks] = React.useState([]);
  const [pro, setPro] = React.useState([]);

  const searchTasks = async(text) => {
    /*const data = await SearchTasks(text);
    setTasks(data);*/
    const data = pro
    const filtro = data.filter((data) => data.cod.toLowerCase().includes(text)||data.Descripcion.toLowerCase().includes(text) || data.SubCategoria.toLowerCase().includes(text))
    setTasks(filtro);
  };
  const handleSubmit = async(text) => {
    if (text === ''){
      setInput(text)
      const data = await getTasks();
      setPro(data)
    } else {
      setInput(text)
      searchTasks(text.toLowerCase())
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
      return (
        <ScrollView horizontal={true} style={styles.container2}>
          <DesTaskList tasks={tasks} agregarPedido={agregarPedido} handleSubmit={handleSubmit}/>
        </ScrollView>
        )
    } else {
      return
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
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

      <View style={{backgroundColor:'#F2CB05', height: windowHeight*0.058, alignItems:'flex-end'}}>
        <Text style={[styles.subTitle,{right: 0}]}>Total: {sumaTotal()} </Text>
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
      <ModalPopUpEnviarPedido visible={visible}></ModalPopUpEnviarPedido>
      <ModalPopUpAviso visible={visibleAviso}></ModalPopUpAviso>

      <Warning visible={visibleAvisoProducto} title={'Producto repetido'} warningText={'Producto repetido, verifique el pedido'} setMostrar={setVisibleAvisoProducto}/>
      <Warning visible={avisoRojo} title={'Pedido sin fecha'} warningText={'Escoja una fecha de envio'} setMostrar={setAvisoRojo}/>

      <ModalEnvioExitoso visible={visibleEnvioExitoso}></ModalEnvioExitoso>
      
      <ModalCargando visible={visiblevCargando}></ModalCargando>
      <ModalConfirmacion visible={recordatorio}></ModalConfirmacion>
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
}
});

export default NuevaVenta;