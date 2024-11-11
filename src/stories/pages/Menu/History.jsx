import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Questions from "../../components/Common/Questions";
import Tips from "../Tips/Tips";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import { Spinner } from "../../components/Common/Spinner";

const History = () => {
    const [questionData, setQuestionData] = useState([]);
    const [tipsData, setTipsData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [loading, setLoading] = useState(false);

    const { width: windowSize } = useWindowSize();

    const fetchData = async () => {
        try {
            setLoading(true);
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
        } catch (error) {
            console.error("Error in fetchData:", error);
        } finally {
            setLoading(false);
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
                const value = lastCategory[Object.keys(lastCategory)[0]];

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
                        img={img}
                        limit={question.restricted_type}
                        user_main={question.user_main}
                    />
                );
            })}
            {tipsData.map((tip) => (
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
            {loading && <Spinner color="#434B60" size={32} />}
            {isEmpty && (
                <EmptyBox>
                    <Icon src={"/Icons/Alert_gray.svg"} />
                    <Content>아직 본 글이 없어요!</Content>
                </EmptyBox>
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
