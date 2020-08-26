import React, { useEffect, useCallback, useState } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import GraphicComponent from "../components/Graphic/GraphicComponent";
import * as userAction from "../store/user_actions";
import { useFocusEffect } from "@react-navigation/native";

const GraphicScreen = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const graphics = useSelector((state) => state.users.infoGraphics);
  const userId = useSelector((state) => state.users.userId);

  const loadPage = useCallback(async () => {
    setLoading(true);
    await dispatch(userAction.loadGraphics(userId));
    setLoading(false);
  }, [dispatch, userId]);

  useFocusEffect(
    useCallback(() => {
      loadPage();
    }, [loadPage])
  );

  return (
    <View style={styles.GraphicScreen}>
      {loading ? (
        <View style={styles.GraphicScreen}>
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      ) : (
        <View>
          <FlatList
            data={graphics}
            renderItem={({ item }) => (
              <GraphicComponent graphics={item} navigation={props.navigation} />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default GraphicScreen;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1 },
  GraphicScreen: {
    flex: 1,
  },
});
