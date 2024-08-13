import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';
import { useState } from 'react';
import ImageUploader from './ImageUploader';
import TextField from '../components/TextField'
import TextArea from './TextArea';

const User = ({name, level, grade, figure, major, profileImg, limit}) => {
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswerSubmit = () => {
        setIsAnswered(true);
    };

    if (isAnswered) {
        return (
            <OutWrapper>
                <Wrapper>
                    <SubWrapper>
                        <img src="/Icons/Profile.svg" />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | {grade} 등급</LevelGrade>
                            <MajorName>{major} {name}</MajorName>
                        </ProfileContainer>
                        <Button fontSize={'10px'} width={'80px'} height={'30px'} label={'답변등록'} style={{marginLeft: 'auto'}}></Button>
                    </SubWrapper>
                    <TextAreaWrapper>
                        <TextArea width={'330px'} height={'100px'} fontSize={'15px'} backgroundColor={'#F0F2F4'} placeholder={"답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요."}/>
                    </TextAreaWrapper>
                    <ImageUploader/>
                </Wrapper>
            </OutWrapper>
        );
    }

    if (limit === false) {
        return (
            <OutWrapper>
                <Wrapper>
                    <SubWrapper>
                        <img src="/Icons/Profile.svg" />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | {grade} 등급</LevelGrade>
                            <MajorName>{major} {name}<span style={{color: '#3182F7'}}>님은 답변 등록이 가능합니다.</span></MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                    <Button fontSize={'10px'} width={'80px'} height={'30px'} label={'답변등록'} style={{marginLeft: 'auto', marginTop: '5px'}} onClick={handleAnswerSubmit}></Button>
                </Wrapper>
            </OutWrapper>
        )
    }

    return (
        <OutWrapper>
            <Wrapper>
                {figure === null ? (
                    <SubWrapper>
                        <img src="/Icons/Profile.svg" />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | 미정</LevelGrade>
                            <MajorName><span style={{color: '#ACB2BB'}}>성적 입력 후 답변이 가능합니다.</span></MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                ) : figure >= 2 ? (
                    <SubWrapper>
                        <img src="/Icons/Profile.svg" />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | {grade} 등급</LevelGrade>
                            <MajorName>{major} {name}<span style={{color: '#3182F7'}}>님은 답변 등록이 가능합니다.</span></MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                ) : (
                    <SubWrapper>
                        <img src="/Icons/Profile.svg" />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | {grade} 등급</LevelGrade>
                            <MajorName>{major} {name}<span style={{color: '#ACB2BB'}}>님은 답변 등록이 불가능합니다.</span></MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                )}
                {figure === null ? (
                    <Button fontSize={'10px'} width={'80px'} height={'30px'} label={'답변등록'} disabled={true} style={{marginLeft: 'auto', marginTop: '5px'}}></Button>
                ) : figure >= 2 ? (
                    <Button fontSize={'10px'} width={'80px'} height={'30px'} label={'답변등록'} style={{marginLeft: 'auto', marginTop: '5px'}} onClick={handleAnswerSubmit}></Button>
                ) : (
                    <Button fontSize={'10px'} width={'80px'} height={'30px'} label={'답변등록'} disabled={true} style={{marginLeft: 'auto', marginTop: '5px'}}></Button>
                )}
            </Wrapper>
        </OutWrapper>
    );
}

export default User;

User.propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    grade: PropTypes.string.isRequired,
    figure: PropTypes.number,
    major: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    limit: PropTypes.bool.isRequired,
};

User.defaultProps = {
    name: '이름',
    level: 1,
    grade: null,
    figure: null,
    major: '전공',
    profileImg: '/Icons/profile.svg'
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    padding: 15px 15px;

    margin-top: 15px;

    border-radius: 10px;
    background-color: #F0F2F4;
`;

const SubWrapper = styled.div`
    display: flex;
    align-items: center;
`

const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
`;

const Subject = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
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

const PlaceHolder = styled.div`
    display: flex; 
    padding: 20px 20px;

    font-size: 12px;
    color: #ACB2BB;
    
`

const TextAreaWrapper = styled.div`
    padding: 0px 10px;
`

const ImageUploaderWrapper = styled.div`
    width: 280px;
`