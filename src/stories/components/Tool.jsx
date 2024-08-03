import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Tool = ({like, report}) => {
    return(
        <Wrapper>
            <ToolButton 
                disabledIconSrc='/Icons/Up.svg'
                enabledIconSrc='/Icons/Up.svg'
            />
            <span style={{marginLeft: '5px', marginRight: '5px'}}>{like}</span>
            <ToolButton
                disabledIconSrc='/Icons/Down.svg'
                enabledIconSrc='/Icons/Down.svg'
            />

            <ToolButton
                disabledIconSrc='/Icons/Save_d.svg'
                enabledIconSrc='/Icons/Save_e.svg'
            />

            <ToolButton
                disabledIconSrc='/Icons/Notification_d.svg'
                enabledIconSrc='/Icons/Notification_e.svg'
            />

            {report && (
                <Button style={{marginLeft: 'auto'}}><img src="/Icons/report.svg"></img></Button>
            )}
        </Wrapper>
    )
}

const ToolButton = ({disabledIconSrc, enabledIconSrc}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleToolButtonClick = () => {
        setIsChecked(isChecked === 'true' ? 'false' : 'true');
    };
    return (
        <Button onClick={handleToolButtonClick}>
            <img src={isChecked === 'true' ? enabledIconSrc : disabledIconSrc} />
        </Button>
    )
}

Tool.propTypes = {
    like: PropTypes.number.isRequired,
    report: PropTypes.bool.isRequired,
};
  
Tool.defaultProps = {
    like: 0,
    report: true,
};

export default Tool;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 380px;
    height: 30px;

    margin-top: 10px;
`

const Button = styled.button`
    display: flex;

    border: 0px;
    background-color: white;

    img{
        width: 20px;
        height: 20px;
        transition: all 0.3s ease;
    }

    cursor: pointer;


    &:hover {
        transition: all 0.3s ease;
    }

    &:active {
        transition: all 0.3s ease;
        scale: 0.95;
    }
`