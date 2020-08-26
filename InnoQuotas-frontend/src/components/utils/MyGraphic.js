import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const MyGraphic = (props) => {
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 2,
  };

  const data = {
    labels: ["Valor do material", "Valor do serviço", "Preço total"],
    datasets: [
      {
        data: [props.mpTotal, props.svTotal, props.mpTotal + props.svTotal],
      },
    ],
  };

  return (
    <View>
      <BarChart
        data={data}
        width={screenWidth}
        height={250}
        fromZero={true}
        chartConfig={chartConfig}
      />
    </View>
  );
};

export default MyGraphic;

const styles = StyleSheet.create({});
