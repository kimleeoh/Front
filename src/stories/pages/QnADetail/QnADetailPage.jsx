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
        id: 1,
        name: '이예진',
        major: '글로벌미디어학부',
        title: '나이키스트 원리',
        content: '나이키스트 관련 식 이렇게 이해하면 되나요?',
        subject: '디지털미디어원리',
        time: 5,
        read: 30,
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        limit: 'true'
    },
    {
        id: 2,
        name: '오준우',
        major: '글로벌미디어학부',
        title: '자료구조',
        content: '스택이랑 큐의 차이점을 자세히 설명해 주세요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
        subject: '컴퓨터시스템개론',
        time: 10,
        read: 88,
        img: '/Icons/1607-2.jpg',
        limit: 'false'
    },
    {
        id: 3,
        name: '이동현',
        major: '글로벌미디어학부',
        title: '미디어제작및실습 포토샵',
        content: '포토샵 재학생 인증 어떻게 하나요?? 알려주시면 좋은 행운이 찾아올 거예요~',
        subject: '미디어제작및실습',
        time: 15,
        read: 302,
        img: null,
        limit: 'false'
    },
]

const initialAnswerData = [
    {
        id: 1,
        name: '오준우',
        level: 15,
        grade: 'A+',
        figure: 1,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
        content: '1번 답: 01101101',
        img: "/Icons/1607-2.jpg"
    },
    {
        id: 2,
        name: '김난슬',
        level: 15,
        grade: 'A+',
        figure: 1,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
        content: '몰라이씨',
        img: "/Icons/1607-2.jpg"
    },
    {
        id: 3,
        name: '이동현',
        level: 15,
        grade: 'A+',
        figure: 1,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
        content: '채택해 주세요.',
        img: "/Icons/1607-2.jpg"
    }
]

const initialUserData = [
    {
        id: 1,
        name: '이예진',
        level: 13,
        grade: 'A+',
        figure: 1,
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

    const currentQuestion = questionData.find((question) => question.id === Number(id));
    const currentAnswer = answerData.find((answer) => answer.id === Number(id));
    
    return (
        <Wrapper>
            <Header showIcon={false} text={""} backButton={true} searchButton={false}/>
            {questionData.find(question => question.id === Number(id)) && (
                <QuestionsDetail
                    key={currentQuestion.id}
                    name={currentQuestion.name}
                    major={currentQuestion.major}
                    title={currentQuestion.title}
                    content={currentQuestion.content}
                    subject={currentQuestion.subject}
                    time={currentQuestion.time}
                    read={currentQuestion.read}
                    img={currentQuestion.img}
                    limit={currentQuestion.limit}
                />
            )}

            {answerData.find(answer => answer.id === Number(id)) && (
                <AnswersDetail
                    name={currentAnswer.name}
                    level={currentAnswer.level}
                    grade={currentAnswer.grade}
                    major={currentAnswer.major}
                    figure={currentAnswer.figure}
                    profileImg={currentAnswer.profileImg}
                    content={currentAnswer.content}
                    img={currentAnswer.img}
                />
            )}

            {initialUserData.map((user) => (
                <UserComment
                    name={user.name}
                    level={user.level}
                    grade={user.grade}
                    major={user.major}
                    figure={user.figure}
                    profileImg={user.profileImg}
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