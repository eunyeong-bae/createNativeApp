import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/core';
import { Base64 } from 'js-base64';
import { AppScreens, AppScreenNavigationProp} from '../navigation';
import Adapter from '../ecmadapter';

import ic_attach_ae_l from '../assets/images/contentImages/fileExt/ic_attach_ae_l_thum.png';
import ic_attach_ai_l from '../assets/images/contentImages/fileExt/ic_attach_ai_l_thum.png';
import ic_attach_doc_l from '../assets/images/contentImages/fileExt/ic_attach_doc_l_thum.png';
import ic_attach_dwg_l from '../assets/images/contentImages/fileExt/ic_attach_dwg_l_thum.png';
import ic_attach_etc_l from '../assets/images/contentImages/fileExt/ic_attach_etc_l_thum.png';
import ic_attach_flv_l from '../assets/images/contentImages/fileExt/ic_attach_flv_l_thum.png';
import ic_attach_html_l from '../assets/images/contentImages/fileExt/ic_attach_html_l_thum.png';
import ic_attach_hwp_l from '../assets/images/contentImages/fileExt/ic_attach_hwp_l_thum.png';
import ic_attach_id_l from '../assets/images/contentImages/fileExt/ic_attach_id_l_thum.png';
import ic_attach_jpg_l from '../assets/images/contentImages/fileExt/ic_attach_jpg_l_thum.png';
import ic_attach_mp_3_l from '../assets/images/contentImages/fileExt/ic_attach_mp_3_l_thum.png';
import ic_attach_mp_4_l from '../assets/images/contentImages/fileExt/ic_attach_mp_4_l_thum.png';
import ic_attach_oneffice_l from '../assets/images/contentImages/fileExt/ic_attach_oneffice_l_thum.png';
import ic_attach_slide_l from '../assets/images/contentImages/fileExt/ic_attach_slide_l_thum.png';
import ic_attach_pdf_l from '../assets/images/contentImages/fileExt/ic_attach_pdf_l_thum.png';
import ic_attach_ppt_l from '../assets/images/contentImages/fileExt/ic_attach_ppt_l_thum.png';
import ic_attach_pr_l from '../assets/images/contentImages/fileExt/ic_attach_pr_l_thum.png';
import ic_attach_ps_l from '../assets/images/contentImages/fileExt/ic_attach_ps_l_thum.png';
import ic_attach_txt_l from '../assets/images/contentImages/fileExt/ic_attach_txt_l_thum.png';
import ic_attach_xd_l from '../assets/images/contentImages/fileExt/ic_attach_xd_l_thum.png';
import ic_attach_xls_l from '../assets/images/contentImages/fileExt/ic_attach_xls_l_thum.png';
import ic_attach_zip_l from '../assets/images/contentImages/fileExt/ic_attach_zip_l_thum.png';
import ic_attach_com_l from '../assets/images/contentImages/fileExt/ic_attach_com_l_thum.png';

import ic_attach_ae from '../assets/images/contentImages/fileExt/ic_attach_ae_thum.png';
import ic_attach_ai from '../assets/images/contentImages/fileExt/ic_attach_ai_thum.png';
import ic_attach_doc from '../assets/images/contentImages/fileExt/ic_attach_doc_thum.png';
import ic_attach_dwg from '../assets/images/contentImages/fileExt/ic_attach_dwg_thum.png';
import ic_attach_etc from '../assets/images/contentImages/fileExt/ic_attach_etc_thum.png';
import ic_attach_flv from '../assets/images/contentImages/fileExt/ic_attach_flv_thum.png';
import ic_attach_html from '../assets/images/contentImages/fileExt/ic_attach_html_thum.png';
import ic_attach_hwp from '../assets/images/contentImages/fileExt/ic_attach_hwp_thum.png';
import ic_attach_id from '../assets/images/contentImages/fileExt/ic_attach_id_thum.png';
import ic_attach_jpg from '../assets/images/contentImages/fileExt/ic_attach_jpg_thum.png';
import ic_attach_mp_3 from '../assets/images/contentImages/fileExt/ic_attach_mp_3_thum.png';
import ic_attach_mp_4 from '../assets/images/contentImages/fileExt/ic_attach_mp_4_thum.png';
import ic_attach_oneffice from '../assets/images/contentImages/fileExt/icon_board_oneffice.png';
import ic_attach_slide from '../assets/images/contentImages/fileExt/icon_board_oneffice_pre.png';
import ic_attach_pdf from '../assets/images/contentImages/fileExt/ic_attach_pdf_thum.png';
import ic_attach_ppt from '../assets/images/contentImages/fileExt/ic_attach_ppt_thum.png';
import ic_attach_pr from '../assets/images/contentImages/fileExt/ic_attach_pr_thum.png';
import ic_attach_ps from '../assets/images/contentImages/fileExt/ic_attach_ps_thum.png';
import ic_attach_txt from '../assets/images/contentImages/fileExt/ic_attach_txt_thum.png';
import ic_attach_xd from '../assets/images/contentImages/fileExt/ic_attach_xd_thum.png';
import ic_attach_xls from '../assets/images/contentImages/fileExt/ic_attach_xls_thum.png';
import ic_attach_zip from '../assets/images/contentImages/fileExt/ic_attach_zip_thum.png';
import ic_attach_com from '../assets/images/contentImages/fileExt/ic_attach_com_thum.png';

