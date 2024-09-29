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

    const iv = Buffer.from(decrypt(Buffer.from(response.data.iv)), "binary");
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

      const response = await BaseAxios.post("/api/register/page/1", passData);

      const iv = Buffer.from(decrypt(Buffer.from(response.data.iv)), "binary");
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

      const response = await BaseAxios.post("/api/register/page/2", passData);
      //response 검사해서 오류 코드 뜨면 navigate하는 함수
      //if(response.status !== 200){}
      break;
    }
    case 3: {
      const passData = {
        id: sensitiveInfo.getEncryptSessionID(),
        hakbun: Number(formData.studentId),
      };

      const response = await BaseAxios.post("/api/register/page/3", passData);
      //response 검사해서 오류 코드 뜨면 navigate하는 함수
      //if(response.status !== 200){}
      break;
    }
    case 4: {
      const passData = {
        id: sensitiveInfo.getEncryptSessionID(),
        email: sensitiveInfo.encrypt(formData.email),
      };

      const response = await BaseAxios.post("/api/register/page/4", passData);
      //response 검사해서 오류 코드 뜨면 navigate하는 함수
      //if(response.status !== 200){}
      break;
    }
    case 5: {
      const passData = {
        id: sensitiveInfo.getEncryptSessionID(),
        bibun: sensitiveInfo.encrypt(formData.password),
      };

      const response = await BaseAxios.post("/api/register/page/5", passData);
      //response 검사해서 오류 코드 뜨면 navigate하는 함수
      //if(response.status !== 200){}
      break;
    }
  }
};

export { SignUpHandler, LoginHandler };
