import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions } from 'react-native';

interface PaginationProps {
  data: any[];
  scrollX: Animated.Value;
}

export default function PaginationDot({ data, scrollX }: Readonly<PaginationProps>) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [8, 16, 8],
          extrapolate: 'clamp',
        });
        
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        
        return (
          <Animated.View
            key={i.toString()}
            style={[
              styles.dot,
              { width: dotWidth, opacity },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
});