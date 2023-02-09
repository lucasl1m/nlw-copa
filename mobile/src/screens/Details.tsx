import { useEffect, useState } from "react";
import { Share } from "react-native";

import { HStack, useToast, VStack } from "native-base";
import { useRoute } from "@react-navigation/native";

import { api } from "../service/api";

import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { PoolCardProps } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Guesses } from "../components/Guesses";

interface RouteParams {
    id: string;
}

export function Details() {
    const route = useRoute();
    const toast = useToast();

    const { id } = route.params as RouteParams;

    const [optionSelected, setOptionSelected] = useState<"Guesses" | "Ranking">("Guesses");
    const [isLoading, setIsLoading] = useState(true);
    const [pollDetails, setPollDetails] = useState<PoolCardProps>(
        {} as PoolCardProps
    );

    async function handleCodeShare() {
        await Share.share({
            message: pollDetails.code,
        });
    }

    async function fetchPollsDetails() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${id}`);
            setPollDetails(response.data.pool);
        } catch (error) {
            console.log(error);

            toast.show({
                title: "Não foi possível carregar os detalhes bolões.",
                placement: "top",
                duration: 3000,
                bgColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchPollsDetails();
    }, [id]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={pollDetails.title} showBackButton showShareButton onShare={handleCodeShare}/>

            {pollDetails._count?.participants > 0 ? (
                <VStack px={5} flex={1}>
                    <PoolHeader data={pollDetails} />

                    <HStack bgColor={"gray.800"} mb={5} p={1} rounded="sm">
                        <Option title="Seus palpites" isSelected={optionSelected === 'Guesses'} onPress={() => setOptionSelected('Guesses')}/>
                        <Option title="Ranking do grupo" isSelected={optionSelected === 'Ranking'} onPress={() => setOptionSelected('Ranking')} />
                    </HStack>

                    <Guesses poolId={pollDetails.id} />
                </VStack>
            ) : (
                <EmptyMyPoolList code={pollDetails.code} />
            )}
        </VStack>
    );
}
