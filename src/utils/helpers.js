export function leadingSlash(str) {
	return str.startsWith("/") ? str : "/" + str;
}

export function trailingSlash(str) {
	return str.endsWith("/") ? str : str + "/";
}

export const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

export function addQueryParams(filters, url) {
	url += "?";
	Object.keys(filters).forEach((key) => {
		filters[key].forEach((value) => {
			url += `${key}=${value}&`;
		});
	});

	return url;
}
