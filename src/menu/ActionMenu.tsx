import { ActionSheetCustom} from '@alessiocancian/react-native-actionsheet'
import React, {useContext, useState, useEffect, useRef, useMemo} from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import CommonFnUtil from '../utils/CommonFnUtil';
import SvgIcon from '../component/svgIcon/SvgIcon';
import CommonUtil from '../utils/CommonUtil';
import { moreMenuStyles} from '../menu/style/style';
import { CommonContext } from '../context/CommonContext';
{/*
   1.어떤 문서함인지
   2.정렬버튼 on/off(하단 메뉴가 나오고 안나오고 상태) 
   3.화살표 방향 값
   4.최근조회문서 인지 모든문서타입을 클릭햇는지 
   5.데이터리스트
   6.함수 
   7.선택된 정렬 메뉴 값

   =============

   1.어떤 문서함인지
   2.액션시트 구분 값
   6.함수 

   5.데이터리스트

   4.최근조회문서 인지 모든문서타입을 클릭햇는지 
   7.선택된 정렬 메뉴 값
   3.화살표 방향 값


   1. contextName = > 문서함 종류
   2. actionName => 액션시트 종류
   3. setIsActionMenu => 메뉴 선택된지를 판별하는함수
   4. actionMenuInfo

   actionMenuInfo = list;

   actionMenuInfo = {
        7.선택된 정렬 메뉴 값
        3.화살표 방향 값
   }
*/}
const myDocMenuInfo:any = {    
    'share':{name:'원커넥트',auth: 'Read',rightMenu: true, folderMenu: true, icon:'ActionShare',clickEvent: CommonFnUtil.onClickShare},
    'linkCopy':{name:'링크복사',auth:'Read',rightMenu: false, folderMenu: false, icon:'ActionLinkCopy',clickEvent: CommonFnUtil.linkCopyEvent},
    'ONECHAMBER(PDF)':{name:'PDF', auth:'Read',rightMenu: false, folderMenu: false, icon:'ActionOneSave',clickEvent: CommonFnUtil.onClickOneChamberSave},
    'move':{name:'이동',auth: 'Read',rightMenu: false, folderMenu: true, icon:'ActionMove',clickEvent: CommonFnUtil.onClickMoveOpen},
    'copy':{name:'사본 만들기',auth:'Update',rightMenu: false, folderMenu: false, icon:'ActionCopy',clickEvent: CommonFnUtil.onClickCopy},
    'changeName':{name:'이름 변경', auth:'Read',rightMenu: false, folderMenu: true, icon:'ActionReName',clickEvent: CommonFnUtil.onClickRename},
    'addOwnForm':{name:'나만의 양식 추가',auth: 'Read',rightMenu: false,folderMenu: false, icon:'ActionSetViewOnlyOFF',clickEvent: CommonFnUtil.onClickAddOwnForm},
    'deleteInTrash':{name:'영구삭제',auth:'Update',rightMenu: false, folderMenu: false, icon:'deleteBtn',clickEvent: CommonFnUtil.onClickDeleteInTrash},
    'restore':{name:'복원',auth:'Update',rightMenu: false, folderMenu: false, icon:'ActionReName',clickEvent: CommonFnUtil.onClickRestore},
    'relatedDoc':{name:'연관문서',auth: 'Read',rightMenu: false, folderMenu: false, icon: 'ActionRelateDoc',clickEvent: CommonFnUtil.onClickRelatedDoc},
    'setViewOnly':{name:['읽기 전용 ON','읽기 전용 OFF'],auth:'Update',rightMenu: false, folderMenu: false, icon:['ActionSetViewOnlyON', 'ActionSetViewOnlyOFF'],clickEvent: CommonFnUtil.onClickSetViewOnly},
    'setPassword':{name:'보안설정', auth:'Read',rightMenu: true, folderMenu: false, icon:'ActionSetPW',clickEvent: CommonFnUtil.onClickSetPassword},
    'setTag':{name:'태그설정', auth:'Read',rightMenu: false, folderMenu: false, icon:'docTag',clickEvent: CommonFnUtil.onClickSetTag},
    'docDetailInfo':{name:'문서상세정보', auth:'Read',rightMenu: true, folderMenu: false, icon:'ActionInfo',clickEvent: CommonFnUtil.onClickDetailDocInfo},
    'docInfo':{name:'문서정보', auth:'Read',rightMenu: false, folderMenu: false, icon:'ActionInfo',clickEvent: CommonFnUtil.onClickDocInfo},
    'docHistory':{name:'문서이력', auth:'Read',rightMenu: false, folderMenu: false, icon:'ActionInfo',clickEvent: CommonFnUtil.onClickDocHistory},
    'openLink' : { name: '오픈링크', icon: 'OpenLink', rightItem : true, folderMenu: false, menuEvent: CommonFnUtil.onClickOnOffLink},
    'openLinkRead' : { name: '읽기', icon: '', value: 'R', rightItem : false, folderMenu: false, menuEvent: CommonFnUtil.onChangeOpenAuth},
    'openLinkUpdate' : { name: '수정', icon: '', value: 'U', rightItem : false, folderMenu: false, menuEvent: CommonFnUtil.onChangeOpenAuth},
    'groupNuserShare' : { name: '부서/사용자 공유', icon: 'ActionGroupNUserShare', rightItem : true, folderMenu: false, menuEvent: CommonFnUtil.onChangeOpenAuth},
};

