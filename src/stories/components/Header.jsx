import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = ({ showIcon, text, backButton }) => {
  //const navigate = useNavigate();

  return (
    <TopLayout bgColor="white">
      {backButton && (
        <IconButtonWrapper>
          <IconButton
            src="/Icons/Icon_arrow.svg"
            width="40px"
            height="40px"
            //onClick={() => navigate(-1)}
          />
        </IconButtonWrapper>
      )}
      
      <CenterContent>
        {showIcon ? (
          <img src="/Logo-color.svg" alt="로고" />
        ) : (
          <span>{text}</span>
        )}
      </CenterContent>
    </TopLayout>
  );
};

Header.propTypes = {
  showIcon: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  backButton: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  showIcon: false,
  text: 'Q&A',
  backButton: true,
};

export default Header;

const TopLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.bgColor};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 49px;
  z-index: 1000;
  padding: 10px 10px 20px 10px;
`;

const IconButton = styled.img`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    cursor: pointer;
`;

const IconButtonWrapper = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);

  border-radius: 16px;

    &:hover {
        background-color: #acb2bb;
        transform: scale(0.95);
        color: #434b60;
    }
`;

const CenterContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-65%);
  top:35%;
  font-size: 18px;
  font-weight: 700;
  color: black;
`;