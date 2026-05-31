import { StyleSheet } from 'react-native';

import { WooColors } from '@/constants/theme';
import { type QuestCategory } from '@/utils/quests';

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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

const CHIP_COLORS: Record<QuestCategory, { bg: string; text: string }> = {
  individual: { bg: '#FEF3C7', text: '#92400E' },
  grupo:      { bg: '#DBEAFE', text: '#1E40AF' },
  familia:    { bg: '#D1FAE5', text: '#065F46' },
  casal:      { bg: '#FCE7F3', text: '#9D174D' },
};

const CHIP_LABELS: Record<QuestCategory, string> = {
  individual: 'Solo',
  grupo:      'Grupo',
  familia:    'Família',
  casal:      'Casal',
};

export function chipStyle(category: QuestCategory) {
  return CHIP_COLORS[category] ?? CHIP_COLORS.individual;
}

export function chipLabel(category: QuestCategory) {
  return CHIP_LABELS[category] ?? 'Individual';
}
