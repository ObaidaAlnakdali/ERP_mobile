import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, SafeAreaView, StatusBar, Image, StyleSheet, Appearance, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Employee from './components/Employee';
import Constants from 'expo-constants';
import Login from './components/Login';
import Loading from './components/Loading'
import GraphReport from './components/GraphReport';
import KpiReport from './components/KpiReport';
import ProjectReport from './components/ProjectReport';
import KPI from './components/KPI';
import Button from './components/Button';
import AuthContext from './components/hooks/AuthContext'
import axios from 'axios';

const Stack = createNativeStackNavigator();



export default function App() {

  const [auth, setAuth] = useState(null);

  const token = {
    signIn: ( email, password) => {
      const data = {
        email: email,
        password,
      };
      axios.post(`http://192.168.0.115/api/login`, data)
        .then((response) => {
          if (response.status == 200) {
            setAuth(response.data.token);
          }
        }).catch((err) => {
         console.log(err)
        });
    },
    signOut: () => {
      setAuth(null);
    },
  };

  
  return (
    <AuthContext.Provider value={token}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ERP</Text>
        </View>

        {/* <Image
      style={{width:200, height:200}}
        source={require('./assets/loading.gif')}
      />       */}

  

        <NavigationContainer  >
          <Stack.Navigator initialRouteName="Employees">
           <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Employees" component={Employee} />
            <Stack.Screen name="GraphReport" component={GraphReport} />
            <Stack.Screen name="KpiReport" component={KpiReport} />
            <Stack.Screen name="ProjectReport" component={ProjectReport} />
            <Stack.Screen name="KPI" component={KPI} />
          </Stack.Navigator>
        </NavigationContainer>


      </SafeAreaView>
    </AuthContext.Provider>          
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ededed',
    marginTop: StatusBar.currentHeight || 0,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    margin:20,
  },
  button:{
    marginTop:30,
  },
  input: {
    width:200,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },  
  
  header: {
    width: '100%',
    padding: 10,
    backgroundColor: '#8AB038',
    textAlign: 'center',
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
