import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
    response => response,
    (error) => {
        let errorMessage = 'An error occurred';

        if (error.response) {
            if (error.response.status === 401) {
                localStorage.removeItem('userInfo');
                errorMessage = error.response.data.message || 'Unauthorized access';
                // window.location.href = '/login';
            } else if (error.response.status === 500) {
                errorMessage = error.response.data.message || 'Internal server error';
            } else {
                errorMessage = error.response.data.message || error.response.statusText;
            }
            console.error(error.response.data);
        } else if (error.request) {
            errorMessage = 'No response received from server';
            console.error(error.request);
        } else {
            errorMessage = error.message;
        }

        return Promise.reject({ message: errorMessage, ...error });
    }
);

export default axiosInstance;