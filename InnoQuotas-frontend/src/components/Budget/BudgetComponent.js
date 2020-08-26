import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import MyCard from "../utils/MyCard";

const BudgetComponent = (props) => {
  const handleNavigate = () => {
    props.navigation.navigate("Orçamento", {
      budgets: props.budgets,
    });
  };

  return (
    <TouchableOpacity onPress={handleNavigate} style={styles.BudgetComponent}>
      <MyCard>
        <View>
          <View style={styles.budgetsContainer}>
            <Text style={styles.budgetsTitle}>Data de emissão </Text>
            <Text style={styles.budgetsDescription}>{props.budgets.data}</Text>
          </View>
          <View style={styles.budgetsContainer}>
            <Text style={styles.budgetsTitle}>Contato do emissor </Text>
            <Text style={styles.budgetsDescription}>{props.budgets.email}</Text>
          </View>

          <View style={styles.budgetsContainer}>
            <Text style={styles.budgetsTitle}>Descrição do material </Text>
            <Text style={styles.budgetsDescription}>
              {props.budgets.mpDescricao}
            </Text>
          </View>
          <View style={styles.budgetsContainer}>
            <Text style={styles.budgetsTitle}>Valor total do material </Text>
            <Text style={styles.budgetsDescription}>
              R$ {props.budgets.mpTotal}
            </Text>
          </View>
          <View style={styles.budgetsContainer}>
            <Text style={styles.budgetsTitle}>
              Descrição do serviço prestado{" "}
            </Text>
            <Text style={styles.budgetsDescription}>
              {props.budgets.svDescricao}
            </Text>
          </View>
          <View style={styles.budgetsContainer}>
            <Text style={styles.budgetsTitle}>
              Valor total do serviço prestado{" "}
            </Text>
            <Text style={styles.budgetsDescription}>
              R$ {props.budgets.svTotal}
            </Text>
          </View>
        </View>
      </MyCard>
    </TouchableOpacity>
  );
};

export default BudgetComponent;

const styles = StyleSheet.create({
  BudgetComponent: {
    flex: 1,
  },
  budgetsContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: 10,
    borderBottomWidth: 0.5,
  },
  budgetsTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  budgetsDescription: {
    fontSize: 15,
  },
});
