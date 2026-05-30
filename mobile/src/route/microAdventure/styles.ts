import { StyleSheet } from 'react-native';

import { Fonts, WooColors } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WooColors.principal,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 160,
    height: 100,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: WooColors.darkText,
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: Fonts?.rounded ?? undefined,
  },
  cardsList: {
    gap: 12,
  },
  card: {
    backgroundColor: WooColors.whiteCards,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  cardText: {
    color: WooColors.darkText,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
});
