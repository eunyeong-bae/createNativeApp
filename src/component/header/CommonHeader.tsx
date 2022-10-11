import { CommonContext } from '../../context/CommonContext';
import React, { useContext } from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import SvgIcon from '../../component/svgIcon/SvgIcon';
import CommonUtil from '../../utils/CommonUtil';
import CommonFnUtil from '../../utils/CommonFnUtil';
import SortMenu from '../../menu/SortMenu';

interface CommonHeaderInfo {
    headerName: any, // 가운데 표시 될 이름
    multiSelectedState : any, // 다중선택
    setMultiSelected : any,
    headerMenuInfo: any, // 아이콘 구성
    contextName : string, // 현재 접속한 문서함 => 추후 contextNamerhk headerName으로 이벤트 구분하기 위해
    headerDataInfo : any, // 헤더에서 데이터 전송 시 필요 데이터 저장( ex 공유 관련 쪽지 전송 시)
    navigation: any,
    fullpath?: any,
    setFullpath?: any,
    sortMenu: any,
    ViewModeCheck?: any
}

const CommonHeader = (props: CommonHeaderInfo) => {
    const { centerDialogState, setCenterDialog, actionMenuState, setIsActionMenu, selectedTargetState, setSelectedTarget} = useContext(CommonContext);
    const { navigation, fullpath, setFullpath} = props;

    const { headerName, multiSelectedState, setMultiSelected, headerMenuInfo, contextName, headerDataInfo, sortMenu, ViewModeCheck} = props;

    const onClickLeftBtn = ( iconName: any) => { // 문서함 뒤로가기 or 팝업 닫기 버튼
        console.log( actionMenuState)
        if( iconName === 'HomeMenuBtn') {
            navigation.openDrawer();
            
        } else if( iconName === 'CommonCloseBtn') {            
            setCenterDialog('', null);
        }
    };

    console.log( centerDialogState.dialogName)

    const onClickRightBtn = ( location: any, docData: any) => { // 아이콘 이벤트
        let resultData:any = null;

        if( docData && location === 'dialog') {
            if( centerDialogState.dialogName === 'MoveDialog'){
                const isFolder = docData.doc_type === '0';
                const protocolId = isFolder ? 'P624' : 'P619';
                const dataInfo = isFolder ? 
                    {
                        "folder_no": docData.docUID,
                        "new_folder_no": fullpath.fullPathUIDs[fullpath.fullPathUIDs.length - 1],
                    }
                :
                    {
                        "docUID": docData.docUID,
                        "folder_id": fullpath.fullPathUIDs[fullpath.fullPathUIDs.length - 1],
                    };
    
                resultData = CommonFnUtil.moveDocumentFolder( protocolId, dataInfo);
    
                // if( resultData) {
                //     alert( 'success');
    
                //     setFullpath({ fullPathUIDs : [ ''], fullPathNames : [ '내 문서함'], treeTypes : []});
                //     setCenterDialog('', null);
                // }
            } else if( centerDialogState.dialogName === 'CopyDialog'){
                const protocolId = 'P528';
                const dataInfo = {
                    "docUID": docData.docUID, 
                    "folder_no": fullpath.fullPathUIDs[fullpath.fullPathUIDs.length - 1], 
                    "doc_title": headerDataInfo.docTitle, 
                    "bContentCopy": false, 
                    "isRemoveSektch": false 
                };

                resultData = CommonFnUtil.copyDocument( protocolId, dataInfo);

            } else {
                //pdf
            }

            if( resultData) {
                alert( 'success');

                setFullpath({ fullPathUIDs : [ ''], fullPathNames : [ '내 문서함'], treeTypes : []});
                setCenterDialog('', null);
            }

        } else{

        }
    };

    return (
        <View style={{width: '100%', height:60,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10,borderBottomWidth:1,borderBottomColor:'#ddd'}}>
            <View style={{ width:120, flexDirection: 'row', justifyContent:'space-between', alignItems:'center', borderWidth:1,borderColor:'red'}}>
                {
                    !CommonUtil.objectIsNull( headerMenuInfo.leftBtn) && 
                        <View>
                            { 
                                headerMenuInfo.leftBtn.map( ( btnInfo: any, index: number) => {
                                    if( btnInfo.visibility) {
                                        return (
                                            <TouchableOpacity key={btnInfo.iconName} onPress={ onClickLeftBtn.bind( this, btnInfo.iconName) }>
                                                <View>
                                                    <SvgIcon name={ btnInfo.iconName} width={20} height={20} />
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }
                                })
                            }
                        </View>
                }

                {/* 중간 메뉴 
                style= {{height:30}}
                */}
                <View>
                    { headerName === 'ONEFFICE' ? 
                        <Image source={ require('../../assets/oneffice/images/oneffice-bi.png')} style={{ width:50, height:24}}/> 
                        : 
                        <View>
                            <Text style={{ textAlign:'center',fontSize:20,fontWeight:'600'}}>{ multiSelectedState ? headerMenuInfo.centerText.title : headerName}</Text>
                            {
                                multiSelectedState && 
                                <>
                                    <TouchableOpacity>
                                        <Text>{headerMenuInfo.centerText.selectAllBtn}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text>{headerMenuInfo.centerText.unselectAllBtn}</Text>
                                    </TouchableOpacity>
                                </>
                            }
                        </View>
                    }
                </View>
            </View>
            {/* 오른쪽 메뉴 */}
            {!CommonUtil.objectIsNull( headerMenuInfo.rightDialogBtn) && 
                <View>
                    {
                        headerMenuInfo.rightDialogBtn.map(( btnInfo: any, index: number) => {
                            if(btnInfo.visibility){
                                return(
                                    <TouchableOpacity key={ btnInfo.iconName} onPress={ onClickRightBtn.bind( this, 'dialog', selectedTargetState.selectedTarget)}>
                                        <View>
                                            <SvgIcon name = { btnInfo.iconName} width={20} height={20}/>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>
            }
            {
                !CommonUtil.objectIsNull( headerMenuInfo.rightBtn) &&
                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{width:50, flexDirection:'row', justifyContent:'space-between', marginRight: 15}}>
                        {
                            headerMenuInfo.rightBtn.map( ( btnInfo: any, index: number) => {
                                if( btnInfo.visibility){
                                    return (
                                        <TouchableOpacity key={btnInfo.iconName} onPress={ onClickRightBtn.bind( this, 'home', '')}>
                                            <View>
                                                <SvgIcon name = { btnInfo.iconName} width={20} height={20}/>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                    <SortMenu 
                        contextName = { contextName}
                        selectedValue = { null}
                        sortMenu = { sortMenu}
                        ViewModeCheck = { ViewModeCheck}
                    />
                </View>
            }
        </View>
    );
}

export default CommonHeader;

function asycn(arg0: { docData: any; }) {
    throw new Error('Function not implemented.');
}
