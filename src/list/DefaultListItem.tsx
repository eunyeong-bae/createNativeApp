import React, { useContext, useMemo} from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
import {MyDocListViewStyles} from '../content/style/style';
import ThumbnailImg from '../thumbnailImg';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { CommonContext } from '../context/CommonContext';

const width = Dimensions.get('window').width;

const DefaultListItem = ( props:any) => {
    const { setIsActionMenu, actionMenuState, setSelectedTarget, selectedTargetState} = useContext(CommonContext);
    const { targetFullPathState, setTargetFullPath} = !props.fullpath ? useContext(CommonContext) : {targetFullPathState : props.fullpath, setTargetFullPath : props.setFullPath} ;
    
    const onClickActionMenu = () => {
        setIsActionMenu( true, props.navigation);
        setSelectedTarget(props.data, props.index);
    }

    const onClickFolder= ( data: any) => {
        if(data.doc_type === '0'){
            const tempTarget = {
                fullPathUIDs: targetFullPathState.fullPathUIDs.concat(),
                fullPathNames: targetFullPathState.fullPathNames.concat(),
            };
            tempTarget.fullPathUIDs.push( data.docUID);
            tempTarget.fullPathNames.push( data.doc_name);
            
            setTargetFullPath( tempTarget.fullPathUIDs, tempTarget.fullPathNames, []);
        }else{
            return;
        }
    };

    return useMemo(() => (
        //문서 인지 폴더 인지 구분해서 생성해야함 !!!
        /* 
            doc_type: 0 // folder , 1 // doc
            important: 0//x, 1// o
        */
            <View style={MyDocListViewStyles.docListContainer} key={props.data.fileUID}>
                <TouchableOpacity onPress={ onClickFolder.bind( this, props.data)}>
                    <View style={ MyDocListViewStyles.docListStyle}>
                        <View style ={MyDocListViewStyles.ThumImg}>
                            <SvgIcon name={ props.data.doc_type === '0' ? "DocListFolderIcon" : props.data.file_type === 'O' ? "DocTitleIconOne" : "DocTItleIconPre"} width={22} height={22} />
                        </View>
                        <View style={MyDocListViewStyles.docInfo}>
                            <Text style={MyDocListViewStyles.title} numberOfLines={1}>{ props.data.doc_name}</Text>
                            <Text style={MyDocListViewStyles.text}>{ props.data.mod_name} {'|'} { props.data.mod_date.split(' ')[0]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                
                {
                    !props.fullpath ?
                        <TouchableHighlight onPress={onClickActionMenu}>
                            <View>
                                <SvgIcon name="DocMoreBtn" width={22} height={22}/>
                            </View> 
                        </TouchableHighlight>
                    :
                    <View></View>
                }
            </View>
    ), [ props.data, selectedTargetState]);
} 

export default DefaultListItem;

{/**
    source = uri = '' // 서버에서 받은 이미지 적용
    source = '' // 로컬 파일 이미지 적용
    
*/}