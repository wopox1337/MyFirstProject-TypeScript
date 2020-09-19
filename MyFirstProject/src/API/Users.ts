import axios from 'axios';

const instance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
});

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        const response = await instance.get(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    }
}