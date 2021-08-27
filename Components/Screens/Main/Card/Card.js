import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, VirtualizedList, StyleSheet, Text, StatusBar,TextInput, Button,Pressable } from 'react-native';
import { getData, getTokenDeletePerf, getTokenAddPerf, getTokenUpdate } from '../../../../Utils/storage';
import  itemUserRequest  from '../../../Requests/itemUserRequest';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalScreen from '../../Modal/Modal';


const Item = ({ name, firstCharge, secondCharge, idPerf, data, setData, fetchAllData}) => {
  const [chargeName, setChargeName] = useState(name ? name : 'Nom de l\'exercice');
  const [newperf, setNewPerf] = useState(firstCharge ? firstCharge : 0);
  const [oldPerf, setOldPerf] = useState(secondCharge ? secondCharge : 0);
  const [calcInput, setCalcInput] = useState('');
  const [resultCalc, setResultCalc] = useState(0);
  const [checkAdd, setCheckAdd] = useState('Ajouter');
  const [errorMessage, setErrorMessage] = useState(' ');
  const [perfModified, setPerfmodified] = useState(false);
  const [perfAdd, setPerfAdd] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const currentPerfId = data.map((perf) => perf.id);


  const validatePerf = () => {
    getTokenAddPerf('TOKEN',chargeName,newperf,oldPerf,setPerfAdd,setCheckAdd,fetchAllData,setErrorMessage);
  };

  const updatePerf = () => {
    getTokenUpdate('TOKEN',chargeName,newperf,oldPerf,idPerf,setPerfmodified);
  };

  const deletePerf = () => {
    getTokenDeletePerf('TOKEN',idPerf,data,setData,setModalVisible)
  };

  const onPressFunction = () => {
    const calculPourcentage = newperf * calcInput / 100;
    setResultCalc(calculPourcentage);
  };

  return(
    <>
    <View style={styles.item} >
      <View>
        <TextInput
        style={styles.name} value={chargeName} onChangeText={setChargeName} />
        <View style={styles.button}>
          <Button color="#ff5c5c" title="Supprimer" onPress={() => setModalVisible(true)} disabled={!currentPerfId.includes(idPerf)}/>
        </View>
      </View>
      <View style={styles.containerCard}>
        <View style={styles.containerInput}>
        <Text style={styles.textCenter}>Ancienne Perf</Text>
          <TextInput
            style={styles.input}
            value={oldPerf.toString()}
            keyboardType="numeric"
            onChangeText={setOldPerf}
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.textCenter}>Nouvelle Perf</Text>
          <TextInput
            style={styles.input}
            value={newperf.toString()}
            keyboardType="numeric"
            onChangeText={setNewPerf}
          />
        </View>
        
        <View style={styles.calcContainer}>
          {perfModified && <Icon name="check" color="green" />}
          {perfAdd && <Icon name="check" color="green" />}
          {errorMessage && <Text style={{color:'red',marginBottom:5}}>{chargeName === 'Nom de l\'exercice'? 'Veuillez entrer le nom de l\'exercice': ' '}</Text>}
          <Button
            title={currentPerfId.includes(idPerf)  ?  'Modifier' : checkAdd}
            onPress={currentPerfId.includes(idPerf)  ? updatePerf : validatePerf}
            disabled={chargeName === 'Nom de l\'exercice'}
          />
          <View style={styles.calcContainerInput}>
            <TextInput
              value={calcInput}
              keyboardType="numeric"
              style={{marginRight:5,textAlign:'center'}}
              placeholder='pourcentage %'
              onChangeText={setCalcInput}
            />
            <Pressable onPress={onPressFunction} style={styles.calcButton}>
              <Text style={{color:'white', textAlign:'center'}}>Calculer</Text>
            </Pressable>
            <View style={{margin:10}}>
              <Text style={{color:'red'}}>{resultCalc === 0 ? '' : resultCalc + ' KG' }</Text>
            </View>
          </View>
        </View>
        <Text style={{fontSize:10, textAlign:'center'}}>Calculer le pourcentage avec votre meilleur perf !</Text>
      </View>
    </View>
    <ModalScreen deletePerf={deletePerf} modalVisible={modalVisible} setModalVisible={setModalVisible} />
  </>
);}

const Card = () => {
  const [DATA, setData] = useState([]);
  const [fetchData, setFetchData] = useState(0);
  
  useEffect(() => {
    let isMounted = true;
      getData('TOKEN',itemUserRequest,setData,isMounted);
    console.log('je passe part le useEffect');
    return () => { isMounted = false };
  },[]);
  

  const addPerf = () => {
    const newPerf = {
      id: null,
      cardId: null,
      name: '',
      first_weight: '',
      second_weight: '',
    };

    setData([...DATA,newPerf]);
  };

  const fetchAllData = () => {
    getData('TOKEN',itemUserRequest,setData);
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.textCenter}>New Perf</Text>
        <Icon name="plus" color="green" onPress={addPerf} size={20} />
      </View>
      <View>
        {DATA.length > 0 && <VirtualizedList
        data={DATA}
        initialNumToRender={5}
        renderItem={({ item }) => <Item fetchAllData={fetchAllData} name={item.name} data={DATA} setData={setData} idPerf={item.cardId} firstCharge={item.firstCharge} secondCharge={item.secondCharge}/>}
        keyExtractor={item => item.id}
        getItemCount={(data) => data.length}
        getItem={(data,index) => {
          const item = data[index];
          const test =  {
            id: index.toString(),
            cardId: item.id ?  Number(item.id) : 0 ,
            name: item.name,
            firstCharge: item.first_weight,
            secondCharge:item.second_weight,
          }
          return test;
        }}
        />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerCard: {
    flex: 1,
    height: '100%',
    width: '100%',
    marginTop: StatusBar.currentHeight,
    backgroundColor: 'white',
    padding: 5,
  },
  item: {
    backgroundColor: '#486FE0',
    marginBottom: StatusBar.currentHeight,
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 20,
    borderRadius:20,
  },
  name: {
    textAlign:'center',
    color: 'white',
    fontSize: 30,
  },
  input: {
    marginHorizontal: 10,
    backgroundColor: '#486FE0',
    borderColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth:2,
    textAlign: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  containerInput: {
    flex: 1,
    margin: 5,
    width: '100%',
    justifyContent: 'space-between',
  },
  textCenter: {
    margin: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    margin: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcContainer: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcContainerInput: {
    flex: 1,
    width:'100%',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calcButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding:5,
    
  }
});

export default Card;