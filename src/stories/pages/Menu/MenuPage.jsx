import React, {
    useRef,
    useContext,
    useEffect,
    useMemo,
    useCallback,
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
    const navigate = useNavigate();
    const { userData, fetchUserData, isLoading, error } =
        useContext(UserContext);

    // 최초 마운트 시에만 데이터를 가져옵니다.
    useEffect(() => {
        if (!userData && !isLoading && !error) {
            fetchUserData();
        }
    }, [userData, isLoading, error, fetchUserData]);

    // userData에서 파생되는 값들을 memoize
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
            await BaseAxios.delete("/api/logout");
            modalRef.current.close();
            navigate("/");
        } catch (e) {
            console.log(e);
            navigate("/");
        }
    }, [navigate]);

    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper>
            <Header maxWidth={windowSize}>전체 메뉴</Header>
            <Link
                to="/mypage"
                style={{ textDecoration: "none", width: "100%" }}
            >
                <MyPage maxWidth={windowSize}>
                    <Profile>
                        <img
                            src={profile_Img}
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
                <MenuList to="/grades" src={"/icons/A+.svg"}>
                    {" "}
                    내 성적{" "}
                </MenuList>
                <MenuList to="/points" src={"/icons/point.svg"}>
                    {" "}
                    내 포인트{" "}
                </MenuList>
                <MenuList to="/purchased" src={"/icons/purchased.svg"}>
                    {" "}
                    내 구입목록{" "}
                </MenuList>
                <Title> 게시물 </Title>
                <MenuList to="/myboard" src={"/icons/pencil.svg"}>
                    {" "}
                    내가 쓴 글{" "}
                </MenuList>
                <MenuList to="/bookmarks" src={"/icons/scrap.svg"}>
                    {" "}
                    북마크한 글{" "}
                </MenuList>
                <MenuList to="/likes" src={"/icons/thumb.svg"}>
                    {" "}
                    좋아요한 글{" "}
                </MenuList>
                <MenuList to="/history" src={"/icons/recent.svg"}>
                    {" "}
                    최근 본 글{" "}
                </MenuList>
                <Title> 도움말 </Title>
                <MenuList to="/notices" src={"/icons/notice.svg"}>
                    {" "}
                    공지사항{" "}
                </MenuList>
                <MenuList to="/mycontact" src={"/icons/speak.svg"}>
                    {" "}
                    문의하기{" "}
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

const Header = styled.div`
    display: flex;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    box-sizing: border-box;
    height: 88px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: flex-end;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    color: #434b60;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    position: fixed;
    top: 0;
    z-index: 1000;
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
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    gap: 10px;
`;
