import { StyleSheet, Dimensions} from 'react-native';

export const homeStyleSheet = StyleSheet.create({
    homeHeaderContainer : {
        width: '100%',
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingLeft: 18,
        paddingRight: 18
    },
    homeHeaderTitle : {
        width: '100%',
        height: 24,
        marginTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 18,
        paddingRight: 18
    },
    homeHeaderTitleItem : {
        width: '15%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    homeHeaderImg : {
        width: '100%',
        height: '100%'
    },
    homeMenuContaier : {
        height: 100
    },
    homeMenuContaierView : {
        paddingLeft: 14,
        paddingRight: 14,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignContent: 'center'
    },
    homeMenuContaierItem : {
        marginLeft: 3,
        marginRight: 3,
        height: 88,
        // width: 72,
        alignItems: 'center'
    },
    homeMenuContaierItemText : {
        color: '#222',
        fontSize: 13,
        height: 20,
        lineHeight: 24,
        textAlign: 'center',
        marginTop: 6
    },
    homeContentsContaiter : {
        height: '100%',
        backgroundColor: '#ecf2fa'
    },
    leftMenuContainer : {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightMenuContainer : {
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    homeMainContent : {
        backgroundColor: '#fff',
        height: Dimensions.get('window').height,
        maxHeight: Dimensions.get('window').height,
        flexDirection: 'column',
        flex: 3,
        marginLeft: 10,
        marginRight: 10
        // borderWidth: 1
    },
    homeMainContentColumn : {
        width: '100%', 
        height: '33%',
        flexDirection: 'row',
        // borderWidth: 1
    },
    homeMainContentRow : {
        height: '100%',
        width: '50%',
        padding: 5,
        // borderWidth: 1
    },
    homeContent : {
        width: '100%',
        height: '100%',
        padding: 5,
        borderRadius: 10,
        overflow: 'hidden',
        borderColor: '#e9e9e9',
        borderWidth: 1
    },
    homeContentTop : {
        height: 25,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#e9e9e9',
        borderBottomWidth: 1
    },
    homeContentList : {
        overflow: 'hidden'
    },
    homeContentTopLeft : {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    homeContentTopRight : {
        width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }

})