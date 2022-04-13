import React from "react";
import { useState, useEffect } from "react";
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
  Dimensions,
} from "react-native";

import axios from "axios";
import { ScrollView } from "react-native-virtualized-view";

function KpiReport({ route }) {
  const { id } = route.params;
  const [dataReport, setDataReport] = useState([]);
  const [loading, setLoading] = useState(true);

  const getKpiReports = async () => {
    axios.get(`http://192.168.0.115:8000/api/employees/validKPIS/${id}`).then(res => {
      setDataReport(res.data.data.valid_kpi);
      setLoading(false);
    }).catch((err) => console.log(err));

  };
  const Item = ({ name, rate }) => (
    <View style={styles.items}>
      <View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.title}>{rate}</Text>
      </View>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} rate={item.latest_kpi.rate} />
  );

  useEffect(async () => {
    await getKpiReports();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navView}>
        <Text style={styles.navItem}>Kpis</Text>
        <Text style={styles.navItem}>Rate</Text>
      </View>
      <View style={styles.parentbody}>
        {loading === true ?
          <Image
            style={styles.loadingLogo}
            source={require('../assets/loading2.gif')} />
          :
          <FlatList
            style={styles.body}
            data={dataReport}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
    flex: 1,
  },
  body: {
    paddingHorizontal: 10,
    width: "100%",
    paddingBottom: 0,
  },

  navView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "60%",
    alignItems: "center",
    backgroundColor: "#e5e5e5",
    borderRadius: 18,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  navItem: {
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 4,
    backgroundColor: "#8AB038",
    borderRadius: 8,
    marginHorizontal: 10,
  },
  parentbody: {
    backgroundColor: "#e5e5e5",
    width: "80%",
    marginVertical: 15,
    padding: 10,
    borderRadius: 16,
    height: '85%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  items: {
    margin: 6,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center",
    backgroundColor: "#fcfcfc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 7,
    position: "relative",
    height: 40,
    borderRadius: 20
  },
  item: {
    width: '30%',
    marginHorizontal: 5,
    display: "flex",
    alignItems: "center",
  },
  loadingLogo: {
    width: 80,
    height: 80,
    marginTop: 30,
    marginBottom: 30,
  },
});

export default KpiReport;
