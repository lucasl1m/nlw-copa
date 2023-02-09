import { VStack, Icon, useToast, FlatList } from "native-base";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { useCallback, useState } from "react";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { PoolCard, PoolCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";

import { Octicons } from "@expo/vector-icons";
import { api } from "../service/api";
import { EmptyPoolList } from "../components/EmptyPoolList";

export function Polls() {
    const { navigate } = useNavigation();
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(true);
    const [pools, setPools] = useState<PoolCardProps[]>([]);

    async function fetchPolls() {
        try {
            setIsLoading(true);
            const response = await api.get("/pools");
            setPools(response.data.pools);
        } catch (error) {
            console.log(error);

            toast.show({
                title: "Não foi possível buscar os bolões.",
                placement: "top",
                duration: 3000,
                bgColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPolls();
    }, []));

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

            {isLoading ? (
                <Loading />
            ) : (
                <FlatList
                    data={pools}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <PoolCard data={item} onPress={() => navigate('details', { id: item.id })}/>
                    )}
                    px={5}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10 }}
                    ListEmptyComponent={<EmptyPoolList />}
                />
            )}
        </VStack>
    );
}
