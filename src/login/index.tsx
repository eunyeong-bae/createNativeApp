import React from 'react';
import { Text, SafeAreaView, TextInput, View, Button} from 'react-native';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { AppScreens, AppStackParamList} from '../navigation';
import CommonUtil from '../utils/CommonUtil';
import {protocolList} from '../ecmadapter/ProtocalList'


// Props interface 정의
interface Props {
    navigation: StackNavigationProp< AppStackParamList, 'Login'>;
    // greetings?: string;
    // initName: string;
}

// State interface 정의
interface State {
    loginId : any,
    passwd : string,
    //   name: string;
    //   count: number;
    // 	error: Boolean;
}

// 클래스 컴포넌트
class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            loginId : '',
            passwd : '',
        };
    }

    // componentDidMount(){
    //     CommonUtil._storeData( 'userToken', JSON.stringify({ id : 'jssongjk637', passwd : 'qwer1234'}));
    // }

    getTransactionId = () => {
        const makeUUID = () => {
            return (((1 + Math.random()) * 0x10000) | 0)
                .toString(16)
                .substring(1);
        }
        return (
            makeUUID() +
            makeUUID() +
            makeUUID() +
            makeUUID() +
            makeUUID() +
            makeUUID() +
            makeUUID() +
            makeUUID()
        );
    }

    getTimestamp = () => String(Math.floor(Date.now() / 1000));

    getDomain = (url : string) => {
        const match = /((?:http|https):\/\/[^/]*).*/g.exec(url);
        return match ? match[1] : url;
    }

    getUrl = ( url : string) => {
        const match = /(?:http|https):\/\/[^/]*(.*)/g.exec(url);
        return match ? match[1] : url;
    }

    getTemporaryHeader = async ( url : string) => {
        try {
            const transactionId = this.getTransactionId();
            const domain = this.getDomain(url);
            const path = this.getUrl(url);
            const response = await axios.get(`${domain}/get_token/?url=${path}`, {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'transaction-id': transactionId
                }
            });
            const { token, cur_date } = response.data;
            return {
                'transaction-id': transactionId,
                'signature': CryptoJS.enc.Base64.stringify(CryptoJS.SHA256(`${token}${cur_date}${transactionId}${path}`)),
                'timestamp': this.getTimestamp()
            }
        } catch (error) {
            throw error;
        }
    }

    toResultData = ( response : any) => {
        if (response.status >= 200 && response.status < 300 && response.data) {
            const { resultCode, resultMsg, resultData } = response.data;
            if (resultCode === 0 || resultCode === 200 || (resultMsg || '').toLocaleLowerCase() === 'success') {
                return resultData;
            } else {
                throw new Error(resultMsg);
            }
        }
        else {
            throw new Error(response.statusText);
        }
    }

    onClickSubmit = async() => {
        const { loginId, passwd} = this.state;

        const domain = 'https://dev.amaranth10.co.kr';
        const LoginApiPath = '/proxymgw/proxymgw17A08';
        const header = await this.getTemporaryHeader(`${domain}${LoginApiPath}`);
        
        let loginResult : any = null;//await CommonUtil._retrieveData( 'userToken');//null;
        let isSuccess = true;

        await axios.post(`${domain}${LoginApiPath}`, {
            body: {
                appType: '11',
                appVer: '246',
                contentSynctime: '0',
                deviceId: '00000000-7614-b117-0033-c5870033c587',
                deviceRegId: '',
                langCode: 'kr',
                loginId: loginId,
                mobileId: 'klagoDev',
                model: 'SM-N976N',
                osType: '02',
                osVer: '10',
                passwd: passwd,
                pushRegId: '',
                token: '',
                kNum: undefined
            },
            header: {
                appType: '11',
                loginId: loginId,
                mobileId: 'klagoDev',
                osType: '02',
                pId: 'P281',
                tId: header['transaction-id']
            }
        }, {
            headers: header
        }).then((res) => {
            if ( res.status >= 200 && res.status < 300 && res.data) {
                const { resultCode, resultMsg, resultData } = res.data;
                if (resultCode === 0 || resultCode === 200 || (resultMsg || '').toLocaleLowerCase() === 'success') {
                    loginResult = resultData;
                }
                else {
                    isSuccess = false;
                    loginResult = resultMsg;
                }
            }
        }).catch((e) => {
            isSuccess = false;
            loginResult = e;
        });

        // AsyncStorage.setItem('userData', JSON.stringify( loginResult));
        // CommonUtil._storeData( 'userToken', JSON.stringify( loginResult));
        if( isSuccess && loginResult != null){
            const baseData = {
                result: loginResult,
                protocolList : protocolList,
                companyInfo: {
                    bizSeq: loginResult.bizSeq,
                    compSeq: loginResult.compSeq,
                    deptSeq: loginResult.deptSeq,
                },
                header: {
                    appType: '11',
                    loginId: loginId,
                    mobileId: 'klagoDev',
                    osType: '02'
                }
            }

            console.log( loginResult);
            await CommonUtil._storeData( 'baseData', JSON.stringify( baseData));
            await AsyncStorage.setItem('userToken', JSON.stringify( loginResult)).then((value) =>{
                this.props.navigation.navigate( AppScreens.Main); //Home
            },);
        }
    }

    // 화면 렌더링 함수
    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>ID</Text>
                    <TextInput autoCapitalize={'none'} onChangeText={( loginId) => this.setState({ loginId : loginId})}/>
                    <Text>PassWord</Text>
                    <TextInput secureTextEntry={true} onChangeText={( passwd) => this.setState({ passwd : passwd})}/>
                </View>
                <View>
                    <Button onPress={this.onClickSubmit} title={'확인'}/>
                </View>
            </SafeAreaView>
        );
    }
}

export default Login;