import axios from "axios";

const apiScoreboard = axios.create({
    baseURL: 'http://localhost:3000/'
});

export interface Leaderboard {
    id: string;
    nome: string;
    pontuacao: number;
}

const generateId = (): string => {
    return `id-${Date.now()}`
};

export const buscaPlacar = async () => {
    const url = 'leaderboard/';
    return apiScoreboard.get(url);
};

export const registraPontos = (nome: string, pontuacao: number) => {
    const url = 'leaderboard/';

    const leaderboard: Leaderboard = {
        id: generateId(),
            nome,
            pontuacao
};

return apiScoreboard.post(url, leaderboard)
}
