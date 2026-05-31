import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScreenHeader } from '@/components/ScreenHeader';
import { logError } from '@/logs/ErrorLogger';
import { useAdventureLogStore } from '@/redux/slices/AdventureLogSlice';
import { useToastStore } from '@/redux/slices/ToastSlice';
import { type QuestCategory } from '@/utils/quests';

import { capitalize, formatDate } from './helper';
import { styles } from './styles';

function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <View className="flex-row gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} onPress={() => onChange(star)}>
          <Text style={{ fontSize: 32 }}>{star <= value ? '⭐' : '☆'}</Text>
        </Pressable>
      ))}
    </View>
  );
}

function RequiredLabel({ text }: { text: string }) {
  return (
    <View className="flex-row items-center mb-3">
      <Text className="text-woo-light-gray text-sm font-medium uppercase flex-1">{text}<Text className="text-woo-red text-sm font-bold ml-1">*</Text></Text>

    </View>
  );
}

export default function AdventureLog() {
  const { id, text, category } = useLocalSearchParams<{ id: string; text: string; category: QuestCategory }>();
  const [notes, setNotes] = useState('');
  const [rating, setRating] = useState(0);
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const addLog = useAdventureLogStore((s) => s.addLog);
  const showToast = useToastStore((s) => s.show);

  const today = capitalize(formatDate(new Date()));
  const isValid = notes.trim().length > 0 && rating > 0;

  function handleSave() {
    if (!isValid) return;
    try {
      addLog({
        challengeId: id ?? '',
        challengeText: text ?? '',
        notes,
        rating,
        date: new Date().toISOString(),
        category: category ?? 'individual',
      });
      showToast('Aventura Salva com Sucesso');
      router.navigate('/my-adventures' as '/');
    } catch (error) {
      logError('AdventureLog', 'handleSave', error, {
        challengeId: id,
        notesLength: notes.length,
        rating,
      });
      showToast('Ops, parece que tivemos um erro, tente novamente mais tarde', 'error');
    }
  }

  return (
    <View className="flex-1 bg-woo-principal">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: top + 8, paddingBottom: bottom + 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        <ScreenHeader />

        <View className="items-center">
          <Text className="text-woo-red text-3xl font-bold mb-1">Aventura</Text>
          <Text className="text-woo-light-gray text-sm mb-8">{today}</Text>
        </View>

        <View className="bg-woo-white-cards rounded-2xl px-4 py-4 mb-8">
          <Text className="text-woo-dark-text text-base font-medium leading-6">
            {text}
          </Text>
        </View>

        <RequiredLabel text="O que você achou?" />
        <View className="bg-woo-white-cards rounded-2xl px-4 py-3 mb-8">
          <TextInput
            style={styles.textInput}
            value={notes}
            onChangeText={setNotes}
            placeholder="Escreva o que gostou ou não gostou..."
            placeholderTextColor="#6B6B6B"
            multiline
          />
        </View>

        <RequiredLabel text="Sua nota" />
        <StarRating value={rating} onChange={setRating} />

        <Pressable
          onPress={handleSave}
          disabled={!isValid}
          className="rounded-full py-4 items-center mt-10"
          style={{ backgroundColor: isValid ? '#792C2D' : '#C4A8A8' }}>
          <Text className="text-white text-base font-semibold">Concluir Aventura</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
