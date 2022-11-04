import React from 'react';
import { View, Text, FlatList, StyleSheet} from 'react-native';
import DesTasksItem from './DesTasksItem';

const DesTaskList =({ agregarPedido, tasks, handleSubmit}) => {
  const renderItem=({ item })=>{
    return <DesTasksItem item={ item } agregarPedido={agregarPedido} handleSubmit={handleSubmit}/>
  }  
  
  return (
        <FlatList
          data={tasks}
          renderItem={renderItem}
          style={styles.container}
        />    
    );
};

const styles = StyleSheet.create({
    container: {
        height: 90,
        width: 320,
        margin: 12,
        marginTop: 0,
        borderWidth: 0,
        padding: 0,
        backgroundColor: '#ffff',
        borderColor: '#F2CB05',
        borderWidth: 2,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,

    }
  });

export default DesTaskList;