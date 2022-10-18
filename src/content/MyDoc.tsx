import React, { useContext } from 'react';
import {View, Dimensions, SafeAreaView, Text, Image, ScrollView} from 'react-native';
import Adapter from '../ecmadapter';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MyDocStyles} from './style/style';
import CardListItem from '../list/CardListItem';
import DefaultListItem from '../list/DefaultListItem';
import CommonUtil from '../utils/CommonUtil';
import { CommonContext } from '../context/CommonContext';
import SortMenu from '../menu/SortMenu';

{/*currentFolderName 필요
    home(oneffice) 경우에만 모든 문서 타입으로 검색, 
    나머지 문서함의 경우, 이전에 선택된 문서 정렬 타입대로 로드되야해서 분기처리 필요
*/

    /**
     * typescript 에서 object 타입 선언 시, interface & type 사용
        > typescript 에서는 객체 선언하고 바로 접근할 수 없음. 따라서 interface 사용해서 접근

     * interface 인터페이스 이름{
     *  key:type;
     * }
    */

}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const myDocMenuInfo : any = {    
    'sortMenu' : [
        {name:'문서 제목', value: '1'},
        {name:'최종 수정 날짜', value:'2'},
        {name:'최근 조회 문서', value:'7'}
    ],
    'headerInfo': {
        leftArea: [{iconName:'HomeMenuBtn',clickEvent:() => {alert('search')}} ],
        centerArea: [{iconName:'MyDocLogo'}],
        rightArea: [{iconName:'CommonSearchBtn', clickEvent:() => {alert('search')}}]
    },

};

interface State {
    dataList: any,
    pageNum: number,
    docType: string, //fileType
    listViewMode: boolean, //리스트보기 모드
    sortField : string,
    sortOrder : string,
}

class MyDocClass extends React.Component<any, State> {
    private static CONTEXT_NAME = "MyDoc";
    //마운트
    constructor(props:any) {
        super(props);

        this.state = {
            dataList : [],
            pageNum : 1,
            docType : '',
            listViewMode : false, //false: 섬네일 보기, true: 리스트 보기
            sortField : '1',
            sortOrder : 'DESC'
        };
    }

    //마운트 - 첫번째 렌더링 마치고 나면 호출되는 메서드(이 메서드가 호출되는 시점에는 우리가 만든 컴포넌트가 화면에 나타난 상태)
    async componentDidMount() {
        await this.getFileList();
        this.setHeaderDataInfo();
    }

    //업데이트 - 컴포넌트가 업데이트 되는 시점에 호출되는 함수
    //아래 메서드는 컴포넌트가 리렌더링 할지 말지를 결정하는 메서드, 주로 최적화 시 사용 & React.memo 역할과 비슷
    shouldComponentUpdate(nextProps:any, nextState:any) {

        if( JSON.stringify(this.state.dataList) !== JSON.stringify(nextState.dataList)){
            return true;
        }
        if( this.state.listViewMode !== nextState.listViewMode){
            return true;
        }

        return false;
    }

    //업데이트 - 리렌더링 마친 후, 화면에 우리가 원하는 변화가 모두 반영된 후 호출되는 메서드
    async componentDidUpdate(prevProps:any, prevState:any) {
        const {sortMenuState, setSortMenu} = this.props;

        // if( this.state.selectSortMenu !== prevState.selectSortMenu){
        //     await this.getFileList();
        // }
        if( CommonUtil.strIsNull( sortMenuState.contextName) || sortMenuState.contextName !== MyDocClass.CONTEXT_NAME) {
            setSortMenu( MyDocClass.CONTEXT_NAME, null, myDocMenuInfo[ 'sortMenu'])
        }
        this.setHeaderDataInfo();
    }

    setHeaderDataInfo = () => {
        myDocMenuInfo['headerInfo'].leftArea[0].clickEvent = this.goBack;
        // navigation.goBack()
    }

    goBack = () => {
        const { navigation} = this.props;
        navigation.goBack();
    }

    //언마운트(컴포넌트가 화면에서 사라지는 것 의미)
    //컴포넌트가 화면에서 사라지기 직전에 호출(언마운트 관련 생명주기 메서드)

    getFileList = async () => {
        let fileList : any = []; 
        const data : any = {
            protocolId: "P539",
            data: {
                "folder_no": "",
                "loadType": 1,
                "list_count": 40,
                "pageIndex": 1,
                "pageSize": 40,
                "listType": 2,
                "fileTypes": "",//docType > 모든 문서 : '', 원피스: 'O',피피티: 'S'
                "sortItem": "1", //selectSortMenu
                "sortOrder": "d", //sortType
                "searchText": "",
                "searchType": 1,
            }
        }
        
        await Adapter.fetch.protocol(data).then((res) => {
            if(res){
                fileList = res.list;
            }
            
        }).catch((error) => {
            console.error(error)
        })
        
        this.setState({ dataList : fileList});
    }

    ViewModeCheck = () => {
        this.setState({listViewMode: !this.state.listViewMode});
    }

    renderListItem = ( data : any, index : number) => {
        const { navigation} = this.props;
        const {listViewMode} = this.state;
        if(listViewMode){
            return (
                <CardListItem data={data}
                              key={data.fileUID}
                              index={index}
                              navigation={navigation}
                />
            )
        }
        else{
            return(
                <DefaultListItem data={data}
                                key={data.fileUID}
                                index={index}
                                navigation={navigation}
                />
            )
        }
    }

    render() {
        // on/off, 데이터, 값바꿔주는 함수, 네비
        // const { dataList, selectSortMenu, sortType, docType, listViewMode,actionName, actionMenuInfo,navi} = this.state;
        const { dataList, docType, listViewMode} = this.state;
        const {actionMenuState} = this.props;

        return (
            <SafeAreaView>
               
                <View style={{width:width, height: height}}>
                    {/* <Header headerName={'내 문서함'} headerMenuInfo={myDocMenuInfo.headerInfo}/> */}
                    <View style={{flexDirection:'row',justifyContent:'space-between',height:50,alignItems:'center',backgroundColor:'#eee',paddingLeft:10,paddingRight:10}}>
                        <SortMenu 
                            contextName = { MyDocClass.CONTEXT_NAME}
                            selectedValue = { null}
                            sortMenu = { myDocMenuInfo['sortMenu']}
                        />
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={this.ViewModeCheck}>
                                <SvgIcon name={!listViewMode?'DocThumbViewBtn':'DocListViewBtn'} width={25} height={25}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                        <ScrollView style={{width:width - 10,marginHorizontal:5,height:height - 100,marginBottom:60}}>
                            <View style={MyDocStyles.docListContainer}>
                                {
                                    dataList.map(( list : any, index : number) => {
                                        return(this.renderListItem( list, index))
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>  
            </SafeAreaView>
        );
    }
}

const MyDoc = (props:any) => {
    const {setCurrentFolder, setTargetFullPath, setSelectedTarget, setReViewDoc, selectedTargetState, sortMenuState, setSortMenu} = useContext(CommonContext);
    return <MyDocClass {...props} 
                setCurrentFolder={setCurrentFolder}
                setTargetFullPath={setTargetFullPath}
                setSelectedTarget={setSelectedTarget}
                setReViewDoc={setReViewDoc}
                selectedTargetState={selectedTargetState}
                sortMenuState = {sortMenuState}
                setSortMenu ={setSortMenu}
            />
}
export default MyDoc;