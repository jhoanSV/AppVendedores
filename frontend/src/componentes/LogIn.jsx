import React, {useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, ImageBackground, Modal, TouchableOpacity } from "react-native";
import { logoNameWhite, BackgroundAuth } from "../../assets";
import { Input, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { validateUser } from '../api';

//intento de hacer que recoja el codigo del vendedor
import { setGlobal, getGlobal } from '../components/context/user';
//Fin intento de hacer que recoja el codigo del vendedor

const LogIn = () => {
  const navigation = useNavigation()
  const [showPasswords, setShowPasswords] = React.useState(false);
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [User, setUser] = useState();
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState({
    "Email" : text,
    "Contraseña" : password
  });

  //setTimeout(() => {  
    //setVisible(false)
  //}, 5000);

  const ModalPopUpAviso = ({visible, children}) => {
    const [showModal, setShowModal] = useState(visible);
    return (
    <Modal transparent visible={visible}>
        <View style={[styles.ModalBackground]}>
          <View style={[styles.contenedorModal]}>
            <View style={[{flexDirection: 'row', backgroundColor: '#D6320E', borderBottomColor: '#F2CB05', borderBottomWidth: 6,}]}>
              <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>Aviso</Text>
              <TouchableOpacity style={[{position: 'absolute', right: 5}]} onPress={()=>setVisible(false)}>
                <Text style={[styles.subTitle, {textAlign: 'center', color:  '#FFFF'}]}>X</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.subTitle, {textAlign: 'center', color:  '#D6320E'}]}>Usuario o contraseña incorrecta, intente de nuevo</Text>
          </View>
        </View>
      </Modal>
    );
  };

  const handleChange = (name, value) => setTasks({...tasks, [name]: value});
  const handleSubmit = async() => {
    const valor = await validateUser(tasks)
    if(valor.length === 1){
      const usuario = JSON.stringify(valor[0]["Cod"])
      setUser(usuario)
      navigation.navigate('Main')
      setGlobal({ User : usuario })
      console.log(usuario)
    } else {
      setVisible(true)
      setTimeout(() => {  
        setVisible(false)
      }, 5000);//console.log("El usuario o la contraseña son incorrectos")
    }
  }
  const limpiar = () => setTasks({...tasks, ["Email"]: "", ["Contraseña"]: ""});

  return (
    
    <SafeAreaView style={ {marginTop: Constants.statusBarHeight, flexGrow: 1}}>
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
        <ModalPopUpAviso visible={visible}></ModalPopUpAviso>
    </SafeAreaView>
  );
};
const handlerShowPassword = () =>{
    setShowPasswords(!showPasswords)
  };
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 255,
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
    left: 12,
  },
  container: {
    width: 305,
    height: 550,
    left: 30,
    top: 15,
    backgroundColor: '#193773',
    
    borderWidth: 4,
    borderColor : '#F2CB05',
    borderRadius: 20,
  },
  logo: {
    width: 270,
    height: 80,
    left: 15,
    top: 15,
  },
  inputs: {
    left: 5,
    top: 80,
  },
  buttons: {
    width: 255,
    left: 17,
    top: 150,
  },
  button: {
    width: 255,
    Color: '#F2CB05',
    left: 17,
    top: 450,
    borderRadius: 40,
},
image: {
    flex: 1,
    justifyContent: "center",
},
dark: {
    flex: 1,
    justifyContent: "center",
    backgroundColor:'rgba(0,0,0,0.5)',
},
icon: {
    position: "absolute",
    zIndex: 1,
    left: 230,
    top: 133,
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
contenedorModal: {
  backgroundColor: '#FFFF',
  width: 300,
  height: 300,
  
},
subTitle: {
  fontSize: 20, 
  fontWeight: 'bold', 
  margin: 8,
  color: '#193773',
},
});

export default LogIn;