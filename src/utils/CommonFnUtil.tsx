import Adapter from '../ecmadapter';
import CommonUtil from './CommonUtil';
import * as CommonMsgUtil from './CommonMsgUtil';


export default class CommonFnUtil{
    /* 폴더/문서 이동 api */
    public static moveDocumentFolder = async( protocolId: any, dataInfo: any) => {
        let moveDocumentFolder: any = [];
        const data: any = {
            protocolId: protocolId,
            data: dataInfo
        };

        await Adapter.fetch.protocol( data)
         .then( res => {
            if( res && res.list) {
                moveDocumentFolder = res.list;
            }
         })
         .catch( error => {
            console.log( error);
         })

         return moveDocumentFolder;
    }

    public static copyDocument = async ( protocolId: any, dataInfo: any) => {
        let copyDocument: any = [];
        const data: any = {
            protocolId: protocolId,
            data: dataInfo
        };

        await Adapter.fetch.protocol( data)
         .then( res => {
            if( res && res.list) { 
                copyDocument = res.list;
            }
         })
         .catch( error => {
             console.log( error);
         })

         return copyDocument;
    }

    public static updateDocumentFolder = async ( protocolId: any, dataInfo: any) => {
        let updateDocumentFolder: any = [];
        const data: any = {
            protocolId: protocolId,
            data: dataInfo
        };

        await Adapter.fetch.protocol( data)
         .then( res => {
            if( res && res.result) { 
                updateDocumentFolder = res;
            }
         })
         .catch( error => {
            updateDocumentFolder = error;
             console.log( error);
         })

         return updateDocumentFolder;
    }

    public static searchDataList = async( sendata : any) => {
        let searchDataList : any = [];

        const data : any = {
            protocolId : 'P791',
            data : sendata
        }

        await Adapter.fetch.protocol(data).then((res) => {
            if( res.list){
                searchDataList = res.list;
            }
        }).catch((error) => {
            console.error(error)
        })

        return searchDataList;
    }

    public static getFolderTreeNode = async( data : any) => {
        let treeNode : any = [];
        let errMsg = '';

        await Adapter.fetch.protocol(data).then((res) => {
            if(res.treeNode) {
                treeNode = res.treeNode;
            }
        }).catch((error) => {
            errMsg = error.message === CommonMsgUtil.KR_DELETE_FOLDER ? CommonMsgUtil.KR_DELETE_FOLDER : error.message;
            // this.props.setLoading(false);
            // const alertInfo : any = {
            //         alertType : 'A',
            //         btnCount : '1',
            //         headerTitle : '알림',
            //         alertMessage : error.message === '상위 폴더가 없습니다.' ? '삭제되거나 존재하지 않는 폴더입니다.' : error.message,
            //         mode : 'info'
            // }
            
            // this.showAlert(true, alertInfo, 
            //     ()=>{
            //         setTimeout(() => {
            //             const redirectUID = localStorage.getItem('redirectUID');
            //             if(contextName === 'shareReceiveDoc' && redirectUID !== null && redirectUID === uid){
            //                 localStorage.removeItem('redirectUID');
            //                 history.replace('/shareReceiveDoc');
            //             }
            //             else {
            //                 const currentPath = this.props.location.pathname;
            //                 let currentSearch = this.props.location.search;
            //                 const oldUID = currentSearch.substring( currentSearch.indexOf('?uid=')+5, currentSearch.indexOf('&'));

            //                 currentSearch = currentSearch.replace( oldUID, mainFullPathState.fullPathUIDs[mainFullPathState.fullPathUIDs.length-2]);

            //                 history.replace(`${currentPath}/reload`);
            //                 setTimeout(() => {
            //                     history.replace(currentPath + currentSearch);
            //                 },0);
            //             }
            //         },100);
            //         this.initAlertValue()
            //     }
            //     , null);
            console.error(error);
        })

        return { treeNode, errMsg}
    }

    public static getTargetPathInfo = ( targetInfo : any, targetFullPathState : any) => {
        if( targetFullPathState.fullPathUIDs.join(',').indexOf( targetInfo.uid) < 0){
            targetFullPathState.fullPathUIDs.push( targetInfo.uid);
            targetFullPathState.fullPathNames.push( targetInfo.name);
            targetFullPathState.treeTypes.push( CommonUtil.strIsNull( targetInfo.treeType) ? targetInfo.folderType : targetInfo.treeType);
        }
        else if( targetFullPathState.fullPathUIDs.join(',').indexOf( targetInfo.uid) > -1){
            for( let i=0; i<targetFullPathState.fullPathUIDs.length; i++){
                if( targetFullPathState.fullPathUIDs[i] === targetInfo.uid){
                    targetFullPathState.fullPathUIDs = targetFullPathState.fullPathUIDs.slice( 0, i + 1);
                    targetFullPathState.fullPathNames = targetFullPathState.fullPathNames.slice( 0, i + 1);
                    targetFullPathState.treeTypes = targetFullPathState.treeTypes.slice( 0, i + 1);
                    break;
                }
            }
        }
        
        return targetFullPathState;
    }

