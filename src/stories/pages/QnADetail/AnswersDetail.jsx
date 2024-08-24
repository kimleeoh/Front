import react, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tool from '../../components/Common/Tool';

const Answers = ({id, post_id, name, level, grade, major, profileImg, content, img, like }) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);
    const [dragStart, setDragStart] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const handleDragStart = (e) => {
        setIsDragging(true);
        setDragStart(e.clientX || e.touches[0].clientX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const currentPosition = e.clientX || e.touches[0].clientX;
        const diff = dragStart - currentPosition;
        setDragOffset(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        
        const threshold = containerRef.current.offsetWidth * 0.1; // 10% of container width
        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset > 0 && currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (dragOffset < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
        setDragOffset(0);
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: currentIndex * containerRef.current.offsetWidth,
                behavior: 'smooth',
            });
        }
    }, [currentIndex]);

    const handleReport = () => {
        console.log(`Reported post with ID: ${id}`);
        alert(`Post with ID: ${id} has been reported.`);
    };
    
    return (
        <OutWrapper>
            <Wrapper>
                <SubWrapper>
                    <Title><img src="/Icons/A.svg" /></Title>
                    <img src="/Icons/Profile.svg" />
                    <ProfileContainer>
                        <LevelGrade>Lv. {level} | {grade} 등급</LevelGrade>
                        <MajorName>{major} {name}</MajorName>
                     </ProfileContainer>
                     <Button style={{marginLeft: 'auto'}}><img src="/Icons/report.svg" onClick={handleReport} /></Button>
                </SubWrapper>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <ImageWrapper
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDragMove}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDragMove}
                        onTouchEnd={handleDragEnd}
                    >
                        <ImageContainer ref={containerRef}>
                            {images.map((image, index) => (
                                <Image key={index} src={image} draggable="false" />
                            ))}
                        </ImageContainer>
                        {images.length >= 2 && (
                            <DotContainer>
                                {images.map((_, index) => (
                                    <Dot 
                                        key={index} 
                                        isActive={index === currentIndex} 
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </DotContainer>
                        )}
                    </ImageWrapper>
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
    flex-direction: column;
    align-items: center;
    cursor: grab;
    user-select: none;
`;

const ImageContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: hidden;
    
`;

const Image = styled.img`
    width: 380px;
    height: 380px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
    flex-shrink: 0;
`;

const DotContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const Dot = styled.div`
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: ${props => props.isActive ? '#007bff' : '#bbb'};
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;