import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// NavBar Component
const NavBar = ({ state }) => {
    return (
        <BottomLayout>
            <NavButton
                isActive={state === 'QnA'}
                disabledIconSrc='/Icons/QnA_d.svg'
                enabledIconSrc='/Icons/QnA_e.svg'
            >
                QnA
            </NavButton>

            <NavButton
                isActive={state === 'Note'}
                disabledIconSrc='/Icons/Note_d.svg'
                enabledIconSrc='/Icons/Note_e.svg'
            >
                Note
            </NavButton>

            <NavButton
                isActive={state === 'Grade'}
                disabledIconSrc='/Icons/Grade_d.svg'
                enabledIconSrc='/Icons/Grade_e.svg'
            >
                Grade
            </NavButton>

            <NavButton
                isActive={state === 'Point'}
                disabledIconSrc='/Icons/Point_d.svg'
                enabledIconSrc='/Icons/Point_e.svg'
            >
                Point 
            </NavButton>
            
            <NavButton
                isActive={state === 'Mypage'}
                disabledIconSrc='/Icons/Mypage_d.svg'
                enabledIconSrc='/Icons/Mypage_e.svg'
            >
                My Page
            </NavButton>
        </BottomLayout>
    );
};

NavBar.propTypes = {
    state: PropTypes.oneOf(['QnA', 'Note', 'Grade', 'Point', 'Mypage']).isRequired,
};

NavBar.defaultProps = {
    state: 'QnA',
};

export default NavBar;

// NavButton Component
const NavButton = ({ isActive, disabledIconSrc, enabledIconSrc, children, ...props }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Button
            isActive={isActive}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <img src={isActive || isHovered ? enabledIconSrc : disabledIconSrc} alt={children} />
            {children}
        </Button>
    );
};

NavButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    disabledIconSrc: PropTypes.string.isRequired,
    enabledIconSrc: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; /* Center align the image and text */
    gap: 5px; /* Set the gap between the image and text */
    width: 65px;
    height: 65px;
    border-radius: 16px;
    border: 0px;
    background-color: #fff;
    font-size: 16px;
    color: ${(props) => (props.isActive ? '#434b60' : '#acb2bb')}; /* 조건부 색상 변경 */
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    
    img {
        width: 24px; /* Set the width of the icon */
        height: 24px; /* Set the height of the icon */
        transition: all 0.3s ease; /* Smooth transition for image change */
    }

    &:hover {
        background-color: #acb2bb;
        transform: scale(0.95);
        color: #434b60;
    }
`;

const BottomLayout = styled.div`
  position: fixed;
  gap: 10px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  z-index: 1000; /* 충분히 높은 z-index를 설정 */
`;
