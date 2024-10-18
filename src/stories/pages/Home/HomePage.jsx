import React, { Suspense, lazy, useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../OnBoarding/Logo";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import PostCarousel from "../../components/Common/PostCarousel";

const NavBar = lazy(() => import("../../components/NavBar"));
const FixedBottomContainer = lazy(
    () => import("../../components/FixedBottomContainer")
);

const HomePage = () => {
    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();
    const maxWidth = useMemo(
        () => (windowSize > 430 ? "400px" : windowSize),
        [windowSize]
    );

    const [originPoint, setOriginPoint] = useState(null);
    const [hasNewNotification, setHasNewNotification] = useState(false);
    const [trendingPosts, setTrendingPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pointResponse, notificationResponse, trendingResponse] =
                    await Promise.all([
                        BaseAxios.get("/api/point"),
                        BaseAxios.get("/api/notify/new", { send: false }),
                        BaseAxios.get("/api/mypage/trending"),
                    ]);

                setOriginPoint(pointResponse.data.point);
                setHasNewNotification(notificationResponse.data.newNotify);
                setTrendingPosts(trendingResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (originPoint === null) {
        return <div>Loading...</div>;
    }

    return (
        <Wrapper>
            <Header maxWidth={maxWidth}>
                <div style={{ marginBottom: "10px", width: "100%" }}>
                    <Logo theme="darkgray" />
                </div>
                <PointButton onClick={() => navigate("/points")}>
                    내 포인트: {originPoint}P
                </PointButton>
                <NotificationButton onClick={() => navigate("/notification")}>
                    <img
                        src="/Icons/Bellnactive.svg"
                        alt="Notification"
                        loading="lazy"
                    />
                    {hasNewNotification && <BlueDot />}
                </NotificationButton>
            </Header>
            <Content maxWidth={maxWidth}>
                <PostCarousel posts={trendingPosts} />
            </Content>
            <Suspense fallback={<div>Loading...</div>}>
                <FixedBottomContainer>
                    <NavBar initialState="/home" />
                </FixedBottomContainer>
            </Suspense>
        </Wrapper>
    );
};

export default HomePage;

// ... (스타일 컴포넌트들은 이전과 동일하게 유지)

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f4;
    min-height: 100vh;
    position: relative;
    padding-top: 88px;
    padding-bottom: 100px;
    box-sizing: border-box;
    width: 100%;
`;

const Header = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => props.maxWidth};
    height: 88px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background: rgba(240, 242, 244, 0.3);
    backdrop-filter: blur(5px);
    position: fixed;
    z-index: 1000;
    top: 0;
`;

const PointButton = styled.button`
    display: flex;
    width: 110px;
    height: 40px;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 11px;
    color: #434b60;
    font-family: Inter;
    font-size: 12px;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.95);
        background: rgba(0, 0, 0, 0.1);
    }
`;

const NotificationButton = styled.button`
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    position: relative;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
        loading: lazy;
    }

    &:active {
        transform: scale(0.95);
        background: rgba(0, 0, 0, 0.1);
    }
`;

const BlueDot = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #007bff;
    border-radius: 50%;
`;

const Content = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => props.maxWidth};
    padding: 20px;
    text-align: center;
`;
