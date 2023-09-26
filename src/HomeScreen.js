import React, { useEffect, useState } from 'react';
import {View, Text, Pressable, Modal, TextInput, Switch, FlatList, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Styles, Custum_colors } from '../Styles';
import Ionicons from '@expo/vector-icons/Ionicons';

import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';

import { Entypo } from '@expo/vector-icons';

import {InitiCount, GetCount, SetCount, InitStorage, AddTask, GetTasks, RemoveTask, UpdateTask} from './StorageAndNotification';


const HomeScreen = () => {
    const [Tasks, TasksSetter] = useState(false);
    const [month, setMonth] = useState(null);
    const [task, setTask] = useState([]);

    useEffect(() => { 
      var cat = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octobor', 'November', 'December'];
      setMonth(cat[new Date().getMonth()])
    }, []);

    useEffect(() => {
      GetCount().then((res)=>{if (res!==null) {
        console.log('count is not null');
        GetTasks().then((data) => {
          console.log("data", data);
          setTask(data.tasks);
        });
      }
      else {
        console.log('count is null');
        InitiCount();
        InitStorage();
      }
    });
    }, []);

    useEffect(() => {
      GetTasks().then((data) => {
        console.log("data", data);
        setTask(data.tasks);
      });
    }, [Tasks]);

    const RemoveATask = (id, setAlertModalVisibility) => {
      setAlertModalVisibility(true);
      console.log(id);
    }

    const TasksView = ({title, subtitle, id}) => {
      const [isPressed, setisPressed] = useState(false);
      const [AlertModalVisibility, setAlertModalVisibility] = useState(false);
      
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between',
        backgroundColor: Custum_colors.OlivShade.dark, maxWidth: '100%', marginHorizontal: 2, marginBottom: 2}}>
          
          <View style={{flexDirection: 'column', justifyContent: 'center', margin: 5, padding: 5, backgroundColor: Custum_colors.OlivShade.lightest}}>
              <Text style={{fontWeight: 300, fontSize: 22}}>{title}</Text>
              <Text>{subtitle}</Text>
          </View>
          <Modal
          animationType="fade"
          transparent={true}
          visible={AlertModalVisibility}
          onRequestClose={() => {
          setAlertModalVisibility(!AlertModalVisibility);
        }}
      >
        <View style={{backgroundColor: Custum_colors.OlivShade.lightest, height: 100,
             width: '80%', position: 'absolute', alignSelf: 'center',
              top: '40%', borderRadius: 10, padding: 10,
               justifyContent: 'center', alignItems: 'center', zIndex: 100}}>
                <Text>Are you Sure??</Text>
                <View style={{flexDirection: "row", minWidth: 200,justifyContent: 'space-around', alignItems: 'center'}}>
                <Button title="Yes" onPress={() => {RemoveTask(id); setAlertModalVisibility(false);}} />
                <Button title="No" onPress={() => {setAlertModalVisibility(false);}} />
                </View>
        </View>
        </Modal>
          <Pressable style={{right: 0, alignSelf: 'center'}} 
          onPress={() => { RemoveATask(id, setAlertModalVisibility);}} 
          onTouchStart={()=>{setisPressed(true)}}
          onTouchEnd={()=>{setisPressed(false)}}>
            <Ionicons name="trash" size={30} color={isPressed? Custum_colors.OlivShade.light:Custum_colors.OlivShade.lightest} />
          </Pressable>
        </View>
      )
  }

    return (
        <SafeAreaView style={Styles.Container}>
            <View style={Styles.Header}>
              <Pressable onPress={() => {console.log('pressed')}}>
                <Ionicons name="menu" size={30} color={Custum_colors.OlivShade.lightest} />
              </Pressable>
              <Text style={[Styles.Text, {fontSize:20, color: Custum_colors.OlivShade.lightest}]}>{month}</Text>
              <Pressable onPress={() => {console.log('pressed')}}>
                <Ionicons name="add" size={30} color={Custum_colors.OlivShade.lightest} />
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <Ionicons name="list" size={30} color={Custum_colors.OlivShade.lightest} />
                <Text> Daily </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Ionicons name="calendar" size={30} color={Custum_colors.OlivShade.lightest} />
                <Text> Events </Text>
              </View>
            </View>
            <FlatList
              style={{height: '70%', width: '100%', backgroundColor: Custum_colors.OlivShade.lightest }}
              data={task}
              keyExtractor={(item) => item.identifier}
              renderItem={({item}) => {
                return (
                    <TasksView title={item.content.title} subtitle={item.content.subtitle} id={item.identifier} />
                )
              }}
             />

            <TaskAdder view={Tasks} setView={TasksSetter} />
            <Pressable style={[Styles.Button, {position: 'absolute', 
            bottom: 0, right: 0, zIndex: 100, margin: 10,
            backgroundColor: Custum_colors.OlivShade.light}]}
            onPress={() => {TasksSetter(!Tasks)}}>
                <Text style={Styles.BtnText} >Add Task</Text>
            </Pressable>
        </SafeAreaView>
    );
}


