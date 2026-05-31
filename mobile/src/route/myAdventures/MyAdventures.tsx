import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Drawer } from '@/components/Drawer';
import { useAdventureLogStore } from '@/redux/slices/AdventureLogSlice';
import { type QuestCategory } from '@/utils/quests';

import { formatCardDate, isEmpty, truncate } from './helper';
import { chipLabel, chipStyle, styles } from './styles';

function CategoryChip({ category }: { category: QuestCategory }) {
  const { bg, text } = chipStyle(category);
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Text style={[styles.chipText, { color: text }]}>{chipLabel(category)}</Text>
    </View>
  );
}

export default function MyAdventures() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { top, bottom } = useSafeAreaInsets();
  const logs = useAdventureLogStore((s) => s.logs);
  const router = useRouter();

  return (
    <View className="flex-1 bg-woo-principal">
      <View style={{ paddingTop: top + 8, paddingHorizontal: 20 }}>
        <Pressable
          onPress={() => setDrawerOpen(true)}
          className="w-10 h-10 items-center justify-center mt-2 mb-6">
          <Text style={{ color: '#792C2D', fontSize: 22, lineHeight: 24 }}>☰</Text>
        </Pressable>

        <View className="items-center">
          <Text className="text-woo-red text-3xl font-bold mb-1">Minhas</Text>
          <Text className="text-woo-red text-3xl font-bold mb-6">Aventuras</Text>
        </View>
      </View>

      {isEmpty(logs) ? (
        <Text style={styles.emptyText}>Nenhuma aventura concluída ainda.</Text>
      ) : (
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: bottom + 40 }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push({ pathname: '/adventure-detail' as '/', params: { id: item.id } })}>
              {/* Top row: stars left + chip right */}
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.stars}>
                    {item.rating > 0 ? '⭐'.repeat(item.rating) : '—'}
                  </Text>
                  <Text style={styles.date}>{formatCardDate(item.date)}</Text>
                </View>
                {item.category && <CategoryChip category={item.category} />}
              </View>

              <Text style={styles.challengeText} numberOfLines={2}>
                {truncate(item.challengeText, 60)}
              </Text>
              {item.notes ? (
                <Text style={styles.notesText} numberOfLines={3}>
                  {truncate(item.notes, 80)}
                </Text>
              ) : null}
            </Pressable>
          )}
        />
      )}

      <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </View>
  );
}
