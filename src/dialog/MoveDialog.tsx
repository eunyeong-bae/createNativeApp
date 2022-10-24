/*
    * 문서함 카테고리 
    * 문서함 > p621, 004a04, 폴더 리스트 조회 사용
    * 공유한/공유받은 > p627, 001a23(includeFolder: true, includeDoc: false 추가/ listType: 공유한 1, 공유받은 2, 공유한/받은 3 으로 구분)
*/

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {dialogStyles} from './style/style';
import CommonUtil from '../utils/CommonUtil';
import CommonHeader from '../component/header/CommonHeader';
import FullPath from '../fullPath/index';
import DefaultListItem from '../list/DefaultListItem';
import useDocList from '../hooks/useDocList';
import FloatingMenu from '../menu/FloatingMenu';
import CommonFlatList from '../component/CommonFlatList';

const CONTEXT_NAME = 'moveDialog';
const DOCUMENT_BOX_LIST = [ //MAP
    { title: '내 문서함', listType: '' },
    { title: '공유한 문서함', listType: 1 },
    { title: '공유받은 문서함', listType: 2 },
];

const moveDialogHeaderInfo : any = {
    'headerInfo': {
        leftBtn : [
            {iconName : "CommonCloseBtn", visibility: true},
        ],
        rightDialogBtn: [
            {iconName: "CommonSaveBtn", visibility: true}
        ],
    }
};

export const MoveDialog = () => {
    const [ isLoading, setLoading] = useState( false);
    const [ DocBoxListType, setDocBoxListType] = useState( '');

    const flatListRef = useRef<any>();

    const [ fullpath, setFullPath] = useState({
        //JSON 형식의 데이터
        fullPathUIDs : [ ''],
        fullPathNames : [ '내 문서함'],
        treeTypes : []
    });   //이동 폴더 path 상태 관리

    const setFullpath = useCallback(( fullPathUIDs : any, fullPathNames : any, treeTypes : any) : void => {
        setFullPath({...fullpath, fullPathUIDs, fullPathNames, treeTypes});
    },[ fullpath, setFullPath]);

    const { reqListData, setDataList} = useDocList({
        folderSeq: '',
        listType: '', // listType:'': all, 1:공유한, 2: rhddbqkedms, 3:공유한&받은
        listCount: 10,
        pageNum : 1,
        sortItem : '1',
        sortOrder : 'd',
        fileTypes: '',
        dataList: [],
        includeFolder: true,
        includeDoc: false,
    });

    useEffect(() => {
        if( fullpath.fullPathUIDs.length > 0) {
            setDataList( {...reqListData, folderSeq: fullpath.fullPathUIDs[fullpath.fullPathUIDs.length - 1], pageNum:1, dataList: []});
        }
    }, [ fullpath]);

    useEffect(() => {
        //pageNum:1 은 어디선가 스크롤 값이 자동으로 바뀌면서 onEndReached() 함수가 실행되고 있어서 pageNum값이 늘어나서 생겨난 문제, 일시적으로 추가함
        setDataList({...reqListData, folderSeq:'', listType: DocBoxListType, pageNum: 1, dataList: []});
        flatListRef.current?.scrollToOffset({animated: false, offset: 0});

        setFullPath({ fullPathUIDs : [ ''], fullPathNames : [ '내 문서함'], treeTypes : []});

    }, [ DocBoxListType]);

    const onClickDocBox = ( listType : any) => {
        setDocBoxListType( listType);
    };

    const onEndReached = () => {
        if( isLoading) {
            return;
        }else {
            setLoading( true);
            setDataList({...reqListData, pageNum: reqListData.pageNum + 1});
        }
    };

    return useMemo(() => (
        <View style={dialogStyles.container}>
            <CommonHeader 
                headerName = { '이동'}
                multiSelectedState = { null}
                setMultiSelected = { null}
                headerMenuInfo={ moveDialogHeaderInfo.headerInfo}
                contextName={ CONTEXT_NAME}
                headerDataInfo={ null}
                navigation={ null}
                fullpath={ fullpath}
                setFullpath={ setFullpath}
                sortMenu= { null}
            />
            <View style={ dialogStyles.mainContainer}>
                <View style={ dialogStyles.docBoxListContainer}>
                    <>
                        {
                          !CommonUtil.objectIsNull( DOCUMENT_BOX_LIST) &&
                            DOCUMENT_BOX_LIST.map( list => {
                                return (
                                    <TouchableOpacity key={ list.title} onPress={ onClickDocBox.bind( this, list.listType)}>
                                        <View style={ dialogStyles.docBoxList}>
                                            <Text style={ dialogStyles.docBoxListText}>{ list.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </>
                </View>
                
                {/* 문서함의 폴더 경로와 다이얼로그 창의 폴더 경로 값 구분을 위해 props 로 던짐 */}
                <FullPath fullpath= { fullpath} setFullPath={ setFullpath}/>

                {/* 문서 리스트 영역 */}
                <View style={ dialogStyles.folderListContainer}>
                    {
                        reqListData.dataList.length > 0 ?
                            <CommonFlatList
                                flatListRef ={ flatListRef}
                                reqListData ={ reqListData}
                                onEndReached={ onEndReached}
                                fullpath={ fullpath}
                                setFullpath={ setFullpath}
                            />
                        :
                            <View>
                                <Text>등록된 폴더가 없습니다.</Text>
                            </View>
                    }
                </View>
            </View>
            <FloatingMenu />
        </View>
    ), [ reqListData.dataList]);
}