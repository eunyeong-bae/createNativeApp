import React from 'react';
import { View, Text} from 'react-native';
import { ModalDialog } from '../dialog/ModalDialog';
import ActionMenu from '../menu/ActionMenu';
import AlertDialog from '../alertDialog/AlertDialog';
import Toast, { BaseToast, ErrorToast} from 'react-native-toast-message';
import FloatingMenu from '../menu/FloatingMenu';
// import Dialog from '../dialog';
// import ActionMenuClass from '../menu';
// import ReViewDoc from '../dialog/ReViewDoc'

const toastConfig = {
    success: ( props : any) => (
        <BaseToast 
            {...props}
            style={{ borderLeftColor: 'pink' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
              fontSize: 15,
              fontWeight: '400'
            }}
        />
    ),

    error: ( props : any) => (
        <ErrorToast
            {...props}
            text1Style={{
            fontSize: 17
            }}
            text2Style={{
            fontSize: 15
            }}
        />
    ),

    /**
     * custom toast msg
     * @param param0 text1, props
     * @returns toast message
     * 
        tomatoToast: ({ text1, props }:any) => (
            <View style={{ height: 60, width: '100%', backgroundColor: 'blue' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
            </View>
        )
    */
};

export default function CommonState(){
    return(
        <>
            {/* <ReViewDoc /> 미리보기(썸넬)
            <Dialog /> 
            
            * 밑에 아이들이 렌더 될 때마다 최상단 애들도 같이 렌더링 됌 이를 방지하기 위해 하위 컴포넌트에서 useMemo로 최적화 시켜줌, 
            */}
            <ModalDialog />
            <AlertDialog />
            <ActionMenu />
            <FloatingMenu />
            <Toast config={ toastConfig}/>
        </>
    )
}