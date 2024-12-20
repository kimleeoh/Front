import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useWindowSize from "./Common/WindowSize";

const Header = forwardRef(
  (
    {
      showIcon,
      text,
      backButton,
      searchButton,
      onClick,
      children,
      backurl,
    },
    ref
  ) => {
    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();

    const handleBackClick = (e) => {
      e.preventDefault();
      if (onClick) {
        onClick();
      } else if (backurl) {
        navigate(backurl);
      } else {
        navigate(-1);
      }
    };

    const handleSearchClick = () => {
      navigate("/search");
    };

    return (
      <TopLayout>
        <BlurBackground />
        <Head maxWidth={windowSize > 430 ? 400 : windowSize - 40}>
          <LeftContent>
            {backButton && (
              <IconButton onClick={handleBackClick}>
                <img src={"/Icons/Icon_arrow.svg"} alt="Back" />
              </IconButton>
            )}
          </LeftContent>

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
                <img src={"/Icons/Search.svg"} alt="Search" />
              </IconButton>
            )}
            {children}
          </RightContent>
        </Head>
      </TopLayout>
    );
  }
);

Header.propTypes = {
  showIcon: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  backButton: PropTypes.bool.isRequired,
  searchButton: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
  backurl: PropTypes.string,
};

Header.defaultProps = {
  showIcon: false,
  text: "Q&A",
  backButton: true,
  searchButton: false,
  backurl: "",
};

export default Header;

const TopLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  z-index: 1000;
  padding: 10px;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
`;

const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(240, 242, 244, 0.3);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  z-index: -1;
`;

const Head = styled.div`
  position: relative;
  width: 100%;
  max-width: ${(props) => props.maxWidth}px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
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