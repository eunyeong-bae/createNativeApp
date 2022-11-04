import React, { useLayoutEffect, useState } from 'react';
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
  // const [ isCategoryLists, setIsCategoryLists] = useState([]);

  // useLayoutEffect(() => {
  //   // const categoryLists = callCategoryList();
  //   // setIsCategoryLists( );
  //   // console.log( categoryLists)
  // });

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
        if( res.list){
          result = res.list;
        }
    }).catch((error) => {
        console.error(error)
    })

    result = ['전체','가','나','다'];

    return result;
  };

  const onClickCategory = ( menuNM: any, data: any) => {
    console.log( menuNM, data);
  };

  const hiddenItemEvent = () => {

  }
  const renderHeader = ( category: any) => {
      return (
        <View style={ collapsibleStyles.titleContainerStyle}>
          <Text style={ collapsibleStyles.textStyle}>{ category.title}</Text>
          <View>
            <SvgIcon name={ isActiveCategory ? "arrowDown" : "arrowUp"} width={20} height={20} />
          </View>
        </View>
      );
    };

  const renderItem = ( data: any) => {
    return (
      <TouchableOpacity key={ data.index}>
        <View style={{ width:'70%', borderWidth:1, backgroundColor:'#fff', padding:10,}}>
          <Text style={{ fontSize:15, fontWeight:'600', color:'#262529'}}>{ data.item}</Text>
        </View>
      </TouchableOpacity>
    )
  };

  const renderHiddenItem = ( data : any) => {
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
  };
  
  const renderContent = ( category: any) => {
    return (
      isActiveCategory ?
        <View style={ collapsibleStyles.contentContainerStyle}>
          <SwipeListView 
            showsVerticalScrollIndicator={ false}
            data={ category.data}
            renderItem={ renderItem}
            renderHiddenItem={ renderHiddenItem}
            leftOpenValue={ 40}
          />
        </View>
      : 
        null
    );
  };

  const updateSections = () => {
    setIsActiveCategory( !isActiveCategory);
  };
  

  return (
    <View style={[ collapsibleStyles.mainContainerStyle , isActiveCategory ? collapsibleStyles.isActive : collapsibleStyles.isNotActive]}>
      <Accordion
          activeSections={[0]}
          sections={ Category}
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