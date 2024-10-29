const Convert = (selectedYear, selectedTerm) => {
    const yearMapping = {
        "2018": 0,
        "2019": 2,
        "2020": 4,
        "2021": 6,
        "2022": 8,
        "2023": 10,
        "2024": 12,
    };
    const termMapping = {
        "1": 0,
        "2": 1,
    };
    const result = yearMapping[selectedYear] + termMapping[selectedTerm];
    return result;
};

export default Convert;
