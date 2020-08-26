import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import MyGraphic from "../utils/MyGraphic";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import * as userAction from "../../store/user_actions";

const GraphicDetails = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { graphics } = props.route.params;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.userId);

  const deleteItem = () => {
    const graphicId = graphics.id;
    Alert.alert(
      "Deseja mesmo deletar?",
      "",
      [
        {
          text: "Cancelar",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () =>
            dispatch(
              userAction.deleteBudget(graphicId, userId),
              props.navigation.navigate("Gráficos")
            ),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.row}>
      <View style={styles.MyGraphic}>
        <MyGraphic mpTotal={graphics.mpTotal} svTotal={graphics.svTotal} />
      </View>
      <View>
        <View style={styles.graphicsContainer}>
          <Text style={styles.graphicsTitle}>ID do gráfico </Text>
          <Text style={styles.graphicsDescription}>{graphics.id}</Text>
        </View>
        <View style={styles.graphicsContainer}>
          <Text style={styles.graphicsTitle}>Data de emissão </Text>
          <Text style={styles.graphicsDescription}>{graphics.data}</Text>
        </View>
        <View style={styles.graphicsContainer}>
          <Text style={styles.graphicsTitle}>Valor total do material </Text>
          <Text style={styles.graphicsDescription}>R$ {graphics.mpTotal}</Text>
        </View>
        <View style={styles.graphicsContainer}>
          <Text style={styles.graphicsTitle}>
            Valor total do serviço prestado
          </Text>
          <Text style={styles.graphicsDescription}>R$ {graphics.svTotal}</Text>
        </View>
        <View style={styles.graphicsContainer}>
          <Text style={styles.graphicsTitle}>Valor total </Text>
          <Text style={styles.graphicsDescription}>
            R$ {graphics.mpTotal + graphics.svTotal}
          </Text>
        </View>
      </View>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <TouchableOpacity onPress={deleteItem}>
            <MaterialIcons name="delete" size={50} color="#ff4040" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default GraphicDetails;

const styles = StyleSheet.create({
  MyGraphic: {
    elevation: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
  },

  graphicsContainer: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    padding: 10,
  },
  graphicsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  graphicsDescription: {
    fontSize: 20,
  },
  buttons: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  button: {
    marginTop: 10,
    padding: 5,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    margin: 20,
    marginTop: 100,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalButton: {
    marginTop: 5,
    borderWidth: 1,
  },
  inputText: {
    margin: 5,
  },
});
