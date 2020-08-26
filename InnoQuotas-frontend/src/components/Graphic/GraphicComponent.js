import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import MyCard from "../utils/MyCard";
import MyGraphic from "../utils/MyGraphic";

const GraphicComponent = (props) => {
  const handleNavigate = () => {
    props.navigation.navigate("Gráfico", {
      graphics: props.graphics,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigate}>
        <MyCard>
          <MyGraphic
            mpTotal={props.graphics.mpTotal}
            svTotal={props.graphics.svTotal}
          />
        </MyCard>
      </TouchableOpacity>
    </View>
  );
};

export default GraphicComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
