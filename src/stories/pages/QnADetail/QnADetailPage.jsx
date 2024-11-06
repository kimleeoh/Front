import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import BaseAxios from "../../../axioses/BaseAxios";
import QuestionsDetail from "./QuestionsDetail";
import Header from "../../components/Header";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import AnswersDetail from "./AnswersDetail";
import UserComment from "./UserComment";
import useWindowSize from "../../components/Common/WindowSize";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../components/Common/Spinner";

const QnADetailPage = () => {
    const { _id } = useParams();
    const location = useLocation();
    const { isNoti } = location.state || { isNoti: false };
    const [questionData, setQuestionData] = useState([]);
    const [already, setAlready] = useState({});
    const [answered, setAnswered] = useState([]);
    const [mine, setMine] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [currentReportId, setCurrentReportId] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            console.log(_id);
            const result = await BaseAxios.get("/api/qna", {
                params: { id: _id },
            });

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
            console.log(trivial);
            sessionStorage.setItem("like", currentDocs.like);
            sessionStorage.setItem("scrap", currentDocs.scrap);
            sessionStorage.setItem("alarm", currentDocs.alarm);
            sessionStorage.setItem(
                "answer_like_list",
                currentDocs.answer_like_list
            );
            sessionStorage.setItem("trivial", JSON.stringify(trivial));
        };

        setIsLoading(true);
        fetchQuestions();
        setIsLoading(false);
    }, []);

    // const questionData = questionData.find(
    //     (question) => question._id === String(_id)
    // )

    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();

    // const handleEditNavigation = (
    //     _id,
    //     picked,
    //     title,
    //     content,
    //     category,
    //     imgList,
    //     point,
    //     limit
    // ) => {
    //     navigate(`/qna/${_id}/edit`, {
    //         state: { picked, title, content, category, imgList, point, limit },
    //     });
    // };

    const handleReportClick = (questionId) => {
        setIsReportModalOpen(true);
        setCurrentReportId(questionId);
    };

    const handleCloseReportModal = () => {
        setIsReportModalOpen(false);
        setCurrentReportId(null);
    };

    const handleUploadQnaNew = async () => {
        // {category: "QnA",
        //     category_id: Qdoc.Rcategory,
        //     isLiked: shouldIshowLS.RmyLike_list.Rqna_list==undefined? 0 : shouldIshowLS.RmyLike_list.Rqna_list.includes(id)? 1 : shouldIshowLS.RmyUnlike_list.Rqna_list!=undefined&&shouldIshowLS.RmyUnlike_list.Rqna_list.includes(id)? -1 : 0,
        //     like: 0,
        //     isScrapped: shouldIshowLS.RmyScrap_list.Rqna_list.includes(id),
        //     scrap:false,
        //     isAlarm:Qdoc.Rnotifyusers_list.includes(Doc._id),
        //     alarm:false,
        //     answer_like_list : Array(Qdoc.answer_list.length).fill(0),
        //     score: whatScore,
        //     };

        const param = ["like", "scrap", "alarm", "answer_like_list", "trivial"];
        let currentDocs = {};
        for (const p of param) {
            let value = sessionStorage.getItem(p);
            if (p == "trivial") {
                value = JSON.parse(value);
                currentDocs = { ...currentDocs, ...value };
            } else currentDocs[p] = value;

            sessionStorage.removeItem(p);
        }
        console.log(currentDocs);

        console.log("a", answered);

        const formData = { id: _id.toString(), currentDocs };
        await BaseAxios.put("/api/qna/update/post", formData);

        if (isNoti) navigate(-1, { state: { isNoti: true } });
        else navigate("/qna");
    };

    if (isLoading) {
        return <p></p>;
        //<Spinner color="#434B60" size={32} />;
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
                    limit={questionData.restricted_type}
                    point={questionData.point}
                    alread={already}
                    mine={mine}
                    onReportClick={handleReportClick}
                />
            )}

            {questionData &&
                questionData.answer_list &&
                questionData.answer_list.map((answer, index) => (
                    <AnswersDetail
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

            {mine
                ? null
                : questionData && (
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
`;
