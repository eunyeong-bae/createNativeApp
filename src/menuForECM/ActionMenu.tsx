import React, {Component, useContext} from 'react';
import { ActionSheetCustom as ActionSheet} from '@alessiocancian/react-native-actionsheet'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
// import { CommonContext } from '../context/CommonContext';
import CommonUtil from '../utils/CommonUtil';
import CommonFnUtil from '../utils/CommonFnUtil';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { actionMenuStyleSheet} from './style/style'
import SwitchToggle from 'react-native-switch-toggle';

const myDoc = ['share', 'linkCopy', 'copy', 'comment', 'move', 'remove', 'category', 'rename', 'relate', 'docInfoView'];
const myDocFolder = ['share', 'linkCopy', 'copy', 'move', 'remove', 'category', 'rename', 'folderInfoView'];
const docuFlow = ['copy', 'remove', 'category', 'docInfoView'];
const trashBin = ['restore', 'trashBinClean', 'docInfoView'];
const trashBinFolder = ['restore', 'trashBinClean', 'folderInfoView'];
const groupDoc = ['share', 'linkCopy', 'requestAuth', 'copy', 'comment', 'move', 'remove', 'category', 'rename', 'relate', 'docInfoView'];
const groupDocFolder = ['share', 'linkCopy', 'requestAuth', 'copy', 'move', 'remove', 'category', 'rename', 'folderInfoView'];
const companyDoc = ['share', 'linkCopy', 'requestAuth', 'copy', 'comment', 'move', 'remove', 'category', 'rename', 'relate', 'docInfoView'];
const companyDocFolder = ['share', 'linkCopy', 'requestAuth', 'copy', 'move', 'remove', 'category', 'rename', 'folderInfoView'];
const RG = ['category', 'folderInfoView'];
const shareDoc = ['share', 'linkCopy', 'copy', 'comment', 'category', 'rename', 'sharedOff', 'relate', 'docInfoView'];
const shareDocFolder = ['share', 'linkCopy', 'copy', 'category', 'rename', 'sharedOff', 'folderInfoView'];
const shareReceiveDoc = ['share', 'linkCopy', 'requestAuth', 'copy', 'comment', 'category', 'rename', 'relate', 'docInfoView'];
const shareReceiveDocFolder = ['share', 'linkCopy', 'requestAuth', 'copy', 'category', 'rename', 'folderInfoView'];
const categoryDoc = ['share', 'linkCopy', 'requestAuth', 'comment', 'category', 'rename', 'relate', 'docInfoView'];
const categoryDocFolder = ['share', 'category', 'rename', 'folderInfoView'];
const copyActionMenu = ['infoViewLink', 'downloadLink'];
const categoryActionMenu = ['renameCategory', 'removeCategory'];
const attachActionMenu = ['oneChamberSave'];
const shareSubMenu = ['openLink', 'groupNuserShare'];