export default class CommonUtil{
    public static _storeData = async ( key : string, value : string) => {
        try {
            await AsyncStorage.setItem( key, value);
        } catch (error) {
        // Error saving data
        }
    };
       
    //읽어오기
    public static _retrieveData = async ( key : string) => {
        let value : any = null;
        try {
            value = await AsyncStorage.getItem( key);
        } catch (error) {
        // Error retrieving data
        }

        return JSON.parse( value);
    };

    public static _removeData = async ( key : string) => {
        let value : any = null;
        try {
            value = await AsyncStorage.removeItem( key);
        } catch (error) {
        // Error retrieving data
        }

        return JSON.parse( value);
    };

    public static logOut = async() => {
        console.log( 'logOut');
        // await CommonUtil._removeData( 'userToken');
        const navigation = await useNavigation<AppScreenNavigationProp>();
        navigation.navigate( AppScreens.Login);
    }

    public static getListViewType = ( viewType : string) => {
        if( viewType === 'ListView'){
            return 'ThumbView';
        }
        else{
            return 'ListView';
        }
    }

    public static isDocument = ( type : string) => {
        return type === 'DO';
    }

    public static isUser = ( type : string) => {
        return type === 'UR';
    }

    public static isMyDoc = ( type : string) => {
        return type === 'P';
    }

    public static isDocuFlow = ( type : string) => {
        return type === 'L';
    }

    public static isGroup = ( type : string) => {
        return type === 'G';
    }

    public static isCompany = ( type : string) => {
        return type === 'U';
    }

    public static isCategory = ( type : string) => {
        return type === 'C';
    }

    public static isGroupFolder = ( folderType : string) => {
        return folderType === 'RG';
    }

    public static isOnefficeView = ( fileExt : string) => {
        return fileExt.toUpperCase() === 'ONEX';
    }

    public static isOnefficeSlide = ( fileExt : string) => {
        return fileExt.toUpperCase() === 'ONES';
    }

    public static isPDF = ( fileExt : string) => {
        return fileExt.toUpperCase() === 'PDF';
    }

    public static isFileAuthCheck = (fileAuth: any) => {
        return fileAuth === 'true';
    }

    public static isImg = ( fileExt : string, fileType : string) => {
        if( fileType === 'I'){
            return true;
        }
        else if( fileExt.toUpperCase() === 'PNG'){
            return true;
        }
        else if( fileExt.toUpperCase() === 'JPG'){
            return true;
        }
        else if( fileExt.toUpperCase() === 'JPEG'){
            return true;
        }

        return false;
    }

    public static isReviewDoc = ( fileExt : string) => {
        if( fileExt.toUpperCase() === 'PPTX'){
            return true;
        }
        else if( fileExt.toUpperCase() === 'XLSX'){
            return true;
        }
        else if( fileExt.toUpperCase() === 'DOCX'){
            return true;
        }
        else if( fileExt.toUpperCase() === 'HWP'){
            return true;
        }
        
        return false;
    }

    public static setThumbSrc = ( data : any, imgSrc : any, imgType : string) => {
        data.imgSrc = imgSrc;
        data.imgType = imgType; // L : 로컬이미지, T : 썸네일
    }

    public static getAuthInfo = ( data : any) => {
        if( CommonUtil.isDocument( data.targetObjectType)){
            return data.docAuth;
        }
        else{
            return data.folderAuth;
        }
    }

