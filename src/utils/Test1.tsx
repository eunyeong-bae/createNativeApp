import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Test2 from './Test2';
const Test1 = () => {
    const [t1, setT1] = useState('');
    const onChange = ( e : any) => {
        setT1( e.target);
    }
    return (
        <View>
            <Test2 val={t1} onChange={onChange}/>
        </View>
    );
}

export default Test1;