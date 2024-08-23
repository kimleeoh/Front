import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // useNavigate를 import합니다.
import PropTypes from 'prop-types';

const MenuList = ({ children, to, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        } else if (onClick) {
            onClick();  // 전달받은 onClick 핸들러 실행
        }
    };

    return (
        <Wrapper onClick={handleClick}>
            {children}
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
                <path d="M1.75 1.25L8 7.5L1.75 13.75" stroke="#ACB2BB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Wrapper>
    );
};

MenuList.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    onClick: PropTypes.func,
};

MenuList.defaultProps = {
    to: null,  // 기본값을 null로 설정
    onClick: null,
};

export default MenuList;

const Wrapper = styled.div`
    display: flex;
    width: 358px;
    height: 30px;
    padding: 10px 14px;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: pointer;
    &:active {
        background-color: #F1F2F4;
        transition: all 0.3s ease;
        scale: 0.98;
    }
    color: #434B60;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;