import React, { useEffect, useState } from 'react'
import {View,
        Text,
        StyleSheet,
        Button,
        ScrollView,
        FlatList,
        Modal,
        TouchableOpacity,
        TextInput} from 'react-native';
import { Image } from 'expo-image';
import Layout from '../components/Layout';
import { Icon } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native';
import { getGlobal } from '../components/context/user';
import { getProductDetailAllApi } from '../api'

function DetalleProducto({ navigation, route }) {
  const [ isAgotado, setIsAgotado ] = useState(false);
  const [ data, setData] = useState(route.params)
  const [ shows, setShows ] = useState({
    PCosto: false,
    PVenta: false,
    Porcentaje: false,
    Promedio: false,
    Proveedor: false,
    OtrosProveedores: false,
    ImgN: false,
    LastsPuechases: false
  })
  const isFocused = useIsFocused()
  const allowed = getGlobal('permits')

  const HeaderOtros = [
    {
      header: 'Cod'
    },
    {
      header: 'proveedor'
    },
  ]

  const handleData = (item, value) => {
    setShows((prev) => ({
      ...prev,
      [item]: value,
    }));
  }

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

  const allDetail =async()=>{
    if (allowed.includes(1) || allowed.includes(7)) {
      const allDet = await getProductDetailAllApi({ Cod: route.params.cod})
      setData(allDet)
    }
  };

  useEffect(()=>{
    allDetail()
    console.log('allowed', allowed)
  },[route.params]);

  useEffect(()=> {
    Agotado()
  },[isFocused]);

  const RowOtros =({item})=>{
    return (
      <View style={{flexDirection: 'row',}}>
        <Text style={{width: 100, margin: 5,}}>{item.Proovedor}</Text>
        <Text style={{width: 100, margin: 5,}}>$ {formatNumber(item.Pcosto)}</Text>
        <Text style={{width: 100, margin: 5,}}>{item.Cantidad}</Text>
        <Text style={{width: 100, margin: 5,}}>{((data.PVenta - parseFloat(item.Pcosto))/data.PVenta*100).toFixed(2)}%</Text>
      </View>
    )
  }

  const RowLastPurch =({item})=>{
    return (
      <View style={{flexDirection: 'row',}}>
        <Text style={{width: 100, margin: 5,}}>{item.Proveedor}</Text>
        <Text style={{width: 100, margin: 5,}}>{item.Fecha}</Text>
        <Text style={{width: 100, margin: 5,}}>{item.Cantidad}</Text>
        <Text style={{width: 100, margin: 5,}}>$ {formatNumber(item.Costo)}</Text>
        <Text style={{width: 100, margin: 5,}}>{item.Consecutivo}</Text>
      </View>
    )
  }

  const SearchOtherPro=(text)=>{
    console.log(text)
  }

  const ModalImage = () =>{
    return (
      <Modal
        visible={shows.ImgN}
        transparent={true}
        animationType="fade"
        onRequestClose={() => handleData('ImgN', false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }} onPress={() => {handleData('ImgN', false)}}>
            <Text style={{ color: 'white', marginTop: 10, marginRight: 0 }}>X</Text>
          </TouchableOpacity>
          <View style={{backgroundColor: 'white', borderRadius: '3px'}}>
            <Image
              style={{ width: '90%', alignSelf: 'center', aspectRatio: 1 }}
              source={{ uri: `https://sivarwebresources.s3.amazonaws.com/AVIF/${data.ImgName}.avif` }}
              contentFit="contain"
            />
          </View>
        </View>
      </Modal>
    )
  }

  return (
    
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Icon
          style={{marginRight: '0px'}}
          name='west'
          onPress={() => {if (shows.LastsPuechases) {
              handleData('LastsPuechases', false)
            } else {
              navigation.goBack()
            }}} />
      </View>
      {isAgotado && (<View style={styles.avisoAgotado}> 
        <Text style={styles.subTitle}>Producto agotado</Text>
      </View>)}
      { !shows.LastsPuechases && 
        <ScrollView>
          <Text style={[styles.subTitle, { textAlign: 'center' }]}>{data.Descripcion}</Text>
          <Icon
            type='material-community'
            name={'image'}
            onPress={()=>{handleData('ImgN', !shows.ImgN )}}
          />
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.subTitle}>Cod:</Text>
              <Text style={styles.text}>{route.params.cod}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.subTitle}>Empaque:</Text>
              <Text style={styles.text}>{data.EsUnidadOpaquete}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.subTitle}>P. Venta:</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text, {width: '70%'}]}>$ {shows.PVenta? formatNumber(data.PVenta): '***'}</Text>
                <Icon
                  type='material-community'
                  name={shows.PVenta?'eye-off-outline':'eye-outline'}
                  onPress={() =>{handleData('PVenta', !shows.PVenta )}}
                />
              </View>
            </View>
            {(allowed.includes(1) || allowed.includes(7)) &&
              <View style={styles.column}>
                <Text style={styles.subTitle}>P. Costo:</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, {width: '70%'}]}>$ {shows.PCosto? formatNumber(data.PCosto): '***' }</Text>
                  <Icon
                    type='material-community'
                    name={shows.PCosto?'eye-off-outline':'eye-outline'}
                    onPress={() =>{handleData('PCosto', !shows.PCosto )}}
                  />
                </View>
              </View>
            }
          </View>
          {(allowed.includes(1) || allowed.includes(7)) &&
            <>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.subTitle}>Porcentaje:</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.text, {width: '70%'}]}>{shows.Porcentaje? ((data.PVenta - data.PCosto)/data.PVenta*100).toFixed(2): '***'} %</Text>
                    <Icon
                      type='material-community'
                      name={shows.Porcentaje?'eye-off-outline':'eye-outline'}
                      onPress={() =>{handleData('Porcentaje', !shows.Porcentaje)}}
                    />
                  </View>
                </View>
                <View style={styles.column}>
                  <Text style={styles.subTitle}>Promedio:</Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.text, {width: '70%'}]}>{shows.Promedio? formatNumber(data.Promedio): '***'}</Text>
                    <Icon
                      type='material-community'
                      name={shows.Promedio?'eye-off-outline':'eye-outline'}
                      onPress={() =>{handleData('Promedio', !shows.Promedio)}}
                    />
                  </View>
                </View>
              </View>
              <Text style={styles.subTitle}>Proveedor:</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text, {width: '90%'}]}>{shows.Proveedor? data.Proovedor: '***'}</Text>
                <Icon
                  type='material-community'
                  name={shows.Proveedor?'eye-off-outline':'eye-outline'}
                  onPress={() =>{handleData('Proveedor', !shows.Proveedor)}}
                />
              </View>
            </>
          }

          <Text style={styles.subTitle}>Nota:</Text>
          <Text style={[styles.text, colorNota()]}>{route.params.Nota}</Text>
          {(allowed.includes(1) || allowed.includes(7)) &&
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.subTitle]}>Otros:</Text>
              <Icon
                type='material-community'
                name={shows.OtrosProveedores?'eye-off-outline':'eye-outline'}
                onPress={() =>{handleData('OtrosProveedores', !shows.OtrosProveedores)}}
              />
              <TouchableOpacity style={{marginLeft: 'auto'}} onPress={()=>{handleData('LastsPuechases', !shows.LastsPuechases)}}>
                <Text style={[styles.subTitle, {textDecorationLine: 'underline'}]}>Ver más</Text>
              </TouchableOpacity>
            </View>
          }
          {(allowed.includes(1) || allowed.includes(7)) && shows.OtrosProveedores &&
            <>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.containerTable}>
                    <Text style={[styles.subTitle, {width: 100, margin: 5, color: 'white'}]}>Proveedor</Text>
                    <Text style={[styles.subTitle, {width: 100, margin: 5, color: 'white'}]}>Valor</Text>
                    <Text style={[styles.subTitle, {width: 95, margin: 5, color: 'white'}]}>Cantidad</Text>
                    <Text style={[styles.subTitle, {width: 100, margin: 5, color: 'white'}]}>Porcentaje</Text>
                  </View>
                  <FlatList
                    data={data.OtrosProveedores}
                    renderItem={RowOtros}
                  />
                </View>
              </ScrollView>
            </>
          }
        </ScrollView>
      }

        {(allowed.includes(1) || allowed.includes(7)) && shows.LastsPuechases &&
          <>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.subTitle, { textAlign: 'center' }]}>{data.Descripcion}</Text>
              <View style={{width: '50%'}}>
                <Text style={styles.subTitle}>P. Costo:</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, {width: '70%'}]}>$ {shows.PCosto? formatNumber(data.PCosto): '***' }</Text>
                  <Icon
                    type='material-community'
                    name={shows.PCosto?'eye-off-outline':'eye-outline'}
                    onPress={() =>{handleData('PCosto', !shows.PCosto )}}
                  />
                </View>
              </View>
            </View>
            <TextInput 
              style={ styles.input }
              placeholder="Buscar..."
              onChangeText={(text)=> SearchOtherPro(text.toLowerCase())}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <View style={styles.containerTable}>
                  <Text style={[styles.subTitle, {width: 100, margin: 5, color: 'white'}]}>Proveedor</Text>
                  <Text style={[styles.subTitle, {width: 100, margin: 5, color: 'white'}]}>Fecha</Text>
                  <Text style={[styles.subTitle, {width: 95, margin: 5, color: 'white'}]}>Cantidad</Text>
                  <Text style={[styles.subTitle, {width: 100, margin: 5, color: 'white'}]}>Valor</Text>
                  <Text style={[styles.subTitle, {width: 100, margin: 5, color: 'white'}]}>Consecutivo</Text>
                </View>
                <FlatList
                  data={data.LastPurchases}
                  renderItem={RowLastPurch}
                />
              </View>
            </ScrollView>
          </>
        }
      {shows.ImgN &&
        <ModalImage/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  containerTable: {
      flexDirection: 'row',
      backgroundColor: '#193773',
      borderBottomColor: '#F2CB05', 
      borderBottomWidth: 5,
      padding: 5
  },
  subTitle: {
    fontSize: 20,
    color: '#193773',
    fontWeight: 'bold', 
    margin: 8,
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
  },
  row:{
    display: 'flex',
    flexDirection: 'row'
  },
  column: {
    width: '50%'
  },
  input: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    
    borderRadius: 40,
    backgroundColor: '#ffff',
    borderColor: '#F2CB05',
    borderWidth: 2
  },
});

export default DetalleProducto;