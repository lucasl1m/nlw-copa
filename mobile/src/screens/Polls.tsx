import { VStack, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";

import { Octicons } from "@expo/vector-icons";

export function Polls() {
    const { navigate } = useNavigation();

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />
            <VStack
                mt={6}
                mx={5}
                borderBottomWidth={1}
                pb={4}
                mb={4}
                borderBottomColor="gray.600"
            >
                <Button
                    title="Buscar bolão por código"
                    leftIcon={
                        <Icon
                            as={Octicons}
                            name="search"
                            color="black"
                            size="md"
                        />
                    }
                    onPress={() => navigate("find")}
                />
            </VStack>
        </VStack>
    );
}
