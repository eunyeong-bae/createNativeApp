import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import Adapter from '../ecmadapter';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { SwipeListView } from 'react-native-swipe-list-view';

const Category : any = [
    {
        title: '카테고리',
        data: ['전체','가','나','다'],
    },
];

const CommonCollapsible = () => {
  const [ isActiveCategory, setIsActiveCategory] = useState( false); //카테고리 타이틀 클릭 상태 값 체크
  const [ isCategoryLists, setIsCategoryLists] = useState([{
    title: '카테고리',
    data: [],
  }]);

  useLayoutEffect(() => {
    callCategoryList();
  });

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

  const hiddenItemEvent = () => {

  }
  const renderHeader = useCallback(( category: any) => {
    return (
      <View style={ collapsibleStyles.titleContainerStyle}>
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
        <View style={{ width:'70%', borderWidth:1, backgroundColor:'#fff', padding:10,}}>
          <Text style={{ fontSize:15, fontWeight:'600', color:'#262529'}}>{ data.item}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  const renderHiddenItem = useCallback(( data : any) => {
    return (
      <TouchableOpacity
        style={[styles.backRightBtn]}
        onPress={ hiddenItemEvent.bind(this, 'setCategory', data)}
      >
        <View>
          <SvgIcon name="CategoryOn" width={ 20} height={ 20} />
        </View>
      </TouchableOpacity>
    );
  }, [ isActiveCategory]);
  
  const keyExtractor = useCallback((item : any, index : any) => item.uid + index, []);

  const renderContent = useCallback(( category: any) => {
    return (
      isActiveCategory ?
        <View style={ collapsibleStyles.contentContainerStyle}>
          <SwipeListView 
            showsVerticalScrollIndicator={ false}
            data={ category.data}
            keyExtractor={ keyExtractor}
            renderItem={ renderItem}
            renderHiddenItem={ renderHiddenItem}
            leftOpenValue={ 40}
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
    <View style={[ collapsibleStyles.mainContainerStyle , isActiveCategory ? collapsibleStyles.isActive : collapsibleStyles.isNotActive]}>
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
    height: 250,
  },
  isNotActive: {
    height:40,
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
  },
  textStyle: {
    fontSize: 14,
    fontWeight:'600',
    color: '#262529',
  },
  contentContainerStyle: { 
    width:'100%',
    height: 190,
    marginTop:10,
    padding:5,
    borderWidth:1,
    borderColor:'red'
  },
});

const styles = StyleSheet.create({
  backRightBtn: {
      position: 'absolute',
      width: 40,
      height: 40,
      justifyContent:'center',
      alignItems:'center',
  },
});