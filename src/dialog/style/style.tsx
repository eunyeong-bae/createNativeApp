import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const dialogStyles = StyleSheet.create({
    container: {
        width: width - 30,
        height: height - 240,
        backgroundColor:'#EFF3FB',
        alignItems:'center',
        // borderWidth:1,
        // borderColor:'red'
        // backgroundColor:'white',
    },
    header:{
        width:'100%',
        height:40,
    },
    folderListContainer: {
        width: width - 50,
        height: height - 400,
        // marginTop: 10,
        paddingTop: 10,
        // borderWidth:1,
        // borderColor:'blue'
    },
    docBoxListContainer: {
        width: width-50, 
        height:50, 
        flexDirection:'row', 
        justifyContent:'space-around',
        borderWidth: 1,
        borderColor: '#DCE7FB', //#E4ECF9
        backgroundColor:'#fff',
        borderRadius: 10
    },
    docBoxList: {
        paddingTop: 14,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    docBoxListText: {
        fontSize: 17,
        fontWeight: '600',
    },
});