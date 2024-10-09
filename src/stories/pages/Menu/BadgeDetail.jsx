import React from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import useWindowSize from "../../components/Common/WindowSize";
import Button from "../../components/Button";
import FixedBottomContainer from "../../components/FixedBottomContainer";

const BadgeDetail= () => {
    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper>
            <Header text="" searchButton={false} />
        <FixedBottomContainer>
            <Button label="닫기" />
        </FixedBottomContainer>
        </Wrapper>

    );
};

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 페이지가 전체 화면을 채우도록 설정 */
    position: relative; /* 헤더를 페이지 상단에 고정하기 위해 필요 */

    padding: 100px 10px 100px;

    background-color: #f0f2f4;

    width: 100%;
`;


export default BadgeDetail;