const menuInfo: any = {
    // auth값, rightItem, 하단에, 
    // 'share': { name: '공유', icon: 'ActionShare', rightItem : true, menuEvent: CommonFnUtil.onClickShare },
    // 'linkCopy': { name: '링크복사', icon: 'ActionLinkCopy', rightItem : false, menuEvent: CommonFnUtil.linkCopyEvent },
    // 'copy': { name: '복사', icon: 'ActionCopy', rightItem : false, menuEvent: CommonFnUtil.onClickCopyOpen },
    // 'comment': { name: '댓글', icon: 'ActionComment', rightItem : false, menuEvent: CommonFnUtil.onClickComment },
    // 'move': { name: '이동', icon: 'ActionMove', rightItem : false, menuEvent: CommonFnUtil.onClickMoveOpen },
    // 'remove': { name: '삭제', icon: 'ActionTrashBin', rightItem : false, auth: 'delete' ,menuEvent: CommonFnUtil.onClickRemove },
    // 'category': { name: '중요표시', icon: 'ActionCategory', rightItem : false, menuEvent: CommonFnUtil.onClickCategory },
    // 'rename': { name: '이름변경', icon: 'ActionReName', rightItem : false, menuEvent: CommonFnUtil.onClickRename },
    // 'relate': { name: '연관문서', icon: 'ActionRelateDoc', rightItem : false, menuEvent: CommonFnUtil.onClickRelateDoc },
    // 'docInfoView': { name: '정보보기', icon: 'ActionInfo', rightItem : false, menuEvent: CommonFnUtil.onClickDocInfoView },
    // 'folderInfoView': { name: '정보보기', icon: 'ActionInfo', rightItem : false, menuEvent: CommonFnUtil.onClickFolderInfoView },
    // 'restore': { name: '복원', icon: 'ActionRestore', rightItem : false, menuEvent: CommonFnUtil.setIsAlertOpen },
    // 'trashBinClean': { name: '영구삭제', icon: 'ActionTrashBin', rightItem : false, menuEvent: CommonFnUtil.setIsAlertOpen },
    // 'requestAuth': { name: '권한요청', icon: 'ActionReqAuth', rightItem : false, menuEvent: CommonFnUtil.onClickRequest },
    // 'sharedOff': { name: '공유해제', icon: 'ActionUnShare', rightItem : false, menuEvent: CommonFnUtil.setIsAlertOpen },
    // 'infoViewLink': { name: '정보보기 링크', icon: 'ActionInfo', rightItem : false, menuEvent: CommonFnUtil.onClickClipBoard },
    // 'downloadLink': { name: '다운로드 링크', icon: 'ActionDown', rightItem : false, menuEvent: CommonFnUtil.onClickClipBoard },
    // 'renameCategory': { name: '카테고리명 변경', icon: 'ActionReName', rightItem : false, menuEvent: CommonFnUtil.setInputAlertOpen },
    // 'removeCategory': { name: '삭제', icon: 'ActionTrashBin', rightItem : false, menuEvent: CommonFnUtil.setIsAlertOpen },
    // 'oneChamberSave': { name: 'ONECHAMBER 저장', icon: 'ActionOneSave', rightItem : false, menuEvent: CommonFnUtil.onClickOneChamberSave },
    // 'openLink' : { name: '오픈링크', icon: 'OpenLink', rightItem : true, menuEvent: CommonFnUtil.onClickOnOffLink},
    // 'openLinkRead' : { name: '읽기', icon: '', value: 'R', rightItem : false, menuEvent: CommonFnUtil.onChangeOpenAuth},
    // 'openLinkUpdate' : { name: '수정', icon: '', value: 'U', rightItem : false, menuEvent: CommonFnUtil.onChangeOpenAuth},
    // 'groupNuserShare' : { name: '부서/사용자 공유', icon: 'ActionGroupNUserShare', rightItem : true, menuEvent: CommonFnUtil.onClickShareConfig},

};

interface Props {
    isActionMenu : boolean,
    setIsActionMenu : any,
    contextName : string,
    selectedTargetState : any,
    setSelectedTarget : any,
    navigation : any,
    setCenterDialog : any
}

interface State {
    clickMenu : any,
    options : any,
    nextActionMenu : string
}

class ActionMenuClass extends Component<Props, State> {
    constructor(props : any) {
        super(props);

        this.state = {
            clickMenu : [],
            options : [],
            nextActionMenu : ''
        };
    }

    public myRef = {
        ActionSheet: React.createRef<any>()
    }

    componentDidMount(){
        const { selectedTargetState, isActionMenu} = this.props;
        
        if( !CommonUtil.objectIsNull( selectedTargetState.selectedTarget)){
            this.setClickMenu();

            if( isActionMenu){
                this.showActionSheet();
            }
        }
    }

    componentDidUpdate( preProps : any, preState : any) {
        const { isActionMenu} = this.props;
        const { nextActionMenu} = this.state;
        
        if( (preProps.isActionMenu !== isActionMenu || this.state.nextActionMenu !== preState.nextActionMenu) && isActionMenu){
            if( CommonUtil.strIsNull( nextActionMenu)){
                this.setClickMenu();
            }
            this.showActionSheet();
        }
    }