    public static getUserInfo = async( userUID : any) => {
        let userInfo : any = null;

        const data = {
            protocolId: "P793",
            data: {
                uid : userUID
            }
        }

        await Adapter.fetch.protocol(data).then((res) => {
            if(res.user){
                userInfo = res.user;
            }
        }).catch((error) => {
            console.error(error)
        })

        return userInfo;
    }

    public static searchUserList = async( searchText : string, searchType : number) => {
        let userList : any = [];

        const data : any = {
            protocolId: "P640",
            data: {searchText : searchText, 
                    searchType : searchType, 
                    uid : null
            }
        };

        await Adapter.fetch.protocol(data).then((res) => {
            if(res.list){
                userList = res.list;
            }
        }).catch((error) => {
            console.error(error)
        });

        return userList;
    }

    public static setShareNCategory = async( selectedTarget : any) => {
        if( selectedTarget.linkUrl === undefined){
            selectedTarget = await CommonFnUtil.getSharedInfo( selectedTarget);
        }
        
        if( selectedTarget.existFavorite && CommonUtil.objectIsNull( selectedTarget.categoryInfo)){
            selectedTarget.categoryInfo = await CommonFnUtil.getCategory( selectedTarget.uid);
        }
        else{
            selectedTarget.categoryInfo = null;
        }

        return selectedTarget;
    }

    public static checkAuth = (mode : string, targetAuth : any ) => { //targetAuth;doc or folder, mode:R/U/M
        const {DocCreate, FolderCreate, Read, Update, Empowerment} = targetAuth;

       
        return false;
    }

    public static convertSharedTargets = ( selectedTarget : any) => {
        let convertSharedTargets = '';

        if( !CommonUtil.objectIsNull( selectedTarget.sharedTargets)){
            selectedTarget.sharedTargets.map((data : any, index : any) => {
                if(index > 0){
                    convertSharedTargets += ',';
                }
                const temp = data.split('|');
                convertSharedTargets += temp[0] + '|' + temp[1] + '|' + selectedTarget.gradeMap.get(temp[2]) + '|' + temp[3] + '|1';
            });
        }

        return convertSharedTargets;
    }

    public static onClickOnOffLink = async( selectedTarget : any) => {
        const convertSharedTargets = CommonFnUtil.convertSharedTargets( selectedTarget);

        if( selectedTarget.flagOpen){
            selectedTarget.flagOpen = false;
            selectedTarget.openAuth = '';
        }
        else{
            selectedTarget.flagOpen = true;
            selectedTarget.openAuth = 'R';
        }

        return await CommonFnUtil.onChangeLink( selectedTarget, convertSharedTargets);
    }

    public static onChangeOpenAuth = async( selectedTarget : any) => {
        const convertSharedTargets = CommonFnUtil.convertSharedTargets( selectedTarget);

        if( selectedTarget.openAuth === 'R'){
            selectedTarget.openAuth = 'U';
        }
        else{
            selectedTarget.openAuth = 'R';
        }

        return await CommonFnUtil.onChangeLink( selectedTarget, convertSharedTargets);
    }

    public static onChangeLink = async( selectedTarget : any, convertSharedTargets : any) => {
        const sendData = {
            flagFromOOneffice : false, 
            flagOpen : selectedTarget.flagOpen, 
            flagShared : selectedTarget.flagShared, 
            message : '',  
            messageType : 3, 
            openAuth : selectedTarget.openAuth, 
            sharedTargets : convertSharedTargets, 
            uids : selectedTarget.uid
        };

        const shareTarget : any = await CommonFnUtil.onChangeShareInfo( sendData);

        selectedTarget.flagShared = shareTarget.flagShared;
        selectedTarget.flagOpen = shareTarget.flagOpen;
        selectedTarget.openAuth = (shareTarget.openAuth ? shareTarget.openAuth : '');
        selectedTarget.sharedTargets = (shareTarget.sharedTargets ? selectedTarget.sharedTargets : []);

        return selectedTarget;
    }

    public static onChangeShareInfo = async( sendData : any) => {
        let shareTarget : any = null;

        const data : any = {
            protocolId: "P638",
            data: sendData
        }

        await Adapter.fetch.protocol(data).then((res) => {
            if(res && res.list) {
                shareTarget = res.list[0];
            }
        }).catch((error) => {
            console.error(error)
        });

        return shareTarget;
    }
    
