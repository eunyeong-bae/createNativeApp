import React from 'react';
import {StyleSheet,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//모든 문서함 스타일
export const MyDocStyles = StyleSheet.create({
    safeAreaStyle: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#EFF3FB',
    },
    docMainContainer: {
        width: windowWidth - 20,
        height: windowHeight - 100, 
        // borderWidth:1,
        flex:1, 
        // justifyContent:'center', 
        // alignItems:'center', 
        padding:5, 
        marginLeft:10, 
        backgroundColor:'#EFF3FB',
    },
    textInputStyle:{
        width:'100%', 
        height:40, 
        padding:10, 
        marginTop:5,
        borderWidth:1, 
        borderColor:'#EFF3FB',
        borderRadius:10, 
        backgroundColor:'#fff', 
    },
    docListContainer:{
        width: '100%', 
        height: windowHeight - 241,
        marginTop:8,
        borderWidth:1,
        borderRadius:10,
        borderColor:'#DCE7FB',
        backgroundColor:'#fff',
    },
    docListOpen: {
        height: windowHeight - 410,
    },
    docContainer: {
        width: 160,
        height:180,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        borderRadius:6,
        backgroundColor:'#ffffff',
    },
    docThumImg:{
        width:'100%',
        height:100,
        justifyContent:'center',
        flexDirection:'row',
    },
    folderThumImg:{
        width:'100%', 
        height:100,
        justifyContent:'space-between',
        flexDirection:'row',
    },
    docTitle: {
        // alignSelf:'flex-start',
        padding:5,
        backgroundColor:'#f4fbff',
        width:'100%',
        height:80,
        borderBottomLeftRadius:6,
        borderBottomRightRadius:6,
        justifyContent:'space-between',
    },
    title:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:3
    },
    text: {
        color:'#666666',
        fontSize:13,
    }
});

//commonMovePath.tsx & DefaultListItem.tsx
export const MyDocListViewStyles = StyleSheet.create({
    docListContainer:{
        width: windowWidth - 45,
        height:60,
        padding:10,
        margin:5,
        flexDirection:'row',
        // borderColor:'#DCE7FB',
        // borderWidth:1,
        backgroundColor:'#fff',
        borderWidth:1,
        borderColor:'#DCE7FB',
        borderRadius:10,
        // marginBottom:5,
        // marginTop:5,
        justifyContent:'space-between',
        alignItems:'center',
        // shadowColor:'#727472',
        // shadowOffset:{
        //     width:0,
        //     height:2
        // },
        // shadowOpacity: 0.25,
        // shadowRadius:3.84,
        // elevation:5,
    },
    docListStyle: { 
        width: windowWidth - 80, 
        flexDirection:'row', 
        alignItems:'center',
    },
    ThumImg: {
        width:25,
        height:25,
    },
    docInfo:{
        marginLeft: 10,
    },
    title: {
        width:250,
        fontWeight:'bold',
    },
    text: {
        color:'#666666',
        marginTop:2,
    }
})