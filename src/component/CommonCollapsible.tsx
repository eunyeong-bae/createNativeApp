import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CommonContext } from '../context/CommonContext';
import Adapter from '../ecmadapter';
import { format, parseISO} from 'date-fns';

interface CollapsibleProps {
  isActiveStateNM ?: any,
  isActiveAccordion ?: any,
  setIsActiveAccordion ?: any,
}
  
const CommonCollapsible = ( props: CollapsibleProps) => {
  const { isActiveStateNM, isActiveAccordion, setIsActiveAccordion} = props;
  const { setAlertDialog, selectedTargetState} = useContext( CommonContext);

  const [ isResultData, setIsResultData] = useState([{
    title: isActiveStateNM === 'FavoriteDoc' ? '카테고리' : '',
    data: [],
  }]);

  useLayoutEffect(() => {
    isActiveStateNM === 'FavoriteDoc' ? callCategoryList() : getDocHistory( selectedTargetState.selectedTarget?.docUID);
  });

  const getDocHistory = async( docUID: any) => {
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
              result = res.list;

              setIsResultData([{
                title: '',
                data: result,
              }]);

              getDocHistoryContent();
          }
      }).catch((error) => {
          console.log( error);
      })
      return result;
  }

//카테고리 목록 조회
const callCategoryList = async() => {
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

          setIsResultData([{
            title: '카테고리',
            data: result,
          }]);

          return result;
        }
    }).catch((error) => {
        console.error(error)
    })

    return result;
};

const convertHistoryData = ( _obj : any) => {
  let _iconUrl = "";
  let _action_name ="";
  let _sharedUser = "";
  let _shareComment = "";
  const isGroup = ( str : string) => {
    if( str.indexOf(" 외") > -1 && str.indexOf("건") > -1)
      return true;
    else
      return false;
  };  

  switch (_obj.action_code) {
    case '1': //보기
      _iconUrl = "../mobile/images/ico/icon-view.png";
      _action_name = "님이 문서를 열람했습니다.";
        break;
    case '4': //문서 공유
      _iconUrl = "../mobile/images/ico/icon-hshare.png";
      _sharedUser = _obj.shareDetailItem?_obj.shareDetailItem.summary:"";
      _shareComment = `${_sharedUser}에게 공유`;  
      
      if(isGroup(_sharedUser)) _shareComment = `${_sharedUser} 공유`;
      _action_name = `님이 문서를 공유했습니다.`;
      break;
    case '29': // 공유 변경
      _iconUrl = "../mobile/images/ico/icon-hshare.png";
      _sharedUser = _obj.shareDetailItem?_obj.shareDetailItem.summary:"";
      _shareComment = `${_sharedUser}의 공유 변경`;

      if(isGroup(_sharedUser)) _shareComment = `${_sharedUser} 공유 변경`;
      _action_name = `님이 문서를 공유 변경했습니다.`;
      //1818101092
      break;
    case '5':// 공유해제
      _iconUrl = "../mobile/images/ico/icon-hshare.png";
      _sharedUser = _obj.shareDetailItem?_obj.shareDetailItem.summary:"";
      _shareComment = `${_sharedUser}의 공유 해제`;

      if(isGroup(_sharedUser)) _shareComment = `${_sharedUser} 공유 해제`;
      _action_name = "님이 문서를 공유 해제했습니다.";
        break;
    case '8': //문서보안 생성, 수정, 해제
        _iconUrl ="../mobile/images/ico/icon-password.png";
      _action_name = "님이 문서를 암호 설정했습니다.";
      break;
    case '9':
      _iconUrl ="../mobile/images/ico/icon-password.png";
      _action_name = "님이 문서를 암호 변경했습니다.";
      break;
    case '10':
        _iconUrl ="../mobile/images/ico/icon-password.png";
      _action_name = "님이 문서를 암호 해제했습니다.";
      break;
    case '14': //사본만들기
      _iconUrl = "../mobile/images/ico/icon-hcopy.png";
      _action_name = "님이 문서를 사본 만들기했습니다.";
      break;
    // case '25': //원플립 생성,수정,해제
    //     _iconUrl = "../mobile/images/ico/icon-oneflip.png";
    //   _action_name = "님이 문서를 원플립 생성했습니다.";
    //   break;
    // case '26':
    //   _iconUrl = "../mobile/images/ico/icon-oneflip.png";
    //   _action_name = "님이 문서를 원플립 수정했습니다.";
    //   break;
    // case '27':
    //   _iconUrl = "../mobile/images/ico/icon-oneflip.png";
    //   _action_name = "님이 문서를 원플립 해제했습니다.";
    //   break;
    case '30': // 오픈 링크 공유
      _iconUrl = "../mobile/images/ico/icon-hshare.png";
      _action_name = "님이 오픈 링크 공유했습니다."
      _sharedUser = _obj.shareDetailItem?_obj.shareDetailItem.summary:"";
      _shareComment = `${_sharedUser} 공유`;
      break;
    case '31': // 오픈 링크 해제
      _iconUrl = "../mobile/images/ico/icon-hshare.png";
      _action_name = "님이 오픈 링크 공유 해제했습니다."
      _sharedUser = _obj.shareDetailItem?_obj.shareDetailItem.summary:"";
      _shareComment = `${_sharedUser} 공유 해제`;
      break;
    case '32': // 오픈 링크 변경
        _iconUrl = "../mobile/images/ico/icon-hshare.png";
      _action_name = "님이 오픈 링크 공유 변경했습니다."
      _sharedUser = _obj.shareDetailItem?_obj.shareDetailItem.summary:"";
      _shareComment = `${_sharedUser} 공유 변경`;
      break;
    // case '33': case '34': case '35':
    //   _iconUrl = "../mobile/images/ico/icon_sketch.png";
    //   _action_name = "님이 스케치를 편집했습니다.";
    //   break;
    case '36': case '37': case '38':
      _iconUrl = "../mobile/images/ico/icon-password.png";
      _action_name = "님이 문서를 제한 설정했습니다.";
      break;
    case '39': case '40': case '41':
      _iconUrl = "../mobile/images/ico/icon-password.png";
      _action_name = "님이 문서를 제한 해제했습니다.";
      break;
    default: //편집
      _iconUrl = "../mobile/images/ico/icon-edit.png";
      _action_name = "님이 문서를 편집했습니다.";
      break;
  }
  var _nboj = {
    icon : _iconUrl, 
    name : _obj.action_user_name, 
    date : new Date(_obj.reg_date.replace(' ','T')), 
    action : _action_name,
    new_data : _obj.newHistoryShare,
    sharedUser : _shareComment
  }
  return _nboj;
}

