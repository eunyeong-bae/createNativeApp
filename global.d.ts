declare namespace NextS {
    function call_getBaseData(callback: (data: any) => void);
    function gotoSet();
    function exitApp();
    function exitLogin();
    function getValue(strKey: string, callback: (value: any) => void);
    function setValue(arrData: { key: string, val: any }, callback: () => void);
    function backHistory();
    function backNavi();
    function captureAndSketch();
    function goChatRoom(roomId: string, roomType: 'A' | 'B');
    function selectOrg(selectMode: string, selectDeptMode: string, oldSelectedList: any[], callback: (list: any[] | null) => void);
    function saveClipboard(value?: string);
    function goProfile(empSeq: string, compSeq?: string, deptSeq?: string);
    function commonCmtInfo(event: any, mentionEmpList: [], pathSeq: string, moduleSeq: string, commentType: string, isShowCommentInputBar: string, isShowAttachBtn: string, callback: () => void);
    function goFileViewer(pathSeq: string, files: any[]);
    function callAmaranthLink(type: string, data: any);
    function isAndroid();
    function localDirPath(type: string, callback: any);
    function download(downloadInfo: any, downloadDir: string, callback: any);
    function execFile(pathSeq: string, filePath: string);
    function captureImageData(callback : any);
}

declare module 'pdfjs-dist/build/pdf.worker.entry';
declare module 'pdfjs-dist/build/pdf.js';
declare module 'pdfjs-dist/lib/display/display_utils';

type CurrentFolderState = { // 현재 접속한 폴더 or 카테고리
    targetFolder : any
}

type TargetFullPathState = { // FullPathInfo
    fullPathUIDs : any,
    fullPathNames : any,
    treeTypes : any
}

type SelectedTargetState = { // 단일 선택
    selectedTarget : any,
    index : number
}

type MultiSelectedState = { // 다중 선택
    selectedTargets : any,
    indexs : any
}

type CenterDialogState = {
    dialogName : string,
    dialogItem : any
}

type RightDialogState = {
    dialogName : string,
    dialogItem : any
}

type AlertDialogState = {
    alertName : string,
    alertItem : any
}

type ActionMenuState = {
    isActionMenu : boolean,
    // setIsActionMenu : any,
    // contextName : string,
    // navigation : any
    navigation : any
}

type ReViewDocState = {
    isVisible : boolean,
    onClickFileView : any,
    onClickClose : any,
    onClickChangeTarget : any,
    setIsActionMenu : any
}

type SortMenuState = { // 정렬
    contextName : string,
    selectedValue : any,
    sortMenuInfo : any
}

type CommonContextType = {
    selectedTargetState : SelectedTargetState,
    setSelectedTarget : any,
    multiSelectedState : MultiSelectedState,
    setMultiSelected : any,
    currentFolderState : CurrentFolderState,
    setCurrentFolder : any,
    targetFullPathState : TargetFullPathState,
    setTargetFullPath : any,
    centerDialogState : CenterDialogState,
    setCenterDialog : any,
    rightDialogState : RightDialogState,
    setRightDialog : any,
    alertDialogState : AlertDialogState,
    setAlertDialog : any,
    actionMenuState : ActionMenuState
    setIsActionMenu : any,
    reViewDocState : ReViewDocState,
    setReViewDoc : any,
    sortMenuState : SortMenuState,
    setSortMenu : any
}

interface CommonProviderProps {
    children : JSX.Element | JSX.Element[];
}
