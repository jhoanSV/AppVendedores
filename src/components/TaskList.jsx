import React from 'react';
import { View, Text, FlatList} from 'react-native';
import TasksItem from './TasksItem';

const TaskList =({ tasks }) => {
  const renderItem=({ item })=>{
    return <TasksItem task={ item }/>
  }  
  
  return (
        <FlatList
          data={tasks}
          renderItem={renderItem}
        />    
    );
};

export default TaskList;