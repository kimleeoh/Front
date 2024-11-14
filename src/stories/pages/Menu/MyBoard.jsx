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
import { Spinner } from "../../components/Common/Spinner";

const MyBoard = () => {
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [activeTab, setActiveTab] = useState("QnA");
    const [loading, setLoading] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const tabs = ["QnA", "Tips"];
    const { width: windowSize } = useWindowSize();

    const fetchApi = async (filtersArray) => {
        try {
            const response = await BaseAxios.post("/api/menu/postlist", {
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
            let response;

            if (filtersArray) {
                response = await fetchApi(filtersArray);
            } else if (activeTab === "QnA") {
                response = await fetchApi(["qna"]);
            } else {
                response = await fetchApi(["test", "pilgy", "honey"]);
            }

            if (response) {
                if (activeTab === "QnA") {
                    setQuestionData(response.documents);
                } else {
                    setTipsData(response.documents);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsEmpty(false); // 탭 변경 시 초기화
        setQuestionData([]);
        setTipsData([]);
        fetchData();
    }, [activeTab]);

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
        setTipsData([]);
        setIsEmpty(false);
        fetchData(
            activeChips.length === 0 ? ["test", "pilgy", "honey"] : activeChips
        );
    };

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="내가 쓴 글"
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
                    {filteredQuestions.map((question) => {
                        const lastCategory =
                            question.now_category_list[
                                question.now_category_list.length - 1
                            ];
                        const value =
                            lastCategory[Object.keys(lastCategory)[0]];
                        return (
                            <Questions
                                key={question._id}
                                _id={question._id}
                                title={question.title}
                                content={question.content}
                                subject={value}
                                time={question.time}
                                views={question.views}
                                like={question.like}
                                img={question.preview_img}
                                limit={question.restricted_type}
                                user_main={question.user_main}
                            />
                        );
                    })}
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
                            key={tip._id}
                            _id={tip._id}
                            Ruser={tip.Ruser}
                            category_name={tip.now_category.category_name}
                            category_type={tip.now_category.category_type}
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
                        아직 작성한 글이 없어요! 글을 작성해 볼까요?
                    </Content>
                </EmptyBox>
            )}
        </Wrapper>
    );
};

export default MyBoard;

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
