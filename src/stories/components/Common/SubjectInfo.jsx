import React from "react";
import styled from "styled-components";
import useWindowSize from "./WindowSize";

const SubjectInfo = ({
    category_name,
    professor,
    timeIcredit,
    sub_student,
    onClick,
    id,
}) => {
    const { width: windowSize } = useWindowSize();

    return (
        <OutWrapper maxWidth={windowSize} onClick={onClick}>
            <Wrapper>
                <CategoryName>{category_name}</CategoryName>
                <Professor>{professor}</Professor>
                <TimeIcredit>{timeIcredit}</TimeIcredit>
                <Sub_student>{sub_student}</Sub_student>
            </Wrapper>
        </OutWrapper>
    );
};

export default SubjectInfo;

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    border-bottom: 1px solid #acb2bb;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 16px;

    padding: 10px 10px;
    box-sizing: border-box;

    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        background-color: #e2e5e9;
    }
    &:active {
        transform: scale(0.98);
    }
`;

const CategoryName = styled.div`
    font-weight: bold;
    font-size: 20px;
`;

const Professor = styled.div`
    font-size: 16px;
`;

const TimeIcredit = styled.div`
    margin-top: 15px;
    font-size: 16px;
`;

const Sub_student = styled.div`
    font-size: 16px;
`;
