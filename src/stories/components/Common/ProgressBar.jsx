import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// 기본 진행 바 컨테이너
const ProgressBarContainer = styled.div`
  display: flex;
  background-color: #d9d9d9;
  border-radius: 5px;
  width: ${props => props.width};  // 기본값을 props로 전달
  height: 10px;
  overflow: hidden;
`;

// 진행 상태를 표시하는 부분
const ProgressFill = styled.div`
  background-color: ${props => props.color || '#3182F7'};
  height: 100%;
  width: ${props => props.progress}%;
  transition: width 0.5s ease-in-out;
`;

const ProgressBar = ({ totalSteps, currentStep, color, width }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <ProgressBarContainer width={width}>
      <ProgressFill color={color} progress={progress}/>
    </ProgressBarContainer>
  );
};

ProgressBar.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,  // width의 propTypes 추가
};

ProgressBar.defaultProps = {
  color: '#3182F7',
  width: '100%',  // 기본값을 설정
};

export default ProgressBar;
