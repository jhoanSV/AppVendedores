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
        {show && (
          <FlatList
            style={styles.containerMenu}
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </>
    );
  };


  const styles = StyleSheet.create({
    containerMenu: {
        width: '40%',//windowWidth/2.7,
        position: 'absolute',
        right: 0,
        margin: 0,
        marginTop: 0,
        borderWidth: 0,
        padding: 0,
        backgroundColor: '#ffff',
        borderColor: '#F2CB05',
        borderWidth: 1,
        zIndex: 99,
      },
      IconMenu: {
        position: 'absolute',
        right: '5%',
        top: '-6.5%',
        zIndex: 99,
      },
      text: {
        fontSize: 16,
      }
  })

  export default PopUpMenu;