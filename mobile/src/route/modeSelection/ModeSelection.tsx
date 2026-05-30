import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Pressable, Text, View, ViewToken, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MODES, type Mode } from './helper';
import { styles } from './styles';

const DOTS_HEIGHT = 32;

interface ModeSlideProps {
  item: Mode;
  slideWidth: number;
  slideHeight: number;
  paddingTop: number;
  paddingBottom: number;
  onExplore: () => void;
}

function ModeSlide({ item, slideWidth, slideHeight, paddingTop, paddingBottom, onExplore }: ModeSlideProps) {
  return (
    <View style={[styles.slide, { width: slideWidth, height: slideHeight, paddingTop, paddingBottom }]}>
      <View style={styles.textSection}>
        <Text style={styles.modoLabel}>modo</Text>
        <Text style={styles.modeName}>{item.label}</Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.modeImage} contentFit="contain" />
      </View>

      <Pressable
        onPress={onExplore}
        style={[styles.button, { backgroundColor: item.buttonColor }]}>
        <Text style={[styles.buttonText, { color: item.buttonTextColor }]}>
          explorar
        </Text>
      </Pressable>
    </View>
  );
}

export default function ModeSelection() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { width, height } = useWindowDimensions();
  const { top, bottom } = useSafeAreaInsets();

  const slideHeight = height - DOTS_HEIGHT - bottom;
  const paddingTop = top + 40;
  const paddingBottom = 32;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={MODES}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <ModeSlide
            item={item}
            slideWidth={width}
            slideHeight={slideHeight}
            paddingTop={paddingTop}
            paddingBottom={paddingBottom}
            onExplore={() => router.push('/adventure')}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      <View style={[styles.dotsRow, { marginBottom: bottom + 8 }]}>
        {MODES.map((m, i) => (
          <View key={m.key} style={i === activeIndex ? styles.dotActive : styles.dotInactive} />
        ))}
      </View>
    </View>
  );
}
