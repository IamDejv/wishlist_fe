import axios from "axios";
import auth from "@/mixins/auth";

export const axiosInstance = async () => {
	const token = await auth.methods.getTokenResult();
	const options = {
		headers: {
			Authentication: token,
		},
	};

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
