import CryptoJS from 'crypto-js';
import LZString from 'lz-string';

const SECRET_KEY = process.env.REACT_APP_SHARE_KEY || 'ai-roadmap-fallback-secret';

// To make Base64 URL safe
const toBase64Url = (base64Str) => {
  return base64Str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (base64UrlStr) => {
  let base64 = base64UrlStr.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return base64;
};

export const encodeProfileData = (profileData) => {
  try {
    const jsonString = JSON.stringify(profileData);
    const compressed = LZString.compressToUTF16(jsonString);
    const encrypted = CryptoJS.AES.encrypt(compressed, SECRET_KEY).toString();
    return toBase64Url(encrypted);
  } catch (error) {
    console.error('Error encoding profile:', error);
    return null;
  }
};

export const decodeProfileData = (encodedCode) => {
  try {
    const base64Str = fromBase64Url(encodedCode);
    const decryptedBytes = CryptoJS.AES.decrypt(base64Str, SECRET_KEY);
    const compressed = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (!compressed) return null;
    const jsonString = LZString.decompressFromUTF16(compressed);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding profile:', error);
    return null;
  }
};
