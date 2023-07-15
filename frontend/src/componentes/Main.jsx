import React, { useEffect, useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, Text, View, Image, Button, 
    TouchableOpacity, Animated, Easing } from "react-native";
import { setGlobal, getGlobal } from '../components/context/user';
import { DatosVentas } from "../api";


import { progressBar1, award, Bronce, Plata, Oro, bright } from "../../assets";

import TProgressBar from '../components/TProgressBar';
import Record from "../components/modal/Record";
import { useIsFocused } from "@react-navigation/native";



const Main = () => {

    function formatNumber(number){
        return new Intl.NumberFormat().format(number);
    };

    //let meta = 35000000;
    //let meta2 = 48000000;
    //let record = 55000000;
    let rotateValue = new Animated.Value(0);
    const[meta, setMeta] =useState(0);
    const[meta2, setMeta2] =useState(0);
    const[record, setRecord] =useState(0);
    const[ventTotales, setVentTotales] = useState(null);
    const[progress, setProgress] = useState(null);
    const[progress2, setProgress2] = useState(null);
    const[colorBar, setColorBar] = useState(null);
    const[rank, setRank] = useState(null);
    const[showR, setShowR] = useState(false)
    const vendedor = getGlobal('Name');
    const [mVisible, setMVisible] = useState(false);
    
    const rot = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })
    const animation = Animated.timing(rotateValue, {
        toValue: 1,
        duration: 6000,
        easing: Easing.linear,
        useNativeDriver: true,
    });

    const isFocused = useIsFocused()

    Animated.loop(animation).start();

    useEffect(() =>{
        Animated.loop(animation).start();
        asinc()
        return () =>{
            animation.stop();
            console.log("para");
        }
    },[isFocused])

    const asinc = async() => {
        const datos = await DatosVentas(getGlobal('User'))
        setMeta(datos[0]["Meta"]);
        setMeta2(datos[0]["Meta2"]);
        setVentTotales(datos[0]["VentasMes"])
        console.log(datos);
        if((datos[0]["record"]) < 52459200){
            setRecord(52459200);
        }else{
            setRecord(datos[0]["record"]);
        }
    }

    useEffect(()=>{
        setProgress(((ventTotales)/(meta2))*100);
        setProgress2((ventTotales)/(record));
        check();
    },[ventTotales, progress, progress2])

    const check = () =>{
        if ((progress) < ((meta/meta2)*100)){
            setShowR(false);
            setColorBar('#FF0000');
        }else if((progress) < 100){
            setShowR(true);
            setRank(Bronce);
            setColorBar('#FAB400');
        }else if((progress) < (record/meta2)*100){
            setShowR(true);
            setRank(Plata);
            setColorBar('#1DD200');
        }else{
            setShowR(true);
            setRank(Oro);
            setColorBar('yellow');
        }
    }    
    
    /*const newVenta = () =>{
        setVentTotales(ventTotales + 1000000);
    }
    const quitVenta = () =>{
        setVentTotales(ventTotales - 1000000);
    }*/

    return (
        <SafeAreaView style={ { flexGrow: 1, padding: 15}}>
            <View style={ {width: '100%', aspectRatio: 6, flexDirection: 'row', alignContent: 'space-between'}}>
                <View style={{ flex: 1}}>
                    {showR &&
                        <Image style={{ width: '86%', height: '85%',resizeMode: 'contain' }} source={ rank }/>
                    }
                </View>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    {vendedor &&
                        <Text style={styles.vendedorText}>{vendedor.slice(1,vendedor.length-1)}</Text>
                    }
                </View>
                <View style={{ position: 'relative', flex: 1, /*backgroundColor: 'red'*/}}>
                    <TouchableOpacity onPress={()=>{setMVisible(true)}}>
                        <Image style={ styles.awardImg } source={ award }/>
                        <Animated.Image style={[
                                styles.awardImg, 
                                styles.brightImg,
                                {transform: [{rotate: rot}]} 
                            ]} 
                            source={ bright }
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ width: '100%', aspectRatio: (1710/580)}}>
                <Image style={{ flex: 1, width: '100%', resizeMode: 'contain'}} source={ progressBar1 }/>
                <View style={ styles.proBarTextContainer}>
                    {progress !== null && (
                        <Text style={styles.progressBarText}>
                            {(parseInt(progress))}%
                        </Text>
                    )}
                </View>
                <Text style={{position: 'absolute', left: '31%', top: '30%', fontWeight: 'bold', fontSize: 16,
                    zIndex: 2, color: 'white',}}>
                    Progreso
                </Text>
                <View style={{position: 'absolute', left: '31%', bottom: '20%', width: (63) + '%', height: (41) + '%'}}>
                    <TProgressBar 
                        pct={progress2}
                        color={colorBar}
                        m1={meta/record}
                        m2={meta2/record}
                        valorMeta={(meta/1000000)+'M'}
                        valorMeta2={(meta2/1000000)+'M'}
                    />
                </View>
            </View>
            <View style={styles.containerVentas} >
                <Text style={styles.ventasText}> Mis Ventas</Text>
                <Text style={styles.ventasValor}> $ {formatNumber(ventTotales)}</Text>
            </View>
            {/*<Button
                onPress={newVenta}
                title="añadir venta"
                color="#193773"
                accessibilityLabel="learnMore"
            />
            <View>
                <Text>
                    "    "
                </Text>
            </View>
            <Button
                onPress={quitVenta}
                title="restar venta"
                color="#193773"
                accessibilityLabel="prueba"
            />        --------Botones para prueba------------------*/}
            <Record modalVisible={mVisible} setModalVisible={setMVisible} rec={formatNumber(record)}/>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    vendedorText: {
        color: '#193773',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '12%',
    },
    proBarTextContainer: {
        position: 'absolute',
        width: '18%',
        height: '45%',
        left: '6%',
        bottom: '27%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBarText: {
        color: '#193773',
        fontSize: 22,
        fontWeight: 'bold'
    },containerVentas: {
        alignSelf: 'center',
        alignItems: 'center',
        width: 265,
        height: 60,
        borderRadius: 16,
        backgroundColor: '#D9D9D9',
        elevation: 15,
    },
    ventasText: {
        fontSize: 20,
        color: '#193773'
    },
    ventasValor: {
        fontSize: 20,
        color: 'black'
    },
    awardImg: {
        position: 'relative',
        width: '115%',
        height: '115%',
        resizeMode: 'contain',
        zIndex: 2,
    },
    brightImg: {
        position: 'absolute',
        zIndex: 1,
    },
    

})

export default Main;
