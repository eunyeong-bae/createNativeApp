import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { homeStyleSheet} from './style/style';
import SvgIcon from '../component/svgIcon/SvgIcon';
import CommonUtil from '../utils/CommonUtil'

interface HomeHeaderInfo {
    homeHeaderMenuInfo : any,
    userData : any,
    navigation : any,
    route : any
}

const HomeHeader = ( props : HomeHeaderInfo) => {
    const { homeHeaderMenuInfo, navigation, route, userData} = props;
    
    return (
        <View style={ homeStyleSheet.homeHeaderContainer}>
            <View style={ homeStyleSheet.leftMenuContainer}>
                { !CommonUtil.objectIsNull( userData) &&
                    <>
                        <View style={{ marginRight: 8}}>
                            <SvgIcon name="NoProfile" width={28} height={28}/>
                        </View>
                        <View>
                            <Text>{userData.empName}</Text>
                            <Text>{userData.deptName}</Text>
                        </View>
                    </>
                }
            </View>
            <View style={ homeStyleSheet.rightMenuContainer}>
                <SvgIcon name="TopSearchBIcon" width={22} height={22} />
                <TouchableOpacity onPress={ CommonUtil.objectIsNull(homeHeaderMenuInfo['titleInfo'][3]) ? null : homeHeaderMenuInfo['titleInfo'][3].onPressEvent}>
                    <Text style={{ marginLeft: 8}}>로그아웃</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeHeader;