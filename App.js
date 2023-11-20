import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from 'react';
import { firebase } from './config';

import Login from './Screen/Login';
import Registration from './Screen/Registration';
import Dashboard from './Screen/Dashboard';
import Header from './components/Header';

const Stack = createNativeStackNavigator();

function App(){
  const [initializing, setInitializing] = useState(true);
  const [ user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;

  if (!user){
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name='Login' 
          component={Login}
          options={{
            headerTitle: () => <Header name="LOGIN"/>,
            headerStyle: {
              height: 150,
              borderRadius: 50,
              backgroundColor: 'white',
              shadowColor: 'gray',
              elevation: 25
            }
            
          }}
        />
        <Stack.Screen 
          name='Registration' 
          component={Registration} 
          options={{
            headerTitle: () => <Header name="REGISTRATION"/>,
            headerStyle: {
              height: 150,
              borderRadius: 50,
              backgroundColor: 'white',
              shadowColor: 'gray',
              elevation: 25
            }
            
          }}
        />
      </Stack.Navigator>
    );
  }
  return  (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen 
          name='Dashboard' 
          component={Dashboard} 
          options={{
            headerTitle: () => <Header name="Dashboard"/>,
            headerStyle: {
              height: 150,
              borderRadius: 50,
              backgroundColor: 'white',
              shadowColor: 'gray',
              elevation: 25
            }
            
          }}
        />
    </Stack.Navigator>
 );

}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}