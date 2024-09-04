import react, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Report from '../../components/Common/Report'
import Tool from '../../components/Common/Tool';
import CarouselTemp from '../../components/Common/CarouselTemp';

const Answers = ({_id, name, level, user_grade, major, content, img, like }) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];
    
    return (
        <OutWrapper>
            <Wrapper>
                <SubWrapper>
                    <Title><img src="/Icons/A.svg" /></Title>
                    <img src="/Icons/Profile.svg" />
                    <ProfileContainer>
                        <LevelGrade>Lv. {level} | {user_grade} 등급</LevelGrade>
                        <MajorName>{major} {name}</MajorName>
                     </ProfileContainer>
                     <Button style={{marginLeft: 'auto'}}><img src="/Icons/report.svg" onClick={() => Report(_id={_id})} /></Button>
                </SubWrapper>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <CarouselWrapper>
                        <CarouselTemp
                            width="380px"
                            height="380px"
                            autoPlay={false}
                            showBullets={true}
                            showFraction={true}
                            infinite={true}
                        >
                            {images.map((image, index) => (
                                <Image key={index} src={image} draggable="false" />
                            ))}
                        </CarouselTemp>
                    </CarouselWrapper>
                )}

                <Tool like={like} save={false} notification={false} report={false} _id={_id}/>
            </Wrapper>
        </OutWrapper>
    );
}

export default Answers;

Answers.propTypes = {
    _id: PropTypes.string.isRequired,
    Rqna: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    user_grade: PropTypes.string.isRequired,
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
    _id: 0,
    post_id: 0,
    name: '이름',
    level: 1,
    user_grade: '성적',
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
        width: 25px;
        height: 25px;
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

const CarouselWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
`;