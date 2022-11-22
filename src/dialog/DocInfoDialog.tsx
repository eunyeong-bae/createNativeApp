import React, { useContext, useLayoutEffect, useState } from 'react';
import { View, Text,} from 'react-native';
import { dialogStyles} from './style/style';
import CommonHeader from '../component/header/CommonHeader';
import { CommonContext } from '../context/CommonContext';
import CommonUtil from '../utils/CommonUtil';
import SvgIcon from '../component/svgIcon/SvgIcon';

const CONTEXT_NAME = 'DocInfoDialog';
const copyDialogHeaderInfo : any = {
    'headerInfo': {
        leftBtn : [
            {iconName : "CommonCloseBtn", visibility: true},
        ],
    },
};

export const DocInfoDialog = () => {

    const { targetFullPathState, selectedTargetState} = useContext( CommonContext);
    const [ docInfoArr, setDocInfoArr] = useState<{ name: string; value: any}[]>([]);

    useLayoutEffect(() => {
        if( !CommonUtil.objectIsNull( targetFullPathState) && !CommonUtil.objectIsNull( selectedTargetState)){
            getDocInfos();
        }
    }, []);

    const getDocInfos = () => {
        //..파일크기 구하기
        let fileSize = selectedTargetState.selectedTarget.content_size;
        let _size = Number(fileSize);
        const _unit = _size > 1000 ? "KB" : "byte" ;
            _size = _size > 1000 ? _size/1000 : _size;

            fileSize = _unit === "KB" ? _size.toFixed(2) : _size.toFixed(0);

        //..폴더 패스 구하기
        let _folderPathData: any = [];
        const fullPathNameArr = targetFullPathState.fullPathNames;
        
        if(fullPathNameArr.length >= 3){ //폴더 경로 세 곳 이상의 경우, _folderPathData 배열 첫번째와 마지막, 마지막-1 제외한 중간 경로는 ... 으로 처리
            _folderPathData.push( "...",fullPathNameArr[fullPathNameArr.length-2], fullPathNameArr[fullPathNameArr.length-1]);   
        } else if(fullPathNameArr.length === 2) {
            _folderPathData.push( fullPathNameArr[0], fullPathNameArr[1]);
        } else if(fullPathNameArr.length === 1) {
            _folderPathData.push( fullPathNameArr[0]);
        }

        setDocInfoArr([
            ...docInfoArr,
            { name: '소유자', value: selectedTargetState.selectedTarget.creatorName},
            { name: '문서 제목', value: selectedTargetState.selectedTarget.doc_name},
            { name: '문서 타입', value: selectedTargetState.selectedTarget.file_type === 'O' ? 'ONEFFICE 문서' : 'ONEFFICE 프레젠테이션'},
            { name: '수정일', value: selectedTargetState.selectedTarget.mod_date},
            { name: '파일 크기', value: fileSize+_unit},
            { name: '파일 위치', value: _folderPathData},
        ]);        
    };

    return (
        <View style={ dialogStyles.container}>
            <CommonHeader 
                headerName = { '문서정보'}
                multiSelectedState = { null}
                setMultiSelected = { null}
                headerMenuInfo={ copyDialogHeaderInfo.headerInfo}
                contextName={ CONTEXT_NAME}
                headerDataInfo={ setDocInfoArr}
                navigation={ null}
                sortMenu ={ null}
            />

            <View style={{ width:'100%', height:'100%', padding:20, backgroundColor:"pink"}}>
                <View style={{ width:'100%', padding:10, height:50, flexDirection:'row',alignItems:'center'}}>
                    <Text style={{ marginRight:40, fontSize:15, fontWeight:'600'}}>문서 상태</Text>
                    <View style={{ flexDirection:'row', alignItems:'center', height:20}}>
                        { selectedTargetState.selectedTarget.share_type === 1 ? 
                                <SvgIcon name = "docShareSend" width={25} height={25} style={{ marginRight:2}}/> 
                            : 
                            selectedTargetState.selectedTarget.share_type === 2 ? 
                                <SvgIcon name = "docShareReceive" width={25} height={25}/>
                            :  selectedTargetState.selectedTarget.share_type === 3 && <SvgIcon name = "docShare" width={25} height={25}/>
                        }
                        { selectedTargetState.selectedTarget.flagOpenLink && <SvgIcon name = "docOpenLink" width={25} height={25} /> }
                        { selectedTargetState.selectedTarget.important && <SvgIcon name = "docFavorite" width={25} height={25} /> }
                        { selectedTargetState.selectedTarget.security_key && <SvgIcon name = "docSecurity" width={25} height={25} /> }
                    </View>
                </View>
                <View style={{ width:'100%', padding:10}}>
                    <Text style={{ fontSize:15, fontWeight:'600'}}>문서 정보</Text>
                    { docInfoArr.map(( item: any, index: number) => {
                        return (
                            <View key={ item['name'] + index} style={{ width:'100%', height: 40, paddingLeft:5, flexDirection:'row', alignItems:'center'}}>
                                <Text style={{ width:100, fontSize:15, fontWeight:'bold'}}>{ item['name']}</Text>
                                <Text style={{ fontSize:14, fontWeight:'600'}}>{ item['value']}</Text>
                            </View>
                        )
                    })}  
                </View>
            </View>

        </View>
    )
}