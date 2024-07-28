import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import Questions from '../../components/Questions';

const initialQuestionData = [
    {
        id: 1,
        title: '나이키스트 어쩌구',
        content: '내용어쩌구',
        subject: '디지털미디어원리',
        time: '5분전',
        read: '30'
    },
    {
        id: 2,
        title: '나이키스트 어쩌구',
        content: '내용어쩌구',
        subject: '디지털미디어원리',
        time: '5분전',
        read: '30'
    },
    {
        id: 3,
        title: '나이키스트 어쩌구',
        content: '내용어쩌구',
        subject: '디지털미디어원리',
        time: '5분전',
        read: '30'
    },
];

const QnAPage = () => {
    const [questionData, setQuestionData] = useState([]);

    useEffect(() => {
        //로컬 스토리지에서 질문 데이터 로드 또는 초기화
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
            <Header showIcon={false} text="Q&A" backButton={true} />
            {questionData.map((question) => (
                <Questions
                    key={question.id}
                    title={question.title}
                    content={question.content}
                    subject={question.subject}
                    time={question.time}
                    read={question.read}

                />
            ))}

            

            <FixedBottomContainer>
                <NavBar state='QnA' />
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
    margin-top: 100px;
    margin-bottom: 100px;
`;