import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import useWindowSize from "../../components/Common/WindowSize";

const TermsOfServicePage = () => {
    const { width: windowSize } = useWindowSize();

    return (
        <PageContainer>
            <Header text="이용약관" searchButton={false} />
            <Content maxWidth={windowSize}>
                <Title>A-F Killer 이용약관</Title>
                <p>
                    <strong>제 1조 (목적)</strong>
                </p>
                <p>
                    본 약관은 [앱 이름] (이하 "A-F Killer")의 이용과 관련하여
                    서비스 제공자(이하 "회사")와 이용자의 권리, 의무 및
                    책임사항, 이용 조건과 절차 등 기본적인 사항을 규정함을
                    목적으로 합니다.
                </p>
                <p>
                    <strong>제 2조 (정의)</strong>
                </p>
                <p>
                    "이용자"란 회사가 제공하는 서비스에 접속하여 본 약관에 따라
                    회사와 서비스 이용계약을 체결하고 회사가 제공하는 서비스를
                    이용하는 고객을 말합니다. "계정"이란 이용자의 식별과 서비스
                    이용을 위해 이용자가 정한 이메일 주소와 비밀번호를 기반으로
                    생성된 서비스 로그인 정보를 말합니다. "구글 소셜 로그인"은
                    이용자가 구글 계정을 사용하여 서비스에 로그인할 수 있게 하는
                    인증 방법을 말합니다.
                </p>
                <p>
                    <strong>제 3조 (회원가입 및 정보수집)</strong>
                </p>
                <p>
                    이용자는 구글 소셜 로그인을 통해 서비스에 가입할 수
                    있습니다. 회사는 서비스 제공을 위해 이용자로부터 다음의
                    정보를 수집합니다: 닉네임, 프로필 사진, 성별, 체중, 운동
                    목표. 수집된 정보는 서비스 운영 및 개선, 맞춤형 서비스 제공,
                    통계 분석 등의 목적으로 사용됩니다.
                </p>
                <p>
                    <strong>제 4조 (서비스 이용)</strong>
                </p>
                <p>
                    회사는 이용자에게 다음과 같은 서비스를 제공합니다: 개인 맞춤
                    운동 계획 제공 운동 성과 모니터링 및 분석 건강 및 운동 관련
                    정보 제공 서비스 이용 시간은 회사의 운영 정책에 따라
                    정해집니다.
                </p>
                <p>
                    <strong>제 5조 (개인정보보호)</strong>
                </p>
                <p>
                    회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를
                    보호하기 위해 노력합니다. 개인정보의 수집 및 이용에 대해서는
                    관련 법령 및 회사의 개인정보처리방침에 따릅니다. 이용자는
                    언제든지 자신의 개인정보 조회, 수정, 삭제를 요청할 수 있으며
                    회사는 이에 응해야 합니다.
                </p>
                <p>
                    <strong>제 6조 (약관의 변경)</strong>
                </p>
                <p>
                    회사는 법률이나 서비스 정책에 따라 필요 시 본 약관을 수정할
                    수 있습니다. 약관이 변경된 경우, 회사는 변경 사항을 서비스
                    내에 공지하며, 변경된 약관은 공지 후 7일이 지난 후부터
                    효력이 발생합니다. 이용자가 변경된 약관에 동의하지 않을
                    경우, 회원 탈퇴(계정 삭제)를 요청할 수 있으며, 계속 서비스를
                    이용할 경우 변경된 약관에 동의한 것으로 간주됩니다.
                </p>
                <p>
                    <strong>제 7조 (책임의 한계)</strong>
                </p>
                <p>
                    회사는 천재지변 또는 이에 준하는 불가항력적 사유가 발생하여
                    서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이
                    면제됩니다. 회사는 이용자의 귀책사유로 인한 서비스 이용
                    장애에 대하여 책임을 지지 않습니다. 회사는 이용자가 서비스를
                    통해 기대하는 이익에 대해 보장하지 않습니다.
                </p>
                <p>
                    <strong>제 8조 (관할 법원)</strong>
                </p>
                <p>
                    본 약관과 회사의 서비스에 대한 분쟁에 대해 소송이 제기될
                    경우, 회사의 본사 소재지를 관할하는 법원을 관할 법원으로
                    합니다.
                </p>
            </Content>
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
    gap: 20px;
    padding: 0 20px;
    width: 100%;
    box-sizing: border-box;
`;

const Content = styled.div`
    text-align: left;
    font-size: 14px;
    line-height: 1.6;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const Title = styled.h1`
    font-size: 25px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 40px;
`;

export default TermsOfServicePage;
