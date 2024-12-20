import React, {
    useRef,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    useState,
} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import NavBar from "../../components/NavBar";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import MenuList from "./MenuList";
import Modal from "../../components/Common/Modal";
import Button from "../../components/Button";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import { UserContext } from "../../context/UserContext";

const MenuPage = () => {
    const modalRef = useRef();
    const modalNotifyRef = useRef();
    const navigate = useNavigate();
    const { userData, fetchUserData, setUserData, isLoading, error } =
        useContext(UserContext);
    const [modalNotifyContent, setModalNotifyContent] = useState(null);
    const [currentModalIndex, setCurrentModalIndex] = useState(0);
    const [totalModalNotifyContent, setTotalModalNotifyContent] =
        useState(null);
    const [isFetching, setIsFetching] = useState(false);

    // 페이지 첫 로드 시 /api/modal-notify 요청
    const fetchModalNotifyContent = useCallback(async () => {
        if (isFetching) return; // Prevent multiple calls

        setIsFetching(true);

        try {
            const response = await BaseAxios.get("/api/h/modal-notify");
            const data = response.data;
            console.log("modal-notify data: ", data);

            if (data && Array.isArray(data) && data[0] !== undefined) {
                setTotalModalNotifyContent(data);
                setCurrentModalIndex(0);

                setModalNotifyContent(data[0]);
                //console.log(modalNotifyContent);
                modalNotifyRef.current.open();
            }
        } catch (error) {
            console.error("Failed to fetch modal content:", error);
        } finally {
            setIsFetching(false);
        }
    }, [isFetching]);

    useEffect(() => {
        if (!userData && !isLoading && !error) {
            fetchUserData();
        }

        if (modalNotifyContent == null) fetchModalNotifyContent();
    }, [userData, isLoading, error, fetchUserData]);

    const { name, profile_Img } = useMemo(
        () => ({
            name: userData?.name || "Guest",
            profile_Img: userData?.profile_Img || "/Profile.svg",
        }),
        [userData]
    );

    const handleLogoutClick = useCallback(() => {
        modalRef.current.open();
    }, []);

    const confirmLogout = useCallback(async () => {
        try {
            await BaseAxios.delete("/api/l/logout");
            modalRef.current.close();
            setUserData(null);
            navigate("/");
        } catch (e) {
            console.log(e);
            setUserData(null);
            navigate("/");
        }
    }, [navigate]);

    const { width: windowSize } = useWindowSize();

    // 문의하기 버튼 클릭 시 알림창 표시
    const handleContactClick = () => {
        alert("nanseulgim1027@gmail.com으로 문의해주세요!");
    };

    // 문의하기 버튼 클릭 시 알림창 표시
    const handleRecentDocsClick = () => {
        alert("준비중인 기능입니다!");
    };

    const closeHandler = () => {
        modalNotifyRef.current.close();

        if (totalModalNotifyContent.length > 1) {
            if (currentModalIndex < totalModalNotifyContent.length) {
                const newIndex = currentModalIndex + 1;
                setCurrentModalIndex(newIndex);
                setModalNotifyContent(totalModalNotifyContent[newIndex]);
                modalNotifyRef.current.open();
            } else {
                setCurrentModalIndex(0);
            }
        }
    };

    return (
        <Wrapper>
            <TopLayout>
                <BlurBackground />
                <Head maxWidth={windowSize > 430 ? 400 : windowSize - 40}>
                    전체 메뉴
                </Head>
            </TopLayout>
            <Link
                to="/mypage"
                style={{ textDecoration: "none", width: "100%" }}
            >
                <MyPage maxWidth={windowSize}>
                    <Profile>
                        <img
                            //src={profile_Img}
                            src={"/Profile.svg"}
                            alt="프로필"
                            width="62px"
                            height="62px"
                        />
                        {name}
                    </Profile>
                    <MyPageArrow>
                        마이페이지
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="15"
                            viewBox="0 0 9 15"
                            fill="none"
                        >
                            <path
                                d="M1.75 1.25L8 7.5L1.75 13.75"
                                stroke="#ACB2BB"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </MyPageArrow>
                </MyPage>
            </Link>

            <Section maxWidth={windowSize}>
                <MenuList to="/grades" src={"/Icons/A+.svg"}>
                    내 성적
                </MenuList>
                <MenuList to="/points" src={"/Icons/point.svg"}>
                    내 포인트
                </MenuList>
                <MenuList to="/purchased" src={"/Icons/Purchased.svg"}>
                    내 구입목록
                </MenuList>
                <Title> 게시물 </Title>
                <MenuList to="/myboard" src={"/Icons/pencil.svg"}>
                    내가 쓴 글
                </MenuList>
                <MenuList to="/bookmarks" src={"/Icons/scrap.svg"}>
                    북마크한 글
                </MenuList>
                <MenuList to="/likes" src={"/Icons/thumb.svg"}>
                    좋아요한 글
                </MenuList>
                <MenuList
                    onClick={handleRecentDocsClick}
                    src={"/Icons/recent.svg"}
                >
                    최근 본 글
                </MenuList>
                <Title> 도움말 </Title>
                {/* <MenuList to="/notices" src={"/Icons/notice.svg"}>
                    공지사항
                </MenuList> */}
                {/* 문의하기 버튼에 onClick 이벤트 추가 */}
                <MenuList onClick={handleContactClick} src={"/Icons/speak.svg"}>
                    문의하기
                </MenuList>
                <Title> 기타 </Title>
                <MenuList to="/terms"> 이용약관 </MenuList>
                <MenuList onClick={handleLogoutClick}> 로그아웃 </MenuList>
            </Section>

            <FixedBottomContainer>
                <NavBar state="menu" />
            </FixedBottomContainer>

            <Modal ref={modalRef} width="300px">
                <span style={{ fontSize: "16px" }}>
                    정말 로그아웃 하시겠습니까?
                </span>
                <ButtonWrapper>
                    <Button
                        onClick={() => modalRef.current.close()}
                        label={"아니요"}
                        backgroundColor={"#434B60"}
                        hoverBackgroundColor={"#ACB2BB"}
                        width={"130px"}
                    />
                    <Button
                        onClick={confirmLogout}
                        label={"예"}
                        backgroundColor={"#FF3C3C"}
                        hoverBackgroundColor={"red"}
                        width={"130px"}
                    />
                </ButtonWrapper>
            </Modal>
            <Modal ref={modalNotifyRef} width="300px">
                <div dangerouslySetInnerHTML={{ __html: modalNotifyContent }} />
                <Button
                    onClick={closeHandler}
                    label={"확인"}
                    width={"130px"}
                />
            </Modal>
        </Wrapper>
    );
};

export default MenuPage;

// Styled Components
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 110px;
    margin-bottom: 100px;
    gap: 20px;
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
`;


// Styled Components
const TopLayout = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    z-index: 1000;
    padding: 10px;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
`;

const BlurBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(240, 242, 244, 0.3);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    z-index: -1;
`;

const Head = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)}px;
    box-sizing: border-box;
    height: 80px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: center;
    color: #434b60;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const MyPage = styled.div`
    display: flex;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    box-sizing: border-box;

    padding: 17px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-radius: 24px;
    background: #f0f2f4;
    transition: all 0.3s ease;
    &:active {
        scale: 0.95;
    }
    cursor: pointer;
    margin: 0 auto;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    color: #434b60;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const MyPageArrow = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: #acb2bb;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const Title = styled.div`
    display: flex;
    width: 184px;
    height: 38px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #434b60;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-left: 6px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    gap: 10px;
`;
