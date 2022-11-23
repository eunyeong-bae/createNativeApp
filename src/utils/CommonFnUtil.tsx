import Adapter from '../ecmadapter';
import CommonUtil from './CommonUtil';
import * as CommonMsgUtil from './CommonMsgUtil';
import Toast from 'react-native-toast-message';

export default class CommonFnUtil{
    /* ONEFFICE APIS 
        프로토콜 추가 시, AsyncStorage 안에 바로 바로 업데이트가 안되서, 로그아웃하고 다시 진입해야 리스트에 들어감!
        프로토콜 리스트는 baseData. 안에 들어가기 때문
    */
    public static moveDocumentFolder = async( docData: any, props : any) => {
        const { fullpath} = props;

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
        
        const data = {
            protocolId: protocolId,
            data: dataInfo
        };
       
        let moveDocumentFolder: any = [];

        await Adapter.fetch.protocol( data)
         .then( res => {
            if( res && res.list) {
                moveDocumentFolder = res.list;

                Toast.show({
                    type:'success',
                    text1: '이동되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
         })
         .catch( error => {
            console.log( error);

            moveDocumentFolder = false;
            Toast.show({
                type:'error',
                text1: docData.folder_no === fullpath.fullPathUIDs[fullpath.fullPathUIDs.length - 1] ? '이동대상 폴더와 현재 폴더가 동일합니다.' : '이동에 실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
         })

         return moveDocumentFolder;
    }

    public static copyDocument = async ( docData: any , props : any) => {
        const { headerDataInfo, fullpath} = props;

        const protocolId = 'P528';
        const dataInfo = {
            "docUID": docData.docUID, 
            "folder_no": fullpath.fullPathUIDs[fullpath.fullPathUIDs.length - 1], 
            "doc_title": headerDataInfo.docTitle, 
            "bContentCopy": false, 
            "isRemoveSektch": false 
        };
        
        let copyDocument: any = [];
        const data: any = {
            protocolId: protocolId,
            data: dataInfo
        };

        await Adapter.fetch.protocol( data)
         .then( res => {
            if( res && res.list) { 
                copyDocument = res.list;

                Toast.show({
                    type:'success',
                    text1: '복사되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
         })
         .catch( error => {
             console.log( error);
             copyDocument = false;

             Toast.show({
                type:'success',
                text1: '복사 실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
         })

         return copyDocument;
    }

    public static updateDocumentFolderName = async (newName: any, docData: any) => {
        let isFolder = null;
        let protocolId = null;
        let dataInfo = null;

        isFolder = docData.doc_type === '0';
        protocolId = isFolder ? 'P623' : 'P618';
        dataInfo = isFolder ? 
                    {
                    folder_no: docData.docUID,
                    folder_name: newName,
                    notSeqName : "1"
                    }
                : 
                    {
                    docUID: docData.docUID,
                    doc_name: newName,
                    bIsEditorMode : "true"
                    };

        let updateDocumentFolderName: any = [];

        const data: any = {
            protocolId: protocolId,
            data: dataInfo
        };

        await Adapter.fetch.protocol( data)
         .then( res => {
            if( res && res.result) { 
                updateDocumentFolderName = res;

                Toast.show({
                    type: 'success',
                    text1: '이름 변경되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
         })
         .catch( error => {
            console.log( error);
            updateDocumentFolderName = false;

            Toast.show({
                type:'error',
                text1: '실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
         })

         return updateDocumentFolderName;
    }

    public static createNewFolder = async( newName: any, folderPath: any) => {
        let createNewFolder: any = [];
        let protocolId = 'P530';
        let dataInfo = {"parentFolderUID": folderPath, "folder_name": newName, "notSeqName": "1"};

        const data: any = {
            protocolId: protocolId,
            data: dataInfo
        };

        await Adapter.fetch.protocol( data)
         .then( res => {
            if( res && res.folder) { 
                createNewFolder = res;

                Toast.show({
                    type: 'success',
                    text1: '생성되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
         })
         .catch( error => {
            console.log( error);
            createNewFolder = false;

            Toast.show({
                type:'error',
                text1: '실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
         })
        
        return createNewFolder;
    }

    public static setFavorite = async( isFolder: any, objFavoriteInfo: any) => {
        let setFavoriteResult: boolean = false;
        
        const data: any = {
            protocolId : 'P630',
            data : objFavoriteInfo,
        };

        await Adapter.fetch.protocol(data).then((res) => {
            if( (res && res.uid && res.uid.length > 0) || (!res.uid && isFolder)) { 
                // setFavoriteResult = res.uid;
                setFavoriteResult = true;

                Toast.show({
                    type: 'success',
                    text1: '중요문서로 설정되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
            else {
                setFavoriteResult = false;
            }
        }).catch(( error) => {
            Toast.show({
                type:'error',
                text1: '실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
        });

        return setFavoriteResult;
    }

    public static setUnFavorite = async( setFavoriteSeq: any) => {
        let setUnFavoriteResult: boolean = false;
        
        const data: any = {
            protocolId : 'P631',
            data : {"docUID":setFavoriteSeq},
        };

        await Adapter.fetch.protocol(data).then((res) => {
            if( res && res.ret && res.ret.length > 0) {
                setUnFavoriteResult = false;

                Toast.show({
                    type: 'success',
                    text1: '중요문서 설정이 해제되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
        }).catch(( error) => {
            Toast.show({
                type:'error',
                text1: '실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
        });

        return setUnFavoriteResult;
    }

    public static createCategory = async( categoryNM: any, categoryRootUid: any) => {
        let result: any = [];
        
        const data: any = {
            protocolId : 'P732',
            data : { category_name:categoryNM, category_root_uid:categoryRootUid},
        };

        await Adapter.fetch.protocol(data).then((res) => {
            if( res) {
                result = res.result;

                Toast.show({
                    type: 'success',
                    text1: '생성되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
        }).catch(( error) => {
            Toast.show({
                type:'error',
                text1: '실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
        });

        return result;
    }

    public static deleteFile = async( data: any ) => {
        let result: any = false;

        await Adapter.fetch.protocol(data).then((res) => {
            if( res) {
                result = true;

                Toast.show({
                    type: 'success',
                    text1: '삭제되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
        }).catch(( error) => {
            Toast.show({
                type:'error',
                text1: '식제를 실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
        });

        return result;
    }

    public static deleteTrashDocument = async( docUID: any, folderUID: any) => {
        let result: any = false;

        const data : any = {
            protocolId : 'P533',
            data : {"docUID":docUID,"folder_no":folderUID},
        }

        await Adapter.fetch.protocol(data).then((res) => {
            if( res) {
                result = res.result;

                Toast.show({
                    type: 'success',
                    text1: '영구삭제되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
        }).catch(( error) => {
            Toast.show({
                type:'error',
                text1: '삭제에 실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
        });

        return result;
    }

    public static recoverTrashDocument = async( docUID: any, folderUID: any) => {
        let result: any = false;

        const data : any = {
            protocolId : 'P551',
            data : { "docUID":docUID, "folder_no":folderUID, "target_id":""},
        };

        await Adapter.fetch.protocol(data).then((res) => {
            if( res) {
                result = res.result;

                Toast.show({
                    type: 'success',
                    text1: '복원되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
        }).catch(( error) => {
            Toast.show({
                type:'error',
                text1: '복구에 실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
        });
        
        return result;
    }

    public static emptyTrash = async() => {
        let result: any = false;

        const data : any = {
            protocolId : 'P534',
            data : {},
        };

        await Adapter.fetch.protocol(data).then((res) => {
            if( res) {
                result = res.result;

                Toast.show({
                    type: 'success',
                    text1: '휴지통을 비웠습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
        }).catch(( error) => {
            Toast.show({
                type:'error',
                text1: '휴지통 비우기에 실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
        });
        
        return result;
    }

    public static setReadOnly = async( docUID: any, isReadOnly: any) => {
        let result: boolean = false;

        const data: any = {
            protocolId : 'P620',
            data: {"docUID": docUID, "readonly": isReadOnly},
        };

        await Adapter.fetch.protocol(data).then((res) => {
            if( res) {
                result = isReadOnly ? true : false ;

                Toast.show({
                    type: 'success',
                    text1: isReadOnly ? '읽기 전용로 설정되었습니다.' : '읽기 전용이 해제되었습니다.',
                    visibilityTime: 1000,
                    autoHide: true
                });
            }
        }).catch((error) => {
            Toast.show({
                type:'error',
                text1: '실패했습니다.',
                visibilityTime: 1000,
                autoHide: true
            });
        })

        return result;
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

    public static getDocHistory = async( docUID: any) => {
        let result: any = [];

        const data: any = {
            protocolId : 'P538',
            data : {
                docUID: docUID,
                targetObjectType:'DO',
                termValue :'Y',					
            }
        };

        await Adapter.fetch.protocol( data).then((res) =>{
            if( res) {

            }
        }).catch((error) => {
            console.log( error);
        })
        return result;
    }

    //카테고리 목록 조회
  public static callCategoryList = async() => {
    let result: any = [];

    const data: any = {
        protocolId: 'P628',
        data: { includeParentNode: true, uid: ""}
    };

    await Adapter.fetch.protocol(data).then((res) => {
      if( res){
          const resultData : any = res.treeNode;

          let pushArr = function( item: any) {
            result.push({
              name:item.name,
              uid:item.uid,
              parentUID:item.parentUID,
              bSelect:false,
              bEditable:false
            });
          };

          pushArr({
            name: "전체",
            uid: "RA_ROOT",
            parentUID:""
          });

          resultData.forEach(function ( item: any, idx: any) {
            pushArr(item);

            if ((item.childCount && item.childCount > 0) || (item.children && item.children.length > 0)) {
              item.children.forEach(function ( item2:any, idx2:any) {
                pushArr(item2);
              });
            }
          });

          return result;
        }
    }).catch((error) => {
        console.error(error)
    })

    return result;
  };

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

    public static deleteSubMenuEvent = async( menuNm : any) => {
        return `alert|${ menuNm}`;

    }
    
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
        return 'nextActionMenu|detailDocInfo';
    }
    public static onClickDocInfo = async() => {
        // console.log(' onClickDocInfoView');
        return 'dialog|docInfo';
    }
    public static onClickDocHistory = async() => {
        // console.log(' onClickDocInfoView');
        return 'dialog|docHistory';
    }

    public static onClickShare = () => {
        // console.log(' onClickCategory');
        return 'nextActionMenu|shareSubMenu';
    }

    public static onClickAddOwnForm= async() => {
        // console.log(' onClickCategory');
        return 'alert|addOwnForm';
    }
    
    public static onClickRename = async() => {
        // console.log(' onClickRename');
        return 'alert|rename';
    }

    public static onClickNewFolder = async() => {
        return 'alert|newFolder';
    }

    public static onClickDeleteInTrash = async() => {
        // console.log(' onClickRemove');
        return 'alert|deleteInTrash';
    }
    public static onClickRestore = async() => {
        // console.log(' onClickRemove');
        return 'alert|restore';
    }
    public static onClickDelete = async() => {
        // console.log(' onClickRemove');
        return 'delete';
    }

    public static onClickSetFavCatergory = async() => {
        // console.log(' onClickCategory');
        return 'setFavorite';
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

