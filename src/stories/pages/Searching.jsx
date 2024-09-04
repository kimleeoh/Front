import react from "react"
import styled from "styled-components"
import Header from "../components/Header"
import SearchField from "../components/Common/SearchField"

const Searching = () => {
    return (
        <Wrapper>
            <Header text="" searchButton={false}>
            <SearchField placeholder="검색어를 입력하세요" width="300px" onSearch={(query) => console.log(query)} />
                <div style={{ padding:'10px'}}/>
            </Header>
        </Wrapper>
    )
}

export default Searching

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
`;

