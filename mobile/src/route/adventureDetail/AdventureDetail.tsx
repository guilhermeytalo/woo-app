import { useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { useAdventureLogStore } from '@/store/slices/AdventureLogSlice';
import { type QuestCategory } from '@/utils/quests';

import { formatFullDate } from './helper';
import { chipLabel, chipStyle, styles } from './styles';

function CategoryChip({ category }: { category: QuestCategory }) {
  const { bg, text } = chipStyle(category);
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Text style={[styles.chipText, { color: text }]}>{chipLabel(category)}</Text>
    </View>
  );
}

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

        <View style={styles.dateRow}>
          <Text className="text-woo-light-gray text-sm capitalize">
            {formatFullDate(log.date)}
          </Text>
          {log.category && <CategoryChip category={log.category} />}
        </View>

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
