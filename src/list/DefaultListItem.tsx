import React, { useContext, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { MyDocListViewStyles} from '../content/style/style';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { CommonContext } from '../context/CommonContext';
import Toast from 'react-native-toast-message';

const DefaultListItem = ( props:any) => {
    const { sortMenuState, 
            setIsActionMenu, 
            setSelectedTarget, 
            selectedTargetState} = useContext(CommonContext);
    const { targetFullPathState, setTargetFullPath} = !props.fullpath ? useContext(CommonContext) : {targetFullPathState : props.fullpath, setTargetFullPath : props.setFullpath} ;

    const onClickActionMenu = () => {
        setIsActionMenu( true, props.navigation);
        setSelectedTarget( props.data, props.index);
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
           <View style={[ MyDocListViewStyles.docListContainer, props.listItemFrom === 'dialog' && MyDocListViewStyles.dialogDocListCon]} key={ props.data.fileUID}>
               <TouchableOpacity onPress={ onClickFolder.bind( this, props.data)}>
                   <View style={ MyDocListViewStyles.docListStyle}>
                       <View style ={ MyDocListViewStyles.ThumImg}>
                           <SvgIcon name={ props.data.doc_type === '0' ? "DocListFolderIcon" : props.data.file_type === 'O' ? "DocTitleIconOne" : "DocTItleIconPre"} width={22} height={22} />
                       </View>
                       <View style={ MyDocListViewStyles.docInfo}>
                           <Text style={ MyDocListViewStyles.title} numberOfLines={1}>{ props.data.doc_name}</Text>
                           <View style={{ flexDirection:'row', marginTop:3}}>
                               <View style={{ flexDirection:'row', alignItems:'center'}}>
                                    { props.data.share_type === 1 ? 
                                        <SvgIcon name = "docShareSend" width={13} height={13} /> 
                                    : 
                                    props.data.share_type === 2 ? 
                                        <SvgIcon name = "docShareReceive" width={13} height={13}/>
                                    :  props.data.share_type === 3 && <SvgIcon name = "docShare" width={13} height={13}/>
                                    }
                                    { props.data.flagOpenLink && <SvgIcon name = "docOpenLink" width={13} height={13} /> }
                                    { props.data.important && <SvgIcon name = "docFavorite" width={13} height={13} /> }
                                    {(props.data && Number(props.data.commentCount) > 0) && <SvgIcon name = "docComment" width={13} height={13} /> }
                                    { props.data.security_key && <SvgIcon name = "docSecurity" width={13} height={13} /> }
                                    { props.data.readonly && <SvgIcon name = "docSecurity" width={13} height={13} /> }
                               </View>
                                { sortMenuState && sortMenuState.contextName !== 'TrashDoc' 
                                    ? <Text style={ MyDocListViewStyles.text}> { props.data.mod_name} {'|'} { props.data.mod_date}</Text>
                                    : <Text style={ MyDocListViewStyles.text}> { props.data.creatorName} {'|'} { props.data.delete_date}</Text>
                                }
                           </View>
                       </View>
                   </View>
               </TouchableOpacity>
               
               { !props.fullpath ?
                       <TouchableOpacity onPress={ onClickActionMenu}>
                           <View>
                               <SvgIcon name="DocMoreBtn" width={22} height={22}/>
                           </View> 
                       </TouchableOpacity>
                   :
                    <View></View>
               }
           </View>
       </View>
    ), [ props.data, props.data.doc_name, selectedTargetState]);
} 

export default DefaultListItem;