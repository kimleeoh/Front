import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tool from './Tool';

const Answers = ({name, level, grade, major, profileImg, content, img }) => {
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
                {img && <ImageContainer>
                    <Image src={img}/>
                </ImageContainer>}
                <Tool like={10} save={false} notification={false} report={false}/>
            </Wrapper>
        </OutWrapper>
    );
}

export default Answers;

Answers.propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.string
};

Answers.defaultProps = {
    name: '이름',
    level: 1,
    grade: '성적',
    major: '전공',
    profileImg: '/Icons/profile.svg',
    content: '내용',
    img: null
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

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 20px;
`;

const Image = styled.img`
    width: 380px;
    height: 380px;
    object-fit: cover;
    object-position: center;
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