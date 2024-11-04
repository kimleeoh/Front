import React, { useState, useEffect, useRef } from "react";
import BaseAxios from "../../../axioses/BaseAxios";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import Questions from "../../components/Common/Questions";
import Checker from "../../components/Common/Checker";
import FixedIcon from "../../components/Common/FixedIcon";
import TabNavigation from "../../components/Common/TabNavigation";
import ChipFilter from "../../components/Common/ChipFilter";
import Tips from "../Tips/Tips";
import useWindowSize from "../../components/Common/WindowSize";
import { Spinner } from "../../components/Common/Spinner";
import AdBox from "../../components/Common/AdBox";

const UnifiedBoard = () => {
    const { subject } = useParams();
    const { state } = useLocation();
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [activeTab, setActiveTab] = useState("QnA");
    const observerRef = useRef();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isInitial, setIsInitial] = useState(true);

    const { width: windowSize } = useWindowSize();

    const fetchApi = async (filtersArray) => {
        try {
            console.log("Sending filters:", filtersArray);
            console.log("id: ", state.id);
            const response = await BaseAxios.post("/api/board/detail", {
                subjectId: state.id,
                filters: filtersArray,
                isAGradeOnly: isAGradeOnly,
            });
            if (response.data.message) {
                setIsEmpty(true);
                return;
            }
            console.log("response: ", response);
            return response.data;
        } catch (error) {
            console.error("Error in fetchApi:", error);
            throw error;
        }
    };

    const fetchData = async (filtersArray = null) => {
        try {
            setLoading(true);
            let questionResponse, tipsResponse;
            if (filtersArray) {
                tipsResponse = await fetchApi(filtersArray);
            } else if (activeTab === "QnA") {
                questionResponse = await fetchApi(["qna"]);
            } else {
                tipsResponse = await fetchApi(["test", "pilgy", "honey"]);
            }
            console.log("isEmpty: ", isEmpty);
            if (!isEmpty && questionResponse?.documents.length) {
                if(isInitial) {
                    setQuestionData(questionResponse.documents);
                    setIsInitial(false);
                }
                else {
                    setQuestionData((prev) => [
                    ...prev,
                    ...questionResponse.documents,
                ]);}
                console.log("questionData: ", questionData);
            }
            if (!isEmpty && tipsResponse?.documents.length) {
                if(isInitial) {
                    setTipsData(tipsResponse.documents);
                    setIsInitial(false);
                }else{
                    setTipsData((prev) => [...prev, ...tipsResponse.documents]);
                }
                console.log("tipsData: ", tipsData);
            }
        } catch (error) {
            console.error("Error fetching question data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMore = () => {
        if (!loading && hasMore) {
            fetchData();
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab, isAGradeOnly]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    console.log("fetchMore !");
                    fetchMore(); // Fetch more data when reaching the bottom
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [hasMore, loading]);

    const handleCheckerChange = (isChecked) => {
        setQuestionData([]);
        setTipsData([]);
        setIsInitial(true);
        setIsAGradeOnly(isChecked);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setQuestionData([]);
        setTipsData([]);
        setIsInitial(true);
        setIsEmpty(false);
    };

    const handleFilterChange = (activeChips) => {
        setTipsData([]);
        setIsInitial(true);
        //setHasMore(true);
        fetchData(
            activeChips.length === 0 ? ["test", "pilgy", "honey"] : activeChips
        );
    };

    const renderPostsWithAds = (posts, renderFunction) => {
        if (!Array.isArray(posts) || posts.length === 0) {
            return;
        }

        const postsWithAds = [];
        posts.forEach((post, index) => {
            postsWithAds.push(
                <div
                    key={post._id}
                    ref={index === posts.length - 1 ? observerRef : null}
                    style={{ width: "100%" }}
                >
                    {renderFunction(post)}
                </div>
            );

            // 매 5번째 포스트 이후에 광고 삽입, 마지막 포스트 제외
            if ((index + 1) % 5 === 0 && index !== posts.length - 1) {
                postsWithAds.push(
                    <AdBox
                        key={`ad-${index}`}
                        _id={index}
                        title="광고 제목"
                        content="광고 내용"
                        img={null}
                        link="https://example.com/ad-link"
                    />
                );
            }
        });
        return postsWithAds;
    };

    const tabs = ["QnA", "Tips"];

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text={subject}
                backButton={true}
                searchButton={true}
            />
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            {activeTab === "QnA" && (
                <>
                    <CheckerWrapper maxWidth={windowSize}>
                        <Checker
                            text={"A등급 제한"}
                            onChange={handleCheckerChange}
                        />
                    </CheckerWrapper>
                    {renderPostsWithAds(questionData, (question) => {
                        const lastCategory =
                            question.now_category_list[
                                question.now_category_list.length - 1
                            ];
                        const value =
                            lastCategory[Object.keys(lastCategory)[0]];
                        return (
                            <Questions
                                _id={question._id}
                                title={question.title}
                                content={question.content}
                                subject={value}
                                time={question.time}
                                views={question.views}
                                like={question.like}
                                img={question.img_list}
                                limit={question.restricted_type}
                                user_main={question.user_main}
                                point={question.point}
                            />
                        );
                    })}
                    <FixedIcon src={`${process.env.REACT_APP_PUBLICURL}/Icons/Question.svg`} url={"/qna/post"} />
                </>
            )}
            {activeTab === "Tips" && (
                <>
                    <ChipFilterWrapper maxWidth={windowSize}>
                        <ChipFilter onFilterChange={handleFilterChange} />
                    </ChipFilterWrapper>
                    {renderPostsWithAds(tipsData, (tip) => (
                        <Tips
                            _id={tip._id}
                            Ruser={tip.Ruser}
                            category_name={tip.category_name}
                            category_type={tip.category_type}
                            title={tip.title}
                            preview_img={tip.preview_img}
                            likes={tip.likes}
                            purchase_price={tip.purchase_price}
                            target={tip.target}
                            views={tip.views}
                            time={tip.time}
                        />
                    ))}
                    <FixedIcon src={`${process.env.REACT_APP_PUBLICURL}/Icons/Pen.svg`} url={"/tips/post"} />
                </>
            )}
            {loading && <Spinner color="#434B60" size={32} />}
            {isEmpty ? (
                <EmptyBox>
                    <Icon src={`${process.env.REACT_APP_PUBLICURL}/Icons/Alert_gray.svg`} />
                    <Content>
                        아직 스크랩한 글이 없어요! 또 보고 싶은 글은 스크랩
                        해보세요!
                    </Content>
                </EmptyBox>
            ) : (
                <div ref={observerRef} />
            )}
            <FixedBottomContainer>
                <NavBar state="Board" />
            </FixedBottomContainer>
        </Wrapper>
    );
};

export default UnifiedBoard;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 100px;
`;

const CheckerWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding-left: 10px;
    box-sizing: border-box;
`;

const ChipFilterWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding-left: 10px;
    padding-top: 10px;
    box-sizing: border-box;
`;

const EmptyBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Icon = styled.img`
    width: 70px;
    height: 70px;
    margin-top: 120px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align-center;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: regular;
    padding: 15px;
    margin-top: 10px;
    color: #acb2bb;
`;
