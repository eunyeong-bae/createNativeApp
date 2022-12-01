import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
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
    'headerDataInfo': {
        currTagDataList: '',
        tagErrorMsgs: [
            '※ 태그 1개당 20자를 초과할 수 없습니다.',
            '※ 태그는 10개까지 입력 가능합니다.',
            '※ 특수문자는 태그로 등록할 수 없습니다.'
        ]
    }
};

const tagDescription = new Map ()
    .set(1, '• 태그는 10개까지 입력 가능합니다. (쉼표 구분)')
    .set(2, '• 태그는 1개당 20자를 초과할 수 없습니다.')
    .set(3, '• 태그 추가 시, 공백 및 모든 특수문자는 제한됩니다.')
    .set(4, '• 문서함에서 [태그설정]으로 일괄등록 시, 기존태그는 삭제 됩니다.')

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
            if( _tagDataLists){
                let result : any = [];

                for(let i=0; i < _tagDataLists._W.length; i++) { 
                    result.push( _tagDataLists._W[i].name);
                }

                _tagDataLists = result.join(', ');

                setIsTagDataLists( _tagDataLists);
                setTagValue( _tagDataLists);
            }

        }, 1000);
    });

    const onChangeText = ( text: any) => { 
        console.log( text)
    };

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

            <View style={{ margin:10, width:'90%', borderWidth:1, borderColor:'#DCE7FB', borderRadius:10, backgroundColor:'#fff', height:150, padding:5}}>
                <TextInput 
                    multiline
                    numberOfLines={ 7}
                    onChangeText={ onChangeText}
                    value={ tagValue}
                    style={{ padding: 10}}
                    editable
                />
            </View>

            <View style={{ borderWidth:1, borderColor:'#DCE7FB', borderRadius:10, width: '90%', padding:10, height:150, margin: 10, backgroundColor:'#fff',}}> 
                <Text style={{ height:30, paddingTop:3 }}>{ tagDescription.get(1)}</Text>
                <Text style={{ height:30, paddingTop:3}}>{ tagDescription.get(2)}</Text>
                <Text style={{ height:30, paddingTop:3}}>{ tagDescription.get(3)}</Text>
                <Text style={{ height:40, paddingTop:3, display:'flex', flexWrap: 'wrap' }}>{ tagDescription.get(4)}</Text>
            </View>
        </View>
    )
}