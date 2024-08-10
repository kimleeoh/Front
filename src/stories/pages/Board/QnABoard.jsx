import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    {
        id: 4,
        name: '이예진',
        major: '글로벌미디어학부',
        title: '표본화 양자화 부호화',
        content: '각각을 한 문장으로 정리할 수 있다면?',
        subject: '디지털미디어원리',
        time: 5,
        read: 30,
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        limit: 'false'
    },
]

const QnABoard = () => {
    const { subject } = useParams();
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);

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

    const handleCheckBarChange = (isChecked) => {
        setIsAGradeOnly(isChecked);
    };

    const filteredQuestions = isAGradeOnly
        ? questionData.filter(question => question.limit === 'true')
        : questionData;

    return (
        <Wrapper>
            <Header showIcon={false} text={subject} backButton={true} searchButton={true}/>
            <CheckBar text={'A등급 제한'} onChange={handleCheckBarChange} />
            {filteredQuestions
                .filter(question => question.subject === subject)
                .map((question) => (
                    <Questions
                        key={question.id}
                        id={question.id}
                        title={question.title}
                        content={question.content}
                        subject={question.subject}
                        time={question.time}
                        read={question.read}
                        img={Array.isArray(question.img) ? question.img[0] : question.img} // Only the first image
                        limit={question.limit}
                    />
                ))
            }
            <FixedIcon src="/Icons/Question.svg" url={"/qna/post"}/>
            <FixedBottomContainer>
                <NavBar state='QnA' />
            </FixedBottomContainer>
        </Wrapper>
    );
}

export default QnABoard;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;