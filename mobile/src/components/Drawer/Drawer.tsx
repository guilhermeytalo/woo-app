import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const DRAWER_WIDTH = 260;
const DURATION = 250;

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  route: string;
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'Início', route: '/' },
  { label: 'Micro Aventura', route: '/adventure' },
];

export function Drawer({ isOpen, onClose }: DrawerProps) {
  const router = useRouter();

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

      <Animated.View style={[styles.drawer, drawerStyle]}>
        <View style={styles.header}>
          <Text style={styles.brand}>Wöo</Text>
        </View>

        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.route}
              onPress={() => navigate(item.route)}
              style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#1C1B2E',
    zIndex: 11,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 16,
  },
  header: {
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2940',
  },
  brand: {
    color: '#E8735A',
    fontSize: 28,
    fontWeight: '700',
  },
  menu: {
    paddingTop: 16,
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  menuItemPressed: {
    backgroundColor: '#2A2940',
  },
  menuLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