const TaskAdder = ({view, setView}) => {
    const [Task, TaskSetter] = useState('');
    const [Describtion, DescribtionSetter] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [visible, setVisible] = useState(false)

  
    const [selectedTime, setSelectTime] = useState('pick time');
    const [pickedTime, setPickTime] = useState({h: 1, m: 0});
    const [date, setDate] = useState(undefined);
    const [selectedDate, setSelectDate] = useState('pick a Date');
    const [dailyOrNot, setDailyOrNot] = useState(false);

    

    
    const onDismiss = React.useCallback(() => {
      setVisible(false)
    }, [setVisible])
  
    const onConfirm = React.useCallback(
      ({ hours, minutes }) => {
        setVisible(false);
        setSelectTime(`${hours}:${minutes}`);
        setPickTime({ hours, minutes });
      },
      [setVisible]
    );


    const onDismissSingle = React.useCallback(() => {
      setDatePickerVisibility(false);
    }, [setDatePickerVisibility]);
  
    const onConfirmSingle = React.useCallback(
      (params) => {
        setDatePickerVisibility(false);
        let x = params.date;
        setDate(x);
        setSelectDate(`${x.getDate()}/${x.getMonth()}/${x.getFullYear()}`);
      },
      [setDatePickerVisibility]
    );

  const AddaTask = async () => {

    const currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    currentDate.setHours(pickedTime.hours);
    currentDate.setMinutes(pickedTime.minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    const data = { 
      identifier: '0',
      content: {
        title: Task,
        subtitle: Describtion,
        body: 'Reminder Message',
        sound: 'alert2.wav',
        vibrate: [0, 250, 250, 250, 0, 250, 250, 100, 250, 250, 250],
        priority: 'high',
        sticky: true,
      },
      trigger: {
        date: currentDate,
        repeats: false,
      },
     };
    GetCount().then((value) => {
      let x = parseInt(value) + 1;
      SetCount(x.toString());
      data.identifier = x.toString();
    }).then(() => {AddTask(data);});
    setView(false);
   }

  const AddDailyTasks = async () => {
    const currentDate = new Date();
    currentDate.setHours(pickedTime.hours);
    currentDate.setMinutes(pickedTime.minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    const data = { 
      identifier: '0',
      content: {
        title: Task,
        subtitle: Describtion,
        body: 'Reminder Message',
        sound: 'alert.wav',
        vibrate: [0, 250, 250, 250, 0, 250, 250, 100, 250, 250, 250],
        priority: 'high',
        sticky: true,
      },
      trigger: {
        date: currentDate,
        repeats: true,
      },
     };
    GetCount().then((value) => {
      let x = parseInt(value) + 1;
      SetCount(x.toString());
      data.identifier = x.toString();
    }).then(() => {AddTask(data);});
    setView(false);
  }


  

  
    return (
      <Modal visible={view}
      transparent={false}
      style={{flex: 0.5,justifyContent: 'flex-end'}}>
        <View style={[Styles.Container, {justifyContent: 'flex-start'}]}>
          <View>
            <Pressable
              onPress={() => {
                setView(!view);
              }}
            >
              <Entypo name="chevron-small-up" size={30} color={Custum_colors.OlivShade.lightest} />
              
            </Pressable>
          </View>

          <TextInput
            style={[Styles.Input, {width: '90%', fontSize: 30, fontWeight: "bold", height: 'auto'}]}
            type="text"
            placeholderTextColor={Custum_colors.OlivShade.lightest}
            placeholder="Heading"
            onChangeText={(text) => {
              TaskSetter(text);
            }}
          />

          <TextInput
            style={[Styles.Input, {width: '90%', height: '20%'}]}
            placeholderTextColor={Custum_colors.OlivShade.lightest}
            type="text"
            placeholder="Describtion"
            onChangeText={(text) => {
              DescribtionSetter(text);
            }}
          />
          <View style={{ flexDirection: 'row', alignContent: 'center', 
        alignItems: 'center', backgroundColor: Custum_colors.OlivShade.dark, paddingHorizontal: 20,
        borderRadius: 10}}>
            <Text style={{color: Custum_colors.OlivShade.lightest, fontSize: 15}} >{dailyOrNot?'Daily':'Once'}</Text>
            <Switch onChange={() => setDailyOrNot(!dailyOrNot)} value={dailyOrNot} />
          </View>

          
          <Pressable onPress={() => setVisible(true)}>
          <View style={{height: 60, width: 200, 
                backgroundColor: Custum_colors.OlivShade.dark, borderRadius: 10, borderWidth: 1, borderColor: Custum_colors.OlivShade.darkest,
                padding: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            
              <Text style={{color: Custum_colors.OlivShade.lightest, fontSize: 35}}>
                {selectedTime}
              </Text>

          </View>
          </Pressable>
        <TimePickerModal
          visible={visible}
          onDismiss={onDismiss}
          onConfirm={onConfirm}
          hours={12}
          minutes={14}
        />
{dailyOrNot? null : 
<Pressable onPress={() => setDatePickerVisibility(true)}>
          <View style={{height: 60, width: 200, 
                backgroundColor: Custum_colors.OlivShade.dark, borderRadius: 10, borderWidth: 1, borderColor: Custum_colors.OlivShade.darkest,
                padding: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
            
              <Text style={{color: Custum_colors.OlivShade.lightest, fontSize: 20}}>
              {selectedDate}
              </Text>

          </View>
          </Pressable>}


        <DatePickerModal
          locale="In"
          mode="single"
          visible={isDatePickerVisible}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          presentationStyle='pageSheet'
          validRange={{startDate: new Date()}}
        />


          <Pressable style={[Styles.Button, {width: '50%'}]}
           disabled={Task === ""}
           onPress={() => {
              if(dailyOrNot){
                AddDailyTasks();
              }else{
                AddaTask();
              }
           }}>
            <Text style={Styles.BtnText}>Add Task</Text>
           </Pressable>
          
        </View>
      </Modal>
    );
}




export default HomeScreen;
