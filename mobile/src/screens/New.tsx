import { useState } from "react";

import { Heading, VStack, Text, useToast } from "native-base";

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

import Logo from "../assets/logo.svg";

import { api } from "../service/api";

export function New() {
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    async function handlePollCreation() {
        if (!title.trim()) {
            toast.show({
                title: "Informe o nome do bolão.",
                placement: "top",
                duration: 3000,
                bgColor: "red.500",
            });
        }

        try {
            setIsLoading(true);

            await api.post("/pools", {
                title,
            });

            toast.show({
                title: "Bolão criado com sucesso!",
                placement: "top",
                duration: 3000,
                bgColor: "green.500",
            });

            setTitle("");

        } catch (error) {
            console.log(error);

            toast.show({
                title: "Não foi possível criar o bolão.",
                placement: "top",
                duration: 3000,
                bgColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" />

            <VStack mt={8} mx={5} alignItems="center">
                <Logo />

                <Heading
                    fontFamily="heading"
                    fontSize="xl"
                    color="white"
                    my={8}
                    textAlign="center"
                >
                    Crie seu próprio bolão da copa {"\n"}e compartilhe entre
                    amigos!
                </Heading>

                <Input
                    mt={2}
                    placeholder="Qual o nome do seu bolão?"
                    onChangeText={setTitle}
                    value={title}
                />

                <Button
                    mt={8}
                    title="Criar o meu bolão"
                    onPress={handlePollCreation}
                    isLoading={isLoading}
                />

                <Text
                    color="gray.200"
                    fontSize="sm"
                    textAlign="center"
                    mt={4}
                    px={10}
                >
                    Após criar seu bolão, você receberá um código único que
                    poderá usar para convidar outras pessoas.
                </Text>
            </VStack>
        </VStack>
    );
}