    // 사용자 프로필 사진 src Get
    public static getProfileImage = async(picId : string) => {
        const protocol = await Adapter.getProtocol('P018');
        const baseData = await Adapter.getBaseData();
        try {
            if (protocol && protocol.protocolUrl) {
                const getImage = (thumbnail: boolean) => {
                    const headers = Adapter.Utils.getHeader({
                        url: Adapter.Utils.getUrl(protocol.protocolUrl),
                        token: baseData.result.token,
                        hashKey: baseData.result.hashKey,
                        fileUpload: false
                    });
                    return new Promise<string>((resolve, reject) => {
                        const request = new XMLHttpRequest();
                        request.open('GET', `${(Adapter.Utils.isHttp(baseData.result.gwServerUrl) ? '' : 'https://')}${baseData.result.gwServerUrl}${Adapter.Utils.getUrl(protocol.protocolUrl)}?pathSeq=910&UID=${picId}&mobileId=${baseData.header.mobileId}` + (thumbnail ? '&thum=Y' : ''), true);
                        // request.timeout = 8000;
                        request.setRequestHeader('Authorization', headers['Authorization']);
                        request.setRequestHeader('transaction-id', headers['transaction-id']);
                        request.setRequestHeader('wehago-sign', headers['wehago-sign']);
                        request.setRequestHeader('timestamp', headers['timestamp']);
                        request.responseType = 'arraybuffer';
                        request.onload = () => {
                            if (request.status >= 200 && request.status < 300) {
                                if (request.response) {
                                    const contentsType = ((contentType: string) => {
                                        const match = /image\/(\w+).*/.exec(contentType);
                                        return match && match.length >= 2 ? match[1] : 'image/png';
                                    })(request.getResponseHeader('content-type') || '');
                                    const data = Base64.fromUint8Array(new Uint8Array(request.response));
                                    resolve(data ? `data:${contentsType};base64,${data}` : '');
                                } else {
                                    resolve('');
                                }
                            } else {
                                if(request.response != null && request.response.byteLength > 0){
                                    reject(request.response);
                                }
                                else{
                                    resolve('');
                                }
                            }
                        };
                        request.ontimeout = () => {
                            reject(request.response);
                        };
                        request.send();
                    });
                }

                return await getImage(false);
            }
        } catch (error) {
            throw new Error('unexpected error : ' + error);
        }
    }

    // 파일 썸네일 src Get 및 html url 다운로드
    public static getFileDownload = async(fileUID : string, isThumbnail : boolean) => {
        const protocol = await Adapter.getProtocol('P018');
        const baseData = await Adapter.getBaseData();
        let authKey : any = null;
        if (!isThumbnail) {
            authKey = encodeURIComponent(JSON.stringify({"uids" : fileUID, "historyType":"review"}));
        } else {
            authKey = encodeURIComponent(JSON.stringify({"uids" : fileUID, "historyType":null})); 
        }

        try {
            if (protocol && protocol.protocolUrl) {
                const getDownLoad = (thumbnail: boolean) => {
                    const headers = Adapter.Utils.getHeader({
                        url: Adapter.Utils.getUrl(protocol.protocolUrl),
                        token: baseData.result.token,
                        hashKey: baseData.result.hashKey,
                        fileUpload: false
                    });
                    return new Promise<string>((resolve, reject) => {
                        const request = new XMLHttpRequest();
                        request.open('GET', `${(Adapter.Utils.isHttp(protocol.protocolUrl) ? '' : 'https://')}${protocol.protocolUrl}?pathSeq=1601&moduleGbn=ECM&authKeyMap=${authKey}&mobileId=${baseData.header.mobileId}` + (thumbnail ? '&type=thum&thum=Y&defaultImgType=attach' : '&htmlView=Y&isRedirect=N'), true);
                        request.setRequestHeader('Authorization', headers['Authorization']);
                        request.setRequestHeader('transaction-id', headers['transaction-id']);
                        request.setRequestHeader('wehago-sign', headers['wehago-sign']);
                        request.setRequestHeader('timestamp', headers['timestamp']);
                        if(isThumbnail) request.responseType = 'arraybuffer';
                        request.onload = async() => {
                            if (request.status >= 200 && request.status < 300) {                               
                                const length = request.getResponseHeader('content-length');
                                if(isThumbnail && length != null) {
                                    reject(request.response);
                                }
                                else {
                                    const content = request.getResponseHeader('content-type');
                                    if (request.response && content?.indexOf('application/octet-stream') != -1) {
                                        let blob = new Blob([new Uint8Array(request.response)]);
                                        let blobText = (blob.text ? await blob.text() : '');
                                        if(blobText.indexOf('./oneffice_content.html') !=0 ) {
                                            const contentsType = ((contentType: string) => {
                                                const match = /image\/(\w+).*/.exec(contentType);
                                                return match && match.length >= 2 ? match[1] : 'image/png';
                                            })(request.getResponseHeader('content-type') || '');
                                            const data = (thumbnail ? Base64.fromUint8Array(new Uint8Array(request.response)) : request.response);
                                            resolve(data ? (thumbnail ? `data:${contentsType};base64,${data}` : data) : '');
                                        } else {
                                            reject(request.response);
                                        }
                                        
                                    } else {
                                        if(!isThumbnail){
                                            let resData = request.response;
                                            if(resData !=null && resData.length > 0) {
                                                resData = JSON.parse(resData);
                                                if(resData.resultCode == 0){
                                                    resolve(resData.resultData.redirectUrl);
                                                }
                                                else {
                                                    reject(request.response);
                                                }
                                                
                                            }
                                        }
                                        else {
                                            reject(request.response);
                                        }
                                        
                                    }
                                }
                            } else {
                                reject(request.response)
                            }
                        };
                        request.send();
                    });
                }

                return await getDownLoad(isThumbnail);
            }
        } catch (error) {
            throw new Error('unexpected error : ' + error);
        }
    }

