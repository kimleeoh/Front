import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import Questions from '../../components/Questions';
import CheckBar from '../../components/CheckBar';
import FixedIcon from '../../components/FixedIcon';

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
    },
    {
        id: 2,
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
        title: '미디어제작및실습 포토샵',
        content: '포토샵 재학생 인증 어떻게 하나요?? 알려주시면 좋은 행운이 찾아올 거예요~',
        subject: '미디어제작및실습',
        time: 15,
        read: 302,
        img: null,
        limit: 'false'
    },
];

const QnAPage = () => {
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
            <Header showIcon={false} text="Q&A" backButton={false} searchButton={true}/>
            <CheckBar text={'A등급 제한'}/>
            {questionData.map((question) => (
                <Questions
                    key={question.id}
                    id={question.id}  // id prop을 추가합니다.
                    title={question.title}
                    content={question.content}
                    subject={question.subject}
                    time={question.time}
                    read={question.read}
                    img={question.img}
                    limit={question.limit}
                />
            ))}

            <FixedIcon src="/Icons/Question.svg"/>
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
