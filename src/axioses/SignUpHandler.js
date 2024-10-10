import BaseAxios from "./BaseAxios";
import CryptoJS from "crypto-js";
import forge from "node-forge";

// RSA 키 생성 (클라이언트 측에서 생성)
const generateRSAKeyPair = () => {
  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair(2048);
  const privateKeyPem = forge.pki.privateKeyToPem(privateKey);
  const publicKeyPem = forge.pki.publicKeyToPem(publicKey);
  return { privateKeyPem, publicKeyPem };
};

// RSA 복호화
const decryptRSA = (encryptedData, privateKeyPem) => {
  const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
  return privateKey.decrypt(encryptedData, "RSA-OAEP");
};

// AES 암호화
const encryptAES = (text, key, iv) => {
  const KEY = CryptoJS.enc.Hex.parse(key);
  const IV = CryptoJS.enc.Hex.parse(iv);
  return CryptoJS.AES.encrypt(text, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

// AES 복호화
const decryptAES = (encryptedText, key, iv) => {
  const KEY = CryptoJS.enc.Hex.parse(key);
  const IV = CryptoJS.enc.Hex.parse(iv);
  const decrypted = CryptoJS.AES.decrypt(encryptedText, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

const sensitiveInfo = (() => {
  let symmetricKey = null;
  let iv = null;
  let sessionID = null;

  return {
    setKey: (newKey, newIV, id) => {
      symmetricKey = newKey;
      iv = newIV;
      sessionID = id ? encryptAES(id, newKey, newIV) : null;
    },
    encrypt: (data) => encryptAES(data, symmetricKey, iv),
    decrypt: (data) => decryptAES(data, symmetricKey, iv),
    getEncryptSessionID: () => sessionID,
  };
})();

const LoginHandler = async (formData) => {
  const idempotencyKey = localStorage.getItem("idempotencyKey") || (() => {
    const newKey = forge.util.bytesToHex(forge.random.getBytesSync(16));
    localStorage.setItem("idempotencyKey", newKey);
    return newKey;
  })();

  try {
    // Step 1: Request symmetric key
    const { publicKeyPem, privateKeyPem } = generateRSAKeyPair();
    const keyResponse = await BaseAxios.post("/api/login/key", { pub: publicKeyPem }, {
      headers: { "idempotency-key": idempotencyKey },
    });

    // Step 2: Decrypt symmetric key and IV
    const decryptedIV = decryptRSA(forge.util.decode64(keyResponse.data.iv), privateKeyPem);
    const decryptedKey = decryptRSA(forge.util.decode64(keyResponse.data.key), privateKeyPem);

    sensitiveInfo.setKey(
      forge.util.bytesToHex(decryptedKey),
      forge.util.bytesToHex(decryptedIV)
    );

    // Step 3: Encrypt password and send login request
    const encryptedPassword = sensitiveInfo.encrypt(formData.password);
    const loginResponse = await BaseAxios.post("/api/login", {
      username: formData.username,
      password: encryptedPassword
    }, {
      headers: { "idempotency-key": idempotencyKey },
    });

    if (loginResponse.status === 200) {
      localStorage.removeItem("idempotencyKey");
      // Handle successful login (e.g., store token, redirect)
      return { status: 200, message: "Login successful" };
    }
  } catch (e) {
    console.error(e);
    return { 
      error: e.response?.data?.message || "An error occurred during login", 
      status: e.response?.status || 500 
    };
  }
};

const LogoutHandler = async () => {
  try {
    const response = await BaseAxios.delete("/api/logout");
    if (response.status === 200) {
      // Clear any stored authentication data
      // For example: localStorage.removeItem("authToken");
      return { status: 200, message: "Logout successful" };
    }
  } catch (e) {
    console.error(e);
    return { 
      error: e.response?.data?.message || "An error occurred during logout", 
      status: e.response?.status || 500 
    };
  }
};

const SignUpHandler = async (step, formData) => {
  try {
    let response;
    switch (step) {
      case 1: {
        const { publicKeyPem, privateKeyPem } = generateRSAKeyPair();
        response = await BaseAxios.post("/api/register/page/1", {
          name: formData.name,
          pub: publicKeyPem
        });
        const decryptedIV = decryptRSA(forge.util.decode64(response.data.iv), privateKeyPem);
        const decryptedKey = decryptRSA(forge.util.decode64(response.data.key.data), privateKeyPem);
        const decryptedId = decryptRSA(forge.util.decode64(response.data.id.data), privateKeyPem);
        sensitiveInfo.setKey(
          forge.util.bytesToHex(decryptedKey),
          forge.util.bytesToHex(decryptedIV),
          decryptedId
        );
        break;
      }
      case 2:
        response = await BaseAxios.post("/api/register/page/2", {
          id: sensitiveInfo.getEncryptSessionID(),
          hakbu: formData.department
        });
        break;
      case 3:
        response = await BaseAxios.post("/api/register/page/3", {
          id: sensitiveInfo.getEncryptSessionID(),
          hakbun: Number(formData.studentId)
        });
        break;
      case 4:
        response = await BaseAxios.post("/api/register/page/4", {
          id: sensitiveInfo.getEncryptSessionID(),
          email: sensitiveInfo.encrypt(formData.email)
        });
        break;
      case 5:
        response = await BaseAxios.post("/api/register/page/5", {
          id: sensitiveInfo.getEncryptSessionID(),
          bibun: sensitiveInfo.encrypt(formData.password)
        });
        break;
      case 6:
        response = await BaseAxios.post("/api/register/page/6", {
          id: sensitiveInfo.getEncryptSessionID(),
          imgLink: sensitiveInfo.encrypt(formData)
        });
        break;
    }

    if (response.status === 200) {
      return true;
    } else {
      console.error("Unexpected response:", response);
      return false;
    }
  } catch (e) {
    console.error("Error in SignUpHandler:", e);
    return false;
  }
};

export { LoginHandler, LogoutHandler, SignUpHandler, encryptAES };