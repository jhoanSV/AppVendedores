import React, { useEffect, useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, Button } from "react-native";

import { progressBar1 } from "../../assets";

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
    const vendedor = ['Vendedor1'];

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
            <View style={ { alignItems: 'center'}}>
                <Text style={styles.vendedorText}>{vendedor}</Text>
            </View>            
            <View style={{ width: '100%', aspectRatio: (1710/580)}}>
                <Image style={{ flex: 1, width: '100%', resizeMode: 'contain'}} source={ progressBar1 }/>
                <View style={ styles.proBarTextContainer}>
                    <Text style={styles.progressBarText}>
                        {parseInt(progress*100)}%
                    </Text>
                </View>
                <Text style={{position: 'absolute', left: 116, top: 42, fontWeight: 'bold', fontSize: 16,
                    zIndex: 2, color: 'white',}}>
                    Progreso
                </Text>
                <View style={{position: 'absolute', left: 116, bottom: 32}}>
                    <TProgressBar pct={progress/*-0.021*/} width={242} height={54} color={colorBar} />
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    proBarTextContainer: {
        position: 'absolute', 
        width: 60,
        height: 60,
        left: 26,
        bottom: 34.5,
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
