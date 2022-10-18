import { CommonContext } from '../context/CommonContext';
import React, { useContext, useState } from 'react';
import { View , StyleSheet} from 'react-native';
import Dialog from 'react-native-dialog';
import CommonFnUtil from '../utils/CommonFnUtil';
import CommonUtil from '../utils/CommonUtil';
import Toast from 'react-native-toast-message';

const AlertDialog = () => {
    const { alertDialogState, setAlertDialog, selectedTargetState} = useContext( CommonContext);
    const [ inputVal, setInputVal] = useState( '');

    const onClickCancel = () => {
        // if( CommonUtil.strIsNull( alertDialogState.alertName)){
            setAlertDialog( '', null);
        // }
    };

    const onClickConfirm = () => {
        console.log('click');
        console.log( selectedTargetState);

        let resultData : any = null;

        if( !CommonUtil.strIsNull( inputVal) && inputVal !== selectedTargetState.selectedTarget.doc_name) {
            switch( alertDialogState.alertItem.menuNm) {
                case 'rename':
                    const isFolder = selectedTargetState.selectedTarget.doc_type === '0';
                    const protocolId = isFolder ? 'P623' : 'P618';
                    const dataInfo = isFolder ? 
                        {
                            folder_no: selectedTargetState.selectedTarget.docUID,
                            folder_name: inputVal,
                            notSeqName : "1"
                        }
                        : 
                        {
                            docUID: selectedTargetState.selectedTarget.docUID,
                            doc_name: inputVal,
                            bIsEditorMode : "true"
                        };
                    
                    resultData = CommonFnUtil.updateDocumentFolder( protocolId, dataInfo);
                    
                    Toast.show({
                        type: 'success',
                        text1: '이름이 변경되었습니다.',
                        visibilityTime: 3000,
                        autoHide: true
                    });

                    setAlertDialog( '', null);
                    break;

                case 'newFolder':
                    
                    break;
                case 'addOwnForm':
                    break;
                default:
                    return;
            }
        }
        else {
            Toast.show({
                type: 'error',
                text1: '다시 입력해주세요.',
                visibilityTime: 3000,
                autoHide: true
            })
        }

        setInputVal( '');
    };

    return (
        <>
            { alertDialogState && alertDialogState.alertName !== '' &&
                <Dialog.Container contentStyle={ style.container} visible={true}>
                    <Dialog.Title>{ alertDialogState.alertItem ? alertDialogState.alertItem.title : '테스트'}</Dialog.Title>
                    {
                        alertDialogState.alertName === 'alert' &&
                        <Dialog.Description>{ alertDialogState.alertItem ? alertDialogState.alertItem.description : '테스트 진행 중임'}</Dialog.Description>
                    }

                    {
                        alertDialogState.alertName === 'inputAlert' &&
                        <Dialog.Input wrapperStyle={ style.InputStyle} placeholder="입력해주세요." onChangeText={ ( text: any) => ( setInputVal( text))}/>
                    }

                    <Dialog.Button label="취소" onPress={ onClickCancel}/>
                    <Dialog.Button label="확인" onPress={ onClickConfirm}/>
                </Dialog.Container>
            }
        </>
    )
};

const style = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    InputStyle: {
        width: 200,
        height: 30,
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:'#dedede',
    }
})
export default AlertDialog;