const getDocHistoryContent = () => {
    const _list = isResultData[0].data;
    let _dayGroupList = [];

    for( let ix=0 ; ix < _list.length; ix++){
      let _find = false;
      const _listObj = _list[ix];
      const addObj =  {
        title : format(new Date( _listObj.reg_date.split(" ")[0]), "MM월 dd일"),
        date :  _listObj.reg_date,
        collapse : true,
        history : [convertHistoryData(_listObj)]
      };
      
      for( let j=0; j < _dayGroupList.length; j++){
        const _gObj = _dayGroupList[j];
        if( _gObj.title === format(new Date( _listObj.reg_date.split(" ")[0]), "MM월 dd일")) {
          _gObj.history.push( convertHistoryData(_listObj));
          _find = true;
        }
      }
      
      if(!_find) _dayGroupList.push(addObj);
    }
    
    let _monthGroupList = [];
    
    for( let ix=0; ix < _dayGroupList.length; ix++){
      let _find = false;
      const _dayListObj = _dayGroupList[ix];
      const addObj =  {
          title : format(new Date( _dayListObj.date.split(" ")[0]), "yyyy년 MM월"),
          date : _dayListObj.date,
          collapse : true,
          days : [_dayListObj]
      };

      for( let j=0; j < _monthGroupList.length; j++){
        const _gObj = _monthGroupList[j];
        
        if( _gObj.title === format(new Date( _dayListObj.date.split(" ")[0]), "yyyy년 MM월")){
          _gObj.days.push(_dayListObj);
          _find = true;
        }
      }

      if(!_find) _monthGroupList.push(addObj);
    }

    setIsResultData([{
      title:'',
      data: [
        _dayGroupList,
        _monthGroupList
      ]
    }]);

    console.log(_dayGroupList)
    console.log(_monthGroupList)
};

  const onClickCategory = ( menuNM: any, data: any) => {
    console.log( menuNM, data);
  };

  const hiddenItemEvent = ( menuName: any, item: any) => {
    
  };

  const renderHeader = useCallback(( category: any) => {
    return (
      <View style={[ collapsibleStyles.titleContainerStyle, isActiveAccordion && collapsibleStyles.titleOn ]}>
        <Text style={ collapsibleStyles.textStyle}>{ category.title}</Text>
        <View>
          <SvgIcon name={ isActiveAccordion ? "arrowDown" : "arrowUp"} width={20} height={20} />
        </View>
      </View>
    );
  }, [ isActiveAccordion]);

  const renderItem = ( data: any) => {
    return (
      <TouchableOpacity>
        <View style={{ width:'100%', marginBottom:5, borderWidth:1, borderColor:'#DCE7FB', backgroundColor:'#fff', padding:10}}>
          <Text numberOfLines={ 1} style={{ fontSize:15, fontWeight:'600', color:'#4B7FA7', textAlign:'center'}}>{ data.item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  const renderHiddenItem = useCallback(( data : any) => {
    return (
      <TouchableOpacity
        style={[styles.backRightBtn]}
        onPress={ hiddenItemEvent.bind(this, 'deleteCategory', data.item)}
      >
        <View>
          <SvgIcon name="deleteBtn" width={ 20} height={ 20} />
        </View>
      </TouchableOpacity>
    );
  }, [ isActiveAccordion]);

  const openCategoryDialog = () => {
    const alertName = 'inputAlert';
    const alertItem = {
      title: '카테고리 추가',
      menuNM: 'addCategory',
      isResultData, 
      setIsResultData
    }; 

    setAlertDialog( alertName, alertItem);
  };

  const renderListHeaderItem = () => {
    return (
      <TouchableOpacity onPress={ openCategoryDialog}>
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'flex-end', paddingBottom:10, }}>
          <Text style={{ marginRight:5, color:'#aaa'}}>카테고리 설정</Text>
          <SvgIcon name="addBtn" width={ 15} height={ 15} />
        </View>
      </TouchableOpacity>
    );
  };
  
  const keyExtractor = useCallback((item : any, index : any) => item.uid + index, []);

  const renderContent = useCallback(( currentData: any) => {
    return (
      isActiveAccordion ?
        <View style={ collapsibleStyles.contentContainerStyle}>
          <SwipeListView 
            showsVerticalScrollIndicator={ false}
            data={ currentData.data}
            keyExtractor={ keyExtractor}
            ListHeaderComponent={ renderListHeaderItem}
            renderItem={ renderItem}
            renderHiddenItem={ renderHiddenItem}
            // leftOpenValue={ 40}
            rightOpenValue= { -40}
          />
        </View>
      : 
        null
    );
  }, [ isActiveAccordion]);

  const updateSections = () => {
    setIsActiveAccordion( !isActiveAccordion);
  };
  

  return (
    <View style={ [collapsibleStyles.mainContainerStyle, isActiveAccordion && collapsibleStyles.isActive]}>
      <Accordion
          activeSections={[0]}
          sections={ isResultData}
          renderHeader={ renderHeader}
          renderContent={ renderContent}
          onChange={ updateSections}
      />
    </View>
  )
};

export default CommonCollapsible;

const collapsibleStyles = StyleSheet.create({
  isActive: {
    height: 200,
  },
  mainContainerStyle:{
    width: '100%',
    height:40,
    padding:10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#DCE7FB', //#E4ECF9
    backgroundColor:'#fff',
    borderRadius: 10,
  },
  titleContainerStyle : {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft:10,
    paddingBottom:5,
    alignItems:'center'
  },
  titleOn: {
    borderBottomWidth:1,
    borderBottomColor:'#DCE7FB'
  }, 
  textStyle: {
    fontSize: 14,
    fontWeight:'700',
    color: '#75b9f4',
  },
  contentContainerStyle: { 
    width:'100%',
    height: 150,
    marginTop:5,
    padding:10,
  },
});

const styles = StyleSheet.create({
  backRightBtn: {
      position: 'absolute',
      top:0,
      bottom:0,
      right:0,
      width: 40,
      height: 37,
      justifyContent:'center',
      alignItems:'center',
  },
});