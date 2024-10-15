import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Questions from "../../components/Common/Questions";
import Checker from "../../components/Common/Checker";
import TabNavigation from "../../components/Common/TabNavigation";
import ChipFilter from "../../components/Common/ChipFilter";
import Tips from "../Tips/Tips";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";

const Bookmarks = () => {
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [activeTab, setActiveTab] = useState("전체");
    const observerRef = useRef();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [message, setMessage] = useState();

    const tabs = ["전체", "QnA", "Tips"]; // 탭 목록을 동적으로 관리합니다.

    const { width: windowSize } = useWindowSize();

    const fetchApi = async (filtersArray) => {
        try {
            console.log("Sending filters:", filtersArray);
            const response = await BaseAxios.post("/api/menu/scraplist", {
                filters: filtersArray,
            });
            console.log("response:", response);
            return response.data; // Return response data
        } catch (error) {
            console.error("Error in fetchApi:", error);
            throw error;
        }
    };

    const fetchData = async (filtersArray = null) => {
        try {
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

            if (questionResponse?.documents.length) {
                setQuestionData((prev) => [
                    ...prev,
                    ...questionResponse.documents,
                ]);
                console.log("questionData: ", questionData);
            }
            if (tipsResponse?.documents.length) {
                setTipsData((prev) => [...prev, ...tipsResponse.documents]);
                console.log("tipsData: ", tipsData);
            }
        } catch (error) {
            console.error("Error fetching tips data:", error);
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
                    fetchMore(); // Fetch more data when reaching the bottom
                }
            },
            { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [fetchData, hasMore, loading]);

    const handleCheckerChange = (isChecked) => {
        setIsAGradeOnly(isChecked);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        // 늦게 반영되므로 데이터 뭐가 들었는지 보고 싶으면 아래 두 개 주석 처리
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
            {activeTab === "전체" && (
                <>
                    {questionData.map((question) => {
                        const img = Array.isArray(question.img_list)
                            ? question.img_list[0]
                            : question.img_list;

                        const lastCategory =
                            question.now_category_list[
                                question.now_category_list.length - 1
                            ];

                        // 동적으로 키를 가져와서 값 반환
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
                                img={img}
                                limit={question.restricted_type}
                            />
                        );
                    })}
                    {tipsData.map((tip) => (
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
                    <div ref={observerRef} />
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
                    {filteredQuestions.map((question) => {
                        const lastCategory =
                            question.now_category_list[
                                question.now_category_list.length - 1
                            ];

                        // 동적으로 키를 가져와서 값 반환
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
                            />
                        );
                    })}
                    <div ref={observerRef} />
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
                    {tipsData.map((tip) => (
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
                    <div ref={observerRef} />
                </>
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
