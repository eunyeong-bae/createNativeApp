import React from 'react';
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

    return (
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

            <ScrollView showsVerticalScrollIndicator={ true} style={{ width:'95%'}}>
                <CommonAccordion />
            </ScrollView>

        </View>
    )
}