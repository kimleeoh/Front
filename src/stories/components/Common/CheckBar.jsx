import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const CheckBar = ({text, onChange, disabled}) => {
    return (
        <SubHeader>
            <CheckBox 
                disabledIconSrc='/Icons/CheckBox_d.svg'
                enabledIconSrc='/Icons/CheckBox_e.svg'
                text={text}
                onChange={onChange}
                disabled={disabled}
            />
        </SubHeader>
    )
}

const CheckBox = ({disabledIconSrc, enabledIconSrc, text, onChange, disabled}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        if (!disabled) {
            const newCheckedState = !isChecked;
            setIsChecked(newCheckedState);
            onChange(newCheckedState);
        }
    };

    return(
        <Button onClick={handleCheckboxClick} disabled={disabled}>
            <img src={isChecked ? enabledIconSrc : disabledIconSrc}></img>
            <span style={{color: isChecked ? '#434B60' : '#ACB2BB', fontSize: '16px',fontWeight: '500', paddingLeft: '5px' }}>{text}</span>
        </Button>
    )
}

export default CheckBar;

CheckBar.propTypes = {
    text: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};
  
CheckBar.defaultProps = {
    text: '텍스트를 입력하세요',
    onChange: () => {},
    disabled: false,
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
    justify-content: center;
    padding: 10px;
    border-radius: 16px;

    img{
        width: 20px;
        height: 20px;
    }
    border: 0px;
    background-color: white;

    cursor: pointer;

    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    transition: all 0.3s ease;
    &:active {
        scale: 0.95;
        background-color: #e2e5e9;
    }
`