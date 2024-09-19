import React, { useState } from "react";
import styled from "styled-components";
import TabNavigation from "../../components/Common/TabNavigation";
import { useNavigate } from 'react-router-dom';
import ProgressBar from "../../components/Common/ProgressBar";
import BoardTitle from "../../components/Common/BoardTitle";
import SubjectList from "../../components/Common/SubjectList";
import TextField from "../../components/TextField";
import TextArea from "../../components/Common/TextArea";

const MyPageEdit = () => {
  const [activeTab, setActiveTab] = useState("프로필");
  const [profileImage, setProfileImage] = useState("/Profile.svg"); // 기본 프로필 이미지
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // 이미지 업로드 후 업데이트
    }
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={() => navigate('/mypage')}>
          <img src="/Icons/Icon_arrow.svg" alt="뒤로 가기" />
        </BackButton>
        <ProfileName></ProfileName>
        <Save>저장</Save>
      </Header>
      <Profile>
        <ProfileImageWrapper>
        <img src={profileImage} alt="프로필" width='100px' height='100px' style={{ borderRadius: '50%' }} />
          <EditButton onClick={() => document.getElementById('imageUpload').click()} />
          <HiddenFileInput 
            id="imageUpload"
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
        </ProfileImageWrapper>
        <ProfileInfo>
          <TextField value="Guest" width={'85%'}/>
          <InfoBox>
            <DetailInfo>작성한 꿀팁<Measurement>20</Measurement></DetailInfo>
            <DetailInfo>작성한 답변<Measurement>20</Measurement></DetailInfo>
            <DetailInfo>명성<Measurement>1000</Measurement></DetailInfo>
          </InfoBox>
        </ProfileInfo>
      </Profile>
      <Introduction>
        소개
        <IntroductionBox><TextArea width={'95%'} backgroundColor={'#e2e5e9'} fontSize={'14px'}/></IntroductionBox>
      </Introduction>
      <TabNavigation 
        tabs={['프로필', '활동']} 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />
      {activeTab === "프로필" && (
        <Content>
            <Title>배지</Title>
            <BadgeContainer>
                <BadgeBox />
                <BadgeBox />
                <BadgeBox />
                <BadgeBox />
            </BadgeContainer>
            <BoardTitle text="성적" type={'edit'}/>
            <SubjectWrapper>
                <ScrollableSubjectList>
                    <SubjectList
                        subject={'디지털미디어원리'}
                        disableLink={true}
                        rate={'A+'}
                    />
                    <SubjectList
                        subject={'영상편집론'}
                        disableLink={true}
                        rate={'A-'}
                    />
                    {/* ...다른 과목들도 추가 */}
                </ScrollableSubjectList>
            </SubjectWrapper>
            <Title>인기게시글</Title>
            <div>인기게시글 내용</div>
        </Content>
      )}
      {activeTab === "활동" && (
        <Content>
            <Title>명성</Title>
              <Reputation>
                1800
                <ProgressBarContainer>
                  다음 단계까지 700점 남음
                  <ProgressBar totalSteps={1000} currentStep={300} width={'250px'}/>
                </ProgressBarContainer>
              </Reputation>
              <div style={{padding: '0px 20px 20px'}}>
              <InfoBox>
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center'}}>
                <img src="/Icons/Vote_c.svg" alt="투표" width='35px' height='35px'/>
                <div style={{fontSize: '16px', color: '#434B60', fontWeight: '700'}}>20</div>
                <div style={{fontSize: '10px', color: '#ACB2BB'}}>받은 투표 수</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center'}}>
                <img src="/Icons/Bookmark_c.svg" alt="스크랩" width='20px' height='28px'/>
                <div style={{fontSize: '16px', color: '#434B60', fontWeight: '700'}}>20</div>
                <div style={{fontSize: '10px', color: '#ACB2BB'}}>스크랩 수</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center'}}>
                <img src="/Icons/Crown_c.svg" alt="꿀팁" width='40px' height='40px'/>
                <div style={{fontSize: '16px', color: '#434B60', fontWeight: '700'}}>20</div>
                <div style={{fontSize: '10px', color: '#ACB2BB'}}>채택 수</div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center'}}>
                <img src="/Icons/Global_c.svg" alt="답변" width='28px' height='28px'/>
                <div style={{fontSize: '16px', color: '#434B60', fontWeight: '700'}}>20</div>
                <div style={{fontSize: '10px', color: '#ACB2BB'}}>조회 수</div>
                </div>
              </InfoBox>
              </div>
            <Title>최근 작성한 게시글</Title>
            <div>최근 작성한 게시글 내용</div>
        </Content>
      )}
    </Wrapper>
  );
};

