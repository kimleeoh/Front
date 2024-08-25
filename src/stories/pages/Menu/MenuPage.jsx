import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import MenuList from './MenuList';
import Modal from '../../components/Common/Modal';

const MenuPage = () => {
    const modalRef = useRef();

    const handleLogoutClick = () => {
        modalRef.current.open();
    };

    const confirmLogout = () => {
        // 로그아웃 로직을 여기에 추가합니다.
        modalRef.current.close();
        // 예를 들어, 로그아웃 API를 호출하거나, 로그인 페이지로 이동
    };

    return (
        <Wrapper>
            <Header>
                전체 메뉴
            </Header>
            <Link to="/mypage" style={{ textDecoration: 'none' }}>
                <MyPage>
                    <Profile>
                        <img src='/TempProfile.jpg' alt='profile' width='62px' height='62px' style={{ borderRadius: '50%' }}/>
                        우치하 사스케
                    </Profile>
                    <MyPageArrow>
                        마이페이지
                    </MyPageArrow>
                </MyPage>
            </Link>

            <Section>
                <MenuList to="/grades"> 내 성적 </MenuList>
                <MenuList to="/points"> 내 포인트 </MenuList>
                <Title> 게시물 </Title>
                <MenuList to="/myboard"> 내가 쓴 글 </MenuList>
                <MenuList to="/bookmarks"> 북마크 </MenuList>
                <MenuList to="/history"> 최근 본 글 </MenuList>
                <Title> 도움말 </Title>
                <MenuList to="/notices"> 공지사항 </MenuList>
                <MenuList to="/contact"> 문의하기 </MenuList>
                <Title> 기타 </Title>
                <MenuList to="/terms"> 이용약관 </MenuList>
                <MenuList to="/privacy"> 개인정보 처리방침 </MenuList>
                <MenuList to="/policies"> 운영정책 </MenuList>
                <MenuList onClick={handleLogoutClick}> 로그아웃 </MenuList>
            </Section>

            <FixedBottomContainer>
                <NavBar state='menu' />
            </FixedBottomContainer>

            <Modal ref={modalRef}>
                <p>정말 로그아웃 하시겠습니까?</p>
                <ButtonWrapper>
                    <button onClick={confirmLogout}>예</button>
                    <button onClick={() => modalRef.current.close()}>아니오</button>
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
`;

const Header = styled.div`
    display: flex;
    width: 393px;
    height: 88px;
    padding: 10px 20px;
    justify-content: space-between;
    align-items: flex-end;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(3px);
    color: #434B60;
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
    width: 358px;
    height: 62px;
    padding: 17px;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    border-radius: 24px;
    background: #F0F2F4;
    transition: all 0.3s ease;
    &:active {
        scale: 0.95;
    }
    cursor: pointer;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    color: #434B60;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const MyPageArrow = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    color: #ACB2BB;
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
`;

const Title = styled.div`
    display: flex;
    width: 184px;
    height: 38px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #434B60;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;
