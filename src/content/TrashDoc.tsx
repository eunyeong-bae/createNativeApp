import React, { useContext, useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { View, Text, SafeAreaView} from 'react-native';
import { CommonHeader} from '../component/header/index';
import CommonDocBoxList from '../component/docBoxList/CommonDocBoxList';
import { MyDocStyles} from './style/style';
import CommonUtil from '../utils/CommonUtil';
import { CommonContext } from '../context/CommonContext';
import useDocList from '../hooks/useDocList';
import CommonFlatList from '../component/CommonFlatList';

const trashDocMenuInfo : any = {    
    'sortMenu' : [
        {name : '삭제된 날짜', value: '6'},
        {name : '문서 제목', value: '1'},
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

const CONTEXT_NAME = "TrashDoc";

const TrashDoc = ( props : any) => {
    const { sortMenuState, setSortMenu, alertDialogState } = useContext(CommonContext);
    
    const { navigation} = props;

    const flatListRef = useRef<any>();

    const [ listViewMode, setListViewMode] = useState(false);
    
    const [ isLoading, setLoading] = useState( false); //문서 리스트 추가 호출 시 사용
    const { reqListData, setDataList} = useDocList({
        folderSeq: '',
        listType: '',
        listCount: 40,
        pageNum : 1,
        sortItem : '6',
        sortOrder : 'd',
        fileTypes: '',
        dataList: [],
        includeFolder: true,
        includeDoc: true,
        contextName: CONTEXT_NAME
    });
    const { sortItem, sortOrder, fileTypes} = reqListData;

    //딱 한번 실행 됌 
    useLayoutEffect( () => {
        if( CommonUtil.strIsNull( sortMenuState.contextName) || sortMenuState.contextName !== CONTEXT_NAME) {
            setSortMenu( CONTEXT_NAME, { sortItem:'6', fileTypes:'', sortOrder:'d'}, trashDocMenuInfo[ 'sortMenu']);
        }
    }, []);

    useEffect(() => { // unmount, context Api 초기화
        // if( CommonUtil.strIsNull( sortMenuState.contextName) || sortMenuState.contextName !== CONTEXT_NAME) {
        //     setSortMenu( CONTEXT_NAME, { sortItem:'1', fileTypes:'', sortOrder:'d'}, trashDocMenuInfo[ 'sortMenu']);
        // }
        if( sortMenuState.contextName && sortMenuState.contextName == CONTEXT_NAME && sortMenuState.selectedValue != null && (sortItem !== sortMenuState.selectedValue.sortItem || fileTypes !== sortMenuState.selectedValue.fileTypes ||  sortOrder !== sortMenuState.selectedValue.sortOrder)) {
            setDataList({ ...reqListData, pageNum: 1, sortItem:sortMenuState.selectedValue.sortItem, fileTypes:sortMenuState.selectedValue.fileTypes, sortOrder: sortMenuState.selectedValue.sortOrder, dataList: []});
            // flatListRef.current.scrollToOffset({ animated: false, offset: 0 }); //스크롤 초기화
        }
    }, [ sortMenuState]);

    useEffect(() => {
        //다이얼로그 닫혀도 데이터리스트 불러오지 않아도 되는 메뉴가 있을 경우 예외처리 필요
        if( sortMenuState.contextName && sortMenuState.contextName == CONTEXT_NAME){
            setDataList( {...reqListData, folderSeq: '', pageNum:1, dataList: []});
        }
    }, [ alertDialogState]);

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
    }
    
    return useMemo(() => (
        <>
        {/* {console.log(alertDialogState)} */}
        <SafeAreaView style={ MyDocStyles.safeAreaStyle}>
            <View style={ MyDocStyles.docMainContainer}>
                <CommonHeader
                        headerName = { '휴지통'} 
                        multiSelectedState = { null}
                        setMultiSelected = { null}
                        headerMenuInfo={ trashDocMenuInfo.headerInfo}
                        contextName={ CONTEXT_NAME}
                        headerDataInfo={ null}
                        navigation = { navigation}
                        sortMenu = { trashDocMenuInfo['sortMenu']}
                        ViewModeCheck={ ViewModeCheck}
                />

                <CommonDocBoxList navigation={ navigation} />
                
                <View style={ MyDocStyles.docListContainer}>
                    { reqListData.dataList.length > 0 ? 
                        <CommonFlatList 
                            flatListRef ={ flatListRef}
                            reqListData ={ reqListData}
                            listViewMode={ listViewMode}
                            navigation={ navigation}
                            onEndReached={ onEndReached}
                        />
                        : 
                        <View>
                            <Text>등록된 문서가 없습니다.</Text>
                        </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    </>
    ), [ reqListData.dataList, listViewMode]);
}

export default TrashDoc;