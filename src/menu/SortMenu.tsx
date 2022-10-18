import { CommonContext } from '../context/CommonContext';
import React, { useContext } from 'react';
import {View} from 'react-native';
import SortPopOver from './SortPopOver';

interface sortMenuInfo {
    contextName : string,
    selectedValue : any,
    sortMenu : any,
    ViewModeCheck: any
}

const SortMenu = ( props : sortMenuInfo) => {
    const {ViewModeCheck} = props;

    return (
        <View>
            <SortPopOver ViewModeCheck={ViewModeCheck}/>
        </View>
    )
}

export default SortMenu;