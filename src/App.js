import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./stories/pages/Loading"; // 로딩 컴포넌트
import UserProvider, { UserContext } from "./stories/context/UserContext"; // UserProvider 컴포넌트
import { User } from "lucide-react";

// React.lazy를 이용한 동적 import
const StartPage = lazy(() => import("./stories/pages/OnBoarding/StartPage"));
const LoginPage = lazy(() => import("./stories/pages/OnBoarding/LoginPage"));
const SignUpPage = lazy(() => import("./stories/pages/OnBoarding/SignUpPage"));
const ResetPage = lazy(() => import("./stories/pages/OnBoarding/ResetPage"));
const HomePage = lazy(() => import("./stories/pages/Home/HomePage"));
const NotificationPage = lazy(
    () => import("./stories/pages/Home/NotificationPage")
);
const QnAPage = lazy(() => import("./stories/pages/QnA/QnAPage"));
const TipsPage = lazy(() => import("./stories/pages/Tips/TipsPage"));
const Searching = lazy(() => import("./stories/pages/Searching"));
const QnADetailPage = lazy(
    () => import("./stories/pages/QnADetail/QnADetailPage")
);
const TipsDetailPage = lazy(
    () => import("./stories/pages/TipsDetail/TipsDetailPage")
);
const PostsDetail = lazy(() => import("./stories/pages/Posts/PostsDetail"));
const Report = lazy(() => import("./stories/pages/Report"));
const PostTipPage = lazy(() => import("./stories/pages/PostTip/PostTipPage"));
const PostQuestionPage = lazy(
    () => import("./stories/pages/PostQuestion/PostQuestionPage")
);
const BoardHome = lazy(() => import("./stories/pages/Board/BoardHome"));
const EditBoardPage = lazy(
    () => import("./stories/pages/EditBoard/EditBoardPage")
);
const UnifiedBoard = lazy(() => import("./stories/pages/Board/UnifiedBoard"));

const MenuPage = lazy(() => import("./stories/pages/Menu/MenuPage"));
const MyPage = lazy(() => import("./stories/pages/Menu/Mypage"));
const MyPageEdit = lazy(() => import("./stories/pages/Menu/MypageEdit"));
const BadgeDetail = lazy(() => import("./stories/pages/Menu/BadgeDetail"));
const PointPage = lazy(() => import("./stories/pages/Point/PointPage"));
const Purchased = lazy(() => import("./stories/pages/Menu/Purchased"));
const Grades = lazy(() => import("./stories/pages/Menu/Grades"));
const GradesRegister = lazy(() => import("./stories/pages/Menu/GradeRegister"));
const MyBoard = lazy(() => import("./stories/pages/Menu/MyBoard"));
const Bookmarks = lazy(() => import("./stories/pages/Menu/Bookmarks"));
const Likes = lazy(() => import("./stories/pages/Menu/Likes"));
const History = lazy(() => import("./stories/pages/Menu/History"));
const TermsOfServicePage = lazy(
    () => import("./stories/pages/Menu/TermsOfServicePage")
);
const Notices = lazy(() => import("./stories/pages/Menu/Notices"));
const MyContact = lazy(() => import("./stories/pages/Menu/MyContact"));
const Contact = lazy(() => import("./stories/pages/Menu/Contact"));

const ConfirmationPage = lazy(
    () => import("./stories/pages/Confirmation/ConfirmationPage")
);
const Submit = lazy(() => import("./stories/pages/Confirmation/Submit"));
const Alert = lazy(() => import("./stories/pages/Confirmation/Alert"));

const Error = lazy(() => import("./stories/pages/Error"));
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught in Error Boundary:", error);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

const App = () => {
    const [loading, setLoading] = React.useState(true);

    const mainApi = async () => {
        try {
            // 여기에 API 호출 코드를 작성합니다.
        } catch (error) {
            window.alert("API 호출에 실패했습니다.");
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
        <ErrorBoundary>
            <UserProvider>
                <Router>
                    {/* Suspense로 컴포넌트를 로드할 때 보여줄 fallback UI */}
                    <Suspense fallback={<Loading />}>
                        <Routes>
                            <Route path="/" element={<StartPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/reset" element={<ResetPage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route
                                path="/notification"
                                element={<NotificationPage />}
                            />
                            <Route path="/qna" element={<QnAPage />} />
                            <Route
                                path="/qna/:_id"
                                element={<QnADetailPage />}
                            />
                            <Route
                                path="/qna/post"
                                element={<PostQuestionPage />}
                            />
                            <Route path="/tips" element={<TipsPage />} />
                            <Route
                                path="/tips/:category_type/:_id"
                                element={<TipsDetailPage />}
                            />
                            <Route
                                path="/tips/post"
                                element={<PostTipPage />}
                            />
                            <Route
                                path="/:category/:_id"
                                element={<PostsDetail />}
                            />
                            <Route
                                path="/:category/:_id/report"
                                element={<Report />}
                            />
                            <Route path="/board" element={<BoardHome />} />
                            <Route
                                path="/edit-board"
                                element={<EditBoardPage />}
                            />
                            <Route
                                path="/board/:subject"
                                element={<UnifiedBoard />}
                            />
                            <Route path="/search" element={<Searching />} />

                            <Route path="/menu" element={<MenuPage />} />
                            <Route path="/mypage" element={<MyPage />} />
                            <Route
                                path="/mypage/edit"
                                element={<MyPageEdit />}
                            />

                            <Route path="/badge" element={<BadgeDetail />} />
                            <Route path="/points" element={<PointPage />} />
                            <Route path="/purchased" element={<Purchased />} />
                            <Route path="/grades" element={<Grades />} />
                            <Route
                                path="/grades/register"
                                element={<GradesRegister />}
                            />
                            <Route path="/myboard" element={<MyBoard />} />
                            <Route path="/bookmarks" element={<Bookmarks />} />
                            <Route path="/likes" element={<Likes />} />
                            <Route path="/history" element={<History />} />
                            <Route
                                path="/terms"
                                element={<TermsOfServicePage />}
                            />
                            <Route path="/notices" element={<Notices />} />
                            <Route path="/mycontact" element={<MyContact />} />
                            <Route path="/contact" element={<Contact />} />

                            <Route
                                path="/confirm"
                                element={<ConfirmationPage />}
                            />
                            <Route
                                path="/confirm/newComer"
                                element={<Submit />}
                            />
                            <Route
                                path="/confirm/registeredStudent"
                                element={<Submit />}
                            />
                            <Route
                                path="/confirm/graduate"
                                element={<Submit />}
                            />
                            <Route path="/verify" element={<Alert />} />

                            <Route path="/*" element={<Error />} />
                        </Routes>
                    </Suspense>
                </Router>
            </UserProvider>
        </ErrorBoundary>
    );
};

export default App;
