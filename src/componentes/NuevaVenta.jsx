import React,{useState, useEffect, useRef, Fragment } from 'react'
import { View,
        Text,
        StyleSheet,
        ScrollView,
        TouchableOpacity,
        TextInput,
        Modal,
        Image,
        Dimensions,
        RefreshControl,
        KeyboardAvoidingView,
        Platform} from 'react-native';
import { getTasks, consecutivos, SubirPedido, NewSaleApi } from '../api';
import DesTaskList from '../components/DesTaskList';
import PedidoList from '../components/PedidoList';
import DateTimePicker from '@react-native-community/datetimepicker'
import { setGlobal, getGlobal } from '../components/context/user';
import { aTablas } from '../api';
import { TheAlert } from '../components/TheAlert/TheAlert';
import { CargadoConExito, progress, Logo_color } from "../../assets";
import { captureRef } from 'react-native-view-shot';
import Warning from '../components/modal/Warning';
import Loading from '../components/modal/Loading';
import * as Sharing from 'expo-sharing';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import PedidoItem from '../components/PedidoItem';
import PopUpMenu from '../components/PopUpMenu';
import { useTheContext } from '../TheProvider';
import { formatNumber, formatDateForInput } from '../InternalFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function NuevaVenta({ navigation, route }) {
  const viewRef = useRef();
  const height = windowHeight
  const [input, setInput] = useState('');
  const {usD} = useTheContext();
  const [pedido, setPedido] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleAviso, setVisibleAviso] = useState(false);
  const [visibleAvisoProducto, setVisibleAvisoProducto] = useState(false);
  const [visibleEnvioExitoso, setVisibleEnvioExitoso]= useState(false);
  const [visibleTheAlert, setVisibleTheAlert] = useState(false);
  const [visibleWarning, setVisibleWarning] = useState(false);
  const [dataWarnig, setDataWarnig] = useState({})
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  //const [date, setDate] = useState(new Date());
  //const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  //const [textDate, setTextDate] = useState('');
  const [avisoRojo, setAvisoRojo] = useState(false);
  const [notaRojo, setNotaRojo] = useState('');
  const [visiblevCargando, setVisiblevCargando] = useState(false);
  const [recordatorio, setRecordatorio ] = useState(false);
  const [suma, setSuma] = useState(0);
  const [refreshing, setrefreshing] = useState(false)
  const [tasks, setTasks] = React.useState([]);
  const [pro, setPro] = React.useState([]);
  const [isVisible, setIsVisible] = React.useState(false);
  const [visibleSendWarning, setVisibleSendWarning] = useState(false);
  const [inputY, setInputY] = useState(0);
  //const [inputHeight, setInputHeight] = useState(0);
  const isFocused = useIsFocused()
  //const [FechaEnvioAviso, setFechaEnvioAviso ] = useState('')
  const [confirmar, setConfirmar] = useState({
    "NPedido": "NpreFactura",
    "Cliente": "route.params.Ferreteria",
    "Valor": "sumaTotal().replace(/,/g, '')",
    "FechaDesde": "hoyDate",
    "FechaHasta": "textDate"
  });
  

  useEffect(()=> {
    actualizar()
  },[isFocused]);

  useEffect(()=> {
    ObtenerODePedido()
  },[]);
  
  useEffect(()=> {
    setSuma(sumaTotal())
  },[pedido]);

  const ObtenerODePedido = async() => {
    try {
      const ODePedido = await SecureStore.getItemAsync('ODePedido');
      setPedido(ODePedido ? JSON.parse(ODePedido) : []);
    }catch(error) {
      console.log(error)
    }
  };

  const sendWarning = (title, warningText, ConfirmationText, SetConfirmation) => {
    setDataWarnig({
      title: title,
      warningText: warningText,
      ConfirmationText: ConfirmationText,
      SetConfirmation: SetConfirmation});
    setVisibleWarning(true);
  };

  const actualizar = async () => {
    setrefreshing(true);
    const data = await getTasks();
    setPro(data || []);
    setrefreshing(false);
  };

  /*function formatNumber(number){
    return new Intl.NumberFormat().format(number);
  };*/

  const shareImage = async() => {
    try {
      // Esperar a que el layout esté listo
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.7
      });
      Sharing.shareAsync(uri);
      setTimeout(() => {  
        setRecordatorio(false)
      }, 2000);
    } catch (errors) { 
      console.error(errors);
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
              <View style={{borderColor: '#193773', borderWidth: 2, marginBottom: 5, backgroundColor: '#FFFF'}}>
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
                <Text style={[styles.subTitle, {color: '#193773', margin: 5, fontWeight: 'bold'}]}>WWW.SIVAR.COM.CO</Text>
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

  const ModalPopUpEnviarPedido = ({visible, children}) =>{
    const [showModal, setShowModal] = useState(visible);
    const [showDate, setShowDate] = useState(false);
    const [show, setShow] = useState(false);
    const [inputNotasV, setInputNotasV] = useState('');
    const [date, setDate] = useState(new Date());
    const [textDate, setTextDate] = useState('');
    const [FechaEnvioAviso, setFechaEnvioAviso ] = useState('')
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate)
      let tempDate = new Date(currentDate);
      let fDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
      let EDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
      setTextDate(fDate)
      setFechaEnvioAviso(EDate)
    };

    const ToNewSale = async () =>{
      //if (textDate === ''){
      //  setAvisoRojo(true)
      //  setTimeout(() => {  
      //    setAvisoRojo(false)
      //  }, 2000);
      //  return
      //} else {

        try {
          setVisiblevCargando(true)
          let hoy = new Date(Date.now());
          const dias = [
            'domingo',
            'lunes',
            'martes',
            'miércoles',
            'jueves',
            'viernes',
            'sábado',
          ];
          const numeroDiaSeleccionado = new Date(date).getDay()
          const nombreDiaSeleccionado = dias[numeroDiaSeleccionado];
          const data = {
            'Cliente': route.params.Ferreteria,
            'EnviarA': route.params.Contacto,
            'Nit': route.params.Nit,
            'Direccion': route.params.Direccion,
            'Telefono': route.params.Telefono,
            'Celular': route.params.Cel,
            'EMail': route.params.Email,
            'Barrio': route.params.Barrio,
            'Colaborador': usD.Nombre + usD.Apellido,
            'CodColaborador': usD.Cod,
            'FOPedido': formatDateForInput(new Date()),
            'FEntrega': formatDateForInput(date),
            'TPrecios': 'Contado',
            'TPago':'Contado',
            'FVencimiento': formatDateForInput(date),
            'ConPaquete': true,
            'Completo': false,
            'CodCliente': route.params.Cod,
            'Iva': false,
            'Nota': inputNotasV,
            'DiasCreditos': 0
          }
          const now = new Date();
          const pad = n => n.toString().padStart(2, '0');
          const fechaFormateada = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        
          data.FechaFactura = fechaFormateada
          data.CodColaborador = usD.Cod
          const newlist = pedido.map((item) => ({
              Cantidad: item.Cantidad,
              Codigo: item.cod,
              VrUnitario: item.PVenta,
              Costo: item.PCosto,
              Porcentaje: 0,
              ApartirDe: 0,
              Disponible: 0
          }));
          data.List = newlist
          const NSale = await NewSaleApi(data)
          if (NSale.sucess) {
            setTextDate('')
            setVisibleEnvioExitoso(true)
            setVisiblevCargando(false)
            setTimeout(() => {  
                setVisibleEnvioExitoso(false)
                setVisible(false)
                cancelarPedido();
                console.log('NSale.error', NSale.error)
                setConfirmar({
                  "NPedido": NSale.error,
                  "Cliente": route.params.Ferreteria,
                  "Valor": sumaTotal().replace(/,/g, ''),
                  "FechaDesde": nombreDiaSeleccionado + ' ' + FechaEnvioAviso,
                  "FechaHasta": "O a mas tardar un día habil despúes"
                })
                setRecordatorio(true)
              }, 2000);
          } else  {
            setVisiblevCargando(false)
            sendWarning(
              'Error',
              'Error al enviar:',
              'Entendido',
              setVisibleWarning
            )
            setTimeout(() => {  
              setVisibleWarning(false)
            }, 2000);
          }
        }
        catch (error) {
          setVisiblevCargando(false)
          sendWarning(
            'Error',
            'Error al enviar: ' + error,
            'Entendido',
            setVisibleWarning
          )
          setTimeout(() => {  
            setVisibleWarning(false)
          }, 2000);
        }
      //}
    };

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
            <TouchableOpacity onPress={()=>showMode('date')}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={[styles.subTitle, {margin: 0,}]}>Fecha de entrega:</Text>
                <Text style={[styles.subTitle, {textAlign: 'right', color:  'black', margin: 0, position: 'relative'}]}>{textDate}</Text>
              </View>
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
            <TextInput
              multiline={true}
              maxLength={200}
              style={[styles.TextNotasV]}
              placeholder="Notas de ventas"
              value={inputNotasV}
              onChangeText={text=> setInputNotasV(text)}
              textAlignVertical="top"
              textAlign="left"
            />
            <TouchableOpacity style={[styles.buttonLogin, {position: 'absolute', bottom: 5, width: '98%', backgroundColor: '#193773'}]} onPress={()=>ToNewSale()}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Enviar pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const verificarAgregarPedido = () => {
    if (pedido.length !== 0 && suma.replace(/,/g, '')>=150000){
      setVisible(true)
    } else if (pedido.length === 0){
      sendWarning(
        'Sin Productos para enviar',
        'No hay productos para enviar',
        'Entendido',
        ()=>{}
      )
      setTimeout(() => {
        setVisibleWarning(false)
      }, 2000);
    } else if (suma.replace(/,/g, '')<150000){
      sendWarning(
        'Pedido insuficiente',
        'El pedido no cuenta con el mínimo de $150.000 para ser envíado.',
        'Entendido',
        ()=>{}
      )
    }
  };

  const cancelarPedido = async()=>{
    setPedido([])
    handleSubmit('')
    navigation.navigate('LClientes')
    await SecureStore.setItemAsync('ODePedido', JSON.stringify([]));
  };

  function sumaTotal(){
    if(pedido.length !== 0){
      return new Intl.NumberFormat().format(pedido.reduce((sum, value) => (typeof value.Cantidad == "number" ? sum + (value.Cantidad*value.PVenta) : sum), 0));
    } else {
      return 0
    }
  }; 
  // fin intento de suma
  const agregarPedido = async(objeto)=>{
    var index = pedido.map(codigo => codigo.cod).indexOf(objeto.cod);
    if(index === -1) {
      pedido.push(objeto)
      setSuma(sumaTotal())
      await SecureStore.setItemAsync('ODePedido', JSON.stringify(pedido));
    } else if(index !== -1) {
      //setVisibleAvisoProducto(true)
      setTimeout(() => {  
        sendWarning(
          'Producto repetido',
          'verifique el pedido',
          'Entendido',
          visibleWarning
        )
        //setVisibleAvisoProducto(false)
        setVisibleWarning(false)
      }, 2000);
    }
  };
  
  const aumentarCantidad = async(Cod, paquete)=>{
    if(pedido.length !== 0){
      var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
      pedido[index].Cantidad = pedido[index].Cantidad + paquete
      setSuma(sumaTotal());
      await SecureStore.setItemAsync('ODePedido', JSON.stringify(pedido));
    }
  };

  const disminuirCantidad = async(Cod, paquete) => {
    if(pedido.length !== 0){
      try {
        var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
        var Cantidad = pedido[index].Cantidad - paquete;
        
        if(Cantidad < 1){
          // solo guardas el índice y abres el modal
          setProductoAEliminar(index);
          sendWarning(
            'Eliminar producto',
            '¿Desea eliminar este producto?',
            'Eliminar',
            () => {
              pedido.splice(index, 1);
              handleSubmit('');
            })
        } else {
          pedido[index].Cantidad = Cantidad;
          setSuma(sumaTotal());
          await SecureStore.setItemAsync('ODePedido', JSON.stringify(pedido));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const modificarCantidad = async(Cod,Cantidad,paquete)=>{
    if(pedido.length !== 0){
      try {
        var index = pedido.map(codigo => codigo.cod).indexOf(Cod);
        var NuevaCantidad = Math.ceil(Cantidad/paquete)*paquete
        pedido[index].Cantidad = NuevaCantidad
        setSuma(sumaTotal());
        //console.log("entra a modificar la cantidad", NuevaCantidad, paquete)
        if(pedido[index].Cantidad<1){
          pedido.splice(index, 1)
          handleSubmit('')
        }
        await SecureStore.setItemAsync('ODePedido', JSON.stringify(pedido));
      } catch (error) {
      console.error(error);
      }
    }
  };

  const searchTasks = async(text) => {
    const data = pro || []
    const filtro = data.filter((data) => data.cod.toLowerCase().includes(text)||data.Descripcion.toLowerCase().includes(text) || data.SubCategoria.toLowerCase().includes(text))
    setTasks(filtro);
  };

  const handleSubmit = async(text) => {
    if (text === ''){
      setInput(text)
      setIsVisible(false)
    } else {
      setInput(text)
      searchTasks(text.toLowerCase())
      setIsVisible(true)
    }
  };
  function seachInput (){
    if(input !== ''){
      return styles.input2
    } else {
      return styles.input
    }
  }

  const renderItem=({ item })=>{
    return <PedidoItem item={ item } aumentarCantidad={aumentarCantidad} disminuirCantidad={disminuirCantidad} modificarCantidad={modificarCantidad} />
  } 

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View  keyboardVerticalOffset={0} behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.container, {flex: 1}]} enabled={true}>
      <ScrollView
        style = {{flexGrow: 0}}
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
      <TextInput
        style={ seachInput() }
        placeholder="Buscar producto..."
        value={input}
        onChangeText={(text)=> {handleSubmit(text)}}
      />
      {isVisible && (
        <ScrollView horizontal={true} style={[styles.container2]}>
          <DesTaskList
            tasks={tasks|| []}
            agregarPedido={agregarPedido}
            handleSubmit={handleSubmit}
          />
        </ScrollView>
      )}
      <View style = {{ flex: 1, marginBottom: windowHeight * 0.058 + 45 }}>
        <PedidoList
          Pedido={pedido}
          aumentarCantidad={aumentarCantidad}
          disminuirCantidad={disminuirCantidad}
          modificarCantidad={modificarCantidad}
        />
      </View>
      <View style={{flexDirection: 'column', position: 'absolute', bottom : 0, left: 0, right: 0, flex: 1}}>
        <View style={{backgroundColor:'#F2CB05', height: windowHeight*0.058, alignItems:'flex-end'}}>
          <Text style={[styles.subTitle,{right: 0}]}>Total: $ {suma}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <TouchableOpacity
              style={[styles.buttonLogin, {backgroundColor: '#D6320E',}]}
              onPress={()=>{
                sendWarning('Cancelar pedido','¿Esta seguro que desea cancelar este pedido?','Cancelar pedido',cancelarPedido)
              }}
            >
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

      {/*Captura del modal*/}
      <View style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
        <View
          ref={viewRef}
          collapsable={false}
          style={{width: 350, borderColor: '#193773', borderWidth: 2, marginBottom: 5, backgroundColor: '#FFFF'}}
        >
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
          <Text style={[styles.subTitle, {color: '#193773', margin: 5, fontWeight: 'bold'}]}>WWW.SIVAR.COM.CO</Text>
        </View>
      </View>

      {/*Modales*/}
      <ModalPopUpEnviarPedido visible={visible}></ModalPopUpEnviarPedido>
      <Warning
        visible={visibleWarning}
        title={dataWarnig?.tittle}
        warningText={dataWarnig?.warningText}
        setMostrar={setVisibleWarning}
        ConfirmationText={dataWarnig?.ConfirmationText}
        SetConfirmation={dataWarnig?.SetConfirmation}
      />
      {/*<Warning visible={visibleAvisoProducto} title={'Producto repetido'} warningText={'Producto repetido, verifique el pedido'} setMostrar={setVisibleAvisoProducto} ConfirmationText={'Entendido'} SetConfirmation={setVisibleAvisoProducto}/>*/}
      {/*<Warning visible={avisoRojo} title={'Pedido sin fecha'} warningText={'Escoja una fecha de envio'} setMostrar={setAvisoRojo} ConfirmationText={'Entendido'} SetConfirmation={()=>{}} />*/}
      
      <ModalEnvioExitoso visible={visibleEnvioExitoso}></ModalEnvioExitoso>
      <Loading visible={visiblevCargando} mensaje={'Enviando...'}></Loading>
      <ModalConfirmacion visible={recordatorio}></ModalConfirmacion>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container : {
    paddingBottom: 10,
    position: 'relative',
    zIndex: 1,
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
    width: '90%',//windowWidth * 0.90,//300,
    height: 300,
  },
  logo: {
    position: 'relative',
    width: 270,
    height: 270,
  },
  container2: {
    position: 'absolute',
    zIndex: 2,
    top: 194,
    height: '13%',//windowHeight* 0.13, //90,
    width: '94%',//windowWidth * 0.94,//320,
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
  TextNotasV: {
    backgroundColor: '#FFFF',
    width: '97%',
    height: '55%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#F2CB05',
    margin: 3,
    padding: 4
  },
  containerL: {
    //height: windowHeight*0.49,
    width: windowWidth,
    margin: 12,
    marginTop: 0,
    borderWidth: 0,
    padding: 0,
    backgroundColor: '#ffff',
    borderColor: '#F2CB05',
    borderWidth: 1,
},
});

export default NuevaVenta;