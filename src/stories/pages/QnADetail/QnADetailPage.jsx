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
        title: '나이키스트 원리',
        content: '나이키스트 관련 식 이렇게 이해하면 되나요?',
        subject: '디지털미디어원리',
        time: 5,
        read: 30,
        img: '/Icons/1607-2.jpg',
        limit: 'true'
    }
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
    }
]

const initialUserData = [
    {
        id: 1,
        name: '이예진',
        level: 13,
        grade: null,
        figure: null,
        major: '글로벌미디어학부',
        profileImg: '/Icons/Pen.svg',
    }
]

const QnADetailPage = () => {
    const { id } = useParams();
    const [questionData, setQuestionData] = useState([]);

    useEffect(() => {
        //로컬 스토리지에서 질문 데이터 로드 또는 초기화
        localStorage.removeItem('questionData');
        const questionData = localStorage.getItem('questionData');
        if (questionData) {
            setQuestionData(JSON.parse(questionData));
        } else {
            localStorage.setItem('questionData', JSON.stringify(initialQuestionData));
            setQuestionData(initialQuestionData);
        }
    }, []);

    const currentQuestion = questionData.find((question) => question.id === Number(id));
    
    return (
        <Wrapper>
            <Header showIcon={false} text={""} backButton={true} searchButton={false}/>
            {questionData.map((question) => (
                <QuestionsDetail
                    key={question.id}
                    title={question.title}
                    content={question.content}
                    subject={question.subject}
                    time={question.time}
                    read={question.read}
                    img={question.img}
                    limit={question.limit}
                />
            ))}

            {initialAnswerData.map((answer) => (
                <AnswersDetail
                    name={answer.name}
                    level={answer.level}
                    grade={answer.grade}
                    major={answer.major}
                    figure={answer.figure}
                    profileImg={answer.profileImg}
                    content={answer.content}
                    img={answer.img}
                />
            ))}

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