import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView} from 'react-native';
import { dialogStyles} from './style/style';
import CommonUtil from '../../utils/CommonUtil';
import { AppScreens} from '../../navigation';
import { CommonContext } from '../../context/CommonContext';
import SvgIcon from '../../component/svgIcon/SvgIcon';

/**
 * listType : String ( 검색 타입 * 필수 )
    - 1 공유 한
    - 2 공유 받은 
    - 3 공유한/공유받은
    - 4 중요문서함
    - 5 보안문서함
    - 6 본인 문서
    - 이외 폴더 조회
 */

const DOCUMENT_BOX_LIST = [ //MAP
    { title: 'ONEFFICE', name: 'Home', icon: {ON : "OnefficeOn", OFF: "OnefficeOff"}},
    { title: '내문서함', name: 'MyDoc', icon: {ON : "MyDocOn", OFF: "MyDocOff"}},
    { title: '공유문서함', name: 'ShareDoc', icon: {ON : "SharedDocOn", OFF: "SharedDocOff"}},
    { title: '공유한 문서함', name: 'SharedDoc', icon: {ON : "SharedDocOn", OFF: "SharedDocOff"}},
    { title: '공유받은 문서함', name: 'BeSharedDoc', icon: {ON : "SharedDocOn", OFF: "SharedDocOff"}},
    { title: '중요문서함', name: 'FavoriteDoc', icon: {ON : "ImportantDocOn", OFF: "ImportantDocOff"}},
    { title: '보안문서함', name: 'SecurtyDoc', icon: {ON : "SecurityDocOn", OFF: "SecurityDocOff"}},
    { title: '휴지통', name: 'TrashDoc', icon: {ON : "TrashDocOn", OFF: "TrashDocOff"}},
];

const CommonDocBoxList = ( props : any) => {
    const { navigation} = props;
    const { sortMenuState, setSortMenu} = useContext( CommonContext);
    const [ isActive, setIsActive] = useState({
        Home: false,
        MyDoc: false,
        ShareDoc: false,
        FavoriteDoc: false,
        SecurtyDoc: false,
        TrashDoc: false,
    });

    //app 점프만 해주니 까 리스트 불러오는 항목 필요없
    const onClickDocBox = ( docBoxNM: string, name: string) => {

        setIsActive({
            Home: false,
            MyDoc: false,
            ShareDoc: false,
            FavoriteDoc: false,
            SecurtyDoc: false,
            TrashDoc: false,
        });

        setSortMenu( '',  { sortItem:'', fileTypes:'', sortOrder:''}, null);

        switch( docBoxNM) {
            case 'ONEFFICE':
                setIsActive({
                    ...isActive,
                    Home: true
                })
                navigation.navigate( AppScreens.Home);
                break;
            case '내문서함':
                setIsActive({
                    ...isActive,
                    MyDoc: true,
                })
                navigation.navigate( AppScreens.MyDoc);
                break;
            case '공유문서함':
                setIsActive({
                    ...isActive,
                    ShareDoc: true,
                })
                navigation.navigate( AppScreens.ShareDoc);
                break;
            case '공유한 문서함':
                setIsActive({
                    ...isActive,
                    ShareDoc: true,
                })
                navigation.navigate( AppScreens.SharedDoc);
                break;
            case '공유받은 문서함':
                setIsActive({
                    ...isActive,
                    ShareDoc: true,
                })
                navigation.navigate( AppScreens.ReceivedShareDoc);
                break;
            case '중요문서함':
                setIsActive({
                    ...isActive,
                    FavoriteDoc: true,
                })
                navigation.navigate( AppScreens.FavoriteDoc);
                break;
            case '보안문서함':
                setIsActive({
                    ...isActive,
                    SecurtyDoc: true,
                })
                navigation.navigate( AppScreens.SecurityDoc);
                break;
            case '휴지통':
                setIsActive({
                    ...isActive,
                    TrashDoc: true,
                })
                navigation.navigate( AppScreens.TrashDoc);
                break;
            default:
                return;
        }
    };

    return (
        <>
                {/* {console.log(isActive)} */}
                <View style={ dialogStyles.docBoxListContainer}>
                    <ScrollView horizontal={ true} showsHorizontalScrollIndicator={ false}>
                    {
                        !CommonUtil.objectIsNull( DOCUMENT_BOX_LIST) &&
                        DOCUMENT_BOX_LIST.map( list => {
                            // { console.log( list)}
                            return (
                                <TouchableOpacity key={ list.title} onPress={ onClickDocBox.bind( this, list.title, list.name)}>
                                    <View style={ dialogStyles.docBoxList}>
                                        <SvgIcon name={ isActive[list.name] ? list.icon.ON :list.icon.OFF} width={18} height={18} />
                                        <Text 
                                            style={[ dialogStyles.docBoxListText, 
                                                        sortMenuState.contextName === list.name && dialogStyles.selectedTextStyle,
                                                        (list.name === 'SharedDoc' || list.name === 'BeSharedDoc') && dialogStyles.sharedTextStyle ]}>
                                            { list.title}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </ScrollView>
                </View>
        </>
    )
};

export default CommonDocBoxList;