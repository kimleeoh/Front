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
        id: '48578979aeb59a6b4e9668',
        name: '김난슬',
        major: '글로벌미디어학부',
        subject: '디지털미디어원리',
        title: '디미원 전공책 150 페이지 필기본 올립니다',
        content: '학생분들에게 도움이 되길 바랍니다',
        time: "2024-08-12T10:21:34.123Z",
        views: 30,
        like: 24,
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        filter: '필기공유'
    },
    {
        id: '789516539dib587bb4e9w88',
        name: '오준우',
        major: '글로벌미디어학부',
        subject: '컴퓨터시스템개론',
        title: 'OOO교수님 수업',
        content: '+ 항상 채워주십니다. 진짜 최고예요 ㅠㅠ',
        time: "2024-08-13T10:21:34.123Z",
        views: 88,
        like: 18,
        img: '/Icons/1607-2.jpg',
        filter: '수업꿀팁'
    },
    {
        id: '1297268189apq577bb4e609e',
        name: '이예진',
        major: '글로벌미디어학부',
        subject: '화장실론',
        title: '숭실대 화장실 등급',
        content: '숭실대 건물들 화장실의 등급을 나눠봤습니다. 이용하실 때 참고 바랍니다.',
        time: "2024-08-14T05:45:30.246Z",
        views: 30,
        like: 45,
        img: '/Icons/1607-2.jpg',
        filter: '수업꿀팁'
    },
];

const TipsPage = () => {
    const [TipsData, setTipsData] = useState([]);
    const [filteredTips, setFilteredTips] = useState([]);

    useEffect(() => {
        // Load TipsData from localStorage or initialize it
        localStorage.removeItem('TipsData');
        const TipsData = localStorage.getItem('TipsData');
        if (TipsData) {
            setTipsData(JSON.parse(TipsData));
            setFilteredTips(JSON.parse(TipsData)); // Initialize filteredTips with all tips
        } else {
            localStorage.setItem('TipsData', JSON.stringify(initialTipsData));
            setTipsData(initialTipsData);
            setFilteredTips(initialTipsData); // Initialize filteredTips with all tips
        }
    }, []);

    const handleFilterChange = (activeBadges) => {
        if (activeBadges.length === 0) {
            setFilteredTips(TipsData); // Show all tips if no filter is selected
        } else {
            const filtered = TipsData.filter(tip => activeBadges.includes(tip.filter));
            setFilteredTips(filtered);
        }
    };

    return (
        <Wrapper>
            <Header showIcon={false} text="Tips" backButton={false} searchButton={true}/>
            <BadgeFilter onFilterChange={handleFilterChange} />
            {filteredTips.map((tip) => (
                <Tips
                    key={tip.id}
                    id={tip.id}
                    name={tip.name}
                    major={tip.major}
                    subject={tip.subject}
                    title={tip.title}
                    content={tip.content}
                    time={tip.time}
                    views={tip.views}
                    like={tip.like}
                    img={Array.isArray(tip.img) ? tip.img[0] : tip.img} // Only the first image
                />
            ))}
            <FixedIcon src="/Icons/Pen.svg" url={'/tips/post'}/>
            <FixedBottomContainer>
                <NavBar state='Tips' />
            </FixedBottomContainer>
        </Wrapper>
    );
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
