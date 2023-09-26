import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
// initialize storage count 
const InitiCount = async () => {
    try {
      await AsyncStorage.setItem('count', '0');
    } catch (e) {
      Alert.alert('Error', e);
    }
  };

//function getStorageCount() { return count; }

const GetCount = async () => {
    try {
      const value = await AsyncStorage.getItem('count');
      if(value !== null) {
        return value;
      }
      else {
        return null;
      }
    } catch(e) {
      Alert.alert('Error', e);
      return null;
    }
  };

//function setStorageCount(count) { count = count; }

const SetCount = async (count) => { 
    try {
      await AsyncStorage.setItem('count', count);
    } catch (e) {
      Alert.alert('Error', e);
    }
  }

// initialize Storage with first task as title: "Add your first task" with repeat: "false"

const firstTask = {
    "tasks":[{
        identifier: '0',
        content: {
          title: "It is your reminder...",
          subtitle: 'Now you are all set to add your first task!',
          body: 'Add your first task by clicking on the + button in Home screen.',
          sound: 'alert.wav',
        },
        sticky: true,
        trigger: {
          seconds: 30,
          repeats: false,
        },
      }
    ]
};


const InitStorage = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(firstTask));
        Notifications.scheduleNotificationAsync(firstTask.tasks[0]);
        
    } catch (e) {
      Alert.alert('Error', e);
    }
  };

//function addTask(task) { ...apend into storage } setStorageCount(count + 1); }

const AddTask = async (task) => {
    try {
      const value = await AsyncStorage.getItem('tasks');
      if(value !== null) {
        const tasks = JSON.parse(value);
        tasks.tasks.push(task);
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        AddNotifications(task);
      }
    } catch(e) {
      Alert.alert('Error', e);
    }
  }

//function ReadTask() { return task; }
const GetTasks = async() => {
    try {
      const value = await AsyncStorage.getItem('tasks');
      if(value !== null) {
        return JSON.parse(value);
      }
      else {
        return [];
      }
    } catch(e) {
      Alert.alert('Error', e);
      return null;
    }
  }

// function remove task(task id) {}

const RemoveTask = async(taskID) => {
    try {
      const value = await AsyncStorage.getItem('tasks');
      if(value !== null) {
        const tasks = JSON.parse(value).tasks;
        const updated = tasks.filter((task) => task.identifier !== taskID);
        RemoveNotifications(taskID);
        const UpdatedJson = {tasks: updated};
        await AsyncStorage.setItem('tasks', JSON.stringify(UpdatedJson));
      }
    } catch(e) {
      Alert.alert('Error', e);
    }
  }

// function update task(task id, task) {}
 const UpdateTask = async(taskID, updatedValues) => {
    try {
      const value = await AsyncStorage.getItem('tasks');
      if(value !== null) {
        const tasks = JSON.parse(value).tasks;
        const updated = tasks.filter((task) => task.identifier !== taskID);
        updated.push(updatedValues);
        UpdateNotifications(taskID, updatedValues);
        const UpdatedJson = {tasks: updated};
        await AsyncStorage.setItem('tasks', JSON.stringify(UpdatedJson));
      }
    } catch(e) {
      Alert.alert('Error', e);
    }
  }

  // function remove notifications

    const RemoveNotifications = async(identifier) => {
        await Notifications.cancelScheduledNotificationAsync(identifier);
    }

    // function update notifications

    const UpdateNotifications = async(taskID, updatedValues) => {
        try{
        await Notifications.cancelScheduledNotificationAsync(taskID);
        AddNotifications(updatedValues);
        }catch(e){
            Alert.alert('Error', e);
        }
    }

    // function add notifications

    const AddNotifications = async(task) => {
      try {
        await Notifications.scheduleNotificationAsync(task);
      }
      catch(e) {
        Alert.alert('Error', e);
      }
        
    }

export {InitiCount, GetCount, SetCount, InitStorage, AddTask, GetTasks, RemoveTask, UpdateTask};