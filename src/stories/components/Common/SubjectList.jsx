import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

<<<<<<< HEAD:src/stories/pages/Board/SubjectList.jsx
const SubjectList = ({ subject, actions, onClick, rate }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(subject); // 부모 컴포넌트에서 전달된 onClick 함수 호출
        }
    };

    return (
        <Line onClick={handleClick}>
            <Wrapper>
                <SubjectTitle>
                    <span style={{ marginLeft: '10px' }}>{subject}</span>
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
                            style={{ marginLeft: action.marginLeft || '5px' }}
                        >
                            <img
                                src={action.icon}
                                alt={action.alt}
                                style={{ cursor: 'pointer' }}
                            />
                        </ActionButton>
                    ))}
                    {rate && <Rate>{rate}</Rate>}
            </Wrapper>
        </Line>
=======
const SubjectList = ({ select, subject, eliminate, onDelete, disableLink }) => {
    const content = (
        <Wrapper>
            <SubjectTitle>
                {select && (
                    <img
                        src="/Icons/Select.svg"
                        alt="Select"
                        style={{ marginLeft: '5px', cursor: 'pointer' }}
                    />
                )}
                <span style={{ marginLeft: '10px' }}>{subject}</span>
                {eliminate && (
                    <img
                        src="/Icons/Delete.svg"
                        alt="Delete"
                        style={{ marginLeft: 'auto', marginRight: '5px', cursor: 'pointer' }}
                        onClick={onDelete}
                    />
                )}
            </SubjectTitle>
        </Wrapper>
>>>>>>> ef9a6d9edb1fc7e9684c9fb557cfc8e839d2584a:src/stories/components/Common/SubjectList.jsx
    );
};

export default SubjectList;

SubjectList.propTypes = {
    subject: PropTypes.string.isRequired,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            icon: PropTypes.string.isRequired,
            alt: PropTypes.string.isRequired,
            onClick: PropTypes.func,  // 액션에 대한 onClick 핸들러
            marginLeft: PropTypes.string,
        })
    ),
    onClick: PropTypes.func,  // SubjectList 전체에 대한 onClick 핸들러
};

SubjectList.defaultProps = {
    actions: [],
};

const Wrapper = styled.div`
    width: 370px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-radius: 15px;
    padding: 5px;
    cursor: pointer;
    transition: all 0.2s ease;
    &:active {
        background-color: #F1F2F4;
        transition: all 0.2s ease;
        scale: 0.98;
    }
`;

const Line = styled.div`
    border-bottom: 1px solid #F1F2F4;
`;

const SubjectTitle = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #434B60;
    width: 100%;
`;

const ActionButton = styled.button`
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: #F1F7Fd;
    }
    &:active {
        scale: 0.95;
    }
`;

const Rate = styled.div`
    font-size: 14px;
    color: #434B60;
    margin-right: 10px;
`;