const API_HOST = process.env.VUE_APP_API_HOST || "https://localhost:443"
const API_PREFIX = process.env.VUE_APP_API_PREFIX || "/api/v1"
const API = API_HOST + API_PREFIX

export default {
	API_HOST,
	API_PREFIX,
	API,
}
