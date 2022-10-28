import React, { useContext, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { MyDocListViewStyles} from '../content/style/style';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { CommonContext } from '../context/CommonContext';
import Toast from 'react-native-toast-message';

const DefaultListItem = ( props:any) => {
    const { sortMenuState, setIsActionMenu, setSelectedTarget, selectedTargetState} = useContext(CommonContext);
    const { targetFullPathState, setTargetFullPath} = !props.fullpath ? useContext(CommonContext) : {targetFullPathState : props.fullpath, setTargetFullPath : props.setFullpath} ;

    const onClickActionMenu = () => {
        setIsActionMenu( true, props.navigation);
        setSelectedTarget(props.data, props.index);
    };

    const onClickFolder= ( data: any) => {
        if(data.doc_type === '0'){
            if( sortMenuState.contextName === 'TrashDoc'){
                
                Toast.show({
                    type: 'error',
                    text1: '삭제된 폴더는 열람할 수 없습니다.',
                    visibilityTime: 3000,
                    autoHide: true
                });
            } 
            else {
                const tempTarget = {
                    fullPathUIDs: targetFullPathState.fullPathUIDs.concat(),
                    fullPathNames: targetFullPathState.fullPathNames.concat(),
                };
                tempTarget.fullPathUIDs.push( data.docUID);
                tempTarget.fullPathNames.push( data.doc_name);
                
                setTargetFullPath( tempTarget.fullPathUIDs, tempTarget.fullPathNames, []);
            }

        }else{
            sortMenuState.contextName === 'TrashDoc' && 
                Toast.show({
                    type: 'error',
                    text1: '삭제된 파일은 열람할 수 없습니다.',
                    visibilityTime: 3000,
                    autoHide: true
                });

            return;
        }
    };

    return useMemo(() => (
        //문서 인지 폴더 인지 구분해서 생성해야함 !!!
        /* 
            doc_type: 0 // folder , 1 // doc
            important: 0//x, 1// o
        */
       <View>
           <View style={ MyDocListViewStyles.docListContainer} key={ props.data.fileUID}>
               <TouchableOpacity onPress={ onClickFolder.bind( this, props.data)}>
                   <View style={ MyDocListViewStyles.docListStyle}>
                       <View style ={ MyDocListViewStyles.ThumImg}>
                           <SvgIcon name={ props.data.doc_type === '0' ? "DocListFolderIcon" : props.data.file_type === 'O' ? "DocTitleIconOne" : "DocTItleIconPre"} width={22} height={22} />
                       </View>
                       <View style={ MyDocListViewStyles.docInfo}>
                           <Text style={ MyDocListViewStyles.title} numberOfLines={1}>{ props.data.doc_name}</Text>
                           { sortMenuState && sortMenuState.contextName !== 'TrashDoc' 
                               ? <Text style={ MyDocListViewStyles.text}>{ props.data.mod_name} {'|'} { props.data.mod_date}</Text>
                               : <Text style={ MyDocListViewStyles.text}>{ props.data.creatorName} {'|'} { props.data.delete_date}</Text>
                           }
                           {/* { sortMenuState && sortMenuState.contextName !== 'TrashDoc' 
                               ? <Text style={ MyDocListViewStyles.text}>{ props.data.mod_name} {'|'} { props.data.mod_date.split(' ')[0]}</Text>
                               : <Text style={ MyDocListViewStyles.text}>{ actionMenuState.isActionMenu ? props.data.mod_name: props.data.creatorName} {'|'} 
                                   { actionMenuState.isActionMenu ? props.data.mod_date.split(' ')[0] : props.data.delete_date.split(' ')[0]}</Text>
                           }
                           휴지통 조회한 데이터와 더보기메뉴 클릭시, 현재 선택한 문서 정보 리스트가 달라서 생긴 이슈  
                           */}
                       </View>
                   </View>
               </TouchableOpacity>
               
               { !props.fullpath ?
                       <TouchableHighlight onPress={onClickActionMenu}>
                           <View>
                               <SvgIcon name="DocMoreBtn" width={22} height={22}/>
                           </View> 
                       </TouchableHighlight>
                   :
                   <View></View>
               }
           </View>
       </View>
    ), [ props.data, props.data.doc_name, selectedTargetState]);
} 

export default DefaultListItem;

{/**
    source = uri = '' // 서버에서 받은 이미지 적용
    source = '' // 로컬 파일 이미지 적용
    
*/}