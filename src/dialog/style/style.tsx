import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const dialogStyles = StyleSheet.create({
    container: {
        width: width - 10,
        height: height - 240,
        backgroundColor:'white',
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
        // padding: 5,
        backgroundColor: '#eee',
        paddingLeft:4,
        paddingTop: 5,
    },
    docBoxListContainer: {
        width:'100%', 
        height:50, 
        flexDirection:'row', 
        justifyContent:'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    docBoxList: {
        paddingTop: 14,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    docBoxListText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
});