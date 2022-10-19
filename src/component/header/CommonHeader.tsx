import { CommonContext } from '../../context/CommonContext';
import React, { useContext } from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import SvgIcon from '../../component/svgIcon/SvgIcon';
import CommonUtil from '../../utils/CommonUtil';
import CommonFnUtil from '../../utils/CommonFnUtil';
import SortMenu from '../../menu/SortMenu';
import Toast from 'react-native-toast-message';

interface CommonHeaderInfo {
    headerName: any, // 가운데 표시 될 이름
    multiSelectedState : any, // 다중선택
    setMultiSelected : any,
    headerMenuInfo: any, // 아이콘 구성
    contextName : string, // 현재 접속한 문서함 => 추후 contextNamerhk headerName으로 이벤트 구분하기 위해
    headerDataInfo : any, // 헤더에서 데이터 전송 시 필요 데이터 저장( ex 공유 관련 쪽지 전송 시)
    navigation: any, //페이지 이동
    fullpath?: any, //폴더 경로
    setFullpath?: any,
    sortMenu: any,
    ViewModeCheck?: any // 문서 보기 모드 ( 리스트/썸넬)
}

const callFunctions = new Map()
    .set('MoveDialog', CommonFnUtil.moveDocumentFolder)
    .set('CopyDialog', CommonFnUtil.copyDocument)

const CommonHeader = (props: CommonHeaderInfo) => {
    const { headerName, multiSelectedState, setMultiSelected, headerMenuInfo, contextName, headerDataInfo, sortMenu, ViewModeCheck, navigation, fullpath, setFullpath} = props;
    const { centerDialogState, setCenterDialog, actionMenuState, setIsActionMenu, selectedTargetState, setSelectedTarget} = useContext(CommonContext);

    const onClickLeftBtn = ( iconName: any) => { // 문서함 뒤로가기 or 팝업 닫기 버튼
        // console.log( actionMenuState)
        if( iconName === 'UserInfoICon') {
            // navigation.openDrawer();
            setCenterDialog('UserInfoDialog', null);
            
        } else if( iconName === 'CommonCloseBtn') {            
            setCenterDialog('', null);
        }
    };
    
    // console.log( centerDialogState.dialogName)
    const onClickRightBtn = ( location: any) => { // 아이콘 이벤트
        let resultData:any = null;

        if( location === 'dialog') {
            switch( centerDialogState.dialogName) {
                case 'MoveDialog':
                    resultData = CommonFnUtil.moveDocumentFolder( selectedTargetState.selectedTarget, props);
                    break; 
                case 'CopyDialog':
                    resultData = CommonFnUtil.copyDocument( selectedTargetState.selectedTarget, props);
                    break; 
                // case 'PdfDialog':
                //     break; 
                default:
                    return;
            }

            setTimeout(() => {
                if( resultData) {
                    console.log( resultData);
    
                    setFullpath({ fullPathUIDs : [ ''], fullPathNames : [ '내 문서함'], treeTypes : []});
                    setCenterDialog('', null);
                }
            }, 300);

        } else{

        }
    };

    return (
        <View style={{width: '100%', height:40,flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:10,paddingRight:10}}>
            <View style={{ width:120, flexDirection: 'row', justifyContent:'space-between', alignItems:'center'}}>
                { !CommonUtil.objectIsNull( headerMenuInfo.leftBtn) && 
                    <View>
                        { 
                            headerMenuInfo.leftBtn.map( ( btnInfo: any) => {
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

                <View>
                    { headerName === 'ONEFFICE' ? 
                        <Image source={ require('../../assets/oneffice/images/oneffice-bi.png')} style={{ width:50, height:24}}/> 
                        : 
                        <View>
                            <Text style={{ textAlign:'center',fontSize:20,fontWeight:'600'}}>{ multiSelectedState ? headerMenuInfo.centerText.title : headerName}</Text>
                            { multiSelectedState && 
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
            { !CommonUtil.objectIsNull( headerMenuInfo.rightDialogBtn) && 
                <View>
                    {
                        headerMenuInfo.rightDialogBtn.map(( btnInfo: any) => {
                            if(btnInfo.visibility){
                                return(
                                    <TouchableOpacity key={ btnInfo.iconName} onPress={ onClickRightBtn.bind( this, 'dialog')}>
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
            { !CommonUtil.objectIsNull( headerMenuInfo.rightBtn) &&
                <View style={{ flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <View style={{width:50, flexDirection:'row', justifyContent:'space-between', marginRight: 15}}>
                        {
                            headerMenuInfo.rightBtn.map( ( btnInfo: any) => {
                                if( btnInfo.visibility){
                                    return (
                                        <TouchableOpacity key={btnInfo.iconName} onPress={ onClickRightBtn.bind( this, 'home')}>
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
