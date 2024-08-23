import react, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tool from './Tool';

const Answers = ({id, post_id, name, level, grade, major, profileImg, content, img, like }) => {
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
                <SubWrapper>
                    <Title><img src="/Icons/A.svg" style={{marginRight: '10px'}}/></Title>
                    <img src="/Icons/Profile.svg" />
                    <ProfileContainer>
                        <LevelGrade>Lv. {level} | {grade} 등급</LevelGrade>
                        <MajorName>{major} {name}</MajorName>
                     </ProfileContainer>
                     <Button style={{marginLeft: 'auto'}}><img src="/Icons/report.svg" /></Button>
                </SubWrapper>
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

                <Tool like={like} save={false} notification={false} report={false}/>
            </Wrapper>
        </OutWrapper>
    );
}

export default Answers;

Answers.propTypes = {
    id: PropTypes.string.isRequired,
    post_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    like: PropTypes.number.isRequired,
};

Answers.defaultProps = {
    id: 0,
    post_id: 0,
    name: '이름',
    level: 1,
    grade: '성적',
    major: '전공',
    profileImg: '/Icons/profile.svg',
    content: '내용',
    img: null,
    like: 0,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    padding: 20px 10px;
    border-bottom: 1px solid #F1F2F4;
`;

const SubWrapper = styled.div`
    display: flex;
    align-items: center;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
`;


const ProfileContainer = styled.div`
    margin-left: 10px;
`

const LevelGrade = styled.div`
    display: flex;
    align-items: center;
    font-size: 8px;
`
const MajorName = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
`

const OutWrapper = styled.div`
    width: 400px;
`;

const Image = styled.img`
    width: 380px;
    height: 380px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
    transition: transform 0.2s;
`;

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

const IndexIndicator = styled.div`
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #434B60;
`;

const ArrowButtonLeft = `
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

const ArrowButtonRight = `
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