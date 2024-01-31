import axios from 'axios';

// const store = useAuthStore();

const url = import.meta.env.VITE_AUTH_API_URL;
const token = localStorage.getItem('token');

const globalResponseHandler = response => response;

const globalErrorHandler = (error) => {
	const status = error.response.status;
	const isTokenExpired = status === 401;
	if (isTokenExpired || token === undefined || token === null) {
		localStorage.removeItem('token');
		const originalRequest = error.config;
		delete originalRequest.headers.Authorization;
		window.location = '/login';
	}
	return Promise.reject(error);
};

const client = axios.create({
	baseURL: url,
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

// Add a response interceptor
client.interceptors.response.use(globalResponseHandler, globalErrorHandler);

export default client;
