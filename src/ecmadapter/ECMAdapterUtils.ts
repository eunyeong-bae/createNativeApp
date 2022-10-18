import CryptoJS from 'crypto-js';
import axios from 'axios';
import QueryString from 'query-string';

export default class ECMAdapterUtils {
    public static getTransactionId = () => {
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

    public static getTimestamp = () => String(Math.floor(Date.now() / 1000));

    public static getDomain = (url: string) => {
        const match = /((?:http|https):\/\/[^/]*).*/g.exec(url);
        return match ? match[1] : url;
    }

    public static getUrl = (url: string) => {
        const match = /(?:http|https):\/\/[^/]*(.*)/g.exec(url);
        return match ? match[1] : url.substring(url.indexOf('/'),url.length);
    }

    public static isHttp = (url: string) => {
        const match = /((?:http|https):\/\/[^/]*).*/g.exec(url);
        return match != null;
    }

    public static getHeader = (data: {
        transactionId?: string,
        timestamp?: string,
        url: string,
        token: string,
        hashKey: string,
        fileUpload: boolean
    }) => {
        const transactionId = data.transactionId ? data.transactionId : ECMAdapterUtils.getTransactionId();
        const timestamp = data.timestamp ? data.timestamp : ECMAdapterUtils.getTimestamp();
        const url = ECMAdapterUtils.getUrl(data.url);
        const wehagoSign = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(`${data.token}${transactionId}${timestamp}${url}`, data.hashKey));
        const contentType = (data.fileUpload ? 'multipart/form-data' : 'application/json;charset=UTF-8');
        return {
            'Content-Type': contentType,
            'Authorization': `Bearer ${data.token}`,
            'transaction-id': transactionId,
            'wehago-sign': wehagoSign,
            'timestamp': timestamp,
        };
    }

    public static getTemporaryHeader = async (url: string) => {
        try {
            const transactionId = ECMAdapterUtils.getTransactionId();
            const domain = ECMAdapterUtils.getDomain(url);
            const path = ECMAdapterUtils.getUrl(url);
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
                'timestamp': ECMAdapterUtils.getTimestamp()
            }
        } catch (error) {
            throw error;
        }
    }

    public static toResultData = (response: { status: number, statusText: string, data: any }) => {
        if (response.status >= 200 && response.status < 300 && response.data) {
            const { resultCode, resultMsg, resultData } = response.data;
            if (resultCode === 0 || resultCode === 200 || (resultMsg || '').toLocaleLowerCase() === 'success') {
                return resultData;
            }
            else {
                throw new Error(resultMsg);
            }
        }
        else {
            throw new Error(response.statusText);
        }
    }

    public static getUrlParams = (location: { search: string }) => {
        return QueryString.parse(location.search);
    }

    public static getClassName = (...classNames: string[]) => {
        return classNames.filter(item => item).join(' ');
    }
}