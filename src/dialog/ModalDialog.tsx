import { CommonContext } from '../context/CommonContext';
import {Dimensions, Text, View} from 'react-native';
import { AppScreens } from '../navigation';
import React, { useContext, useEffect, useMemo } from 'react';
import { Modal, ModalContent } from 'react-native-modals';
import { CopyDialog} from '../dialog/copyDialog';
import { MoveDialog} from '../dialog/MoveDialog';
import { UserInfoDialog } from '../dialog/UserInfoDialog';
import CommonUtil from '../utils/CommonUtil'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const ModalDialog = () => {
    const { centerDialogState} = useContext( CommonContext);

    return useMemo(() => (
        <Modal
            //isVisible Props에 State 값을 물려주어 On/off control
            visible={ !CommonUtil.strIsNull( centerDialogState.dialogName)}
            useNativeDriver={ true}
            hideModalContentWhileAnimating={ true}
            // onBackdropPress={ this.onClickClose}
            style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 400, width: 400, margin: 0, zIndex: 9999}}
        >{console.log( centerDialogState.dialogName)}
            <ModalContent style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0}}>
                { centerDialogState.dialogName === AppScreens.CopyDialog &&
                    <CopyDialog />
                }
                { centerDialogState.dialogName === AppScreens.MoveDialog &&
                    <MoveDialog />
                }
                { centerDialogState.dialogName === AppScreens.UserInfoDialog &&
                    <UserInfoDialog />
                }
            </ModalContent>
        </Modal>
    ), [ centerDialogState]);
}