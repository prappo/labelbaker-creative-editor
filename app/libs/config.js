import CryptoJS from 'crypto-js'

export default function (data) {
    var DataEncrypt = data;
    var DataKey = CryptoJS.enc.Utf8.parse("01234567890123456789012345678901");
    var DataVector = CryptoJS.enc.Utf8.parse("1234567890123412");
    var decrypted = CryptoJS.AES.decrypt(DataEncrypt, DataKey, { iv: DataVector });
    decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
    return JSON.parse( decrypted );
}