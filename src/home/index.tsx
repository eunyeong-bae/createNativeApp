import React, { useContext} from 'react';
import { Text, SafeAreaView, View, Dimensions, TouchableOpacity} from 'react-native';
import { homeStyleSheet} from './style/style';
import SvgIcon from '../component/svgIcon/SvgIcon';
// import { CommonContext} from '../context/CommonContext';
import CommonUtil from '../utils/CommonUtil';
import CommonFnUtil from '../utils/CommonFnUtil';
import HomeHeader from './HomeHeader';
import { AppScreens} from '../navigation';
import Adapter from '../ecmadapter';
import HomeMenu from './HomeMenu';
// import ReViewDoc from '../dialog/ReViewDoc'

const homeHeaderMenuInfo : any = { // HomeIndex로 옮겨서 메뉴 상속으로??
    'titleInfo' : [
                    { name : 'LeftMenuIcon',  height : 22, width : 22,  viewWidth : '15%', jContent : 'flex-start', marginTop: 3, onPressEvent: CommonUtil.logOut},
                    { name : 'HomeTitleLogo', height : 38, width : 172, viewWidth : '70%', jContent : 'center', marginTop: 0, onPressEvent: CommonUtil.logOut},
                    { name : 'TopSearchIcon', height : 22, width : 22,  viewWidth : '15%', jContent : 'flex-end', marginTop: 3, onPressEvent: CommonUtil.logOut},
                    { name : 'logOut', height : 22, width : 22,  viewWidth : '15%', jContent : 'flex-end', marginTop: 3, onPressEvent: null},
    ],
    'homeMenuInfo' : [
        { id : 'MyFolder', name: '내문서함', height : 62, width : 62, parentWidth : 72, navigation : AppScreens.MyDoc},
        { id : 'DocuFolder', name: '도큐플로우', height : 62, width : 62, parentWidth : 72, navigation : AppScreens.MyDoc},
        // { id : 'ShareSendFolder', name: '공유한문서함', height : 62, width : 62, parentWidth : 72, navigation : AppScreens.ShareDoc},
        // { id : 'ShareRecvFolder', name: '공유받은문서함', height : 62, width : 62, parentWidth : 84, navigation : AppScreens.ShareReceiveDoc},
        // { id : 'ImportFolder', name: '중요문서함', height : 62, width : 62, parentWidth : 72, navigation : AppScreens.MyDoc},
        { id : 'DeptFolder', name: '부서문서함', height : 62, width : 62, parentWidth : 72, navigation : AppScreens.GroupDoc},
        { id : 'CompanyFolder', name: '전사문서함', height : 62, width : 62, parentWidth : 72, navigation : AppScreens.CompanyDoc}
    ],
    'mainContent' : [
            { name : 'top', value : [
                                        {name : '최근 조회 문서', goMenu : null},
                                        {name : '내가 작성한 문서', goMenu : null}
                                    ]
            },
            { name : 'center', value : [
                                        {name : '공유한 문서', goMenu : null},
                                        {name : '공유받은 문서', goMenu : null}
                                    ]
            },
            { name : 'bottom', value : [
                                        {name : '즐겨 찾기', goMenu : null},
                                        {name : '요청한 권한 / 요청받은 권한', goMenu : null}
                                    ]
            },
    ]
};

// State interface 정의
interface State {
    isLoading : boolean,
    userData : any,
    lastDocList : any,
    shareDocList : any,
    shareRecvDocList : any,
    requestTargetList : any,
    approveTargetList : any,
    isModalVisible : boolean,
    selectType : string
}

class Home extends React.Component< any, State> {
    private static CONTEXT_NAME = 'Home';
    private static LAST_DOC_TYPE = 'L';
    private static SHARE_DOC_TYPE = 'S';
    private static SHARE_RECV_RE_DOC_TYPE = 'R';
    private static CATEGORY_DOC_TYPE = 'C';
    private static MY_CREATE_DOC_TYPE = 'M';

