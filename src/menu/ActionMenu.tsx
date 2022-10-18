import { ActionSheetCustom} from '@alessiocancian/react-native-actionsheet'
import React, {useContext, useState, useEffect, useRef, useMemo} from 'react';
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native';
import CommonFnUtil from '../utils/CommonFnUtil';
import SvgIcon from '../component/svgIcon/SvgIcon';
import CommonUtil from '../utils/CommonUtil';
import {sortMenuStyles, moreMenuStyles} from '../menu/style/style';
import { CommonContext } from '../context/CommonContext';
import Toast from 'react-native-toast-message';

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

const docTypes = ['allDocType','oneffice','oneffieSlide']
const MyDocSortType = ['DocTitle','LastModifiedDate','LastViewedDate'];
const ShareDocSortType = ['DocTitle','LastModifiedDate','Owner','SharedDate','LastViewedDate'];

const myDocMenuInfo:any = {    
    'share':{name:'원커넥트',auth: 'Read',rightMenu: true,icon:'ActionShare',clickEvent: CommonFnUtil.onClickShare},
    'linkCopy':{name:'링크 복사',auth:'Read',rightMenu: false,icon:'ActionLinkCopy',clickEvent: CommonFnUtil.linkCopyEvent},
    'ONECHAMBER(PDF)':{name:'PDF', auth:'Read',rightMenu: false,icon:'ActionOneSave',clickEvent: CommonFnUtil.onClickOneChamberSave},
    'move':{name:'이동',auth: 'Read',rightMenu: false,icon:'ActionMove',clickEvent: CommonFnUtil.onClickMoveOpen},
    'copy':{name:'사본 만들기',auth:'Update',rightMenu: false,icon:'ActionCopy',clickEvent: CommonFnUtil.onClickCopy},
    'changeName':{name:'이름 변경', auth:'Read',rightMenu: false,icon:'ActionReName',clickEvent: CommonFnUtil.onClickRename},
    'addOwnForm':{name:'나만의 양식 추가',auth: 'Read',rightMenu: false,icon:'ActionSetViewOnly',clickEvent: CommonFnUtil.onClickAddOwnForm},
    'delete':{name:'삭제',auth:'Update',rightMenu: false,icon:'ActionReName',clickEvent: CommonFnUtil.onClickRemove},
    'setFavorite':{name:'중요 표시', auth:'Read',rightMenu: false,icon: ['ActionCategoryOff', 'ActionCategoryOn'],clickEvent: CommonFnUtil.onClickSetFavCatergory},
    'relatedDoc':{name:'연관 문서',auth: 'Read',rightMenu: false,icon: 'ActionRelateDoc',clickEvent: CommonFnUtil.onClickRelatedDoc},
    'setViewOnly':{name:'읽기 전용 설정',auth:'Update',rightMenu: false,icon:['ActionSetViewOnly', 'ActionCategoryOn'],clickEvent: CommonFnUtil.onClickSetViewOnly},
    'setPassword':{name:'보안 설정', auth:'Read',rightMenu: true,icon:'ActionSetPW',clickEvent: CommonFnUtil.onClickSetPassword},
    'setTag':{name:'태그 설정', auth:'Read',rightMenu: false,icon:'ActionSetViewOnly',clickEvent: CommonFnUtil.onClickSetTag},
    'DocInfo':{name:'문서 정보', auth:'Read',rightMenu: false,icon:'ActionInfo',clickEvent: CommonFnUtil.onClickDetailDocInfo},
    'DocHistory':{name:'문서 이력', auth:'Read',rightMenu: false,icon:'ActionInfo',clickEvent: CommonFnUtil.onClickDetailDocInfo},
    'openLink' : { name: '오픈링크', icon: 'OpenLink', rightItem : true, menuEvent: CommonFnUtil.onClickOnOffLink},
    'openLinkRead' : { name: '읽기', icon: '', value: 'R', rightItem : false, menuEvent: CommonFnUtil.onChangeOpenAuth},
    'openLinkUpdate' : { name: '수정', icon: '', value: 'U', rightItem : false, menuEvent: CommonFnUtil.onChangeOpenAuth},
    'groupNuserShare' : { name: '부서/사용자 공유', icon: 'ActionGroupNUserShare', rightItem : true, menuEvent: CommonFnUtil.onChangeOpenAuth},
};

