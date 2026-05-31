import { StyleSheet } from 'react-native';

import { WooColors } from '@/constants/theme';

export const DRAWER_WIDTH = 280;

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 10,
  },
  drawerOuter: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    zIndex: 11,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 16,
  },
  drawerInner: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: WooColors.principal,
  },
  header: {
    backgroundColor: '#EDE8F5',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  logoChip: {
    backgroundColor: '#F4D7E3',
    borderRadius: 12,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 24,
  },
  logo: {
    width: 66,
    height: 42,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 15,
    fontWeight: '700',
    color: WooColors.darkText,
  },
  profileLevel: {
    fontSize: 12,
    color: WooColors.lightGray,
    marginTop: 2,
  },
  section: {
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: WooColors.lightGray,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  menuItemWrapper: {
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  menuItemActive: {
    backgroundColor: WooColors.red,
  },
  menuItemPressed: {
    backgroundColor: '#F0EBE8',
  },
  menuIcon: {
    marginRight: 14,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: WooColors.darkText,
  },
  menuLabelActive: {
    color: WooColors.whiteCards,
    fontWeight: '600',
  },
  spacer: {
    flex: 1,
  },
  bottomSection: {
    paddingHorizontal: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E0DC',
    marginBottom: 8,
  },
});
