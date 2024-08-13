import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tool from './Tool';

const QuestionsDetail = ({ name, major, title, content, subject, time, read, like, img, limit }) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < images.length - 1) {
            setCurrentIndex(currentIndex + 1);
            containerRef.current.scrollBy({ left: containerRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            containerRef.current.scrollBy({ left: -containerRef.current.offsetWidth, behavior: 'smooth' });
        }
    };

    return (
        <OutWrapper>
            <Wrapper>
                <Title>
                    <img src="/Icons/Q.svg" alt="Q icon" />
                    <span>{title}</span>
                </Title>

                <MetaContainer>
                    <span>{time}분 전 | {major} {name} | 조회수 {read}</span>
                </MetaContainer>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <ImageWrapper>
                        {/* Only show the left arrow if there are multiple images */}
                        {images.length > 1 && (
                            <ArrowButtonLeft onClick={handlePrevious} disabled={currentIndex === 0}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                                </svg>
                            </ArrowButtonLeft>
                        )}

                        <ImageContainer ref={containerRef}>
                            {images.map((image, index) => (
                                <Image key={index} src={image} />
                            ))}
                        </ImageContainer>

                        {/* Only show the right arrow if there are multiple images */}
                        {images.length > 1 && (
                            <ArrowButtonRight onClick={handleNext} disabled={currentIndex === images.length - 1}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                                </svg>
                            </ArrowButtonRight>
                        )}
                    </ImageWrapper>
                )}

                {/* Only show the index indicator if there are multiple images */}
                {images.length > 1 && (
                    <IndexIndicator>
                        {currentIndex + 1} / {images.length}
                    </IndexIndicator>
                )}

                <Tool like={like} report={false} />
            </Wrapper>
        </OutWrapper>
    );
};

export default QuestionsDetail;

QuestionsDetail.propTypes = {
    name: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    read: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    img: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    limit: PropTypes.bool.isRequired
};

QuestionsDetail.defaultProps = {
    name: '이름',
    major: '전공',
    title: '제목',
    content: '내용',
    subject: '과목',
    time: 0,
    read: 0,
    like: 0,
    img: null,
    limit: false,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    padding: 20px 10px;
    border-bottom: 1px solid #F1F2F4;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;
    
    img {
        flex-shrink: 0;
        margin-right: 10px;
    }

    /* Title text will wrap, and wrapped lines will align correctly */
    span {
        display: inline-block;
        max-width: calc(100% - 30px); /* Adjust the width to account for the image and margin */
        line-height: 1.2; /* Adjust line height to your preference */
        word-break: break-word;
    }
`;


const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
`;

const MetaContainer = styled.div`
    display: flex;
    margin-top: auto;
    margin-left: 30px;
    font-size: 10px;
`;

const OutWrapper = styled.div`
    width: 400px;
`;

const ImageWrapper = styled.div`
    position: relative;
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
`;

const ImageContainer = styled.div`
    display: flex;
    overflow-x: hidden;
    width: 100%;
`;

const Image = styled.img`
    width: 380px;
    height: 380px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
    transition: transform 0.2s;
`;

const IndexIndicator = styled.div`
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #434B60;
`;

const ArrowButtonLeft = styled.button`
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    color: white;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    border-radius: 100%;

    &:disabled {
        background-color: rgba(0, 0, 0, 0.3);
        cursor: not-allowed;
    }
`;

const ArrowButtonRight = styled.button`
    display: flex;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    color: white;
    padding: 10px;
    cursor: pointer;
    z-index: 1;
    border-radius: 100%;

    &:disabled {
        background-color: rgba(0, 0, 0, 0.3);
        cursor: not-allowed;
    }
`;
