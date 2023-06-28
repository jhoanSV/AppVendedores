import React, {useState, useEffect} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, ImageBackground, Modal, TouchableOpacity , Dimensions} from "react-native";
import { logoNameWhite, BackgroundAuth } from "../../assets";
import { Input, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { validateUser } from '../api';
import Warning from '../components/modal/Warning';
import Loading from '../components/modal/Loading';
//intento de hacer que recoja el codigo del vendedor
import { setGlobal, getGlobal } from '../components/context/user';
//Fin intento de hacer que recoja el codigo del vendedor
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LogIn = () => {
  const navigation = useNavigation()
  const [showPasswords, setShowPasswords] = React.useState(false);
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [User, setUser] = useState();
  const [visible, setVisible] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [tasks, setTasks] = useState({
    "Email" : text,
    "Contraseña" : password
  });

  const handleChange = (name, value) => setTasks({...tasks, [name]: value});
  const handleSubmit = async() => {
    setCargando(true)
    const valor = await validateUser(tasks)
    if(valor.length === 1){
      const usuario = JSON.stringify(valor[0]["Cod"])
      const cargo = JSON.stringify(valor[0]["Cargo"])
      setUser(usuario)
      navigation.navigate('Main')
      setGlobal({ User : usuario, Position: cargo})
      console.log(usuario + " " + cargo)
      setCargando(false)
    } else {
      setVisible(true)
      setCargando(false)
      setTimeout(() => {  
        setVisible(false)
      }, 5000);//console.log("El usuario o la contraseña son incorrectos")
    }
  }
  const limpiar = () => setTasks({...tasks, ["Email"]: "", ["Contraseña"]: ""});

  return (
    
    <SafeAreaView style={{flexGrow: 1}}>
        <ImageBackground source={ BackgroundAuth } resizeMode="cover"  style={styles.image}>
            <View style={ styles.dark }>
                <View style={styles.container}>
                        <Image style={styles.logo} source={ logoNameWhite }/>
                    <View style={ styles.inputs } >
                      <Text style={styles.inputText}>Usuario</Text>
                      <TextInput
                          style={styles.input}
                          placeholder="Ingrese su usuario"
                          onChangeText={text => handleChange("Email",text)}
                          value={tasks.Email}
                      />
                      <Text style={styles.inputText}>Contraseña</Text>
                      
                        <TextInput
                            style={styles.input}
                            secureTextEntry={!showPasswords}
                            placeholder="Ingrese su contraseña"
                            onChangeText={text => handleChange("Contraseña",text)}
                            value={tasks.Contraseña}
                        />
                      <View style={styles.icon}>
                        <Icon
                          type='material-community'
                          name={showPasswords?'eye-off-outline':'eye-outline'}
                          onPress={() =>{
                              setShowPasswords(!showPasswords)
                        }}/>
                      </View>
                    </View>
                    <View style={styles.buttons}>
                      <Button 
                        buttonStyle={[ styles.buttonLogin, {backgroundColor: '#F2CB05'}]} 
                        title="Iniciar sesión" 
                        onPress={handleSubmit}
                      />
                      <Button 
                        buttonStyle={[ styles.buttonLogin, {backgroundColor: '#D0D9F2'}]} 
                        title="Cancelar" 
                        onPress={limpiar}
                      />
                    </View>
                </View>
            </View>
        </ImageBackground>
        <Warning visible={visible} title={'Error al entrar'} warningText={'Usuario o contraseña incorrecta, intente de nuevo'} setMostrar={setVisible} ConfirmationText={'Entendido'} SetConfirmation={setVisible}/>                    
        <Loading visible={cargando} mensaje={'Validando...'}/>
    </SafeAreaView>
  );
};
const handlerShowPassword = () =>{
    setShowPasswords(!showPasswords)
  };
const styles = StyleSheet.create({
  input: {
    height: windowHeight*0.0581,//40,
    width: windowWidth * 0.78,//255,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    
    borderRadius: 40,
    backgroundColor: '#ffff',
    borderColor: '#000000',
  },
  inputText: {
    fontWeight: 'bold',
    paddingBottom: 5,
    color:  '#FFFF',
    left: windowWidth * 0.031,//12,
  },
  container: {
    position: 'absolute',
    width: windowWidth * 0.87,//305,
    height: windowHeight*0.8,//550,
    left: windowWidth * 0.065,//30,
    top: windowHeight*0.1,//15,
    backgroundColor: '#193773',
    alignItems: 'center',
    borderWidth: 4,
    borderColor : '#F2CB05',
    borderRadius: 20,
  },
  logo: {
    width: windowWidth * 0.77,//270,
    height: windowHeight*0.116,//80,
    resizeMode: 'contain',
    //left: 15,
    top: 15,
  },
  inputs: {
    left: 5,
    top: windowHeight*0.116,//80,
  },
  buttons: {
    position: 'absolute',
    width: windowWidth * 0.78,//255,
    //left: 17,
    //top: windowHeight*0.20,//150,
    bottom: windowHeight*0.01,//-150
  },
  
image: {
    flex: 1,
    justifyContent: 'center',
},
dark: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'rgba(0,0,0,0.5)',
},
icon: {
    position: 'relative',
    width: 25,
    zIndex: 1,
    left: windowWidth * 0.70,//230,
    top: windowHeight*-0.062,//-42//windowHeight*0.193,//133,
  },
buttonLogin : {
  borderRadius: 40, 
  margin: 4,
},
ModalBackground: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
subTitle: {
  fontSize: 20, 
  fontWeight: 'bold', 
  margin: 8,
  color: '#193773',
},
});

export default LogIn;