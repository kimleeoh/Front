import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseAxios from '../../../axioses/BaseAxios';
import { useState } from 'react';

const Tool = ({like, save, notification, report, isLikedPost,  handleLike, handleUnlike, _id}) => {
    const [likesCount, setLikesCount] = useState(like);
    const [isUpClicked, setIsUpClicked] = useState(false);
    const [isDownClicked, setIsDownClicked] = useState(false);

    const [isLiked, setIsLiked] = useState(isLikedPost);

    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);

    const handleUpClick = () => {
        if (!isUpClicked && !isLiked) {
            setLikesCount(likesCount + 1);
            setIsUpClicked(true);
            setIsDownClicked(false); // Enable down button
            handleLike();
        }
    };

    const handleDownClick = () => {
        if (!isDownClicked && likesCount > 0) {
            setLikesCount(likesCount - 1);
            setIsDownClicked(true);
            setIsUpClicked(false); // Enable up button
            handleUnlike();
        }
    };

    const handleNotificationToggle = () => {
        setIsNotificationEnabled(!isNotificationEnabled);
        if (!isNotificationEnabled) {
            // Send notification data when enabled
            sendNotificationData({
                postId: _id,
            });
        } else {
            // Remove notification data when disabled
            removeNotificationData({
                postId: _id
            });
        }
    };

    const sendNotificationData = (data) => {
        // This function would send the notification data to your backend or local storage
        console.log("Notification enabled for post:", data);
        // Here you would typically make an API call or update local storage
        // For example:
        // localStorage.setItem(`notification_${data.postId}`, JSON.stringify(data));
    };

    const removeNotificationData = (postId) => {
        // This function would remove the notification data
        console.log("Notification disabled for post:", postId);
        // Here you would typically make an API call or update local storage
        // For example:
        // localStorage.removeItem(`notification_${postId}`);
    };

    const handleSaveToggle = () => {
        setIsSaveEnabled(!isSaveEnabled);
        if (!isSaveEnabled) {
            // Send notification data when enabled
            sendSaveData({
                postId: _id,
            });
        } else {
            // Remove notification data when disabled
            removeSaveData({
                postId: _id
            });
        }
    };

    const sendSaveData = (data) => {
        // This function would send the notification data to your backend or local storage
        console.log("Save enabled for post:", data);
        // Here you would typically make an API call or update local storage
        // For example:
        // localStorage.setItem(`notification_${data.postId}`, JSON.stringify(data));
    };

    const removeSaveData = (postId) => {
        // This function would remove the notification data
        console.log("Save disabled for post:", postId);
        // Here you would typically make an API call or update local storage
        // For example:
        // localStorage.removeItem(`notification_${postId}`);
    };

    const handleReport = () => {
        console.log(`Reported post with ID: ${_id}`);
        alert(`Post with ID: ${_id} has been reported.`);
        BaseAxios.post('/api/warn', {
            warnWhy: 0 // 신고 사유에 따라 달라짐
        })
        .then(function(response) {
            console.log(response)
        })
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
                    onClick={handleSaveToggle}
                />
            )}
            {notification && (
                <ToolButton
                    disabledIconSrc='/Icons/Notification_d.svg'
                    enabledIconSrc='/Icons/Notification_e.svg'
                    onClick={handleNotificationToggle}
                />
            )}
            {report && (
                <Button style={{marginLeft: 'auto'}} onClick={handleReport}><img src="/Icons/report.svg"></img></Button>
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
    isLikedPost: PropTypes.bool.isRequired,
    like: PropTypes.number.isRequired,
    save: PropTypes.bool.isRequired,
    notification: PropTypes.bool.isRequired,
    report: PropTypes.bool.isRequired,
    handleLike: PropTypes.func,
    handleUnlike: PropTypes.func,
    _id: PropTypes.string
};
  
Tool.defaultProps = {
    isLikedPost: false,
    like: 0,
    save: true,
    notification: true,
    report: true,
    handleLike: () => {},
    handleUnlike: () => {},
    _id: 0,
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
    transition: all 0.3s ease;

    img{
        width: 25px;
        height: 25px;
    }

    cursor: pointer;

    &:active {
        scale: 0.85;
    }
`