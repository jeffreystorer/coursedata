import CryptoJS from 'crypto-js';
import forge from 'node-forge';
import appConfig from '@/ghin/config/index';

export const encrypt = (text) => {
  const encrypted = CryptoJS.DES.encrypt(
    text.toString(),
    appConfig.secret_key
  ).toString();
  const b64 = CryptoJS.enc.Base64.parse(encrypted);
  return b64.toString(CryptoJS.enc.Hex);
};

export const decrypt = (text) => {
  let b64 = CryptoJS.enc.Hex.parse(text);
  let bytes = b64.toString(CryptoJS.enc.Base64);
  const data = CryptoJS.DES.decrypt(bytes, appConfig.secret_key);
  return data.toString(CryptoJS.enc.Utf8);
};

export const encryptWithPublicKey = (plainText) => {
  const publicKey = forge.pki.publicKeyFromPem(appConfig.public_key);
  return forge.util.encode64(publicKey.encrypt(plainText));
};
