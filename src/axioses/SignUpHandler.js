// import BaseAxios from "./BaseAxios";
// import { AES, enc, lib } from "crypto-js";
// import forge from "node-forge";

// let privateKeyPem, publicKeyPem;

// const generateRSAKeyPair = () => {
//   if (!privateKeyPem || !publicKeyPem) {
//     const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
//     privateKeyPem = forge.pki.privateKeyToPem(privateKey);
//     publicKeyPem = forge.pki.publicKeyToPem(publicKey);
//   }
//   return { privateKeyPem, publicKeyPem };
// };

// const decrypt = (encryptedData) => {
//   const { privateKeyPem } = generateRSAKeyPair();
//   const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
//   return privateKey.decrypt(encryptedData, "RSA-OAEP");
// };

// const encryptAES = (text, key, iv) => {
//   const KEY = lib.WordArray.create(key);
//   const IV = lib.WordArray.create(iv);
//   return AES.encrypt(text, KEY, {
//     iv: IV,
//     mode: AES.mode.CBC,
//     padding: AES.pad.Pkcs7,
//   }).toString();
// };

// const createCryptoFunctions = (key, iv) => {
//   const KEY = lib.WordArray.create(key);
//   const IV = lib.WordArray.create(iv);
//   const options = { iv: IV, mode: AES.mode.CBC, padding: AES.pad.Pkcs7 };

//   return {
//     encrypt: (text) => AES.encrypt(text, KEY, options).toString(),
//     decrypt: (encryptedText) => enc.Utf8.stringify(AES.decrypt(encryptedText, KEY, options))
//   };
// };

// const sensitiveInfo = (() => {
//   let cryptoFunctions = null;
//   let sessionID = "";

//   return {
//     setKey: (iv, key, id) => {
//       cryptoFunctions = createCryptoFunctions(key, iv);
//       sessionID = cryptoFunctions.encrypt(id);
//     },
//     decrypt: (data) => cryptoFunctions?.decrypt(data),
//     getEncryptSessionID: () => sessionID,
//     encrypt: (data) => cryptoFunctions?.encrypt(data),
//   };
// })();

// const handleResponse = (response) => {
//   const iv = Buffer.from(decrypt(Buffer.from(response.data.iv)), "binary");
//   const key = Buffer.from(decrypt(Buffer.from(response.data.key.data)), "binary");
//   return { iv, key };
// };

// const LoginHandler = async (formData) => {
//   const idempotencyKey = localStorage.getItem("idempotencyKey") || (() => {
//     const newKey = forge.util.bytesToHex(forge.random.getBytesSync(16));
//     localStorage.setItem("idempotencyKey", newKey);
//     return newKey;
//   })();

//   try {
//     const { publicKeyPem } = generateRSAKeyPair();
//     const response = await BaseAxios.post("/api/login/key", { pub: publicKeyPem }, {
//       headers: { "idempotency-key": idempotencyKey },
//     });

//     const { iv, key } = handleResponse(response);
//     sensitiveInfo.setKey(iv, key);

//     formData.password = sensitiveInfo.encrypt(formData.password);
//     const result = await BaseAxios.post("/api/login", formData, {
//       headers: { "idempotency-key": idempotencyKey },
//     });

//     if (result.status === 200) {
//       localStorage.removeItem("idempotencyKey");
//       return { status: 200 };
//     }
//   } catch (e) {
//     console.error(e);
//     return { error: e.response.data.message, status: e.response.status };
//   }
// };

// const SignUpHandler = async (step, formData) => {
//   try {
//     const { publicKeyPem } = generateRSAKeyPair();
//     const baseData = { pub: publicKeyPem };
//     const stepData = {
//       1: { name: formData.name },
//       2: { id: sensitiveInfo.getEncryptSessionID(), hakbu: formData.department },
//       3: { id: sensitiveInfo.getEncryptSessionID(), hakbun: Number(formData.studentId) },
//       4: { id: sensitiveInfo.getEncryptSessionID(), email: sensitiveInfo.encrypt(formData.email) },
//       5: { id: sensitiveInfo.getEncryptSessionID(), bibun: sensitiveInfo.encrypt(formData.password) },
//       6: { id: sensitiveInfo.getEncryptSessionID(), imgLink: sensitiveInfo.encrypt(formData) },
//     };

//     const passData = { ...baseData, ...stepData[step] };
//     const response = await BaseAxios.post(`/api/register/page/${step}`, passData);

//     if (response.status !== 200) {
//       // Handle error
//       return false;
//     }
//     return true;
//   } catch (e) {
//     console.error(e);
//     // Handle error
//     return false;
//   }
// };

