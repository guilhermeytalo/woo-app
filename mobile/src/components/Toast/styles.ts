import { StyleSheet } from 'react-native';

import { WooColors } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    zIndex: 100,
    shadowColor: WooColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
