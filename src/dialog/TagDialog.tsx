import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput} from 'react-native-paper';
import { dialogStyles} from './style/style';
import CommonHeader from '../component/header/CommonHeader';
import { CommonContext } from '../context/CommonContext';
import CommonFnUtil from '../utils/CommonFnUtil';

const CONTEXT_NAME = 'TagDialog';
const tagDialogHeaderInfo : any = {
    'headerInfo': {
        leftBtn : [
            {iconName : "CommonCloseBtn", visibility: true},
        ],
        rightDialogBtn: [
            {iconName: "CommonSaveBtn", visibility: true}
        ],
    },
};

const tagDescription = new Map ()
    .set(0, '• 기존에 작성된 태그 값은 문서정보에서 확인 가능합니다.')
    .set(1, '• 태그는 10개까지 입력 가능합니다. (쉼표 구분)')
    .set(2, '• 태그는 1개당 20자를 초과할 수 없습니다.')
    .set(3, '• 태그 추가 시, 공백 및 모든 특수문자는 제한됩니다.')
    .set(4, '• 문서함에서 [태그설정]으로 일괄등록 시, 기존태그는 삭제 됩니다.')

const tagErrorMsgs = new Map()
    .set( 'error1', '※ 태그 1개당 20자를 초과할 수 없습니다.')
    .set( 'error2', '※ 태그는 10개까지 입력 가능합니다.')
    .set( 'error3', '※ 특수문자는 태그로 등록할 수 없습니다.')

// const tagDescription : any = [
//     '• 태그는 10개까지 입력 가능합니다. (쉼표 구분)',
//     '• 태그는 1개당 20자를 초과할 수 없습니다.',
//     '• 태그 추가 시, 공백 및 모든 특수문자는 제한됩니다.',
//     '• 문서함에서 [태그설정]으로 일괄등록 시, 기존태그는 삭제 됩니다.',
// ];

export const TagDialog = () => {
    const { selectedTargetState} = useContext( CommonContext);
    const [ isTagDataLists, setIsTagDataLists] = useState( ''); //[]
    const [ tagValue, setTagValue] = useState( '');

    let _tagDataLists: any = [];
    
    useLayoutEffect(() => {
        _tagDataLists = CommonFnUtil.getTagData( selectedTargetState.selectedTarget.docUID);

        setTimeout(() => {
            if( _tagDataLists && _tagDataLists._W){
                let result : any = [];

                for(let i=0; i < _tagDataLists._W.length; i++) { 
                    result.push( _tagDataLists._W[i].name);
                }

                _tagDataLists = result.join(', ');

                setIsTagDataLists( _tagDataLists);
            }

        }, 1000);
    });

    return useMemo(() => (
        <View style={dialogStyles.container}>
            <CommonHeader 
                headerName = { '태그설정'}
                multiSelectedState = { null}
                setMultiSelected = { null}
                headerMenuInfo={ tagDialogHeaderInfo.headerInfo}
                contextName={ CONTEXT_NAME}
                headerDataInfo={ tagValue}
                navigation={ null}
                fullpath={ null}
                setFullpath={ null}
                sortMenu ={ null}
            />

            <TextInput 
                label="Tag"
                placeholder="태그를 입력하세요."
                mode="outlined"
                multiline={true} //android only
                autoFocus={ true}
                autoCorrect={ false}
                value={ tagValue ? tagValue : isTagDataLists}
                onChangeText={ text =>  setTagValue( text)}
                style={{ width: 320, height: 150,}}
                theme={{
                    colors: {
                        primary: '#aac6fa' // Outline color here
                    }
                }}
            />

            <View style={{ borderWidth:1, borderColor:'#DCE7FB', borderRadius:10, width: '90%', padding:10, height:190, margin: 10, backgroundColor:'#fff',}}> 
                <Text style={{ height:40, paddingBottom:3, display:'flex', flexWrap: 'wrap' }}>{ tagDescription.get(0)}</Text>
                <Text style={{ height:30, paddingTop:3 }}>{ tagDescription.get(1)}</Text>
                <Text style={{ height:30, paddingTop:3}}>{ tagDescription.get(2)}</Text>
                <Text style={{ height:30, paddingTop:3}}>{ tagDescription.get(3)}</Text>
                <Text style={{ height:40, paddingTop:3, display:'flex', flexWrap: 'wrap' }}>{ tagDescription.get(4)}</Text>
            </View>
        </View>
    ), [ isTagDataLists, tagValue]); 
}