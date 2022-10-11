import React from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

const Test2 = ( val : any, onChange : any) => {
    return (
        <View>
            <TextInput
                value={val}
                onChangeText={onChange}
                />
        </View>
    );
}

export default Test2;