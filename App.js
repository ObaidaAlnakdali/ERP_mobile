import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Text, View, SafeAreaView, StatusBar, Button, Image, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Employee from './components/Employee';
import Constants from 'expo-constants';
import Login from './components/Login';
import Loading from './components/Loading'
import GraphReport from './components/GraphReport';
import KpiReport from './components/KpiReport';
import ProjectReport from './components/ProjectReport';
import * as SplashScreen from 'expo-splash-screen';
import KPI from './components/KPI';
const Stack = createNativeStackNavigator();

export default function App() {
  const [loadingS, setLoadingS] = useState(true);

  useEffect(async () => {
    setTimeout(() => {
      setLoadingS(false)
    }, 500);
  }, []);
  return (<SafeAreaView style={styles.container}>
    {/* <View style={styles.header}>
      <Text style={styles.headerText}>ERP</Text>
    </View> */}
    <NavigationContainer>
      {loadingS ?
        <View style={styles.splashScreen}>
          <Image
            style={styles.splashScreenLogo}
            source={require('./assets/logo-lightGreen.png')} />
          <Text style={styles.splashScreenText}>ERP_Codi</Text>
        </View>
        :
        <Stack.Navigator initialRouteName="Employees">
          <Stack.Screen name="Employees" component={Employee} />
          <Stack.Screen name="GraphReport" component={GraphReport} />
          <Stack.Screen name="KpiReport" component={KpiReport} />
          <Stack.Screen name="ProjectReport" component={ProjectReport} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="KPI" component={KPI} />
        </Stack.Navigator>}
    </NavigationContainer>
    {/* <Login /> */}
    {/* <Employee /> */}
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashScreen: {
    backgroundColor: '#E5E5E5',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashScreenText: {
    color: '#39451f',
    fontSize: 25,
  },
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#ededed',
    marginTop: StatusBar.currentHeight || 0,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  button: {
    marginTop: 30,
  },
  input: {
    width: 200,
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
