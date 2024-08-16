import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import QuestionsDetail from '../../components/QuestionsDetail'
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import AnswersDetail from '../../components/AnswersDetail';
import UserComment from '../../components/UserComment';

const initialQuestionData = [
    {
        id: '463846736919eqk876e4q91b9',
        name: '이예진',
        major: '글로벌미디어학부',
        title: '나이키스트 원리 저 진짜 하나도 모르겠어서 혼란스러운데 어떻게 안 될까요?',
        content: '나이키스트 관련 식 이렇게 이해하면 되나요?',
        subject: '디지털미디어원리',
        time: "2024-08-12T10:21:34.123Z",
        views: 30,
        like: 20,
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        limit: true
    },
    {
        id: '7962156648w19eqk878e268qb',
        name: '오준우',
        major: '글로벌미디어학부',
        title: '자료구조',
        content: '스택이랑 큐의 차이점을 자세히 설명해 주세요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
        subject: '컴퓨터시스템개론',
        time: "2024-08-13T10:21:34.123Z",
        views: 88,
        like: 48,
        img: '/Icons/1607-2.jpg',
        limit: false
    },
    {
        id: '46848w9e98w19eqk878e2ea434',
        name: '이동현',
        major: '글로벌미디어학부',
        title: '미디어제작및실습 포토샵',
        content: '포토샵 재학생 인증 어떻게 하나요?? 알려주시면 좋은 행운이 찾아올 거예요~',
        subject: '미디어제작및실습',
        time: "2024-08-14T05:45:30.246Z",
        views: 302,
        like: 12,
        img: null,
        limit: false
    },
    {
        id: '7998wkf68451n9eqk877614wsb',
        name: '이예진',
        major: '글로벌미디어학부',
        title: '표본화 양자화 부호화',
        content: '각각을 한 문장으로 정리할 수 있다면?',
        subject: '디지털미디어원리',
        time: "2024-08-14T05:45:30.246Z",
        views: 30,
        like: 15,
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        limit: false
    },
]

const initialAnswerData = [
    {
        id: '7196584we6456e481q770q23b9',
        post_id: '463846736919eqk876e4q91b9',
        name: '오준우',
        level: 15,
        grade: 'A+',
        figure: 3,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
        content: '1번 답: 01101101',
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        like: 13,
    },
    {
        id: '451491268qqdvsdf8728qb',
        post_id: '7962156648w19eqk878e268qb',
        name: '김난슬',
        level: 15,
        grade: 'A+',
        figure: 3,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
        content: '몰라이씨',
        img: "/Icons/1607-2.jpg",
        like: 30,
    },
    {
        id: '13adfw6215415aqkaffsd434',
        post_id: '46848w9e98w19eqk878e2ea434',
        name: '이동현',
        level: 15,
        grade: 'A+',
        figure: 3,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
        content: '채택해 주세요.',
        img: "/Icons/1607-2.jpg",
        like: 28,
    },
    {
        id: '131634wifg36ei54973q469',
        post_id: '463846736919eqk876e4q91b9',
        name: '이동현',
        level: 15,
        grade: 'A+',
        figure: 3,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
        content: '채택해 주세요.',
        img: "/Icons/1607-2.jpg",
        like: 3,
    }
    
]

const initialUserData = [
    {
        id: 1,
        name: '이예진',
        level: 13,
        grade: 'A+',
        figure: 3,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
    }
]

const QnADetailPage = () => {
    const { id } = useParams();
    const [questionData, setQuestionData] = useState([]);
    const [answerData, setAnswerData] = useState([]);

    useEffect(() => {
        //로컬 스토리지에서 질문 데이터 로드 또는 초기화
        localStorage.removeItem('questionData');
        localStorage.removeItem('answerData');
        const questionData = localStorage.getItem('questionData');
        const answerData = localStorage.getItem('answerData');
        if (questionData) {
            setQuestionData(JSON.parse(questionData));
        } else {
            localStorage.setItem('questionData', JSON.stringify(initialQuestionData));
            setQuestionData(initialQuestionData);
        }
        if (answerData) {
            setAnswerData(JSON.parse(answerData));
        } else {
            localStorage.setItem('answerData', JSON.stringify(initialAnswerData));
            setAnswerData(initialAnswerData);
        }
    }, []);

    const currentQuestion = questionData.find((question) => question.id === String(id));
    
    return (
        <Wrapper>
            <Header showIcon={false} text={""} backButton={true} searchButton={false}/>
            {currentQuestion && (
                <QuestionsDetail
                    key={currentQuestion.id}
                    id={currentQuestion.id}
                    name={currentQuestion.name}
                    major={currentQuestion.major}
                    title={currentQuestion.title}
                    content={currentQuestion.content}
                    subject={currentQuestion.subject}
                    time={currentQuestion.time}
                    views={currentQuestion.views}
                    like={currentQuestion.like}
                    img={currentQuestion.img}
                    limit={currentQuestion.limit}
                />
            )}

            {answerData
                .filter(answer => answer.post_id === String(id))
                .map((answer) => (
                    <AnswersDetail
                        id={answer.id}
                        post_id={answer.post_id}
                        name={answer.name}
                        level={answer.level}
                        grade={answer.grade}
                        major={answer.major}
                        figure={answer.figure}
                        profileImg={answer.profileImg}
                        content={answer.content}
                        img={answer.img}
                        like={answer.like}
                    />
                ))
            }

            {currentQuestion && initialUserData.map((user) => (
                <UserComment
                    post_id={currentQuestion.id}
                    name={user.name}
                    level={user.level}
                    grade={user.grade}
                    major={user.major}
                    figure={user.figure}
                    profileImg={user.profileImg}
                    limit={currentQuestion.limit}
                />
            ))}

            <FixedBottomContainer>
            </FixedBottomContainer>
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
`;