import React, { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
    { title: 'ONEFFICE', name: 'Home', icon: {ON : "OnefficeOn", OFF: "OnefficeOff"}, navi: AppScreens.Home},
    { title: '내문서함', name: 'MyDoc', icon: {ON : "MyDocOn", OFF: "MyDocOff"}, navi: AppScreens.MyDoc},
    { title: '공유문서함', name: 'ShareDoc', icon: {ON : "SharedDocOn", OFF: "SharedDocOff"}, navi: AppScreens.ShareDoc},
    { title: '공유한 문서함', name: 'SharedDoc', icon: {ON : "SharedDocOn", OFF: "SharedDocOff"}, navi: AppScreens.ShareDoc},
    { title: '공유받은 문서함', name: 'BeSharedDoc', icon: {ON : "SharedDocOn", OFF: "SharedDocOff"}, navi: AppScreens.ReceivedShareDoc},
    { title: '중요문서함', name: 'FavoriteDoc', icon: {ON : "ImportantDocOn", OFF: "ImportantDocOff"}, navi: AppScreens.FavoriteDoc},
    { title: '보안문서함', name: 'SecurtyDoc', icon: {ON : "SecurityDocOn", OFF: "SecurityDocOff"}, navi: AppScreens.SecurityDoc},
    { title: '휴지통', name: 'TrashDoc', icon: {ON : "TrashDocOn", OFF: "TrashDocOff"}, navi: AppScreens.TrashDoc},
];

interface CommonDocBoxListProps { 
    navigation: any,
    isActive: any,
    setIsActive: any,
}

const CommonDocBoxList = ( props : CommonDocBoxListProps) => {
    const { navigation, isActive, setIsActive} = props;
    const { sortMenuState, setSortMenu, setTargetFullPath} = useContext( CommonContext);

    const scrollViewRef = useRef<ScrollView>(null);
    const [scorllIndex,setScrollIndex] = useState(0);

    // useEffect(() => {
    //     console.log('test');
    //     console.log(scrollViewRef?.current);
    //     let index = -1;
    //     let resultIndex = 0;
    //     for(let i = 0; i<DOCUMENT_BOX_LIST.length; i++){
    //         if(isActive[DOCUMENT_BOX_LIST[i].name] && sortMenuState.contextName == DOCUMENT_BOX_LIST[i].name){
    //             index = i;
    //             break;
    //         }
    //     }
    //     console.log(index);
    //     console.log(scorllIndex);
    //     resultIndex = index || scorllIndex;
    //     if(index > -1){
    //         scrollViewRef.current?.scrollTo({x: 100*index, y: 0, animated: false});
    //     }
        
    //     setScrollIndex(resultIndex);
        
    // },[isActive]);

    const onClickDocBox = ( title: any, name: string, navi: any) => {

        setIsActive({
            'Home': name === 'Home' ,
            'MyDoc': name === 'MyDoc',
            'ShareDoc': name === 'ShareDoc',
            'FavoriteDoc': name === 'FavoriteDoc',
            'SecurtyDoc': name === 'SecurtyDoc',
            'TrashDoc': name === 'TrashDoc',
        });

        setSortMenu( name,  { sortItem:'', fileTypes:'', sortOrder:''}, null);
        setTargetFullPath( [''], [title], null);

        scrollViewRef?.current?.flashScrollIndicators();
        
        navigation.navigate( navi);
    };

    return useMemo(() => (
        <>
            {/* {console.log(isActive)} */}
            <View style={ dialogStyles.docBoxListContainer}>
                <ScrollView horizontal={ true} showsHorizontalScrollIndicator={ false} ref={ scrollViewRef}>
                { !CommonUtil.objectIsNull( DOCUMENT_BOX_LIST) ?
                    DOCUMENT_BOX_LIST.map( list => {
                        // { console.log( list)}
                        return (
                            <TouchableOpacity key={ list.title} onPress={ onClickDocBox.bind( this, list.title, list.name, list.navi)}>
                                <View style={ dialogStyles.docBoxList}>
                                    <SvgIcon name={ isActive[list.name] ? list.icon.ON :list.icon.OFF} width={16} height={16} />
                                    <Text style={ sortMenuState.contextName === list.name ? dialogStyles.selectedTextStyle : dialogStyles.docBoxListText}>
                                        { list.title}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                    :
                    null
                }
                </ScrollView>
            </View>
        </>
    ), [ sortMenuState.contextName])
};

export default CommonDocBoxList;