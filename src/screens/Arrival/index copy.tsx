import { useNavigation, useRoute } from "@react-navigation/native";
import { X } from "phosphor-react-native";
import { Alert } from "react-native";

import {
  Container,
  Content,
  Description,
  Footer,
  Label,
  LicensePlate,
} from "./styles";

import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonIcon } from "../../components/ButtonIcon";

import { BSON } from "realm";
import { useObject, useRealm } from "../../libs/realm";
import { Historic } from "../../libs/realm/schemas/Historic";

type RouteParamsProps = {
  id: string;
};

export function Arrival() {
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const historic = useObject(Historic, new BSON.UUID(id) as unknown as string);
  const realm = useRealm();
  const { goBack } = useNavigation();

  function handleRemoveVehicleUse() {
    Alert.alert("Cancelar", "Cancelar a utilização do veículo?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => removeVehicleUsage() },
    ]);
  }

  function removeVehicleUsage() {
    try {
      console.log("---------------------aaaaaaaaaaaa---------------------");
      realm.write(() => {
        realm.delete(historic);
      });
      console.log(
        "---------------------bbbbbbbbbbbbbbbbb---------------------"
      );
      //goBack();
    } catch (error) {
      Alert.alert("Remover", "Não foi possível remover o veículo em uso!");
      console.log(error);
    }
    //goBack();
  }
  console.log("---------------------ccccccccccccc---------------------");
  if (!historic) {
    return (
      <Container>
        <Label>Placa do veículo</Label>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Chegada" />
      <Content>
        <Label>Placa do veículo</Label>

        <LicensePlate>{historic?.license_plate}</LicensePlate>

        <Label>Finalidade</Label>
        <Description>{historic?.description}</Description>

        <Footer>
          <ButtonIcon icon={X} onPress={handleRemoveVehicleUse} />
          <Button title="Registrar Chegada" />
        </Footer>
      </Content>
    </Container>
  );
}
