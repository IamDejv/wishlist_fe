import axios from "axios";

export const axiosInstance = async () => {
	const options = {};

	const instance = axios.create(options);

	instance.interceptors.response.use(
		(response) => {
			console.log("Done");
			return response;
		},
		(error) => {
			console.log(error);
			return Promise.reject(error);
		}
	);

	return instance;
};
