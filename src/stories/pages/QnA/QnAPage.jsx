import React, { useState, useEffect } from 'react';
import BaseAxios from '../../../axioses/BaseAxios';
import styled from 'styled-components';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import Questions from '../../components/Common/Questions';
import CheckBar from '../../components/Common/CheckBar';
import FixedIcon from '../../components/Common/FixedIcon';

const initialQuestionData = [
    {
        id: '463846736919eqk876e4q91b9',
        title: '나이키스트 원리 저 진짜 하나도 모르겠어서 혼란스러운데 어떻게 안 될까요?',
        content: '나이키스트 관련 식 이렇게 이해하면 되나요?',
        subject: '디지털미디어원리',
        time: "2024-08-12T10:21:34.123Z",
        views: 30,
        like: 20,
        img: '/Icons/1607-2.jpg',
        limit: 'true'
    },
    {
        id: '7962156648w19eqk878e268qb',
        title: '자료구조',
        content: '스택이랑 큐의 차이점을 자세히 설명해 주세요 ㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠㅠ',
        subject: '컴퓨터시스템개론',
        time: "2024-08-13T10:21:34.123Z",
        views: 88,
        like: 48,
        img: '/Icons/1607-2.jpg',
        limit: 'false'
    },
    {
        id: '46848w9e98w19eqk878e2ea434',
        title: '미디어제작및실습 포토샵',
        content: '포토샵 재학생 인증 어떻게 하나요?? 알려주시면 좋은 행운이 찾아올 거예요~',
        subject: '미디어제작및실습',
        time: "2024-08-14T05:45:30.246Z",
        views: 302,
        like: 12,
        img: null,
        limit: 'false'
    },
];

const QnAPage = () => {
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);

    BaseAxios.get('/api/qna').then((result)=>{
        console.log(result.data)
    })

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
            <Header showIcon={false} text="Q&A" backButton={false} searchButton={true}/>
            <CheckBar text={'A등급 제한'} onChange={handleCheckBarChange} />
            {filteredQuestions.map((question) => (
                <Questions
                    key={question.id}
                    id={question.id}
                    title={question.title}
                    content={question.content}
                    subject={question.subject}
                    time={question.time}
                    views={question.views}
                    like={question.like}
                    img={question.img}
                    limit={question.limit}
                />
            ))}

            <FixedIcon src="/Icons/Question.svg" url={"/qna/post"}/>
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
