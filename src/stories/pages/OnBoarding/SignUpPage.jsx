import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import DiscreteProgressBar from './DiscreteProgressBar';

const SignUpPage = () => {
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
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSigninClick = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    // 이메일 형식 검사
    if (name === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(value===''){
          setErrorMessage('');
        }
        else {
        if (!emailPattern.test(value)) {
            setErrorMessage('유효한 이메일 주소를 입력해 주세요.');
        } else {
            setErrorMessage('');
        }
      }
    }

    // 비밀번호와 비밀번호 확인 검사
    if (name === 'confirmPassword' || name === 'password') {
        const { password, confirmPassword } = { ...formData, [name]: value };

        // 1. 비밀번호 확인 필드에 값이 있는지 확인
        if (confirmPassword) {
            // 2. 비밀번호 확인의 값이 비밀번호 값과 같은지 확인
            if (password !== confirmPassword) {
                setErrorMessage('비밀번호가 일치하지 않습니다.');
            } else {
                setErrorMessage('');
            }
        } else {
            setErrorMessage(''); // 비밀번호 확인 필드가 비어있다면 에러 아님
        }
    }
};



  const handleNext = () => {
    if (validateStep()) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = async () => {
    console.log('제출된 데이터:', formData);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.department.trim() !== '';
      case 3:
        return !isNaN(Number(formData.studentId)) && formData.studentId.trim() !== '';
      case 4:
        return formData.email.trim() !== '';
      case 5:
        return formData.confirmEmail.trim() !== '';
      case 6:
        return formData.password.trim() !== '' && formData.password === formData.confirmPassword;
      default:
        return false;
    }
  };

  const renderButtons = () => {
    const isStepValid = validateStep();

    return (
      <ButtonWrapper buttonCount={step === 1 || step === 6 ? 1 : 2}>
        {step > 1 && (
          <Button
            label="이전"
            onClick={handlePrevious}
            backgroundColor="#434B60"
            hoverBackgroundColor="#5A6480"
            width="48%"
          />
        )}
        <Button
          label={step === 6 ? '제출' : '다음'}
          onClick={step === 6 ? handleSubmit : handleNext}
          backgroundColor="#434B60"
          hoverBackgroundColor="#5A6480"
          width={step === 1 ? '100%' : '48%'}
          disabled={!isStepValid}
        />
      </ButtonWrapper>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <StepDescription>
              <Title>이름 입력</Title>
              <Subtitle>회원님의 전체 이름을 입력해 주세요.</Subtitle>
            </StepDescription>
            <TextField
              label="이름"
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
              <Title>학부 입력</Title>
              <Subtitle>현재 소속된 학부를 입력해 주세요.</Subtitle>
            </StepDescription>
            <TextField
              label="학부"
              value={formData.department}
              onChange={handleChange}
              name="department"
            />
          </>
        );
      case 3:
        return (
          <>
            <StepDescription>
              <Title>학번 입력</Title>
              <Subtitle>학교에서 부여받은 학번을 입력해 주세요.</Subtitle>
            </StepDescription>
            <TextField
              label="학번"
              value={formData.studentId}
              onChange={handleChange}
              name="studentId"
            />
          </>
        );
      case 4:
        return (
          <>
            <StepDescription>
              <Title>이메일 입력 및 인증</Title>
              <Subtitle>이메일 주소를 입력해 주세요.</Subtitle>
            </StepDescription>
            <TextFieldsWrapper>
              <TextField
                label="이메일"
                value={formData.email}
                onChange={handleChange}
                name="email"
              />
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            </TextFieldsWrapper>
          </>
        );
      case 5:
        return (
          <>
            <StepDescription>
              <Title>이메일 인증</Title>
              <Subtitle>이메일로 전송된 인증번호를 입력해 주세요.</Subtitle>
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
      case 6:
        return (
          <>
            <StepDescription>
              <Title>비밀번호 입력 및 확인</Title>
              <Subtitle>비밀번호와 확인 비밀번호를 입력해 주세요.</Subtitle>
            </StepDescription>
            <TextFieldsWrapper>
              <TextField
                label="비밀번호"
                type="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
              />
              <TextField
                label="비밀번호 확인"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
              />
              {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            </TextFieldsWrapper>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <FormWrapper>
        <DiscreteProgressBar 
          totalSteps={6} 
          currentStep={step} 
          width="100%" 
          height="8px" 
          gap={4} 
        />
        {renderStepContent()}
      </FormWrapper>
      {renderButtons()}
      <SigninWrapper>
        <Button 
          label="이미 계정이 있으신가요?" 
          width="200px"
          height="40px"
          color="#434B60"
          hoverColor="#434B60"
          backgroundColor="transparent"
          hoverBackgroundColor="#ACB2BB" 
          onClick={handleSigninClick}
        />
      </SigninWrapper>
    </Wrapper>
  );
};

export default SignUpPage;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const FormWrapper = styled.div`
  position: fixed;
  top: 15%;
  width: 100%;
  max-width: 400px;
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
  width: 400px;
  gap: 10px;

  button {
    width: ${({ buttonCount }) => (buttonCount === 1 ? '400px' : '48%')};
  }
`;

const SigninWrapper = styled.div`
  position: fixed;
  bottom: 15%;
  margin-bottom: -70px;
`;

const StepDescription = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
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
  gap: 20px;
`;

const ErrorText = styled.p`
  color: red;
  margin-top: -10px;
  font-size: 14px;
`;
