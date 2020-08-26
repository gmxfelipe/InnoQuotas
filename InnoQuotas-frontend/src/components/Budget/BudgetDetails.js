import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Button,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as userAction from "../../store/user_actions";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { Formik } from "formik";
import { MyForm, MyInput } from "../../components/utils/MyFormik";
import moment from "moment";

const BudgetDetails = (props) => {
  const { budgets } = props.route.params;
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.userId);
  const validationSchema = Yup.object().shape({});
  const email = useSelector((state) => state.users.email);

  const editItem = (values) => {
    const date = moment().format("DD/MM/YYYY");
    const budgetId = budgets.id;
    const {
      mpTotal,
      mpDescricao,
      svTotal,
      svDescricao,
      email,
      data = date,
    } = values;

    const infoBudgets = {
      mpTotal,
      mpDescricao,
      svTotal,
      svDescricao,
      data,
      email,
    };
    dispatch(userAction.editBudgets(budgetId, infoBudgets, userId));
    setModalOpen(false);
    props.navigation.navigate("Orçamentos");
  };

  const deleteItem = () => {
    const budgetId = budgets.id;
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
              userAction.deleteBudget(budgetId, userId),
              props.navigation.navigate("Orçamentos")
            ),
        },
      ],
      { cancelable: false }
    );
  };

  const MyModal = () => (
    <View style={styles.centeredView}>
      <Modal visible={modalOpen} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <Formik
            onSubmit={(values) => editItem(values)}
            initialValues={{
              mpTotal: "",
              mpDescricao: "",
              svTotal: "",
              svDescricao: "",
              email: email,
            }}
            validationSchema={validationSchema}
          >
            {(props) => {
              return (
                <MyForm>
                  <View style={styles.inputText}>
                    <MyInput
                      label="Descrição do material"
                      name="mpDescricao"
                      type="text"
                    />
                  </View>
                  <View style={styles.inputText}>
                    <MyInput
                      label="Valor total do material"
                      name="mpTotal"
                      type="text"
                    />
                  </View>
                  <View style={styles.inputText}>
                    <MyInput
                      label="Descrição do serviço prestado"
                      name="svDescricao"
                      type="text"
                    />
                  </View>
                  <View style={styles.inputText}>
                    <MyInput
                      label="Valor total do serviço prestado"
                      name="svTotal"
                      type="text"
                    />
                  </View>
                  <View style={styles.modalButton}>
                    <Button onPress={props.handleSubmit} title="enviar" />
                  </View>
                  <View style={styles.modalButton}>
                    <Button
                      color="orange"
                      title="fechar"
                      onPress={() => setModalOpen(!modalOpen)}
                    />
                  </View>
                </MyForm>
              );
            }}
          </Formik>
        </View>
      </Modal>
    </View>
  );

  return (
    <ScrollView style={styles.BudgetDetails}>
      <MyModal />
      <View>
        <View style={styles.budgetsContainer}>
          <Text style={styles.budgetsTitle}>Data de emissão </Text>
          <Text style={styles.budgetsDescription}>{budgets.data}</Text>
        </View>
        <View style={styles.budgetsContainer}>
          <Text style={styles.budgetsTitle}>Contato do emissor </Text>
          <Text style={styles.budgetsDescription}>{budgets.email}</Text>
        </View>

        <View style={styles.budgetsContainer}>
          <Text style={styles.budgetsTitle}>Descrição do material </Text>
          <Text style={styles.budgetsDescription}>{budgets.mpDescricao}</Text>
        </View>
        <View style={styles.budgetsContainer}>
          <Text style={styles.budgetsTitle}>Valor total do material </Text>
          <Text style={styles.budgetsDescription}>R$ {budgets.mpTotal}</Text>
        </View>
        <View style={styles.budgetsContainer}>
          <Text style={styles.budgetsTitle}>
            Descrição do serviço prestado{" "}
          </Text>
          <Text style={styles.budgetsDescription}>{budgets.svDescricao}</Text>
        </View>
        <View style={styles.budgetsContainer}>
          <Text style={styles.budgetsTitle}>
            Valor total do serviço prestado{" "}
          </Text>
          <Text style={styles.budgetsDescription}>R$ {budgets.svTotal}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
              <MaterialIcons name="edit" size={50} color="#00bfff" />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={deleteItem}>
              <MaterialIcons name="delete" size={50} color="#ff4040" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BudgetDetails;

const styles = StyleSheet.create({
  BudgetDetails: {
    flex: 1,
  },
  budgetsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 0.5,
  },
  budgetsTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  budgetsDescription: {
    fontSize: 20,
  },
  buttons: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  button: {
    marginTop: 50,
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
