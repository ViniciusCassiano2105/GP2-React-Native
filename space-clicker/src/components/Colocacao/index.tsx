import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { styles } from "./styles";
import { buscaPlacar, buscaPlacarOrdenado, Leaderboard } from "../../api/api";
import { useMyContext } from "../../context/General/MyContext";


interface ColocacaoItemProps {
  position: number;
  initials: string;
  score: number;
}


const ColocacaoItem: React.FC<ColocacaoItemProps> = ({
  position,
  initials,
  score,
}) => (
  <View style={styles.rankingContainer}>
    <Text style={styles.posicao}>{`${position}.`}</Text>
    <Text style={styles.iniciais}>{initials}</Text>
    <Text style={styles.pontos}>……......…</Text>
    <Text style={styles.scoreTexto}>{score.toLocaleString()}</Text>
  </View>
);

export const Colocacao: React.FC = () => {
  const [placar, setPlacar] = useState<Leaderboard[]>([])
  const { isModalVisible } = useMyContext()
  useEffect(() => {
    const handlePlacar = async () => {
      const rep = await buscaPlacarOrdenado()
      setPlacar(rep)
    }
    handlePlacar()
  }, [isModalVisible])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.player}>PLAYER</Text>
        <Text style={styles.scoreHeader}>SCORE</Text>
      </View>

      <FlatList
        data={placar}
        keyExtractor={(item, index) => `${item.nome}-${index}`}
        renderItem={({ item, index }) => (
          <ColocacaoItem
            position={index + 1}
            initials={item.nome}
            score={item.pontuacao}
          />
        )}
      />
    </SafeAreaView>
  );
};
