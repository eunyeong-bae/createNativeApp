import React, { useContext, useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { View, Dimensions, SafeAreaView, Text, FlatList} from 'react-native';
import { CommonHeader} from '../component/header/index';
import CommonDocBoxList from '../component/docBoxList/CommonDocBoxList';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { MyDocStyles} from './style/style';
import CardListItem from '../list/CardListItem';
import DefaultListItem from '../list/DefaultListItem';
import CommonUtil from '../utils/CommonUtil';
import { CommonContext } from '../context/CommonContext';
import SortMenu from '../menu/SortMenu';
import useDocList from '../hooks/useDocList';
import FullPath from '../fullPath/index';

const myDocMenuInfo : any = {    
    'headerInfo' : {
        //롱클릭 시, visibility : true 로 변경? 해준다는 가정하에 일단 작성
        leftBtn : [
            {iconName :'HomeMenuBtn', visibility : true},
            {iconName : 'CommonCloseBtn', visibility : false},
        ],
        rightBtn: [
            {iconName: 'CheckAllBtnOff', visibility: true},
            {iconName: 'CheckAllBtnOn', visibility: false},
            {iconName :'CommonSearchBtn', visibility : true},
            // {iconName: 'DocMoreBtn', visibility: true}
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
    const { sortMenuState, setSortMenu} = useContext(CommonContext);
    
    const { navigation} = props;

    const flatListRef = useRef<any>();

    const [ listViewMode, setListViewMode] = useState(false);
    
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
        includeDoc: true
    });
    const {sortItem, sortOrder, fileTypes} = reqListData;

    //딱 한번 실행 됌 
    useLayoutEffect( () => {
        if( CommonUtil.strIsNull( sortMenuState.contextName) || sortMenuState.contextName !== CONTEXT_NAME) {
            setSortMenu( CONTEXT_NAME, { sortItem:'1', fileTypes:'', sortOrder:'d'}, null);
        }
    }, []);

    useEffect(() => { // unmount, context Api 초기화
        // if( CommonUtil.strIsNull( sortMenuState.contextName) || sortMenuState.contextName !== CONTEXT_NAME) {
        //     setSortMenu( CONTEXT_NAME, { sortItem:'1', fileTypes:'', sortOrder:'d'}, null);
        // }
        if(sortMenuState.selectedValue != null &&  (sortItem !== sortMenuState.selectedValue.sortItem || fileTypes !== sortMenuState.selectedValue.fileTypes ||  sortOrder !== sortMenuState.selectedValue.sortOrder)) {
            setDataList({ ...reqListData, pageNum: 1, sortItem:sortMenuState.selectedValue.sortItem, fileTypes:sortMenuState.selectedValue.fileTypes, sortOrder: sortMenuState.selectedValue.sortOrder, dataList: []});
            flatListRef.current.scrollToOffset({ animated: false, offset: 0 }); //스크롤 초기화
        }
    }, [ sortMenuState]);

    const ViewModeCheck = () => {
        setListViewMode( !listViewMode);
    };

    const renderListItem = ( data : any) => {
        if( listViewMode){
            return (
                <CardListItem data={ data.item}
                              key={ data.item.fileUID}
                              index={ data.index}
                              navigation={ navigation}
                />
            )
        }
        else{
            return(
                <DefaultListItem data={ data.item}
                                 key={ data.item.fileUID}
                                 index={ data.index}
                                 navigation={ navigation}
                />
            )
        }
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
        <SafeAreaView>
            <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, backgroundColor:'#ffffff'}}>
                <CommonHeader
                     headerName = { 'ONEFFICE'} 
                     multiSelectedState = { null}
                     setMultiSelected = { null}
                     headerMenuInfo={ myDocMenuInfo.headerInfo}
                     contextName={ CONTEXT_NAME}
                     headerDataInfo={ null}
                     navigation = { navigation}
                     sortMenu = { null}
                     ViewModeCheck={ ViewModeCheck}
                />

                <CommonDocBoxList navigation={ navigation} />

                <View style={{borderBottomWidth:1, borderBottomColor:'#dedede'}}>
                    <Text>최근 조회 문서</Text>
                </View>
                {/* <View style={{flexDirection:'row',justifyContent:'space-between',height:40,alignItems:'center',backgroundColor:'#eee',paddingLeft:10,paddingRight:10}}>
                    <SortMenu 
                        contextName = { CONTEXT_NAME}
                        selectedValue = { null}
                        sortMenu = { myDocMenuInfo['sortMenu']}
                    />
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={ViewModeCheck}>
                            <SvgIcon name={ !listViewMode ? 'DocThumbViewBtn' : 'DocListViewBtn' } width={20} height={20}/>
                        </TouchableOpacity>
                    </View>
                </View> */}
                
                <View style={MyDocStyles.docListContainer}>
                    {
                        reqListData.dataList.length > 0 ? 
                        <FlatList 
                            ref={ flatListRef}
                            data={ reqListData.dataList}
                            renderItem={ renderListItem}
                            keyExtractor={ (item, index) => item.fileUID}
                            onEndReached={ onEndReached}
                            onEndReachedThreshold={ 0.9}
                            // ListFooterComponent={} rn 에서 제공하는 로딩 컴포넌트
                        />
                        : 
                        <View>
                            <Text>등록된 문서가 없습니다.</Text>
                        </View>
                    }
                </View>
            </View>  
        </SafeAreaView>

    ), [ reqListData.dataList, listViewMode]);
}

export default Home;