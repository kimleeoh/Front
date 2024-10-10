import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import useWindowSize from "./WindowSize";

const Checker = ({ text, onChange, disabled, type, readOnly, checked }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheckboxClick = () => {
        if (!disabled && !readOnly) {
            const newCheckedState = !isChecked;
            setIsChecked(newCheckedState);
            onChange(newCheckedState);
        }
    };

    // readOnly 모드에서는 부모 컴포넌트에서 전달된 checked 상태를 사용
    const currentChecked = readOnly ? checked : isChecked;

    // type에 따라 아이콘 경로 설정
    const getIconSrc = (checked) => {
        switch (type) {
            case "check":
                return checked ? "/Icons/Check_e.svg" : "/Icons/Check_d.svg";
            case "box":
                return checked
                    ? "/Icons/Check_box_e.svg"
                    : "/Icons/Check_box_d.svg";
            case "border":
            default:
                return checked
                    ? "/Icons/Check_border_e.svg"
                    : "/Icons/Check_border_d.svg";
        }
    };

    const { width: windowSize } = useWindowSize();

    return (
        <CheckerWrapper maxWidth={windowSize}>
            <Button
                onClick={handleCheckboxClick}
                disabled={disabled}
                readOnly={readOnly} // readOnly prop 추가
            >
                <img src={getIconSrc(currentChecked)} alt="checkbox icon" />
                {text && (
                    <span
                        style={{
                            color: currentChecked ? "#434B60" : "#ACB2BB",
                            fontSize: "16px",
                            fontWeight: "500",
                            paddingLeft: "5px",
                        }}
                    >
                        {text}
                    </span>
                )}
            </Button>
        </CheckerWrapper>
    );
};

export default Checker;

Checker.propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    type: PropTypes.oneOf(["check", "box", "border"]),
    readOnly: PropTypes.bool,
    checked: PropTypes.bool, // readOnly 모드에서 사용할 상태
};

Checker.defaultProps = {
    text: "텍스트를 입력하세요",
    onChange: () => {},
    disabled: false,
    type: "border",
    readOnly: false,
    checked: false, // 기본값 설정
};

const CheckerWrapper = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    height: 30px;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin-right: auto;
    background-color: white;
    margin-top: 10px;
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 16px;
    width: 100%;

    img {
        width: 20px;
        height: 20px;
    }
    border: 0px;
    background-color: white;
    cursor: ${(props) => (props.disabled || props.readOnly ? "" : "pointer")};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    transition: all 0.3s ease;

    &:active {
        // disabled 또는 readOnly일 때는 클릭 효과를 방지
        scale: ${(props) => (props.disabled || props.readOnly ? 1 : 0.95)};
        background-color: ${(props) =>
            props.disabled || props.readOnly ? "white" : "#e2e5e9"};
    }

    width: auto;
`;
