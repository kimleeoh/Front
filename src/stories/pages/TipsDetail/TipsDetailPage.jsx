import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import TipsDetail from './TipsDetail';

// const initialTipsData = [
//     {
//         _id: '48578979aeb59a6b4e9668',
//         name: '김난슬',
//         major: '글로벌미디어학부',
//         subject: '디지털미디어원리',
//         title: '디미원 전공책 150 페이지 필기본 올립니다',
//         content: '학생분들에게 도움이 되길 바랍니다',
//         time: "2024-08-12T10:21:34.123Z",
//         views: 30,
//         like: 24,
//         img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
//         filter: '필기공유'
//     },
//     {
//         _id: '789516539dib587bb4e9w88',
//         name: '오준우',
//         major: '글로벌미디어학부',
//         subject: '컴퓨터시스템개론',
//         title: 'OOO교수님 수업',
//         content: '+ 항상 채워주십니다. 진짜 최고예요 ㅠㅠ',
//         time: "2024-08-13T10:21:34.123Z",
//         views: 88,
//         like: 18,
//         img: '/Icons/1607-2.jpg',
//         filter: '수업꿀팁'
//     },
//     {
//         _id: '1297268189apq577bb4e609e',
//         name: '이예진',
//         major: '글로벌미디어학부',
//         subject: '화장실론',
//         title: '숭실대 화장실 등급',
//         content: '숭실대 건물들 화장실의 등급을 나눠봤습니다. 이용하실 때 참고 바랍니다.',
//         time: "2024-08-14T05:45:30.246Z",
//         views: 30,
//         like: 45,
//         img: '/Icons/1607-2.jpg',
//         filter: '수업꿀팁'
//     },
// ];

const TipsDetailPage = () => {
    const { _id } = useParams();
    const [tipData, setTipData] = useState([]);

    // useEffect(() => {
    //     //로컬 스토리지에서 질문 데이터 로드 또는 초기화
    //     localStorage.removeItem('tipData');
    //     const tipData = localStorage.getItem('tipData');

    //     if (tipData) {
    //         setTipData(JSON.parse(tipData));
    //     } else {
    //         localStorage.setItem('tipData', JSON.stringify(initialTipsData));
    //         setTipData(initialTipsData);
    //     }
    // }, []);
    const currentTip = tipData.find((tip) => tip._id === String(_id));

    return (
        <Wrapper>
            <Header showIcon={false} text={""} backButton={true} searchButton={false}/>
            {tipData.find(tip => tip._id === String(_id)) && (
                <TipsDetail
                    key={currentTip._id}
                    _id={currentTip._id}
                    name={currentTip.name}
                    major={currentTip.major}
                    title={currentTip.title}
                    content={currentTip.content}
                    subject={currentTip.subject}
                    time={currentTip.time}
                    views={currentTip.views}
                    like={currentTip.like}
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