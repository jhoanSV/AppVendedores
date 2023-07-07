import React, { useEffect, useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, Button } from "react-native";
import { setGlobal, getGlobal } from '../components/context/user';

import { progressBar1, award, Bronce, Plata, Oro, bright } from "../../assets";

import TProgressBar from '../components/TProgressBar';


const Main = () => {

    function formatNumber(number){
        return new Intl.NumberFormat().format(number);
    };
    let meta = 35000000;
    let meta2 = 48000000;
    let record = 55000000;
    //const[meta, setMeta] =useState(38000000);
    //const[meta2, setMeta2] =useState(48000000);
    //const[record, setRecord] =useState(50000000);
    const[ventTotales, setVentTotales] = useState(null);
    const[progress, setProgress] = useState(null);
    const[progress2, setProgress2] = useState(null);
    const[colorBar, setColorBar] = useState(null);
    const[rank, setRank] = useState(null);
    const vendedor = getGlobal('Name');

    useEffect(()=>{
        setProgress((ventTotales)/(meta2));
        setProgress2((ventTotales)/(record));
        check();
    },[ventTotales, progress, progress2])

    const check = () =>{
        if ((progress*100) < ((meta/meta2)*100)){
            setRank('');
            setColorBar('#FF0000');
        }else if((progress*100) < 100){
            setRank(Bronce);
            setColorBar('#FAB400');
        }else if((progress*100) < (record/meta2)*100){
            setRank(Plata);
            setColorBar('#1DD200');
        }else{
            setRank(Oro);
            setColorBar('yellow');
        }
    }    
    
    const newVenta = () =>{
        setVentTotales(ventTotales + 1000000);
    }
    const quitVenta = () =>{
        setVentTotales(ventTotales - 1000000);
    }

    return (
        <SafeAreaView style={ { flexGrow: 1, padding: 15}}>
            <View style={ {width: '100%', aspectRatio: 6, flexDirection: 'row', alignContent: 'space-between'}}>
                <View style={{ flex: 1}}>
                    <Image style={{ width: '86%', height: '85%',resizeMode: 'contain' }} source={ rank }/>
                </View>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    {vendedor &&
                        <Text style={styles.vendedorText}>{vendedor.slice(1,vendedor.length-1)}</Text>
                    }
                </View>
                <View style={{ position: 'relative', flex: 1, }}>
                    <Image style={{ position: 'relative', width: '130%', height: '100%',resizeMode: 'contain', zIndex: 2,}} source={ award }/>
                    <Image style={{ position: 'absolute', top: -18,width: '125%', height: '170%',resizeMode: 'contain', zIndex: 1,}} source={ bright }/>
                </View>
            </View>
            <View style={{ width: '100%', aspectRatio: (1710/580)}}>
                <Image style={{ flex: 1, width: '100%', resizeMode: 'contain'}} source={ progressBar1 }/>
                <View style={ styles.proBarTextContainer}>
                    <Text style={styles.progressBarText}>
                        {parseInt(progress*100)}%
                    </Text>
                </View>
                <Text style={{position: 'absolute', left: '31%', top: '30%', fontWeight: 'bold', fontSize: 16,
                    zIndex: 2, color: 'white',}}>
                    Progreso
                </Text>
                <View style={{position: 'absolute', left: '31%', bottom: '20%', width: (63) + '%', height: 54}}>
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
            <Button
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
            />
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
        color: '#00000'
    },

})

export default Main;
