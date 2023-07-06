import React, { useEffect, useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, Button } from "react-native";
import { setGlobal, getGlobal } from '../components/context/user';

import { progressBar1, award, Oro, bright } from "../../assets";

import TProgressBar from '../components/TProgressBar';


const Main = () => {

    /*function formatNumber(number){
        return new Intl.NumberFormat().format(number);
    };*/
    
    let meta = 38000000;
    //const[metaDia, setMetaDia] =useState(2000000);
    const[ventTotales, setVentTotales] = useState(null);
    const[progress, setProgress] = useState(null);
    const[colorBar, setColorBar] = useState(null);
    const vendedor = getGlobal('Name').slice(1,(getGlobal('Name').length - 1));

    useEffect(()=>{
        setProgress((ventTotales)/(meta));
        checkColor();
    },[ventTotales, progress])

    const checkColor = () =>{
        if ((progress*100) < 33){
            setColorBar('#FF0000');
        }else if((progress*100) >= 33 && (progress*100) < 67){
            setColorBar('#FAB400');
        }else{
            setColorBar('#1DD200');
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
                <View style={{ flex: 1 }}>
                    <Image style={{ width: '86%', height: '100%',resizeMode: 'contain' }} source={ Oro }/>
                </View>
                <View style={{ flex: 1, alignSelf: "center" }}>
                    <Text style={styles.vendedorText}>{vendedor}</Text>
                </View>
                <View style={{ flex: 1}}>
                    <Image style={{ width: '130%', height: '100%',resizeMode: 'contain'}} source={ award }/>
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
                    <TProgressBar pct={progress} color={colorBar} />
                </View>
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
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '12%',
    },
    proBarTextContainer: {
        position: 'absolute', 
        width: 60,
        height: 60,
        left: '7%',
        bottom: '25%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    progressBarText: {
        color: '#193773',
        fontSize: 22,
        fontWeight: 'bold'
    },    
})

export default Main;
