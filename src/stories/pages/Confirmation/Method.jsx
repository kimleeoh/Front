import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../components/Common/WindowSize";

const Method = ({ title, content, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to, { state: { title } });
    };

    const { width: windowSize } = useWindowSize();
    return (
        <Wrapper onClick={handleClick} maxWidth={windowSize}>
            <Title> {title} </Title>
            <Content> {content} </Content>
        </Wrapper>
    );
};

export default Method;

Method.defaultProps = {
    title: "제목",
    content: "내용",
};

Method.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
};

const Wrapper = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};

    align-items: center;
    margin-bottom: 20px;

    border: none;
    border-radius: 20px;
    background-color: #f0f2f4;
    padding: 30px 20px;

    transition: all 0.3s ease;
    cursor: pointer;
    &:active {
        background-color: #f1f2f4;
        transition: all 0.3s ease;
        scale: 0.98;
    }
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 20px;
`;

const Content = styled.div`
    margin-top: 10px;
    font-weight: regular;
    font-size: 15px;
    color: #434b60;
`;
