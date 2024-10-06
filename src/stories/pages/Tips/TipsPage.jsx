import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Tips from "./Tips";
import FixedIcon from "../../components/Common/FixedIcon";
import NavBar from "../../components/NavBar";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import ChipFilter from "../../components/Common/ChipFilter";
import BaseAxios from "../../../axioses/BaseAxios";

const initialTipsData = [
    {
        _id: "48578979aeb59a6b4e9668",
        name: "김난슬",
        major: "글로벌미디어학부",
        subject: "디지털미디어원리",
        title: "디미원 전공책 150 페이지 필기본 올립니다",
        content: "학생분들에게 도움이 되길 바랍니다",
        time: "2024-08-12T10:21:34.123Z",
        views: 30,
        like: 24,
        img: ["/Icons/1607-2.jpg", "/Icons/22376525_6628724.jpg"],
        filter: "필기공유",
    },
    {
        _id: "789516539dib587bb4e9w88",
        name: "오준우",
        major: "글로벌미디어학부",
        subject: "컴퓨터시스템개론",
        title: "OOO교수님 수업",
        content: "+ 항상 채워주십니다. 진짜 최고예요 ㅠㅠ",
        time: "2024-08-13T10:21:34.123Z",
        views: 88,
        like: 18,
        img: "/Icons/1607-2.jpg",
        filter: "수업꿀팁",
    },
    {
        _id: "1297268189apq577bb4e609e",
        Rfile: "19dfjakdf35gdi45892949",
        Rnotifyusers_list: [],
        Ruser: "5029ajd295anlf391030de",
        content:
            "숭실대 건물들 화장실의 등급을 나눠봤습니다. 이용하실 때 참고 바랍니다.",
        help_good: 45,
        point: 0,
        preview_img: "/Icons/1607-2.jpg",
        time: "2024-08-14T05:45:30.246Z",
        title: "숭실대 화장실 등급",
        views: 30,
        warn: 0,
        filter: "수업꿀팁",

        name: "이예진",
        major: "글로벌미디어학부",
        subject: "화장실론",
        title: "숭실대 화장실 등급",
        content:
            "숭실대 건물들 화장실의 등급을 나눠봤습니다. 이용하실 때 참고 바랍니다.",
        time: "2024-08-14T05:45:30.246Z",
        views: 30,
        like: 45,
        img: "/Icons/1607-2.jpg",
        filter: "수업꿀팁",
    },
    // {
    //     _id: "66adba28edf9ee3930e54570",
    //     Rfile: "66adbacbd44fdc72c7e842bc",
    //     Rnotifyusers_list: [],
    //     Ruser: "66adbab3d44fdc72c7e842bb",
    //     content: "어쩌구",
    //     help_good: 0,
    //     point: 0,
    //     preview_img: "",
    //     time: "2024-12-31T15:00:00.000Z",
    //     title: "제목",
    //     views: 0,
    //     warn: 0
    // }
];

const TipsPage = () => {
    const [TipsData, setTipsData] = useState([]);

    useEffect(() => {
        // // Load TipsData from localStorage or initialize it
        // localStorage.removeItem("TipsData");
        // const TipsData = localStorage.getItem("TipsData");
        // if (TipsData) {
        //   setTipsData(JSON.parse(TipsData));
        //   setFilteredTips(JSON.parse(TipsData)); // Initialize filteredTips with all tips
        // } else {
        //   localStorage.setItem("TipsData", JSON.stringify(initialTipsData));
        //   setTipsData(initialTipsData);
        //   setFilteredTips(initialTipsData); // Initialize filteredTips with all tips
        // }

        fetchChips([""]);
    }, []);

    useEffect(() => {
        console.log("Updated TipsData:", TipsData);
    }, [TipsData]);

    const fetchChips = async (filters) => {
        try {
            const filtersArray = Array.isArray(filters) ? filters : [filters];

            console.log("Sending request with data:", {
                filters: filtersArray,
            });

            const response = await BaseAxios.post("/api/bulletin/tips", {
                filters: filtersArray,
            });
            setTipsData(response.data);
        } catch (error) {
            console.error("Error fetching question data:", error);
        }
    };

    const handleFilterChange = (activeChips) => {
        if (activeChips.length === 0) {
            fetchChips([""]);
        } else {
            fetchChips(activeChips);
        }
    };

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="Tips"
                backButton={false}
                searchButton={true}
            />
            <ChipFilter
                onFilterChange={handleFilterChange}
                marginTop={"10px"}
            />
            {TipsData.map((tip) => (
                <Tips
                    _id={tip._id}
                    Ruser={tip.Ruser}
                    title={tip.title}
                    content={tip.content}
                    preview_img={tip.preview_img}
                    likes={tip.likes}
                    point={tip.point}
                    views={tip.views}
                    time={tip.time}
                    // img={Array.isArray(tip.img) ? tip.img[0] : tip.img} // Only the first image
                    // name={tip.name}
                    // major={tip.major}
                    // subject={tip.subject}
                />
            ))}
            <FixedIcon src="/Icons/Pen.svg" url={"/tips/post"} />
            <FixedBottomContainer>
                <NavBar state="Tips" />
            </FixedBottomContainer>
        </Wrapper>
    );
};

export default TipsPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 130px;
    margin-bottom: 100px;
    width: 100%;
`;
