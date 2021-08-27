import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

const ModalScreen = ( { modalVisible, setModalVisible, deletePerf } ) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Icon name="arrow-left" color="black" size={20} onPress={() => setModalVisible(!modalVisible)}/>
            <Text style={styles.modalText}>Voulez vous vraiment supprimer cette perf ?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={deletePerf}
            >
              <Text style={styles.textStyle}>Confirmer!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center"
  }
});

export default ModalScreen;