// export { SignUpHandler, LoginHandler, encryptAES };

import BaseAxios from "./BaseAxios";
import { AES, enc, lib } from "crypto-js";
import forge from "node-forge";

let privateKeyPem, publicKeyPem;

const generateRSAKeyPair = () => {
  if (!privateKeyPem || !publicKeyPem) {
    const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
    privateKeyPem = forge.pki.privateKeyToPem(privateKey);
    publicKeyPem = forge.pki.publicKeyToPem(publicKey);
  }
  return { privateKeyPem, publicKeyPem };
};

const decrypt = (encryptedData) => {
  const { privateKeyPem } = generateRSAKeyPair();
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  return privateKey.decrypt(encryptedData, "RSA-OAEP");
};

const encryptAES = (text, key, iv) => {
  const KEY = lib.WordArray.create(key);
  const IV = lib.WordArray.create(iv);
  return AES.encrypt(text, KEY, {
    iv: IV,
    mode: AES.mode.CBC,
    padding: AES.pad.Pkcs7,
  }).toString();
};

const createCryptoFunctions = (key, iv) => {
  const KEY = lib.WordArray.create(key);
  const IV = lib.WordArray.create(iv);
  const options = { iv: IV, mode: AES.mode.CBC, padding: AES.pad.Pkcs7 };

  return {
    encrypt: (text) => AES.encrypt(text, KEY, options).toString(),
    decrypt: (encryptedText) => enc.Utf8.stringify(AES.decrypt(encryptedText, KEY, options))
  };
};

const sensitiveInfo = (() => {
  let cryptoFunctions = null;
  let sessionID = "";

  return {
    setKey: (iv, key, id) => {
      cryptoFunctions = createCryptoFunctions(key, iv);
      sessionID = cryptoFunctions.encrypt(id);
    },
    decrypt: (data) => cryptoFunctions?.decrypt(data),
    getEncryptSessionID: () => sessionID,
    encrypt: (data) => cryptoFunctions?.encrypt(data),
  };
})();

const handleResponse = (response) => {
  const iv = Buffer.from(decrypt(Buffer.from(response.data.iv)), "binary");
  const key = Buffer.from(decrypt(Buffer.from(response.data.key.data)), "binary");
  return { iv, key };
};

const LoginHandler = async (formData) => {
  const idempotencyKey = localStorage.getItem("idempotencyKey") || (() => {
    const newKey = forge.util.bytesToHex(forge.random.getBytesSync(16));
    localStorage.setItem("idempotencyKey", newKey);
    return newKey;
  })();

  try {
    const { publicKeyPem } = generateRSAKeyPair();
    const response = await BaseAxios.post("/api/login/key", { pub: publicKeyPem }, {
      headers: { "idempotency-key": idempotencyKey },
    });

    const { iv, key } = handleResponse(response);
    sensitiveInfo.setKey(iv, key);

    formData.password = sensitiveInfo.encrypt(formData.password);
    const result = await BaseAxios.post("/api/login", formData, {
      headers: { "idempotency-key": idempotencyKey },
    });

    if (result.status === 200) {
      localStorage.removeItem("idempotencyKey");
      return { status: 200 };
    }
  } catch (e) {
    console.error(e);
    return { error: e.response.data.message, status: e.response.status };
  }
};

const SignUpHandler = async (step, formData) => {
  try {
    const { publicKeyPem } = generateRSAKeyPair();
    const baseData = { pub: publicKeyPem };
    const stepData = {
      1: { name: formData.name },
      2: { id: sensitiveInfo.getEncryptSessionID(), hakbu: formData.department },
      3: { id: sensitiveInfo.getEncryptSessionID(), hakbun: Number(formData.studentId) },
      4: { id: sensitiveInfo.getEncryptSessionID(), email: sensitiveInfo.encrypt(formData.email) },
      5: { id: sensitiveInfo.getEncryptSessionID(), bibun: sensitiveInfo.encrypt(formData.password) },
      6: { id: sensitiveInfo.getEncryptSessionID(), imgLink: sensitiveInfo.encrypt(formData) },
    };

    const passData = { ...baseData, ...stepData[step] };
    const response = await BaseAxios.post(`/api/register/page/${step}`, passData);
    
    if (response.status !== 200) {
      // Handle error
      return false;
    }
    return true;
  } catch (e) {
    console.error(e);
    // Handle error
    return false;
  }
};

export { SignUpHandler, LoginHandler, encryptAES };