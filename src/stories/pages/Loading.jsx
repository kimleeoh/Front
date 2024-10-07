import React from "react";
import styled from "styled-components";
import { Spinner } from "../components/Common/Spinner";

export default () => {
    return (
        <Wrapper>
            <Spinner />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
