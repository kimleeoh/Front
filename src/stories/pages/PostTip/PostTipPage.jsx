import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import TextField from '../../components/TextField';
import TextInput from '../../components/Common/TextInput';
import TextArea from '../../components/Common/TextArea';
import SelectBoard from '../../components/Common/SelectBoard';
import ImageUploader from '../../components/Common/ImageUploader2';
import PointInput from '../PostQuestion/PointInput';
import CheckBar from '../../components/Common/CheckBar';
import Button from '../../components/Button'
import BadgeFilter from '../../components/Common/BadgeFilter';

const initialUserData = [
    {
        id: 1,
        name: '이예진',
        major: '글로벌미디어학부',
        point: 1020,
    }
];

const PostQuestionPage = () => {
    const [formValues, setFormValues] = useState({
        title: '',
        board: [],
        tags: [],
        content: '',
        images: [],
        time: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const [userData, setUserData] = useState([]);
    useEffect(() => {
        // Local storage operations for user data
        localStorage.removeItem('userData');
        const userData = localStorage.getItem('userData');
        if (userData) {
            setUserData(JSON.parse(userData));
        } else {
            localStorage.setItem('userData', JSON.stringify(initialUserData));
            setUserData(initialUserData);
        }
    }, []);
    
    const boardOptions = [
        {
            value: '교양선택',
            label: '교양선택',
            subcategories: [
                {   value: '23이후', 
                    label: '23이후', 
                    subcategories: [
                        {value: '과학&기술', label: '과학&기술'},
                        {value: '문화&예술', label: '문화&예술'},
                        {value: '사회&정치&경제', label: '사회&정치&경제'},
                        {value: '인간&언어', label: '인간&언어'},
                        {value: '자기개발&진로탐색', lable: '자기개발&진로탐색'},
                    ]},
                { value: '기독교과목', label: '기독교과목' },
            ],
        },
        {
            value: '교양필수',
            label: '교양필수',
            subcategories: [
                { value: 'subcategory2_1', label: 'Subcategory 2.1' },
                { value: 'subcategory2_2', label: 'Subcategory 2.2' },
            ],
        },
        {
            value: '학부별전공',
            label: '학부별전공',
            subcategories: [
                { value: 'subcategory2_1', label: 'Subcategory 2.1' },
                { value: 'subcategory2_2', label: 'Subcategory 2.2' },
            ],
        },
    ];

    useEffect(() => {
        const { title, board, tags, content } = formValues;
        const isValid = title.trim() !== '' && 
                        board.length > 0 && 
                        tags.length > 0 &&
                        content.trim() !== '';
        setIsFormValid(isValid);
    }, [formValues]);

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const now = new Date().toISOString();

        // Update 'time' first then proceed with form submission
        setFormValues((prevFormValues) => {
            const user = userData[0] || {};
            const updatedFormValues = { ...prevFormValues, name: user.name, major: user.major, time: now };
            
            if (isFormValid) {
                // Add your API call here to send updatedFormValues to the backend.
                console.log(updatedFormValues);
            }

            return updatedFormValues;
        });
    };


    return (
        <Wrapper>
            <Header showIcon={false} text="글 작성하기" backButton={true} searchButton={false}/>
            <TextInput 
                width={'380px'} 
                height={'30px'} 
                fontSize={'15px'} 
                placeholder={'제목 입력'}  
                onChange={(value) => handleInputChange('title', value)}
            />
            {!formValues.title.trim() && <HelperText>제목 입력이 필요합니다.</HelperText>}
            <SelectBoard 
                options={boardOptions} 
                onChange={(value) => handleInputChange('board', value)}
            />
            {formValues.board.length === 0 && <HelperText>게시판 선택이 필요합니다.</HelperText>}
            <BadgeFilter onFilterChange={(value) => handleInputChange('tags', value)} />
            {formValues.tags.length === 0 && <HelperText>필터 선택이 필요합니다.</HelperText>}
            <TextArea 
                width={'380px'} 
                height={'300px'} 
                fontSize={'15px'} 
                placeholder={"답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요."} 
                onChange={(value) => handleInputChange('content', value)}
            />
            {!formValues.content.trim() && <HelperText>내용 입력이 필요합니다.</HelperText>}
            <ImageUploader onChange={(value) => handleInputChange('images', value)}/>
            <StyledDiv>
                <span>일정 포인트를 자동으로 지급해줘요.</span>
            </StyledDiv>
            {/* <CheckBar text={'A 이상의 답변만 받고 싶어요.'}/>
            <Condition>
                <span style={{fontSize: '10px', color: '#D00303', marginLeft: '20px'}}>100p 이상 입력해야 조건을 제시할 수 있습니다.</span>
            </Condition> */}
            <Button 
                label={'등록하기'} 
                width={'380px'} 
                style={{marginTop: '15px'}} 
                onClick={handleFormSubmit}
                disabled={!isFormValid}
            />
        </Wrapper>
    )
}

export default PostQuestionPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;

const Condition = styled.div`
    display: flex;
    align-items: center;
    width: 380px;
`

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    width: 380px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    color: #434B60;
    background-color: #F0F2F4;

    margin-top: 10px;
`

const HelperText = styled.span`
    color: #D00303;
    font-size: 10px;
    margin-top: 5px;
    display: flex;
`;