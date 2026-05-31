import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';

import { WooColors } from '@/constants/theme';

import { styles } from './styles';

interface ScreenHeaderProps {
  onBack?: () => void;
}

export function ScreenHeader({ onBack }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onBack ?? (() => router.back())}
        style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <SimpleLineIcons name="arrow-left" size={22} color={WooColors.red} />
      </Pressable>

      <View style={styles.logoWrapper}>
        <Image
          source={require('@/assets/logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>

      <View style={styles.spacer} />
    </View>
  );
}
