import { View,
         Text,
         TouchableOpacity,
         StyleSheet,
         Modal
        } from 'react-native';

export const TheAlert = ({ visible, message, mode, onCancel, onAccept }) => {
    return (
        <Modal style={[styles.ModalBackground]} transparent visible={visible}>
            <View style={[styles.contenedorModal, {height: 370,}]}>
                <Text>{message}</Text>
                <View style={{ textAlign: 'end' }}>
                    <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: '#193773', right: 0}]} onPress={()=>onAccept}>
                        <Text>Aceptar</Text>
                    </TouchableOpacity>
                    {mode === 1 && (
                        <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: '#D6320E',}]} onPress={()=>onCancel}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    ModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contenedorModal: {
        backgroundColor: '#FFFF',
        width: '90%',//windowWidth * 0.90,//300,
        height: 300,
    },
})
