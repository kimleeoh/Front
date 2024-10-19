import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Questions from "../../components/Common/Questions";
import Tips from "../Tips/Tips";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";

const History = () => {
    const [questionData, setQuestionData] = useState([]);
    const [tipsData, setTipsData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const observerRef = useRef();
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    const { width: windowSize } = useWindowSize();

    const fetchData = async () => {
        try {
            const response = await BaseAxios.get("/api/menu/recentlist");
            console.log("response: ", response);
            const fetchedData = response.data;

            if (fetchedData.message) {
                setIsEmpty(true);
                return;
            }

            const questions = fetchedData.documents.filter(
                (doc) => doc.type === "qna"
            );
            const tips = fetchedData.documents.filter(
                (doc) => doc.type === "tips"
            );

            setQuestionData(questions);
            setTipsData(tips);
            console.log("questionData: ", questionData);
            console.log("tipsData: ", tipsData);
        } catch (error) {
            console.error("Error in fetchApi:", error);
            throw error;
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="최근 본 글"
                backButton={true}
                searchButton={true}
            />
            {questionData.map((question) => {
                const img = Array.isArray(question.img_list)
                    ? question.img_list[0]
                    : question.img_list;

                const lastCategory =
                    question.now_category_list[
                        question.now_category_list.length - 1
                    ];

                // 동적으로 키를 가져와서 값 반환
                const value = lastCategory[Object.keys(lastCategory)[0]];
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
                        user_main={question.user_main}
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
            {isEmpty ? (
                <EmptyBox>
                    <Icon src="/Icons/Alert_gray.svg" />
                    <Content>아직 본 글이 없어요!</Content>
                </EmptyBox>
            ) : (
                <div ref={observerRef} />
            )}
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
