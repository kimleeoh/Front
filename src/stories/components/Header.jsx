import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useWindowSize from './Common/WindowSize';

const Header = forwardRef(({ showIcon, text, backButton, searchButton, onClick, children }, ref) => {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  const handleSearchClick = () => {
    navigate('/search');
  };

  const {width: windowSize} = useWindowSize();

  return (
    <TopLayout maxWidth={windowSize}>
      <Head maxWidth={windowSize-40}>
        {backButton && (
          <LeftContent>
            <IconButton
              onClick={handleBackClick}
            >
              <img src="/Icons/Icon_arrow.svg" alt="Back" />
            </IconButton>
          </LeftContent>
        )}
        
        <CenterContent>
          {showIcon ? (
            <img src="/Logo-color.svg" alt="로고" />
          ) : (
            <span>{text}</span>
          )}
        </CenterContent>
        
        <RightContent ref={ref}>
          {searchButton && !children && (
            <IconButton onClick={handleSearchClick}>
              <img src="/Icons/Search.svg" alt="Search" />
            </IconButton>
          )}
          {children}
        </RightContent>
      </Head>
    </TopLayout>
  );
});

Header.propTypes = {
  showIcon: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  backButton: PropTypes.bool.isRequired,
  searchButton: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Header.defaultProps = {
  showIcon: false,
  text: 'Q&A',
  backButton: true,
  searchButton: true,
};

export default Header;

const TopLayout = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
  
  background: rgba(240, 242, 244, 0.30);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  z-index: 1000;
  padding: 10px 10px 20px 10px;
`;

const Head = styled.div`
  width: ${(props) => props.maxWidth}px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 20px 10px;
`;

const IconButton = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(172, 178, 187, 0.3);
  }

  &:active {
    scale: 0.95;
  }

`;

const LeftContent = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const RightContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
`;

const CenterContent = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 35%;
  font-size: 18px;
  font-weight: bold;
  color: #434b60;
  text-align: center;
`;
