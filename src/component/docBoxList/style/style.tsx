import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const dialogStyles = StyleSheet.create({
    container: {
        width: width - 10,
        height: height - 240,
        // backgroundColor:'#ffffff',
    },
    header:{
        width:'100%',
        height:40,
    },
    mainContainer: {
        width:'100%',
        height: height - 300,
    },
    folderListContainer: {
        width: '100%',
        height: height - 420,
        // backgroundColor: '#ffffff',
        paddingLeft:4,
        paddingTop: 5,
    },
    docBoxListContainer: {
        width:'100%', 
        height:45, 
        flexDirection:'row', 
        justifyContent:'space-around',
        paddingLeft:10,
        paddingRight:10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#DCE7FB', //#E4ECF9
        backgroundColor:'#fff',
        borderRadius: 10,
    },
    docBoxList: {
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        // paddingTop: 14,
        // paddingLeft: 10,
        // paddingRight: 10,
        // paddingBottom: 10,
        height: '100%',
        // borderRadius:100,
        justifyContent:'center',
        // borderWidth:1,
    },
    selectedTextStyle: {
        color: '#0b68a1',
        fontWeight: 'bold',
        fontSize: 16
    },
    sharedTextStyle: {
        fontSize: 14,
        padding:3,
        borderRadius: 10,
    },
    docBoxListText: {
        marginLeft:5,
        fontSize: 14,
        fontWeight: '600',
        color: '#bbbbbb'
    },

});