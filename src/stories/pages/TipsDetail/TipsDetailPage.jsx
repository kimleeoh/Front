import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import QuestionsDetail from '../../components/QuestionsDetail';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import AnswersDetail from '../../components/AnswersDetail';
import UserComment from '../../components/UserComment';
import TipsDetail from '../../components/TipsDetail';

const initialTipsData = [
    {
        id: 1,
        name: '김난슬',
        major: '글로벌미디어학부',
        subject: '디지털미디어원리',
        title: '디미원 전공책 150 페이지 필기본 올립니다',
        content: '학생분들에게 도움이 되길 바랍니다',
        time: 5,
        read: 30,
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        filter: '필기공유'
    },
    {
        id: 2,
        name: '오준우',
        major: '글로벌미디어학부',
        subject: '컴퓨터시스템개론',
        title: 'OOO교수님 수업',
        content: '+ 항상 채워주십니다. 진짜 최고예요 ㅠㅠ',
        time: 10,
        read: 88,
        img: '/Icons/1607-2.jpg',
        filter: '수업꿀팁'
    },
    {
        id: 3,
        name: '이예진',
        major: '글로벌미디어학부',
        subject: '화장실론',
        title: '숭실대 화장실 등급',
        content: '숭실대 건물들 화장실의 등급을 나눠봤습니다. 이용하실 때 참고 바랍니다.',
        time: 5,
        read: 30,
        img: '/Icons/1607-2.jpg',
        filter: '수업꿀팁'
    },
];

const TipsDetailPage = () => {
    const { id } = useParams();
    const [tipData, setTipData] = useState([]);

    useEffect(() => {
        //로컬 스토리지에서 질문 데이터 로드 또는 초기화
        localStorage.removeItem('tipData');
        const tipData = localStorage.getItem('tipData');

        if (tipData) {
            setTipData(JSON.parse(tipData));
        } else {
            localStorage.setItem('tipData', JSON.stringify(initialTipsData));
            setTipData(initialTipsData);
        }
    }, []);
    const currentTip = tipData.find((tip) => tip.id === Number(id));

    return (
        <Wrapper>
            <Header showIcon={false} text={""} backButton={true} searchButton={false}/>
            {tipData.find(tip => tip.id === Number(id)) && (
                <TipsDetail
                    key={currentTip.id}
                    name={currentTip.name}
                    major={currentTip.major}
                    title={currentTip.title}
                    content={currentTip.content}
                    subject={currentTip.subject}
                    time={currentTip.time}
                    read={currentTip.read}
                    img={currentTip.img}
                />
            )}

            <FixedBottomContainer>
            </FixedBottomContainer>
        </Wrapper>
    );
}

export default TipsDetailPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;