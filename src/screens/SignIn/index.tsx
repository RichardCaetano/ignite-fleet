import { Alert } from "react-native";
import { useState } from "react";

import { Container, Title, Slogan } from "./styles";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Realm, useApp } from "@realm/react";

import backgroundImg from "../../assets/background.png";
import { Button } from "../../components/Button";

import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export function SignIn() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const app = useApp();

  async function handleGoogleSignIn() {
    /*app.currentUser?.logOut();
    console.log("Google");
    return;*/
    try {
      setIsAuthenticating(true);
      const { idToken } = await GoogleSignin.signIn();

      if (idToken) {
        const credentials = Realm.Credentials.jwt(idToken);
        await app.logIn(credentials);
      } else {
        Alert.alert(
          "Entrar",
          "Não foi possivel conectar-se a sua conta Google!"
        );
        setIsAuthenticating(false);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Entrar", "Não foi possivel conectar-se a sua conta Google!");
      setIsAuthenticating(false);
    }
  }

  return (
    <Container source={backgroundImg}>
      <Title>Ignite Fleet</Title>
      <Slogan>Gestão de uso de veículos</Slogan>

      <Button
        title="Entre com o Google"
        isLoading={isAuthenticating}
        onPress={handleGoogleSignIn}
      />
    </Container>
  );
}
