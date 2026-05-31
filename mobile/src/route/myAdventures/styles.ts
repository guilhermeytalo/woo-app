import { StyleSheet } from 'react-native';

import { WooColors } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: WooColors.whiteCards,
    borderRadius: 16,
    padding: 14,
    margin: 6,
  },
  emptyText: {
    color: WooColors.lightGray,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 60,
  },
});
