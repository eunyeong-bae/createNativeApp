import React, { useContext, useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, SafeAreaView, TextInput} from 'react-native';
import { CommonHeader} from '../component/header/index';
import CommonDocBoxList from '../component/docBoxList/CommonDocBoxList';
import { MyDocStyles} from './style/style';
import CommonUtil from '../utils/CommonUtil';
import { CommonContext } from '../context/CommonContext';
import useDocList from '../hooks/useDocList';
import FloatingMenu from '../menu/FloatingMenu';
import CommonFlatList from '../component/CommonFlatList';
import CommonMovePath from '../component/CommonMovePath';

const shareDocMenuInfo : any = {    
    'sortMenu' : [
        {name : '문서 제목', value: '1'},
        {name : '최종 수정 날짜', value: '2'},
        {name : '소유자', value: '4'},
        {name : '공유날짜', value: '6'},
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

const CONTEXT_NAME = "ShareDoc";

const ShareDoc = ( props : any) => {
    const { sortMenuState, 
            setSortMenu, 
            targetFullPathState, 
            setTargetFullPath, 
            alertDialogState, 
            centerDialogState,
            swipeItemState,
            actionMenuState} = useContext(CommonContext);
    
    const { navigation} = props;

    const flatListRef = useRef<any>();

    const [ listViewMode, setListViewMode] = useState(false); //리스트 or 썸넬 모드
    const [ isLoading, setLoading] = useState( false); //scrollEnd 시점 문서 리스트 새로 불러오기
    const [ isActive, setIsActive] = useState({ //문서함 리스트 클릭 시, 상태 값 체크
        'Home': false,
        'MyDoc': false,
        'ShareDoc': true,
        'FavoriteDoc': false,
        'SecurtyDoc': false,
        'TrashDoc': false,
    });

    const { reqListData, setDataList} = useDocList({
        folderSeq: '',
        listType: '3',
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

    /**
     * useLayoutEffect : Dom 조작 완료 후 동기적으로 딱 한번 실행됌
     * useEffect : 두번째 배열 []의 경우, 마운트 시점에 한번 실행(?)
     */
    useEffect(() => {
        //정렬 메뉴 & 폴더 경로 셋팅
        if( CommonUtil.strIsNull( sortMenuState.contextName) || sortMenuState.contextName !== CONTEXT_NAME) {
            setSortMenu( CONTEXT_NAME, { sortItem:'8', fileTypes:'', sortOrder:'d'}, shareDocMenuInfo[ 'sortMenu'])
            setTargetFullPath( [''], ['공유문서함'], null)
        }
    }, []);

    useEffect(() => {
        if(sortMenuState.contextName && sortMenuState.contextName == CONTEXT_NAME && 
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
        if( sortMenuState.contextName && sortMenuState.contextName === CONTEXT_NAME && ( centerDialogState.isAction || alertDialogState.isAction)) {
            setDataList( {...reqListData, folderSeq: targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 1], pageNum:1, dataList: []});
        }
    }, [ centerDialogState, alertDialogState]);

    useEffect(() => {
        //다이얼로그 닫혀도 데이터리스트 불러오지 않아도 되는 메뉴가 있을 경우 예외처리 필요
        if( sortMenuState.contextName && sortMenuState.contextName === CONTEXT_NAME) {
            setDataList( {...reqListData, folderSeq: targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 1], pageNum:1, dataList: []});
            // flatListRef.current.yScrollOffset = 0;
        }
    }, [ swipeItemState]);

    // useEffect(() => {
    //     //다이얼로그 닫혀도 데이터리스트 불러오지 않아도 되는 메뉴가 있을 경우 예외처리 필요
    //     if( sortMenuState.contextName && sortMenuState.contextName === CONTEXT_NAME && 
    //         targetFullPathState.fullPathUIDs[0] === '' && centerDialogState.dialogName === '' ) {
    //         setDataList( {...reqListData, folderSeq: targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 1], pageNum:1, dataList: []});
    //         // flatListRef.current.yScrollOffset = 0;
    //     }
    // }, [ centerDialogState]);

    // useEffect(() => {
    //     //다이얼로그 닫혀도 데이터리스트 불러오지 않아도 되는 메뉴가 있을 경우 예외처리 필요
    //     if( sortMenuState.contextName && sortMenuState.contextName === CONTEXT_NAME && 
    //         alertDialogState.alertName === '' ) 
    //     {
    //         setDataList( {...reqListData, folderSeq: targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 1], pageNum:1, dataList: []});
    //         // flatListRef.current.yScrollOffset = 0;
    //     }
    // }, [ alertDialogState]);

    // useEffect(() => {
    //     //다이얼로그 닫혀도 데이터리스트 불러오지 않아도 되는 메뉴가 있을 경우 예외처리 필요
    //     if( sortMenuState.contextName && sortMenuState.contextName === CONTEXT_NAME && !actionMenuState.isActionMenu && !actionMenuState.navigation) {
    //         setDataList( {...reqListData, folderSeq: targetFullPathState.fullPathUIDs[targetFullPathState.fullPathUIDs.length - 1], pageNum:1, dataList: []});
    //         // flatListRef.current.yScrollOffset = 0;
    //     }
    // }, [ actionMenuState]);

    const ViewModeCheck = () => {
        setListViewMode( !listViewMode);
    };

    const onEndReached = async() => {
        if( isLoading) {
            return;
        }
        else {
            setLoading(true);
            setDataList({...reqListData, pageNum: reqListData.pageNum + 1});
        }
    };
    
    return useMemo(() => (
        <>
        {/* {console.log(alertDialogState)} */}
        <SafeAreaView style={ MyDocStyles.safeAreaStyle}>
            <View style={ MyDocStyles.docMainContainer}>
                <CommonHeader
                    headerName = { '공유문서함'} 
                    multiSelectedState = { null}
                    setMultiSelected = { null}
                    headerMenuInfo={ shareDocMenuInfo.headerInfo}
                    contextName={ CONTEXT_NAME}
                    headerDataInfo={ null}
                    navigation = { navigation}
                    sortMenu = { shareDocMenuInfo['sortMenu']}
                    ViewModeCheck={ ViewModeCheck}
                />

                <CommonDocBoxList isActive={ isActive} setIsActive={ setIsActive} navigation={ navigation} />

                <TextInput style={ MyDocStyles.textInputStyle} placeholder="Search" />
                
                <View style={ MyDocStyles.docListContainer}>
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
                            <Text>등록된 문서가 없습니다.</Text>
                        </View>
                    }
                </View>
            </View>
            <FloatingMenu />
        </SafeAreaView>
    </>
    ), [ reqListData.dataList, listViewMode])
}

export default ShareDoc;