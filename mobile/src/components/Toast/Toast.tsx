import { useEffect } from 'react';
import { Text } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useToastStore } from '@/redux/slices/ToastSlice';

import { styles } from './styles';

const DURATION = 300;
const VISIBLE_MS = 2000;

const BG: Record<'success' | 'error', string> = {
  success: '#4A7C59',
  error: '#9B2335',
};

export function Toast() {
  const { message, type, visible, hide } = useToastStore();
  const { bottom } = useSafeAreaInsets();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    if (visible) {
      opacity.value = withSequence(
        withTiming(1, { duration: DURATION }),
        withDelay(
          VISIBLE_MS,
          withTiming(0, { duration: DURATION }, (finished) => {
            'worklet';
            if (finished) runOnJS(hide)();
          })
        )
      );
      translateY.value = withSequence(
        withTiming(0, { duration: DURATION }),
        withDelay(VISIBLE_MS, withTiming(20, { duration: DURATION }))
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  if (!message) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.container, { bottom: bottom + 24, backgroundColor: BG[type] }, animatedStyle]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}
