import styled from 'styled-components';

const FixedBottomContainer = styled.div`
  position: fixed;  
  bottom: 80px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  gap: 20px;
`;

export default FixedBottomContainer;