    public static getPdfFileDownload = async(fileUID : string) => {
        const protocol = await Adapter.getProtocol('P018');
        const baseData = await Adapter.getBaseData();
        const authKey =  encodeURIComponent(JSON.stringify({"uids" : fileUID}));
        try {
            if (protocol && protocol.protocolUrl) {
                const getDownLoad = () => {
                    const headers = Adapter.Utils.getHeader({
                        url: Adapter.Utils.getUrl(protocol.protocolUrl),
                        token: baseData.result.token,
                        hashKey: baseData.result.hashKey,
                        fileUpload: false
                    });
                    return new Promise<string>((resolve, reject) => {
                        const request = new XMLHttpRequest();
                        request.open('GET', `${(Adapter.Utils.isHttp(baseData.result.gwServerUrl) ? '' : 'https://')}${baseData.result.gwServerUrl}${Adapter.Utils.getUrl(protocol.protocolUrl)}?pathSeq=1601&moduleGbn=ECM&authKeyMap=${authKey}&mobileId=${baseData.header.mobileId}`, true);
                        // request.timeout = 8000;
                        request.setRequestHeader('Authorization', headers['Authorization']);
                        request.setRequestHeader('transaction-id', headers['transaction-id']);
                        request.setRequestHeader('wehago-sign', headers['wehago-sign']);
                        request.setRequestHeader('timestamp', headers['timestamp']);
                        request.responseType = 'arraybuffer';
                        request.onload = async() => {
                            if (request.status >= 200 && request.status < 300) {
                                const content = request.getResponseHeader('content-type');
                                if (request.response && content?.indexOf('application/octet-stream') != -1) {                             
                                    resolve(request.response);
                                } else {
                                    reject(request.response);
                                }
                            } else {
                                reject(request.response)
                            }
                        };
                        // request.ontimeout = () => {
                        //     reject(request.response);
                        // };
                        request.send();
                    });
                }

                return await getDownLoad();
            }
        } catch (error) {
            throw new Error('unexpected error : ' + error);
        }
    }

