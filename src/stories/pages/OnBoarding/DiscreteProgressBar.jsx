import React from 'react';
import PropTypes from 'prop-types';

const DiscreteProgressBar = ({ totalSteps, currentStep, width, height, gap }) => {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'row',
    width,
    height,
    transition: 'all ease 0.5s',
  };

  const barStyles = {
    width: `${100 / totalSteps}%`,
    height: '100%',
    backgroundColor: '#d9d9d9',
    overflow: 'hidden',
    marginRight: `${gap}px`, // gap props를 통해 간격 조절
  };

  const filledBarStyles = {
    ...barStyles,
    height: '100%',
    backgroundColor: '#3182F7',
  };

  return (
    <div style={containerStyles}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div key={index} style={index < currentStep ? filledBarStyles : barStyles} />
      ))}
    </div>
  );
};

DiscreteProgressBar.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  gap: PropTypes.number, // gap props 추가
};

DiscreteProgressBar.defaultProps = {
  width: '100%',
  height: '4px',
  gap: 3, // 기본 간격 설정
};

export default DiscreteProgressBar;
