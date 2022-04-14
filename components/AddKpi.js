import React from 'react'
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    SafeAreaView,
    TouchableHighlight,
    View,
    TextInput,
    Image,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Button,
    Pressable,
} from "react-native";
import axios from 'axios';

function AddKpi() {

    const [newkpi, setNewKpi] = useState({ name: '' });
    const [kpis, setKpis] = useState([]);

    const handleChangeKpi = (e) => {
        setNewKpi({ name: e });
    }

    const handleSubmitKpi = async () => {
        await axios.post(`http://192.168.0.109:8000/api/kpi/`, newkpi).then(response => {
            // console.log(response.message);
            setNewKpi({ name: '' });
            setKpis(res.data.data);
        })
    }

    const getKpi = async () => {
        const kpii = [];
        await axios.get(`http://192.168.0.109:8000/api/kpi`)
            .then(res => {
                res.data.data.map((a) => {
                    kpii.push(a.name);
                })
                console.log("kpisssssssssssssssss", res.data.data);
                setKpis(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const Item = ({ name }) => (
        <Text style={styles.name}>{name}</Text>
      );

    const renderItem = ({ item }) => (
        <Item  name={item.name} />
      );

    useEffect(() => {
        getKpi();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.item}>
            <TextInput
                style={styles.input}
                onChangeText={handleChangeKpi}
                value={newkpi.name}
                placeholder="Add New Kpi"
            />

            <TouchableHighlight style={styles.btn}
                onPress={handleSubmitKpi}
            >
                <Text style={styles.btnText}>Add</Text>
            </TouchableHighlight>
            </View>
            <View style={styles.kpis}>
                <FlatList
                    //contentContainerStyle={{display:'flex', flexDirection:'row', flexWrap:'wrap', margin:10, padding:10,alignItems:'center', justifyContent:'center'}}
                    data={kpis}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        marginVertical: 20,
        alignItems: "center",
        flex: 1,
    },
    item: {
        width:'90%',
        marginVertical:20,
        marginHorizontal: 10,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        padding: 10,
        borderRadius: 18,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    input: {
        width:200,
        height: 40,
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#fff',
    },
    btn: {
        backgroundColor: '#8AB038',
        paddingVertical: 5,
        margin: 5,
        borderRadius: 12,
        height: 40,
        justifyContent: 'center',
        paddingHorizontal: 18
    },
    btnText: {
        color: "#ededed",
    },
    kpis:{
        width:'90%',
        display:'flex',
        marginVertical:20,
        marginHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderRadius: 18,
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        flex:1,
    },
    name:{
        backgroundColor:'white',
        margin:10,
        padding:10,
        width:'90%',
        borderRadius:18,
        textAlign:'center',
    }
})

export default AddKpi