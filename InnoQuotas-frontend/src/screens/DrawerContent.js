import React from "react";
import * as SecureStore from "expo-secure-store";
import { View, StyleSheet, Alert } from "react-native";
import { Avatar, Title, Drawer } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as userAction from "../store/user_actions";

export function DrawerContent(props) {
  const email = useSelector((state) => state.users.email);

  const dispatch = useDispatch();

  const logout = async () => {
    Alert.alert(
      "Deseja mesmo sair?",
      "",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Sim", onPress: () => dispatch(userAction.logout()) },
      ],
      { cancelable: false }
    );

    await SecureStore.deleteItemAsync("credentials");
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: `https://api.adorable.io/avatars/50/${email}`,
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: "column" }}>
                <Title style={styles.title}>{email}</Title>
              </View>
            </View>
          </View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="home" color={color} size={size} />
              )}
              label="Início"
              onPress={() => {
                props.navigation.navigate("Orçamentos");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons
                  name="account-balance"
                  color={color}
                  size={size}
                />
              )}
              label="Orçamentos"
              onPress={() => {
                props.navigation.navigate("Orçamentos");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="show-chart" color={color} size={size} />
              )}
              label="Gráficos"
              onPress={() => {
                props.navigation.navigate("Gráficos");
              }}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialIcons name="language" color={color} size={size} />
              )}
              label="Blog"
              onPress={() => {
                props.navigation.navigate("Blog");
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <MaterialIcons name="exit-to-app" color={color} size={size} />
          )}
          label="Sair"
          onPress={logout}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },

  drawerSection: {
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
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
    margin: 2,
    borderWidth: 1,
  },
});
