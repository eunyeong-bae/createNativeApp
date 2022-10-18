import Env from './Env';
import ECMAdapterUtils from './ECMAdapterUtils';
import AsyncStorage from '@react-native-community/async-storage';

export enum AppLoginType {
    'BIZCUBE' = 'BIZCUBE'
}

export interface IProtocol {
    protocolId: string,
    protocolNm?: string,
    protocolUrl: string
}

export interface IBaseData {
    result: {
        groupSeq: string,
        compSeq: string,
        compName: string,
        bizSeq: string,
        bizName: string,
        deptSeq: string,
        deptName: string,
        empSeq: string,
        empName: string,
        positionName: string,
        email: string,
        token: string,
        pushRegIdNormalY: string,
        nativeLangCode: string,
        password_yn: string,
        eaType: string,
        localDataInitYn: string,
        loginCompanyId: string,
        loginUserId: string,
        appVer: string,
        osType: string,
        programCd: string,
        model: string,
        buildType: string,
        groupInfo: any,
        compDomain: string,
        companyList: any[],
        pushData: any,
        mqttInfo: any,
        functionList: any[]
        customBtnList: any[]
        optionList: any[]
        setupVersionSeq: number,
        contentList: any[]
        passwdStatusCode: string,
        passwdStatus: any,
        passwdDate: string,
        useDeviceRegYn: string,
        useTwoFactorAuthenticationYn: string,
        useReportAttendTime: string,
        useMobileWorkCheck: string,
        appConfirmYn: string,
        devRegInfo: any,
        onefficeReportUseYn: string
        menuList: any[]
        gwServerUrl: string,
        hashKey: string
    },
    protocolList: IProtocol[],
    companyInfo: {
        bizSeq: string,
        compSeq: string,
        deptSeq: string,
        emailAddr?: string,
        emailDomain?: string
    },
    header: {
        appType: string,
        loginId: string,
        mobileId: string,
        osType: string
    },
    appLoginType: AppLoginType,
    redirect_data: {
        type?: string,
        data?: any
        onechamber? : any
    }
}

export interface ISelectOrgResult {
    type: 'company' | 'part' | 'emp',
    compSeq: string,
    bizSeq: string,
    deptSeq: string,
    empSeq: string,
    name: string,
    position: string
}


export interface IECMAdapter {
    fetch?: {
        get?: (data: {
            url: string,
            data?: any,
            baseData?: IBaseData,
            headers?: {
                [key: string]: string
            },
            fileUpload : boolean
        }) => Promise<any>,
        post?: (data: {
            url: string,
            data?: any,
            baseData?: IBaseData,
            headers?: {
                [key: string]: string
            },
            fileUpload : boolean
        }) => Promise<any>
    },
    getBaseData?: () => Promise<IBaseData>,
    gotoSet?: () => Promise<void>,
    exitApp?: () => Promise<void>,
    logout?: () => Promise<void>,
    get?: (key: string) => Promise<any>,
    set?: (key: string, val: any) => Promise<void>,
    backHistory?: () => Promise<void>,
    backNavi?: () => Promise<void>,
    captureAndSketch?: () => Promise<void>,
    goChatRoom?: (roomId: string, roomType: 'A' | 'B') => Promise<void>,
    selectOrg?: (selectMode: 'multi' | 'single' | 'none', selectDeptMode: 'select' | 'dept' | 'none', oldSelectedList: ISelectOrgResult[]) => Promise<ISelectOrgResult[] | null>,
    saveClipboard?: (value: string) => Promise<void>,
    goProfile?: (empSeq: string, compSeq?: string, deptSeq?: string) => Promise<void>,
    getLoginUserData?: () => any | undefined,
    storeLoginUserData?: (userData : any) => void,
    callAmaranthLink?: (type: string, data: any) => Promise<void>,
    localDirPath?: (type: string) => Promise<any>,
    download?: (downloadInfo: any, downloadDir: string, callBack: any) => Promise<void>,
    execFile?: (pathSeq: string, filePath: string) => Promise<void>,
    storeSettingData?: (settingData : any) => void,
    getSettingData?: () => any | undefined,
    captureImageData?: () => Promise<any>
}

