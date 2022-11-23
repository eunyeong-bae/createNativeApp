import React, { useCallback, useContext, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { SwipeListView } from 'react-native-swipe-list-view';
import { CommonContext } from '../context/CommonContext';
import CommonFnUtil from '../utils/CommonFnUtil';

interface CollapsibleProps {
  isActiveStateNM ?: any,
  isActiveAccordion ?: any,
  setIsActiveAccordion ?: any,
}

const CommonCollapsible = ( props: CollapsibleProps) => {
  const { isActiveStateNM, isActiveAccordion, setIsActiveAccordion} = props;
  const { setAlertDialog, selectedTargetState} = useContext( CommonContext);

  const [ isCategoryLists, setIsCategoryLists] = useState([{
    title: '카테고리',
    data: [],
  }]);

  const [ isDocHistory, setIsDocHistory] = useState([{
    title: '문서이력',
    data: [],
  }]);

  useLayoutEffect(() => {
    let result: any = [];

    if( isActiveStateNM === 'FavoriteDoc') { 
      result = CommonFnUtil.callCategoryList();
    } else {
      result = CommonFnUtil.getDocHistory( selectedTargetState.selectedTarget.docUID);
    }
    
    setTimeout(() => {
      if( isActiveStateNM === 'FavoriteDoc') { 
        setIsCategoryLists([{
          title: '카테고리',
          data: result,
        }]);
      } else {
        setIsDocHistory([{
          title: '문서이력',
          data: result,
        }]);
      }
    }, 1000);
  });

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
          sections={ isActiveStateNM === 'FavoriteDoc' ? isCategoryLists : isDocHistory }
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