import { CommonContext } from '../context/CommonContext';
import React, { useContext, useEffect } from 'react';
import { fullPathStyleSheet} from './style/style';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import SvgIcon from '../component/svgIcon/SvgIcon';

interface pathInfo {
    fullpath?: any,
    setFullPath?: any,
}

const FullPath = ( props: pathInfo) => { //값을 받을 수도 있고 받지 않아도될 상황이 있다면 ? 를 붙이기
    /**
     * To check if an object is empty in React: Object.keys(fullpath).length === 0
     * 
     *  1. Use " the Object.keys() method "" to get an array of the object's keys.
        2. Access the " length property "" on the array.
        3. If the array of " keys has a length of 0, then the object is empty. "
    */
    const { fullpath, setFullPath} = props;

    const { targetFullPathState, setTargetFullPath} = Object.keys(props).length === 0 ? useContext(CommonContext) : {targetFullPathState : fullpath, setTargetFullPath: setFullPath} ;

    const onClickFolder = ( fullPathUID: string) => {
        const tempTarget = {
            fullPathUIDs : targetFullPathState.fullPathUIDs.concat(),
            fullPathNames : targetFullPathState.fullPathNames.concat(),
        };

        for(let i =0; i< targetFullPathState.fullPathUIDs.length; i++){
            if( tempTarget.fullPathUIDs[i] === fullPathUID) {
                tempTarget.fullPathUIDs = tempTarget.fullPathUIDs.slice( 0, i + 1);
                tempTarget.fullPathNames = tempTarget.fullPathNames.slice( 0, i + 1);
                break;
            }
        }

        setTargetFullPath(tempTarget.fullPathUIDs, tempTarget.fullPathNames, null);
    }

    return (
        <View style={ fullPathStyleSheet.fullPathContaier}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator = {true}>
                <View style={ fullPathStyleSheet.startBlurEffect}/>
                    { targetFullPathState.fullPathUIDs.map(( fullPathUID : string, index : number) => {
                        return( <View key={ 'path'+ fullPathUID} style={ fullPathStyleSheet.fullPathContent}>
                                    <TouchableOpacity onPress={ onClickFolder.bind( this, fullPathUID)}>
                                        <Text style={ (index === targetFullPathState.fullPathUIDs.length -1 ? fullPathStyleSheet.fullPathLastText : fullPathStyleSheet.fullPathText)}>{targetFullPathState.fullPathNames[index]}</Text>
                                    </TouchableOpacity>
                                    { (index < targetFullPathState.fullPathUIDs.length -1) &&
                                        <SvgIcon name="NextSB" width={16} height={16} style={ fullPathStyleSheet.fullPathNextIcon}/>
                                    }
                                </View>
                        )
                    })
                    }
                <View style={ fullPathStyleSheet.endBlurEffect}/>
            </ScrollView>
        </View>
    )
}

export default FullPath;