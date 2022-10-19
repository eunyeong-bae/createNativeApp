import React from 'react';
import AppRoute from './AppRoute';
import Ionicons from 'react-native-vector-icons/Ionicons';

Ionicons.loadFont().then();

const App = () => {
    return (
        <AppRoute />
    );
}

export default App;