import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CheckBar = ({text, onChange}) => {
    return (
        <SubHeader>
            <CheckBox 
                disabledIconSrc='/Icons/CheckBox_d.svg'
                enabledIconSrc='/Icons/CheckBox_e.svg'
                text={text}
                onChange={onChange}
            />
        </SubHeader>
    )
}

const CheckBox = ({disabledIconSrc, enabledIconSrc, text, onChange}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxClick = () => {
        const newCheckedState = !isChecked;
        setIsChecked(newCheckedState);
        onChange(newCheckedState);
    };

    return(
        <Button onClick={handleCheckboxClick}>
            <img src={isChecked ? enabledIconSrc : disabledIconSrc}></img>
            <span style={{color: isChecked ? 'black' : '#ACB2BB', fontSize: '14px', paddingLeft: '5px' }}>{text}</span>
        </Button>
    )
}

export default CheckBar;

CheckBar.propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};
  
CheckBar.defaultProps = {
    text: '텍스트를 입력하세요',
    onChange: () => {},
};

const SubHeader = styled.div`
    width: 400px;
    height: 40px;

    display: flex;
    align-items: center;

    margin-top: 15px;
    margin-left: 5px;
`

const Button = styled.button`
    display: flex;
    align-items: center;

    img{
        width: 20px;
        height: 20px;
        transition: all 0.3s ease;
    }
    border-radius: 0px;
    border: 0px;
    background-color: white;

    cursor: pointer;

    transition: all 0.3s ease;
    &:active {
        transition: all 0.3s ease;
        scale: 0.95;
    }
`