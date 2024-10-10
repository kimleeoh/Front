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
import CryptoJS from "crypto-js";
import forge from "node-forge";
import { Buffer } from "buffer";

// Generate RSA key pair

const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);

// Convert keys to PEM format
const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

const decrypt = (encryptedData) => {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decryptedData = privateKey.decrypt(encryptedData, "RSA-OAEP");

    return decryptedData;
};

function encryptAES(text, key, iv) {
    const KEY = CryptoJS.lib.WordArray.create(key);
    const IV = CryptoJS.lib.WordArray.create(iv); // 16-byte IV in hex format
    //console.log(text,keyUtf8,IV);
    //console.log("key:",KEY,"iv:",IV);
    const encrypted = CryptoJS.AES.encrypt(text, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString(); // Return encrypted text
}

// Decryption function
function decryptAES(encryptedText, key, iv) {
    const KEY = CryptoJS.lib.WordArray.create(key);
    const IV = CryptoJS.lib.WordArray.create(iv); // 16-byte IV in hex format
    const decrypted = CryptoJS.AES.decrypt(encryptedText, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
}

const sensitiveInfo = (() => {
    let twoKey = "";
    let sessionID = "";
    let cipher = null;
    let decipher = null;
    return {
        isNotFilled: () => (twoKey = ""),
        setLoginKey: (iv, key) => {
            twoKey = key;
            cipher = (text) => encryptAES(text, key, iv);
            decipher = (text) => decryptAES(text, key, iv);
        },
        setKey: (iv, key, id) => {
            twoKey = key;
            cipher = (text) => encryptAES(text, key, iv);
            decipher = (text) => decryptAES(text, key, iv);
            sessionID = cipher(id);
        },
        decrypt: (data) => {
            return decipher(data);
        },
        getEncryptSessionID: () => sessionID,
        encrypt: (data) => {
            return cipher(data);
        },
    };
})();

const LoginHandler = async (formData) => {
    let idempotencyKey = localStorage.getItem("idempotencyKey");
    if (!idempotencyKey) {
        const randomBytes = forge.random.getBytesSync(16);
        idempotencyKey = forge.util.bytesToHex(randomBytes); // Generate a unique idempotency key
        localStorage.setItem("idempotencyKey", idempotencyKey);
    }
    try {
        const passData = {
            pub: publicKeyPem,
        };
        const response = await BaseAxios.post("/api/login/key", passData, {
            headers: { "idempotency-key": idempotencyKey },
        });

        const iv = Buffer.from(
            decrypt(Buffer.from(response.data.iv)),
            "binary"
        );
        const key = Buffer.from(
            decrypt(Buffer.from(response.data.key.data)),
            "binary"
        );

        sensitiveInfo.setLoginKey(iv, key);

        formData.password = sensitiveInfo.encrypt(formData.password);
        const result = await BaseAxios.post("/api/login", formData, {
            headers: { "idempotency-key": idempotencyKey },
        });

        if (result.status === 200) {
            localStorage.removeItem("idempotencyKey"); // Remove the key on successful login
            return { status: 200 };
        }
    } catch (e) {
        console.log(e);
        const error = e.response.data.message;
        const status = e.response.status;

        return { error, status };
    }
};

const SignUpHandler = async (step = 1, formData) => {
    switch (step) {
        case 1: {
            const passData = {
                name: formData.name,
                pub: publicKeyPem,
            };

            const response = await BaseAxios.post(
                "/api/register/page/1",
                passData
            );

            const iv = Buffer.from(
                decrypt(Buffer.from(response.data.iv)),
                "binary"
            );
            const key = Buffer.from(
                decrypt(Buffer.from(response.data.key.data)),
                "binary"
            );
            const id = decrypt(Buffer.from(response.data.id.data));

            sensitiveInfo.setKey(iv, key, id);
            break;
        }
        case 2: {
            const passData = {
                id: sensitiveInfo.getEncryptSessionID(),
                hakbu: formData.department,
            };

            const response = await BaseAxios.post(
                "/api/register/page/2",
                passData
            );
            //response 검사해서 오류 코드 뜨면 navigate하는 함수
            //if(response.status !== 200){}
            break;
        }
        case 3: {
            const passData = {
                id: sensitiveInfo.getEncryptSessionID(),
                hakbun: Number(formData.studentId),
            };

            const response = await BaseAxios.post(
                "/api/register/page/3",
                passData
            );
            if (response.status == 201) {
                alert("이미 가입된 학번입니다.");
                return false;
            }
            //response 검사해서 오류 코드 뜨면 navigate하는 함수
            //if(response.status !== 200){}s
            break;
        }
        case 4: {
            const passData = {
                id: sensitiveInfo.getEncryptSessionID(),
                email: sensitiveInfo.encrypt(formData.email),
            };

            const response = await BaseAxios.post(
                "/api/register/page/4",
                passData
            );
            //response 검사해서 오류 코드 뜨면 navigate하는 함수
            //if(response.status !== 200){}
            break;
        }
        case 5: {
            const passData = {
                id: sensitiveInfo.getEncryptSessionID(),
                bibun: sensitiveInfo.encrypt(formData.password),
            };

            const response = await BaseAxios.post(
                "/api/register/page/5",
                passData
            );
            //response 검사해서 오류 코드 뜨면 navigate하는 함수
            //if(response.status !== 200){}
            break;
        }
        case 6: {
            const passData = {
                id: sensitiveInfo.getEncryptSessionID(),
                imgLink: sensitiveInfo.encrypt(formData),
            };
            const response = await BaseAxios.post(
                "/api/register/page/6",
                passData
            );
            //response 검사해서 오류 코드 뜨면 navigate하는 함수
            //if(response.status !== 200){}
        }
    }
    return true;
};

export { SignUpHandler, LoginHandler, encryptAES };