    // public static onClickShare = async( selectedTarget : any) => {
    //     if( !CommonFnUtil.checkAuth( selectedTarget, selectedTarget.openAuth, 'read')){
    //         // 읽기 권한 없을 경우 
    //         // 읽기 권한 요청
    //         return 'request|read'
    //     }
    //     else if( CommonFnUtil.checkAuth( selectedTarget, selectedTarget.openAuth, 'empowerment')){ // 모든 권한 시 
    //         if( CommonUtil.isDocument( selectedTarget.targetObjectType)){
    //             // 공유 설정 actionMenu
    //             return 'nextActionMenu|shareSubMenu';
    //         }
    //         else{
    //             //공유 설정 화면
    //             return 'newWindow|ShareConfig';
    //         }
    //     }
    //     else if( CommonFnUtil.checkAuth( selectedTarget, selectedTarget.openAuth, 'read')){
    //         // 공유 조회 화면
    //         return 'newWindow|ShareInfoView';
    //     }

    //     return null;
    // }

    // public static onClickShareConfig = ( selectedTarget : any) => {
    //     if( !CommonFnUtil.checkAuth( selectedTarget, selectedTarget.openAuth, 'read')){
    //         // 읽기 권한 없을 경우 
    //         // 읽기 권한 요청
    //         return 'request|read';
    //     }
    //     else if( CommonFnUtil.checkAuth( selectedTarget, selectedTarget.openAuth, 'empowerment')){ // 모든 권한 시 
    //         //공유 설정 화면
    //         return 'newWindow|ShareConfig';
    //     }
    // }
    
    public static linkCopyEvent = async() => {
        // console.log(' linkCopyEvent');
    }
    
    // public static onClickCopyOpen = async() => {
    //     console.log(' onClickCopyOpen');
    // }
    
    // public static onClickComment = async() => {
    //     //화면 전환 네비게이션 사용해서 ~ 
    //     console.log(' onClickComment');
    // }
    
    public static onClickMoveOpen = async() => {
        // console.log(' onClickMoveOpen');
        return 'newWindow|MoveDialog';
    }
    
    public static onClickCopy = async() => {
        // console.log(' onClickRemove');
        return 'newWindow|CopyDialog';
    }

    public static onClickSetTag= async() => {
        // console.log(' onClickCategory');
        return 'newWindow|SetTagDialog';
    }
    public static onClickSetPassword = async() => {
        // console.log(' onClickCategory');
        return 'newWindow|SetPasswordDialog';
    }
    
    public static onClickRelatedDoc = async() => {
        // console.log(' onClickRelateDoc');
        return 'newWindow|RelatedDocDialog';
    }

    public static onClickDetailDocInfo = async() => {
        // console.log(' onClickDocInfoView');
        return 'nextActionMenu|detailDocInfoSubMenu';
    }
    public static onClickShare = () => {
        // console.log(' onClickCategory');
        return 'nextActionMenu|shareSubMenu';
    }

    public static onClickAddOwnForm= async() => {
        // console.log(' onClickCategory');
        return 'dialog|addOwnForm';
    }
    
    public static onClickRename = async() => {
        // console.log(' onClickRename');
        return 'dialog|rename';
    }

    public static onClickNewFolder = async() => {
        return 'dialog|newFolder';
    }

    public static onClickRemove = async() => {
        // console.log(' onClickRemove');
        return 'dialog|remove';
    }

    public static onClickSetFavCatergory = async() => {
        // console.log(' onClickCategory');
        return 'toast|setFavorite';
    }
    public static onClickSetViewOnly = async() => {
        // console.log(' onClickCategory');
        return 'toast|setViewOnly';
    }
    
    // public static onClickFolderInfoView = async( selectedTarget : any) => {
    //     console.log(' onClickFolderInfoView');
    //     console.log( selectedTarget);
    // }
    
    // public static onClickRequest = async() => {
    //     console.log(' onClickRequest');
    // }
    
    // public static onClickClipBoard = async() => {
    //     console.log(' onClickClipBoard');
    // }
    
    public static onClickOneChamberSave = async() => {
        // console.log(' onClickOneChamberSave');
        return 'newWindow|OneChamberDialog';
    }

    // public static onClickCategoryReName = () => {
    //     console.log( 'onClickCategoryReName');
    // }

    // public static onClickCategoryDelete = () => {
    //     console.log( 'onClickCategoryDelete');
    // }

