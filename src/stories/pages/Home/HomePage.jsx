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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [pointResponse, notificationResponse, trendingResponse] = await Promise.all([
                    BaseAxios.get("/api/point"),
                    BaseAxios.get("/api/notify/new", { send: false }),
                    BaseAxios.get("/api/home/trending-tips")
                ]);

                setOriginPoint(pointResponse.data.point);
                setHasNewNotification(notificationResponse.data.newNotify);
                
                // Ensure trendingResponse.data is an array
                if (Array.isArray(trendingResponse.data)) {
                    setTrendingPosts(trendingResponse.data);
                } else if (trendingResponse.data && Array.isArray(trendingResponse.data.posts)) {
                    setTrendingPosts(trendingResponse.data.posts);
                } else {
                    console.error("Unexpected data structure:", trendingResponse.data);
                    setTrendingPosts([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
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
                {trendingPosts.length > 0 ? (
                    <PostCarousel posts={trendingPosts} />
                ) : (
                    <PostCarousel />
                )}
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
