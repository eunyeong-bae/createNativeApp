import { CommonContext } from "../context/CommonContext";
import { useCallback, useContext, useEffect, useState } from "react";
import Adapter from '../ecmadapter';
import CommonUtil from '../utils/CommonUtil';

const useDocList = ({folderSeq, listType, listCount, pageNum, sortItem, sortOrder, fileTypes, dataList, includeFolder, includeDoc} : any) => {
    const { sortMenuState} = useContext( CommonContext);

    const [ reqListData, setReqListData] = useState({
        folderSeq: folderSeq,
        listType: listType,
        listCount: listCount,
        pageNum : pageNum,
        sortItem : sortItem,
        sortOrder : sortOrder,
        fileTypes: fileTypes,
        dataList: dataList,
        includeFolder: includeFolder,
        includeDoc: includeDoc,
    });

    useEffect(()=>{
        setDataList( reqListData);
    },[]);

    const setDataList = useCallback(async({ folderSeq, listType, listCount, pageNum, sortItem, sortOrder, fileTypes, dataList, includeFolder, includeDoc} : any) => {
       
        let fileList : any = []; 
        let data : any = {};

        console.log(sortMenuState.contextName );
        if( sortMenuState.contextName === 'Home'){
            data = {
                protocolId: "P544", //"P539"
                data: {
                    "folder_no": folderSeq,
                    "loadType": 0,
                    "listType": listType,
                    "list_count": listCount,
                    "pageIndex": pageNum,
                    "pageSize": listCount,
                    "fileTypes": fileTypes,//docType > 모든 문서 : '', 원피스: 'O',피피티: 'S'
                    "sortItem": sortItem, //selectSortMenu
                    "sortOrder": sortOrder, //sortType
                    "searchText": "",
                    "searchType": 1,
                    "filterType": "0", //최근문서함에만 속하는것 모든 문서 조회( 내 문서 & 공유받은 문서)
                }
            }
        }
        else if( sortMenuState.contextName === 'TrashDoc'){
            data = {
                protocolId: "P550", //"P539"
                data: {
                    "folder_no": folderSeq,
                    "list_count": listCount,
                    "pageIndex": pageNum,
                    "pageSize": listCount,
                    "sortItem": sortItem, //selectSortMenu 정렬 타입 1:문서제목/2:최종수정일/3:생성일/4:생성자/5:파일사이즈/6:삭제된 날짜
                    "sortOrder": sortOrder, //sortType 오름차순: a, 내림차순: d 
                    "searchText": "", // 검색 값
                    "searchType": 1, //검색 타입 0:전체/1:문서명/2:등록자
                }
            }
        }
        else {
            data = {
                protocolId: "P627", //"P539"
                data: {
                    "folder_no": folderSeq,
                    // "loadType": 1,
                    "listType": listType,
                    "list_count": listCount,
                    "pageIndex": pageNum,
                    "pageSize": listCount,
                    "fileTypes": fileTypes,//docType > 모든 문서 : '', 원피스: 'O',피피티: 'S'
                    "sortItem": sortItem, //selectSortMenu
                    "sortOrder": sortOrder, //sortType
                    "searchText": "",
                    "searchType": 1,
                    "includeFolder": includeFolder,
                    "includeDoc": includeDoc,
                }
            }
        }
        
        await Adapter.fetch.protocol(data).then((res) => {
            console.log( res);
            if(res && !CommonUtil.objectIsNull( res.list)){
                fileList = res.list;
            }
            
        }).catch((error) => {
            console.error(error)
        })
        
        const tempList = [...dataList, ...fileList]; //기존에 있던거랑 합쳐주기위해서
        setReqListData({...reqListData, folderSeq, listType, listCount, pageNum, sortItem, sortOrder, fileTypes, dataList: tempList, includeFolder, includeDoc})
        
    }, [ reqListData]);

    return {
        reqListData,
        setDataList
    }
}

export default useDocList;