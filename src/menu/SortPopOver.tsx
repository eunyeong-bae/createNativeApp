import { CommonContext } from '../context/CommonContext';
import React, { useContext, useEffect, useState } from 'react';
import Popover, {PopoverMode} from 'react-native-popover-view';
import {TouchableOpacity, Text, ScrollView, View, Dimensions} from 'react-native';
import SvgIcon from '../component/svgIcon/SvgIcon';
import CommonUtil from '../utils/CommonUtil';
import {sortMenuStyleSheet} from '../menu/style/style';

const ActionMenuName = new Map()
    .set('1','문서 제목')
    .set('2','최종 수정 날짜')
    .set('7','최근 조회 문서')
    .set('O','ONEFFICE')
    .set('S','ONE SLIDE')
    .set('','모든 문서 타입')

const docSortMenu : any = [
    {name:'모든 문서 타입', value:''},
    {name:'ONEFFICE', value:'O'},
    {name:'ONE SLIDE', value:'S'}
    // {name:'ONEFFICE 문서', value:'O'},
    // {name:'ONEFFICE 프레젠테이션', value:'S'}
];

const moreMenus: any = [
    {name:'썸네일 보기', iconName:'DocThumbViewBtn', value:'ThumView', visibility: true},
    {name:'리스트 보기', iconName:'DocListViewBtn', value:'listView', visibility: false},
    {name:'휴지통', value:'trash', visibility: false},
    {name:'이동', value:'move', visibility: false},
    {name:'복원', value:'restore', visibility: false},
]

const SortPopOver = (props: any) => {
    const { sortMenuState, setSortMenu} = useContext(CommonContext);
    const [ showPopover, setShowPopover] = useState(false);
    const [ sortType, setSortType] = useState('');
    const [ selectMenu, setSelectMenu] = useState( []);
    
    const { ViewModeCheck} = props;

    useEffect(() => {
        if( !CommonUtil.objectIsNull( sortMenuState.sortMenuInfo)) {
            // setSelectSortField( sortMenuState.selectedValue.sortFiled);
            // setSortMenuTitle( getSortMenuName(sortMenuState.selectedValue.sortMenu));
            // setSortFileType ( sortMenuState.selectedValue.docType);
        }
    }, [ sortMenuState]);

    const onClickSortTItle = (popOverType: string) => {
        setSelectMenu( popOverType === 'F' ? docSortMenu : popOverType === 'S' ? sortMenuState.sortMenuInfo : moreMenus);
        setSortType( popOverType);
        setShowPopover( true)
    }

    const onClickSortMenu = (sortValue: string) => {
        let sortItem = sortMenuState.selectedValue.sortItem;
        let fileTypes = sortMenuState.selectedValue.fileTypes;
        let sortOrder = sortMenuState.selectedValue.sortOrder;

        if( sortType === 'S'){
            if( sortItem === sortValue){
                sortOrder = sortOrder === 'd' ? 'a' : 'd';
            }
            else{
                sortItem = sortValue;
            }
        }
        else if( sortType === 'F'){
            fileTypes = sortValue;
        }else {
            if( sortValue === 'ThumView'){
                moreMenus[0].visibility = false;
                moreMenus[1].visibility = true; 
            }else {
                moreMenus[0].visibility = true;
                moreMenus[1].visibility = false;
            }
            ViewModeCheck();
        }

        setShowPopover(false);
        setSortMenu( sortMenuState.contextName, { sortItem:sortItem, fileTypes:fileTypes, sortOrder:sortOrder}, sortMenuState.sortMenuInfo)
    }

    const renderPopOverTitle = () => {
        return (
            <View style={{width:90, flexDirection:'row', justifyContent:'space-between', alignItems:'center', height:40}}>
                <TouchableOpacity onPress={ () => onClickSortTItle('S')}>
                    <View> 
                        {/*  style={{ flexDirection: 'row'}
                         <Text style={{ lineHeight: 22, paddingRight: 4}}>{ActionMenuName.get(CommonUtil.strIsNull(sortMenuState.selectedValue) ? '1' : sortMenuState.selectedValue.sortItem)}</Text>
                        <SvgIcon name={ showPopover && sortType === 'S' ? "DocSortArrowBtn" : "DocSortArrowBtn"} width={20} height={20}/> */}
                        <SvgIcon name = "sortMenu" width={20} height={20}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => onClickSortTItle('F')}>
                    <View>
                        <SvgIcon name = "AllDocTypeIcon" width={20} height={20}/>
                        {/* <Text style={{ lineHeight: 22, paddingRight: 4}}>{ActionMenuName.get(CommonUtil.strIsNull(sortMenuState.selectedValue) ? '' : sortMenuState.selectedValue.fileTypes)}</Text> */}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => onClickSortTItle('') }>
                    <View>
                        <SvgIcon name = "DocMoreBtn" width={20} height={20}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const renderPopoverItem = (sortItem: any) => {
        return (
            <TouchableOpacity key={sortItem.value} onPress={ onClickSortMenu.bind(this, sortItem.value)}>    
                <View style={ sortMenuStyleSheet.sortMainItem}>
                    <Text style={ sortType === '' && !sortItem.visibility ? sortMenuStyleSheet.disableText : sortMenuStyleSheet.sortItemText}>{sortItem.name}</Text>
                    {   selectMenu === docSortMenu ?  
                         ( sortItem.value === sortMenuState.selectedValue.fileTypes)
                        :
                         ( sortItem.value === sortMenuState.selectedValue.sortItem)
                        &&
                        <View style={{ width:20, height:20, borderWidth:1, borderColor:'yellow'}}>
                            <SvgIcon name="CheckIcon" height={20} width={20} style={{ alignItems: 'flex-end'}}/>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <>
            <Popover
                mode={ PopoverMode.RN_MODAL}
                isVisible={ showPopover}
                onRequestClose={ () => setShowPopover(false)}
                from={ renderPopOverTitle}
                arrowStyle={{ width: 0, height: 0}}
                popoverStyle={{ maxHeight: 264, width: 150, borderRadius: 10, paddingTop: 10, paddingBottom: 10}}
            >
                {/* { (!CommonUtil.objectIsNull( sortType === 'F' ? docSortMenu : sortMenuState.sortMenuInfo) && showPopover) && */}
                { (!CommonUtil.objectIsNull( sortType === 'F' ? docSortMenu : sortType === 'S' ? sortMenuState.sortMenuInfo : moreMenus) && showPopover) &&
                    <ScrollView style={{ maxHeight: 244}}>
                        <View style={[ sortMenuStyleSheet.sortItemContainer]}>
                            {/* {
                                 sortMenuState.sortMenuInfo.map(( sortMenu : any) => {
                                    return( renderPopoverItem( sortMenu))
                                })
                            } */}
                            {/* { sortType === 'F' 
                                ? docSortMenu.map(( docType : any) => {
                                    return( renderPopoverItem( docType))
                                }) 
                                : sortMenuState.sortMenuInfo.map(( sortMenu : any) => {
                                    return( renderPopoverItem( sortMenu))
                                })
                            } */}
                            { selectMenu.length > 0 &&
                                <>
                                    { selectMenu.map(( menu : any) => {
                                        return( renderPopoverItem( menu))
                                        }) 
                                    }
                                </>
                            }
                        </View>
                    </ScrollView>
                }
            </Popover>
        </>
    );
}

export default SortPopOver;