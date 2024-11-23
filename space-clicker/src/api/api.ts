import axios from "axios";

const apiScoreboard = axios.create({
    baseURL: 'https://67413788d0b59228b7f28905.mockapi.io/leaderboard/'
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

export const buscaPlacarOrdenado = async (): Promise<Leaderboard[]> => {
    try {
        const response = await apiScoreboard.get(url);

        const dadosOrdenados = response.data
            .map((item: { id: string; nome: string; pontuacao: string }): Leaderboard => ({
                id: item.id,
                nome: item.nome,
                pontuacao: parseFloat(item.pontuacao), // Converte para número
            }))
            .sort((a: Leaderboard, b: Leaderboard) => b.pontuacao - a.pontuacao); // Ordena em ordem decrescente

        return dadosOrdenados;
    } catch (error) {
        console.error("Erro ao buscar e ordenar placar:", error);
        return [];
    }
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
