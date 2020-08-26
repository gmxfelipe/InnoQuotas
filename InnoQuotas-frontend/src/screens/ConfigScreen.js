import React, { useState } from "react";
import { StyleSheet, Text, View, CheckBox } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const ConfigScreen = () => {
  const [isSelected, setSelection] = useState(false);
  return (
    <ScrollView style={styles.ConfigScreen}>
      <View style={styles.checkboxs}>
        <View style={styles.checkbox}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <Text style={styles.checkboxTitle}>Ativar notificações</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <Text style={styles.checkboxTitle}>Fazer backup de dados</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <Text style={styles.checkboxTitle}>Restaurar backup</Text>
        </View>
        <View style={styles.checkbox}>
          <CheckBox value={isSelected} onValueChange={setSelection} />
          <Text style={styles.checkboxTitle}>Resetar configurações</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ConfigScreen;

const styles = StyleSheet.create({
  ConfigScreen: {
    flex: 1,
  },
  checkboxs: {
    justifyContent: "center",
    marginTop: 50,
    marginLeft: 50,
  },
  checkbox: {
    flexDirection: "row",
    paddingVertical: 15,
  },
  checkboxTitle: {
    fontSize: 20,
  },
});
