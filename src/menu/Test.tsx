// class ActionMenuClass extends Component<any, State> {
//     constructor(props: any) {
//         super(props);

//         this.state = {
//             clickMenu: [],
//             options:[],
//             nextActionMenu:''
//         }
//     }

//     public myRef = {
//         ActionSheet: React.createRef<any>()
//     }

    

//     componentDidMount(){
//         const { selectedTargetState, isActionMenu, actionMenuState} = this.props;
        
//         if( !CommonUtil.objectIsNull( selectedTargetState.selectedTarget) && !CommonUtil.objectIsNull( actionMenuState.navigation)){
//             this.setClickMenu();
//             this.showActionSheet();
//         }
//     }

//     //렌더링 마친 후 뭔가의 상태 값이 변했을 때 업데이트 해준다
//     componentDidUpdate(prevProps:any, prevState:any) {
//         const { actionMenuState, selectedTargetState } = this.props;
//         const { options, nextActionMenu} = this.state;
        
//         if( !CommonUtil.objectIsNull( actionMenuState.navigation)){
//             if( CommonUtil.strIsNull( nextActionMenu)){
//                 this.setClickMenu();
//             }
//             // console.log( 'showActionSheet');
//             setTimeout(() => {
//                 this.showActionSheet();
//             },100);
//             this.showActionSheet();
//         }

//         // if( CommonUtil.objectIsNull( actionMenuState.navigation)){
//         //     this.hideActionSheet();
//         // }
//         // else if( JSON.stringify( options) !== JSON.stringify( prevState.options) || CommonUtil.objectIsNull( options)){
//         //     this.setClickMenu();
//         //     this.showActionSheet();
//         // }
        
//         // const { actionName, actionMenuInfo } = this.props;

//         // if( actionMenuState.ActionMenuName !== prevProps.actionName || selectedTargetState.selectedTarget !== prevProps.actionMenuInfo ){
//         //     this.setClickMenu();

//         //     if( !CommonUtil.strIsNull( actionMenuState.ActionMenuName)){
//         //         this.showActionSheet();
//         //     }
//         //     else{
//         //         this.hideActionSheet();
//         //     }
//         // }
//     }
    
//     shouldComponentUpdate(nextProps:any, nextState:any) {
//         // console.log( actionMenu);
//         //뱐환되는 값ㄷ르을 나중에 ~
//         if( JSON.stringify( this.state.options) !== JSON.stringify( nextState.options) || this.state.options.length === 0){
//             return true;
//         } 
//         if( JSON.stringify( this.props.actionMenuState) !== JSON.stringify( nextProps.actionMenuState)){
//             return true;
//         }
//         if( this.state.nextActionMenu !== nextState.nextActionMenu){
//             return true;
//         }
        
//         return false;
//     }

//     //어떤 메뉴 택했는지에 따라, 액션시트 메뉴 리스트 넣어주는 작업
//     setClickMenu = () => {
//         let options:any = [];

//         options = this.renderMoreMenu( moreMenus);

//         this.setState({options:options})

//     }

//     // onClickActionMenuItem = ( value : any) => {
//     //     if(!CommonUtil.strIsNull( value)) {
//     //         this.props.setIsActionMenu(value);
//     //     }

//     // }

//     onClickActionMenuItemMore = async ( menuName : string) => {
//         const {actionMenuState,setCenterDialog} = this.props;

//         const returnVal = await myDocMenuInfo[ menuName].clickEvent();
        
//         let naviVal = returnVal.split('|');
//         if( naviVal[0] === 'newWindow'){
//             setCenterDialog( naviVal[1], null);
           
            
//             this.setState({ options: [], clickMenu : []});
//             this.hideActionSheet();
//         }
//         else if( naviVal[0] === 'nextActionMenu'){
//             let clickMenu: any = [];

//             if( naviVal[1] === 'shareSubMenu'){
//                 clickMenu = shareSubMenu;
//             }
            
//             this.setState({ clickMenu:clickMenu, options:this.renderMoreMenu(clickMenu), nextActionMenu:naviVal[1]});
//         }
//         // this.props.setIsActionMenu( returnVal);
//         // this.hideActionSheet();
//     }

//     // renderSortMenu = ( clickMenu:any) => {
//     //     let options:any = [];
//     //     for(let i= 0; i<clickMenu.length; i++){
//     //         options.push(
//     //             <View key={clickMenu[i]} style={sortMenuStyles.container}>
//     //                 <View style={sortMenuStyles.menuIconCon}>
//     //                     { !CommonUtil.strIsNull(myDocMenuInfo[clickMenu[i]].icon) &&
//     //                         <SvgIcon name={myDocMenuInfo[clickMenu[i]].icon} width={22} height={22} />
//     //                     }
//     //                 </View>
//     //                 <TouchableHighlight onPress={this.onClickActionMenuItem.bind( this, myDocMenuInfo[clickMenu[i]].value)}>
//     //                     <View style={sortMenuStyles.menuTextCon}>
//     //                         <Text>{myDocMenuInfo[clickMenu[i]].name}</Text>
//     //                     </View>
//     //                 </TouchableHighlight>
//     //             </View>
//     //         );
//     //     }

