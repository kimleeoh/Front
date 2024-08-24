import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

const BoardTitle = ({text, edit, onEditClick }) => {
    return (
        <Wrapper>
            <span>{text}</span>
            {edit && (
              <img src="/Icons/Edit.svg"  style={{marginLeft: 'auto', marginRight: '5px', cursor: 'pointer'}}  onClick={onEditClick} />  
            )}
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

    display: flex;
    align-items: center;

    color: #434B60;
    font-size: 16px;
    font-weight: bold;
    
    padding: 10px;
    margin-top: 15px;
`