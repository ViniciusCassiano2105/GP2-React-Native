import axios from "axios";

const apiScoreboard = axios.create({
    baseURL: 'http://localhost:3000/'
});

export interface Leaderboard {
    id: string;
    nome: string;
    pontuacao: number;
}

const url = 'leaderboard/';

const generateId = (): string => {
    return `id-${Date.now()}`
};

export const buscaPlacar = async () => {
    return apiScoreboard.get(url);
};

export const registraPontos = async (nome: string, pontuacao: number) => {
    const leaderboard: Leaderboard = {
        id: generateId(),
        nome: nome,
        pontuacao: pontuacao
    };
    try {
        await apiScoreboard.post(url, leaderboard)
        console.log("postei isso na api heim")
    } catch (error) {
        console.error("deu ruim na api", error)
    }


}
