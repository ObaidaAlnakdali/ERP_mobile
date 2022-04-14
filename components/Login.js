import React from 'react'
import { useState, useEffect } from 'react';
import { Text, View, Button, Image, StyleSheet, TextInput } from 'react-native';


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8000/api/login`, formValue)
      // .then(response => console.log('response', response.data.data.original.token))
      .then(response => {
        if (response.data.status === 400 || response.data.status === 500) {
          console.log('Wrong Email or Password  !')
        }
        else {
          navigate('/dashboard/Admins')
        }
      })
  }


  return (
    <View style={styles.container}>

      <Image
        style={styles.tinyLogo}
        source={require('../assets/logo-lightGreen.png')}
      />

      <TextInput
        style={styles.input}
        name='email'
        onChangeText={(email) => setEmail(email)}
        placeholder="Email"
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        name='password'
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        keyboardType="numeric"
      />

      <TouchableHighlight style={styles.button}
        onPress={() => { signIn(email, password) }}
      >
        <Text >Continue</Text>
      </TouchableHighlight>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    flexDirection: 'column',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 100,
    height: 100,
    margin: 20,
  },
  input: {
    width: 200,
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ededed',
  },
  button: {
    marginTop: 30,
    width: 80,
    padding: 20,
  },
});


export default Login