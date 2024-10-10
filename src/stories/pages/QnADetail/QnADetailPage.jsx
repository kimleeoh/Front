import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BaseAxios from "../../../axioses/BaseAxios";
import QuestionsDetail from "./QuestionsDetail";
import Header from "../../components/Header";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import AnswersDetail from "./AnswersDetail";
import UserComment from "./UserComment";
import useWindowSize from "../../components/Common/WindowSize";

const initialQuestionData = [
    {
        _id: "463846736919eqk876e4q91b9",
        restricted_type: 1,
        user_main: "글로벌미디어학부 이예진",
        user_img: "",
        user_badge_img: "",
        Rnotifyusers_list: ["66add0ecd802d72c8a54be40"],
        Ruser: "66add0ecd802d72c8a54be3d",
        answer_list: [
            {
                Ranswer: "2049682058edks8skfe4195b9",
                QNAcategory: [
                    "전공선택별",
                    "IT대",
                    "글로벌미디어학부",
                    "디지털미디어원리",
                ],
                content: "1번 답: 01101101",
                hakbu: "글로벌미디어학부",
                img_list: ["/Icons/1607-2.jpg", "/Icons/22376525_6628724.jpg"],
                level: 15,
                like: 13,
                name: "오준우",
                user_grade: "A+",
            },
        ],
        title: "나이키스트 원리 저 진짜 하나도 모르겠어서 혼란스러운데 어떻게 안 될까요?",
        content: "나이키스트 관련 식 이렇게 이해하면 되나요?",
        img: [
            "/Icons/1607-2.jpg",
            "/Icons/22376525_6628724.jpg",
            "/Icons/1607-2.jpg",
            "/Icons/22376525_6628724.jpg",
            "/Icons/1607-2.jpg",
            "/Icons/22376525_6628724.jpg",
            "/Icons/1607-2.jpg",
            "/Icons/22376525_6628724.jpg",
            "/Icons/1607-2.jpg",
            "/Icons/22376525_6628724.jpg",
        ],
        now_category_list: [
            "전공선택별",
            "IT대",
            "글로벌미디어학부",
            "디지털미디어원리",
        ],
        picked_index: 0,
        scrap: 0,
        time: "2024-08-12T10:21:34.123Z",
        views: 30,
        like: 20,
        warn: 0,
    },
    {
        _id: "7962156648w19eqk878e268qb",
        restricted_type: 2,
        user_main: "글로벌미디어학부 오준우",
        user_img: "",
        user_badge_img: "",
        Rnotifyusers_list: ["66add0ecd802d72c8a54be40"],
        Ruser: "66add0ecd802d72c8a54be3d",
        answer_list: [
            {
                Ranswer: "7962156648w19eqk878e268qb",
                QNAcategory: [
                    "전공선택별",
                    "IT대",
                    "글로벌미디어학부",
                    "컴퓨터시스템개론",
                ],
                content: "몰라이씨",
                hakbu: "글로벌미디어학부",
                img_list: ["/Icons/1607-2.jpg"],
                level: 15,
                like: 30,
                name: "김난슬",
                user_grade: "A+",
            },
        ],
        title: "자료구조",
        content:
            "스택이랑 큐의 차이점을 자세히 설명해 주세요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ",
        img: "/Icons/1607-2.jpg",
        now_category_list: [
            "전공선택별",
            "IT대",
            "글로벌미디어학부",
            "컴퓨터시스템개론",
        ],
        picked_index: 0,
        scrap: 0,
        time: "2024-08-13T10:21:34.123Z",
        views: 88,
        like: 48,
        warn: 0,
    },
    {
        _id: "46848w9e98w19eqk878e2ea434",
        restricted_type: 0,
        user_main: "글로벌미디어학부 이동현",
        user_img: "",
        user_badge_img: "",
        Rnotifyusers_list: ["66add0ecd802d72c8a54be40"],
        Ruser: "66add0ecd802d72c8a54be3d",
        answer_list: [
            {
                Ranswer: "46848w9e98w19eqk878e2ea434",
                QNAcategory: [
                    "전공선택별",
                    "IT대",
                    "글로벌미디어학부",
                    "미디어제작및실습",
                ],
                content: "채택해 주세요.",
                hakbu: "글로벌미디어학부",
                img_list: ["/Icons/1607-2.jpg"],
                level: 15,
                like: 28,
                name: "이동현",
                user_grade: "A+",
            },
        ],
        title: "미디어제작및실습 포토샵",
        content:
            "포토샵 재학생 인증 어떻게 하나요?? 알려주시면 좋은 행운이 찾아올 거예요~",
        img: "",
        now_category_list: [
            "전공선택별",
            "IT대",
            "글로벌미디어학부",
            "미디어제작및실습",
        ],
        picked_index: 0,
        scrap: 0,
        time: "2024-08-14T05:45:30.246Z",
        views: 302,
        like: 12,
        warn: 0,
    },
    {
        _id: "66add0ecd802d72c8a54be3c",
        restricted_type: 0,
        user_main: "글로벌미디어학부 김난슬",
        user_img: "",
        user_badge_img: "",
        Rnotifyusers_list: ["66add0ecd802d72c8a54be40"],
        Ruser: "66add0ecd802d72c8a54be3d",
        answer_list: [
            {
                Ranswer: "66cc7d1889bbc9e6894e3710",
                QNAcategory: [
                    "전공선택별",
                    "IT대",
                    "글로벌미디어학부",
                    "디지털미디어원리",
                ],
                content: "답변입니다",
                hakbu: "글로벌미디어학부",
                img_list: [],
                level: 0,
                like: 2,
                name: "김연서",
                user_grade: "A+",
            },
        ],
        content: "내용",
        img: ["/Icons/22376525_6628724.jpg", "/Icons/1607-2.jpg"],
        like: 0,
        now_category_list: [
            "전공선택별",
            "IT대",
            "글로벌미디어학부",
            "디지털미디어원리",
        ],
        picked_index: 0,
        scrap: 0,
        time: "2024-08-03T06:40:44.828Z",
        title: "몰라",
        views: 0,
        warn: 0,
    },
];

