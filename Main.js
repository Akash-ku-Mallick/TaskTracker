import { registerRootComponent } from 'expo';
import React, { useState, useEffect, useRef } from 'react';
import AuthScreen from './src/AuthScreen';
import HomeScreen from './src/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import { registerTranslation } from 'react-native-paper-dates'




registerTranslation('In', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat) =>
    `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date) => `Must be later then ${date}`,
  mustBeLowerThan: (date) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
});

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      sound: 'alert.wav',
    }),
  });

const TaskTracker = () => {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });


    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);



    return (
        <NavigationContainer>
            <Stack.Navigator
            headerTitle="Task Tracker"
            initialRouteName='Home'
            >
                <Stack.Screen name="Auth" component={AuthScreen} options={{
                    headerTitle: 'Task Tracker',
                    headerTitleAlign: 'center',
                    
                }} />
                <Stack.Screen name="Home" component={HomeScreen} 
                options={{
                    headerShown: false,
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


registerRootComponent(TaskTracker);