import React, { useState, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  AdMobInterstitial,
} from "expo-ads-admob";

import { Formik } from "formik";
import { MyForm, MyInput } from "../components/utils/MyFormik";
import * as Yup from "yup";
import * as userActions from "../store/user_actions";
import * as SecureStore from "expo-secure-store";

const LoginScreen = (props) => {
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Obrigatório *")
      .email("Coloque um endereço de email valido"),
    password: Yup.string()
      .required("Obrigatório *")
      .min(2, "Senha muito curta"),
  });

  const autoLogin = useCallback(async () => {
    let authInfo = await SecureStore.getItemAsync("credentials");
    authInfo = JSON.parse(authInfo);
    const { idToken, localId, expiryTime, email } = authInfo;
    const willExpireTime = new Date(expiryTime);
    if (willExpireTime.getTime() >= new Date().getTime()) {
      dispatch(userActions.autoLogin(idToken, localId, willExpireTime, email));
      await props.navigation.navigate("Home");
    }
  }, [dispatch]);

  const authenticateUser = async (values) => {
    const { email, password } = values;
    try {
      dispatch(userActions.authenticateUser(email, password, isSignUp));
    } catch (error) {}
  };

  useEffect(() => {
    const loadAd = async () => {
      await AdMobInterstitial.setAdUnitID(
        "ca-app-pub-9253505957578128/3722692476"
      );
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    };
    loadAd();
    autoLogin();
  }, [autoLogin]);

  return (
    <KeyboardAvoidingView style={styles.LoginScreen}>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logoOficial.png")}
            style={styles.logo}
          />
        </View>
        <View style={styles.form}>
          <Formik
            onSubmit={(values) => authenticateUser(values)}
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
          >
            {(props) => {
              return (
                <MyForm>
                  <MyInput label="E-mail" name="email" type="email" />
                  <MyInput label="Senha" name="password" type="password" />
                  <View style={styles.formButtons}>
                    <Button
                      onPress={props.handleSubmit}
                      title={isSignUp ? "Registrar-se" : "Entrar"}
                    />
                  </View>
                  <View style={styles.formButtons}>
                    <Button
                      onPress={() => setisSignUp((state) => !state)}
                      title={isSignUp ? "Voltar" : "Registrar-se"}
                      color="orange"
                    />
                  </View>
                </MyForm>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  LoginScreen: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
  logo: {
    width: 250,
    height: 250,
  },
  form: {
    margin: 20,
  },
  formButtons: {
    marginTop: 10,
    borderWidth: 1,
  },
});
