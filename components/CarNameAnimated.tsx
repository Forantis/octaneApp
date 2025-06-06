import React from 'react';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

type Props = {
    name: string;
};

const styles = StyleSheet.create({
    TextLuxeSmall: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#F23557',
        marginTop: 30,
        marginLeft: 20,
        width: '90%',
    },
    TextLuxeBig: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#F23557',
        marginTop: 30,
        marginLeft: 20,
        width: '90%',
    },
});

export default function CarNameAnimated({ name }: Props): JSX.Element {
    return (
        <Animated.Text
            key={name}
            entering={FadeInUp.duration(400)}
            exiting={FadeOutDown.duration(400)}
            style={name.length > 14 ? styles.TextLuxeSmall : styles.TextLuxeBig}
        >
            {name}
        </Animated.Text>
    );
}