import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Tool = ({like, save, notification, report}) => {
    return(
        <Wrapper>
            <ToolButton 
                disabledIconSrc='/Icons/Up.svg'
                enabledIconSrc='/Icons/Up.svg'
            />
            <span style={{marginLeft: '5px', marginRight: '5px', color: '#3182F7'}}>{like}</span>
            <ToolButton
                disabledIconSrc='/Icons/Down.svg'
                enabledIconSrc='/Icons/Down.svg'
            />
            {save && (
                <ToolButton
                disabledIconSrc='/Icons/Save_d.svg'
                enabledIconSrc='/Icons/Save_e.svg'
            />
            )}
            {notification && (
                <ToolButton
                disabledIconSrc='/Icons/Notification_d.svg'
                enabledIconSrc='/Icons/Notification_e.svg'
            />
            )}
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
    save: PropTypes.bool.isRequired,
    notification: PropTypes.bool.isRequired,
    report: PropTypes.bool.isRequired,

};
  
Tool.defaultProps = {
    like: 0,
    save: true,
    notification: true,
    report: true,
};

export default Tool;

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    width: 380px;
    height: 30px;

    margin-top: 15px;
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