import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Tips from '../../components/Tips';
import FixedIcon from '../../components/FixedIcon';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import BadgeFilter from '../../components/BadgeFilter';

const initialTipsData = [
    {
        id: 1,
        title: '숭실대 화장실 등급',
        content: '숭실대 건물들 화장실의 등급을 나눠봤습니다. 이용하실 때 참고 바랍니다.',
        subject: '디지털미디어원리',
        time: 5,
        read: 30,
        img: '/Icons/1607-2.jpg',
        point: 100
    },
    {
        id: 2,
        title: 'OOO교수님 수업',
        content: '+ 항상 채워주십니다. 진짜 최고예요 ㅠㅠ',
        subject: '컴퓨터시스템개론',
        time: 10,
        read: 88,
        img: '/Icons/1607-2.jpg',
        point: 200
    },
    {
        id: 3,
        title: '선배님들...',
        content: '마라탕 사주세요. 탕후루도..같이..?',
        subject: '미디어제작및실습',
        time: 15,
        read: 302,
        img: null,
        point: 150
    },
];

const TipsPage = () => {
    const [TipsData, setTipsData] = useState([]);

    useEffect(() => {
        //로컬 스토리지에서 질문 데이터 로드 또는 초기화
        localStorage.removeItem('TipsData');
        const TipsData = localStorage.getItem('TipsData');
        if (TipsData) {
            setTipsData(JSON.parse(TipsData));
        } else {
            localStorage.setItem('TipsData', JSON.stringify(initialTipsData));
            setTipsData(initialTipsData);
        }
    }, []);

    return (
        <Wrapper>
            <Header showIcon={false} text="Tips" backButton={false} searchButton={true}/>
            <BadgeFilter/>
            {TipsData.map((tip) => (
                <Tips
                    key={tip.id}
                    title={tip.title}
                    content={tip.content}
                    subject={tip.subject}
                    time={tip.time}
                    read={tip.read} 
                    img={tip.img}
                    point={tip.point}
                />
            ))}

            <FixedIcon src="/Icons/Pen.svg"/>
            <FixedBottomContainer>
                <NavBar state='Tips' />
            </FixedBottomContainer>
        </Wrapper>
    )
}

export default TipsPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;