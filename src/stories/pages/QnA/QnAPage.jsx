import React, { useState, useEffect } from "react";
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
                Ranswer: "463846736919eqk876e4q91b9",
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

const QnAPage = () => {
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);

    useEffect(() => {
        const storedQuestionData = localStorage.getItem("questionData");
        if (storedQuestionData) {
            setQuestionData(JSON.parse(storedQuestionData));
        } else {
            localStorage.setItem(
                "questionData",
                JSON.stringify(initialQuestionData)
            );
            setQuestionData(initialQuestionData);
        }
    }, []);

    // const fetchData = async () => {
    //     try {
    //         const result = await BaseAxios.get('/api/dummy/testqna');
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

    const filteredQuestions = isAGradeOnly
        ? questionData.filter((question) => question.restricted_type > 0)
        : questionData;

    const { width: windowSize } = useWindowSize();

    const renderPostsWithAds = (posts) => {
        if (!Array.isArray(posts) || posts.length === 0) {
            return;
        }

        const postsWithAds = [];
        posts.forEach((post, index) => {
            postsWithAds.push(
                <Questions
                    key={post._id}
                    _id={post._id}
                    title={post.title}
                    content={post.content}
                    subject={
                        post.now_category_list[
                            post.now_category_list.length - 1
                        ]
                    }
                    time={post.time}
                    views={post.views}
                    like={post.like}
                    img={Array.isArray(post.img) ? post.img[0] : post.img}
                    limit={post.restricted_type}
                    user_main={post.user_main}
                />
            );

            // 매 5번째 포스트 이후에 광고 삽입, 마지막 포스트 제외
            if ((index + 1) % 5 === 0 && index !== posts.length - 1) {
                postsWithAds.push(
                    <AdBox
                        key={`ad-${index}`}
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
            {renderPostsWithAds(filteredQuestions)}
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
