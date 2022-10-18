import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { homeStyleSheet} from './style/style'
import SvgIcon from '../component/svgIcon/SvgIcon';

interface HomeHeaderMenuInfo {
    menuInfo : any,
    navigation : any,
    route : any
}

const HomeMenu = ( props : HomeHeaderMenuInfo) => {
    const { menuInfo, navigation} = props;
    return (
        <View style={ homeStyleSheet.homeMenuContaier}>
            <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator = {true}
            >
                <View style={homeStyleSheet.homeMenuContaierView}>
                    { menuInfo.map(( homeMenu : any) => {
                        return(
                            <View key={homeMenu.id} style={ [homeStyleSheet.homeMenuContaierItem, {width: homeMenu.parentWidth}]}>
                                <TouchableOpacity onPress={()=>{ navigation.push( homeMenu.navigation)}} style={{alignItems:'center'}}>
                                    <SvgIcon name={homeMenu.id} width={homeMenu.width} height={homeMenu.height} />
                                    <Text style={ homeStyleSheet.homeMenuContaierItemText}>{homeMenu.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                      })
                    }
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeMenu;