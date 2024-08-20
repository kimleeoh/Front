import axios from "axios";

const BaseAxios = axios.create({
    baseURL: 'http://localhost:4501',
});

export default BaseAxios;