import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextField = ({ label, value, onChange, disabled, type, width }) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange(e);
  };

  const clearInput = () => {
    setInputValue('');
    onChange({ target: { value: '' } });
  };

  return (
    <TextFieldWrapper>
      <InputWrapper>
        <StyledLabel
          hasValue={inputValue}
          isFocused={isFocused}
          disabled={disabled}
        >
          {label}
        </StyledLabel>
        <Input
          type={type}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
        />
        {inputValue && !disabled && isFocused && (
          <ClearButton onMouseDown={clearInput}>×</ClearButton>
        )}
      </InputWrapper>
    </TextFieldWrapper>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  type: PropTypes.string,
};

TextField.defaultProps = {
  disabled: false,
  width: '310px',
  type: 'text',
};

export default TextField;

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: ${props => props.width};
  height: 50px;
  position: relative;
`;

const StyledLabel = styled.label`
  position: absolute;
  left: 3%;
  top: ${(props) => (props.hasValue || props.isFocused ? '5px' : '50%')};
  transform: translateY(-40%);
  font-size: ${(props) => (props.hasValue || props.isFocused ? '12px' : '16px')};
  color: ${(props) => (props.disabled ? '#acb2bb' : '#434b60')};
  transition: all 0.2s ease;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
`;

const Input = styled.input`
  background-color: #e2e5e9;
  border: none;
  border-radius: 15px;
  padding: 20px 40px 8px 10px;
  font-size: 16px;
  width: 100%;
  height: 32px;
  outline: none;
  &:disabled {
    background-color: #f0f0f0;
  }
`;

const ClearButton = styled.button`
  position: absolute;
  right: 3%;
  background: none;
  border: none;
  font-size: 35px; /* 클리어 버튼 크기를 키웁니다 */
  cursor: pointer;
  color: #434b60;
  padding: 10px; /* 버튼에 패딩을 추가하여 클릭 영역을 키웁니다 */

  transition: color 0.2s ease;
  &:hover {
    color: #000;
  }
`;