    constructor(props: any) {
        super(props);

        this.state = {
            isLoading : false,
            userData : null,
            lastDocList : [],
            shareDocList : [],
            shareRecvDocList : [],
            requestTargetList : [],
            approveTargetList : [],
            isModalVisible : false,
            selectType : '' // 최근 : L / 공유 S / 공유 받은 R / C : 즐겨 / M : 내가 등록
        };
    }

    async componentDidMount() {
        await this.getDataList();
        const userData = await CommonUtil._retrieveData( 'userToken');
        homeHeaderMenuInfo['titleInfo'][3].onPressEvent = this.logOut;
        this.setState({ userData : userData});
    }

    shouldComponentUpdate( nextProps: any, nextState: State) {
        if( this.state.userData !== nextState.userData){
            return true;
        }
        if( this.state.isLoading !== nextState.isLoading){
            return true;
        }
        if( this.state.isModalVisible !== nextState.isModalVisible){
            return true;
        }
        if( JSON.stringify( this.state.lastDocList) !== JSON.stringify( nextState.lastDocList)){
            return true;
        }
        if( JSON.stringify( this.state.shareDocList) !== JSON.stringify( nextState.shareDocList)){
            return true;
        }
        if( JSON.stringify( this.state.shareRecvDocList) !== JSON.stringify( nextState.shareRecvDocList)){
            return true;
        }
        
        return false;
    }

    getDataList = async() =>{
        const lastDocList = await this.findLastViewDoc();
        const shareDocList = await this.findShareDocList();
        const shareRecvDocList = await this.findSharedReceiveDocList();
        const requestTargetList = await this.findRequestAuth();
        const approveTargetList = await this.findApproveAuth();
        // homeHeaderMenuInfo['mainContent'][0].value[0].dataList = await this.findLastViewDoc();
        // homeHeaderMenuInfo['center'][0].value[0].dataList = await this.findShareDocList();
        // homeHeaderMenuInfo['center'][1].value[0].dataList = await this.findSharedReceiveDocList();
        
        this.setState({ lastDocList : lastDocList, shareDocList : shareDocList, shareRecvDocList : shareRecvDocList, requestTargetList, approveTargetList : approveTargetList});
    }

    findLastViewDoc = async() => {
        let searchList : any = [];

        const data : any = {
            protocolId: 'P799',
            data: {
                listType : '',
                page : 1,
                pageSize : '10',
                searchType : '1',
                sortField : '5',
                sortOrder : 'DESC'
            }
        }
        
        await Adapter.fetch.protocol(data).then((res) => {
            if( res.list){
                searchList = res.list;
            }
        }).catch((error) => {
            console.error(error)
        })

        return searchList;
    }

    findShareDocList = async() => {
        const data : any = {
            page : 1,
            pageSize : 10,
            sortField : '3',
            sortOrder : 'DESC',
            includeDoc : true,
            includeFolder : false,
            listType : 1
        }
        
        return await CommonFnUtil.searchDataList( data);
    }

    findSharedReceiveDocList = async() => {
        const data : any = {
            page : 1,
            pageSize : 10,
            sortField : '3',
            sortOrder : 'DESC',
            includeDoc : true,
            includeFolder : false,
            listType : 2
        }

        return await CommonFnUtil.searchDataList( data);
    }

    findRequestAuth = async() => {
        let searchList : any = [];

        const  data : any = {
            protocolId : 'P809',
            data : {
                listType : "3",
                pageSize : 5,
                page : 1,
                searchType: 4,
                searchText: 'w',
                sortField: '0',
                sortOrder: 'DESC'
            }
        }

        await Adapter.fetch.protocol(data).then(res => {
            if( res && res.list) {
                searchList = res.list;
            }
        }).catch(error => {
            console.error(error);
        });

        return searchList;
    }

