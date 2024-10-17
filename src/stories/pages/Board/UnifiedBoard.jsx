import React, { useState, useEffect } from "react";
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

const UnifiedBoard = () => {
    const { subject } = useParams();
    const { state } = useLocation();
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [filteredTips, setFilteredTips] = useState([]);
    const [activeTab, setActiveTab] = useState("QnA");

    const { width: windowSize } = useWindowSize();

    const fetchApi = async (filtersArray) => {
        try {
            console.log("Sending filters:", filtersArray);
            console.log("id: ", state.id);
            const response = await BaseAxios.post("/api/board/detail", {
                subjectId: state.id,
                filters: filtersArray,
            });
            console.log("response: ", response);
            return response.data;
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
            } else if (activeTab === "QnA") {
                questionResponse = await fetchApi(["qna"]);
            } else {
                tipsResponse = await fetchApi(["test", "pilgy", "honey"]);
            }
        } catch (error) {
            console.error("Error fetching question data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCheckerChange = (isChecked) => {
        setIsAGradeOnly(isChecked);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const filteredQuestions = isAGradeOnly
        ? questionData.filter((question) => question.restricted_type > 0)
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

    const tabs = ["QnA", "Tips"]; // 탭 목록을 동적으로 관리합니다.

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
                    {filteredQuestions
                        .filter(
                            (question) =>
                                question.now_category_list[
                                    question.now_category_list.length - 1
                                ] === subject
                        )
                        .map((question) => {
                            const img = Array.isArray(question.img)
                                ? question.img[0]
                                : question.img;

                            return (
                                <Questions
                                    key={question._id}
                                    _id={question._id}
                                    title={question.title}
                                    content={question.content}
                                    subject={
                                        question.now_category_list[
                                            question.now_category_list.length -
                                                1
                                        ]
                                    }
                                    time={question.time}
                                    views={question.views}
                                    like={question.like}
                                    img={img}
                                    limit={question.restricted_type}
                                />
                            );
                        })}
                    <FixedIcon src="/Icons/Question.svg" url={"/qna/post"} />
                </>
            )}
            {activeTab === "Tips" && (
                <>
                    <ChipFilterWrapper maxWidth={windowSize}>
                        <ChipFilter onFilterChange={handleFilterChange} />
                    </ChipFilterWrapper>
                    {filteredTips
                        .filter((tip) => tip.subject === subject)
                        .map((tip) => (
                            <Tips
                                key={tip._id}
                                _id={tip._id}
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
                    <FixedIcon src="/Icons/Pen.svg" url={"/tips/post"} />
                </>
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
