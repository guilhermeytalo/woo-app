import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { pickRandom, type Quest } from '@/utils/quests';

import { styles } from './styles';

function ChallengeCard({ item, onPress }: { item: Quest; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.cardText}>{item.text}</Text>
    </Pressable>
  );
}

export default function MicroAdventure() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  // Pick 4 random quests once per screen mount
  const quests = useMemo(() => pickRandom(4), []);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: top + 16, paddingBottom: bottom + 40 },
        ]}>
        <ScreenHeader />

        <Text style={styles.title}>{'Pronto para uma\nmicroaventura?'}</Text>

        <View style={styles.cardsList}>
          {quests.map((item) => (
            <ChallengeCard
              key={item.id}
              item={item}
              onPress={() =>
                router.push({
                  pathname: '/adventure-log' as '/',
                  params: { id: item.id, text: item.text, category: item.category },
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
