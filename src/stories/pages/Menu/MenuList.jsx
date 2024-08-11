import react from 'react';
import styled from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuList = ( {children} ) => {
    return (
        <Wrapper>
            {children}
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="15" viewBox="0 0 9 15" fill="none">
  <path d="M1.75 1.25L8 7.5L1.75 13.75" stroke="#ACB2BB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </Wrapper>
    );
};

export default MenuList;

MenuList.propTypes = {
    option: PropTypes.string.isRequired,
};

MenuList.defaultProps = {
    option: 'Option',
};


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