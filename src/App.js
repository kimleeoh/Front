import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StartPage from './stories/pages/OnBoarding/StartPage'; // 스토리북 페이지 컴포넌트



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
            </Routes>
        </Router>
    );
};

export default App;
