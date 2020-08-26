import React from "react";
import { StyleSheet, View } from "react-native";

const MyCard = (props) => {
  return <View style={styles.MyCard}>{props.children}</View>;
};

export default MyCard;

const styles = StyleSheet.create({
  MyCard: {
    elevation: 1,
    width: "100%",
    marginTop: 15,
    borderBottomWidth: 3,
  },
});
