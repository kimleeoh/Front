import React from "react";
import styled from "styled-components";
import PropTypes, { oneOf } from "prop-types";
import useWindowSize from "./WindowSize";

const BoardTitle = ({ text, onEditClick, type }) => {
    const { width: windowWidth } = useWindowSize();
    let iconSrc;

    switch (type) {
        case "edit":
            iconSrc = "/Icons/Edit.svg";
            break;
        case "add":
            iconSrc =
                "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNMyAxMC41SDEwLjVNMTggMTAuNUgxMC41TTEwLjUgMTAuNVYzTTEwLjUgMTAuNVYxOCIgc3Ryb2tlPSIjNDM0QjYwIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=";
            break;
        default:
            iconSrc = null;
    }

    return (
        <Wrapper maxWidth={windowWidth}>
            {text}
            {type && <Button onClick={onEditClick} iconSrc={iconSrc} />}
        </Wrapper>
    );
};

BoardTitle.propTypes = {
    text: PropTypes.string.isRequired,
    onEditClick: PropTypes.func,
    type: oneOf(["edit", "add"]),
};

BoardTitle.defaultProps = {
    text: "게시판 이름",
    type: "",
};

export default BoardTitle;

const Wrapper = styled.div`
    max-width: ${(props) => props.maxWidth}px;
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: center;
    color: #434b60;
    font-size: 16px;
    font-weight: bold;
    padding: 30px 10px;
    margin: 0 auto;
`;

const Button = styled.button`
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    border-radius: 10px;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    transition: all 0.3s ease;
    background-image: url(${(props) => props.iconSrc});
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center;

    &:hover {
        background-color: rgba(172, 178, 187, 0.3);
    }
    &:active {
        scale: 0.9;
    }
`;
