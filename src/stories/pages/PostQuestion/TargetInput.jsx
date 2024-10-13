import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "../../components/Common/WindowSize";

const PointInput = ({
    width,
    height,
    placeholder,
    fontColor,
    backgroundColor,
    fontSize,
    onChange,
    disabled,
}) => {
    const [content, setContent] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        setContent(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!content) {
            setIsFocused(false);
        }
    };

    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper maxWidth={windowSize} width={width}>
            <small
                style={{
                    marginRight: "auto",
                    color: "#d00303",
                    marginLeft: "15px",
                }}
            >
                자세히 적을수록 구매비율이 높아져요
            </small>
            <SubWrapper>
                <StyledPointInput
                    value={content}
                    onChange={handleChange}
                    placeholder={isFocused ? "" : placeholder}
                    width={width}
                    height={height}
                    fontColor={fontColor}
                    backgroundColor={backgroundColor}
                    fontSize={fontSize}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    disabled={disabled}
                    maxWidth={windowSize}
                />
                <span style={{ marginLeft: "10px" }}>에게 도움이 돼요</span>
            </SubWrapper>
        </Wrapper>
    );
};

export default PointInput;

PointInput.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    onChange: PropTypes.func,
    point: PropTypes.number,
    disabled: PropTypes.bool,
};

PointInput.defaultProps = {
    width: "100%",
    height: "50px",
    fontColor: "#434B60",
    backgroundColor: "#F0F2F4",
    fontSize: "16px",
    point: null,
    disabled: false,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin-top: 10px;
`;

const StyledPointInput = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: ${(props) => props.height};
    padding: 10px;
    border: none;
    border-radius: 20px;
    background-color: ${(props) => props.backgroundColor};
    color: ${(props) => props.fontColor};
    font-size: ${(props) => props.fontSize};
    line-height: 1.5;
    resize: none;
    outline: none;
    text-indent: 15px;

    &::placeholder {
        color: #434b60;
        font-size: ${(props) => props.fontSize};
    }
`;

const SubWrapper = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
`;
