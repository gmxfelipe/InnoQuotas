import "react-native-gesture-handler";

// REACT NATIVE
import React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// NAVIGATORS
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// SCREENS
import LoginScreen from "./src/screens/LoginScreen";
import BudgetScreen from "./src/screens/BudgetScreen";
import GraphicScreen from "./src/screens/GraphicScreen";
import GraphicDetails from "./src/components/Graphic/GraphicDetails";
import BudgetDetails from "./src/components/Budget/BudgetDetails";
import WebScreen from "./src/screens/WebScreen";
import { DrawerContent } from "./src/screens/DrawerContent";

// STACK, DRAWER & TABS
const BudgetStack = createStackNavigator();
const GraphicStack = createStackNavigator();
const AuthStack = createStackNavigator();
const WebStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tabs = createBottomTabNavigator();

const defaultListNavigatorOptions = (props) => {
  const email = useSelector((state) => state.users.email);

  return {
    headerLeft: () => {
      return (
        <TouchableOpacity
          onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Avatar.Image
            source={{
              uri: `https://api.adorable.io/avatars/50/${email}`,
            }}
            size={40}
            style={{ marginLeft: 15 }}
          />
        </TouchableOpacity>
      );
    },
  };
};

const defaultNavigatorOptions = () => {
  return {
    headerStyle: {
      backgroundColor: "orange",
    },
  };
};

const MyBudgetStack = () => {
  return (
    <BudgetStack.Navigator screenOptions={defaultNavigatorOptions}>
      <BudgetStack.Screen
        name="Orçamentos"
        component={BudgetScreen}
        options={defaultListNavigatorOptions}
      />
      <BudgetStack.Screen name="Orçamento" component={BudgetDetails} />
    </BudgetStack.Navigator>
  );
};

const MyGraphicStack = () => {
  return (
    <GraphicStack.Navigator screenOptions={defaultNavigatorOptions}>
      <GraphicStack.Screen
        name="Gráficos"
        component={GraphicScreen}
        options={defaultListNavigatorOptions}
      />
      <GraphicStack.Screen name="Gráfico" component={GraphicDetails} />
    </GraphicStack.Navigator>
  );
};

const MyWebStack = () => {
  return (
    <WebStack.Navigator screenOptions={defaultNavigatorOptions}>
      <WebStack.Screen
        name="Blog"
        component={WebScreen}
        options={defaultListNavigatorOptions}
      />
    </WebStack.Navigator>
  );
};

const MyAuthStack = () => {
  return (
    <AuthStack.Navigator screenOptions={defaultNavigatorOptions}>
      <AuthStack.Screen name="Entrar" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

const MyHomeTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Orçamentos") {
            iconName = "account-balance";
          } else if (route.name === "Gráficos") {
            iconName = "show-chart";
          } else if (route.name === "Perfil") {
            iconName = "account-circle";
          } else if (route.name === "Configurações") {
            iconName = "settings";
          } else if (route.name === "Blog") {
            iconName = "language";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "orange",
        inactiveTintColor: "gray",
      }}
    >
      <Tabs.Screen name="Orçamentos" component={MyBudgetStack} />
      <Tabs.Screen name="Gráficos" component={MyGraphicStack} />
      <Tabs.Screen name="Blog" component={MyWebStack} />
    </Tabs.Navigator>
  );
};

const Main = () => {
  const token = useSelector((state) => state.users.token);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => (token ? <DrawerContent {...props} /> : null)}
        drawerStyle={{ opacity: token ? 1 : 0 }}
      >
        {token ? (
          <Drawer.Screen name="Home" component={MyHomeTabs} />
        ) : (
          <Drawer.Screen name="Auth" component={MyAuthStack} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Main;

{
  /*
        options={{
          headerTitle: "Configurações",
          headerLeft: () => (
            <Image
              source={require("./assets/logo.png")}
              style={{ width: 40, height: 40, marginLeft: 15 }}
            />
          ),
        }}

*/
}
