import { useState } from "react";
import { api } from "../service/api";
import { Heading, useToast, VStack } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { useNavigation } from "@react-navigation/native";

export function Find() {
    const { navigate } = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");

    const toast = useToast();

    async function handleJoinPool() {
        try {
            setIsLoading(true);

            if (!code.trim()) {
                toast.show({
                    title: "Informe o código do bolão.",
                    placement: "top",
                    duration: 3000,
                    bgColor: "red.500",
                });
            }

            await api.post("/pools/join", { code });

            toast.show({
                title: "Você entrou no bolão com sucesso!",
                placement: "top",
                duration: 3000,
                bgColor: "green.500",
            });

            setCode("");
            navigate('polls');

        } catch (error: any) {
            console.log(error);
            setIsLoading(false);

            if (error.response?.data?.message === "Pool not found") {
                return toast.show({
                    title: "Bolão não encontrado",
                    description: error.response.data.message,
                    duration: 3000,
                    bgColor: "red.500",
                });
            }

            if (error.response?.data?.message === "Pool already joined") {
                return toast.show({
                    title: "Você já está participando desse bolão",
                    description: error.response.data.message,
                    duration: 3000,
                    bgColor: "red.500",
                });
            }

            toast.show({
                title: "Erro ao buscar bolão",
                description:
                    "Ocorreu um erro ao buscar o bolão, tente novamente",
                duration: 3000,
                bgColor: "red.500",
            });
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading
                    fontFamily="heading"
                    fontSize="xl"
                    color="white"
                    mb={8}
                    textAlign="center"
                >
                    Encontre um bolão através do {"\n"}
                    seu código único
                </Heading>

                <Input
                    placeholder="Qual o código do bolão?"
                    mt={2}
                    value={code}
                    onChangeText={setCode}
                    autoCapitalize="characters"
                />

                <Button
                    mt={8}
                    title="Buscar bolão"
                    isLoading={isLoading}
                    onPress={handleJoinPool}
                />
            </VStack>
        </VStack>
    );
}
