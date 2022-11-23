import React, { useContext, useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView} from 'react-native';
import { CommonHeader} from '../component/header/index';
import CommonDocBoxList from '../component/docBoxList/CommonDocBoxList';
import { MyDocStyles} from './style/style';
import CommonUtil from '../utils/CommonUtil';
import { CommonContext } from '../context/CommonContext';
import useDocList from '../hooks/useDocList';
import FloatingMenu from '../menu/FloatingMenu';
import CommonFlatList from '../component/CommonFlatList';
import CommonMovePath from '../component/CommonMovePath';
import CommonCollapsible from '../component/CommonCollapsible';

const FavoriteDocMenuInfo : any = {    
    'sortMenu' : [
        {name : '문서 제목', value: '1'},
        {name : '최종 수정 날짜', value: '2'},
        {name : '최근 조회 문서', value: '7'}
    ],
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

const CONTEXT_NAME = "FavoriteDoc";

const FavoriteDoc = ( props : any) => {
    const { sortMenuState, 
            setSortMenu, 
            targetFullPathState, 
            setTargetFullPath, 
            alertDialogState, 
            centerDialogState,
            swipeItemState} = useContext(CommonContext);
    
    const { navigation} = props;

    const flatListRef = useRef<any>();

    const [ listViewMode, setListViewMode] = useState(false);

    const [ isLoading, setLoading] = useState( false); //문서 리스트 추가 호출 시 사용
    const { reqListData, setDataList} = useDocList({
        folderSeq: '',
        listType: '4',
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
    const { sortItem, sortOrder, fileTypes} = reqListData;

    const [ isActiveAccordion, setIsActiveAccordion] = useState( false); //카테고리 타이틀 클릭 상태 값 체크

    const [ isActive, setIsActive] = useState({
        'Home': false,
        'MyDoc': false,
        'ShareDoc': false,
        'FavoriteDoc': true,
        'SecurtyDoc': false,
        'TrashDoc': false,
    });

    //딱 한번 실행 됌 
    useLayoutEffect( () => {
        if( CommonUtil.strIsNull( sortMenuState.contextName) || sortMenuState.contextName !== CONTEXT_NAME) {
            setSortMenu( CONTEXT_NAME, { sortItem:'1', fileTypes:'', sortOrder:'d'}, FavoriteDocMenuInfo[ 'sortMenu'])
            setTargetFullPath( [''], ['중요문서함'], null)
        }

    }, []);

    useEffect(() => {
        if( sortMenuState.contextName && sortMenuState.contextName == CONTEXT_NAME && 
            sortMenuState.selectedValue != null && (sortItem !== sortMenuState.selectedValue.sortItem || fileTypes !== sortMenuState.selectedValue.fileTypes ||  sortOrder !== sortMenuState.selectedValue.sortOrder)) {
            setDataList({ ...reqListData, pageNum: 1, sortItem:sortMenuState.selectedValue.sortItem, fileTypes:sortMenuState.selectedValue.fileTypes, sortOrder: sortMenuState.selectedValue.sortOrder, dataList: []});
            // flatListRef.current?.scrollToOffset({ animated: false, offset: 0 }); //스크롤 초기화
        }
    }, [ sortMenuState]);

    useEffect(() => {
        // && reqListData.dataList && reqListData.dataList.length > 0
        if( sortMenuState.contextName && sortMenuState.contextName == CONTEXT_NAME && targetFullPathState.fullPathUIDs.length > 0) {
            //pageNum:1 은 어디선가 스크롤 값이 자동으로 바뀌면서 onEndReached() 함수가 실행되고 있어서 pageNum값이 늘어나서 생겨난 문제, 일시적으로 추가함
            setDataList( {...reqListData, folderSeq: targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 1], pageNum:1, dataList: []});
        }
    }, [ targetFullPathState]);

    useEffect(() => {
        //다이얼로그 닫혀도 데이터리스트 불러오지 않아도 되는 메뉴가 있을 경우 예외처리 필요
        if( sortMenuState.contextName && sortMenuState.contextName === CONTEXT_NAME &&
            ( centerDialogState.dialogName === '' || alertDialogState.alertName === '' )) 
        {
            setDataList( {...reqListData, folderSeq: targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 1], pageNum:1, dataList: []});
        }
    }, [ centerDialogState, alertDialogState]);

    useEffect(() => {
        //다이얼로그 닫혀도 데이터리스트 불러오지 않아도 되는 메뉴가 있을 경우 예외처리 필요
        if( sortMenuState.contextName && sortMenuState.contextName === CONTEXT_NAME) 
        {
            setDataList( {...reqListData, folderSeq: targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 1], pageNum:1, dataList: []});
        }
    }, [ swipeItemState]);

    const ViewModeCheck = () => {
        setListViewMode( !listViewMode);
    };

    const onEndReached = async() => {
        if( isLoading) {
            return;
        }
        else {
            setLoading(true);
            // setDataList({...reqListData, pageNum: reqListData.pageNum + 1});
        }
    };
    
    return useMemo(() => (
        <>
        {/* {console.log(alertDialogState)} */}
        <SafeAreaView style={ MyDocStyles.safeAreaStyle}>
            {/* <ScrollView> */}
                <View style={ MyDocStyles.docMainContainer}>
                    <CommonHeader
                            headerName = { '중요문서함'} 
                            multiSelectedState = { null}
                            setMultiSelected = { null}
                            headerMenuInfo={ FavoriteDocMenuInfo.headerInfo}
                            contextName={ CONTEXT_NAME}
                            headerDataInfo={ null}
                            navigation = { navigation}
                            sortMenu = { FavoriteDocMenuInfo['sortMenu']}
                            ViewModeCheck={ ViewModeCheck}
                    />

                    <CommonDocBoxList isActive={isActive} setIsActive={setIsActive} navigation={ navigation} />

                    <CommonCollapsible isActiveStateNM = {'FavoriteDoc'} isActiveAccordion={ isActiveAccordion} setIsActiveAccordion={ setIsActiveAccordion}/>
                    
                    <View style={[ MyDocStyles.docListContainer, isActiveAccordion && MyDocStyles.docListOpen]}>
                        { reqListData.dataList.length > 0 ? 
                            <>
                                { targetFullPathState.fullPathUIDs.length > 1 &&
                                    <CommonMovePath targetFullPathState={ targetFullPathState} setTargetFullPath={ setTargetFullPath} />
                                }
                                <CommonFlatList 
                                    flatListRef ={ flatListRef}
                                    reqListData ={ reqListData}
                                    listViewMode={ listViewMode}
                                    navigation={ navigation}
                                    onEndReached={ onEndReached}
                                />
                            </>
                            :
                            <View>
                                <CommonMovePath targetFullPathState={ targetFullPathState} setTargetFullPath={ setTargetFullPath} />
                                <Text style={{ padding:10}}>등록된 문서가 없습니다.</Text>
                            </View>
                        }
                    </View>
                    <FloatingMenu />
                </View>
            {/* </ScrollView> */}
        </SafeAreaView>
    </>
    ), [ reqListData.dataList, listViewMode, isActiveAccordion]);
}

export default FavoriteDoc;