    public static getImageFileDownload = async(fileUID : string) => {
        const protocol = await Adapter.getProtocol('P018');
        const baseData = await Adapter.getBaseData();
        const authKey =  encodeURIComponent(JSON.stringify({"uids" : fileUID}));
        try {
            if (protocol && protocol.protocolUrl) {
                const getDownLoad = () => {
                    const headers = Adapter.Utils.getHeader({
                        url: Adapter.Utils.getUrl(protocol.protocolUrl),
                        token: baseData.result.token,
                        hashKey: baseData.result.hashKey,
                        fileUpload: false
                    });
                    return new Promise<string>((resolve, reject) => {
                        const request = new XMLHttpRequest();
                        request.open('GET', `${(Adapter.Utils.isHttp(baseData.result.gwServerUrl) ? '' : 'https://')}${baseData.result.gwServerUrl}${Adapter.Utils.getUrl(protocol.protocolUrl)}?pathSeq=1601&moduleGbn=ECM&authKeyMap=${authKey}&mobileId=${baseData.header.mobileId}`, true);
                        // request.timeout = 8000;
                        request.setRequestHeader('Authorization', headers['Authorization']);
                        request.setRequestHeader('transaction-id', headers['transaction-id']);
                        request.setRequestHeader('wehago-sign', headers['wehago-sign']);
                        request.setRequestHeader('timestamp', headers['timestamp']);
                        request.responseType = 'arraybuffer';
                        request.onload = async() => {
                            if (request.status >= 200 && request.status < 300) {
                                const content = request.getResponseHeader('content-type');
                                if (request.response && content?.indexOf('application/octet-stream') != -1) {                             
                                    const contentsType = ((contentType: string) => {
                                        const match = /image\/(\w+).*/.exec(contentType);
                                        return match && match.length >= 2 ? match[1] : 'image/png';
                                    })(request.getResponseHeader('content-type') || '');
                                    const data = Base64.fromUint8Array(new Uint8Array(request.response));
                                    resolve(`data:${contentsType};base64,${data}`);
                                } else {
                                    reject(request.response);
                                }
                            } else {
                                reject(request.response)
                            }
                        };
                        // request.ontimeout = () => {
                        //     reject(request.response);
                        // };
                        request.send();
                    });
                }

                return await getDownLoad();
            }
        } catch (error) {
            throw new Error('unexpected error : ' + error);
        }
    }

    public static strIsNull = ( str : string) => {
        if( str === undefined){
            return true;
        }
        else if( str === null){
            return true;
        }
        else if( str === '' && str.length < 1){
            return true;
        }
        
        return false;
    }

    public static objectIsNull = ( object : any) => {
        if( object === undefined){
            return true;
        }
        else if( object === null){
            return true;
        }
        else if( (object !== null && object.length < 1)){
            return true;
        }

        return false;
    }

    public static getInfoFileImage = (ext : string) => {
        if( ext === 'PDF' || ext ===  'pdf'){
            return ic_attach_pdf_l;
        }
        else if( ext === 'PPT' || ext ===  'PPTX' || ext ===  'ppt' || ext ===  'pptx'){
            return ic_attach_ppt_l;
        }
        else if( ext === 'XLS' || ext ===  'XLSX' || ext ===  'xls' || ext ===  'xlsx'){
            return ic_attach_xls_l;
        }
        else if( ext === 'ONEX' || ext ===  'onex'){
            return ic_attach_oneffice_l;
        }
        else if( ext === 'ONES' || ext ===  'ones'){
            return ic_attach_slide_l;
        }
        else if( ext === 'DOC' || ext ===  'WORD' || ext ===  'DOCX' || ext ===  'doc' || ext ===  'word' || ext ===  'docx'){
            return ic_attach_doc_l;
        }
        else if( ext === 'HWP' || ext ===  'GUL' || ext ===  'hwp' || ext ===  'gul'){
            return ic_attach_hwp_l;
        }
        else if( ext === 'JPG' || ext ===  'JPEG' || ext ===  'GIF' || ext ===  'BMP' || ext ===  'PNG' || ext ===  'IMG' || ext ===  'TIF' || ext ===  'jpg' || ext ===  'jpeg' || ext ===  'gif' || ext ===  'bmp' || ext ===  'png' || ext ===  'img' || ext ===  'tif'){
            return ic_attach_jpg_l;
        }
        else if( ext === 'MP4' || ext ===  'MOV' || ext ===  'MPG' || ext ===  'MPEG' || ext ===  'ASF' || ext ===  'WMV' || ext ===  'AVI' || ext ===  'mp4' || ext ===  'mov' || ext ===  'mpg' || ext ===  'mpeg' || ext ===  'asf' || ext ===  'wmv' || ext ===  'avi'){
            return ic_attach_mp_4_l;
        }
        else if( ext === 'ZIP' || ext ===  'zip'){
            return ic_attach_zip_l;
        }
        else if( ext === 'HTML' || ext ===  'HTM' || ext ===  'EML' || ext ===  'html' || ext ===  'htm' || ext ===  'eml'){
            return ic_attach_html_l;
        }
        else if( ext === 'TXT' || ext ===  'txt'){
            return ic_attach_txt_l;
        }
        else if( ext === 'PSD' || ext ===  'psd'){
            return ic_attach_ps_l;
        }
        else if( ext === 'AI' || ext ===  'ai'){
            return ic_attach_ai_l;
        }
        else if( ext === 'FLV' || ext ===  'flv'){
            return ic_attach_flv_l;
        }
        else if( ext === 'MP3' || ext ===  'WAV' || ext ===  'WMA' || ext ===  'mp3' || ext ===  'wav' || ext ===  'wma'){
            return ic_attach_mp_3_l;
        }
        else if( ext === 'XD' || ext ===  'xd'){
            return ic_attach_xd_l;
        }
        else if( ext === 'ID' || ext ===  'id'){
            return ic_attach_id_l;
        }
        else if( ext === 'PR' || ext ===  'pr'){
            return ic_attach_pr_l;
        }
        else if( ext === 'AE' || ext ===  'ae'){
            return ic_attach_ae_l;
        }
        else if( ext === 'DWG' || ext ===  'dwg'){
            return ic_attach_dwg_l;
        }
        else if( ext === 'DOCS' || ext ===  'docs'){
            return ic_attach_doc_l;
        }
        else if( ext === 'ETC' || ext ===  'etc'){
            return ic_attach_etc_l;
        }
        else if( ext === 'COMPOUND' || ext ===  'compound'){
            return ic_attach_com_l;
        }
    }

