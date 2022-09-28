import React, {useState} from "react";
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Image, ImageBackground } from "react-native";
import { logoNameWhite, BackgroundAuth } from "../../assets";
import { Input, Icon, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { validateUser } from '../api';
const LogIn = () => {
  const navigation = useNavigation()
  const [showPasswords, setShowPasswords] = React.useState(false);
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [User, setUser] = useState();
  const [tasks, setTasks] = useState({
    "Email" : text,
    "Contraseña" : password
  });

  const handleChange = (name, value) => setTasks({...tasks, [name]: value});
  const handleSubmit = async() => {
    const valor = await validateUser(tasks)
    if(valor.length === 1){
      const usuario = JSON.stringify(valor[0]["Cod"])
      setUser(usuario)
      navigation.navigate('Main')
      console.log(User)
    } else {
      console.log("El usuario o la contraseña son incorrectos")
    }
  }
  const limpiar = () => setTasks({...tasks, ["Email"]: "", ["Contraseña"]: ""});

  const Ingresar = () => {
    const valor  = validateUser(text, password)
    if (valor !== []) {
      navigation.navigate('Main')
    } else {
      console.log("El usuario o la contraseña es incorrecta")
    }
  };
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
});

export default LogIn;