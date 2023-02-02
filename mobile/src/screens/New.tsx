import { Heading, VStack, Text } from "native-base";
import { Header } from "../components/Header";

import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function New() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" showBackButton />

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

                <Input placeholder="Qual o nome do seu bolão?" mt={2} />

                <Button mt={8} title="Criar o meu bolão" />

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
