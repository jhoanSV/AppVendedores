/**
 * @file PopUpMenu.jsx
 * @description Componente reutilizable de menú emergente (popup).
 *              Muestra una lista de opciones al presionar un ícono de tres puntos.
 * @author Jhoan Sierra
 * @date 2024-01-15
 */
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
          useWindowDimensions} from 'react-native';
import { Icon } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const PopUpMenu = ({ tasks, actions }) => {
    const [show, setShow] = useState(false);
  
    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity onPress={() => {
          actions[index](); // Execute the corresponding action
          setShow(false); // Hide the popup menu
        }}>
          <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <>
        <TouchableOpacity style={styles.IconMenu} onPress={() => setShow(!show)}>
          <Icon name='more' color='#ffffff'/>
        </TouchableOpacity>

        <Modal transparent visible={show} onRequestClose={() => setShow(false)}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={() => setShow(false)}>
            <View style={styles.containerMenu}>
              <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  };


  const styles = StyleSheet.create({
    containerMenu: {
      width: '40%',
      position: 'absolute',
      top: 60,   // ajusta este valor
      right: 10,
      backgroundColor: '#FFFFFF',
      borderColor: '#F2CB05',
      borderWidth: 1,
    },
    IconMenu: {
      position: 'absolute',
      right: '5%',
      top: 20,
      zIndex: 99,
    },
    text: {
      fontSize: 16,
    }
  })

  export default PopUpMenu;