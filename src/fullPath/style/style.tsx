import { StyleSheet, Dimensions} from 'react-native';

export const fullPathStyleSheet = StyleSheet.create({
    fullPathContaier : {
        height: 45,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    startBlurEffect : {
        width: 12
    },
    endBlurEffect : {

    },
    fullPathContent : {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fullPathText : {
        fontSize: 17
    },
    fullPathLastText : {
        fontSize: 17,
        fontWeight: 'bold'
    },
    fullPathNextIcon : {
        marginLeft: 4,
        marginRight: 4
    }
})