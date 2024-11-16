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
    //const [answerablePosts, setAnswerablePosts] = useState([]);
    //const [trendingTips, settrendingTips] = useState([]);
    //const [trendingQna, settrendingQna] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalNotifyContent, setModalNotifyContent] = useState(null);
    const [totalModalNotifyContent, setTotalModalNotifyContent] = useState([]);
    const [currentModalIndex, setCurrentModalIndex] = useState(0);
    const modalNotifyRef = useRef();

    const answerablePosts = [
        {
            title: "내년에 들을까 하는데 추천하시나요",
            content: "제곧내",
            time: "2024-10-31T03:15:17.872+00:00", // Example ISO timestamp
            views: 5,
        },
        {
            title: "모델링 관련 질문 드립니다.",
            content: `HDRI 파일을 다운 받았는데 왜 안나오는지 모르겠어요..!
                      적용하는 방법 알려주시면 감사하겠습니다ㅜㅜ`,
            time: "2024-11-04T03:29:46.538+00:00",
            views: 14,
        },
        {
            title: "삼디 왜 이렇게 되는거죠.",
            content: `이거 왜 투명도 설정 안되는거죠..??? 이해가 안가는군요`,
            time: "2024-11-05T11:38:15.260+00:00",
            views: 50,
        },
    ];

    const trendingTips = [
        {
            title: "컴시개 필기본 (A+ 맞음)",
            content: `컴시개 필기 필요한 사람`,
            time: "2024-11-07T14:35:11.915+00:00", // Example ISO timestamp
            views: 6,
        },
        {
            title: "삼디 들으려는 친구들은 보아라",
            content: `삼디 뭐 공부할지 고민하는 사람`,
            time: "2024-11-09T11:52:44.406+00:00", // Example ISO timestamp
            views: 5,
        },
    ]

    const trendingQna = [
        {
            title: "삼디 왜 이렇게 되는거죠",
            content: `이거 왜 투명도 설정 안되는거죠..??? 이해가 안가는군요`,
            time: "2024-11-05T11:38:15.260+00:00", // Example ISO timestamp
            views: 50,
        },
        {
            title: "모델링 관련 질문 드립니다",
            content: `HDRI 파일을 다운 받았는데 왜 안나오는지 모르겠어요..!
적용하는 방법 알려주시면 감사하겠습니다ㅜㅜ`,
            time: "2024-11-04T03:29:46.538+00:00", // Example ISO timestamp
            views: 14,
        },
        {
            title: "라이팅 관련 질문 드려요!",
            content: `HDRI 파일 다운을 했는데 적용이 안돼요..
하는 방법 알려주세요!`,
            time: "2024-11-04T03:31:22.459+00:00", // Example ISO timestamp
            views: 20,
        },
        {
            title: "자구실..",
            content: `수업을 좀 빼먹었는데 지금 나가고 있는 진도가 어디인가요..? 작게 사례하겠습니다`,
            time: "2024-11-09T15:35:40.366+00:00", // Example ISO timestamp
            views: 24,
        },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [
                    pointResponse,
                    notificationResponse,
                    //trendingResponse,
                    answerablePostsResponse,
                    modalResponse,
                ] = await Promise.all([
                    BaseAxios.get("/api/h/point"),
                    BaseAxios.get("/api/h/notify/new", { send: false }),
                    //BaseAxios.post("/api/h/home/trending"),
                    BaseAxios.post("/api/h/home/answer-possible"),
                    BaseAxios.get("/api/h/modal-notify"),
                ]);

                // const { trendingTipsResponse, trendingQnaResponse } =
                //     trendingResponse.data;

                setOriginPoint(pointResponse.data.point);
                setHasNewNotification(notificationResponse.data.newNotify);

                // if (Array.isArray(answerablePostsResponse.data)) {
                //     setAnswerablePosts(answerablePostsResponse.data);
                // } else {
                //     console.error(
                //         "Unexpected data structure:",
                //         answerablePostsResponse.data
                //     );
                //     setAnswerablePosts([]);
                // }

                // Ensure trendingTipsResponse.data is an array
                // if (Array.isArray(trendingTipsResponse)) {
                //     settrendingTips(trendingTipsResponse);
                // } else if (
                //     trendingTipsResponse &&
                //     Array.isArray(trendingTipsResponse.posts)
                // ) {
                //     settrendingTips(trendingTipsResponse.posts);
                // } else {
                //     console.error(
                //         "Unexpected data structure:",
                //         trendingTipsResponse
                //     );
                //     settrendingTips([]);
                // }

                // Ensure trendingQnaResponse.data is an array
                // if (Array.isArray(trendingQnaResponse)) {
                //     settrendingQna(trendingQnaResponse);
                // } else if (
                //     trendingQnaResponse &&
                //     Array.isArray(trendingQnaResponse.posts)
                // ) {
                //     settrendingQna(trendingQnaResponse.posts);
                // } else {
                //     console.error(
                //         "Unexpected data structure:",
                //         trendingQnaResponse
                //     );
                //     settrendingQna([]);
                // }

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
            <TopLayout>
                <BlurBackground />
                <Head maxWidth={windowSize > 430 ? 400 : windowSize - 40}>
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
                </Head>
            </TopLayout>
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
const TopLayout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    z-index: 1000;
    padding: 10px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
`;

const BlurBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(240, 242, 244, 0.3);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    z-index: -1;
`;

const Head = styled.div`
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)}px;
    box-sizing: border-box;


    box-sizing: border-box;
    width: 100%;
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

    // Logo container
    > div:first-child {
        min-width: 120px; // Logo의 최소 너비 설정
        margin-bottom: 10px;
        img {
            width: 100%;
            height: auto;
            min-width: 120px; // Logo 이미지의 최소 너비 설정
        }
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
    min-width: 40px; // 최소 너비 설정
    width: 40px;
    height: 40px;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;

    img {
        width: 20px; // 고정 너비 설정
        height: 23px; // 고정 높이 설정
        object-fit: contain;
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