const ActionMenu = () => {
    const moreMenus = ['share','linkCopy','ONECHAMBER(PDF)','move','copy','changeName','addOwnForm','delete','setFavorite','relatedDoc','setViewOnly','setPassword','setTag','DocInfo','DocHistory'];
    const shareSubMenu = ['openLink','groupNuserShare']; //'openLinkRead', 'openLinkUpdate',

    const { selectedTargetState, setSelectedTarget, centerDialogState, setCenterDialog, actionMenuState, setIsActionMenu, alertDialogState, setAlertDialog} = useContext(CommonContext);
    // const [ clickMenu, setClickMenu] = useState([]);
    const [ options, setOptions] = useState([]);
    const [ menus, setMenus] = useState( []);
    const [ nextActionMenu, setNextActionMenu] = useState( ''); // 서브메뉴 체크용
    const [ isClickToastMenu, setIsClickToastMenu] = useState({
        setFavorite: false,
        setReadOnly: false
    });
    const actionSheetRef = useRef( null);

    useEffect(() => {
        if( actionMenuState.isActionMenu){
            if( !CommonUtil.strIsNull(nextActionMenu)) {
                setMenus( shareSubMenu);
            }else {
                setMenus( moreMenus);
            }

            actionSheetRef.current.show(); //액션 메뉴 열어주려면 있어야함
        }
    }, [ actionMenuState.isActionMenu, nextActionMenu]);
    
    useEffect(()=> {
        searchClickMenu();
    }, [ menus]);

    // useEffect(() => {
    //     if( actionMenuState.isActionMenu){
    //         actionSheetRef.current.show();
    //     }
    // },[options]);

    const hiddenActionMenu = () => {
        setIsActionMenu( false, null);
        
        actionSheetRef.current.hide();
    };

    const searchClickMenu = () => {

        setOptions( renderMoreMenu( menus.length === 0 ? moreMenus : menus)); //menus
        // setClickMenu( moreMenus);
        // if( nextActionMenu === 'shareSubMenu'){
        //     setOptions( renderMoreMenu( shareSubMenu));
        // }
        // else{
        //     setOptions( renderMoreMenu( moreMenus));
        // }
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
                    <TouchableOpacity key={ myDocMenuInfo[menus[i][j]]} onPress={() => onClickActionMenuItemMore(menus[i][j])}>
                        <View style={ moreMenuStyles.container}>
                            <View style={ moreMenuStyles.menuIconContainer}>
                                { !CommonUtil.strIsNull( myDocMenuInfo[menus[i][j]].icon) &&
                                    <View style={ moreMenuStyles.menuItemContainer}>
                                        { typeof myDocMenuInfo[menus[i][j]].icon === 'string' ?
                                             <SvgIcon name={ myDocMenuInfo[menus[i][j]].icon} width={20} height={20}/>
                                            : 
                                             <>
                                                { myDocMenuInfo[menus[i][j]].name === '중요 표시' ?
                                                <SvgIcon name={ isClickToastMenu.setFavorite ? myDocMenuInfo[menus[i][j]].icon[1] : myDocMenuInfo[menus[i][j]].icon[0]} width={20} height={20}/>
                                                :
                                                <SvgIcon name={ isClickToastMenu.setReadOnly ? myDocMenuInfo[menus[i][j]].icon[1] : myDocMenuInfo[menus[i][j]].icon[0]} width={20} height={20}/>
                                                }
                                             </>
                                        }
                                        <Text style={{ fontSize: 11, paddingTop:5}}>{ myDocMenuInfo[menus[i][j]].name}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }

            let menuContainer = [];
                menuContainer.push(
                    <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
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
        
        let naviVal = returnVal.split('|');
        if( naviVal[0] === 'newWindow'){
            console.log( centerDialogState)
            setCenterDialog( naviVal[1], null);
            setOptions( []);
            
            hiddenActionMenu();
        }
        else if( naviVal[0] === 'nextActionMenu'){
            // let clickMenu: any = [];

            // if( naviVal[1] === 'shareSubMenu'){
            //     clickMenu = shareSubMenu;
            // }
            
            // setClickMenu( clickMenu);
            // setOptions( renderMoreMenu( clickMenu));
            setNextActionMenu( naviVal[1]);
        }
        else if( naviVal[0] === 'dialog'){
            //inputAlert or alert
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
                alertItem = {
                    title : naviVal[1] === 'remove' ? '삭제' : '없음',
                    description : 'blahblahblahblah'
                }
            }

            
            setOptions( []);
            
            hiddenActionMenu();


            setTimeout(() => {
                setAlertDialog( alertName, alertItem);
            },500)
            
        }
        else if( naviVal[0] === 'toast') {
            
            let textMsg = null;

            if( naviVal[1] === 'setFavorite') {
                console.log( isClickToastMenu.setFavorite);
                textMsg = !isClickToastMenu.setFavorite ? '중요문서로 설정되었습니다.' : '중요문서 설정이 해제되었습니다.';
                setIsClickToastMenu({
                    ...isClickToastMenu,
                    setFavorite: !isClickToastMenu.setFavorite
                });
            }
            else if( naviVal[1] === 'setViewOnly') {
                textMsg = !isClickToastMenu.setReadOnly ?  '읽기 전용로 설정되었습니다.' : '읽기 전용이 해제되었습니다.';
                setIsClickToastMenu({
                    ...isClickToastMenu,
                    setReadOnly: !isClickToastMenu.setReadOnly
                });
            }
            Toast.show({
                type: 'success',
                text1: textMsg,
                visibilityTime: 3000,
                autoHide: true,
            });

            setOptions( []);
            
            hiddenActionMenu();
        }
        // const actionValue = await menuInfo[menuName].menuEvent( selectedTargetState.selectedTarget);

        // if( !CommonUtil.objectIsNull( actionValue)){
        //     onClickMenuAfter( actionValue);
        // }
        // else{
        //     // 오류 처리.. 도 포함해야할 느낌...
        //     console.log( 'onClickMenu Hide');
        //     hiddenActionMenu();
        //     // setIsActionMenu( false, selectedTargetState.selectedTarget, selectedTargetState.index);
        // }
    }

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
                // onPress={test }
                styles={ styles}
                theme={"ios"}
            />
        </>
        ), [  options]); //actionMenuState.isActionMenu, nextActionMenu,
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
    }
}

