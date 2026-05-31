import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { useAdventureLogStore } from '@/redux/slices/AdventureLogSlice';

import { formatFullDate } from './helper';
import { styles } from './styles';

export default function AdventureDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top, bottom } = useSafeAreaInsets();
  const log = useAdventureLogStore((s) => s.logs.find((l) => l.id === id));

  if (!log) return null;

  return (
    <View className="flex-1 bg-woo-principal">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: top + 16, paddingBottom: bottom + 40 }}>
        <ScreenHeader />

        <Text className="text-woo-light-gray text-sm mb-6 capitalize">
          {formatFullDate(log.date)}
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Aventura</Text>
          <Text style={styles.body}>{log.challengeText}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>O que você achou?</Text>
          {log.notes ? (
            <Text style={styles.body}>{log.notes}</Text>
          ) : (
            <Text style={styles.emptyNotes}>Nenhum comentário registrado.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Sua nota</Text>
          <Text style={{ fontSize: 28 }}>{'⭐'.repeat(log.rating) || '—'}</Text>
        </View>
      </ScrollView>
    </View>
  );
}
