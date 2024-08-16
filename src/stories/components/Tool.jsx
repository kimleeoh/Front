import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Tool = ({like, save, notification, report, onNotificationToggle, onSaveToggle}) => {
    const [likesCount, setLikesCount] = useState(like);
    const [isUpClicked, setIsUpClicked] = useState(false);
    const [isDownClicked, setIsDownClicked] = useState(false);

    const handleUpClick = () => {
        if (!isUpClicked) {
            setLikesCount(likesCount + 1);
            setIsUpClicked(true);
            setIsDownClicked(false); // Enable down button
        }
    };

    const handleDownClick = () => {
        if (!isDownClicked && likesCount > 0) {
            setLikesCount(likesCount - 1);
            setIsDownClicked(true);
            setIsUpClicked(false); // Enable up button
        }
    };

    return(
        <Wrapper>
            <LikeButton
                onClick={handleUpClick}
                disabled={isUpClicked}
                Icon='/Icons/Up.svg'
            />
            <span style={{color: '#3182F7'}}>{likesCount}</span>
            <LikeButton
                onClick={handleDownClick}
                disabled={isDownClicked}
                Icon='/Icons/Down.svg'
            />
            {save && (
                <ToolButton
                    disabledIconSrc='/Icons/Save_d.svg'
                    enabledIconSrc='/Icons/Save_e.svg'
                    onClick={onSaveToggle}
                />
            )}
            {notification && (
                <ToolButton
                    disabledIconSrc='/Icons/Notification_d.svg'
                    enabledIconSrc='/Icons/Notification_e.svg'
                    onClick={onNotificationToggle}
                />
            )}
            {report && (
                <Button style={{marginLeft: 'auto'}}><img src="/Icons/report.svg"></img></Button>
            )}
        </Wrapper>
    )
}

const ToolButton = ({disabledIconSrc, enabledIconSrc, onClick, disabled}) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleToolButtonClick = () => {
        setIsChecked(!isChecked);
        if (onClick) onClick();
    };
    return (
        <Button onClick={handleToolButtonClick}>
            <img src={isChecked ? enabledIconSrc : disabledIconSrc} />
        </Button>
    )
}

const LikeButton = ({ onClick, disabled, Icon }) => {
    return (
        <Button onClick={onClick} disabled={disabled}>
            <img src={Icon} alt="tool icon" />
        </Button>
    );
};

Tool.propTypes = {
    like: PropTypes.number.isRequired,
    save: PropTypes.bool.isRequired,
    notification: PropTypes.bool.isRequired,
    report: PropTypes.bool.isRequired,
    onNotificationToggle: PropTypes.func,
    onSaveToggle: PropTypes.func,
};
  
Tool.defaultProps = {
    like: 0,
    save: true,
    notification: true,
    report: true,
    onNotificationToggle: () => {},
    onSaveToggle: () => {},
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