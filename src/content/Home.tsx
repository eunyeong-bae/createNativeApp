import React, { useState, useLayoutEffect, useMemo, useRef, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput} from 'react-native';
import { CommonHeader} from '../component/header/index';
import CommonDocBoxList from '../component/docBoxList/CommonDocBoxList';
import { MyDocStyles} from './style/style';
import useDocList from '../hooks/useDocList';
import CommonFlatList from '../component/CommonFlatList';
import FloatingMenu from '../menu/FloatingMenu';
import CommonUtil from '../utils/CommonUtil';
import { CommonContext } from '../context/CommonContext';
import CommonMovePath from '../component/CommonMovePath';


const HomeMenuInfo : any = {    
    'headerInfo' : {
        //롱클릭 시, visibility : true 로 변경? 해준다는 가정하에 일단 작성
        leftBtn : [
            {iconName : 'CommonCloseBtn', visibility : false},
        ],
        rightBtn: [
            {iconName: 'CheckAllBtnOff', visibility: true},
            {iconName: 'CheckAllBtnOn', visibility: false},
            {iconName :'CommonSearchBtn', visibility : true},
        ],
        centerText: {
            title : ' 개 선택 | ',
            selectAllBtn : '전체 선택',
            unselectAllBtn : '전체 해제',
        }
    }
};

const CONTEXT_NAME = "Home";

const Home = ( props : any) => {    
    const { navigation} = props;
    const { sortMenuState, setSortMenu, centerDialogState, targetFullPathState, setTargetFullPath} = useContext( CommonContext);

    const flatListRef = useRef<any>();
    
    const [ isLoading, setLoading] = useState( false); //문서 리스트 추가 호출 시 사용
    const { reqListData, setDataList} = useDocList({
        folderSeq: '',
        listType: '',
        listCount: 40,
        pageNum : 1,
        sortItem : '1',
        sortOrder : 'd',
        fileTypes: '',
        dataList: [],
        includeFolder: true,
        includeDoc: true,
        contextName: CONTEXT_NAME
    });

    //딱 한번 실행 됌 
    useLayoutEffect( () => {
        if( CommonUtil.strIsNull( sortMenuState.contextName) || sortMenuState.contextName !== CONTEXT_NAME) {
            setSortMenu( CONTEXT_NAME, null, null);
        }
    }, []);

    useEffect(() => {
        if(sortMenuState.contextName && sortMenuState.contextName == CONTEXT_NAME) {
            setDataList({ ...reqListData, pageNum: 1, dataList: []});
            // flatListRef.current?.scrollToOffset({ animated: false, offset: 0 }); //스크롤 초기화
        }
    }, [ sortMenuState]);

    const onEndReached = async() => {
        if( isLoading) {
            return;
        }
        else {
            setLoading(true);
            setDataList({...reqListData, pageNum: reqListData.pageNum + 1});
        }
    }
    
    return useMemo(() => (
        <SafeAreaView style={ MyDocStyles.safeAreaStyle}>
            <View style={[ MyDocStyles.docMainContainer, {marginTop:5}]}>
                <CommonHeader
                        headerName = { 'ONEFFICE'} 
                        multiSelectedState = { null}
                        setMultiSelected = { null}
                        headerMenuInfo={ HomeMenuInfo.headerInfo}
                        contextName={ CONTEXT_NAME}
                        headerDataInfo={ null}
                        navigation = { navigation}
                        sortMenu = { null}
                        ViewModeCheck={ null}
                />

                <CommonDocBoxList navigation={ navigation} />
                
                <TextInput style={ MyDocStyles.textInputStyle} placeholder="Search" />
                
                <View style={{width:'100%', paddingTop:15, paddingLeft:8, flexDirection:'row', alignItems:'center' }}>
                    <Text style={{ fontWeight:'bold', fontSize: 15, paddingLeft:5, color:'#75b9f4' }}>최근 조회 문서</Text>
                </View>

                <View style={ MyDocStyles.docListContainer}>
                    { reqListData.dataList.length > 0 ? 
                            <>
                                { centerDialogState && targetFullPathState.fullPathUIDs.length > 1 &&
                                    <CommonMovePath targetFullPathState={ targetFullPathState} setTargetFullPath={ setTargetFullPath} />
                                }
                                <CommonFlatList 
                                    flatListRef ={ flatListRef}
                                    reqListData ={ reqListData}
                                    listViewMode={ null}
                                    navigation={ navigation}
                                    onEndReached={ onEndReached}
                                />
                            </>
                        : 
                            <Text>등록된 문서가 없습니다.</Text>
                    }
                </View>

                <FloatingMenu />
            </View>
        </SafeAreaView>
    ), [ reqListData.dataList]);
}

export default Home;