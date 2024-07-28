import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Primary UI component for user interaction
 */
const Button = React.forwardRef(
  ({ color, backgroundColor, hoverColor, hoverBackgroundColor, width, height, label, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        color={color}
        backgroundColor={backgroundColor}
        hoverColor={hoverColor}
        hoverBackgroundColor={hoverBackgroundColor}
        width={width}
        height={height}
        {...props}
      >
        {label}
      </StyledButton>
    );
  }
);

Button.propTypes = {
  /**
   * Text color
   */
  color: PropTypes.string,
  /**
   * Background color
   */
  backgroundColor: PropTypes.string,
  /**
   * Hover text color
   */
  hoverColor: PropTypes.string,
  /**
   * Hover background color
   */
  hoverBackgroundColor: PropTypes.string,
  /**
   * Width of the button
   */
  width: PropTypes.string,
  /**
   * Height of the button
   */
  height: PropTypes.string,
  /**
   * Button contents
   */
  label: PropTypes.string.isRequired,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: 'white',
  backgroundColor: '#3182F7',
  hoverColor: 'white',
  hoverBackgroundColor: '#145c9e',
  width: '340px',
  height: '50px',
  onClick: undefined,
};

export default Button;

const StyledButton = styled.button`
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  padding: 11px 20px;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  transition: all 0.3s ease;
  &:hover {
    color: ${(props) => props.hoverColor};
    background-color: ${(props) => props.hoverBackgroundColor};
    transform: scale(0.98);
  }
`;
