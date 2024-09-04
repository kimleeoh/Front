import React, { useEffect } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './stories/pages/OnBoarding/StartPage'; 
import SignUpPage from './stories/pages/OnBoarding/SignUpPage'; 

import HomePage from './stories/pages/Home/HomePage';
import AlertPage from './stories/pages/Home/AlertPage';
import QnAPage from './stories/pages/QnA/QnAPage'; 
import TipsPage from './stories/pages/Tips/TipsPage'; 
import Searching from './stories/pages/Searching';

import QnADetailPage from './stories/pages/QnADetail/QnADetailPage';
import TipsDetailPage from './stories/pages/TipsDetail/TipsDetailPage';
import PostTipPage from './stories/pages/PostTip/PostTipPage';
import PostQuestionPage from './stories/pages/PostQuestion/PostQuestionPage';
import BoardHome from './stories/pages/Board/BoardHome';
import EditBoardPage from './stories/pages/EditBoard/EditBoardPage';
import UnifiedBoard from './stories/pages/Board/UnifiedBoard';

import MenuPage from './stories/pages/Menu/MenuPage';
import MyPage from './stories/pages/Menu/Mypage';
import Grades from './stories/pages/Menu/Grades';
import GradeRegister from './stories/pages/Menu/GradeRegister';
import MyBoard from './stories/pages/Menu/MyBoard';
import Bookmarks from './stories/pages/Menu/Bookmarks';
import History from './stories/pages/Menu/History';
import TermsOfServicePage from './stories/pages/Menu/TermsOfServicePage';

import Error from './stories/pages/Error';
import Loading from './stories/pages/Loading';

const App = () => {
    const [loading, setLoading] = React.useState(true);

    const mainApi = async () => {
        try {
            // 여기에 API 호출 코드를 작성합니다.
            
        } catch (error) {
            window.alert('API 호출에 실패했습니다.');
        } finally {
            setLoading(false); // API 호출이 끝나면 로딩 상태를 false로 설정
        }
    };

    useEffect(() => {
        mainApi();
    }, []);

    if (loading) {
        return <Loading />; // 로딩 중일 때 Loading 컴포넌트를 표시
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/search" element={<Searching />} />
                
                <Route path="/home" element={<HomePage />} />
                <Route path="/notification" element={<AlertPage />} />
                <Route path="/qna" element={<QnAPage />} />
                <Route path="/qna/:_id" element={<QnADetailPage />} />
                <Route path="/qna/post" element={<PostQuestionPage />} />
                <Route path="/tips" element={ <TipsPage />} />
                <Route path="/tips/:_id" element={<TipsDetailPage />} />
                <Route path="/tips/post" element={<PostTipPage />} />
                <Route path="/board" element={<BoardHome />} />
                <Route path="/edit-board" element={<EditBoardPage />} />
                <Route path="/board/:subject" element={<UnifiedBoard />} />

                <Route path="/menu" element={<MenuPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/grades/verify" element={<GradeRegister />} />
                <Route path="/myboard" element={<MyBoard />} />
                <Route path="/bookmarks" element={<Bookmarks />} />
                <Route path="/history" element={<History />} />
                <Route path="/terms" element={<TermsOfServicePage />} />

                <Route path="/*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default App;
