import React, { useCallback, useState } from "react";
import {
  FlatList,
  View,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import * as Yup from "yup";
import * as userAction from "../store/user_actions";
import BudgetComponent from "../components/Budget/BudgetComponent";
import { Formik } from "formik";
import { MyForm, MyInput } from "../components/utils/MyFormik";
import { FAB } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

const BudgetScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const budgets = useSelector((state) => state.users.infoBudgets);
  const userId = useSelector((state) => state.users.userId);
  const validationSchema = Yup.object().shape({
    mpTotal: Yup.string().required("Obrigatório *").min(1, "Obrigatório *"),
    mpDescricao: Yup.string().required("Obrigatório *").min(1, "Obrigatório *"),
    svTotal: Yup.string().required("Obrigatório *").min(1, "Obrigatório *"),
    svDescricao: Yup.string().required("Obrigatório *").min(1, "Obrigatório *"),
  });
  const email = useSelector((state) => state.users.email);

  const addBudgets = (values) => {
    const date = moment().format("DD/MM/YYYY");
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
    dispatch(userAction.addBudgets(infoBudgets, userId));
    setModalOpen(false);
    loadPage();
  };

  const loadPage = useCallback(async () => {
    setLoading(true);
    await dispatch(userAction.loadBudgets(userId));
    setLoading(false);
  }, [dispatch, userId]);

  useFocusEffect(
    useCallback(() => {
      loadPage();
    }, [loadPage])
  );

  const MyModal = () => (
    <View style={styles.centeredView}>
      <Modal visible={modalOpen} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <Formik
            onSubmit={(values) => addBudgets(values)}
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
                  <View style={styles.buttons}>
                    <Button onPress={props.handleSubmit} title="enviar" />
                  </View>
                  <View style={styles.buttons}>
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
    <View style={styles.BudgetScreen}>
      {loading ? (
        <View style={styles.BudgetScreen}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      ) : (
        <View>
          <FlatList
            data={budgets}
            renderItem={({ item }) => (
              <BudgetComponent budgets={item} navigation={props.navigation} />
            )}
          />
        </View>
      )}
      <MyModal />
      <FAB.Group
        icon="plus"
        actions={[{ icon: "plus", onPress: () => setModalOpen(!modalOpen) }]}
        onStateChange={() => setModalOpen(!modalOpen)}
      />
    </View>
  );
};

export default BudgetScreen;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1 },
  BudgetScreen: {
    flex: 1,
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
  buttons: {
    marginTop: 5,
    borderWidth: 1,
  },
  inputText: {
    margin: 5,
  },
});