    shouldComponentUpdate(nextProps : any, nextState : any) {
        if( JSON.stringify( this.props.selectedTargetState) !== JSON.stringify( nextProps.selectedTargetState)){
            return true;
        }
        if( JSON.stringify( this.state.clickMenu) !== JSON.stringify( nextState.clickMenu)){
            return true;
        }
        if( JSON.stringify( this.state.options) !== JSON.stringify( nextState.options)){
            return true;
        }
        if( this.state.nextActionMenu !== nextState.nextActionMenu){
            return true;
        }
        if( this.props.isActionMenu !== nextProps.isActionMenu){
            return true;
        }

        return false;
    }

    onClickMenu = async( menuName : string) => {
        const { selectedTargetState, setIsActionMenu} = this.props;

        const actionValue = await menuInfo[menuName].menuEvent( selectedTargetState.selectedTarget);

        if( !CommonUtil.objectIsNull( actionValue)){
            this.onClickMenuAfter( actionValue);
        }
        else{
            // 오류 처리.. 도 포함해야할 느낌...
            this.hideActionSheet();
            setIsActionMenu( false, selectedTargetState.selectedTarget, selectedTargetState.index);
        }
    }

    onClickMenuAfter = ( actionValue : any) => {
        const { setIsActionMenu, selectedTargetState, setCenterDialog} = this.props;
        
        if( typeof actionValue === 'string'){
            if( actionValue.split('|')[0] === 'request'){
            }
            else if( actionValue.split('|')[0] === 'newWindow'){
                // 모바일 태블릿 조건문 필요
                // navigation.push( actionValue.split('|')[1]);

                setCenterDialog( actionValue.split('|')[1], null);

                this.hideActionSheet();
                setIsActionMenu( false, selectedTargetState.selectedTarget, selectedTargetState.index);
            }
            else if( actionValue.split('|')[0] === 'nextActionMenu'){
                let clickMenu : any = [];
                if( actionValue.split('|')[1] === 'shareSubMenu'){
                    clickMenu = shareSubMenu;
                }

                const options : any = this.setActionMenuItem( clickMenu);

                this.setState({ clickMenu : clickMenu, options : options, nextActionMenu : actionValue.split('|')[1]});
            }
        }
        else if( typeof actionValue === 'object'){
            const { selectedTargetState, setSelectedTarget} = this.props;
            const { nextActionMenu, clickMenu} = this.state;

            if( JSON.stringify(selectedTargetState.selectedTarget) !== ( actionValue)){
                actionValue.flagInfo = CommonFnUtil.setFlagInfo( actionValue, actionValue.targetObjectType);
                setSelectedTarget( actionValue, selectedTargetState.index)

                if( !CommonUtil.strIsNull(nextActionMenu)){
                    const options : any = this.setActionMenuItem( clickMenu);

                    this.setState({ options : options});
                }
            }
        }
    }

    getDocMenu = () => {
        const { selectedTargetState} = this.props;

        let clickMenu : any = [];

        if( CommonUtil.isMyDoc( selectedTargetState.selectedTarget.folderType)){
            if( ( selectedTargetState.selectedTarget.shareObjectData === '2' || selectedTargetState.selectedTarget.shareObjectData === '3')){ // 등록자와 로그인한 사용자 uid 비교 로직 추가 필요
                clickMenu = shareReceiveDoc;
            }
            else{
                clickMenu = myDoc;
            }
        }
        else if( CommonUtil.isDocuFlow( selectedTargetState.selectedTarget.folderType)){
            clickMenu = docuFlow;
        }
        else if( CommonUtil.isGroup( selectedTargetState.selectedTarget.folderType)){
            clickMenu = groupDoc;
        }
        else if( CommonUtil.isCompany( selectedTargetState.selectedTarget.folderType)){
            clickMenu = companyDoc;
        }

        return clickMenu;
    }

    getFolderMenu = () => {
        const { selectedTargetState} = this.props;

        let clickMenu : any = [];

        if( CommonUtil.isMyDoc( selectedTargetState.selectedTarget.folderType)){
            clickMenu = myDocFolder;
        }
        else if( CommonUtil.isGroup( selectedTargetState.selectedTarget.folderType)){
            clickMenu = groupDocFolder;
        }
        else if( CommonUtil.isCompany( selectedTargetState.selectedTarget.folderType)){
            clickMenu = companyDocFolder;
        }

        return clickMenu;
    }

