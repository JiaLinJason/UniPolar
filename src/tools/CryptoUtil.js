// import CryptoJS from 'crypto-js';
import AES from 'crypto-js/aes';
import DES from 'crypto-js/tripledes';
import Pkcs7 from 'crypto-js/pad-pkcs7';
import Utf8 from 'crypto-js/enc-utf8';
import ECB from 'crypto-js/mode-ecb';
import MD5 from 'crypto-js/md5';
import Base64 from 'crypto-js/enc-base64';
import {JSEncrypt} from 'jsencrypt'

const KEY = '0880076B18D7EE81';//key
const RSA_PUBLIC_KEY = '-----BEGIN PUBLIC KEY-----\n' +
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5Loj+IiYz0PV8DYHwcH08mtQV\n' +
    'wACdvqUlkSfOOalpMKfcHEX6lUdNV0f9RB/KNn5mcACtDr0p/qEQ51YgCpgMAAPW\n' +
    'GhiR/TJJnJ/hI/9j0e2Mp4LjAJzZLw30OidfUBbIYhELgu6i+PmgUiwE+EOb5KYH\n' +
    '4DEJs54zjQ9X+Z+RkQIDAQAB\n' +
    '-----END PUBLIC KEY-----\n';
const RSA_PRIVATE_KEY = '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIICXAIBAAKBgQC5Loj+IiYz0PV8DYHwcH08mtQVwACdvqUlkSfOOalpMKfcHEX6\n' +
    'lUdNV0f9RB/KNn5mcACtDr0p/qEQ51YgCpgMAAPWGhiR/TJJnJ/hI/9j0e2Mp4Lj\n' +
    'AJzZLw30OidfUBbIYhELgu6i+PmgUiwE+EOb5KYH4DEJs54zjQ9X+Z+RkQIDAQAB\n' +
    'AoGAAaZwghM70+pgxaI5LjNSal/W0/rKBp3USuloOWY6JD3SwRtfZERARmgotBEP\n' +
    'V3X02mTVHLWs6drjBIuLMO3nPPBBs1hj1tv/f8fb2HFOZoExXYYF5VFEtWkjK0Cl\n' +
    'juqXzJB2FC2o9BwicsQZU9K8TQfc5GXa+BFRS5zWAXL2aiECQQDZ0Z3Px0Ckaki3\n' +
    '3v8dALdqSlTNL8qhAuFOa1PQqhdl6jdmNHvFWGECvOVbdLPyoezxEyoTktOnwywQ\n' +
    'axl+iDvvAkEA2aRd8wD9QPPvpAplB4CCgD4VDW2viMukqEWGMQY9U/FRvxYk5Wtm\n' +
    'Topc6maxbshcd/22BQFQONjeOU1TGPWKfwJAFsX3vfWTKJ2EJNVHzvx4MMC8xQcu\n' +
    'JE9sxwoppTNjZuBqEmGCX0uyONsPD9TPy5pqb3oVeB5tyqh5Pu4zqCsOOQJADFLp\n' +
    'WvxAWvA1LqXECMO3IAnj6Um/udBGN50QNzByQpGUnmxjlHYbafEdx8we2fYQfl7o\n' +
    'cqobX8yv8LC3Nt+YgwJBAJMKHXkqcflcjMCrEV0poz/FkB6/Ce9K0yF4fRr+2aDr\n' +
    'JCynsst0l2JYIvSw2qoqg72pLmLGj3yYP47Kc/QPhP4=\n' +
    '-----END RSA PRIVATE KEY-----\n';

function getAesString(data, key, iv) {//加密
    let pKey = Utf8.parse(key);
    let pIv = Utf8.parse(iv);
    let encrypted = DES.encrypt(data, pKey,
        {
            iv: pIv,
            mode: ECB,
            padding: Pkcs7
        });
    return encrypted.toString();    //返回的是base64格式的密文
}

function getDAesString(encrypted, key, iv) {//解密
    let pKey = Utf8.parse(key);
    let pIv = Utf8.parse(iv);
    let decrypted = DES.decrypt(encrypted, pKey,
        {
            iv: pIv,
            mode: ECB,
            padding: Pkcs7
        });
    return decrypted.toString(Utf8);
}

function aesEncrypt(data) { //加密
    let iv = 'CB3EC842D7C69578';//  矢量
    let key = KEY;
    let encrypted = getAesString(data, key, iv); //密文
    return encrypted;
}

function aesDecrypt(data) {//解密
    let iv = 'CB3EC842D7C69578';//  矢量
    let key = KEY;
    let decryptedStr = getDAesString(data, key, iv);
    return decryptedStr;
}

function aesEncryptMine(data, key) {
    return getAesString(data, key, key);
}

function aesDecryptMine(data, key) {
    return getDAesString(data, key, key);
}

function md5(str) {
    return MD5(str).toString();
}

//通讯解密
function base64ToStr(str) {
    // str = Base64.parse(str);
    // str.toString(Utf8);
    // return str;
    return base2str.decode(str)

}

//通讯加密
function strToBase64(str) {
    str = Utf8.parse(str);
    return Base64.stringify(str)
}

let base2str = {
    encode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    },
    decode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
};
// rsa
function rsaEncrypt(str){
    let jsEncrypt = new JSEncrypt();
    //设置公钥
    jsEncrypt.setPublicKey(RSA_PUBLIC_KEY);
    return jsEncrypt.encrypt(str);
}

function rsaDecrypt(str){
    let jsEncrypt = new JSEncrypt();
    jsEncrypt.setPrivateKey(RSA_PRIVATE_KEY);
    return jsEncrypt.decrypt(str);
}

export default {
    aesEncrypt,
    aesDecrypt,
    md5,
    aesEncryptMine,
    aesDecryptMine,
    base64ToStr,
    strToBase64,
    rsaEncrypt,
    rsaDecrypt
}
