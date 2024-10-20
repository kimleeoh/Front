import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Questions from "../../components/Common/Questions";
import Checker from "../../components/Common/Checker";
import ChipFilter from "../../components/Common/ChipFilter";
import Tips from "../Tips/Tips";
import useWindowSize from "../../components/Common/WindowSize";

const initialQuestionData = [];

const initialTipsData = [];

const History = () => {
    const { subject } = useParams();
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [filteredTips, setFilteredTips] = useState([]);
    const [activeTab, setActiveTab] = useState("전체");

    const { width: windowSize } = useWindowSize();

    useEffect(() => {
        // 데이터 로딩 로직
        const loadData = () => {
            const questionData = localStorage.getItem("questionData");
            setQuestionData(
                questionData ? JSON.parse(questionData) : initialQuestionData
            );

            const tipsData = localStorage.getItem("TipsData");
            setTipsData(tipsData ? JSON.parse(tipsData) : initialTipsData);
            setFilteredTips(tipsData ? JSON.parse(tipsData) : initialTipsData);
        };
        loadData();
    }, []);

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="구입목록"
                backButton={true}
                searchButton={true}
            />
        </Wrapper>
    );
};

export default History;

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
