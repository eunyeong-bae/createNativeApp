import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const sortMenuStyles = StyleSheet.create({
    sortTitle:{
        width:windowWidth,
        height:20,
        paddingLeft:10,
        justifyContent:'center',
        alignContent:'center',
    },
    container: {
        width: windowWidth,
        height:50,
        padding:10,
        flexDirection:'row',
    },
    menuIconCon: {
        width:30,
        height:30,
        paddingLeft:3
    },
    menuTextCon: {
        width: windowWidth - 50,
        paddingTop:5,
    }
});

export const moreMenuStyles = StyleSheet.create({
    menuContainer: {
        width:'100%',
        flexDirection: 'row'
    },
    container: {
        width: windowWidth/4.5,
        margin:5,
        // borderWidth:1,
        // borderColor:'red'
    },
    menuIconContainer: {
        height:50,
        paddingTop:5,
        justifyContent:'center',
        // borderWidth:1,
        // borderColor:'blue'
    },
    menuItemContainer: {
        justifyContent:'center', 
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'pink'
    }
});
// export const moreMenuStyles = StyleSheet.create({
//     container: {
//         width: '100%',
//         height:50,
//         paddingLeft:5,
//         paddingRight:5,
//         paddingTop:5,
//         flexDirection:'row',
//         justifyContent:'center',
//         alignItems:'center',
//         borderWidth:1,
//         borderColor:'red'
//     },
//     menuIconContainer: {
//         width:30,
//         height:30,
//         justifyContent:'center',
//         alignItems:'center',
//         marginRight:5,
//         borderWidth:1,
//         borderColor:'blue'
//     },
//     menuContainer: {
//         width: windowWidth - 70,
//         height: 40,
//         justifyContent:'center',
//         borderWidth:1,
//         borderColor:'pink'
//     },
//     menuTextCon: { 
//         flexDirection:'row',
//         justifyContent:'space-between',
//         borderWidth:1,
//         borderColor:'yellow'
//     },
// });

export const sortMenuStyleSheet = StyleSheet.create({
    sortItemContainer : {
        width: '100%',
        maxHeight: 244,
    },
    sortMainItem : {
        paddingLeft: 10,
        height: 48,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f5f8',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'space-between'

    },
    sortItemText : {
        color: '#000', 
    },
    disableText: {
        color: '#999'
    }
});