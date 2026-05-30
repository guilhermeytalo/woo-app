import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CHALLENGES, type Challenge } from './helper';
import { styles } from './styles';

import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'

function ChallengeCard({ item, onPress }: { item: Challenge; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.card}>
      <Text style={styles.cardText}>{item.text}</Text>
    </Pressable>
  );
}

export default function MicroAdventure() {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: top + 16, paddingBottom: bottom + 40 },
        ]}>

        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <SimpleLineIcons name="arrow-left" size={24} color="#E8735A" />
        </Pressable>

        <Image
          source={require('@/assets/logo.png')}
          style={styles.logo}
          contentFit="contain"
        />

        <Text style={styles.title}>{'Pronto para uma\nmicroaventura?'}</Text>

        <View style={styles.cardsList}>
          {CHALLENGES.map((item) => (
            <ChallengeCard
              key={item.id}
              item={item}
              onPress={() =>
                router.push({ pathname: '/adventure-log' as '/', params: { id: item.id } })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
