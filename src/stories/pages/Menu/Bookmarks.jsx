import React, { useState, useEffect } from "react";
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

const Bookmarks = () => {
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [activeTab, setActiveTab] = useState("QnA");
    const [loading, setLoading] = useState(false);
    const [nowChips, setNowChips] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    const tabs = ["QnA", "Tips"];
    const { width: windowSize } = useWindowSize();

    const fetchApi = async (filtersArray) => {
        try {
            const response = await BaseAxios.post("/api/menu/scraplist", {
                filters: filtersArray,
            });

            if (response.data.message) {
                setIsEmpty(true);
                return null;
            }
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

            if (filtersArray?.length > 0) {
                tipsResponse = await fetchApi(filtersArray);
            } else if (!filtersArray && activeTab === "QnA") {
                questionResponse = await fetchApi(["qna"]);
            } else {
                tipsResponse = await fetchApi(["test", "pilgy", "honey"]);
            }

            if (questionResponse?.documents.length) {
                setQuestionData(questionResponse.documents);
            }
            if (tipsResponse?.documents.length) {
                setTipsData(tipsResponse.documents);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const handleCheckerChange = (isChecked) => {
        setIsAGradeOnly(isChecked);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setNowChips([]);
        setQuestionData([]);
        setTipsData([]);
        setIsEmpty(false);
    };

    const filteredQuestions = isAGradeOnly
        ? questionData.filter((question) => question.restricted_type === "true")
        : questionData;

    const handleFilterChange = (activeChips) => {
        setTipsData([]);
        setIsEmpty(false);
        setNowChips(
            activeChips.length === 0 ? ["test", "pilgy", "honey"] : activeChips
        );
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
                <div key={post._id} style={{ width: "100%" }}>
                    {renderFunction(post)}
                </div>
            );

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
                text="북마크"
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
                    {renderPostsWithAds(filteredQuestions, (question) => (
                        <Questions
                            key={question._id}
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
                            img={question.img_list}
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
                            key={tip._id}
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
                    <Icon src={"/Icons/Alert_gray.svg"} />
                    <Content>
                        아직 스크랩한 글이 없어요! 또 보고 싶은 글은 스크랩
                        해보세요!
                    </Content>
                </EmptyBox>
            )}
        </Wrapper>
    );
};

export default Bookmarks;

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
