import  AsyncStorage  from '@react-native-async-storage/async-storage';
import  deletePerf  from '../Components/Requests/deleteRequest';
import  addPerfRequest  from '../Components/Requests/addPerfRequest';
import  updateRequest  from '../Components/Requests/updateRequest';

export const getData = async (key ,ItemRequest,setData= null,isMounted) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if(value !== null) {
        if(isMounted)  ItemRequest(value,setData);
      }
    } catch(e) {
      console.error('une erreur est survenue pour la recupération des données de l\'utilisateur');
    }
  }

  export const storeData = async (key,value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  }

  
export const getTokenDeletePerf = async (key,idPerf, data, setData,setModalVisible) => {
  const checkObject = data.map((perf) => perf.hasOwnProperty('cardId'));
  const perfDeleted = data.slice(0, data.length - 1);;
  

  if (checkObject.includes(true)) {
    setModalVisible(false);
  }else{

    try {
      const value = await AsyncStorage.getItem(key);
      if(value !== null) {
        deletePerf(value,idPerf);
        setModalVisible(false);
        setData(perfDeleted);
      }
    } 
    catch(e) {
        console.error(e);
        console.error('une erreur est survenue pour la suppression d\'une perf');
    }
  }
}

export const getTokenAddPerf = async (key, name, firstCharge, secondCharge,setPerfAdd,setCheckAdd,fetchAllData) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const id = await AsyncStorage.getItem('USER');
    if(value !== null) {
      addPerfRequest(value,name, firstCharge, secondCharge, id, fetchAllData);
      setPerfAdd(true);
      setCheckAdd('Modifier');
      setTimeout(()=>setPerfAdd(false), 3000);
    }
  } catch(e) {
    console.error(e);
    console.error('une erreur est survenue pour la l\'ajout d\'une perf');
  }
}

export const getTokenUpdate = async (key, name, firstCharge, secondCharge,idPerf,setPerfmodified) => {
  try {
    const value = await AsyncStorage.getItem(key);
    const id = await AsyncStorage.getItem('USER');
    if(value !== null) {
      updateRequest(value,name, firstCharge, secondCharge, id, idPerf);
      setPerfmodified(true);
      setTimeout(()=>setPerfmodified(false), 3000);
    }
  } catch(e) {
    console.error(e);
    console.error('une erreur est survenue pour l\'update d\'une perf');
  }
}