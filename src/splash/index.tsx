import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AppScreens, } from '../navigation';

const Splash = ( {navigation} : any) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);
    useEffect(() => {
        setTimeout( async() => {
            setAnimating(false);
            //Check if user_id is set or not
            //If not then send for Authentication
            //else send to Home Screen
            await AsyncStorage.getItem('userToken').then((value) =>{
                navigation.navigate( value === null ? AppScreens.Login : AppScreens.Main);
                // navigation.navigate( AppScreens.Home);
            },);
        }, 1000);
    }, []);

    return (
        <View style={styles.container}>
            {/* <Image
                source={require('../Image/aboutreact.png')}
                style={{ width: '90%', resizeMode: 'contain', margin: 30 }}
            /> */}
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

export default Splash;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#307ecc',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});