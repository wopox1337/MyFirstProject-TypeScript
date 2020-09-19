import axios from 'axios';

const instance = axios.create({
    baseURL: "https://reqres.in/api/",
});

export const usersAPI = {
    async getUsers(currentPage = 1) {
        const response = await instance.get(`users?page=${currentPage}`);
        return response.data;
    }
}