//     //     return options;
//     // }

//     renderMoreMenu = ( clickMenu:any) => {
//         const { ActionMenuName, selectedTargetState} = this.props;

//         let options:any = [];

//         for(let i= 0; i<clickMenu.length; i++){
//             //문서가 가지고 있는 자체의 권한과 더보기 메뉴들이 갖고 있는 권한을 비교해서 해당 메뉴를 그릴지 말지 체크
//             // if(myDocMenuInfo[clickMenu[i]].auth){ //|| CommonFnUtil.checkAuth( myDocMenuInfo[clickMenu[i]].auth, selectedTargetState.selectedTarget.data.docAuth)
                
//             // }
//             options.push(
//                 <View key={myDocMenuInfo[clickMenu[i]]} style={moreMenuStyles.container}>
//                     <View style={moreMenuStyles.menuIconContainer}>
//                         { !CommonUtil.strIsNull(myDocMenuInfo[clickMenu[i]].icon) &&
//                             <SvgIcon name={myDocMenuInfo[clickMenu[i]].icon} width={20} height={20}/>
//                         }
//                     </View>
                    
//                     <View style={moreMenuStyles.menuContainer}>
//                         <TouchableHighlight onPress={this.onClickActionMenuItemMore.bind( this, clickMenu[i])}>
//                             <View style={moreMenuStyles.menuTextCon}>
//                                 <Text style={{width:width - 170}}>{myDocMenuInfo[clickMenu[i]].name}</Text>
//                                 {
//                                     myDocMenuInfo[clickMenu[i]].rightMenu &&
//                                     (this.rightItemRender( clickMenu[i]))
//                                 }
//                             </View>
//                         </TouchableHighlight>
//                     </View>
//                 </View>
//             );
//             // if(clickMenu[i] === ('openLink')){ // 밑으로 메뉴가 생기는 것
//             //     options = options.concat( subItemRender(clickMenu[i]));
//             // }
//         }

//         return options;
//     }

//     rightItemRender = ( menuName: string) => {
//         let content : any = null;

//         if( menuName === 'share' || menuName === 'setPassword'){
//             content = (
//                         <View style={{flexDirection:'row'}}>
//                             <Text style={{paddingTop:3}}>꺼짐</Text>
//                             <SvgIcon name="R_menuNextPageBtn" width={22} height={20} />
//                         </View>
//                       )
//         }else if( menuName === 'setFavorite' || menuName === 'setViewOnly'){
//             content = (
//                 <SvgIcon name="R_menuSwitchON" width={42} height={32} />
//             )
//         }else if( menuName === 'detailDocInfo'){
//             content = (
//                 <SvgIcon name="R_menuNextPageBtn" width={22} height={20}/>
//             )
//         }

//         return (
//             <>
//                 {content}
//             </>
//         )
//     }

//     subItemRender = ( menuType: string) => {
//         let content: any = null;
//     }

//     showActionSheet = () => {
//         this.myRef.ActionSheet.current?.show();
//     }

//     hideActionSheet = () => {
//         const { setIsActionMenu} = this.props;
//         const { nextActionMenu} = this.state;
//         this.myRef.ActionSheet.current?.hide();
//         setIsActionMenu( null);

//         if( !CommonUtil.strIsNull( nextActionMenu)){
//             this.setState({ nextActionMenu : ''});
//         }
//     }

//     render(){
//         // const {actionName} = this.props;
//         const {ActionMenuName} = this.props.actionMenuState;
//         const {options} = this.state;
//         // console.log( options);
//         return (
//             <ActionSheet
//                 ref={this.myRef.ActionSheet}
//                 // title={<View style={ [sortMenuStyles.sortTitle, {flexDirection:'row'}]}>
//                 //             <SvgIcon name={ActionMenuName === 'sortType'? "sortFilterIcon": "AllDocTypeIcon"}
//                 //                      width={22} height={22}
//                 //             />
//                 //             <Text>{ActionMenuName === 'sortType'?'정렬기준':'문서타입'}</Text>
//                 //         </View>
//                 // }
//                 options={options}
//                 theme={'ios'}
//                 styles={styles}
//             />
//         )
//     }
    
// }


// const styles={
//     titleBox : {
//         opacity: 1,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10
//     },
//     buttonBox : {
//         opacity: 1,
//         backgroundColor: '#fff'
//     }
// }

// const ActionMenu = (props:any) => {
//     const {setSelectedTarget, setMultiSelected, setCenterDialog, actionMenuState, setIsActionMenu, selectedTargetState} = useContext(CommonContext);
//     return <ActionMenuClass {...props}
//             setSelectedTarget={setSelectedTarget}
//             setMultiSelected={setMultiSelected}
//             setCenterDialog={setCenterDialog}
//             actionMenuState={actionMenuState}
//             setIsActionMenu = {setIsActionMenu}
//             selectedTargetState = {selectedTargetState}  
//             />
// }

// export default ActionMenu;