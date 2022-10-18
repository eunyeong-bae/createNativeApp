import { IECMAdapter, IBaseData, ISelectOrgResult} from '../ECMAdapter';
import axios from 'axios';
import ECMAdapterUtils from '../ECMAdapterUtils';
import Env from '../Env';
import Adapter from '../../ecmadapter';
import AsyncStorage from '@react-native-community/async-storage';

export default new (class DevECMAdapter implements IECMAdapter {
    private static history: any;
    public static setHistory(history: any) {
        DevECMAdapter.history = history;
    }

    public fetch = {
        get: async (data: {
            url: string,
            data?: any,
            async?: boolean,
            baseData?: IBaseData,
            headers?: {
                [key: string]: string
            },
            fileUpload : boolean
        }): Promise<any> => {
            try {
                return ECMAdapterUtils.toResultData(await axios.get((ECMAdapterUtils.isHttp(data.url) ? '' : 'https://') + data.url, {
                    params: data.data,
                    headers: ECMAdapterUtils.getHeader({
                        url: data.url,
                        token: data.baseData ? data.baseData.result.token : '',
                        hashKey: data.baseData ? data.baseData.result.hashKey : '',
                        fileUpload : data.fileUpload
                    })
                }));
            } catch (error) {
                throw error;
            }
        },
        post: async (data: {
            url: string,
            data?: any,
            async?: boolean,
            baseData?: IBaseData,
            headers?: {
                [key: string]: string
            },
            fileUpload : boolean
        }): Promise<any> => {
            try {
                let temp = data.data
                if(!data.fileUpload){
                    temp = JSON.parse(data.data);
                    // if(temp.body && temp.body.companyInfo) temp.body.companyInfo = null;
                    // if(temp.header.pId != 'P383' && temp.header.pId != 'P384' && temp.header.pId != 'P386') {
                    //     temp.body.companyInfo = null;
                    // }
                }
                let result : { status: number, statusText: string, data: any } = { status: 0, statusText: '', data: null } ;
                await axios.post((ECMAdapterUtils.isHttp(data.url) ? '' : 'https://') + data.url, temp, {
                    headers: ECMAdapterUtils.getHeader({
                        url: data.url,
                        token: data.baseData ? data.baseData.result.token : '',
                        hashKey: data.baseData ? data.baseData.result.hashKey : '',
                        fileUpload : data.fileUpload
                    })
                }).then((res : any) => {
                    result = res;
                }).catch((error) => {
                    result = error.response
                })

                const {resultCode} = result.data;
                if(resultCode === 11008 || resultCode === 11000 || resultCode === 140){
                    await Adapter.logout();
                }
                else{
                    return ECMAdapterUtils.toResultData(result);
                }
            } catch (error) {
                console.log(error)
                throw error;
            }
        },
    };

    getBaseData = async (): Promise<IBaseData> => {
        return Env.devBaseData as IBaseData;
    }

    gotoSet = async (): Promise<void> => {
        console.log(`gotoSet() invoked.`);
    };

    exitApp = async (): Promise<void> => {
        console.log(`exitApp() invoked.`);
    }

    logout = async (): Promise<void> => {
        console.log(`logout() invoked.`);
    }

    get = async (key: string): Promise<any> => {
        return AsyncStorage.getItem(`bizcube-universal-${key}`) || ''
    }

    set = async (key: string, val: any): Promise<void> => {
        AsyncStorage.setItem(`bizcube-universal-${key}` || '', val);
    }

    backHistory = async (): Promise<void> => {
        if (DevECMAdapter.history) {
            DevECMAdapter.history.goBack();
        }
    }

    backNavi = async (): Promise<void> => {
        if (DevECMAdapter.history) {
            DevECMAdapter.history.goBack();
        }
    }

    captureAndSketch = async (): Promise<void> => {
        console.log(`captureAndSketch() invoked.`);
    }

    goChatRoom = async (roomId: string, roomType: 'A' | 'B'): Promise<void> => {
        console.log(`goChatRoom(${roomId}, ${roomType})`);
    }

    selectOrg = async (selectMode: 'multi' | 'single' | 'none', selectDeptMode: 'select' | 'dept' | 'none', oldSelectedList: ISelectOrgResult[]): Promise<ISelectOrgResult[] | null> => {
        console.log(`selectOrg(${selectMode}, ${selectDeptMode}, ${oldSelectedList})`);
        return null;
    }

    saveClipboard = async (value: string): Promise<void> => {
        console.log(`saveClipboard(${value})`);
    }

    goProfile = async (empSeq: string, compSeq?: string, deptSeq?: string): Promise<void> => {
        console.log(`goProfile(${empSeq}, ${compSeq}, ${deptSeq})`);
    }


    commonCmtInfo = async (event: any, mentionEmpList: [], pathSeq: string, moduleSeq: string, commentType: string, isShowCommentInputBar: string, isShowAttachBtn: string): Promise<void> => {
        console.log(`commonCmtInfo(${event}, ${mentionEmpList}, ${pathSeq}, ${moduleSeq}, ${commentType}, ${isShowCommentInputBar}, ${isShowAttachBtn})`);
        console.dir({
            event, mentionEmpList, pathSeq, moduleSeq, commentType, isShowCommentInputBar, isShowAttachBtn
        });
    }

    goFileViewer = async (pathSeq: string, files: any[]): Promise<void> => {
        console.log(`goFileViewer(${pathSeq}, ${files})`);
        console.dir({
            pathSeq, files
        });
    }

    callAmaranthLink = async (type: string, data: any): Promise<void> => {
        console.log(`callAmaranthLink(${type}, ${data})`);
    }

    localDirPath = async (type: string): Promise<any> => {
        console.log(`localDirPath(${type})`);
    }

    download = async (downloadInfo: any, downloadDir: string, callback: any): Promise<void> => {
        console.log(`download(${downloadInfo}, ${downloadDir})`);
    }

    execFile = async (pathSeq: string, filePath: string): Promise<void> => {
        console.log(`execFile(${pathSeq}, ${filePath})`);
    }

    captureImageData = async (): Promise<any> => {
        console.log(`captureImageData()`);
    }
})()