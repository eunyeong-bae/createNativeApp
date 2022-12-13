import React, { useContext, useMemo } from 'react';
import { View, Text } from 'react-native';
import { TextInput} from 'react-native-paper';
import { dialogStyles} from './style/style';
import CommonHeader from '../component/header/CommonHeader';
import { CommonContext } from '../context/CommonContext';
import CommonFnUtil from '../utils/CommonFnUtil';

const CONTEXT_NAME = 'SecurityDialog';
const securityDialogHeaderInfo : any = {
    'headerInfo': {
        leftBtn : [
            {iconName : "CommonCloseBtn", visibility: true},
        ],
        rightDialogBtn: [
            {iconName: "CommonSaveBtn", visibility: true}
        ],
    },
};

export const SecurityDialog = () => {
    const { selectedTargetState} = useContext( CommonContext);

    return (
        <View style={dialogStyles.container}>
            <CommonHeader 
                headerName = { '보안설정'}
                multiSelectedState = { null}
                setMultiSelected = { null}
                headerMenuInfo={ securityDialogHeaderInfo.headerInfo}
                contextName={ CONTEXT_NAME}
                headerDataInfo={ null}
                navigation={ null}
                fullpath={ null}
                setFullpath={ null}
                sortMenu ={ null}
            />

        </View>
    )
}