import React from "react";
import { WebView } from "react-native-webview";
import { View, Linking } from "react-native";
import { FAB } from "react-native-paper";

const WebScreen = () => {
  return (
    <>
      <WebView
        source={{
          uri: "http://innoquotas.life/",
        }}
      />
      <FAB.Group
        icon="star"
        actions={[{ icon: "plus", onPress: () => setModalOpen(!modalOpen) }]}
        onStateChange={() => Linking.openURL("http://innoquotas.life/")}
        label="teste"
      />
    </>
  );
};

export default WebScreen;
