import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import BaseAxios from "../../../axioses/BaseAxios";
import QuestionsDetail from "./QuestionsDetail";
import Header from "../../components/Header";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import AnswersDetail from "./AnswersDetail";
import UserComment from "./UserComment";
import useWindowSize from "../../components/Common/WindowSize";
import { Spinner } from "../../components/Common/Spinner";

const QnADetailPage = () => {
    const { _id } = useParams();
    const location = useLocation();
    const { isNoti } = location.state || { isNoti: false };
    const [questionData, setQuestionData] = useState(null);
    const [already, setAlready] = useState({});
    const [answered, setAnswered] = useState([]);
    const [mine, setMine] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [currentReportId, setCurrentReportId] = useState(null);
    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const result = await BaseAxios.get("/api/qna", {
                    params: { id: _id },
                });

                // 문서가 존재하지 않는 경우 처리
                if (!result.data) {
                    navigate("/404"); // 문서가 없으면 404 페이지로 리디렉션
                    return;
                }

                const newQdata = JSON.parse(result.data.returnData);
                console.log("newQdata: ", newQdata);
                setQuestionData(newQdata);
                const currentDocs = result.data.currentDocs;

                setAnswered(newQdata.answered);
                setMine(newQdata.isMine);

                const {
                    like,
                    scrap,
                    alarm,
                    answer_like_list,
                    isLiked,
                    isScrapped,
                    isAlarm,
                    ...other
                } = currentDocs;
                const trivial = { ...other, isLiked, isScrapped, isAlarm };
                setAlready({ isLiked, isScrapped, isAlarm });
                sessionStorage.setItem("like", currentDocs.like);
                sessionStorage.setItem("scrap", currentDocs.scrap);
                sessionStorage.setItem("alarm", currentDocs.alarm);
                sessionStorage.setItem(
                    "answer_like_list",
                    currentDocs.answer_like_list
                );
                sessionStorage.setItem("trivial", JSON.stringify(trivial));
            } catch (error) {
                console.error("Error fetching question data:", error);
                navigate("/404"); // 에러 발생 시에도 404 페이지로 리디렉션
            }
            setIsLoading(false);
        };

        fetchQuestions();
    }, [_id, navigate]);

    const handleEditNavigation = (
        _id,
        picked,
        title,
        content,
        category,
        imgList,
        point,
        limit
    ) => {
        navigate(`/qna/${_id}/edit`, {
            state: { picked, title, content, category, imgList, point, limit },
        });
    };

    const handleReportClick = (questionId) => {
        setIsReportModalOpen(true);
        setCurrentReportId(questionId);
    };

    const handleCloseReportModal = () => {
        setIsReportModalOpen(false);
        setCurrentReportId(null);
    };

    const handleUploadQnaNew = async () => {
        const param = ["like", "scrap", "alarm", "answer_like_list", "trivial"];
        let currentDocs = {};
        for (const p of param) {
            let value = sessionStorage.getItem(p);
            if (p === "trivial") {
                value = JSON.parse(value);
                currentDocs = { ...currentDocs, ...value };
            } else {
                currentDocs[p] = value;
            }
            sessionStorage.removeItem(p);
        }

        const formData = { id: _id.toString(), currentDocs };
        await BaseAxios.put("/api/qna/update/post", formData);
        if (isNoti) navigate(-1, { state: { isNoti: true } });
        else navigate("/qna");
    };

    if (isLoading) {
        return <Spinner color="#434B60" size={32} />;
    }

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text={""}
                backButton={true}
                onClick={handleUploadQnaNew}
                searchButton={false}
            />
            {questionData && (
                <QuestionsDetail
                    _id={questionData._id}
                    user_main={questionData.user_main}
                    title={questionData.title}
                    content={questionData.content}
                    subject={questionData.now_category_list}
                    time={questionData.time}
                    views={questionData.view}
                    like={questionData.likes}
                    img={questionData.img_list}
                    point={questionData.point}
                    limit={questionData.restricted_type}
                    alread={already}
                    mine={mine}
                    onReportClick={handleReportClick}
                />
            )}

            {questionData &&
                questionData.answer_list &&
                questionData.answer_list.map((answer, index) => (
                    <AnswersDetail
                        key={index}
                        _id={answer.Ranswer}
                        major={answer.hakbu}
                        name={answer.name}
                        index={index}
                        picked={questionData.picked_index === index}
                        level={answer.level}
                        user_grade={answer.user_grade}
                        content={answer.content}
                        img={answer.img_list}
                        like={answer.likes}
                        alread={answer.alread}
                        mine={answered != null && answered.includes(index)}
                    />
                ))}

            {!mine && questionData && (
                <UserComment
                    post_id={questionData._id}
                    isScore={questionData.isScore}
                    whatScore={questionData.whatScore}
                    profileImg={questionData.profile_img}
                    level={questionData.level}
                    major={questionData.major}
                    name={questionData.name}
                    limit={questionData.restricted_type}
                />
            )}

            <FixedBottomContainer />
        </Wrapper>
    );
};

export default QnADetailPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 100px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    color: #434b60;
`;
