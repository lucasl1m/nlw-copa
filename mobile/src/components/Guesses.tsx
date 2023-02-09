import { Box, FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";

import { api } from "../service/api";
import { Game, GameProps } from "./Game";
import { Loading } from "./Loading";

interface Props {
    poolId: string;
}

export function Guesses({ poolId }: Props) {
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState<GameProps[]>([]);
    const [firstTeamPoints, setFirstTeamPoints] = useState("");
    const [secondTeamPoints, setSecondTeamPoints] = useState("");

    async function fetchGames() {
        try {
            setIsLoading(true);

            const response = await api.get(`/pools/${poolId}/games`);
            console.log(response.data.games);
            setGames(response.data.games);
        } catch (error) {
            console.log(error);

            toast.show({
                title: "Não foi possível carregar os palpites.",
                placement: "top",
                duration: 3000,
                bgColor: "red.500",
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handleGuessConfirm(gameId: string) {
        try {
            if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
                toast.show({
                    title: "Informe o placar do palpite.",
                    placement: "top",
                    duration: 3000,
                    bgColor: "red.500",
                });
            }

            await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
                firstTeamPoints: Number(firstTeamPoints),
                secondTeamPoints: Number(secondTeamPoints),
            });

            toast.show({
                title: "Palpite enviado com sucesso.",
                placement: "top",
                duration: 3000,
                bgColor: "green.500",
            });

            fetchGames();

        } catch (error) {
            console.log(error);

            toast.show({
                title: "Não foi possível enviar o palpite.",
                placement: "top",
                duration: 3000,
                bgColor: "red.500",
            });
        }
    }

    useEffect(() => {
        fetchGames();
    }, [poolId]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <FlatList
            data={games}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Game
                    data={item}
                    setFirstTeamPoints={setFirstTeamPoints}
                    setSecondTeamPoints={setSecondTeamPoints}
                    onGuessConfirm={() => {handleGuessConfirm(item.id)}}
                />
            )}
            _contentContainerStyle={{pb: 10}}
        ></FlatList>
    );
}
