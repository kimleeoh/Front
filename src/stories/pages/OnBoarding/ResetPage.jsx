import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Checker from '../../components/Common/Checker';
import { SignUpHandler } from '../../../axioses/SignUpHandler';
import useWindowSize from '../../components/Common/WindowSize';
import BaseAxios from '../../../axioses/BaseAxios';
import Logo from './Logo';


const ResetPage = () => {
  const {width: windowSize} = useWindowSize();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    studentId: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordValid, setPasswordValid] = useState({
    lengthValid: false,
    hasNumber: false,
    hasSpecialChar: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSigninClick = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  
    if (name === 'password' || name === 'confirmPassword') {
      const { password, confirmPassword } = { ...formData, [name]: value };
  
      if (name === 'password') {
        const { lengthValid, hasNumber, hasSpecialChar } = validatePassword(value);
        setPasswordValid({ lengthValid, hasNumber, hasSpecialChar });
      }
  
      if (name === 'confirmPassword') {
        if (password !== confirmPassword) {
          setErrorMessage('비밀번호가 일치하지 않습니다.');
        } else {
          setErrorMessage('');
        }
      }
    }
  };


  const validatePassword = (password) => {
    const lengthValid = password.length >= 8 && password.length <= 12;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return { lengthValid, hasNumber, hasSpecialChar };
  };

  const handleNext = async () => {
    if (validateStep()) {
      if (step < 4) {
        const a = await SignUpHandler(step, formData);
        if(a){setStep(prevStep => prevStep + 1);}
      } else if (step === 4) {
        const result = await BaseAxios.post('/api/register/emailAlready', { email: formData.email }); 
        if(result.status === 201){alert("이미 가입된 이메일입니다.");}
        else{
          BaseAxios.post('/api/register/email', { email: formData.email });
          setStep(prevStep => prevStep + 1);}
      } else if (step === 5) {
        try {
          const r = await BaseAxios.post('/api/register/emailAuthNum', { email: formData.email, authNum: formData.confirmEmail });
          if (r.status === 200) {
            console.log("인증 성공");
            SignUpHandler(step - 1, formData);
            setStep(prevStep => prevStep + 1);
          } else {
            console.log("인증 실패");
            console.log(r.data);
            setErrorMessage("인증번호가 올바르지 않습니다. 다시 입력해 주세요.");
            alert("인증에 실패했습니다. 다시 시도해 주세요.");
          }
        } catch (error) {
          console.error("인증 오류", error);
          setErrorMessage("인증 과정에서 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
    }
  };
  

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async () => {
    // 서버로 데이터를 전송하는 로직을 추가할 수 있습니다.
    // 예: await fetch('/api/signup', { method: 'POST', body: JSON.stringify(formData) });
    console.log(step-1)
    SignUpHandler(step-1, formData);
    console.log('제출된 데이터:', formData);
    navigate('/confirm');
  };

  const validateStep = () => {
    switch (step) {
        case 1:
            // 이름 입력: 공백 확인
            return formData.name.trim() !== '';
        case 2:
            // 인증 이메일의 입력 여부 확인 (별도의 인증 로직이 있을 수도 있음)
            return formData.confirmEmail.trim() !== '';
        case 3:
            // 비밀번호 유효성 확인 (비밀번호 일치 및 유효성)
            const { lengthValid, hasNumber, hasSpecialChar } = passwordValid;
            return (
                formData.password.trim() !== '' &&
                formData.password === formData.confirmPassword &&
                lengthValid && hasNumber && hasSpecialChar
            );
        default:
            return false;
    }
};


  const renderButtons = () => {
    const isStepValid = validateStep();

    return (
      <Button
          label={step === 3 ? '완료' : '다음'}
          onClick={step === 3 ? handleSubmit : handleNext}
          backgroundColor="#434B60"
          hoverBackgroundColor="#5A6480"
          
          disabled={!isStepValid}
        />
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <StepDescription>
              <Title>비밀번호를 찾고자하는 아이디를 입력해 주세요</Title>
            </StepDescription>
            <TextField
              label="아이디"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
          </>
        );
      case 2:
        return (
            <>
            <StepDescription>
              <Title>아이디의 이메일로 전송된 인증번호를 입력해주세요</Title>
            </StepDescription>
            <TextFieldsWrapper>
              <TextField
                label="인증번호"
                value={formData.confirmEmail}
                onChange={handleChange}
                name="confirmEmail"
              />
            </TextFieldsWrapper>
            <div style={{ marginTop: '-20px', display: 'flex' , alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <Button label="인증번호 재전송" width="160px"
          height="40px"
          color="#434B60"
          hoverColor="#434B60"
          backgroundColor="#e2e5e9"
          hoverBackgroundColor="#ACB2BB"  />
            </div>
          </>
        );
      case 3:
        return (
            <>
            <StepDescription>
              <Title>비밀번호 입력 및 확인</Title>
              <Subtitle>비밀번호와 확인 비밀번호를 입력해 주세요.</Subtitle>
            </StepDescription>
            <TextFieldsWrapper>
              <TextField
                label="새 비밀번호"
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
              <TextField
                label="새 비밀번호 확인"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
              <div style={{ marginTop: '-15px',  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: {windowSize}}}>
                <Checker
                  text="비밀번호는 8~12자 이내로 입력하세요."
                  type="check"
                  readOnly={true}
                  checked={passwordValid.lengthValid}
                />
                <Checker
                  text="숫자를 포함하세요."
                  type="check"
                  readOnly={true}
                  checked={passwordValid.hasNumber}
                />
                <Checker
                  text="특수문자를 포함하세요."
                  type="check"
                  readOnly={true}
                  checked={passwordValid.hasSpecialChar}
                />
              </div>
            </TextFieldsWrapper>
          </>
        );
      default:
        return null;
    }
  };
  return (
    <Wrapper maxWidth={windowSize}>
      <FormWrapper maxWidth={windowSize}>
        
      <LogoWrapper>
            <Logo />
        </LogoWrapper>
        {renderStepContent()}
      </FormWrapper>
      {renderButtons()}
    </Wrapper>
  );
};

export default ResetPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormWrapper = styled.div`
  position: fixed;
  top: 15%;

  width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
  padding: ${(props) => (props.maxWidth > 430 ? '0px' : '0 20px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 15%;
  display: flex;
  justify-content: ${({ buttonCount }) => (buttonCount === 1 ? 'center' : 'space-between')};
  margin-top: 20px;
  width: 100%;
  max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
  padding: 0 10px;
  box-sizing: border-box;
  gap: 10px;
`;

const SigninWrapper = styled.div`
  position: fixed;
  bottom: 15%;
  margin-bottom: -70px;
`;

const StepDescription = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: -10px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin: 0;
  color: #434B60;
`;

const Subtitle = styled.p`
  font-size: 18px;
  margin: 0;
  color: #6c757d;
`;

const TextFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: -10px;
  font-size: 14px;
`;

const LogoWrapper = styled.div`
    width: 100%;
    height: 100px;
`;
