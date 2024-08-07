import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';


const CheckBar = ({text}) => {
    return (
        <SubHeader>
            <CheckBox 
                disabledIconSrc='/Icons/CheckBox_d.svg'
                enabledIconSrc='/Icons/CheckBox_e.svg'
                text={text}
            />
        </SubHeader>
    )
}

const CheckBox = ({disabledIconSrc, enabledIconSrc, text}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxClick = () => {
        setIsChecked(isChecked === 'true' ? 'false' : 'true');
    };

    return(
        <Button onClick={handleCheckboxClick}>
            <img src={isChecked === 'true' ? enabledIconSrc : disabledIconSrc}></img>
            <span style={{color: isChecked === 'true' ? 'black' : '#ACB2BB', fontSize: '14px', paddingLeft: '5px' }}>{text}</span>
        </Button>
    )
}

export default CheckBar;

CheckBar.propTypes = {
    text: PropTypes.string.isRequired
};
  
CheckBar.defaultProps = {
    text: '텍스트를 입력하세요'
};

const SubHeader = styled.div`
    width: 400px;;
    height: 40px;

    display: flex;
    align-items: center;
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

    &:active {
        transition: all 0.3s ease;
        scale: 0.95;
    }
`