import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Questions from "../../components/Common/Questions";
import Checker from "../../components/Common/Checker";
import TabNavigation from "../../components/Common/TabNavigation";
import ChipFilter from "../../components/Common/ChipFilter";
import Tips from "../Tips/Tips";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import { Spinner } from "../../components/Common/Spinner";
import AdBox from "../../components/Common/AdBox";

const Likes = () => {
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [activeTab, setActiveTab] = useState("전체");
    const observerRef = useRef();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    const tabs = ["전체", "QnA", "Tips"];

    const { width: windowSize } = useWindowSize();

    const fetchApi = async (filtersArray) => {
        try {
            console.log("Sending filters:", filtersArray);
            const response = await BaseAxios.post("/api/menu/likelist", {
                filters: filtersArray,
            });
            if (response.data.message) {
                setIsEmpty(true);
                return;
            }
            console.log("response:", response);
            setIsEmpty(false);
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
            } else if (activeTab === "전체") {
                [questionResponse, tipsResponse] = await Promise.all([
                    fetchApi(["qna"]),
                    fetchApi(["test", "pilgy", "honey"]),
                ]);
            } else if (activeTab === "QnA") {
                questionResponse = await fetchApi(["qna"]);
            } else {
                tipsResponse = await fetchApi(["test", "pilgy", "honey"]);
            }

            if (!isEmpty && questionResponse?.documents.length) {
                setQuestionData((prev) => [
                    ...prev,
                    ...questionResponse.documents,
                ]);
            }
            if (!isEmpty && tipsResponse?.documents.length) {
                setTipsData((prev) => [...prev, ...tipsResponse.documents]);
            }
        } catch (error) {
            console.error("Error fetching tips data:", error);
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
    }, [activeTab]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    fetchMore();
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
        setIsAGradeOnly(isChecked);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setQuestionData([]);
        setTipsData([]);
    };

    const filteredQuestions = isAGradeOnly
        ? questionData.filter((question) => question.limit === "true")
        : questionData;

    const handleFilterChange = (activeChips) => {
        setTipsData([]);
        setHasMore(true);
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

            // 매 5번째 포스트 이후에 광고 삽입
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

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="좋아요한 글"
                backButton={true}
                searchButton={true}
            />
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />
            {activeTab === "전체" && (
                <>
                    {renderPostsWithAds(filteredQuestions, (question) => (
                        <Questions
                            _id={question._id}
                            title={question.title}
                            content={question.content}
                            subject={
                                question.now_category_list[
                                    question.now_category_list.length - 1
                                ][
                                    Object.keys(
                                        question.now_category_list[
                                            question.now_category_list.length -
                                                1
                                        ]
                                    )[0]
                                ]
                            }
                            time={question.time}
                            views={question.views}
                            like={question.like}
                            img={
                                Array.isArray(question.img_list)
                                    ? question.img_list[0]
                                    : question.img_list
                            }
                            limit={question.restricted_type}
                            user_main={question.user_main}
                        />
                    ))}
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
                </>
            )}
            {activeTab === "QnA" && (
                <>
                    <CheckerWrapper maxWidth={windowSize}>
                        <Checker
                            text={"A등급 제한"}
                            onChange={handleCheckerChange}
                        />
                    </CheckerWrapper>
                    {renderPostsWithAds(filteredQuestions, (question) => (
                        <Questions
                            _id={question._id}
                            title={question.title}
                            content={question.content}
                            subject={
                                question.now_category_list[
                                    question.now_category_list.length - 1
                                ][
                                    Object.keys(
                                        question.now_category_list[
                                            question.now_category_list.length -
                                                1
                                        ]
                                    )[0]
                                ]
                            }
                            time={question.time}
                            views={question.views}
                            like={question.like}
                            img={
                                Array.isArray(question.img_list)
                                    ? question.img_list[0]
                                    : question.img_list
                            }
                            limit={question.restricted_type}
                            user_main={question.user_main}
                        />
                    ))}
                </>
            )}
            {activeTab === "Tips" && (
                <>
                    <ChipFilterWrapper maxWidth={windowSize}>
                        <ChipFilter
                            onFilterChange={handleFilterChange}
                            marginTop={"10px"}
                        />
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
                </>
            )}
            {loading && <Spinner color="#434B60" size={32} />}
            {isEmpty && (
                <EmptyBox>
                    <Icon src="/Icons/Alert_gray.svg" />
                    <Content>
                        아직 스크랩한 글이 없어요! 또 보고 싶은 글은 스크랩
                        해보세요!
                    </Content>
                </EmptyBox>
            )}
        </Wrapper>
    );
};

export default Likes;

// Styled components remain the same

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 100px;
    width: 100%;
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
