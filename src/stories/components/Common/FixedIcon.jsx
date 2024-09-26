import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useWindowSize from './WindowSize';

const FixedIcon = ({src = '/Icons/Question.svg', url}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (url) {
            navigate(url);
        }
    };

    const {width: windowSize} = useWindowSize();

    return (
        <FixedIconContainer maxWidth={windowSize}>
            <Button onClick={handleClick}>
                <img src={src} />
            </Button>
        </FixedIconContainer>
    )
}

export default FixedIcon;

const FixedIconContainer = styled.div`
    position: fixed;
    right: ${(props) => props.maxWidth > 430 ? `${20 + (props.maxWidth - 430)/2}px` : '20px'};
    bottom: 100px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Button = styled.button`
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    cursor: pointer;
    transition: all 0.3s ease;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
        border-radius: 100%;
        width: 50px; /* Set the width of the icon */
        height: 50px; /* Set the height of the icon */
        transition: all 0.3s ease; /* Smooth transition for image change */

        
        box-shadow: 0px 2px 4px gray;
    }

    &:hover {
    
        box-shadow: 2px 4px 10px gray;
        
    }
    &:active {
        transition: all 0.3s ease;
        scale: 0.9;
        box-shadow: 0px 0px 0px gray;
    }
`