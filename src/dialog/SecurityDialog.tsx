import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { RadioButton, Text, TextInput} from 'react-native-paper';
import { dialogStyles} from './style/style';
import CommonHeader from '../component/header/CommonHeader';
import { CommonContext } from '../context/CommonContext';
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

const radioBtnValues = [{ text: '변경', value: 'change'}, { text: '해제', value: 'unSetting'}];

export const SecurityDialog = () => {
    const { selectedTargetState} = useContext( CommonContext);
    const [ value, setValue] = useState( selectedTargetState.selectedTarget.security_key ? 'change' : ''); //문서보안설정 상태 값
    const [ password, setPassword] = useState({ //비밀번호 상태 값
        previousPW: '',
        currentPW: '',
        doubleChkPW: '',
    });
    const txtInputValue = selectedTargetState && selectedTargetState.selectedTarget.security_key ?
                        ['현재 암호','새 암호','새 암호 확인']
                     :
                        ['암호','암호 확인'];

    const changeSettingMode = () => {
        //변경, 해제 클릭 시, textinput ui 변경 필요
    };

    return (
        <View style={[ dialogStyles.container, { height: 500}]}>
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

            <View style={{ borderTopWidth:1, borderTopColor:'#DCE7FB', width:'100%', height:'100%',}}>
                { selectedTargetState && selectedTargetState.selectedTarget.security_key && 
                    <RadioButton.Group onValueChange={ newValue => setValue( newValue)} value={ value}>
                        <View style={ sctyDialogStyle.sctyMenuRow}>
                            <Text>문서보안설정</Text>
                            { radioBtnValues.map( (value, index) => {
                                return (
                                    <View key={ value.value} style={{ flexDirection:'row', alignItems:'center', marginLeft:10}}>
                                        <RadioButton value={ value.value} status= "checked" onPress={ changeSettingMode}/>
                                        <Text>{ value.text}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </RadioButton.Group>
                }

                { txtInputValue.map( txt => {
                    return (
                        <View style={[ sctyDialogStyle.sctyMenuRow, ( password.previousPW !== '' || password.currentPW !== '' || password.doubleChkPW !== '') && sctyDialogStyle.sctyMenuRowErrorOn]} key={ txt}>
                            <Text style={{ width:80}}>{ txt}</Text>
                            <View style={[ password.currentPW !== '' && { paddingTop:10}, { width:'100%'}]}>
                                { selectedTargetState.selectedTarget.security_key ?
                                    <>
                                        <TextInput 
                                            value={  txt === '현재 암호' ? password.previousPW 
                                                    : txt === '새 암호' ? password.currentPW 
                                                    : password.doubleChkPW  
                                            }
                                            onChangeText={ value => setPassword({
                                                previousPW: txt === '현재 암호' ? value : password.previousPW,
                                                currentPW: txt === '새 암호' ? value : password.currentPW,
                                                doubleChkPW: txt === '새 암호 확인' ? value : password.doubleChkPW
                                            })}    
                                            style={ sctyDialogStyle.textInput}
                                            secureTextEntry
                                            placeholder={ txt}
                                            right={<TextInput.Icon icon="eye" />}
                                        />
                                        {( password.previousPW !== '' || password.currentPW !== '' || password.doubleChkPW !== '' ) &&
                                            <View style={{ width:'100%', height:30, justifyContent:'center'}}>
                                                {( password.previousPW !== '' && password.previousPW.length < 4 && txt === '현재 암호') &&
                                                    <Text style={{ fontSize:12, color:'red'}}>※ 4자 이상 20자 이하로 입력해주세요.</Text>
                                                }
                                                {( password.currentPW !== '' && password.currentPW.length < 4 && txt === '새 암호') &&
                                                    <Text style={{ fontSize:12, color:'red'}}>※ 4자 이상 20자 이하로 입력해주세요.</Text>
                                                }
                                                {( password.doubleChkPW !== '' && password.doubleChkPW.length < 4 && txt === '새 암호 확인') &&
                                                    <Text style={{ fontSize:12, color:'red'}}>※ 4자 이상 20자 이하로 입력해주세요.</Text>
                                                }
                                                { password.previousPW !== '' && password.currentPW !== '' && txt === '새 암호' && password.previousPW === password.currentPW && 
                                                    <Text style={{ fontSize:12, color:'red'}}>※ 현재암호와 동일한 암호는 사용하실 수 없습니다.</Text>
                                                } 
                                                { password.currentPW !== '' && password.doubleChkPW !== '' && txt === '새 암호 확인' && password.currentPW !== password.doubleChkPW && 
                                                    <Text style={{ fontSize:12, color:'red'}}>※ 새 암호와 일치하지 않습니다.</Text>
                                                } 
                                            </View>
                                        }
                                    </>
                                    :
                                    <>
                                        <TextInput 
                                            value={  txt === '암호' ? password.currentPW : password.doubleChkPW}
                                            onChangeText={ value => setPassword({
                                                ...password,
                                                currentPW: txt === '암호' ? value : password.currentPW,
                                                doubleChkPW: txt === '암호 확인' ? value : password.doubleChkPW
                                            })}    
                                            style={ sctyDialogStyle.textInput}
                                            secureTextEntry
                                            placeholder={ txt}
                                            right={<TextInput.Icon icon="eye" />}
                                        />
                                        { (password.currentPW !== '' || password.currentPW !== '' ) &&
                                            <View style={{ width:250, height:35, justifyContent:'center'}}>
                                                {( password.currentPW !== '' && password.currentPW.length < 4 && txt === '암호') &&
                                                    <Text style={{ fontSize:12, color:'red'}}>※ 4자 이상 20자 이하로 입력해주세요.</Text>
                                                }
                                                {( password.doubleChkPW !== '' && password.doubleChkPW.length < 4 && txt === '암호 확인') &&
                                                    <Text style={{ fontSize:12, color:'red'}}>※ 4자 이상 20자 이하로 입력해주세요.</Text>
                                                }
                                                { password.currentPW !== '' && password.doubleChkPW !== '' && txt === '암호 확인' && password.currentPW !== password.doubleChkPW && 
                                                    <Text style={{ fontSize:12, color:'red'}}>※ 입력한 암호와 일치하지 않습니다.</Text>
                                                } 
                                            </View>
                                        }
                                    </>
                                }
                            </View>
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
        borderBottomColor:'#DCE7FB',
    },
    sctyMenuRowErrorOn: {
        height: 100,
    },
    textInput: {
        width:'70%', 
        height: 40, 
        backgroundColor:'#fff',
    }
})