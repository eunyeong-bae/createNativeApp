import React, { useCallback} from 'react';
import { FlatList } from 'react-native';
import CardListItem from '../list/CardListItem';
import DefaultListItem from '../list/DefaultListItem';

const CommonFlatList = ( props: any) => {
    const { flatListRef, reqListData, listViewMode, navigation, onEndReached, fullpath, setFullpath} = props;
    
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
    }, [ listViewMode, reqListData.dataList]);

    const dialogRenderListItem = ( data: any) => {
        return (
            <DefaultListItem data={ data.item}
                             key={ data.item.fileUID}
                             index={ data.index}
                             // 문서함의 폴더 경로와 다이얼로그 창의 폴더 경로 값 구분을 위해 props 로 던짐
                             fullpath={ fullpath} 
                             setFullpath={ setFullpath}
                            //  navigation= {}
            />
        )
    };

    return (
        <>
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
        </>
    )
};

export default CommonFlatList;