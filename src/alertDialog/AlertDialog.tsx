import { CommonContext } from '../context/CommonContext';
import React, { useContext, useState } from 'react';
import { View , Text, StyleSheet, Dimensions} from 'react-native';
import Dialog from 'react-native-dialog';
import CommonFnUtil from '../utils/CommonFnUtil';
import CommonUtil from '../utils/CommonUtil';
import Toast from 'react-native-toast-message';

const categoryUid = '136142218a7664Bc9a';

const AlertDialog = () => {
    // let result : any = [];

    const { alertDialogState, 
            setAlertDialog, 
            selectedTargetState, 
            targetFullPathState} = useContext( CommonContext);
            
    const [ inputVal, setInputVal] = useState( '');

    const onClickCancel = () => {
        // if( CommonUtil.strIsNull( alertDialogState.alertName)){
            setAlertDialog( '', null);
        // }
    };

    const onClickConfirm = () => {
        let resultData : any = null;

        if( CommonUtil.strIsNull( inputVal) && ( inputVal === (selectedTargetState && selectedTargetState.selectedTarget.doc_name)
                || inputVal === (targetFullPathState && targetFullPathState.fullPathNames[targetFullPathState.fullPathUIDs.length - 1]))) {

            Toast.show({
                type: 'error',
                text1: '다시 입력해주세요.',
                visibilityTime: 3000,
                autoHide: true
            });
        }
        else {
            switch( alertDialogState.alertItem.menuNM) { 
                case 'rename':
                    resultData = CommonFnUtil.updateDocumentFolderName( inputVal, selectedTargetState.selectedTarget);
                    break;
                case 'newFolder':
                    resultData = CommonFnUtil.createNewFolder( inputVal, alertDialogState.alertItem.folderId);
                    break;
                case 'newDocument':
                    break;
                case 'addCategory':
                    resultData = CommonFnUtil.createCategory( inputVal, categoryUid);
                    break;
            
            }
            setTimeout(() => {
                if( resultData) { 
                    if( alertDialogState.alertItem.menuNM === 'rename') {
                        selectedTargetState.selectedTarget.doc_name = inputVal;
                    }
                }
                else if( alertDialogState.alertItem.menuNM === 'addCategory') {
                    const { isCategoryLists, setIsCategoryLists } = alertDialogState.alertItem;
                    const pushArr = { name: resultData.name, uid: resultData.uid, parentUID: resultData.parentUID};
                    setIsCategoryLists([
                        ...isCategoryLists,
                        pushArr
                    ]);
                }
                else {
                    return;
                }
                setAlertDialog( '', null);

            }, 500);
        }

        setInputVal( '');
    };

    const onClickDeleteConfirm = ( menuNM: any) => {
        //여러개 선택한 케이스도 나중에 구현 필요 ( 다중선택)
        let docType : boolean = false;
        let docUID : any = '';
        let folderUID : any = '';

        if( menuNM === 'deleteFile') {
            docType = alertDialogState && alertDialogState.alertItem.data.doc_type === '0'; // 0: true folder, 1: false doc
            docUID = !docType ? alertDialogState && alertDialogState.alertItem.data.docUID : '';
            folderUID = docType ? alertDialogState && alertDialogState.alertItem.data.docUID : '';
        } else {
            docType = selectedTargetState && selectedTargetState.selectedTarget.doc_type === '0'; // 0: true folder, 1: false doc
            docUID = !docType ? selectedTargetState.selectedTarget.docUID : '';
            folderUID = docType ? selectedTargetState.selectedTarget.docUID : '';
        }


        let data: any = {};
        let resData: any = '';

        switch( menuNM) { 
            case 'deleteFile':
                data = {
                    protocolId : docType ? 'P532' : 'P531',
                    data : docType ? {"folder_no":folderUID} : {"docUID":docUID},
                };
                
                resData = CommonFnUtil.deleteFile( data);
                break;
            case 'deleteInTrash':
                resData = CommonFnUtil.deleteTrashDocument( docUID, folderUID);
                break;
            case 'empty':
                resData = CommonFnUtil.emptyTrash();
                break;
            case 'restore':
                resData = CommonFnUtil.recoverTrashDocument( docUID, folderUID);
                break;
        }

        setTimeout(() => {
            if( resData) { 
                setAlertDialog( '', null);
            }
        }, (1000));
    };

    // const deleteContentRows = ['문서','기능 설정 문서','폴더'];
    // const deleteContentRows = new Map()
    //     .set('docCnt', '문서')
    //     .set('funcCnt', '기능 설정 문서')
    //     .set('folderCnt', '폴더')

    // const getContentTypeCtn = () => {
    //     let responseData: any = {};
    //     let docCnt = 0;
    //     let funcCnt = 0;
    //     let folderCnt = 0;

    //     const currentTarget = alertDialogState.alertItem.data;

    //     if( currentTarget && ( currentTarget.important || currentTarget.security_key || currentTarget.share_type !== 0)) {
    //         funcCnt++;
    //     }
    //     else {
    //         currentTarget.doc_type === '0' ? docCnt++ : folderCnt++ ;
    //     }

    //     responseData = [{"문서":docCnt}, 
    //                     {"기능 설정 문서":funcCnt}, 
    //                     {"폴더":folderCnt}
    //                 ];
        
    //     result = responseData;
    // };

    const deleteContentRowCtn = () => {

    };

    return (
        <View>
            { alertDialogState && alertDialogState.alertName !== '' && alertDialogState.alertItem.alertType !== 'Trash' &&
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

            {/* 삭제 관련 alert dialog 분기 (삭제/영구삭제/복원/휴지통 비우기) */}
            { alertDialogState && alertDialogState.alertName === 'alert' && alertDialogState.alertItem.alertType === 'Trash' &&
                <Dialog.Container contentStyle={ style.container} footerStyle={{ backgroundColor:'#e5edf7'}} visible={true}>
                    <Dialog.Title>알림</Dialog.Title>

                    { alertDialogState.alertItem.menuNM === 'deleteFile' ?
                        <View style={ style.deleteContainer}>
                            <Dialog.Description style={{ padding:5, fontSize:14, marginBottom:5}}>{ alertDialogState.alertItem.description[0]}</Dialog.Description>
                            <View style={ style.deleteContent}>
                                {/* 1. 건수 체크하는 함수 생성 / 2.map 함수로 생성 / 3. 1번에서 받은 resData로 건수 뿌려주기 */}
                                <View style={ style.deleteContentRow}>
                                    <Text>문서</Text>
                                    <Text>0 건</Text> 
                                </View>
                                <View style={ style.deleteContentRow}>
                                    <Text>기능 설정 문서</Text>
                                    <Text>0 건</Text>
                                </View>
                                <View style={ style.deleteContentRow}>
                                    <Text>폴더</Text>
                                    <Text>0 건</Text>
                                </View>
                                {/* <>
                                { !CommonUtil.objectIsNull( selectedTargetState.selectedTarget) && getContentTypeCtn()}
                                { deleteContentRows.map(( Item: any, index: number) => {
                                        <View style={ style.deleteContentRow}>
                                            <Text>{ Item}</Text>
                                            <Text>{ result[index][Item]}</Text> 
                                        </View>
                                    })
                                }
                                </> */}
                            </View>
                            <Dialog.Description style={[ style.deleteDescription, { color:'red'}]}>{ alertDialogState.alertItem.description[1]}</Dialog.Description>
                            <Dialog.Description style={ style.deleteDescription}>{ alertDialogState.alertItem.description[2]}</Dialog.Description>
                        </View>
                        :
                        <View style={[ alertDialogState.alertItem.menuNM !== 'restore' && { marginBottom:10} ,{ height:50}]}>
                            { alertDialogState.alertItem.description.map(( Item:any, index: number) => {
                                    return(
                                        <Dialog.Description key={ Item+index} style={( alertDialogState.alertItem.menuNM === 'empty' && index === 1) && { color:'red'}}>{ Item}</Dialog.Description>
                                    )
                                })
                            }
                        </View>
                    }
                    <Dialog.Button label="취소" onPress={ onClickCancel}/>
                    <Dialog.Button label="확인" onPress={ onClickDeleteConfirm.bind( this, alertDialogState.alertItem.menuNM)}/>

                </Dialog.Container>
            }
        
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
    },
    deleteContainer: {
        height: 260, 
        padding: 20, 
        borderTopWidth: 1,
        borderTopColor: '#dedede'
    },
    deleteContent: {
        width:200, 
        height: 100, 
        padding:20, 
        marginTop:0, 
        marginBottom:0, 
        marginLeft:'auto', 
        marginRight:'auto', 
        borderWidth:1,
        borderColor:'#dedde3',
    },
    deleteContentRow: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginBottom:5,
    },
    deleteDescription: {
        padding: 5, 
        fontSize: 12,
        borderWidth: 1,
        borderColor:'#f2f2f7'
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