export default class ECMAdapter {
    public static Utils = ECMAdapterUtils;
    private static adapter: { [target: string]: IECMAdapter } = {};
    private static target?: string;
    private static getTarget(): string { return (ECMAdapter.target || Env.target).toLowerCase(); }
    private static getAdapter(): IECMAdapter | undefined {
        return ((target) => {
            if (!ECMAdapter.adapter[target]) {
                switch ((target || Env.target).toLowerCase()) {
                    case 'development':
                        ECMAdapter.adapter[target] = require('./development').default as IECMAdapter;
                        break;
                    // case 'nexts':
                    //     ECMAdapter.adapter[target] = require('./nexts').default as IECMAdapter;
                    //     break;
                }
            }
            return ECMAdapter.adapter[target];
        })(ECMAdapter.getTarget());
    }
    private static notAvailable = (command: string) => {
        const error = new Error(`[${command}] is not available in [${ECMAdapter.getTarget()}]`);
        console.error(error);
        throw error;
    }
    public static storeBaseData = async (baseData: IBaseData) => {
        await AsyncStorage.setItem('baseData', JSON.stringify(baseData), () => {
            console.log( 'storeBaseData');
        });
    }
    public static getStoredBaseData = async (baseData?: IBaseData) => {
        if (baseData) return baseData;
        const localStorageBaseData = await AsyncStorage.getItem('baseData');
        if (localStorageBaseData) {
            return JSON.parse(localStorageBaseData);
        }
        return undefined;
    }
    public static setTarget(target?: string) {
        ECMAdapter.target = target;
    }
    private static invoke<T>(methodName: string, ...parameters: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                const adapter = ECMAdapter.getAdapter();
                const method = methodName.split('.').reduce((obj, path) => {
                    if (obj && (obj as any)[path]) return (obj as any)[path];
                    else return null;
                }, adapter) as ((...parameters: any) => Promise<T>);
                if (method) {
                    method.apply(adapter, parameters)
                        .then(resolve)
                        .catch(reject);
                } else {
                    ECMAdapter.notAvailable(methodName);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static getProtocol(protocolId: string, baseData?: IBaseData): Promise<IProtocol> {
        return new Promise(async (resolve, reject) => {
            try {
                const _baseData = baseData ? baseData : await ECMAdapter.getBaseData();
                const protocol = _baseData.protocolList.find(protocol => protocol.protocolId === protocolId);
                if (protocol) {
                    resolve(protocol);
                } else {
                    reject(new Error(`protocolId [${protocolId}] is not exist on available protocol list.`));
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    public static fetch = {
        protocol: (data: {
            protocolId: string,
            data?: any,
            baseData?: IBaseData,
            headers?: {
                [key: string]: string
            }
        }): Promise<any> => {
            return new Promise(async (resolve, reject) => {
                try {
                    const _baseData = data.baseData ? data.baseData : await ECMAdapter.getBaseData();
                    const protocol = await ECMAdapter.getProtocol(data.protocolId, _baseData);
                    const transactionId = ECMAdapter.Utils.getTransactionId();

                    data.data.langCode = _baseData.result.nativeLangCode;
                    data.data.empSeq = _baseData.result.empSeq;
                    // data.data.companyInfo = _baseData.companyInfo;

                    ECMAdapter.invoke<any>('fetch.post', {
                        url: _baseData.result.gwServerUrl + ECMAdapter.Utils.getUrl(protocol.protocolUrl),
                        data: JSON.stringify({
                            body: typeof data.data === 'string' ? JSON.parse(data.data) : data.data,
                            header: {
                                appType: _baseData.header.appType,
                                loginId: _baseData.header.loginId,
                                mobileId: _baseData.header.mobileId,
                                osType: _baseData.header.osType,
                                pId: data.protocolId,
                                tId: transactionId,
                                groupSeq: _baseData.result.groupSeq,
                                token: _baseData.result.token
                            }
                        }),
                        baseData: _baseData,
                        headers: {
                            'transaction-id': transactionId,
                            ...data.headers
                        }
                    })
                        .then(resolve)
                        .catch(reject);
                } catch (error) {
                    reject(error);
                }
            });
        },
        get: (data: {
            url: string,
            data?: any,
            baseData?: IBaseData,
            headers?: {
                [key: string]: string
            }
        }): Promise<any> => {
            return new Promise(async (resolve, reject) => {
                ECMAdapter.invoke<any>('fetch.get', {
                    ...data,
                    baseData: data.baseData ? data.baseData : await ECMAdapter.getBaseData()
                })
                    .then(resolve)
                    .catch(reject);
            });
        },
        post: (data: {
            url: string,
            data?: any,
            baseData?: IBaseData,
            headers?: {
                [key: string]: string
            },
            fileUpload : boolean
        }): Promise<any> => {
            return new Promise(async (resolve, reject) => {
                ECMAdapter.invoke<any>('fetch.post', {
                    ...data,
                    baseData: data.baseData ? data.baseData : await ECMAdapter.getBaseData(),
                    fileUpload : data.fileUpload
                })
                    .then(resolve)
                    .catch(reject);
            });
        }
    }

    public static getBaseData(): Promise<IBaseData> {
        return new Promise(async (resolve, reject) => {
            try {
                let baseData = await ECMAdapter.getStoredBaseData();
                if (!baseData) {
                    baseData = await ECMAdapter.invoke<IBaseData>('getBaseData');
                    if (baseData) {
                        await ECMAdapter.storeBaseData(baseData);
                    }
                }
                if (baseData) resolve(baseData);
                else reject(`getBaseData('${ECMAdapter.getTarget()}') retrieves null`);
            } catch (error) {
                reject(error);
            }
        });
    }

    public static async getLoginUserData(): Promise<any | undefined> {
        const userData = await AsyncStorage.getItem('userData');
        if(userData){
            return JSON.parse(userData);
        }
        return undefined;
    }

    public static async storeLoginUserData(userData : any): Promise<void> {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
    }

    public static async getSettingData(): Promise<any | undefined> {
        const settingData = await AsyncStorage.getItem('settingData');
        if(settingData){
            return JSON.parse(settingData);
        }
        return undefined;
    }

    public static async storeSettingData(settingData : any): Promise<void> {
        await AsyncStorage.setItem('settingData', JSON.stringify(settingData));
    }

    public static gotoSet(): Promise<void> {
        return ECMAdapter.invoke<void>('gotoSet');
    }

    public static exitApp(): Promise<void> {
        return ECMAdapter.invoke<void>('exitApp');
    }

    public static logout(): Promise<void> {
        return ECMAdapter.invoke<void>('logout');
    }

    public static get(key: string): Promise<any> {
        return ECMAdapter.invoke<any>('get', key);
    }

    public static set(key: string, val: string): Promise<void> {
        return ECMAdapter.invoke<void>('set', key, val);
    }

    public static backHistory(): Promise<void> {
        return ECMAdapter.invoke<void>('backHistory');
    }

    public static backNavi(): Promise<void> {
        return ECMAdapter.invoke<void>('backNavi');
    }

    public static captureAndSketch(): Promise<void> {
        return ECMAdapter.invoke<void>('captureAndSketch');
    }

    public static goChatRoom(roomId: string, roomType: 'A' | 'B'): Promise<void> {
        return ECMAdapter.invoke<void>('goChatRoom', roomId, roomType);
    }

    public static selectOrg(selectMode: 'multi' | 'single' | 'none', selectDeptMode: 'select' | 'dept' | 'none', oldSelectedList: ISelectOrgResult[]): Promise<ISelectOrgResult[] | null> {
        return ECMAdapter.invoke<ISelectOrgResult[] | null>('selectOrg', selectMode, selectDeptMode, oldSelectedList);
    }

    public static saveClipboard(value: string): Promise<void> {
        return ECMAdapter.invoke<void>('saveClipboard', value);
    }

    public static goProfile(empSeq: string, compSeq?: string, deptSeq?: string): Promise<void> {
        return ECMAdapter.invoke<void>('goProfile', empSeq, compSeq, deptSeq);
    }

    public static callAmaranthLink(type: string, data: any): Promise<void> {
        return ECMAdapter.invoke<void>('callAmaranthLink', type, data);
    }

    public static commonCmtInfo(event: any, mentionEmpList: [], pathSeq: string, moduleSeq: string, commentType: string, isShowCommentInputBar: string, isShowAttachBtn: string): Promise<void> {
        return ECMAdapter.invoke<void>('commonCmtInfo', event, mentionEmpList, pathSeq, moduleSeq, commentType, isShowCommentInputBar, isShowAttachBtn);
    }

    public static goFileViewer(pathSeq: string, files: any[]): Promise<void> {
        return ECMAdapter.invoke<void>('goFileViewer', pathSeq, files);
    }

    public static localDirPath(type: string): Promise<any> {
        return ECMAdapter.invoke<any>('localDirPath', type);
    }

    public static download(downloadInfo: any, downloadDir: string, callBack: any): Promise<void> {
        return ECMAdapter.invoke<void>('download', downloadInfo, downloadDir, callBack);
    }

    public static execFile(pathSeq: string, filePath: string): Promise<void> {
        return ECMAdapter.invoke<void>('execFile', pathSeq, filePath);
    }

    public static captureImageData(): Promise<any> {
        return ECMAdapter.invoke<any>('captureImageData');
    }
}