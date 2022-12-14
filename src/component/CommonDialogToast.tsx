import React from 'react';
import Toast, { BaseToast, ErrorToast} from 'react-native-toast-message';

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
            style={{ borderLeftColor: 'red' }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
            fontSize: 15,
            fontWeight: '400'
            }}
        />
    ),
};

export const CommonDialogToast = () => {
    return (
        <Toast config={ toastConfig} />
    )
}