    public static getSharedInfo = async( selectedTarget : any) => {
        const data = {
            protocolId: CommonUtil.isDocument( selectedTarget.targetObjectType) ? 'P637' : 'P718',
            data: {
                uid : selectedTarget.uid
            }
        };

        await Adapter.fetch.protocol(data).then((res) => {
            if(res && res.document) {
                selectedTarget.flagShared = (res.document.sharedTargets != null && res.document.sharedTargets.length > 0);
                selectedTarget.flagOpen = res.document.flagOpen;
                selectedTarget.openAuth = (res.document.openAuth ? res.document.openAuth : '');
                selectedTarget.sharedTargets = (res.document.sharedTargets ? res.document.sharedTargets : []);
                selectedTarget.linkUrl = res.url;
            }
            else if(res && res.folder){
                selectedTarget.flagInheritAuth = res.folder.flagInheritAuth;
                selectedTarget.flagShared = res.folder.flagShared;
                selectedTarget.sharedTargets = (res.folder.sharedTargets ? res.folder.sharedTargets : []);
                selectedTarget.linkUrl = res.url;
            }
        }).catch((error) => {
            console.error(error)
        });

        const gradeInfo = await CommonFnUtil.getGradeInfo();
        selectedTarget.gradeMap = gradeInfo.gradeMap;

        return selectedTarget;
    }

    public static getGradeInfo = async() => {
        const gradeInfo : any = {
            gradeMap : new Map<string,string>(),
            gradeValues : []
        }

        const data = {
            protocolId: "P838",
            data: {
                uid : 'userPosition'
            }
        }

        await Adapter.fetch.protocol(data).then((res) => {
            if(res && res.ret) {
                gradeInfo.gradeValues = res.ret.split('|');

                if(gradeInfo.gradeValues && gradeInfo.gradeValues.length > 0) {
                    let mapValueCount = 1;

                    gradeInfo.gradeValues = gradeInfo.gradeValues.filter(( data : any) => {
                        if(data !== 'OFF') {
                            gradeInfo.gradeMap.set(data, (mapValueCount++) + '');
                            return true;
                        }

                        return false;
                    });
                }
            }
        }).catch((error) => {
            console.error(error)
        });

        return gradeInfo;
    }

    public static getCategory = async( uid : any) => {
        let categoryInfo : any = null;

        const data = {
            protocolId: "P632",
            data: {
                docUID : uid
            }
        }
        await Adapter.fetch.protocol(data).then((res) => {
            categoryInfo = res.result;
        }).catch((error) => {
            console.error(error)
        })

        return categoryInfo;
    }

    public static setIsAlertOpen = () => {
        console.log(' setIsAlertOpen');
    }

    public static setInputAlertOpen = () => {
        console.log(' setInputAlertOpen');
    }

    public static setFlagInfo = ( data : any, type : string) => {
        const flagInfo : any =[
            { name : 'ListShareSR', status : false}, // index 0
            { name : 'ListShareSend', status : false}, // index 1
            { name : 'ListShareReceive', status : false}, // index 2
            { name : 'ListShareOpen', status : false}, // index 3
            { name : 'ListBookMark', status : false}, // index 4
            { name : 'ListSecurityD', status : false}, // index 5 일반 문서
            { name : 'ListSecurityO', status : false}, // index 6 원피스 문서
            { name : 'ListComment', status : false}, // index 7
            { name : 'renderIcons', status : false, lastFlag : 0} // index 8 // 상태값 존재 유무
        ]

        if( data.shareObjectData != null && data.shareObjectData !== "0"){
            flagInfo[1].status = (data.shareObjectData === '1' || data.shareObjectData === '3'); // 공유한
            flagInfo[2].status = (data.shareObjectData === '2' || data.shareObjectData === '3'); // 공유받은
            flagInfo[8].status = true;
            flagInfo[8].lastFlag = (flagInfo[2].status ? 2 : 
                                                        (flagInfo[1].status ? 1 : 0));
        }

        if( flagInfo[1].status && flagInfo[2].status){
            flagInfo[0].status = true;
        }

        if( data.flagOpen){
            flagInfo[3].status = true; // 오픈링크
            flagInfo[8].status = true;
            flagInfo[8].lastFlag = 3;
        }

        if( CommonUtil.isDocument( type)){
            if( data.existFavorite){
                flagInfo[4].status = true; // 중요표시
                flagInfo[8].status = true;
                flagInfo[8].lastFlag = 4;
            }

            if( data.flagSecurityKey){
                if( data.fileExt === 'ONEX' || data.fileExt === 'ONES'){
                    flagInfo[6].status = true; // 원피스문서 보안
                    flagInfo[8].lastFlag = 6;
                }
                else{
                    flagInfo[5].status = true; // 일반문서 보안
                    flagInfo[8].lastFlag = 5;
                }
            }
            
            if( parseInt(data.commentCount) > 0){
                flagInfo[7].status = true; // 댓글
                flagInfo[8].status = true;
                flagInfo[8].lastFlag = 7;
            }
        }

        return flagInfo;
    }
}

