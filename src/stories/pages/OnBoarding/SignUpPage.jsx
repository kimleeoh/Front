import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import DiscreteProgressBar from './DiscreteProgressBar'; // DiscreteProgressBar 컴포넌트 가져오기

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
  const navigate = useNavigate();

  const handleSigninClick = () => {
    navigate('/home');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
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
    // 서버로 데이터를 전송하는 로직을 추가할 수 있습니다.
    // 예: await fetch('/api/signup', { method: 'POST', body: JSON.stringify(formData) });
    console.log('제출된 데이터:', formData);
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== '';
      case 2:
        return formData.department.trim() !== '';
      case 3:
        // studentId가 숫자인지 확인
        return !isNaN(Number(formData.studentId)) && formData.studentId.trim() !== '';
      case 4:
        return formData.email.trim() !== '' && formData.confirmEmail.trim() !== '';
      case 5:
        return formData.password.trim() !== '' && formData.password === formData.confirmPassword;
      default:
        return false;
    }
  };
  

  const renderButtons = () => {
    const isStepValid = validateStep(); // Check if the current step is valid
  
    if (step === 1) {
      return (
        <ButtonWrapper buttonCount={1}>
          <Button
            label="다음"
            onClick={handleNext}
            backgroundColor="#434B60"
            hoverBackgroundColor="#5A6480"
            width="100%"
            disabled={!isStepValid} // Disable button if step is not valid
          />
        </ButtonWrapper>
      );
    }
  
    if (step === 5) {
      return (
        <ButtonWrapper buttonCount={2}>
          <Button
            label="이전"
            onClick={handlePrevious}
            backgroundColor="#434B60"
            hoverBackgroundColor="#5A6480"
            width="48%"
          />
          <Button
            label="제출"
            onClick={handleSubmit}
            backgroundColor="#434B60"
            hoverBackgroundColor="#5A6480"
            width="48%"
            disabled={!isStepValid} // Disable button if step is not valid
          />
        </ButtonWrapper>
      );
    }
  
    return (
      <ButtonWrapper buttonCount={2}>
        <Button
          label="이전"
          onClick={handlePrevious}
          backgroundColor="#434B60"
          hoverBackgroundColor="#5A6480"
          width="48%"
        />
        <Button
          label="다음"
          onClick={handleNext}
          backgroundColor="#434B60"
          hoverBackgroundColor="#5A6480"
          width="48%"
          disabled={!isStepValid} // Disable button if step is not valid
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
              <Subtitle>이메일 주소를 입력하고 인증번호를 확인해 주세요.</Subtitle>
            </StepDescription>
            <TextFieldsWrapper>
            <TextField
              label="이메일"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
            <TextField
              label="인증번호"
              value={formData.confirmEmail}
              onChange={handleChange}
              name="confirmEmail"
            />
            </TextFieldsWrapper>
          </>
        );
      case 5:
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
          totalSteps={5} 
          currentStep={step} 
          width="100%" 
          height="8px" 
          gap={4} 
        />
        {renderStepContent()}
      </FormWrapper>
      
      {renderButtons()}
      <SigninWrapper>
        
      <Button label="이미 계정이 있으신가요?" 
                        width="200px"
                        height="40px"
                        color="#434B60"
                        hoverColor="#434B60"
                        backgroundColor="transparent"
                        hoverBackgroundColor="#ACB2BB" 
                        onclick={handleSigninClick}
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