    public static getFileImage = (ext : string) => { 
        if( ext === 'PDF' || ext ===  'pdf'){
            return ic_attach_pdf;
        }
        else if( ext === 'PPT' || ext ===  'PPTX' || ext ===  'ppt' || ext ===  'pptx'){
            return ic_attach_ppt;
        }
        else if( ext === 'XLS' || ext ===  'XLSX' || ext ===  'xls' || ext ===  'xlsx'){
            return ic_attach_xls;
        }
        else if( ext === 'ONEX' || ext ===  'onex'){
            return ic_attach_oneffice;
        }
        else if( ext === 'ONES' || ext ===  'ones'){
            return ic_attach_slide;
        }
        else if( ext === 'DOC' || ext ===  'WORD' || ext ===  'DOCX' || ext ===  'doc' || ext ===  'word' || ext ===  'docx'){
            return ic_attach_doc;
        }
        else if( ext === 'HWP' || ext ===  'GUL' || ext ===  'hwp' || ext ===  'gul'){
            return ic_attach_hwp;
        }
        else if( ext === 'JPG' || ext ===  'JPEG' || ext ===  'GIF' || ext ===  'BMP' || ext ===  'PNG' || ext ===  'IMG' || ext ===  'TIF' || ext ===  'jpg' || ext ===  'jpeg' || ext ===  'gif' || ext ===  'bmp' || ext ===  'png' || ext ===  'img' || ext ===  'tif'){
            return ic_attach_jpg;
        }
        else if( ext === 'MP4' || ext ===  'MOV' || ext ===  'MPG' || ext ===  'MPEG' || ext ===  'ASF' || ext ===  'WMV' || ext ===  'AVI' || ext ===  'mp4' || ext ===  'mov' || ext ===  'mpg' || ext ===  'mpeg' || ext ===  'asf' || ext ===  'wmv' || ext ===  'avi'){
            return ic_attach_mp_4;
        }
        else if( ext === 'ZIP' || ext ===  'zip'){
            return ic_attach_zip;
        }
        else if( ext === 'HTML' || ext ===  'HTM' || ext ===  'EML' || ext ===  'html' || ext ===  'htm' || ext ===  'eml'){
            return ic_attach_html;
        }
        else if( ext === 'TXT' || ext ===  'txt'){
            return ic_attach_txt;
        }
        else if( ext === 'PSD' || ext ===  'psd'){
            return ic_attach_ps;
        }
        else if( ext === 'AI' || ext ===  'ai'){
            return ic_attach_ai;
        }
        else if( ext === 'FLV' || ext ===  'flv'){
            return ic_attach_flv;
        }
        else if( ext === 'MP3' || ext ===  'WAV' || ext ===  'WMA' || ext ===  'mp3' || ext ===  'wav' || ext ===  'wma'){
            return ic_attach_mp_3;
        }
        else if( ext === 'XD' || ext ===  'xd'){
            return ic_attach_xd;
        }
        else if( ext === 'ID' || ext ===  'id'){
            return ic_attach_id;
        }
        else if( ext === 'PR' || ext ===  'pr'){
            return ic_attach_pr;
        }
        else if( ext === 'AE' || ext ===  'ae'){
            return ic_attach_ae;
        }
        else if( ext === 'DWG' || ext ===  'dwg'){
            return ic_attach_dwg;
        }
        else if( ext === 'DOCS' || ext ===  'docs'){
            return ic_attach_doc;
        }
        else if( ext === 'ETC' || ext ===  'etc'){
            return ic_attach_etc;
        }
        else if( ext === 'COMPOUND' || ext ===  'compound'){
            return ic_attach_com;
        }
        else{
            return ic_attach_etc;
        }
    }

