import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DiceBearAvatar } from '@/components/DiceBearAvatar';
import { ScreenHeader } from '@/components/ScreenHeader';
import { useToastStore } from '@/redux/slices/ToastSlice';
import { useUserStore } from '@/redux/slices/UserSlice';

import { AVATAR_SEEDS } from './helper';
import { styles } from './styles';

const AVATAR_SIZE = 52;

export default function Settings() {
  const { top, bottom } = useSafeAreaInsets();
  const router = useRouter();
  const { name, avatarSeed, setName, setAvatarSeed } = useUserStore();
  const showToast = useToastStore((s) => s.show);

  const [localName, setLocalName] = useState(name);
  const [selectedSeed, setSelectedSeed] = useState(avatarSeed);

  function handleSave() {
    try {
      setName(localName.trim() || 'Explorador');
      setAvatarSeed(selectedSeed);
      showToast('Configurações salvas com sucesso');
      router.back();
    } catch {
      showToast('Erro ao salvar configurações, tente novamente', 'error');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingTop: top + 16, paddingBottom: bottom + 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 24 }}>
          <ScreenHeader />
        </View>

        {/* Avatar picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Escolha seu avatar</Text>
          <View style={styles.avatarGrid}>
            {AVATAR_SEEDS.map((seed) => (
              <Pressable
                key={seed}
                onPress={() => setSelectedSeed(seed)}
                style={[styles.avatarCell, selectedSeed === seed && styles.avatarCellSelected]}>
                <DiceBearAvatar seed={seed} size={AVATAR_SIZE} />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Name input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seu nome</Text>
          <TextInput
            style={styles.nameInput}
            value={localName}
            onChangeText={setLocalName}
            placeholder="Como você quer ser chamado?"
            placeholderTextColor="#6B6B6B"
            maxLength={30}
            returnKeyType="done"
          />
        </View>
      </ScrollView>

      <View style={styles.saveButtonWrapper}>
        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </Pressable>
      </View>
    </View>
  );
}
