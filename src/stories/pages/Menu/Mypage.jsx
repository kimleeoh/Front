import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TabNavigation from "../../components/Common/TabNavigation";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/Common/ProgressBar";
import BoardTitle from "../../components/Common/BoardTitle";
import SubjectList from "../../components/Common/SubjectList";
import useWindowSize from "../../components/Common/WindowSize";
import Header from "../../components/Header";
import { UserContext } from "../../context/UserContext"; // Update this import path as needed
import Loading from "../Loading";
import PostCarousel from "../../components/Common/PostCarousel";
import BaseAxios from "../../../axioses/BaseAxios";

const MyPage = () => {
    const [activeTab, setActiveTab] = useState("프로필");
    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();
    const userContext = useContext(UserContext);
    const { userData, fetchUserData, isLoading, error } =
        useContext(UserContext);

    const [popularPosts, setPopularPosts] = useState([]);

    useEffect(() => {
        if (!userData && !isLoading && !error) {
            fetchUserData();
        }
        const fetchData = async () => {
            try {
                const [popularPosts] = await Promise.all([
                    BaseAxios.post("/api/mypage/trending"),
                ]);

                if (Array.isArray(popularPosts.data)) {
                    setPopularPosts(popularPosts.data);
                } else {
                    console.error(
                        "Unexpected data structure:",
                        popularPosts.data
                    );
                    setPopularPosts([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [userData, isLoading, error, fetchUserData]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    if (!userContext) {
        return <div>Loading user context...</div>;
    }

    if (isLoading) return <Loading />;
    if (error) return <div>Error: {error.message}</div>;
    if (!userData) return <div>No user data available</div>;

    const {
        name,
        level,
        tipsCount,
        replyCount,
        hakbu,
        intro,
        profile_img,
        exp,
    } = userData;

    return (
        <Wrapper>
            <Header maxWidth={windowSize} text="" backurl="/menu">
                <Edit onClick={() => navigate("/mypage/edit")}>편집</Edit>
            </Header>
            <Profile maxWidth={windowSize}>
                <img
                    src={profile_img ? profile_img : "/Profile.svg"}
                    alt="프로필"
                    width="100px"
                    height="100px"
                    style={{ borderRadius: "50%", marginRight: "10px" }}
                />
                <ProfileInfo maxWidth={windowSize}>
                    {hakbu} {name} {/* 유저 이름 */}
                    <InfoBox>
                        <DetailInfo>
                            작성한 팁 수<Measurement>{tipsCount}</Measurement>
                        </DetailInfo>{" "}
                        {/* 꿀팁 수 */}
                        <DetailInfo>
                            작성한 답변 수
                            <Measurement>{replyCount}</Measurement>
                        </DetailInfo>{" "}
                        {/* 답변 수 */}
                        <DetailInfo>
                            레벨
                            <Measurement>
                                {Math.floor(exp / 100) + 1}
                            </Measurement>
                        </DetailInfo>{" "}
                        {/* 유저 레벨 */}
                    </InfoBox>
                </ProfileInfo>
            </Profile>
            {/* {hakbu && <Hakbu>{hakbu}</Hakbu>} */}
            <Introduction maxWidth={windowSize}>
                소개
                <IntroductionBox>{intro}</IntroductionBox>
            </Introduction>
            <TabNavigation
                tabs={["프로필", "활동"]}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            {activeTab === "프로필" && (
                <Content maxWidth={windowSize}>
                    {/* 배지 연결안함  */}
                    {/* <BadgeContainer>
                        <BadgeBox onClick={() => navigate("/badge")} />
                        <BadgeBox onClick={() => navigate("/badge")} />
                        <BadgeBox onClick={() => navigate("/badge")} />
                        <BadgeBox onClick={() => navigate("/badge")} />
                    </BadgeContainer> */}
                    {/* 성적연결안함 */}
                    <BoardTitle text="성적" />
                    <SubjectWrapper>
                        {/* <ScrollableSubjectList>
                            <SubjectList
                                subject={"디지털미디어원리"}
                                disableLink={true}
                                rate={"A+"}
                            />
                            <SubjectList
                                subject={"영상편집론"}
                                disableLink={true}
                                rate={"A-"}
                            />
                        </ScrollableSubjectList> */}
                    </SubjectWrapper>
                    <Title>인기게시글</Title>
                    {popularPosts.length > 0 ? (
                        <PostCarousel posts={popularPosts} />
                    ) : (
                        <PostCarousel />
                    )}
                </Content>
            )}
            {activeTab === "활동" && (
                <Content maxWidth={windowSize}>
                    <Title>명성</Title>
                    <Reputation>
                        {/* exp를 100으로 나눈 몫이 level */}
                        {Math.floor(exp / 100) + 1}

                        <ProgressBarContainer>
                            {/* 100으로 나눈 나머지를 progress로 사용 */}
                            다음 단계까지 {100 - (exp % 100)}점 남음
                            <ProgressBar
                                totalSteps={100} // 전체 단계는 100 (100% 기준)
                                currentStep={exp % 100} // exp를 100으로 나눈 나머지
                                width={"250px"}
                            />
                        </ProgressBarContainer>
                    </Reputation>

                    <Title>배지</Title>
                    {/* <div style={{ padding: "0px 20px 20px" }}>
                        <InfoBox>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLICURL}/Icons/Vote_c.svg`}
                                    alt="투표"
                                    width="35px"
                                    height="35px"
                                />
                                <div
                                    style={{
                                        fontSize: "16px",
                                        color: "#434B60",
                                        fontWeight: "700",
                                    }}
                                >
                                    20
                                </div>
                                <div
                                    style={{
                                        fontSize: "10px",
                                        color: "#ACB2BB",
                                    }}
                                >
                                    받은 투표 수
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLICURL}/Icons/Bookmark_c.svg`}
                                    alt="스크랩"
                                    width="20px"
                                    height="28px"
                                />
                                <div
                                    style={{
                                        fontSize: "16px",
                                        color: "#434B60",
                                        fontWeight: "700",
                                    }}
                                >
                                    20
                                </div>
                                <div
                                    style={{
                                        fontSize: "10px",
                                        color: "#ACB2BB",
                                    }}
                                >
                                    스크랩 수
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLICURL}/Icons/Crown_c.svg`}
                                    alt="꿀팁"
                                    width="40px"
                                    height="40px"
                                />
                                <div
                                    style={{
                                        fontSize: "16px",
                                        color: "#434B60",
                                        fontWeight: "700",
                                    }}
                                >
                                    20
                                </div>
                                <div
                                    style={{
                                        fontSize: "10px",
                                        color: "#ACB2BB",
                                    }}
                                >
                                    채택 수
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                    alignItems: "center",
                                }}
                            >
                                <img
                                    src={`${process.env.PUBLICURL}/Icons/Global_c.svg`}
                                    alt="답변"
                                    width="28px"
                                    height="28px"
                                />
                                <div
                                    style={{
                                        fontSize: "16px",
                                        color: "#434B60",
                                        fontWeight: "700",
                                    }}
                                >
                                    20
                                </div>
                                <div
                                    style={{
                                        fontSize: "10px",
                                        color: "#ACB2BB",
                                    }}
                                >
                                    조회 수
                                </div>
                            </div>
                        </InfoBox>
                    </div> */}
                </Content>
            )}
        </Wrapper>
    );
};

export default MyPage;

// Styled Components...

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 페이지가 전체 화면을 채우도록 설정 */
    position: relative; /* 헤더를 페이지 상단에 고정하기 위해 필요 */

    padding: 120px 10px 100px;

    background-color: #f0f2f4;

    width: 100%;
`;

const Profile = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
`;

const ProfileInfo = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
    color: #434b60;
    font-family: Inter, sans-serif;
    font-size: 18px;
    font-weight: 700;
    line-height: normal;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    gap: 8px;
`;

const DetailInfo = styled.div`
    color: #acb2bb;
    font-family: Inter, sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    display: flex;
    flex-direction: column;
    gap: 3px;
`;

const Measurement = styled.div`
    color: #434b60;
    font-family: Inter, sans-serif;
    font-size: 14px;
    font-weight: 700;
    line-height: normal;
`;

const Introduction = styled.div`
    box-sizing: border-box;
    padding: 10px 10px;
    color: #434b60;
    font-family: Inter, sans-serif;
    font-size: 16px;
    font-weight: 700;
    line-height: normal;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    text-align: left;
`;

const IntroductionBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    box-sizing: border-box;
    padding: 15px 10px;
    font-weight: 500;
`;

const Content = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: 800px;
    text-align: left;
    gap: 20px;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    display: flex;
    box-sizing: border-box;
    width: 100%;

    padding: 15px 10px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #434b60;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const BadgeContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    overflow-x: auto; /* 가로 스크롤을 활성화 */
    padding: 10px;
    gap: 20px; /* 각 BadgeBox 간의 간격 설정 */
    box-sizing: border-box; /* padding과 border가 width에 포함되도록 설정 */

    &::-webkit-scrollbar {
        height: 8px; /* 스크롤바의 높이 */
    }

    &::-webkit-scrollbar-thumb {
        background-color: #dbdbdb;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }
`;

const BadgeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100px; /* 고정된 너비 */
    height: 100px; /* 고정된 높이 */
    border-radius: 10px;
    background-color: white;
    flex-shrink: 0; /* 크기 축소 방지 */

    transition: all 0.3s ease;

    &:hover {
        cursor: pointer;
    }
    &: active {
        transform: scale(0.9);
    }
`;

const Reputation = styled.div`
    display: flex;
    height: 80px;
    padding: 0px 20px;
    margin-top: -10px;
    justify-content: space-between;
    align-items: center;

    color: #434b60;

    text-align: center;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    gap: 20px;
`;

const ProgressBarContainer = styled.div`
    width: 250px;
    display: flex;
    flex-direction: column;
    text-align: end;

    font-size: 12px;
    font-weight: 500;
    line-height: normal;
    color: #acb2bb;

    gap: 5px;
`;

const SubjectWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 24px;
    margin-top: 10px;
`;

const ScrollableSubjectList = styled.div`
    width: 100%;
    max-height: 280px;
    overflow-y: auto;
    padding: 0 10px 0 10px;
    box-sizing: border-box;
`;

const Edit = styled.button`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(172, 178, 187, 0.3);
    }

    &:active {
        scale: 0.95;
    }

    font-size: 16px;
    font-weight: bold;
    color: #434b60;
    text-align: center;
`;
