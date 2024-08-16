import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import Questions from '../../components/Questions';
import CheckBar from '../../components/CheckBar';
import FixedIcon from '../../components/FixedIcon';
import TabNavigation from '../../components/TabNavigation';
import BadgeFilter from '../../components/BadgeFilter';
import Tips from '../../components/Tips';

const initialQuestionData = [
    {
        id: '463846736919eqk876e4q91b9',
        name: '이예진',
        major: '글로벌미디어학부',
        title: '나이키스트 원리 저 진짜 하나도 모르겠어서 혼란스러운데 어떻게 안 될까요?',
        content: '나이키스트 관련 식 이렇게 이해하면 되나요?',
        subject: '디지털미디어원리',
        time: "2024-08-12T10:21:34.123Z",
        views: 30,
        like: 20,
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        limit: 'true'
    },
    {
        id: '7962156648w19eqk878e268qb',
        name: '오준우',
        major: '글로벌미디어학부',
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
        name: '이동현',
        major: '글로벌미디어학부',
        title: '미디어제작및실습 포토샵',
        content: '포토샵 재학생 인증 어떻게 하나요?? 알려주시면 좋은 행운이 찾아올 거예요~',
        subject: '미디어제작및실습',
        time: "2024-08-14T05:45:30.246Z",
        views: 302,
        like: 12,
        img: null,
        limit: 'false'
    },
    {
        id: '2039920a89jbs25k8394abd46',
        name: '이예진',
        major: '글로벌미디어학부',
        title: '표본화 양자화 부호화',
        content: '각각을 한 문장으로 정리할 수 있다면?',
        subject: '디지털미디어원리',
        time: "2024-08-14T05:45:30.246Z",
        views: 30,
        like: 15,
        img: ['/Icons/1607-2.jpg', '/Icons/22376525_6628724.jpg'],
        limit: 'false'
    },
]

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
        img: '/Icons/1607-2.jpg',
        filter: '수업꿀팁'
    },
];

const UnifiedBoard = () => {
    const { subject } = useParams();
    // QnA 관련
    const [questionData, setQuestionData] = useState([]);
    const [isAGradeOnly, setIsAGradeOnly] = useState(false);

    // Tips 관련
    const [TipsData, setTipsData] = useState([]);
    const [filteredTips, setFilteredTips] = useState([]);

    const [activeTab, setActiveTab] = useState('QnA');

    useEffect(() => {
        // QnA
        localStorage.removeItem('questionData');
        const questionData = localStorage.getItem('questionData');
        if (questionData) {
            setQuestionData(JSON.parse(questionData));
        } else {
            localStorage.setItem('questionData', JSON.stringify(initialQuestionData));
            setQuestionData(initialQuestionData);
        }

        // Tips
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

    // QnA 관련
    const handleCheckBarChange = (isChecked) => {
        setIsAGradeOnly(isChecked);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const filteredQuestions = isAGradeOnly
        ? questionData.filter(question => question.limit === 'true')
        : questionData;

    // Tips 관련
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
            <Header showIcon={false} text={subject} backButton={true} searchButton={true}/>
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
            {activeTab === 'QnA' && (
                <>
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
                                views={question.views}
                                like={question.like}
                                img={Array.isArray(question.img) ? question.img[0] : question.img}
                                limit={question.limit}
                            />
                        ))
                    }
                    <FixedIcon src="/Icons/Question.svg" url={"/qna/post"}/>
                    <FixedBottomContainer>
                        <NavBar state='QnA' />
                    </FixedBottomContainer>
                </>
            )}

            {activeTab === 'Tips' && (
                <>
                    <BadgeFilter onFilterChange={handleFilterChange} />
                    {filteredTips
                        .filter(tips => tips.subject === subject)
                        .map((tip) => (
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
                        ))
                    }
                    <FixedIcon src="/Icons/Pen.svg" url={'/tips/post'}/>
                    <FixedBottomContainer>
                        <NavBar state='Board' />
                    </FixedBottomContainer>
                </>
            )}
        </Wrapper>
    );
}

export default UnifiedBoard;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;