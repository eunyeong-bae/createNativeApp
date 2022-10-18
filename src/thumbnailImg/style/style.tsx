import {StyleSheet} from 'react-native';

export const thumbNailStyleSheet = StyleSheet.create({
    thumbNailImgContaier : {
        width: 140,
        height: 100, 
    },
    thumbNailImgView : {
        width: 130,
        height: 100,
        justifyContent:'center',
        alignItems:'center',  
    },
    //로컬이미지
    thumbNailImgSrc : {
        width: 70,
        height: 70,
    },
    //서버이미지
    thumbNailImgSub : {
        maxHeight: '100%',
        maxWidth: '100%',
        borderWidth: 1,
        borderColor: '#e4e8ef',
        borderRadius: 4,
    },
    thumbLocalView:{
        width:138,
        justifyContent:'center',
        alignItems:'center',
    },

    thumbNailExtLabel : {
        width: 48,
        height: 16,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbNailExtLabelText : {
        fontSize: 9,
        fontWeight: 'bold',
        color: '#fff'
    },
})