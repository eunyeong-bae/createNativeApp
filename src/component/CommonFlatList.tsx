import React, { useCallback, useContext, useMemo} from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import CardListItem from '../list/CardListItem';
import DefaultListItem from '../list/DefaultListItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import SvgIcon from '../component/svgIcon/SvgIcon';
import CommonFnUtil from '../utils/CommonFnUtil';
import { CommonContext } from '../context/CommonContext';


interface FlatListProps {
    flatListRef? : any,
    reqListData? : any,
    listViewMode? : any,
    navigation? : any,
    onEndReached? : any,
    fullpath? : any,
    setFullpath? : any,
}

const hiddenItemLists:any = {    
    'setFavorite':{name:'중요 표시', auth:'Read',rightMenu: false,icon: ['importantOff', 'importantOn'],clickEvent: CommonFnUtil.onClickSetFavCatergory},
    'delete':{name:'삭제',auth:'Update',rightMenu: false,icon:'deleteBtn',clickEvent: CommonFnUtil.onClickDelete},
};

const CommonFlatList = ( props: FlatListProps) => {
    const { swipeItemState, 
            setSwipeItem,
            sortMenuState,
            setAlertDialog, 
            centerDialogState } = useContext( CommonContext);

    const { flatListRef, 
            reqListData, 
            listViewMode, 
            navigation, 
            onEndReached, 
            fullpath, 
            setFullpath} = props;

    /**
     * flatlist 최적화하기 
     * 1. 인라인 화살표 함수 사용X
     *  화살표 함수를 속성 값으로 입력하게 되면 DOM 컴포넌트가 렌더링 될 때마다 새로운 함수가 생성되기 때문에 불필요한 렌더링이 발생
     *  따라서 renderItem, keyExtractor, 그리고 ListHeaderComponent 등의 속성을 구성할 때 useCallback을 사용하여 꼭 필요할 때만 업데이트 되도록 하는 것이 좋음
     */
    const keyExtractor = useCallback((item : any, index : any) => item.fileUID + index, []);
    const renderListItem =  useCallback(( data : any) => {
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
    }, [ reqListData]);

    const dialogRenderListItem = useCallback(( data: any) => {
        return (
            <DefaultListItem data={ data.item}
                             key={ data.item.fileUID}
                             index={ data.index}
                             listItemFrom={ 'dialog'}
                             // 문서함의 폴더 경로와 다이얼로그 창의 폴더 경로 값 구분을 위해 props 로 던짐
                             fullpath={ fullpath} 
                             setFullpath={ setFullpath}
            />
        )
    }, [ reqListData]);

    const getContentTypeCtn = ( currentTarget: any) => {
        let responseData: any = null;
        let docCnt = 0;
        let funcCnt = 0;
        let folderCnt = 0;

        if( currentTarget.doc_type === '0') {
            folderCnt++
        }
        else if( currentTarget && ( currentTarget.important || currentTarget.security_key || currentTarget.share_type !== 0)) {
            funcCnt++;
        }
        else {
            docCnt++ ;
        }

        responseData = [{ name: "문서", cnt: docCnt}, 
                        { name: "기능 설정 문서", cnt: funcCnt}, 
                        { name: "폴더", cnt: folderCnt}
                    ];

        return responseData;
    };

    const hiddenItemEvent = async ( menuNM : any, data: any) => {
        const returnVal = await hiddenItemLists[menuNM].clickEvent();
        
        const bFavorite = !data.item.important;

        let resultData: any = null;

        if( returnVal === 'setFavorite') {
            const strDocSeq = data.item.doc_type === '0' && bFavorite ? "" : data.item.docUID;
            const strFolderSeq = data.item.doc_type === '1' ? "" : data.item.docUID;
            
            const objFavoriteInfo = bFavorite ? 
                {
                    category_name: "",
                    category_root_uid: "FA_ROOT",
                    docUID: strDocSeq,
                    folder_no: strFolderSeq,
                    target_id: '136142218a7664Bc9a',
                }
            :
                strFolderSeq ? strFolderSeq+"||FO" : strDocSeq+"||DO";

            resultData = bFavorite ? await CommonFnUtil.setFavorite( data.item.doc_type === '0', objFavoriteInfo) : await CommonFnUtil.setUnFavorite( objFavoriteInfo);       
    
            setTimeout(() => {
                setSwipeItem({
                    ...swipeItemState,
                    setFavorite: resultData,
                });
            }, (1000));
        }
        else {
            const alertName = 'alert';
            const alertItem =  {
                alertType: 'Trash',
                menuNM : 'deleteFile',
                description : [ '삭제하시겠습니까?', 
                                '※ 폴더 삭제 시, ONECHAMBER 파일을 포함한 내부 문서가 모두 삭제됩니다.', 
                                '※ 기능 설정 문서란 공유, 보안, 읽기 전용, 중요 설정된 문서를 의미합니다.'],
                data: getContentTypeCtn( data.item),
            }; 
            
            setAlertDialog( alertName, alertItem, false);
        }
    };

    const renderHiddenItem = ( data : any) => {
        return (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={ hiddenItemEvent.bind(this, 'setFavorite', data)}
                >
                    <SvgIcon name={ data.item.important ? 'importantOn' : 'importantOff'} width={ 22} height={ 22}/>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}
                    onPress={ hiddenItemEvent.bind(this, 'delete', data)}
                >
                    <SvgIcon name="deleteBtn" width={ 25} height={ 25} />
                </TouchableOpacity>

            </View>
        );
    };

    return useMemo(() => (
        <>
        { sortMenuState.contextName === 'TrashDoc' || centerDialogState.dialogName !== '' ?
                <FlatList 
                    ref={ flatListRef}
                    data={ reqListData.dataList}
                    renderItem={ fullpath ? dialogRenderListItem : renderListItem}
                    keyExtractor={ keyExtractor}
                    onEndReached={ onEndReached}
                    onEndReachedThreshold={ 0.9}
                    initialNumToRender = { 10}
                    maxToRenderPerBatch ={ 10}
                    windowSize= { 21}
                    removeClippedSubviews = { true}
                    // ListFooterComponent={} rn 에서 제공하는 로딩 컴포넌트
                />
            :
                <SwipeListView 
                    ref={ flatListRef}
                    showsVerticalScrollIndicator={ false}
                    data={ reqListData.dataList}
                    renderItem={ renderListItem}
                    renderHiddenItem={ renderHiddenItem}
                    leftOpenValue={ 40}
                    rightOpenValue={ -40}
                    keyExtractor={ keyExtractor}
                    onEndReached={ onEndReached}
                    onEndReachedThreshold={ 0.9}
                    initialNumToRender = { 10}
                    maxToRenderPerBatch ={ 10}
                    windowSize= { 21}
                    removeClippedSubviews = { true}
                />
        }
        </>
    ), [ reqListData.dataList, listViewMode]);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        backgroundColor: '#CCC',
    },
    rowBack: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backRightBtn: {
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backRightBtnLeft: {
        marginLeft:5,
        left: 0
    },
    backRightBtnRight: {
        marginRight:8,
        right: 0
    },
});

export default CommonFlatList;