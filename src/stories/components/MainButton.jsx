import React from 'react';
import styled from "styled-components";

import Button from 'react-bootstrap/Button';

const CustomButton = styled(Button)`
    background-color: #3182F7;
    border-radius: 1.5rem;
    font-weight: bold;
    font-size: 16px;
    width: 90vw;
    max-width: 346px;
    height: 12vw;
    max-height: 50px; 
`

function MainButton() {
  return (
    <div className="d-grid gap-2">
      <CustomButton variant="primary" size="lg">
        등록하기
      </CustomButton>
    </div>
  );
}

export default MainButton;