import { StyleSheet } from 'react-native';

import { Fonts, WooColors } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WooColors.principal,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textSection: {
    alignItems: 'center',
    gap: 4,
  },
  modoLabel: {
    fontSize: 16,
    color: WooColors.lightGray,
    fontWeight: '500',
  },
  modeName: {
    fontSize: 38,
    fontWeight: '700',
    color: WooColors.darkText,
    fontFamily: Fonts?.rounded ?? undefined,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  skeleton: {
    backgroundColor: '#E0D8D2',
    borderRadius: 24,
  },
  modeImage: {
    width: 640,
    height: 640,
  },
  button: {
    minWidth: 150,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: 32,
  },
  dotActive: {
    width: 16,
    height: 8,
    borderRadius: 4,
    backgroundColor: WooColors.darkText,
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: WooColors.lightGray,
  },
});
