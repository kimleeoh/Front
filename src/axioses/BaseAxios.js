// BaseAxios.js
import axios from "axios";

const BaseAxios = axios.create({
    baseURL: "http://localhost:4501",
    withCredentials: true,
});

// 응답 인터셉터 추가
BaseAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            // 토큰 갱신 로직
            // 갱신 성공 시 원래 요청 재시도
            // 실패 시 로그아웃 처리
        }
        return Promise.reject(error);
    }
);

export default BaseAxios;
