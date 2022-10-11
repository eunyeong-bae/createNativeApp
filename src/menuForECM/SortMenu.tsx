import React from 'react';
import { Text, View, TouchableOpacity,Dimensions } from 'react-native';
import { sortMenuStyleSheet} from './style/style'
import SvgIcon from '../component/svgIcon/SvgIcon';
import CommonUtil from '../utils/CommonUtil';
import SortPopover from './SortPopOver';

interface SortMenuInfo {
    sortMenuInfo: any,
    selectSortMenu: string,
    onClickeSelecteMenu : any
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const selectSortType = () => {
    //..문서 정렬 api
}

// const makeSortMenu = (sortType:any):void => {
//     const {name, subMenu, value} = sortType;

//     name === '정렬기준' ? 
//         <View>
//             <Text>{name}</Text>
//             {
//                 subMenu.map((arr:any, index:number) => (
//                     <TouchableOpacity>
//                         <Text>{arr[index].name}</Text>
//                     </TouchableOpacity>
//                 ))
//             }
//         </View>
//         :
//         <View>
//             <Text>{name}</Text>
//             {
//                 subMenu.map((arr:any, index:number) => (
//                     <TouchableOpacity>
//                         <Text>{arr[index].name}</Text>
//                     </TouchableOpacity>
//                 ))
//             }
//         </View>
// };
const SrotMenu = (props:SortMenuInfo) => {
    const {sortMenuInfo, selectSortMenu, onClickeSelecteMenu} = props;
    
    console.log(sortMenuInfo);
    console.log(selectSortMenu);
    console.log(onClickeSelecteMenu);
    return (
        <View style={{width:width,height:50,backgroundColor:'orange'}}>
            { sortMenuInfo.map(( sortMenu : any) => {
                return(
                    <View>
                        <TouchableOpacity onPress={ ()=> alert()}>
                            <Text>{sortMenu.name}</Text>
                        </TouchableOpacity>
                        { selectSortMenu === sortMenu.value &&
                            <>
                                { 

                                }
                            </>
                        }
                    </View>
                )
             })
            }
        </View>
    );
}

export default SrotMenu;

// interface SortMenuInfo {
//     changeSortMenu : any,
//     sortMenu : any,
//     sortOrder : string,
//     sortField : string
// }

// const SrotMenu = ( props : SortMenuInfo) => {
//     const { sortMenu} = props;
    
//     return (
//         <View style={ sortMenuStyleSheet.sortTitleContaier}>
//             <View style={ sortMenuStyleSheet.sortTitleLeftView}>
//                 { CommonUtil.objectIsNull( sortMenu) ?
//                     <Text style={ sortMenuStyleSheet.sortTitleLeftViewText}>최근 조회 문서</Text>
//                 :
//                     // <Text style={ sortMenuStyleSheet.sortTitleLeftViewText}>정렬메뉴 넣기</Text>
//                     <SortPopover/>
//                 }
//             </View>
//             <View style={ sortMenuStyleSheet.sortTitleRightView}>
//                 <View style={ [sortMenuStyleSheet.sortTitleRightViewIconView]}>
//                     <TouchableOpacity onPress={ () => alert('Add')} >
//                         <View style={{ width: 30, height: 25, borderWidth: 1, borderColor: '#3c3f50', borderRadius: 8, opacity: 0.6, alignItems: 'center', justifyContent: 'center'}}>
//                             <SvgIcon name="AddB" width={22} height={22} />
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default React.memo( SrotMenu);