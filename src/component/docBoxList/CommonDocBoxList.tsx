import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, ScrollView} from 'react-native';
import { dialogStyles} from './style/style';
import useDocList from '../../hooks/useDocList';
import CommonUtil from '../../utils/CommonUtil';
import { AppScreens, AppScreenNavigationProp} from '../../navigation';
import { CommonContext } from '../../context/CommonContext';

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
    { title: 'ONEFFICE', name: 'Home'},
    { title: '내문서함', name: 'MyDoc'},
    { title: '공유문서함', name: 'ShareDoc'},
    { title: '공유한 문서함', name: 'SharedDoc'},
    { title: '공유받은 문서함', name: 'BeSharedDoc'},
    { title: '중요문서함', name: 'FavoriteDoc'},
    { title: '보안문서함', name: 'SecurtyDoc'},
    { title: '휴지통', name: 'TrashBin'},
];

const CommonDocBoxList = ( props : any) => {
    const { navigation} = props;
    const { sortMenuState, setSortMenu} = useContext( CommonContext);

    //app 점프만 해주니 까 리스트 불러오는 항목 필요없
    const onClickDocBox = ( docBoxNM: string, name: string) => {

        setSortMenu( name,  { sortItem:'1', fileTypes:'', sortOrder:'d'}, null);

        if( docBoxNM === 'ONEFFICE'){
            navigation.navigate( AppScreens.Home);
        } else if( docBoxNM === '내문서함'){
            navigation.navigate( AppScreens.MyDoc);
        }
    };

    return (
        <View style={ dialogStyles.docBoxListContainer}>
            <ScrollView horizontal={ true} showsHorizontalScrollIndicator={ false}>
                <>
                {
                    !CommonUtil.objectIsNull( DOCUMENT_BOX_LIST) &&
                    DOCUMENT_BOX_LIST.map( list => {
                        return (
                            <TouchableOpacity key={ list.title} onPress={ onClickDocBox.bind( this, list.title, list.name)}>
                                <View style={ dialogStyles.docBoxList}>
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
                </>
            </ScrollView>
        </View>
    )
};

export default CommonDocBoxList;