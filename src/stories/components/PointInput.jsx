import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PointInput = ({ width, height, placeholder, fontColor, backgroundColor, fontSize, onChange, point}) => {
    const [content, setContent] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        setContent(e.target.value);
        if (onChange) {
        onChange(e.target.value);
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!content) {
            setIsFocused(false);
        }
    };

    return (
        <>  
            <div style={{width: '380px', color: '#ACB2BB', marginTop: '10px'}}>
                <small style={{marginRight: 'auto'}}>보유 포인트: {point}p</small>
            </div> 
            <StyledPointInput
                value={content}
                onChange={handleChange}
                placeholder={isFocused ? '' : placeholder}
                width={width}
                height={height}
                fontColor={fontColor}
                backgroundColor={backgroundColor}
                fontSize={fontSize}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </>
    );
};

export default PointInput;

const StyledPointInput = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 10px;
    border: none;
    border-radius: 20px;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.fontColor};
    font-size: ${props => props.fontSize};
    line-height: 1.5;
    resize: none;
    outline: none;
    text-indent: 15px;

    &::placeholder {
        color: #434B60;
        font-size: ${props => props.fontSize};
    }
`;

PointInput.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    onChange: PropTypes.func,
    point: PropTypes.number
};

PointInput.defaultProps = {
    width: '380px',
    height: '50px',
    placeholder: '포인트를 입력하세요. ',
    fontColor: '#000',
    backgroundColor: '#F0F2F4',
    fontSize: '16px',
    point: 0
};