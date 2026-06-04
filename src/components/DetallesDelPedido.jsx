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
          FlatList,
          useWindowDimensions,
          Platform} from 'react-native';
import { Icon } from 'react-native-elements';
import DetLPedidoItem from '../components/DetLPedidoItem';
import DateTimePicker from '@react-native-community/datetimepicker'
import { setGlobal, getGlobal } from '../components/context/user';
import { CargadoConExito, progress, Logo_color } from "../../assets";
import { captureRef } from 'react-native-view-shot';
import Warning from '../components/modal/Warning';
import Loading from '../components/modal/Loading';
import PopUpMenu from '../components/PopUpMenu';
import * as Sharing from 'expo-sharing';
import { useIsFocused } from '@react-navigation/native';
import { DetallePedido,
          DetallePedidoCerrado,
          DetallePedidoEntregas,
          ActualizarProcesoDelPedido,
          CustomerDetailApi } from '../api'
import { useTheContext } from '../TheProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function DetallesDelPedido({ navigation, route }) {
    //const [refreshing, setrefreshing] = useState(false)
    const viewRef = useRef();
    const [pedido, setPedido] = useState([]);
    const [permisos, setPermisos] = useState(false);
    const { usD } = useTheContext();
    const [recordatorio, setRecordatorio ] = useState(false);
    const [tipoDeEntrega, setTipoDeEntrega] = useState(false);
    const [proDePedido, setProDePedido] = useState('');
    const isFocused = useIsFocused()
    const [notasVentas, setNotasVentas] = useState(false);
    const [notasEntregas, setNotasEntregas] = useState(false);
    const [visible, setVisible] = useState(false);
    const [sum, setSum] = useState(0);
    const [dataWarning, setDataWarning] = useState({
      title: '',
      warningText: '',
      setMostrar: ()=> {},
      ConfirmationText: '',
      SetConfirmation: ()=> {}
    });

    /*function sumaTotal(){
      if(pedido.length !== 0){
        return pedido.reduce((sum, value) => (typeof value.Cantidad == "number" ? sum + (value.Cantidad * value.VrUnitario) : sum), 0);
      } else {
        return 0
      }
    };*/

    function sumaTotal(){
      if(pedido.length !== 0){
        return pedido.reduce((sum, value) => (sum + (value.Cantidad * value.VrUnitario)), 0);
      } else {
        return 0
      }
    }; 
    
    useEffect(()=> {
      setSum(sumaTotal())
    },[pedido]);

    const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    const nombreDia = dias[new Date(route.params.FechaDeEntrega).getDay()];

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

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <PopUpMenu
            tasks={['Reenviar ticket', 'Notas de venta', 'Notas de entrega', 'Detalle del cliente']}
            actions={[
              () => setRecordatorio(true),
              () => {
                  setDataWarning({
                    title: 'Notas de ventas',
                    warningText: route.params.NotaVenta,
                    ConfirmationText: 'Entendido'
                  })
                  setNotasVentas(true)
                },
              () => {
                setDataWarning({
                    title: 'Notas de entregas',
                    warningText: route.params.NotaEntrega,
                    ConfirmationText: 'Entendido'
                  })
                  setNotasVentas(true)
                },
              async() => {
                const Cliente = await CustomerDetailApi({Cod: route.params.Cod})
                navigation.navigate('DetalleCliente', Cliente[0])
              }
            ]}
          />
        ),
      });
      permissions();
      buscarPedido();
    }, [isFocused]);

    const ModalConfirmacion = ({visible, children}) => {
      const dias = [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ];
      const numeroDiaSeleccionado = new Date(route.params.FechaDeEntrega).getDay()
      const nombreDiaSeleccionado = dias[numeroDiaSeleccionado];

      return (
        <Modal transparent visible={visible}>
          <View style={[styles.ModalBackground]}>
            <View style={[styles.contenedorModal, {height: 370,}]} >
              <View style={[{flexDirection: 'row', backgroundColor: '#193773', borderBottomColor: '#F2CB05', borderBottomWidth: 6,}]}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFF'}]}>Recordatorio</Text>
                <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setRecordatorio(false)}>
                  <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFF'}]}>X</Text>
                </TouchableOpacity>
              </View>
              <Fragment>
                <View style={{borderColor: '#193773', borderWidth: 2, marginBottom: 5, backgroundColor: '#FFF'}}>
                  <Image style={[{position: 'relative',width: 100, height: 50, marginLeft: 5}]} source={ Logo_color } resizeMode='contain' />
                  <Text style={[styles.text, {position: 'absolute', right: 5, fontSize: 20, color: '#4DBE25', fontWeight: 'bold'}]}>!Enviado con exito!</Text>
                  <Text style={[styles.text, {color: '#193773', fontWeight: 'bold'}]}>N° de pedido: {route.params.NDePedido}</Text>
                  <Text style={[styles.text, {color: '#193773', fontWeight: 'bold'}]}>Empresa:</Text>
                  <Text style={[styles.text, {color: '#193773'}]}>{route.params.Ferreteria}</Text>
                  <Text style={[styles.text, {color: '#193773', fontWeight: 'bold'}]}>Valor:</Text>
                  <Text style={[styles.text, {color: '#193773'}]}>$ {formatNumber(route.params.VrFactura)}</Text>
                  <Text style={[styles.text, {color: '#193773', fontWeight: 'bold'}]}>Fecha de entrega:</Text>
                  <Text style={[styles.text, {color: '#193773'}]}>{nombreDiaSeleccionado + ' ' + route.params.FechaDeEntrega.replace(/-/g, "/")}</Text>
                  <Text style={[styles.text, {color: '#193773'}]}>O a mas tardar un día habil despúes</Text>
                  <Text style={[styles.subTitle, {color: '#193773', margin: 5, fontWeight: 'bold'}]}>WWW.SIVAR.COM.CO</Text>
                </View>
              </Fragment>
              <TouchableOpacity style={[styles.buttonLogin, {position: 'absolute', bottom: 5, width: 290, backgroundColor: '#193773'}]} onPress={()=>shareImage()}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFF'}]}>Compartir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      );
    };

    const permissions = () => {
        if (usD.Cargo==='Entregas' && route.params.ProcesoDelPedido === 'En ruta'){
          setPermisos(true);
        } else {
          setPermisos(false);
        }
    };

    function formatNumber(number){
        return new Intl.NumberFormat().format(number);
    };

    useEffect(() => {
      permissions();
      buscarPedido();
    },[]);
    
    const buscarPedido = async () => {
      if (permisos === false && MostrarEstado(route.params.ProcesoDelPedido) !== 'Cerrado'){
        try {
          const ElPedido = await DetallePedido(route.params.NDePedido)
          setPedido(ElPedido)
        }catch(error){
          console.log(error)
        }
      } else if (permisos === false && MostrarEstado(route.params.ProcesoDelPedido) === 'Cerrado') {
        try {
          const ElPedido = await DetallePedidoCerrado(route.params.NDePedido)
          setPedido(ElPedido)
        }catch(error){
          console.log(error)
        }
      } else if (permisos === true) {
        try {
          const ElPedido = await DetallePedidoEntregas(route.params.NDePedido)
          setPedido(ElPedido)
          console.log('Entro a entregas')
        }catch(error){
          console.log(error)
        }
      }
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
        } else if (text === 'Cerrado') {
          return {backgroundColor: '#398A1C'}
        }
    }

    function MostrarEstado(text){
        if(text!==""){
          return text
        } else {
          return route.params.Estado
        }
    }

    const CuadroDeEntrega = (valor) =>{
      setTipoDeEntrega(valor)
      if (valor==true){
        setProDePedido('Entregado')
      } else if (valor==false){
        setProDePedido('No entregado')
      }
      setVisible(true)
    }
    
    const VerificarEntregarPedido = ({visible,children}) => {
      const [inputNotasV, setInputNotasV ] = useState('')
      const [visiblevCargando, setVisiblevCargando] = useState(false);
      
      const EntregarPedido = async(text) => {
        setVisiblevCargando(true)
        await ActualizarProcesoDelPedido({
          "NotaEntrega": inputNotasV,
          "ProcesoDelPedido": proDePedido,
          "NDepedido": route.params.NDePedido
        })
        setVisiblevCargando(false)
        setVisible(false)
        navigation.navigate('LPedidos', [])
      }

      function Estilo (){
        if (tipoDeEntrega == true){
          return ({backgroundColor: '#193773'})
        } else if (tipoDeEntrega == false){
          return ({backgroundColor: '#D6320E'})
        }
      }
      return (
        <View>
          <Loading visible={visiblevCargando} mensaje={'Entregando...'}></Loading>
          <Modal transparent visible={visible}>
            <View style={[styles.ModalBackground]}>
              <View style={[styles.contenedorModal]}>
                <View style={[{flexDirection: 'row', borderBottomColor: '#F2CB05', borderBottomWidth: 6,}, Estilo()]}>
                  <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Notas del pedido</Text>
                  <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setVisible(false)}>
                    <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>X</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  multiline={true}
                  maxLength={200}
                  style={[styles.TextNotasV]}
                  placeholder="Notas de entrega"
                  value={inputNotasV}
                  onChangeText={text=> setInputNotasV(text)}
                  textAlignVertical="top"
                  textAlign="left"
                />
                <TouchableOpacity style={[styles.buttonLogin, {position: 'absolute', bottom: 5, width: '98%'}, Estilo()]} onPress={()=>EntregarPedido()}>
                  <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Completar entrega</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    };
    
    return (
        <SafeAreaView style={{ flex: 1 }}>
          <View keyboardVerticalOffset={0} behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={[styles.container, {flex: 1}]} enabled={true}>
            <View style={[ styles.ContenedorEstado, colorNota(MostrarEstado(route.params.ProcesoDelPedido))]}>
                <Text style={[styles.subTitle, {color: '#000000'}]}>
                    Estado: {MostrarEstado(route.params.ProcesoDelPedido)}
                </Text>
                <View style={{alignItems:'flex-end', flex: 1 }}>
                    <Text style={[styles.subTitle, {color: '#000000'}]}>
                        {route.params.NDePedido}
                    </Text>
                </View>
            </View>
            <ScrollView
              style = {{flexGrow: 0}} 
              horizontal={true} 
              refreshControl={
                <RefreshControl
                    //refreshing={refreshing}
                    onRefresh={()=>/*actualizar()*/console.log("se actualiza perro")}
                />}
            >
              <View style={{flexDirection: 'row', flex: 1}}>
                <View style={{flexDirection: 'column', flex: 1}}>
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
            <VerificarEntregarPedido visible={visible}></VerificarEntregarPedido>

            {/*Lista de pedidos*/}
            <View style={{ flex: 1 }}>
              <ScrollView horizontal={true} style = {{ flexGrow: 1 }}>
                  <FlatList
                      data={pedido}
                      style={[styles.containerL, {flex: 1}]}
                      renderItem={renderItem}
                  />
              </ScrollView>
            </View>
              
            {/*Botones de confirmación*/}
            <View style={{ flexDirection: 'column' }}>
                <View style={{backgroundColor:'#F2CB05', height: windowHeight*0.058, alignItems:'flex-end'}}>
                    <Text style={[styles.subTitle,{right: 0}]}>Total: {formatNumber(sum)}</Text>
                </View>
                
                {permisos && <View style={{flexDirection: 'row'}}>
                    <View>
                        <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: '#D6320E',}]} onPress={()=>CuadroDeEntrega(false)}>
                            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>No entregado</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: '#193773', right: 0}]} onPress={()=>CuadroDeEntrega(true)}>
                            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Entregar</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </View>
            {/*Captura del modal*/}
            <View style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
              <View
                ref={viewRef}
                collapsable={false}
                style={{ width: 350, borderColor: '#193773', borderWidth: 2, marginBottom: 5, backgroundColor: '#FFF'}}
              >
                <Image style={{ width: 100, height: 50, marginLeft: 5 }} source={Logo_color} resizeMode='contain' />
                <Text style={[styles.text, {position: 'absolute', right: 5, fontSize: 20, color: '#4DBE25', fontWeight: 'bold'}]}>!Enviado con exito!</Text>
                <Text style={[styles.text, { color: '#193773', fontWeight: 'bold' }]}>N° de pedido: {route.params.NDePedido}</Text>
                <Text style={[styles.text, { color: '#193773', fontWeight: 'bold' }]}>Empresa:</Text>
                <Text style={[styles.text, { color: '#193773' }]}>{route.params.Ferreteria}</Text>
                <Text style={[styles.text, { color: '#193773', fontWeight: 'bold' }]}>Valor:</Text>
                <Text style={[styles.text, { color: '#193773' }]}>$ {formatNumber(route.params.VrFactura)}</Text>
                <Text style={[styles.text, { color: '#193773', fontWeight: 'bold' }]}>Fecha de entrega:</Text>
                <Text style={[styles.text, { color: '#193773' }]}>{nombreDia + ' ' + route.params.FechaDeEntrega.replace(/-/g, "/")}</Text>
                <Text style={[styles.text, { color: '#193773' }]}>O a mas tardar un día habil despúes</Text>
                <Text style={[styles.subTitle, { color: '#193773', margin: 5, fontWeight: 'bold' }]}>WWW.SIVAR.COM.CO</Text>
              </View>
            </View>
            
            {/*Modales*/}
            <ModalConfirmacion visible={recordatorio} />
            <ModalConfirmacion visible={recordatorio}></ModalConfirmacion>
            <Warning visible={notasVentas} title={dataWarning.title} warningText={dataWarning.warningText} setMostrar={setNotasVentas} ConfirmationText={dataWarning.ConfirmationText} SetConfirmation={setNotasVentas} ColorHeader={'#193773'} ColorText={'#000000'} />
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container : {
    //padding: 10,
    paddingBottom: 10,
    position: 'relative',
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
    justifyContent: 'space-between',
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
    TextNotasV: {
      backgroundColor: '#FFFF',
      width: '97%',
      height: '65%',
      borderWidth: 2,
      borderRadius: 10,
      borderColor: '#F2CB05',
      margin: 3,
      padding: 4
    },
    /*containerMenu: {
      width: windowWidth/2.7,
      position: 'absolute',
      right: 0,
      margin: 0,
      marginTop: 0,
      borderWidth: 0,
      padding: 0,
      backgroundColor: '#ffff',
      borderColor: '#F2CB05',
      borderWidth: 1,
      zIndex: 5,
    },
    IconMenu: {
      position: 'absolute',
      right: '5%',
      top: '-6.5%',
      zIndex: 5,
    }*/
});

export default DetallesDelPedido;
