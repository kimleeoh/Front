import React, { useState, useEffect } from "react";
import BaseAxios from "../../../axioses/BaseAxios";
import { useParams } from "react-router-dom";
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
                Ranswer: "66add0ecd802d72c8a54be3e",
                Ruser: "66add0ecd802d72c8a54be3f",
                user_grade: "A+",
                _id: "66add0ecd802d72c8a54be41",
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
                Ranswer: "66add0ecd802d72c8a54be3e",
                Ruser: "66add0ecd802d72c8a54be3f",
                user_grade: "A+",
                _id: "66add0ecd802d72c8a54be41",
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
                Ranswer: "66add0ecd802d72c8a54be3e",
                Ruser: "66add0ecd802d72c8a54be3f",
                user_grade: "A+",
                _id: "66add0ecd802d72c8a54be41",
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
                Ranswer: "66add0ecd802d72c8a54be3e",
                Ruser: "66add0ecd802d72c8a54be3f",
                user_grade: "A+",
                _id: "66add0ecd802d72c8a54be41",
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

const initialTipsData = [
    {
        _id: "48578979aeb59a6b4e9668",
        name: "김난슬",
        major: "글로벌미디어학부",
        subject: "디지털미디어원리",
        title: "디미원 전공책 150 페이지 필기본 올립니다",
        content: "학생분들에게 도움이 되길 바랍니다",
        time: "2024-08-12T10:21:34.123Z",
        views: 30,
        img: ["/Icons/1607-2.jpg", "/Icons/22376525_6628724.jpg"],
        filter: "필기공유",
    },
    {
        _id: "789516539dib587bb4e9w88",
        name: "오준우",
        major: "글로벌미디어학부",
        subject: "컴퓨터시스템개론",
        title: "OOO교수님 수업",
        content: "+ 항상 채워주십니다. 진짜 최고예요 ㅠㅠ",
        time: "2024-08-13T10:21:34.123Z",
        views: 88,
        img: "/Icons/1607-2.jpg",
        filter: "수업꿀팁",
    },
    {
        _id: "1297268189apq577bb4e609e",
        name: "이예진",
        major: "글로벌미디어학부",
        subject: "화장실론",
        title: "숭실대 화장실 등급",
        content:
            "숭실대 건물들 화장실의 등급을 나눠봤습니다. 이용하실 때 참고 바랍니다.",
        time: "2024-08-14T05:45:30.246Z",
        views: 30,
        img: "/Icons/1607-2.jpg",
        filter: "수업꿀팁",
    },
];

const UnifiedBoard = () => {
    const { subject } = useParams();
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    const [filteredTips, setFilteredTips] = useState([]);
    const [activeTab, setActiveTab] = useState("QnA");

    useEffect(() => {
        // 데이터 로딩 로직
        const loadData = () => {
            localStorage.removeItem("questionData");
            const questionData = localStorage.getItem("questionData");
            setQuestionData(
                questionData ? JSON.parse(questionData) : initialQuestionData
            );

            localStorage.removeItem("TipsData");
            const tipsData = localStorage.getItem("TipsData");
            setTipsData(tipsData ? JSON.parse(tipsData) : initialTipsData);
            setFilteredTips(tipsData ? JSON.parse(tipsData) : initialTipsData);
        };
        loadData();
    }, []);

    // const fetchData = async () => {
    //     try {
    //         const result = await BaseAxios.get('/api/dummy/qna');
    //         setQuestionData([result.data]);
    //         console.log(result.data)
    //     } catch (error) {
    //         console.error('Error fetching question data:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchData()
    // }, []);

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
                    <div style={{ width: "380px" }}>
                        <Checker
                            text={"A등급 제한"}
                            onChange={handleCheckerChange}
                        />
                    </div>
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
                    <ChipFilter onFilterChange={handleFilterChange} />
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
