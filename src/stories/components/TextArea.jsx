import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextArea = ({ width, height, placeholder, fontColor, backgroundColor, fontSize, onChange}) => {
    const [content, setContent] = useState('');

    const handleChange = (e) => {
        setContent(e.target.value);
        if (onChange) {
        onChange(e.target.value);
        }
    };

    return (
        <StyledTextArea
            value={content}
            onChange={handleChange}
            placeholder={placeholder}
            width={width}
            height={height}
            fontColor={fontColor}
            backgroundColor={backgroundColor}
            fontSize={fontSize}
        />
    );
};

export default TextArea;

const StyledTextArea = styled.input`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ACB2BB;
    background-color: ${props => props.backgroundColor};
    color: ${props => props.fontColor};
    font-size: ${props => props.fontSize};
    line-height: 1.5;
    resize: none;
    outline: none;

    &::placeholder {
        color: black;
        font-size: ${props => props.fontSize};
    }

    &:focus {
        box-shadow: 0 0 0 2px #ACB2BB;
    }
`;

TextArea.propTypes = {
    width: PropTypes.string,
    height: PropTypes.string,
    placeholder: PropTypes.string,
    fontColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    fontSize: PropTypes.string,
    onChange: PropTypes.func
};

TextArea.defaultProps = {
    width: '100%',
    height: '30px',
    placeholder: '내용을 입력하세요.',
    fontColor: '#000',
    backgroundColor: 'white',
    fontSize: '18px'
};