    public static getFileExtCheck = (ext: string) => {
        // 확장자에 따른 파일 추가 작업 해야 됨
        if( ext === 'PDF' || ext === 'pdf'){ 
            return 'PDF';
        }
        else if( ext === 'PPT' || ext === 'PPTX' || ext === 'ppt' || ext === 'pptx'){ 
            return 'PPTX';
        }
        else if( ext === 'XLS' || ext === 'XLSX' || ext === 'xls' || ext === 'xlsx'){ 
            return 'XLS';
        }
        else if( ext === 'ONEX' || ext === 'DOC' || ext === 'WORD' || ext === 'DOCX' || ext === 'HWP' || ext === 'GUL' || ext === 'onex' || ext === 'doc' || ext === 'word' || ext === 'docx' || ext === 'hwp' || ext === 'gul'){ 
            return 'ONEFFICE';
        }
        else if( ext === 'ONES' || ext === 'ones'){ 
            return 'ONEFFICES';
        }
        else if( ext === 'JPG' || ext === 'JPEG' || ext === 'GIF' || ext === 'BMP' || ext === 'PNG' || ext === 'IMG' || ext === 'TIF' || ext === 'jpg' || ext === 'jpeg' || ext === 'gif' || ext === 'bmp' || ext === 'png' || ext === 'img' || ext === 'tif'){ 
            return 'JPG';
        }
        else if( ext === 'MP4' || ext === 'MOV' || ext === 'MPG' || ext === 'MPEG' || ext === 'ASF' || ext === 'WMV' || ext === 'AVI' || ext === 'mp4' || ext === 'mov' || ext === 'mpg' || ext === 'mpeg' || ext === 'asf' || ext === 'wmv' || ext === 'avi'){ 
            return 'MP4';
        }
        else if( ext === 'ZIP' || ext === 'zip'){ 
            return 'ZIP';
        }
        else if( ext === 'HTML' || ext === 'HTM' || ext === 'EML' || ext === 'html' || ext === 'htm' || ext === 'eml'){ 
            return 'HTML';
        }
        else if( ext === 'TXT' || ext === 'txt'){ 
            return 'TXT';
        }
        else if( ext === 'PSD' || ext === 'psd'){ 
            return 'PSD';
        }
        else if( ext === 'AI' || ext === 'ai'){ 
            return 'AI';
        }
        else if( ext === 'FLV' || ext === 'flv'){ 
            return 'FLV';
        }
        else if( ext === 'MP3' || ext === 'WAV' || ext === 'WMA' || ext === 'mp3' || ext === 'wav' || ext === 'wma'){ 
            return 'MP3';
        }
        else if( ext === 'XD' || ext === 'xd'){ 
            return 'XD';
        }
        else if( ext === 'ID' || ext === 'id'){ 
            return 'ID';
        }
        else if( ext === 'PR' || ext === 'pr'){ 
            return 'PR';
        }
        else if( ext === 'AE' || ext === 'ae'){ 
            return 'AE';
        }
        else if( ext === 'DWG' || ext === 'dwg'){ 
            return 'DWG';
        }
        else if( ext === 'DOCS' || ext === 'docs'){ 
            return null;
        }
        else if( ext === 'ETC' || ext === 'etc'){ 
            return 'ETC';
        }
        else{
            return 'ETC';
        }
    }
}