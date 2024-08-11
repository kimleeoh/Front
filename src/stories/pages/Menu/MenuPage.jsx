import react from 'react';
import styled from 'styled-components';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import MenuList from './MenuList';

const MenuPage = () => {
    return (
        <Wrapper>
            <Header>
                전체 메뉴
            </Header>
            <MyPage>
                <Profile>
                    <img src='/Icons/1607-2.jpg' alt='profile' width='62px' height='62px'/>
                    우치하 사스케
                </Profile>
                <MyPageArrow>
                        마이페이지
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
  <path d="M1.25 1.75L7.5 8L1.25 14.25" stroke="#ACB2BB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                    </MyPageArrow>
            </MyPage>

            <Section>
                <MenuList> 내 성적 </MenuList>
                <MenuList> 내 포인트 </MenuList>
                <Title> 게시물 </Title>
                <MenuList> 내가 쓴 글 </MenuList>
                <MenuList> 북마크 </MenuList>
                <MenuList> 최근 본 글 </MenuList>
                <Title> 도움말 </Title>
                <MenuList> 공지사항 </MenuList>
                <MenuList> 문의하기 </MenuList>
                <Title> 기타 </Title>
                <MenuList> 이용약관 </MenuList>
                <MenuList> 개인정보 처리방침 </MenuList>
                <MenuList> 운영정책 </MenuList>
                <MenuList> 로그아웃 </MenuList>

            </Section>

            <FixedBottomContainer>
                <NavBar state='menu' />
            </FixedBottomContainer>

        </Wrapper>
    );
};

export default MenuPage;

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
        transition: all 0.3s ease;
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
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;