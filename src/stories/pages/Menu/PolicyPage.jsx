import React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import useWindowSize from '../../components/Common/WindowSize';

const PolicyPage = () => {
  const {width: windowSize} = useWindowSize();

  return (
    <PageContainer>
      <Header text='운영정책' searchButton={false}/>
      <Content maxWidth={windowSize}>
        <Title>A-F Killer 운영정책</Title>
      </Content>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
  gap: 20px;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
`;

const Content = styled.div`
  text-align: left;
  font-size: 14px;
  line-height: 1.6;
  width: 100%;
  max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 40px;
`;

export default PolicyPage;