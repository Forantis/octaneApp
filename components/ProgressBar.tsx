import { Animated, View, Text} from "react-native";

export default function ProgressBar({ length, activeIndex }: { length: number, activeIndex: number }) {
    const progress = (activeIndex + 1) / length;

    return (
        <View style={{ width: 100, alignSelf: 'flex-end',marginRight: 20,}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4, justifyContent: 'flex-end' }}>
                <Text style={{ color: '#1c2a48', fontWeight: 'bold', fontSize: 14 }}>
                    {activeIndex + 1} / {length}
                </Text>
            </View>
            <View style={{
                height: 8,
                backgroundColor: '#eee',
                borderRadius: 4,
                overflow: 'hidden',
            }}>
                <Animated.View
                    style={{
                        height: 8,
                        backgroundColor: '#1c2a48',
                        width: `${progress * 100}%`,
                        borderRadius: 4,
                    }}
                />
            </View>
        </View>
    );
}