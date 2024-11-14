import React, {
    Suspense,
    lazy,
    useMemo,
    useEffect,
    useState,
    useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../OnBoarding/Logo";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import PostCarousel from "../../components/Common/PostCarousel";
import Loading from "../Loading";
import Modal from "../../components/Common/Modal";
import Button from "../../components/Button";

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
    const [answerablePosts, setAnswerablePosts] = useState([]);
    const [trendingTips, settrendingTips] = useState([]);
    const [trendingQna, settrendingQna] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalNotifyContent, setModalNotifyContent] = useState(null);
    const [totalModalNotifyContent, setTotalModalNotifyContent] = useState([]);
    const [currentModalIndex, setCurrentModalIndex] = useState(0);
    const modalNotifyRef = useRef();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [
                    pointResponse,
                    notificationResponse,
                    trendingResponse,
                    answerablePostsResponse,
                    modalResponse,
                ] = await Promise.all([
                    BaseAxios.get("/api/h/point"),
                    BaseAxios.get("/api/h/notify/new", { send: false }),
                    BaseAxios.post("/api/h/home/trending"),
                    BaseAxios.post("/api/h/home/answer-possible"),
                    BaseAxios.get("/api/h/modal-notify"),
                ]);

                const { trendingTipsResponse, trendingQnaResponse } =
                    trendingResponse.data;

                setOriginPoint(pointResponse.data.point);
                setHasNewNotification(notificationResponse.data.newNotify);

                if (Array.isArray(answerablePostsResponse.data)) {
                    setAnswerablePosts(answerablePostsResponse.data);
                } else {
                    console.error(
                        "Unexpected data structure:",
                        answerablePostsResponse.data
                    );
                    setAnswerablePosts([]);
                }

                // Ensure trendingTipsResponse.data is an array
                if (Array.isArray(trendingTipsResponse)) {
                    settrendingTips(trendingTipsResponse);
                } else if (
                    trendingTipsResponse &&
                    Array.isArray(trendingTipsResponse.posts)
                ) {
                    settrendingTips(trendingTipsResponse.posts);
                } else {
                    console.error(
                        "Unexpected data structure:",
                        trendingTipsResponse
                    );
                    settrendingTips([]);
                }

                // Ensure trendingQnaResponse.data is an array
                if (Array.isArray(trendingQnaResponse)) {
                    settrendingQna(trendingQnaResponse);
                } else if (
                    trendingQnaResponse &&
                    Array.isArray(trendingQnaResponse.posts)
                ) {
                    settrendingQna(trendingQnaResponse.posts);
                } else {
                    console.error(
                        "Unexpected data structure:",
                        trendingQnaResponse
                    );
                    settrendingQna([]);
                }

                const { data } = modalResponse;
                if (data && Array.isArray(data) && data[0] !== undefined) {
                    setTotalModalNotifyContent(data);
                    setCurrentModalIndex(0);

                    setModalNotifyContent(data[0]);
                    //console.log(modalNotifyContent);
                    modalNotifyRef.current.open();
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

    const closeHandler = () => {
        modalNotifyRef.current.close();

        if (totalModalNotifyContent.length > 1) {
            if (currentModalIndex < totalModalNotifyContent.length) {
                const newIndex = currentModalIndex + 1;
                setCurrentModalIndex(newIndex);
                setModalNotifyContent(totalModalNotifyContent[newIndex]);
                modalNotifyRef.current.open();
            } else {
                setCurrentModalIndex(0);
            }
        }
    };

    if (isLoading) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Wrapper>
            <Header maxWidth={maxWidth}>
                <HeaderBackground />
                <div style={{ marginBottom: "10px", width: "100%" }}>
                    <Logo theme="darkgray" />
                </div>
                <PointButton onClick={() => navigate("/points")}>
                    내 포인트: {originPoint}P
                </PointButton>
                <NotificationButton onClick={() => navigate("/notification")}>
                    <img
                        src={"/Icons/Bellnactive.svg"}
                        alt="Notification"
                        loading="lazy"
                    />
                    {hasNewNotification && <BlueDot />}
                </NotificationButton>
            </Header>
            <Content maxWidth={maxWidth}>
                <Title>내가 답할 수 있는 게시물</Title>
                {answerablePosts.length > 0 ? (
                    <PostCarousel posts={answerablePosts} />
                ) : (
                    <PostCarousel />
                )}

                <Title>내 게시판에서 현재 인기있는 Tips</Title>
                {trendingTips.length > 0 ? (
                    <PostCarousel posts={trendingTips} />
                ) : (
                    <PostCarousel />
                )}

                <Title>내 게시판에서 현재 인기있는 Q&A</Title>
                {trendingQna.length > 0 ? (
                    <PostCarousel posts={trendingQna} />
                ) : (
                    <PostCarousel />
                )}
            </Content>
            <Modal ref={modalNotifyRef} width="300px">
                <div dangerouslySetInnerHTML={{ __html: modalNotifyContent }} />
                <Button
                    onClick={closeHandler}
                    label={"확인"}
                    backgroundColor={"#FF3C3C"}
                    hoverBackgroundColor={"red"}
                    width={"130px"}
                />
            </Modal>
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
    height: 80px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: fixed;
    z-index: 1000;
    top: 0;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
`;

const HeaderBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(240, 242, 244, 0.3);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    z-index: -1;

    @supports not (backdrop-filter: blur(8px)) {
        background: rgba(240, 242, 244, 0.95);
    }
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
    background: transparent;

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
    text-align: center;
`;

const Title = styled.div`
    display: flex;
    width: 300px;
    height: 38px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #434b60;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: left;
    margin-left: 30px;
    white-space: nowrap;
`;
