import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  Pressable,
} from 'react-native';
import { brandPrimary, fontStandard } from '../styles/colors';

type Props = {
  options: string[];
  selected: string;
  screens: React.ReactNode[];
  onSelect: (val: string) => void;
};

export default function TimeNav({
  screens,
  options,
  selected,
  onSelect,
}: Props) {
  const { width } = Dimensions.get('window');
  const scrollViewRef = useRef<ScrollView>(null);
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {options.map((option) => (
          <Pressable
            onPress={() => {
              console.log(options.indexOf(option) * width);
              scrollViewRef.current?.scrollTo({
                x: options.indexOf(option) * width,
                animated: true,
              });
              onSelect(option);
            }}
            key={option}>
            <Text
              style={[
                styles.navText,
                selected === option && styles.navTextSelected,
              ]}>
              {option}
            </Text>
          </Pressable>
        ))}
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        scrollsToTop={false}
        bounces={false}
        onMomentumScrollEnd={(e) =>
          onSelect(
            options[Math.round(e.nativeEvent.contentOffset.x / width)] ||
              options[0],
          )
        }
        style={styles.scroll}>
        {options.map((option, index) => (
          <View
            key={`screen-${option}`}
            style={[styles.screenContainer, { width }]}>
            {screens[index]}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    marginVertical: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    fontSize: 16,
    color: fontStandard,
    fontWeight: '500',
    marginHorizontal: 25,
  },
  navTextSelected: {
    color: brandPrimary,
    textDecorationLine: 'underline',
  },
  navTextPressed: {
    opacity: 0.5,
  },
  scroll: {
    flex: 1,
  },
  screenContainer: { flex: 1 },
});
