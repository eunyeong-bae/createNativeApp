import { CommonContext } from '../context/CommonContext';
import React, { useEffect, useState, useCallback, useMemo, useRef, useContext } from 'react';
import { View, Dimensions, TextInput} from 'react-native';
import { dialogStyles} from './style/style';
import CommonHeader from '../component/header/CommonHeader';
import useDocList from '../hooks/useDocList';
import CommonFlatList from '../component/CommonFlatList';
import FloatingMenu from '../menu/FloatingMenu';
import CommonMovePath from '../component/CommonMovePath';

/**
 * 문서함 카테고리 
 * 문서함 > p621, 004a04, 폴더 리스트 조회 사용
 * 공유한/공유받은 > p627, 001a23(includeFolder: true, includeDoc: false 추가/ listType: 공유한 1, 공유받은 2, 공유한/받은 3 으로 구분)
 */
//폴더 리스트 조회

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CONTEXT_NAME = 'copyDialog';
const copyDialogHeaderInfo : any = {
    'headerInfo': {
        leftBtn : [
            {iconName : "CommonCloseBtn", visibility: true},
        ],
        rightDialogBtn: [
            {iconName: "CommonSaveBtn", visibility: true}
        ],
    },
    'copyDataInfo': {
        docTitle: '',
    }
};

export const CopyDialog = () => {
    const flatListRef = useRef<any>();

    const { alertDialogState} = useContext( CommonContext);
    const [ isLoading, setLoading] = useState( false);
    const [ inputTxt, setInputTxt] = useState( null);

    const [ fullpath, setFullPath] = useState({
        //JSON 형식의 데이터
        fullPathUIDs : [ ''],
        fullPathNames : [ '내 문서함'],
        treeTypes : []
    });
    
    //이동 폴더 path 상태 관리
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
        if( fullpath && fullpath.fullPathUIDs.length > 0) {
            setDataList( {...reqListData, folderSeq: fullpath.fullPathUIDs[fullpath.fullPathUIDs.length - 1], pageNum:1, dataList: []});
        }
    }, [ fullpath]);

    useEffect(() => {
        if( inputTxt){
            copyDialogHeaderInfo.copyDataInfo.docTitle = inputTxt;
        }
    }, [ inputTxt]);

    useEffect(() => {
        if( alertDialogState.isAction){ //새폴더생성
            setDataList({...reqListData, folderSeq: fullpath.fullPathUIDs[fullpath.fullPathUIDs.length - 1], pageNum:1, dataList: []});
        }
    }, [ alertDialogState]);

    const onChangeText = ( text : any) => {
        setInputTxt( text);
        console.log( text)
    }; 


    const onEndReached = () => {
        if( isLoading) {
            setLoading( !isLoading);
        }else {
            setLoading( !isLoading);
            setDataList({...reqListData, pageNum: reqListData.pageNum + 1});
        }
    };
    
    return useMemo(() => (
        <>
            <View style={dialogStyles.container}>
                <CommonHeader 
                    headerName = { '사본 만들기'}
                    multiSelectedState = { null}
                    setMultiSelected = { null}
                    headerMenuInfo={ copyDialogHeaderInfo.headerInfo}
                    contextName={ CONTEXT_NAME}
                    headerDataInfo={ copyDialogHeaderInfo.copyDataInfo}
                    navigation={ null}
                    fullpath={ fullpath}
                    setFullpath={ setFullpath}
                    sortMenu ={ null}
                />
                <TextInput style={{  width: width - 50, height: 40, padding:10, borderWidth:1, borderColor:'#EFF3FB', borderRadius:10, backgroundColor:'#fff' }}
                    onChangeText={ text => setInputTxt( text)}
                    placeholder="제목을 입력하세요."
                    value={ inputTxt}
                    // onChangeText={ onChangeText}
                    // placeholder={ selectedTargetState.selectedTarget.doc_name + "(복사본)"}
                    // value={ !inputTxt ? selectedTargetState.selectedTarget.doc_name + "(복사본)" : inputTxt}
                />
                
                {/* 문서함의 폴더 경로와 다이얼로그 창의 폴더 경로 값 구분을 위해 props 로 던짐 */}
                {/* <View style={{ borderColor:'#eee', borderTopWidth:1}}>
                    <FullPath fullpath= { fullpath} setFullPath={ setFullpath}/>
                </View> */}
                
                {/* 문서 리스트 영역 */}
                <View style={ dialogStyles.folderListContainer}>
                    { reqListData.dataList.length > 0 ?
                        <>
                            { fullpath.fullPathUIDs.length > 1 &&
                                <CommonMovePath targetFullPathState={ fullpath} setTargetFullPath={ setFullpath} />
                            }
                            <CommonFlatList
                                flatListRef ={ flatListRef}
                                reqListData ={ reqListData}
                                onEndReached={ onEndReached}
                                fullpath={ fullpath}
                                setFullpath={ setFullpath}
                            />
                        </>
                        :
                            <View>
                                <CommonMovePath targetFullPathState={ fullpath} setTargetFullPath={ setFullpath} />
                            </View>
                    }
                </View>
            </View>
            <FloatingMenu fullpath={ fullpath} />
        </>
    ), [ reqListData.dataList])
}