import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const BoardTitle = ({text, edit, onEditClick }) => {
    return (
        <Wrapper>
            {text}
            {edit &&
            <Button  onClick={onEditClick} >
              <img src="/Icons/Edit.svg" />  
            </Button>
            }
        </Wrapper>
    );
}

export default BoardTitle;

BoardTitle.propTypes = {
    text: PropTypes.string.isRequired,
    edit: PropTypes.bool.isRequired,
    onEditClick: PropTypes.func,
};

BoardTitle.defaultProps = {
    text: '게시판 이름',
    edit: true,
};

const Wrapper = styled.div`
    width: 370px;
    height: 20px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    align-self: center;

    color: #434B60;
    font-size: 16px;
    font-weight: bold;
    
    padding: 20px 10px;
`

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
    
  &:hover {
    background-color: rgba(172, 178, 187, 0.3);
  }
    &:active {
    scale: 0.95;
  }
`