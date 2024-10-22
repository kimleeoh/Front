import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import Questions from "../../components/Common/Questions";
import Checker from "../../components/Common/Checker";
import FixedIcon from "../../components/Common/FixedIcon";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import AdBox from "../../components/Common/AdBox";
import { Spinner } from "../../components/Common/Spinner";

const QnAPage = () => {
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const [depth, setDepth] = useState(1);
    const observer = useRef();
    const { width: windowSize } = useWindowSize();

    const lastQuestionElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchMoreQuestions();
                }
            });
            if (node) observer.current.observe(node);
        },
        [hasMore, loading]
    );

    const fetchQuestions = useCallback(
        async (isInitial = false) => {
            setLoading(true);
            try {
                const response = await BaseAxios.get("/api/bulletin/qnas", {
                    params: { isAGradeOnly,
                        type: "many",
                        depth: depth
                     },
                });
                const newQuestions = response.data.docList;
                if(newQuestions.length === 0) {
                    setHasMore(false);
                }
                else{
                setQuestionData((prevQuestions) =>
                    isInitial
                        ? newQuestions
                        : [...prevQuestions, ...newQuestions]
                );
                
                setDepth(prevDepth => {
                    const newDepth = prevDepth + 1;
                    console.log("Updated depth:", newDepth);
                    return newDepth;
                });
                console.log("depth: ", depth);
                setHasMore(newQuestions.length > 0);
                setError(null);}
            } catch (error) {
                console.error("Error fetching question data:", error);
                setError("질문을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        },
        [isAGradeOnly,depth]
    );

    const fetchMoreQuestions = () => {
        if (!loading && hasMore) {
            fetchQuestions();
        }
    };

    useEffect(() => {
        fetchQuestions(true);
        
    }, [isAGradeOnly]);

    const handleCheckerChange = (isChecked) => {
        console.log("isChecked: ", isChecked);
        setIsAGradeOnly(isChecked);
        setQuestionData([]);
        setDepth(1);
        //setHasMore(true);
    };

    const renderPostsWithAds = () => {
        if (!Array.isArray(questionData) || questionData.length === 0) {
            return;
        }

        const postsWithAds = [];
        questionData.forEach((post, index) => {
            postsWithAds.push(
                <div key={post._id}
                    ref={
                        index === questionData.length - 1
                            ? lastQuestionElementRef
                            : null
                    }
                >
                    <Questions
                        _id={post._id}
                        title={post.title}
                        content={post.preview_content}
                        subject={
                            Object.values(post.now_category_list[
                                post.now_category_list.length - 1
                            ])[0]
                        }
                        time={post.time}
                        views={post.views}
                        like={post.likes}
                        img={Array.isArray(post.img) ? post.img[0] : post.img}
                        limit={post.restricted_type}
                        user_main={post.user_main}
                        point={post.point}
                    />
                </div>
            );

            if ((index + 1) % 5 === 0 && index !== questionData.length - 1) {
                postsWithAds.push(
                    <AdBox
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
                text="Q&A"
                backButton={false}
                searchButton={true}
            />
            <CheckerWrapper maxWidth={windowSize}>
                <Checker text={"A등급 제한"} onChange={handleCheckerChange} />
            </CheckerWrapper>
            {renderPostsWithAds()}
            {loading && <Spinner color="#434B60" size={32} />}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {!loading && questionData.length === 0 && (
                <EmptyMessage>질문이 없습니다.</EmptyMessage>
            )}
            <FixedIcon src="/Icons/Question.svg" url={"/qna/post"} />
            <FixedBottomContainer>
                <NavBar state="QnA" />
            </FixedBottomContainer>
        </Wrapper>
    );
};

export default QnAPage;

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

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    margin-top: 20px;
`;

const EmptyMessage = styled.div`
    text-align: center;
    margin-top: 20px;
    color: #666;
`;
