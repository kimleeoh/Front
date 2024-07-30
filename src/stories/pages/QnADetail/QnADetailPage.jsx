import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QuestionsDetail from '../../components/QuestionsDetail'
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';

const initialQuestionData = [
    {
        id: 1,
        title: '나이키스트 원리llllllllllllllllllllllll;;;;;;;;;;;;;;;;;;;;',
        content: '나이키스트 관련 식 이렇게 이해하면 되나요?',
        subject: '디지털미디어원리',
        time: 5,
        read: 30,
        img: '/Icons/1607-2.jpg',
        limit: 'true'
    }
]

const QnADetailPage = () => {
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
    return (
        <Wrapper>
            <Header showIcon={false} text="" backButton={true} searchButton={false}/>
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

            <FixedBottomContainer>
                <NavBar state='QnA' />
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