    setClickMenu = () => {
        const { selectedTargetState, contextName} = this.props;
        let { clickMenu} = this.state; 
        let options : any = [];

        if( !CommonUtil.objectIsNull( selectedTargetState.selectedTarget)){
            if( contextName === 'Home' || contextName === ''){
                clickMenu = this.getDocMenu();
            }
            else if( contextName === 'ShareDoc'){
                if( CommonUtil.isDocument( selectedTargetState.selectedTarget.targetObjectType)){
                    clickMenu = shareDoc;
                }
                else{
                    clickMenu = shareDocFolder;
                }
            }
            else if( contextName === 'ShareReceiveDoc'){
                if( CommonUtil.isDocument( selectedTargetState.selectedTarget.targetObjectType)){
                    clickMenu = shareReceiveDoc;
                }
                else{
                    clickMenu = shareReceiveDocFolder;
                }
            }
            else if( CommonUtil.isCategory( selectedTargetState.selectedTarget.treeType)){
                    clickMenu = categoryActionMenu;
            }
            else{
                if( CommonUtil.isDocument( selectedTargetState.selectedTarget.targetObjectType)){
                    clickMenu = this.getDocMenu();
                }
                else{
                    clickMenu = this.getFolderMenu();
                }
            }

            options = this.setActionMenuItem( clickMenu);
        }
        else{
            clickMenu = [];
        }

        this.setState({ clickMenu : clickMenu, options : options});
    }

    setActionMenuItem = ( clickMenu : any) => {
        let options : any = [];
        // checkAuth( type필요권한, auth 실제 권한)
        // const isAuth = this.checkAuth();
        for( let i=0; i<clickMenu.length; i++){
            if( CommonFnUtil.checkAuth()){
            }
        }

        return options;
    }


    showActionSheet = () => {
        this.myRef.ActionSheet.current?.show();
    }

    hideActionSheet = () => {
        const { nextActionMenu} = this.state;
        this.myRef.ActionSheet.current?.hide();
        
        if( !CommonUtil.strIsNull( nextActionMenu)){
            this.setState({ nextActionMenu : ''});
        }
    }

    render() {
        const { selectedTargetState} = this.props;
        const { options, nextActionMenu} = this.state;
        
        return (
                <ActionSheet
                    ref={this.myRef.ActionSheet}
                    title={<View style={ actionMenuStyleSheet.actionMenuTitleContaier}>
                                <View style={ actionMenuStyleSheet.actionMenuTitleIconContent}>
                                    <View style={ actionMenuStyleSheet.actionMenuTitleIcon}/>
                                </View>
                                <View style={ actionMenuStyleSheet.actionMenuTitleTextContent}>
                                    { !CommonUtil.strIsNull( nextActionMenu) &&
                                        <TouchableOpacity onPress={ ()=>{ this.setState({nextActionMenu: ''})}}>
                                            <SvgIcon name="ArrBackB" width={22} height={22} style={{ marginRight: 8}}/>
                                        </TouchableOpacity>
                                    }
                                    <Text numberOfLines={1} style={ [actionMenuStyleSheet.actionMenuTitleText, { width: CommonUtil.strIsNull(nextActionMenu) ? Dimensions.get('window').width - 56 : Dimensions.get('window').width - 86}]}>
                                        {selectedTargetState.selectedTarget.name}
                                    </Text>
                                </View>
                            </View>
                        }
                    options={options}
                    // onPress={ setIsActionMenu.bind( this, false, selectedTargetState.selectedTarget, selectedTargetState.index)}
                    styles={styles}
                    theme={"ios"}
                />
        );
    }
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

// const ActionMenu = ( props : any) => {
//     const { selectedTargetState, setSelectedTarget, setCenterDialog} = useContext(CommonContext);
//     return <ActionMenuClass {...props} 
//                             selectedTargetState={selectedTargetState} 
//                             setSelectedTarget={setSelectedTarget}
//                             setCenterDialog={setCenterDialog}
//             />
// }

// export default ActionMenu;