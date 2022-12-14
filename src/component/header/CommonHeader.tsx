import { CommonContext } from '../../context/CommonContext';
import React, { useContext, useMemo } from 'react';
import {TouchableOpacity, View, Text, Dimensions, StyleSheet} from 'react-native';
import SvgIcon from '../../component/svgIcon/SvgIcon';
import CommonUtil from '../../utils/CommonUtil';
import CommonFnUtil from '../../utils/CommonFnUtil';
import SortMenu from '../../menu/SortMenu';
import Toast from 'react-native-toast-message';

interface CommonHeaderInfo {
    headerName: any, // 가운데 표시 될 이름
    multiSelectedState : any, // 다중선택
    setMultiSelected : any,
    headerMenuInfo?: any, // 아이콘 구성
    contextName : string, // 현재 접속한 문서함 => 추후 contextNamerhk headerName으로 이벤트 구분하기 위해
    headerDataInfo : any, // 헤더에서 데이터 전송 시 필요 데이터 저장( ex 공유 관련 쪽지 전송 시)
    navigation: any, //페이지 이동
    fullpath?: any, //폴더 경로
    setFullpath?: any,
    sortMenu: any,
    ViewModeCheck?: any // 문서 보기 모드 ( 리스트/썸넬)
}

const CommonHeader = ( props: CommonHeaderInfo) => {
    const { headerName, 
            multiSelectedState, 
            headerMenuInfo, 
            contextName, 
            sortMenu, 
            ViewModeCheck, 
            headerDataInfo, 
            setFullpath } = props;

    const { centerDialogState, 
            setCenterDialog, 
            selectedTargetState } = useContext(CommonContext);

    const [ headerDataInfos, password] = contextName === 'SecurityDialog' ? headerDataInfo : [];

    const onClickLeftBtn = ( iconName: any) => { // 문서함 뒤로가기 or 팝업 닫기 버튼
        if( iconName === 'UserInfoICon') {
            // navigation.openDrawer();
            setCenterDialog('UserInfoDialog', null, false);
            
        } else if( iconName === 'CommonCloseBtn') {            
            setCenterDialog('', null, false);

            if( centerDialogState.dialogName === 'DocInfoDialog'){
                headerDataInfo([]);
            }
        }
    };
    
    const onClickRightBtn = async( location: any) => { // 아이콘 이벤트
        let resultData:any = null;

        if( location === 'dialog') {
            switch( centerDialogState.dialogName) {
                case 'MoveDialog':
                case 'CopyDialog':
                    resultData = centerDialogState.dialogName === 'MoveDialog' 
                                ? await CommonFnUtil.moveDocumentFolder( selectedTargetState.selectedTarget, props)
                                : await CommonFnUtil.copyDocument( selectedTargetState.selectedTarget, props);

                    setTimeout(() => {
                        if( resultData) {
                            setFullpath({ fullPathUIDs : [ ''], fullPathNames : [ '내 문서함'], treeTypes : []});
                            setCenterDialog( '', null, true);
                        }
                    }, 300);
                    break; 

                case 'TagDialog':
                    const tagLists = onTagValueErrorChk( headerDataInfo);
                    if( tagLists) { 
                        resultData = await CommonFnUtil.updateTag( selectedTargetState.selectedTarget.docUID, tagLists);
                    }

                    setTimeout(() => {
                        if( resultData) {
                            setCenterDialog( '', null, true);
                        }
                    }, 300);
                    break;

                case 'SecurityDialog':
                    if( headerDataInfos.currErrorStatus){
                        switch( headerDataInfos.currSelectedStatus) {
                            case 'change':
                            case 'unSetting':
                                const nSettingType = headerDataInfos.currSelectedStatus === 'change' ? 1 : 2;
                                resultData = await CommonFnUtil.setSecurityPassword( selectedTargetState.selectedTarget.docUID, selectedTargetState.selectedTarget.folder_no,
                                    nSettingType, password.previousPW, password.currentPW);
                                break;

                            case 'setting':
                                resultData = await CommonFnUtil.setSecurityPassword( selectedTargetState.selectedTarget.docUID, selectedTargetState.selectedTarget.folder_no,
                                        0, password.currentPW, password.doubleChkPW);
                                break;
                            default:
                                break;
                        }
                        setTimeout(() => {
                            fnCallback( resultData);
                        }, (1000));
                    }
                    break;

                default:
                    return;
            }
        }
    };

    const fnCallback = ( resMsg: any) => {
        if( !resMsg){
            return;
        }
        else { 
            //암호가 일치하지않음 다이얼로그 띄워주고, 포커스 넣기
            setCenterDialog( '', null, true);
        }
    };

    const onTagValueErrorChk = ( value: any) => {
        const pattern = new RegExp(/[^0-9|^a-z|^ㄱ-ㅎ|^ㅏ-ㅣ|^가-힣|^,]|(\^)/gi);
        const space = new RegExp(/\s/g);

        let result = '';
                    
        if( space.test( value)) { //공백체크
            result = value.replace(/(\s*)/g, "");
        }
        if( result === undefined) { //null체크
            result = value;
        }
        if( pattern.test( result)) { //특수문자 체크
            Toast.show({
                type:'error',
                text1: '※ 특수문자는 태그로 등록할 수 없습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
            return;
        }
        
        let values: any = result.split(',')
                          .filter(function(item) { return item && item.trim().length > 0; });

        if ( values && values.length > 0) {
            values = values.filter(function(a: any, i: any, self: any) { return self.indexOf(a) === i; });
        }
        if( values) { //글자수 제한
            for( let i = 0; i < values.length; i++) {
                if( values[i].length > 21) {
                    Toast.show({
                        type:'error',
                        text1: '※ 태그 1개당 20자를 초과할 수 없습니다.',
                        visibilityTime: 1000,
                        autoHide: true
                    });
                    return;
                }
            }
        }
        if ( values && values.length > 10) { //태그 갯수 제한
            Toast.show({
                type:'error',
                text1: '※ 태그는 10개까지 입력 가능합니다.',
                visibilityTime: 1000,
                autoHide: true
            });
            return;
        }

        return values;
    };

    return useMemo(() => (
        <View style={ CommonHeaderStyles.mainContainer}>
            <View style={[ (headerMenuInfo && headerMenuInfo.rightDialogBtn) && CommonHeaderStyles.rightBtnStyle, CommonHeaderStyles.MenuContainer]}>
                {/* { (!CommonUtil.objectIsNull( headerMenuInfo) || !centerDialogState.dialogName) &&
                    <TouchableOpacity onPress={ onClickLeftBtn.bind( this, 'UserInfoICon')}>
                        <View>
                            <SvgIcon name="NoProfile" width={28} height={28}/>
                        </View>
                    </TouchableOpacity>
                } */}
                { !CommonUtil.objectIsNull( headerMenuInfo.leftBtn) && 
                    <View>
                        { headerMenuInfo.leftBtn.map( ( btnInfo: any) => {
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

                { CommonUtil.objectIsNull( headerMenuInfo.rightDialogBtn) &&
                    <View>
                        <View>
                            <Text style={[ CommonHeaderStyles.headerTitle, {marginLeft: (headerMenuInfo.rightBtn && 7)}]}>{ multiSelectedState ? headerMenuInfo.centerText.title : headerName}</Text>
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
                    </View>   
                }
            </View>

            {/* 오른쪽 메뉴 */}
            { !CommonUtil.objectIsNull( headerMenuInfo.rightDialogBtn) && 
                <View>
                    {
                        headerMenuInfo.rightDialogBtn.map(( btnInfo: any) => {
                            if( btnInfo.visibility){
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
                <View style={ CommonHeaderStyles.MenuContainer}>
                    <View style={ CommonHeaderStyles.rightMenuContainer}>
                        {
                            headerMenuInfo.rightBtn.map( ( btnInfo: any) => {
                                if( btnInfo.visibility){
                                    return (
                                        <TouchableOpacity key={btnInfo.iconName} onPress={ onClickRightBtn.bind( this, 'home')}>
                                            <View>
                                                <SvgIcon name = { btnInfo.iconName} width={17} height={17}/>
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
    ), [ headerMenuInfo]);
}

export default CommonHeader;

const CommonHeaderStyles = StyleSheet.create({
    mainContainer: {
        width: '100%', 
        height:50,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10, 
        borderRadius: 10,
    },
    MenuContainer: {
        flexDirection: 'row', 
        justifyContent:'space-between', 
        alignItems:'center',
    },
    headerTitle: {
        textAlign:'center',
        fontSize:21,
        fontWeight:'bold', 
        color:'#75b9f4'
    },
    rightMenuContainer: {
        width:50, 
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginRight: 15
    },
    rightBtnStyle: {
        width:Dimensions.get('window').width - 200
    },
});