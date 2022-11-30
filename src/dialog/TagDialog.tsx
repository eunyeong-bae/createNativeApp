import React, { useContext, useEffect, useState } from 'react';
import { View, } from 'react-native';
import { dialogStyles} from './style/style';
import CommonHeader from '../component/header/CommonHeader';
import { CommonContext } from '../context/CommonContext';
import CommonFnUtil from '../utils/CommonFnUtil';

const CONTEXT_NAME = 'tagDialog';
const tagDialogHeaderInfo : any = {
    'headerInfo': {
        leftBtn : [
            {iconName : "CommonCloseBtn", visibility: true},
        ],
        rightDialogBtn: [
            {iconName: "CommonSaveBtn", visibility: true}
        ],
    },
    'prevTagLists': []
};


export const TagDialog = () => {
    const { selectedTargetState} = useContext( CommonContext);
    const [ isTagDataLists, setIsTagDataLists] = useState( []);
    let _tagDataLists: any = [];
    
    useEffect(() => {
        _tagDataLists = CommonFnUtil.getTagData( selectedTargetState.selectedTarget.docUID);

        setTimeout(() => {
            setIsTagDataLists( _tagDataLists);
        }, 1000);
    }, []);

    return (
        <View style={dialogStyles.container}>
            <CommonHeader 
                headerName = { '태그설정'}
                multiSelectedState = { null}
                setMultiSelected = { null}
                headerMenuInfo={ tagDialogHeaderInfo.headerInfo}
                contextName={ CONTEXT_NAME}
                headerDataInfo={ null}
                navigation={ null}
                fullpath={ null}
                setFullpath={ null}
                sortMenu ={ null}
            />

            <View>
                
            </View>
        </View>
    )
}