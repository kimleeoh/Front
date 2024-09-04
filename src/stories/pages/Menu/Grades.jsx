import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button";
import BoardTitle from "../../components/Common/BoardTitle";
import SubjectList from "../../components/Common/SubjectList";

const Grades = () => {
    const navigate = useNavigate();
    const [subjectGrades, setSubjectGrades] = useState({});

    useEffect(() => {
        // 로컬 스토리지에서 과목 성적 불러오기
        const savedGrades = JSON.parse(localStorage.getItem("subjectGrades")) || {};
        setSubjectGrades(savedGrades);
    }, []);

    const handleVerifyClick = () => {
        navigate("/grades/verify");
    };

    return (
        <Wrapper>
            <Header text="내 성적" searchButton={false}>
                <Verify onClick={handleVerifyClick}>등록</Verify>
            </Header>
            <BoardTitle text="2024학년도 1학기" />
            <SubjectWrapper>
                <ScrollableSubjectList>
                    <SubjectList
                        subject={'디지털미디어원리'}
                        disableLink={true}
                        rate={subjectGrades['디지털미디어원리']}
                    />
                    <SubjectList
                        subject={'영상편집론'}
                        disableLink={true}
                        rate={subjectGrades['영상편집론']}
                    />
                    {/* ...다른 과목들도 추가 */}
                </ScrollableSubjectList>
            </SubjectWrapper>
            <BoardTitle text="2024학년도 2학기" />
            <SubjectWrapper>
                <ScrollableSubjectList>
                    <SubjectList
                        subject={'디지털미디어실습'}
                        disableLink={true}
                        rate={subjectGrades['디지털미디어실습']}
                    />
                    <SubjectList
                        subject={'영상기획론'}
                        disableLink={true}
                        rate={subjectGrades['영상기획론']}
                    />
                    {/* ...다른 과목들도 추가 */}
                </ScrollableSubjectList>
            </SubjectWrapper>
            <Button
                label={'+ 학기 추가하기'}
                width={'380px'}
                color={'#ACB2BB'}
                backgroundColor={'#F1F2F4'}
                hoverColor={'#ACB2BB'}
                hoverBackgroundColor={'#E5E9F2'}
                style={{ marginTop: '20px' }}
                onClick={() => navigate("/grades/register")}
            />
        </Wrapper>
    );
}

export default Grades;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f4;
    min-height: 100vh;
    position: relative;
    padding-top: 10px;
    padding-bottom: 100px;
`;

const SubjectWrapper = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 24px;
    margin-top: 10px;
`;

const ScrollableSubjectList = styled.div`
    width: 100%;
    max-height: 280px;
    overflow-y: auto;
`;

const Verify = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(172, 178, 187, 0.3);
  }

  &:active {
    scale: 0.95;
  }

  font-size: 16px;
  font-weight: bold;
  color: #434b60;
  text-align: center;
`;
