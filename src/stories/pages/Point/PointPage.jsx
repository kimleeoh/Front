import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import useWindowSize from "../../components/Common/WindowSize";
import Button from "../../components/Button";
import BaseAxios from "../../../axioses/BaseAxios";

const PointPage = () => {
    const { width: windowSize } = useWindowSize();

    const [originPoint, setOriginPoint] = useState(null);

    useEffect(() => {
        const fetchPoint = async () => {
            // Simulate fetching point value
            const fetchedPoint = await BaseAxios.get("/api/h/point");
            setOriginPoint(fetchedPoint.data.point);
        };

        fetchPoint();
    }, []);

    return (
        <PageContainer>
            <Header text={`내 포인트: ${originPoint}P`} searchButton={false} />
            <Content maxWidth={windowSize}>
                <Title>배너 광고</Title>
                알림컴포넌트?
            </Content>

            <Button label="광고보고 300P 충전하기" width="100%" />
        </PageContainer>
    );
};

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
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

export default PointPage;
