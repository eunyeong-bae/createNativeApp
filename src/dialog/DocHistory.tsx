import React, { useMemo, useState } from 'react';
import { View, ScrollView} from 'react-native';
import { dialogStyles} from './style/style';
import CommonHeader from '../component/header/CommonHeader';
import CommonAccordion from '../component/CommonAccordion';
// import CommonCollapsible from '../component/CommonCollapsible';

const CONTEXT_NAME = 'DocHistory';
const copyDialogHeaderInfo : any = {
    'headerInfo': {
        leftBtn : [
            {iconName : "CommonCloseBtn", visibility: true},
        ],
    },
};

export const DocHistory = () => {
    const [ isActiveAccordion, setIsActiveAccordion] = useState( false); //문서이력 타이틀 클릭 상태 값 체크

    return useMemo(() => (
        <View style={dialogStyles.container}>
            <CommonHeader 
                headerName = { '문서이력'}
                multiSelectedState = { null}
                setMultiSelected = { null}
                headerMenuInfo={ copyDialogHeaderInfo.headerInfo}
                contextName={ CONTEXT_NAME}
                headerDataInfo={ null}
                navigation={ null}
                sortMenu ={ null}
            />

            <ScrollView style={{ width:'95%', marginLeft:0, marginRight:0, marginTop:'auto', marginBottom:'auto'}}>
                <CommonAccordion />
            </ScrollView>

        </View>
    ), [ isActiveAccordion])
}