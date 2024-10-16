import React, { createContext, useState, useEffect, useCallback } from "react";
import BaseAxios from "../../axioses/BaseAxios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUserData = useCallback(async () => {
        console.log("fetchUserData called"); // 이 로그 추가
        setIsLoading(true);
        setError(null);
        try {
            const response = await BaseAxios.get("/api/mypage/profile");
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setError(error);
            if (error.response && error.response.status === 401) {
                //에러시 로그아웃 처리
                try {
                    await BaseAxios.delete("/api/logout");
                    setUserData(null); // 로그아웃 시 사용자 데이터 초기화
                } catch (e) {
                    console.log(e);
                }
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    const value = {
        userData,
        isLoading,
        error,
        fetchUserData,
        refreshUserData: fetchUserData,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};

export { UserContext };
export default UserProvider;
