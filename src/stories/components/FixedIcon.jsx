import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const FixedIcon = ({src, url}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (url) {
            navigate(url);
        }
    };

    return (
        <FixedIconContainer>
            <Button onClick={handleClick}>
                <img src={src} />
            </Button>
        </FixedIconContainer>
    )
}

export default FixedIcon;

const FixedIconContainer = styled.div`
    position: fixed;
    margin-left: 300px;
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

        box-shadow: 2px 4px 10px gray;
    }

    &:hover {
        
    }
    &:active {
        transition: all 0.3s ease;
        scale: 0.95;
    }
`