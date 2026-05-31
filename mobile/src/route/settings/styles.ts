import { StyleSheet } from 'react-native';

import { WooColors } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WooColors.principal,
  },
  scroll: {
    flex: 1,
  },
  section: {
    marginTop: 28,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: WooColors.lightGray,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  avatarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  avatarCell: {
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  avatarCellSelected: {
    borderColor: WooColors.red,
  },
  nameInput: {
    backgroundColor: WooColors.whiteCards,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: WooColors.darkText,
  },
  saveButtonWrapper: {
    marginHorizontal: 24,
    marginTop: 36,
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: WooColors.red,
    borderRadius: 40,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
