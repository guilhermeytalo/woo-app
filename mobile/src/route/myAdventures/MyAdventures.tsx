import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Drawer } from '@/components/Drawer';
import { useAdventureLogStore } from '@/redux/slices/AdventureLogSlice';

import { formatCardDate, isEmpty, truncate } from './helper';
import { styles } from './styles';

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
              <View className="flex-row justify-between items-start mb-2">
                <Text className="text-woo-light-gray text-xs flex-1">{formatCardDate(item.date)}</Text>
                {item.rating > 0 && (
                  <Text className="text-xs ml-1">{'⭐'.repeat(item.rating)}</Text>
                )}
              </View>
              <Text className="text-woo-dark-text text-sm font-semibold mb-1" numberOfLines={2}>
                {truncate(item.challengeText, 60)}
              </Text>
              {item.notes ? (
                <Text className="text-woo-light-gray text-xs" numberOfLines={3}>
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
