import React, { useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {MyDocStyles} from '../content/style/style';
import ThumbnailImg from '../thumbnailImg';
import SvgIcon from '../component/svgIcon/SvgIcon';
import { CommonContext } from '../context/CommonContext';

const CardListItem = (props : any) => {
    const { setIsActionMenu, actionMenuState, setSelectedTarget, selectedTargetState} = useContext(CommonContext);
    
    const onClickActionMenu = () => {
        setSelectedTarget( props.data, props.index);
        setIsActionMenu( props.navigation);
    };

    const onClickFolder = ( docType:any, folderSeq: any) => {
        if(!docType){
            
        }else{
            alert('document!');
        }
    };

    return (
        /* 
            doc_type: 0 // folder , 1 // doc
            important: 0//x, 1// o
        */
       <>
            <TouchableOpacity onPress={ onClickFolder.bind( this, props.data.doc_type, props.data.folder_no)}>
                <View style={MyDocStyles.docContainer} key={props.data.fileUID}>
                    <View style ={props.data.doc_type === '1' ? MyDocStyles.docThumImg : MyDocStyles.folderThumImg}>
                        <ThumbnailImg thumbData={props.data}
                                    fileId={props.data.fileUID}
                                    type={props.data.doc_type}
                                    listType={'T'}
                                    fileExt={props.data.file_type}
                        />
                        <View style={{paddingTop:10,paddingRight:5}}>
                            <TouchableOpacity onPress={ onClickActionMenu} >
                                <SvgIcon name="DocMoreBtn" width={22} height={22}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={MyDocStyles.docTitle}>
                        {
                            props.data.doc_type === '1' ? 
                                <View style={MyDocStyles.title}>
                                    <SvgIcon name={props.data.file_type === 'O' ? "DocTitleIconOne" : "DocTItleIconPre"} width={20} height={20} />
                                    <Text style={{overflow:'hidden',fontWeight:'600',marginLeft:3}}>{props.data.doc_name}</Text>
                                </View>
                            :
                                <Text style={{marginTop:3}}> {props.data.doc_name} </Text>
                        }
                        <Text style ={MyDocStyles.text}>{props.data.mod_name} {props.data.mod_date}</Text>
                    </View>
                </View> 
            </TouchableOpacity>
       </>
    )
} 

export default CardListItem;

{/**
    source = uri = '' // 서버에서 받은 이미지 적용
    source = '' // 로컬 파일 이미지 적용
    
*/}