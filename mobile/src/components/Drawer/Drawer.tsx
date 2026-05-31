import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DiceBearAvatar } from '@/components/DiceBearAvatar';
import { WooColors } from '@/constants/theme';
import { useUserStore } from '@/redux/slices/UserSlice';

const DRAWER_WIDTH = 280;
const DURATION = 250;

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  route: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
}

const MAIN_ITEMS: MenuItem[] = [
  { label: 'Início', route: '/', icon: 'home-outline', activeIcon: 'home' },
  { label: 'Micro Aventura', route: '/adventure', icon: 'sparkles-outline', activeIcon: 'sparkles' },
  { label: 'Minhas Aventuras', route: '/my-adventures', icon: 'map-outline', activeIcon: 'map' },
];

const BOTTOM_ITEMS = [
  { label: 'Configurações', icon: 'settings-outline' as keyof typeof Ionicons.glyphMap, route: null },
  { label: 'Sair', icon: 'log-out-outline' as keyof typeof Ionicons.glyphMap, route: null },
];

export function Drawer({ isOpen, onClose }: DrawerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { top, bottom } = useSafeAreaInsets();
  const { name, avatarSeed, level } = useUserStore();

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isOpen ? 1 : 0, { duration: DURATION }),
    pointerEvents: isOpen ? 'auto' : 'none',
  }));

  const drawerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(isOpen ? 0 : -DRAWER_WIDTH, { duration: DURATION }) },
    ],
  }));

  function navigate(route: string) {
    onClose();
    router.navigate(route as '/');
  }

  return (
    <>
      <Animated.View style={[StyleSheet.absoluteFill, styles.overlay, overlayStyle]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.drawerOuter, drawerStyle]}>
        <View style={styles.drawerInner}>
          {/* Header */}
          <View style={[styles.header, { paddingTop: top + 16 }]}>
            <View style={styles.logoChip}>
              <Image
                source={require('@/assets/logo.png')}
                style={styles.logo}
                contentFit="contain"
              />
            </View>

            <View style={styles.profileRow}>
              <View style={styles.avatarWrapper}>
                <DiceBearAvatar seed={avatarSeed} size={48} />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{name}</Text>
                <Text style={styles.profileLevel}>Explorador Nível {level}</Text>
              </View>
            </View>
          </View>

          {/* Main menu */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Menu Principal</Text>
            {MAIN_ITEMS.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Pressable
                  key={item.route}
                  onPress={() => navigate(item.route)}
                  style={[styles.menuItem, isActive && styles.menuItemActive]}>
                  <Ionicons
                    name={isActive ? item.activeIcon : item.icon}
                    size={20}
                    color={isActive ? WooColors.whiteCards : WooColors.darkText}
                    style={styles.menuIcon}
                  />
                  <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.spacer} />

          {/* Bottom items */}
          <View style={[styles.bottomSection, { paddingBottom: Math.max(bottom, 24) }]}>
            <View style={styles.divider} />
            {BOTTOM_ITEMS.map((item) => (
              <Pressable key={item.label} style={styles.menuItem}>
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={WooColors.darkText}
                  style={styles.menuIcon}
                />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 40,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginBottom: 4,
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
