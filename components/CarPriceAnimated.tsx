import React from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

type Props = {
    price: number;
    stylePrice: any;
};

export default function CarPriceAnimated({ price, stylePrice }: Props) {
    return (
        <Animated.View
            key={price}
            entering={FadeInUp.duration(400)}
            exiting={FadeOutDown.duration(400)}
            style={{ flexDirection: 'row' }}
        >
            <Text style={stylePrice}>${price}</Text>
            <Text style={{ color: '#ccc', fontSize: 16, marginLeft: 4, marginTop: 3 }}>/ jour</Text>
        </Animated.View>
    );
}