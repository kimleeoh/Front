import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";

const SubjectList = ({
    subject,
    actions,
    onClick,
    rate,
    marginLeft = "0px",
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick(subject); // 부모 컴포넌트에서 전달된 onClick 함수 호출
        }
    };

    const { width: windowSize } = useWindowSize();

    return (
        <Line onClick={handleClick}>
            <Wrapper maxWidth={windowSize}>
                <SubjectTitle>
                    <span style={{ marginLeft }}>{subject}</span>
                </SubjectTitle>
                {actions?.map((action, index) => (
                    <ActionButton
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            if (action.onClick) {
                                action.onClick(subject); // 각 액션에 대한 onClick 함수 호출
                            }
                        }}
                        style={{ marginLeft: action.marginLeft || "5px" }}
                    >
                        <img
                            src={action.icon}
                            alt={action.alt}
                            style={{ cursor: "pointer" }}
                        />
                    </ActionButton>
                ))}
                {rate && <Rate>{rate}</Rate>}
            </Wrapper>
        </Line>
    );
};

export default SubjectList;

SubjectList.propTypes = {
    subject: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
            onClick: PropTypes.func, // 액션에 대한 onClick 핸들러
            marginLeft: PropTypes.string,
        })
    ),
    onClick: PropTypes.func, // SubjectList 전체에 대한 onClick 핸들러
};

SubjectList.defaultProps = {
    actions: [],
};

const Wrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    box-sizing: border-box;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-radius: 15px;
    padding: 30px 0;
    cursor: pointer;
    transition: all 0.2s ease;
    &:active {
        background-color: #f1f2f4;
        transition: all 0.2s ease;
        scale: 0.98;
    }
`;

const Line = styled.div`
    border-bottom: 1px solid #f1f2f4;
`;

const SubjectTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #434b60;
    width: 100%;
`;

const ActionButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: #f1f7fd;
    }
    &:active {
        scale: 0.95;
    }
`;

const Rate = styled.div`
    font-size: 14px;
    color: #434b60;
    margin-right: 10px;
`;