    findApproveAuth = async() => {
        let searchList : any = [];

        const  data : any = {
            protocolId : 'P810',
            data : {
                listType : "3",
                pageSize : 5,
                page : 1,
                searchType: 4,
                searchText: 'w',
                sortField: '0',
                sortOrder: 'DESC'
            }
        }

        await Adapter.fetch.protocol(data).then(res => {
            if( res && res.list) {
                searchList = res.list;
            }
        }).catch(error => {
            console.error(error);
        });

        return searchList;
    }

    onClickReViewDoc = async( document : any, selectType : string, index : number) => {
        const { setSelectedTarget} = this.props;
        document = await this.getReViewData( document);
        setSelectedTarget( document, index);

        this.setIsModalVisible( true);
        this.setState({ selectType : selectType});
    }

    getReViewData = async( document : any) => {
        if( CommonUtil.strIsNull( document.targetObjectType)){
            document.targetObjectType = document.votype;
        }

        if( CommonUtil.strIsNull( document.folderType)){
            document.folderType = document.createType;
        }

        if( CommonUtil.objectIsNull( document.flagInfo)){
            document.flagInfo = CommonFnUtil.setFlagInfo( document, document.targetObjectType);
        }

        if( CommonUtil.objectIsNull( document.authInfo)){
            document.authInfo = CommonUtil.getAuthInfo( document);
        }
        
        try {
            document.imgSrc = await CommonUtil.getFileDownload( document.fileUID, true);
            
        } catch (error) {
            document.imgSrc = '';
        }

        return document;
    }

    onClickFileView = () => {
        const { navigation, selectedTargetState, reViewDocState} = this.props;
        
        if( reViewDocState.isVisible){
            this.setIsModalVisible( false);
        }

        if( !CommonUtil.isOnefficeView( selectedTargetState.selectedTarget.fileExt) && !CommonUtil.isOnefficeSlide( selectedTargetState.selectedTarget.fileExt)){
            navigation.push( AppScreens.FileView);
        }
        else{
            console.log( '원피스 미지원');
        }
    }

    onClickChangeTarget = async( type : string) => { // type : B : 뒤로, F : 앞ㅇ로
        const { selectedTargetState, setSelectedTarget} = this.props;
        const { lastDocList, shareDocList, shareRecvDocList, selectType} = this.state;
        let dataList : any = [];

        if( selectType === 'L'){
            dataList = lastDocList;
        }
        else if( selectType === 'S'){
            dataList = shareDocList;
        }
        else if( selectType === 'R'){
            dataList = shareRecvDocList;
        }

        if( type === 'F' && selectedTargetState.index < dataList.length-1){
            dataList[selectedTargetState.index + 1] = await this.getReViewData( dataList[selectedTargetState.index + 1]);
            setSelectedTarget( dataList[selectedTargetState.index + 1], selectedTargetState.index + 1);
        }
        else if( type === 'B' && selectedTargetState.index > -1 ){
            dataList[selectedTargetState.index - 1] = await this.getReViewData( dataList[selectedTargetState.index - 1]);
            setSelectedTarget( dataList[ selectedTargetState.index-1], selectedTargetState.index -1);
        }
    }

    setIsModalVisible = ( isModalVisible : boolean) =>{
        const { setReViewDoc} = this.props;

        if( isModalVisible){
            setReViewDoc( true, this.onClickFileView, this.setIsModalVisible.bind( this, false), this.onClickChangeTarget, null)
        }
        else{
            setReViewDoc( false, null, null, null);
        }

        this.setState({ isModalVisible : isModalVisible});
    }

    setLoading = ( isLoading : boolean) => {
        this.setState({ isLoading : isLoading});
    }

    logOut = async() =>{
        console.log('loguot');
        await CommonUtil._removeData( 'userToken');
        await CommonUtil._removeData( 'baseData');

        this.props.navigation.navigate( AppScreens.Login)
    }

