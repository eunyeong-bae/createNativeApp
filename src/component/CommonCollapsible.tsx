import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Adapter from '../ecmadapter';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CommonContext } from '../context/CommonContext';

interface FavoriteDocProps {
  isActiveCategory ?: any,
  setIsActiveCategory ?: any
}

const CommonCollapsible = ( props: FavoriteDocProps) => {
  const { isActiveCategory, setIsActiveCategory} = props;
  const { setAlertDialog} = useContext( CommonContext);

  const [ isCategoryLists, setIsCategoryLists] = useState([{
    title: '카테고리',
    data: [],
  }]);

  useLayoutEffect(() => {
    callCategoryList();
  });

  useEffect(() => {

  })
  //카테고리 목록 조회
  const callCategoryList = async() => {
    let result: any = [];
    const protocolId = 'P628';
    const dataInfo = { includeParentNode: true, uid: ""};

    const data: any = {
        protocolId: protocolId,
        data: dataInfo
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

          setIsCategoryLists([{
            title: '카테고리',
            data: result,
          }]);

        }
    }).catch((error) => {
        console.error(error)
    })

    return result;
  };

  const onClickCategory = ( menuNM: any, data: any) => {
    console.log( menuNM, data);
  };

  const hiddenItemEvent = ( menuName: any, item: any) => {
    
  };

  const renderHeader = useCallback(( category: any) => {
    return (
      <View style={[ collapsibleStyles.titleContainerStyle, isActiveCategory && collapsibleStyles.titleOn ]}>
        <Text style={ collapsibleStyles.textStyle}>{ category.title}</Text>
        <View>
          <SvgIcon name={ isActiveCategory ? "arrowDown" : "arrowUp"} width={20} height={20} />
        </View>
      </View>
    );
  }, [ isActiveCategory]);

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
  }, [ isActiveCategory]);

  const openCategoryDialog = () => {
    const alertName = 'inputAlert';
    const alertItem = {
      title: '카테고리 추가',
      menuNM: 'addCategory',
      isCategoryLists, 
      setIsCategoryLists
    }; 

    setAlertDialog( alertName, alertItem);
    // alert('clicked')
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

  const renderContent = useCallback(( category: any) => {
    return (
      isActiveCategory ?
        <View style={ collapsibleStyles.contentContainerStyle}>
          <SwipeListView 
            showsVerticalScrollIndicator={ false}
            data={ category.data}
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
  }, [ isActiveCategory]);

  const updateSections = () => {
    setIsActiveCategory( !isActiveCategory);
  };
  

  return (
    <View style={ [collapsibleStyles.mainContainerStyle, isActiveCategory && collapsibleStyles.isActive]}>
      <Accordion
          activeSections={[0]}
          sections={ isCategoryLists}
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