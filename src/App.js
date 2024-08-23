import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route, useLocation, Switch  } from 'react-router-dom';
import StartPage from './stories/pages/OnBoarding/StartPage'; // 스토리북 페이지 컴포넌트
import SignUpPage from './stories/pages/OnBoarding/SignUpPage'; // 스토리북 페이지 컴포넌트

import HomePage from './stories/pages/Home/HomePage';
import QnAPage from './stories/pages/QnA/QnAPage'; 
import TipsPage from './stories/pages/Tips/TipsPage'; 

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
import MyBoard from './stories/pages/Menu/MyBoard';
import Bookmarks from './stories/pages/Menu/Bookmarks';
import History from './stories/pages/Menu/History';
import TermsOfServicePage from './stories/pages/Menu/TermsOfServicePage';

import Error from './stories/pages/Error';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                
                <Route path="/home" element={<HomePage />} />
                <Route path="/qna" element={<QnAPage />} />
                <Route path="/qna/:id" element={<QnADetailPage />} />
                <Route path="/qna/post" element={<PostQuestionPage />} />
                <Route path="/tips" element={ <TipsPage />} />
                <Route path="/tips/:id" element={<TipsDetailPage />} />
                <Route path="/tips/post" element={<PostTipPage />} />
                <Route path="/board" element={<BoardHome />} />
                <Route path="/edit-board" element={<EditBoardPage />} />
                <Route path="/qna/:id" element={<QnADetailPage />} />
                <Route path="/board/:subject" element={<UnifiedBoard />} />

                <Route path="/menu" element={<MenuPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/grades" element={<Grades />} />
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
