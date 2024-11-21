import React from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { styles } from "./styles";

const placarData = [
  { nick: "ARC", score: "10000\nSpacecoins" },
  { nick: "WLT", score: "9000\nSpacecoins" },
  { nick: "XYZ", score: "8000\nSpacecoins" },
  { nick: "ABC", score: "7500\nSpacecoins" },
  { nick: "DEF", score: "7000\nSpacecoins" },
  { nick: "GHI", score: "6500\nSpacecoins" },
  { nick: "JKL", score: "6000\nSpacecoins" },
  { nick: "MNO", score: "5500\nSpacecoins" },
  { nick: "PQR", score: "5000\nSpacecoins" },
  { nick: "STU", score: "4500\nSpacecoins" },
];

interface ColocacaoItemProps {
  position: number;
  initials: string;
  score: string;
}

const ColocacaoItem: React.FC<ColocacaoItemProps> = ({
  position,
  initials,
  score,
}) => (
  <View style={styles.rankingContainer}>
    <Text style={styles.posicao}>{`${position}.`}</Text>
    <Text style={styles.iniciais}>{initials}</Text>
    <Text style={styles.pontos}>…….........…</Text>
    <Text style={styles.scoreTexto}>{score.toLocaleString()}</Text>
  </View>
);

export const Colocacao: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.player}>PLAYER</Text>
        <Text style={styles.scoreHeader}>SCORE</Text>
      </View>

      <FlatList
        data={placarData}
        keyExtractor={(item, index) => `${item.nick}-${index}`}
        renderItem={({ item, index }) => (
          <ColocacaoItem
            position={index + 1}
            initials={item.nick}
            score={item.score}
          />
        )}
      />
    </SafeAreaView>
  );
};
