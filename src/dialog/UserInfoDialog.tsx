import React, { useEffect, useLayoutEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import CommonHeader from '../component/header/CommonHeader';
import SvgIcon from '../component/svgIcon/SvgIcon';
import CommonUtil from '../utils/CommonUtil';
import AsyncStorage from '@react-native-community/async-storage';

const CONTEXT_NAME = 'UserInfo';
const UserInfoDialogHdInfo : any = {
    'headerInfo': {
        leftBtn : [
            {iconName : "CommonCloseBtn", visibility: true},
        ],
    }
};
// const UserInfos = new Map()
//     .set('1','이름')
//     .set('2','계정 ID')
//     .set('3','소속부문')
//     .set('4','버전정보')

const UserInfos : any = [
    { name: '이름', value: '배은영'},
    { name: '계정 ID', value: 'adcadcad'},
    { name: '소속부문', value: '솔루션사업부문'},
    { name: '버전정보', value: '4.1.9.16'},
];

export const UserInfoDialog = () => {
    const [ userInfos, setUserInfos] = useState({
        empName: '',
        compName: '',
        deptName: '',
    }); 

    useLayoutEffect(()=>{
        (async() => {
            const userData : any = await AsyncStorage.getItem( 'baseData');
            setUserInfos({
                empName: JSON.parse(userData).result.empName,
                compName: JSON.parse(userData).result.compName,
                deptName: JSON.parse(userData).result.deptName,
            });
        })();
       
    },[]);

    return (
        <View style={dialogStyles.container}>
            <CommonHeader 
                headerName = { '계정정보'}
                multiSelectedState = { null}
                setMultiSelected = { null}
                headerMenuInfo={ UserInfoDialogHdInfo.headerInfo}
                contextName={ CONTEXT_NAME}
                headerDataInfo={ null}
                navigation={ null}
                fullpath={ null}
                setFullpath={ null}
                sortMenu={ null}
            />
            <View style={ dialogStyles.mainContainer}>
                <View style={{ height:60, justifyContent:'center', alignItems:'center'}}>
                    <SvgIcon name="UserInfoICon" width={20} height={20} />
                </View>
                <View style={ dialogStyles.userListCon}>
                    <Text>{userInfos.empName}</Text>
                    <Text>{userInfos.deptName}</Text>
                    <Text>{userInfos.compName}</Text>
                {/* { !CommonUtil.objectIsNull( UserInfos) && 
                    UserInfos.map((info: any) => {
                        return (
                            <View key={ info.name} style={ dialogStyles.userList}>
                                <Text>{info.name} : </Text>
                                <Text>{info.value}</Text>
                            </View>
                        )
                    })    
                } */}
                </View>
            </View>
        </View>
    )
};

const dialogStyles = StyleSheet.create({
    container:{
        width: 200,
        height: 200,
        backgroundColor:'pink'
    },
    mainContainer: {
        height: '100%',
        borderWidth:1,
        borderColor:'red'
    },
    userListCon: {
        height: '100%',
        borderWidth:1,
        borderColor:'blue'
    },
    // userList: {
    //     height: 45,
    //     flexDirection:'row',
    //     alignItems:'center',
    //     borderWidth:1,
    //     borderColor:'black'
    // },
})