import React from 'react';
import { View, Image, Text } from 'react-native';
import CommonUtil from '../utils/CommonUtil';
import { thumbNailStyleSheet} from './style/style';
import DefaultFolderImg from '../assets/images/contentImages/fileExt/icon-folder-blue.png';
// import GroupFolderImg from '../assets/images/contentImages/fileExt/ic_file_folder_dept.png';
import ShareFolderImg from '../assets/images/contentImages/fileExt/ic_file_folder_share.png';

const extLabelColor = new Map< string, string>()
    .set( 'PDF', '#e95757')
    .set( 'PPTX', '#f57654')
    .set( 'XLS', '#2ea465')
    .set( 'ONEFFICE', '#26acfb')
    .set( 'ONEFFICES', '#f7573e')
    .set( 'JPG', '#f7bc09')
    .set( 'MP4', '#785fb3')
    .set( 'ZIP', '#a19893')
    .set( 'HTML', '#53c9c9')
    .set( 'TXT', '#a2a2a2')
    .set( 'ETC', '#8e9eb2')
    .set( 'PSD', '#3f9bf9')
    .set( 'AL', '#e9923a')
    .set( 'FLV', '#e24444')
    .set( 'MP3', '#af6cc5')
    .set( 'XD', '#eb38b5')
    .set( 'ID', '#e6287c')
    .set( 'PR', '#bc3ab7')
    .set( 'AE', '#915ec1')
    .set( 'DWG', '#89a42e')

interface IThumbNailImg {
    thumbData : any,
    fileId: string,
    type: string, //DO, FO
    listType: string, // D : 기본 리스트, T : 썸네일, I : 정보보기, A : 댓글
    fileExt: string
    // setThumbSrc: any,
    // thumImg : any | null | undefined 카드형 css 때문에 사용
}

function ThumbnailImg(props: IThumbNailImg) {
    const { thumbData, type, listType, fileId, fileExt} = props;
    const fileExtCheck = CommonUtil.getFileExtCheck(fileExt);
    let imageUrl : any = null;
    const [imgSrc,setImgSrc] = React.useState(''); // 썸네일 이미지
    const [extSrc,setExtSrc] = React.useState( null); // 썸네일 X, 로컬 아이콘 이미지

    React.useEffect(() => {
        if( CommonUtil.objectIsNull( thumbData.imgSrc)){
            if(type === '1') {
                (async () => {
                    imageUrl = CommonUtil.getFileImage( fileExt === 'O' ? 'ONEX' : 'ONES');
                    setExtSrc( imageUrl);
                    CommonUtil.setThumbSrc( thumbData, imageUrl, 'L');
                    if( thumbData.security_key){
                        // imageUrl = CommonUtil.getFileImage( fileExt);
                        // setExtSrc( imageUrl);
                        CommonUtil.setThumbSrc( thumbData, imageUrl, 'L');
                    }
                    else if( fileId) {
                        try {
                            imageUrl = await CommonUtil.getFileDownload( fileId, true);
                            // if(thumImg != null && thumImg.current != null) {
                            //     thumImg.current.style.border = '1px solid #f2f5f8';
                            //     thumImg.current.style.borderBottom = 'none';
                            // }
                            setImgSrc(imageUrl);
                            CommonUtil.setThumbSrc( thumbData, imageUrl, 'T');
                            
                        } catch (error) {
                            //server에서 thumbnail image 못받을시 확장자에 따른 default image 처리
                            // imageUrl = listType === 'I' ? CommonUtil.getInfoFileImage( fileExt) : CommonUtil.getFileImage( fileExt);
                            // setExtSrc( imageUrl);
                            CommonUtil.setThumbSrc( thumbData, imageUrl, 'L');
                        }
                    }
                })();
            }
            else {
                if(thumbData.share_type === '1'){ // 공유 폴더 확인
                    setExtSrc( ShareFolderImg);
                }
                else{
                    setExtSrc( DefaultFolderImg);
                }
            }
        }
        else{
            if( thumbData.imgType === 'T'){
                setImgSrc( thumbData.imgSrc);
            }
            else{
                setExtSrc( thumbData.imgSrc);
            }
        }
    }, [ thumbData, type]);
    
    if( imgSrc !== ''){ // 썸네일
        return (
            <View style={ thumbNailStyleSheet.thumbNailImgView}>
                <Image source={{ uri : imgSrc}} style={ [thumbNailStyleSheet.thumbNailImgSrc, thumbNailStyleSheet.thumbNailImgSub]}/>
            </View>
            // <View style={ thumbNailStyleSheet.thumbNailImgContaier}>
            //         <View style={ [thumbNailStyleSheet.thumbNailExtLabel, {backgroundColor: extLabelColor.get( fileExtCheck)}]}>
            //             <Text style={ thumbNailStyleSheet.thumbNailExtLabelText}>{fileExtCheck}</Text>
            //         </View>
            // </View>
        )
    }
    else{// 로컬
        return(
            <View style={thumbNailStyleSheet.thumbLocalView}>
                <Image source={ extSrc} style={ thumbNailStyleSheet.thumbNailImgSrc}/>
            </View>
        )
    }
}

export default React.memo(ThumbnailImg);