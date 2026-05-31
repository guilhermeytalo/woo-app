import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DiceBearAvatar } from '@/components/DiceBearAvatar';
import { WooColors } from '@/constants/theme';
import { useUserStore } from '@/redux/slices/UserSlice';

import { DRAWER_WIDTH, styles } from './styles';

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
  { label: 'Configurações', icon: 'settings-outline' as keyof typeof Ionicons.glyphMap, route: '/settings' },
  // { label: 'Sair', icon: 'log-out-outline' as keyof typeof Ionicons.glyphMap, route: null },
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
                <View key={item.route} style={styles.menuItemWrapper}>
                  <Pressable
                    onPress={() => navigate(item.route)}
                    style={[styles.menuItem, isActive && styles.menuItemActive]}
                    hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}>
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
                </View>
              );
            })}
          </View>

          <View style={styles.spacer} />

          {/* Bottom items */}
          <View style={[styles.bottomSection, { paddingBottom: Math.max(bottom, 24) }]}>
            <View style={styles.divider} />
            {BOTTOM_ITEMS.map((item) => (
              <View key={item.label} style={styles.menuItemWrapper}>
                <Pressable
                  style={styles.menuItem}
                  onPress={() => item.route && navigate(item.route)}
                  hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={WooColors.darkText}
                    style={styles.menuIcon}
                  />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    </>
  );
}
