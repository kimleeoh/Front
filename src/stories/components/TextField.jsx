import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TextField = ({ label, value: externalValue, onChange, disabled, type, width, name }) => {
  const [inputValue, setInputValue] = useState(externalValue || '');
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 1. 상태 추가

  useEffect(() => {
    setInputValue(externalValue || '');
  }, [externalValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange({ target: { name, value: newValue } }); // name 속성 추가
    }
  };

  const clearInput = () => {
    setInputValue('');
    if (onChange) {
      onChange({ target: { name, value: '' } }); // name 속성 추가
    }
  };

  const togglePasswordVisibility = () => { // 2. 토글 핸들러 추가
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <TextFieldWrapper width={width}>
      <InputWrapper>
        <StyledLabel
          hasValue={inputValue !== ''}
          isFocused={isFocused}
          disabled={disabled}
        >
          {label}
        </StyledLabel>
        <Input
          type={type === 'password' && isPasswordVisible ? 'text' : type} // 2. 타입 변경
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          name={name} // name 속성 추가
        />
        {inputValue && !disabled && isFocused && ( // 3. 조건부 렌더링
          type === 'password' ? (
            <ToggleButton 
              onMouseDown={togglePasswordVisibility} 
              type="button" 
              aria-label={isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {isPasswordVisible ? '🙈' : '👁️'}
            </ToggleButton>
          ) : (
            <ClearButton onMouseDown={clearInput}>×</ClearButton>
          )
        )}
      </InputWrapper>
    </TextFieldWrapper>
  );
};

TextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string, // name prop 추가
};

TextField.defaultProps = {
  value: '',
  onChange: () => {},
  disabled: false,
  width: '310px',
  type: 'text',
  name: '', // 기본값 추가
};

export default TextField;

// 기존 스타일 컴포넌트 유지
const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
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
  border-radius: 16px;
  padding: 15px 40px 5px 10px;
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
  font-size: 35px;
  cursor: pointer;
  color: #434b60;
  padding: 10px;
  transition: color 0.2s ease;
  &:hover {
    color: #000;
  }
`;

// 4. ToggleButton 추가
const ToggleButton = styled.button`
  position: absolute;
  right: 3%;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #434b60;
  padding: 10px;
  transition: color 0.2s ease;
  &:hover {
    color: #000;
  }
`;