const initialUserData = [
    {
        id: 1,
        name: "이예진",
        level: 13,
        grade: "A+",
        figure: 3,
        major: "글로벌미디어학부",
        profileImg: "/Icons/Pen.svg",
        likePost: ["463846736919eqk876e4q91b9"],
    },
];

const QnADetailPage = () => {
    const { _id } = useParams();
    const [questionData, setQuestionData] = useState([]);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [currentReportId, setCurrentReportId] = useState(null);

    useEffect(() => {
        // 실제 환경에서는 API 호출로 대체
        const storedData = localStorage.getItem("questionData");
        if (storedData) {
            setQuestionData(JSON.parse(storedData));
        } else {
            localStorage.setItem(
                "questionData",
                JSON.stringify(initialQuestionData)
            );
            setQuestionData(initialQuestionData);
        }
    }, []);

    const currentQuestion = questionData.find(
        (question) => question._id === String(_id)
    );
    const currentUser = initialUserData[0];

    const { width: windowSize } = useWindowSize();

    const handleReportClick = (questionId) => {
        setIsReportModalOpen(true);
        setCurrentReportId(questionId);
    };

    const handleCloseReportModal = () => {
        setIsReportModalOpen(false);
        setCurrentReportId(null);
    };

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text={""}
                backButton={true}
                searchButton={false}
            />
            {currentQuestion && (
                <QuestionsDetail
                    key={currentQuestion._id}
                    _id={currentQuestion._id}
                    user_main={currentQuestion.user_main}
                    title={currentQuestion.title}
                    content={currentQuestion.content}
                    subject={currentQuestion.now_category_list}
                    time={currentQuestion.time}
                    views={currentQuestion.views}
                    like={currentQuestion.like}
                    img={currentQuestion.img}
                    limit={currentQuestion.restricted_type}
                    likePost={currentUser.likePost}
                    onReportClick={handleReportClick}
                />
            )}

            {currentQuestion &&
                currentQuestion.answer_list &&
                currentQuestion.answer_list.map((answer) => (
                    <AnswersDetail
                        key={answer.Ranswer}
                        _id={answer.Ranswer}
                        major={answer.hakbu}
                        name={answer.name}
                        level={answer.level}
                        user_grade={answer.user_grade}
                        content={answer.content}
                        img={answer.img_list}
                        like={answer.like}
                    />
                ))}

            {currentQuestion &&
                initialUserData.map((user) => (
                    <UserComment
                        key={user.id}
                        post_id={currentQuestion._id}
                        name={user.name}
                        level={user.level}
                        grade={user.grade}
                        major={user.major}
                        profileImg={user.profileImg}
                        limit={currentQuestion.restricted_type}
                    />
                ))}

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
    margin-top: 100px;
    margin-bottom: 100px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
`;
