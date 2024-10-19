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
        // if (error.response.status === 401) {
        //     // 토큰 갱신 로직
        //     // 갱신 성공 시 원래 요청 재시도
        //     // 실패 시 로그아웃 처리
        // }
        // return Promise.reject(error);
        if (error.response && error.response.status === 401) {
            alert("로그인 세션 정보가 만료되었습니다. 다시 로그인해주세요!");
            window.location.href = "/login";
        } else if (error.response && error.response.status === 500) {
            alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
        return Promise.reject(error);
    }
);

export default BaseAxios;
