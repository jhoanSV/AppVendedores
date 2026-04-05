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
          useWindowDimensions,
          PanResponder,
          Animated,
          PixelRatio } from 'react-native';
import { Icon } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


function Ruler({ navigation, route }) {
    const [figure, setFigure] = useState('circle');
    const [circleSize, setCircleSize] = useState(200);
    const [initialX, setInitialX] = useState(null);
    const centralpoint = (windowWidth, windowHeight)
    const [initialsize, setInitialsize] = useState(200);
    const [ajuste, setAjuste] = useState(1);
    const dpi = 96//PixelRatio.get() * 180;
    const MPulgada = 136.5520629;

    function handleDragStart(event) {
        // Store the initial position of the element
        initialX = event.clientX;
        //initialY = event.clientY;
    }

    const changeSizeCircle=(event)=>{
        // Get the current position of the element
        const currentX = event.clientX;
        const currentY = event.clientY;

        // Calculate the distance moved from the initial position
        //const deltaX = currentX - initialX;
        //const deltaY = currentY - initialY;
        //const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        //setCircleSize(distance);
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        //*To the beggining of the drag
        onPanResponderGrant: (event, gesture) => {
            // At the beginning of the gesture get the initial position
            const initialX = event.nativeEvent.pageX;
            setInitialsize(circleSize);
            setInitialX(initialX);
            if (initialX < windowWidth/2 ){
                setAjuste(-1)
            } else {
                setAjuste(1)
            }
          },
        //*On drag
        onPanResponderMove: (_, gesture) => {
        if (initialX !== null) {
            // Calcular la diferencia horizontal (dx)
            const dx = gesture.moveX - initialX;
            // Actualizar el tamaño del círculo sumando la diferencia horizontal
            setCircleSize(initialsize + ajuste * dx);
            //Compute the size of the circle in centimeters and inches
            let inches = (initialsize + ajuste * dx )/ (MPulgada)
            console.log("initialX: "+ initialX, "dx: " + dx, "CircleSize: " + circleSize, "dpi: " + dpi)
            console.log("Pulgadas: " +  inches)
            console.log("Centimetros: " + inches * 2.54)
        }
        },
        //*end drag
        onPanResponderRelease: () => {
        // Restablecer la posición inicial cuando se libera el arrastre
        setInitialsize(circleSize)
        setInitialX(null);
        }
      });


    return (
        <View style={[styles.container]} {...panResponder.panHandlers}>
            <Animated.View
                style={[
                styles.circle,
                { width: circleSize,
                  height: circleSize,
                  borderRadius: circleSize}
                ]}
                //{...panResponder.panHandlers}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container : {
      //padding: 10,
      paddingBottom: 10,
      position: 'relative',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    subTitle: {
      fontSize: 20, 
      fontWeight: 'bold', 
      margin: 8,
      color: '#193773',
    },
    text: {
      fontSize: 16,  
      marginLeft: 8,
      color: 'black',
    },
    scroll : {
      flex: 1,
      paddingBottom: 540
    },
    goBlack: {
      float: 'left'
    },
    buttonLogin : {
      borderRadius: 50,
      margin: 2,
      bottom: 0,
      width: windowWidth * 0.49,//170,
      //alignItems:'center',
    },
    buttons: {
      width: 255,
      justifyContent:'center',
      alignItems:'center',
      //position:'absolute',
    },
    input: {
      height: 40,
      width: windowWidth * 0.94,//320,
      margin: 12,
      //marginBottom: 0,
      padding: 10,
      borderRadius: 40,
      backgroundColor: '#ffff',
      borderColor: '#F2CB05',
      borderWidth: 2,
      //borderBottomWidth: 0,
      //BorderlessButton: 0
    },
    input2: {
      height: 40,
      width: windowWidth * 0.94,//320,
      margin: 12,
      marginBottom: 0,
      padding: 10,
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      backgroundColor: '#ffff',
      borderColor: '#F2CB05',
      borderWidth: 2,
      borderBottomWidth: 0,
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
    logo: {
      position: 'relative',
      width: 270,
      height: 270,
    },
    container2: {
      height: windowHeight* 0.13, //90,
      width: windowWidth * 0.94,//320,
      margin: 12,
      marginTop: 0,
      borderWidth: 0,
      padding: 0,
      backgroundColor: '#ffff',
      borderColor: '#F2CB05',
      borderWidth: 2,
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      },
    ContenedorEstado: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      },
    containerL: {
          //height: windowHeight*0.49,
          width: windowWidth,
          margin: 12,
          marginTop: 0,
          borderWidth: 0,
          padding: 0,
          backgroundColor: '#ffff',
          borderColor: '#F2CB05',
          borderWidth: 1,
      },
      TextNotasV: {
        backgroundColor: '#FFFF',
        width: '97%',
        height: '65%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#F2CB05',
        margin: 3,
        padding: 4
      },
      circle: {
        width: 100,
        height: 100,
        borderRadius: 50, // Half of the width and height to make it a circle
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#193773',
        //backgroundColor: 'blue', // Change the color as needed
        position: 'absolute',
      },
      background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      },
  });
  
  export default Ruler;