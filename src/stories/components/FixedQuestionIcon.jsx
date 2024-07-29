import styled from 'styled-components';

const FixedQuestionIcon = () => {
    return (
        <FixedIconContainer>
            <Button>
                <img src="/Icons/Question.svg"/>
            </Button>
        </FixedIconContainer>
    )
}

export default FixedQuestionIcon;

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