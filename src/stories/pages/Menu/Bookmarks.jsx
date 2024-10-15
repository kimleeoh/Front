import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
    const { subject } = useParams();
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [filteredTips, setFilteredTips] = useState([]);
    const [activeTab, setActiveTab] = useState("전체");

    const tabs = ["전체", "QnA", "Tips"]; // 탭 목록을 동적으로 관리합니다.

    const { width: windowSize } = useWindowSize();

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchApi = async (filtersArray) => {
        try {
            console.log("Sending filters:", filtersArray);
            const response = await BaseAxios.post("/api/menu/scraplist", {
                filters: filtersArray,
            });
            console.log("response:", response);
            return response.documents; // Return response data
        } catch (error) {
            console.error("Error in fetchApi:", error);
            throw error;
        }
    };

    const fetchData = async () => {
        try {
            let questionResponse, tipsResponse;

            if (activeTab === "전체") {
                [questionResponse, tipsResponse] = await Promise.all([
                    fetchApi(["qna"]),
                    fetchApi(["test", "pilgy", "honey"]),
                ]);
            } else if (activeTab === "QnA") {
                questionResponse = await fetchApi(["qna"]);
            } else {
                tipsResponse = await fetchApi(["test", "pilgy", "honey"]);
            }

            if (questionResponse) setQuestionData(questionResponse);
            if (tipsResponse) setTipsData(tipsResponse);
        } catch (error) {
            console.error("Error fetching tips data:", error);
        }
    };

    const handleCheckerChange = (isChecked) => {
        setIsAGradeOnly(isChecked);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const filteredQuestions = isAGradeOnly
        ? questionData.filter((question) => question.limit === "true")
        : questionData;

    const handleFilterChange = (activeChips) => {
        if (activeChips.length === 0) {
            setFilteredTips(tipsData);
        } else {
            const filtered = tipsData.filter((tip) =>
                activeChips.includes(tip.filter)
            );
            setFilteredTips(filtered);
        }
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
                    {filteredQuestions
                        .filter((question) => question.subject === subject)
                        .map((question) => (
                            <Questions
                                key={question.id}
                                id={question.id}
                                title={question.title}
                                content={question.content}
                                subject={question.subject}
                                time={question.time}
                                views={question.views}
                                like={question.like}
                                img={
                                    Array.isArray(question.img)
                                        ? question.img[0]
                                        : question.img
                                }
                                limit={question.limit}
                            />
                        ))}
                    {filteredTips
                        .filter((tip) => tip.subject === subject)
                        .map((tip) => (
                            <Tips
                                key={tip.id}
                                id={tip.id}
                                name={tip.name}
                                major={tip.major}
                                subject={tip.subject}
                                title={tip.title}
                                content={tip.content}
                                time={tip.time}
                                views={tip.views}
                                like={tip.like}
                                img={
                                    Array.isArray(tip.img)
                                        ? tip.img[0]
                                        : tip.img
                                }
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
                    {filteredQuestions
                        .filter((question) => question.subject === subject)
                        .map((question) => (
                            <Questions
                                key={question.id}
                                id={question.id}
                                title={question.title}
                                content={question.content}
                                subject={question.subject}
                                time={question.time}
                                views={question.views}
                                like={question.like}
                                img={
                                    Array.isArray(question.img)
                                        ? question.img[0]
                                        : question.img
                                }
                                limit={question.limit}
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
                    {filteredTips
                        .filter((tip) => tip.subject === subject)
                        .map((tip) => (
                            <Tips
                                key={tip.id}
                                id={tip.id}
                                name={tip.name}
                                major={tip.major}
                                subject={tip.subject}
                                title={tip.title}
                                content={tip.content}
                                time={tip.time}
                                views={tip.views}
                                like={tip.like}
                                img={
                                    Array.isArray(tip.img)
                                        ? tip.img[0]
                                        : tip.img
                                }
                            />
                        ))}
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
