import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StartPage from './stories/pages/OnBoarding/StartPage'; // 스토리북 페이지 컴포넌트
import QnAPage from './stories/pages/QnA/QnAPage'; 
import TipsPage from './stories/pages/Tips/TipsPage'; 

import QnADetailPage from './stories/pages/QnADetail/QnADetailPage';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                            <StartPage />
                    }
                />
                <Route
                    path="/qna"
                    element={
                            <QnAPage />
                    }
                />
                <Route path="/qna/:id" element={<QnADetailPage />} />
                <Route
                    path="/tips"
                    element={
                            <TipsPage />
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