const ActionMenu = () => {
    const moreMenus = ['share','linkCopy','ONECHAMBER(PDF)','move',
                        'copy','changeName','addOwnForm','relatedDoc',
                        'setViewOnly','setPassword','setTag','docDetailInfo',];

    const shareSubMenu = ['openLink','groupNuserShare']; //'openLinkRead', 'openLinkUpdate',
    const detailDocInfo = ['docInfo','docHistory']; //'openLinkRead', 'openLinkUpdate',
    const removeSubMenu = ['deleteInTrash','restore'];

    let folderMoreMenus: any = [];

    const { setCenterDialog, 
            actionMenuState, 
            setIsActionMenu, 
            setAlertDialog,
            sortMenuState,
            swipeItemState,
            setSwipeItem,
            selectedTargetState } = useContext(CommonContext);

    // const [ clickMenu, setClickMenu] = useState([]);
    const [ options, setOptions] = useState( []);
    const [ menus, setMenus] = useState( []);
    const [ nextActionMenu, setNextActionMenu] = useState( ''); // 서브메뉴 체크용

    const actionSheetRef = useRef( null);

    useEffect(() => {
        if( actionMenuState.isActionMenu){
            if( !CommonUtil.strIsNull(nextActionMenu)) {
                setMenus( nextActionMenu === 'shareSubMenu' ? shareSubMenu : detailDocInfo );
            }else {
                setMenus( sortMenuState.contextName === 'TrashDoc' ? removeSubMenu : moreMenus);
            }

            actionSheetRef.current.show(); //액션 메뉴 열어주려면 있어야함
        }
    }, [ actionMenuState.isActionMenu, nextActionMenu]);
    
    useEffect(()=> {
        searchClickMenu();
    }, [ menus]);

    const hiddenActionMenu = () => {
        setIsActionMenu( false, null);
        
        actionSheetRef.current.hide();
    };

    const searchClickMenu = () => {

        if( sortMenuState.contextName !== 'TrashDoc'){
            moreMenus.map(( menu:any) => {
                if( myDocMenuInfo[menu]['folderMenu']) {
                    folderMoreMenus.push( menu);
                }
            });
        }

        setOptions( renderMoreMenu( sortMenuState.contextName !== 'TrashDoc' && selectedTargetState.selectedTarget?.doc_type === '0' 
                                    ? folderMoreMenus 
                                    : ( menus.length === 0 ? moreMenus : menus)
        ));
    }

    // const renderMoreMenu = ( clickMenu:any) => {
    //     let options:any = [];
    //     let menus: any = null;

    //     for(let i= 0; i<clickMenu.length; i++){
    //         //문서가 가지고 있는 자체의 권한과 더보기 메뉴들이 갖고 있는 권한을 비교해서 해당 메뉴를 그릴지 말지 체크
    //         // if(myDocMenuInfo[clickMenu[i]].auth){ //|| CommonFnUtil.checkAuth( myDocMenuInfo[clickMenu[i]].auth, selectedTargetState.selectedTarget.data.docAuth)
                
    //         // }
    //         options.push(
    //             // 이동 클릭 시 무한루프에 빠진 이유는 텍스트에만 클릭 속성을 걸어놔서 그런것임!!
    //            <TouchableOpacity onPress={() => onClickActionMenuItemMore(clickMenu[i])}>
    //                 <View key={myDocMenuInfo[clickMenu[i]]} style={moreMenuStyles.container}>
    //                     <View style={moreMenuStyles.menuIconContainer}>
    //                         { !CommonUtil.strIsNull(myDocMenuInfo[clickMenu[i]].icon) &&
    //                             <View>
    //                                 <SvgIcon name={myDocMenuInfo[clickMenu[i]].icon} width={20} height={20}/>
    //                                 <Text>{ myDocMenuInfo[clickMenu[i]].name}</Text>
    //                             </View>
    //                         }
    //                     </View>
                        
    //                     {/* <View style={moreMenuStyles.menuContainer}>
    //                         <View style={moreMenuStyles.menuTextCon}>
    //                             <Text style={{width:width - 170}}>{myDocMenuInfo[clickMenu[i]].name}</Text>
    //                             {
    //                                 myDocMenuInfo[clickMenu[i]].rightMenu &&
    //                                 (rightItemRender( clickMenu[i]))
    //                             }
    //                         </View>
    //                     </View> */}
    //                 </View>
    //            </TouchableOpacity>
    //         );
    //         // if(clickMenu[i] === ('openLink')){ // 밑으로 메뉴가 생기는 것
    //         //     options = options.concat( subItemRender(clickMenu[i]));
    //         // }
    //     }
    //     return options;
    // } 
    
    const renderMoreMenu = ( clickMenu:any) => {
        //배열을 n 개로 나누기
        const division = ( array: any, n: number) => {
            const length = array.length;
            const divide = Math.floor(length / n) + (Math.floor( length % n ) > 0 ? 1 : 0);
            const newArray = [];
            
            for (let i = 0; i <= divide; i++) {
                // 배열 0부터 n개씩 잘라 새 배열에 넣기
                newArray.push( array.splice(0, n)); 
            }
            
            return newArray;
        };

        let menus = division( clickMenu, 4);

        let options:any = [];
        let menuContent:any = [];

        for( let i=0; i<menus.length; i++){
            for(let j=0; j<menus[i].length;j++){
                menuContent.push(
                    <TouchableOpacity key={ myDocMenuInfo[menus[i][j]].name} onPress={() => onClickActionMenuItemMore(menus[i][j])}>
                        <View style={ moreMenuStyles.container}>
                            <View style={ moreMenuStyles.menuIconContainer}>
                                { !CommonUtil.strIsNull( myDocMenuInfo[menus[i][j]].icon) &&
                                    <View style={ moreMenuStyles.menuItemContainer}>
                                        { menus[i][j] === 'setViewOnly' ?
                                            <>
                                                <SvgIcon name={ selectedTargetState.selectedTarget?.readonly ? myDocMenuInfo[menus[i][j]].icon[0] : myDocMenuInfo[menus[i][j]].icon[1]} width={20} height={20}/>
                                                <Text style={{ fontSize: 11, paddingTop:5}}>{ selectedTargetState.selectedTarget?.readonly ? myDocMenuInfo[menus[i][j]].name[0] : myDocMenuInfo[menus[i][j]].name[1]}</Text>
                                            </>
                                            :
                                            <>
                                                <SvgIcon name={ myDocMenuInfo[menus[i][j]].icon} width={20} height={20}/>
                                                <Text style={{ fontSize: 11, paddingTop:5}}>{ myDocMenuInfo[menus[i][j]].name}</Text>
                                            </>
                                        }
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }

            let menuContainer = [];
                menuContainer.push(
                    <View key={'action'} style={{ flexDirection:'row', justifyContent:'space-around'}}>
                        { menuContent}
                    </View>
                );
                menuContent = [];

            options.push( menuContainer);
        }
        return options;
    };

    const onClickActionMenuItemMore = async( menuName : string) => {
        const returnVal = await myDocMenuInfo[ menuName].clickEvent();
        const naviVal = returnVal.split('|');

        switch( naviVal[0]) {
            case 'newWindow':
                setCenterDialog( naviVal[1], null);
                setOptions( []);
                
                hiddenActionMenu();
                break;

            case 'nextActionMenu':
                setNextActionMenu( naviVal[1]);
                break;

            case 'alert':
                let alertName = '';
                let alertItem = {};

                if( naviVal[1] === 'rename' || naviVal[1] === 'addOwnForm' || naviVal[1] === 'newFolder') {
                    alertName = 'inputAlert';
                    alertItem = {
                        title: naviVal[1] === 'rename' ? '이름 변경' : naviVal[1] === 'addOwnForm' ? '나만의 양식 추가' : '새 폴더 추가',
                        menuNM: naviVal[1]
                    };
                }
                else {
                    alertName = 'alert';
                    alertItem =  {
                        alertType: 'Trash',
                        menuNM : naviVal[1] === 'deleteInTrash' ? 'deleteInTrash' : 'restore',
                        description : naviVal[1] === 'deleteInTrash' ? [ '영구삭제 시, 삭제된 파일은 복구할 수 없습니다.', '영구삭제하시겠습니까?'] : ['복원하시겠습니까?'],
                    }; 
                }
                
                setOptions( []);
                
                hiddenActionMenu();

                setTimeout(() => {
                    setAlertDialog( alertName, alertItem);
                },500)
                break;

            case "dialog":
                setCenterDialog( naviVal[1] === 'docInfo' ? 'DocInfoDialog': 'DocHistory',null);
    
                setOptions( []);
                setNextActionMenu( '');
                
                hiddenActionMenu();
                break;

            case 'toast':
                const docUID = selectedTargetState.selectedTarget.docUID;
                const isReadOnly = !selectedTargetState.selectedTarget.readonly ? 1 : 0;

                const result = CommonFnUtil.setReadOnly( docUID, isReadOnly);
                
                setTimeout(() =>{
                    setSwipeItem({
                        ...swipeItemState,
                        setReadOnly: result,
                    });
                }, 1000);

                setOptions( []);
                hiddenActionMenu();

                break;

            default:
                return;
        }
    }

    const onCloseEvent = (index : any) =>{
        if(index == -1){
            setOptions( []);
            setNextActionMenu( '');

            hiddenActionMenu();
        }
    }

    return useMemo(() => (
        <>
            <ActionSheetCustom
                ref={ actionSheetRef}
                title={
                    <View style={ actionMenuStyleSheet.actionMenuTitleContaier}>
                        <View style={ actionMenuStyleSheet.actionMenuTitleIconContent}>
                            <View style={ actionMenuStyleSheet.actionMenuTitleIcon}/>
                        </View>
                        <View style={ actionMenuStyleSheet.actionMenuTitleTextContent}>
                            <Text style={ actionMenuStyleSheet.actionMenuTitleText}>더보기</Text>
                        </View>
                    </View>
                }
                options={ options}
                onPress={ onCloseEvent }
                styles={ styles}
                cancelButtonIndex={-1}
                theme={"ios"}
            />
        </>
    ), [ options]);
}

const styles={
    titleBox : {
        opacity: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    buttonBox : {
        opacity: 1,
        backgroundColor: '#fff'
    },
    cancelButtonBox : {
        opacity: 0,
        display: 'none'
    }
}

export default ActionMenu;

export const actionMenuStyleSheet = StyleSheet.create({

    actionMenuTitleContaier : {
        width: '100%',
        flexDirection: 'column',
    },
    actionMenuTitleIconContent : {
        height: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    actionMenuTitleIcon : {
        height: 5,
        width: 30,
        backgroundColor: '#d8d9dd',
        borderRadius: 100
    },
    actionMenuTitleTextContent : {
        height: 28,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
    },
    actionMenuTitleText : {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 2
    },
})

// 공유 꺼짐 같은 오른쪽 메뉴
    // const rightItemRender = ( menuName : string) => {
    //     let content : any = null;

    //     if( menuName === 'share' || menuName === 'setPassword'){
    //         content = (
    //                     <View style={{flexDirection:'row'}}>
    //                         <Text style={{paddingTop:3}}>꺼짐</Text>
    //                         <SvgIcon name="R_menuNextPageBtn" width={22} height={20} />
    //                     </View>
    //                   )
    //     }else if( menuName === 'setFavorite' || menuName === 'setViewOnly'){
    //         content = (
    //             <SvgIcon name="R_menuSwitchON" width={42} height={32} />
    //         )
    //     }else if( menuName === 'detailDocInfo'){
    //         content = (
    //             <SvgIcon name="R_menuNextPageBtn" width={22} height={20}/>
    //         )
    //     }

    //     return (
    //         <>
    //             {content}
    //         </>
    //     )
    // }

    // const subItemRender = ( menuType : string) => {
    //     let subOptions : any = [];

    //     if( menuType === 'openLink' && selectedTargetState.selectedTarget.flagOpen){
    //         const subMenus = [ 'openLinkRead', 'openLinkUpdate'];

    //         for( let i=0; i<subMenus.length; i++){
    //             subOptions.push(
    //                     <View key={subMenus[i]} style={ actionMenuStyleSheet.actionMenuItem}>
    //                         <TouchableOpacity onPress={ onClickMenu.bind( this, subMenus[i])}>
    //                             <View style={ [actionMenuStyleSheet.actionMenuLineBox, {width: Dimensions.get('window').width - 52}]}>
    //                                 <View style={ actionMenuStyleSheet.actionMenuItemContent}>
    //                                     <View style={{width: 22, height: 22}}/>
    //                                 </View>
    //                                 <View style={ actionMenuStyleSheet.actionMenuItemContent}>
    //                                     <Text style={ actionMenuStyleSheet.actionMenuItemTitle}>{menuInfo[subMenus[i]].name}</Text>
    //                                     {   selectedTargetState.selectedTarget.openAuth === menuInfo[subMenus[i]].value &&
    //                                         rightItemRender( 'openLinkCheck')}
    //                                 </View>
    //                             </View>
    //                         </TouchableOpacity>
    //                     </View>
    //             )
    //         }
    //     }

    //     return subOptions;
    // }