export default MyPageEdit;

// Styled Components

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 페이지가 전체 화면을 채우도록 설정 */
    position: relative; /* 헤더를 페이지 상단에 고정하기 위해 필요 */
    padding-top: 100px; /* 헤더 공간만큼 패딩 추가 */
    padding-bottom: 100px; /* 하단 패딩 추가 */
    
    background-color: #f0f2f4;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 380px;
  background: rgba(240, 242, 244, 0.3);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  height: 80px;
  z-index: 1000;
  padding: 10px;
  box-sizing: border-box;
  justify-content: center;
`;

const BackButton = styled.div`
  position: absolute;
  left: 10px;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: rgba(172, 178, 187, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ProfileName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #434b60;
  text-align: center;
  flex: 1;
  margin: 0 60px; /* BackButton과 ProfileName 사이의 여백 설정 */
`;

// Profile Image Edit Button styled component
const ProfileImageWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 5%;
  right: 5%;
  width: ${(props) => props.size || '30px'}; /* 기본 크기 30px */
  height: ${(props) => props.size || '30px'};
  background: url('/Icons/Edit.svg') no-repeat center;
  background-size: ${(props) => props.iconSize || '20px'}; /* 아이콘 크기 prop으로 조정 */
  background-color: transparent; /* 배경색 제거 */
  backdrop-filter: blur(20px); /* 배경 흐리게 처리 */
  border: none;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0px 2px 4px gray;
  transition: all 0.3s ease;

  &:active {
    scale: 0.95;
  }
`;

// Modified Profile Component
const Profile = styled.div`
  width: 370px;
  height: 100px;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  width: 223px;
  flex-direction: column;
  align-items: flex-start;
  gap: 13px;
  color: #434B60;
  font-family: Inter, sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: normal;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  gap: 8px;
`;

const DetailInfo = styled.div`
  color: #ACB2BB;
  font-family: Inter, sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Measurement = styled.div`
  color: #434B60;
  font-family: Inter, sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: normal;
`;

const Introduction = styled.div`
  padding: 10px 0px;
  color: #434B60;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  width: 380px;
  text-align: left;
`;

const IntroductionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 340px;
  padding: 15px 20px;
  font-weight: 500;
`;

const Content = styled.div`
  width: 380px;
  height: 800px;
  text-align: left;
  gap: 20px;
`;

const Title = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  padding: 15px 10px;
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

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%; /* 컨테이너가 부모 요소의 전체 너비를 차지하게 설정 */
  overflow-x: auto; /* 가로 스크롤을 활성화 */
  padding: 10px;
  gap: 20px; /* 각 BadgeBox 간의 간격 설정 */
  box-sizing: border-box; /* padding과 border가 width에 포함되도록 설정 */

  &::-webkit-scrollbar {
    height: 8px; /* 스크롤바의 높이 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dbdbdb;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const BadgeBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px; /* 고정된 너비 */
  height: 100px; /* 고정된 높이 */
  border-radius: 10px;
  background-color: white;
  flex-shrink: 0; /* 크기 축소 방지 */

  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
  }
  &: active {
    transform: scale(0.9);
  }
`;

const Reputation = styled.div`
  display: flex;
  height: 80px;
  padding: 0px 20px;
  margin-top: -10px;
  justify-content: space-between;
  align-items: center;

  color: #434B60;

text-align: center;
font-family: Inter;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: end;

  font-size: 12px;
  font-weight: 500;
  line-height: normal;
  color: #ACB2BB;

  gap: 5px;

`;

const SubjectWrapper = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 24px;
    margin-top: 10px;
`;

const ScrollableSubjectList = styled.div`
    width: 100%;
    max-height: 280px;
    overflow-y: auto;
`;

const Save = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(172, 178, 187, 0.3);
  }

  &:active {
    scale: 0.95;
  }

  font-size: 16px;
  font-weight: bold;
  color: #434b60;
  text-align: center;
`;