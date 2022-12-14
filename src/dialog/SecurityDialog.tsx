import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { RadioButton, Text, TextInput} from 'react-native-paper';
import { dialogStyles} from './style/style';
import CommonHeader from '../component/header/CommonHeader';
import { CommonContext } from '../context/CommonContext';
import Toast from 'react-native-toast-message';
import { CommonDialogToast} from '../component/CommonDialogToast';

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

/**
 * 설정: 암호 & 암호 확인
 * 변경: 현재암호/ 암호/ 암호확인
 * 해제: 현재 암호만 활성화
 */

const radioBtnValues = [ { text: '설정', value: 'setting'}, { text: '변경', value: 'change'}, { text: '해제', value: 'unSetting'}];
const txtInputValue =[ '현재 암호','암호','암호 확인'];
const pwErrors = [
    {
        'previousPW': ['※4자 이상 20자 이하로 입력해주세요.','※현재암호와 일치하지않습니다.'], //현재 암호
        'currentPW': ['※4자 이상 20자 이하로 입력해주세요.','※현재암호와 동일한 암호는 사용하실 수 없습니다.'], //암호
        'doubleChkPW': ['※입력한 암호와 일치하지 않습니다.','※새 암호와 일치하지 않습니다.'], //암호 확인
    }
];

export const SecurityDialog = () => {
    const { selectedTargetState} = useContext( CommonContext);
    const [ value, setValue] = useState('setting');
    const [ password, setPassword] = useState({
        previousPW: '',
        currentPW: '',
        doubleChkPW: '',
    });

    useEffect(() => {
        //비밀번호 값 비교하는 수식 필요

        // Toast.show({
        //     type:'success',
        //     text1: '이동되었습니다.',
        //     visibilityTime: 1000,
        //     autoHide: true
        // });

    }, [ password]);

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

            <View style={{ borderWidth:1, borderColor:'red', width:'100%', height:'90%'}}>
                <RadioButton.Group onValueChange={ newValue => setValue( newValue)} value={ value}>
                    <View style={ sctyDialogStyle.sctyMenuRow}>
                        <Text>문서보안설정</Text>
                        { radioBtnValues.map( value => {
                            return (
                                <View style={{ flexDirection:'row', alignItems:'center', marginLeft:10}}>
                                    <RadioButton value={ value.value}/>
                                    <Text>{ value.text}</Text>
                                </View>
                            )
                        })}
                    </View>
                </RadioButton.Group>

                { txtInputValue.map( txt => {
                    return (
                        <View style={ sctyDialogStyle.sctyMenuRow}>
                            <Text style={{ width:80}}>{ txt}</Text>
                            <TextInput 
                                value={  txt === '암호' ? password.currentPW : password.doubleChkPW}
                                onChangeText={ value => setPassword({
                                    ...password,
                                    currentPW: txt === '암호' ? value : password.currentPW,
                                    doubleChkPW: txt === '암호 확인' ? value : password.doubleChkPW
                                })}    
                                style={ sctyDialogStyle.textInput}
                            />
                        </View>
                    )
                })}

                <View style={{ width:'100%', height:60, padding:10, marginTop:10}}>
                    <Text style={{ fontSize:12, color:'red'}}>주의: 암호를 잊으면 문서를 복구할 수 없습니다.</Text>
                    <Text style={{ marginTop:5, fontSize:12, color:'red'}}>암호는 대소문자를 구분하며, 4자 이상 20자 이하로 입력 가능 합니다.</Text>
                </View>
            </View>
            <CommonDialogToast />
        </View>
    )
}

const sctyDialogStyle = StyleSheet.create({
    sctyMenuRow: {
        width:'100%', 
        height:60, 
        flexDirection:'row', 
        alignItems:'center', 
        paddingLeft:10, 
        paddingRight:10,
        borderBottomWidth:1,
    },
    textInput: {
        width:'70%', 
        height: 40, 
        backgroundColor:'#fff'
    }
})