import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const dialogStyles = StyleSheet.create({
    container: {
        width: width - 10,
        height: height - 240,
        backgroundColor:'#ffffff',
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
        backgroundColor: '#ffffff',
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
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    docBoxList: {
        paddingTop: 14,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        height: '100%',
        justifyContent:'center',
    },
    selectedTextStyle: {
        color: '#000000'
    },
    sharedTextStyle: {
        borderWidth:1, 
        borderColor:'red',
        fontSize: 14,
        padding:3,
        borderRadius: 10,
    },
    docBoxListText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#bbbbbb'
    },

});