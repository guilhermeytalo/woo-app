import { StyleSheet } from 'react-native';

import { WooColors } from '@/constants/theme';
import { type QuestCategory } from '@/utils/quests';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: WooColors.whiteCards,
    borderRadius: 16,
    padding: 14,
    margin: 6,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  stars: {
    fontSize: 13,
    letterSpacing: 1,
  },
  date: {
    fontSize: 10,
    color: WooColors.lightGray,
    marginTop: 2,
  },
  chip: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 9,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  challengeText: {
    color: WooColors.darkText,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    lineHeight: 17,
  },
  notesText: {
    color: WooColors.lightGray,
    fontSize: 11,
    lineHeight: 16,
  },
  emptyText: {
    color: WooColors.lightGray,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 60,
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
