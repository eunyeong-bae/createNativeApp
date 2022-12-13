import { CommonContext } from '../context/CommonContext';
import { AppScreens } from '../navigation';
import React, { useContext, useMemo } from 'react';
import { Modal, ModalContent } from 'react-native-jsmodal';
import { CopyDialog} from '../dialog/copyDialog';
import { MoveDialog} from '../dialog/MoveDialog';
import { UserInfoDialog } from '../dialog/UserInfoDialog';
import { DocInfoDialog} from '../dialog/DocInfoDialog';
import { DocHistory} from '../dialog/DocHistory';
import { TagDialog} from '../dialog/TagDialog';
import { SecurityDialog} from '../dialog/SecurityDialog';
import CommonUtil from '../utils/CommonUtil'

export const ModalDialog = () => {
    const { centerDialogState} = useContext( CommonContext);

    return useMemo(() => (
        <Modal
            //isVisible Props에 State 값을 물려주어 On/off control
            visible={ !CommonUtil.strIsNull( centerDialogState.dialogName)}
            useNativeDriver={ true}
            // hideModalContentWhileAnimating={ true}
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
                { centerDialogState.dialogName === AppScreens.DocInfoDialog &&
                    <DocInfoDialog />
                }
                { centerDialogState.dialogName === AppScreens.DocHistory &&
                    <DocHistory />
                }
                { centerDialogState.dialogName === AppScreens.TagDialog &&
                    <TagDialog />
                }
                { centerDialogState.dialogName === AppScreens.SecurityDialog &&
                    <SecurityDialog />
                }
            </ModalContent>
        </Modal>
    ), [ centerDialogState])
}