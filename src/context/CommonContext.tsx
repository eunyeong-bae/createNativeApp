import React, { createContext, useCallback, useState } from "react";

const CommonContext = createContext<CommonContextType>({
    currentFolderState : {
        targetFolder : null
    },
    targetFullPathState : {
        fullPathUIDs : [],
        fullPathNames : [],
        treeTypes : []
    },
    selectedTargetState : {
        selectedTarget : null,
        index : -1 // -2일 경우 상단 폴더 액션 메뉴
    },
    multiSelectedState : {
        selectedTargets : [],
        indexs : []
    },
    centerDialogState : {
        dialogName : '',
        dialogItem : null
    },
    rightDialogState : {
        dialogName : '',
        dialogItem : null
    },
    actionMenuState : {
        isActionMenu : false,
        // setIsActionMenu : null,
        // contextName : '',
        // navigation : null
        // contextName : '',
        // ActionMenuName : '',
        navigation : null
    },
    reViewDocState : {
        isVisible : false,
        onClickFileView : null,
        onClickClose : null,
        onClickChangeTarget : null,
        setIsActionMenu : null
    },
    sortMenuState : {
        contextName : '',
        selectedValue : null,
        sortMenuInfo : null
    },
    alertDialogState: {
        alertName : '',
        alertItem : null
    },
    swipeItemState: {
        setFavorite: false,
        setDelete : false,
    },
    
    setCurrentFolder : ( targetFolder : null) : void => {},
    setTargetFullPath : ( fullPathUIDs : [], fullPathNames : [], treeTypes : []) : void => {},
    setSelectedTarget : (selectedTarget : null, index : number) : void => {},
    setMultiSelected : ( selectedTarget : [], index : []) : void => {},
    setCenterDialog : ( dialogName : string, dialogItem : any) : void => {},
    setRightDialog : ( dialogName : string, dialogItem : any) : void => {},
    setAlertDialog : ( alertName : string, alertItem : any) : void => {},
    setSwipeItem : ( setFavorite: boolean, setDelete: boolean ) : void => {},
    // setIsActionMenu : ( isActionMenu : boolean, setIsActionMenu : any, contextName : '', navigation : any) : void => {},
    setIsActionMenu : ( isActionMenu: boolean, navigation:any ) : void => {},
    setReViewDoc : ( isVisible : boolean, onClickFileView : any, onClickClose : any, onClickChangeTarget : any, setIsActionMenu : any) : void => {},
    setSortMenu : ( contextName : string, selectedValue : any, sortMenuInfo : any) : void => {},
});

