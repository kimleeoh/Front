import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TextArea = ({ width, height, placeholder, fontColor, backgroundColor, fontSize, onChange }) => {
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
        <StyledTextArea
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
    );
};

export default TextArea;

const StyledTextArea = styled.textarea`
    width: ${props => props.width};
    height: ${props => props.height};
    padding: 5px 10px;
    border: none;
    border-radius: 16px;

    background-color: ${props => props.backgroundColor};
    color: ${props => props.fontColor};
    font-size: ${props => props.fontSize};
    line-height: 1.5;
    resize: none;
    outline: none;

    overflow-y: auto;
    white-space: pre-wrap;
    word-wrap: break-word;

    &::placeholder {
        color: #ACB2BB;
        font-size: ${props => props.fontSize};
        white-space: pre-wrap;
    }

    font-family: Arial, sans-serif;

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
    height: '100px',
    placeholder: '내용을 입력하세요.',
    fontColor: '#434B60',
    backgroundColor: 'white',
    fontSize: '18px'
};
