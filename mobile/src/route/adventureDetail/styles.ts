import { StyleSheet } from 'react-native';

import { WooColors } from '@/constants/theme';

export const styles = StyleSheet.create({
  section: {
    backgroundColor: WooColors.whiteCards,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    color: WooColors.lightGray,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  body: {
    color: WooColors.darkText,
    fontSize: 15,
    lineHeight: 22,
  },
  emptyNotes: {
    color: WooColors.lightGray,
    fontSize: 14,
    fontStyle: 'italic',
  },
});