    render() {
        const { navigation, route} = this.props;
        const { userData, lastDocList, shareDocList, shareRecvDocList, requestTargetList, approveTargetList, isModalVisible} = this.state;
        
        return (
            <SafeAreaView style={{ backgroundColor: '#fff', height: Dimensions.get('window').height}}>
                <HomeHeader homeHeaderMenuInfo={homeHeaderMenuInfo}
                            userData={userData}
                            navigation={navigation}
                            route={route}
                />
                <View style={ homeStyleSheet.homeMainContent}>
                    <View style={ homeStyleSheet.homeMainContentColumn}>
                        <View style={ homeStyleSheet.homeMainContentRow}>
                            <View style={ homeStyleSheet.homeContent}>
                                <View style={ homeStyleSheet.homeContentTop}>
                                    <View style={ homeStyleSheet.homeContentTopLeft}>
                                        <Text style={{fontSize: 13}}>최근 조회 문서</Text>
                                    </View>
                                    <View style={ homeStyleSheet.homeContentTopRight}>
                                        <TouchableOpacity onPress={()=>{ navigation.push( AppScreens.LastViewDoc)}}>
                                            <SvgIcon name="NextSB" width={15} height={15}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={ homeStyleSheet.homeContentList}>
                                    { lastDocList.length > 0 ?
                                        <>
                                            { lastDocList.map(( data : any, index : number) =>{
                                                return(
                                                        <TouchableOpacity key={data.uid} style={{ padding: 2}} onPress={this.onClickReViewDoc.bind( this, data, Home.LAST_DOC_TYPE, index)}>
                                                            <Text numberOfLines={1}>{data.name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </>
                                    :
                                        <Text>등록된 문서가 없습니다.</Text>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={ homeStyleSheet.homeMainContentRow}>
                            <View style={ homeStyleSheet.homeContent}>
                                <View style={ homeStyleSheet.homeContentTop}>
                                    <View style={ homeStyleSheet.homeContentTopLeft}>
                                        <Text style={{fontSize: 13}}>내가 등록한 문서</Text>
                                    </View>
                                    <View style={ homeStyleSheet.homeContentTopRight}>
                                        <TouchableOpacity onPress={ () => {this.props.setCenterDialog('test')}}>
                                            <SvgIcon name="NextSB" width={15} height={15}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={ homeStyleSheet.homeContentList}>
                                {/* { menu.dataList.map(( data : any) =>{
                                    return(<Text key={data.uid}>{data.name}</Text>)
                                    })
                                } */}
                                    <Text>등록된 문서가 없습니다.</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={ homeStyleSheet.homeMainContentColumn}>
                        <View style={ homeStyleSheet.homeMainContentRow}>
                            <View style={ homeStyleSheet.homeContent}>
                                <View style={ homeStyleSheet.homeContentTop}>
                                    <View style={ homeStyleSheet.homeContentTopLeft}>
                                        <Text style={{fontSize: 13}}>공유한 문서</Text>
                                    </View>
                                    <View style={ homeStyleSheet.homeContentTopRight}>
                                        <TouchableOpacity onPress={()=>{ navigation.push( AppScreens.ShareDoc)}}>
                                            <SvgIcon name="NextSB" width={15} height={15}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={ homeStyleSheet.homeContentList}>
                                    { shareDocList.length > 0 ? 
                                        <>
                                            { shareDocList.map(( data : any, index : number) =>{
                                                return(
                                                        <TouchableOpacity key={data.uid} style={{ padding: 2}} onPress={this.onClickReViewDoc.bind( this, data, Home.SHARE_DOC_TYPE, index)}>
                                                            <Text numberOfLines={1}>{data.name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </>
                                    :
                                        <Text>등록된 문서가 없습니다.</Text>
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={ homeStyleSheet.homeMainContentRow}>
                            <View style={ homeStyleSheet.homeContent}>
                                <View style={ homeStyleSheet.homeContentTop}>
                                    <View style={ homeStyleSheet.homeContentTopLeft}>
                                        <Text style={{fontSize: 13}}>공유받은 문서</Text>
                                    </View>
                                    <View style={ homeStyleSheet.homeContentTopRight}>
                                        <TouchableOpacity onPress={()=>{ navigation.push( AppScreens.ShareReceiveDoc)}}>
                                            <SvgIcon name="NextSB" width={15} height={15}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={ homeStyleSheet.homeContentList}>
                                    { shareRecvDocList.length > 0 ? 
                                        <>
                                            { shareRecvDocList.map(( data : any, index : number) =>{
                                                return(
                                                        <TouchableOpacity key={data.uid} style={{ padding: 2}} onPress={this.onClickReViewDoc.bind( this, data, Home.SHARE_RECV_RE_DOC_TYPE, index)}>
                                                            <Text numberOfLines={1}>{data.name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </>
                                    :
                                        <Text>등록된 문서가 없습니다.</Text>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={ homeStyleSheet.homeMainContentColumn}>
                        <View style={ homeStyleSheet.homeMainContentRow}>
                            <View style={ homeStyleSheet.homeContent}>
                                <View style={ homeStyleSheet.homeContentTop}>
                                    <View style={ homeStyleSheet.homeContentTopLeft}>
                                        <Text style={{fontSize: 13}}>즐겨찾는</Text>
                                    </View>
                                    <View style={ homeStyleSheet.homeContentTopRight}>
                                        <TouchableOpacity onPress={()=>{ navigation.push( AppScreens.CategoryDoc)}}>
                                            <SvgIcon name="NextSB" width={15} height={15}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={ homeStyleSheet.homeContentList}>
                                {/* { menu.dataList.map(( data : any) =>{
                                    return(<Text key={data.uid}>{data.name}</Text>)
                                    })
                                } */}
                                    <Text>등록된 문서가 없습니다.</Text>
                                </View>
                            </View>
                        </View>
                        <View style={ homeStyleSheet.homeMainContentRow}>
                            <View style={ [homeStyleSheet.homeContent, {height: '48%', marginBottom: 5}]}>
                                <View style={ homeStyleSheet.homeContentTop}>
                                    <View style={ homeStyleSheet.homeContentTopLeft}>
                                        <Text style={{fontSize: 13}}>요청한 권한 {requestTargetList.length}</Text>
                                    </View>
                                    <View style={ homeStyleSheet.homeContentTopRight}>
                                        <SvgIcon name="NextSB" width={15} height={15}/>
                                    </View>
                                </View>
                                <View style={ homeStyleSheet.homeContentList}>
                                    { requestTargetList.length > 0 ?
                                        <>
                                            { requestTargetList.map(( data : any) =>{
                                                    return(
                                                        <TouchableOpacity key={data.uid} style={{ padding: 2}} onPress={ () => {console.log(data)}}>
                                                            <Text key={data.uid} numberOfLines={1}>{data.targetObjectName}</Text>
                                                        </TouchableOpacity>    
                                                    )
                                                })
                                            }
                                        </>
                                    :
                                        <Text>등록된 문서가 없습니다.</Text>
                                    }
                                </View>
                            </View>
                            <View style={ [homeStyleSheet.homeContent, {height: '48%', marginTop: 5}]}>
                                <View style={ homeStyleSheet.homeContentTop}>
                                    <View style={ homeStyleSheet.homeContentTopLeft}>
                                        <Text style={{fontSize: 13}}>요청받은 권한 {approveTargetList.length}</Text>
                                    </View>
                                    <View style={ homeStyleSheet.homeContentTopRight}>
                                        <SvgIcon name="NextSB" width={15} height={15}/>
                                    </View>
                                </View>
                                <View style={ homeStyleSheet.homeContentList}>
                                    { approveTargetList.length > 0 ?
                                        <>
                                            { approveTargetList.map(( data : any) =>{
                                                return(
                                                    <TouchableOpacity key={data.uid} style={{ padding: 2}} onPress={ () => {console.log(data)}}>
                                                        <Text key={data.uid} numberOfLines={1}>{data.targetObjectName}</Text>
                                                    </TouchableOpacity>
                                                )
                                             })
                                            }
                                        </>
                                    :
                                        <Text>등록된 문서가 없습니다.</Text>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <HomeMenu
                    menuInfo={ homeHeaderMenuInfo['homeMenuInfo']}
                    navigation={ navigation}
                    route={ route}
                />
                {/* <ReViewDoc isVisible={isModalVisible}
                            imgSrc={ CommonUtil.objectIsNull( selectedTargetState.selectedTarget) ? '' : selectedTargetState.selectedTarget.imageUrl}
                            onClickFileView={ this.onClickFileView}
                            onClickClose={ this.setIsModalVisible.bind( this, false)}
                /> */}
            </SafeAreaView>
        );
    }
}

// const Home = ( props : any) => {
//     const { setSelectedTarget, selectedTargetState, setCenterDialog, setReViewDoc, reViewDocState} = useContext(CommonContext);
//     return <HomeClass {...props} 
//                     setSelectedTarget={setSelectedTarget} 
//                     selectedTargetState={selectedTargetState} 
//                     setCenterDialog={setCenterDialog}
//                     setReViewDoc={setReViewDoc}
//                     reViewDocState={reViewDocState}
//             />
// }

export default Home;



// { homeHeaderMenuInfo['mainContent'].map(( menuInfo : any) => {
//     return(
//             <View key={menuInfo.name} style={ homeStyleSheet.homeMainContentColumn}>
//                 { menuInfo.value.map(( menu : any) => {
//                     return(
//                         <View key={menu.name} style={ homeStyleSheet.homeMainContentRow}>
//                             <View style={ homeStyleSheet.homeContent}>
//                                 <View style={ homeStyleSheet.homeContentTop}>
//                                     <Text style={{fontSize: 13}}>{menu.name}</Text>
//                                     <SvgIcon name="NextB" width={15} height={15}/>
//                                 </View>
//                                 <View style={ homeStyleSheet.homeContentList}>
//                                     { menu.dataList.length > 0 ?
//                                         <View>
//                                         { menu.dataList.map(( data : any) =>{
//                                             return(<Text key={data.uid}>{data.name}</Text>)
//                                         })
//                                         }
//                                         </View>
//                                     :
//                                     <Text>문서가 존재하지 않습니다.</Text>
//                                     }
//                                 </View>
//                             </View>
//                         </View>
//                     )
//                  })
//                 }
//             </View>
//         )
//     })
// }

// render 함수 호출시 화면 갱신 직전에 호출되는 함수
// getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
//     console.log('getSnapshotBeforeUpdate');
//     return {
//         testData: true,
//     };
// }

// render 함수 호출시 getSnapshotBeforeUpdate 다음으로 호출되는 함수
// componentDidUpdate(nextProps: Props, prevState: State, snapshot: null) {
//     console.log('componentDidUpdate');
//     return true;
// }

// 해당 컴포넌트가 unmount 될 때 호출되는 함수
// componentWillUnmount() {
//     console.log('componentWillUnmount');
// }

// 컴포넌트 렌더링에서의 예외 처리 함수
// componentDidCatch(error: Error, info: React.ErrorInfo) {
//     this.setState({
//         error: true,
//     });
// }

// Props 와 State 동기화 함수
// static getDerivedStateFromProps(nextProps: Props, prevState: State) {
//     // console.log('getDerivedStateFromProps');
//     // if (nextProps.greetings === 'Hello') {
//     //   return { name: 'World' };
//     // } else {
//     //   return null;
//     // }
// }