export default ActionMenu;

export const actionMenuStyleSheet = StyleSheet.create({
    // actionMenuItem : {
    //     width: '100%',
    //     height: 62
    // },
    // actionMenuLineBox : {
    //     height: 61,
    //     marginLeft: 18,
    //     flexDirection: 'row',
    //     flexWrap: 'wrap'
    // },
    // actionMenuItemContent : {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     height: 61
    // },
    // actionMenuSubItem : {
    //     flexDirection: 'row',
    //     justifyContent: 'flex-end',
    //     width: (Dimensions.get('window').width - 84) / 2
    // },
    actionMenuTitleContaier : {
        width: '100%',
        flexDirection: 'column',
        // borderWidth:1,
        // borderColor:'red'
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
        // borderWidth:1,
        // borderColor:'blue'
    },
    actionMenuTitleText : {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 2
    },
    // actionMenuItemTitle : {
    //     fontSize: 16,
    //     marginLeft: 8,
    //     width: (Dimensions.get('window').width - 84) / 2
    // },
    // actionMenuSubItemShareText : {
    //     fontWeight: 'bold',
    //     fontSize: 16
    // },
    // actionMenuShareCountContainer : {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    // actionMenuShareCountContent : {
    //     height: 16,
    //     backgroundColor: '#3c77ea',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     borderRadius: 8,
    //     minWidth: 25,
    //     marginRight: 8
    // },
    // actionMenuShareCountText : {
    //     color: '#fff',
    //     fontSize: 10
    // }
})