const CommonProvider = ({children} : CommonProviderProps): JSX.Element => {
    const [currentFolderState, setCurrentFoldertState] = useState<CurrentFolderState>({ targetFolder : null});
    const [targetFullPathState, setTargetFullPathState] = useState<TargetFullPathState>({ fullPathUIDs : [], fullPathNames : [], treeTypes : []});
    const [selectedTargetState, setSelectedTargetState] = useState<SelectedTargetState>({ selectedTarget : null, index : -1});
    const [multiSelectedState, setMultiSelectedState] = useState<MultiSelectedState>({ selectedTargets : [], indexs : []});
    const [centerDialogState, setCenterDialogState] = useState<CenterDialogState>({ dialogName : '', dialogItem : null});
    const [rightDialogState, setRightDialogState] = useState<RightDialogState>({ dialogName : '', dialogItem : null});
    const [alertDialogState, setAlertDialogState] = useState<AlertDialogState>({ alertName : '', alertItem : null});
    const [swipeItemState, setSwipeItemState] = useState<SwipeFuncState>({ setFavorite: false, setDelete: false });
    // const [actionMenuState, setIsActionMenuState] = useState<ActionMenuState>({ isActionMenu : false, setIsActionMenu : null, contextName : '', navigation : null});
    const [actionMenuState, setIsActionMenuState] = useState<ActionMenuState>({ isActionMenu : false, navigation:null});
    const [reViewDocState, setReViewDocState] = useState<ReViewDocState>({ isVisible : false, onClickFileView : null, onClickClose : null, onClickChangeTarget : null, setIsActionMenu : null});
    const [sortMenuState, setSortMenuState] = useState<SortMenuState>({ contextName : '', selectedValue : null, sortMenuInfo : null});

    const setCurrentFolder = useCallback(( targetFolder : any) : void => {
        setCurrentFoldertState({...currentFolderState, targetFolder});
    },[currentFolderState, setCurrentFoldertState]);

    const setTargetFullPath = useCallback(( fullPathUIDs : any, fullPathNames : any, treeTypes : any) : void => {
        setTargetFullPathState({...targetFullPathState, fullPathUIDs, fullPathNames, treeTypes});
    },[targetFullPathState, setTargetFullPathState]);

    const setSelectedTarget = useCallback(( selectedTarget : any, index : number) : void => {
        setSelectedTargetState({...selectedTargetState, selectedTarget, index});
    },[selectedTargetState, setSelectedTargetState]);

    const setMultiSelected = useCallback(( selectedTargets : any, indexs : any) : void => {
        setMultiSelectedState({...multiSelectedState, selectedTargets, indexs});
    },[multiSelectedState, setMultiSelectedState]);

    const setCenterDialog = useCallback(( dialogName : '', dialogItem : any) : void => {
        setCenterDialogState({...centerDialogState, dialogName, dialogItem});
    },[centerDialogState, setCenterDialogState]);

    const setRightDialog = useCallback(( dialogName : '', dialogItem : any) : void => {
        setRightDialogState({...rightDialogState, dialogName, dialogItem});
    },[rightDialogState, setRightDialogState]);

    const setAlertDialog = useCallback(( alertName : '', alertItem: any) : void => {
        setAlertDialogState({...alertDialogState, alertName, alertItem});
    }, [alertDialogState, setAlertDialogState]);

    const setSwipeItem = useCallback(( setFavorite: boolean, setDelete : boolean) => {
        setSwipeItemState({...swipeItemState, setFavorite, setDelete});
    }, [ swipeItemState, setSwipeItemState ]);

    // const setIsActionMenu = useCallback(( isActionMenu : boolean, setIsActionMenu : any, contextName : string, navigation : any) : void => {
    //     setIsActionMenuState({...actionMenuState, isActionMenu, setIsActionMenu, contextName, navigation});
    // },[actionMenuState, setIsActionMenuState]);
    const setIsActionMenu = useCallback(( isActionMenu : boolean, navigation:any) : void => {
        setIsActionMenuState({...actionMenuState, isActionMenu, navigation});
    },[actionMenuState, setIsActionMenuState]);

    const setReViewDoc = useCallback(( isVisible : boolean, onClickFileView : any, onClickClose : any, onClickChangeTarget : any, setIsActionMenu : any) : void => {
        setReViewDocState({...reViewDocState, isVisible, onClickFileView, onClickClose, onClickChangeTarget, setIsActionMenu});
    },[reViewDocState, setReViewDocState]);

    const setSortMenu = useCallback(( contextName : string, selectedValue : any, sortMenuInfo : any) : void => {
        setSortMenuState({...sortMenuState, contextName, selectedValue, sortMenuInfo});
    },[sortMenuState, setSortMenuState]);

    return(
        <CommonContext.Provider value={{
            currentFolderState,
            targetFullPathState,
            selectedTargetState,
            multiSelectedState,
            centerDialogState,
            rightDialogState,
            alertDialogState,
            actionMenuState,
            reViewDocState,
            sortMenuState,
            swipeItemState,
            setCurrentFolder,
            setTargetFullPath,
            setSelectedTarget,
            setMultiSelected,
            setCenterDialog,
            setRightDialog,
            setAlertDialog,
            setIsActionMenu,
            setReViewDoc,
            setSortMenu,
            setSwipeItem
        }}>
            {children}
        </CommonContext.Provider>
    )
}

export {CommonContext, CommonProvider}