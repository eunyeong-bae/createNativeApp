import React from 'react';
import {StyleSheet,Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const MyDocStyles = StyleSheet.create({
    docListContainer:{
        width:windowWidth, 
        height:windowHeight - 100,
        padding:5,
        marginHorizontal:5,
        flex:1,
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

export const MyDocListViewStyles = StyleSheet.create({
    docListContainer:{
        width:windowWidth - 20,
        height:60,
        padding:10,
        flexDirection:'row',
        backgroundColor:'#ffffff',
        borderRadius:10,
        marginBottom:5,
        marginTop:5,
        justifyContent:'space-between',
        alignItems:'center',
        shadowColor:'#727472',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity: 0.25,
        shadowRadius:3.84,
        elevation:5,
    },
    docListStyle: { 
        width: windowWidth - 80, 
        flexDirection:'row', 
        alignItems:'center'
    },
    ThumImg: {
        width:25,
        height:25,
    },
    docInfo:{
        marginLeft: 10,
    },
    title: {
        fontWeight:'bold',
    },
    text: {
        color:'#666666',
        marginTop:5,
    }
})