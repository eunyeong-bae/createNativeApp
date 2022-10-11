import { StyleSheet, Dimensions} from 'react-native';

export const sortMenuStyleSheet = StyleSheet.create({
    sortTitleContaier : {
        width: '100%',
        height: 47,
        backgroundColor: '#ecf2fa',
        paddingLeft: 18,
        paddingRight: 18,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    sortTitleLeftView : {
        justifyContent: 'center',
        height: 47,
        width: '80%'
    },
    sortTitleLeftViewText : {
        fontSize: 14,
        letterSpacing: -0.7,
        height: 20,
        lineHeight: 24
    },
    sortTitleRightView : {
        justifyContent: 'center',
        width: '20%',
        alignItems: 'flex-end'
    },
    sortTitleRightViewIconView : {
        height: 47,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})

export const actionMenuStyleSheet = StyleSheet.create({
    actionMenuItem : {
        width: '100%',
        height: 62
    },
    actionMenuLineBox : {
        height: 61,
        marginLeft: 18,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    actionMenuItemContent : {
        flexDirection: 'row',
        alignItems: 'center',
        height: 61
    },
    actionMenuSubItem : {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: (Dimensions.get('window').width - 84) / 2
    },
    actionMenuTitleContaier : {
        width: '100%',
        flexDirection: 'column'
    },
    actionMenuTitleIconContent : {
        height: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    actionMenuTitleIcon : {
        height: 5,
        width: 30,
        backgroundColor: '#d8d9dd',
        borderRadius: 100
    },
    actionMenuTitleTextContent : {
        height: 28,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 18,
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionMenuTitleText : {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 2
    },
    actionMenuItemTitle : {
        fontSize: 16,
        marginLeft: 8,
        width: (Dimensions.get('window').width - 84) / 2
    },
    actionMenuSubItemShareText : {
        fontWeight: 'bold',
        fontSize: 16
    },
    actionMenuShareCountContainer : {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionMenuShareCountContent : {
        height: 16,
        backgroundColor: '#3c77ea',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        minWidth: 25,
        marginRight: 8
    },
    actionMenuShareCountText : {
        color: '#fff',
        fontSize: 10
    }
})