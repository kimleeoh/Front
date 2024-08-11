import React from 'react';
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
import QnABoard from './stories/pages/Board/QnABoard';

import MenuPage from './stories/pages/Menu/MenuPage';

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
                <Route path="/qna/:id" element={<QnADetailPage />} />
                <Route path="/board/:subject" element={<QnABoard />} />

                <Route path="/menu" element={<MenuPage />} />
            </Routes>
        </Router>
    );
};

export default App;
