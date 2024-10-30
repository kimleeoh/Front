import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useWindowSize from "./Common/WindowSize";

const TextField = ({
    label,
    value: externalValue,
    onChange,
    disabled,
    type,
    width,
    height,
    name,
}) => {
    const [inputValue, setInputValue] = useState(externalValue || "");
    const [isfocused, setisfocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 1. 상태 추가

    useEffect(() => {
        setInputValue(externalValue || "");
    }, [externalValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange({ target: { name, value: newValue } }); // name 속성 추가
        }
    };

    const clearInput = () => {
        setInputValue("");
        if (onChange) {
            onChange({ target: { name, value: "" } }); // name 속성 추가
        }
    };

    const togglePasswordVisibility = () => {
        // 2. 토글 핸들러 추가
        setIsPasswordVisible((prev) => !prev);
    };

    const { width: windowSize } = useWindowSize();

    return (
        <TextFieldWrapper width={width} maxWidth={windowSize} height={height}>
            <InputWrapper>
                <StyledLabel
                    hasValue={inputValue !== ""}
                    isfocused={isfocused}
                    disabled={disabled}
                >
                    {label}
                </StyledLabel>
                <Input
                    type={
                        type === "password" && isPasswordVisible ? "text" : type
                    } // 2. 타입 변경
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={() => setisfocused(true)}
                    onBlur={() => setisfocused(false)}
                    disabled={disabled}
                    name={name} // name 속성 추가
                />
                {inputValue &&
                    !disabled &&
                    isfocused && // 3. 조건부 렌더링
                    (type === "password" ? (
                        <ToggleButton
                            onMouseDown={togglePasswordVisibility}
                            type="button"
                            aria-label={
                                isPasswordVisible
                                    ? "비밀번호 숨기기"
                                    : "비밀번호 보기"
                            }
                        >
                            {isPasswordVisible ? (
                                <img
                                    src={`${process.env.PUBLIC_URL}/Icons/Invisible.svg`}
                                    width={"20px"}
                                />
                            ) : (
                                <img src={`${process.env.PUBLIC_URL}/Icons/Visible.svg`} width={"20px"} />
                            )}
                        </ToggleButton>
                    ) : (
                        <ClearButton onMouseDown={clearInput}>×</ClearButton>
                    ))}
            </InputWrapper>
        </TextFieldWrapper>
    );
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.string,
    height: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string, // name prop 추가
};

TextField.defaultProps = {
    value: "",
    onChange: () => {},
    disabled: false,
    type: "text",
    name: "", // 기본값 추가
    height: "50px",
};

export default TextField;

// 기존 스타일 컴포넌트 유지
const TextFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0;
    width: ${(props) => (props.width ? props.width : "100%")};
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: ${(props) => (props.height ? props.height : "50px")};
    position: relative;
    padding: 0;
`;

const StyledLabel = styled.label`
    position: absolute;
    left: 5%;
    top: ${(props) => (props.hasValue || props.isfocused ? "5px" : "50%")};
    transform: translateY(-40%);
    font-size: ${(props) =>
        props.hasValue || props.isfocused ? "12px" : "16px"};
    color: ${(props) => (props.disabled ? "#acb2bb" : "#434b60")};
    transition: all 0.2s ease;
`;

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 40px;
    width: 100%;
`;

const Input = styled.input`
    background-color: #e2e5e9;
    color: #434b60;
    border: none;
    border-radius: 16px;
    padding: 15px 40px 5px 10px;
    font-size: 16px;
    width: 100%;
    height: 32px;
    outline: none;
    &:disabled {
        background-color: #f0f0f0;
    }
`;

const ClearButton = styled.button`
    position: absolute;
    right: 3%;
    background: none;
    border: none;
    font-size: 35px;
    cursor: pointer;
    color: #434b60;
    padding: 10px;
    transition: color 0.2s ease;
    &:hover {
        color: #000;
    }
`;

// 4. ToggleButton 추가
const ToggleButton = styled.button`
    position: absolute;
    right: 3%;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #434b60;
    padding: 10px;
    transition: color 0.2s ease;
    &:hover {
        color: #000;
    }
`;
