import CONST from "@/consts";
import router from "@/router";
import auth from "@/mixins/auth";

async function getErrorsFromResponse(data) {
	let error = "Něco se pokazilo";
	switch (data.code) {
		case "NOT_REGISTERED":
			error = "Je potřeba se zaregistrovat";
			break;
		case "TOKEN_EXPIRED":
			error = "Vypršela platnost přihlášení";
			break;
		case "NOT_AUTHENTICATED":
			error = "Nejsete přihlášen";
			break;
		default:
	}

	return error || "Něco se pokazilo";
}

async function getToken() {
	return auth.methods.getTokenResult();
}

export const getResponseJSON = async (response) => {
	const success = response.status < 400;
	const unauthorized = response.status === 401;
	const forbidden = response.status === 403;
	const notFound = response.status === 404;
	const noContent = response.status === 204;
	const created = response.status === 201;

	if (noContent || created) {
		return { data: null, status: response.status };
	}

	if (forbidden) {
		throw new Error("Nemáte právo na tuto akci");
	}
	const data = await response.json();

	if (unauthorized) {
		switch (data.code) {
			case "NOT_REGISTERED":
				router.push({ name: "SignUp" });
				break;
			case "TOKEN_EXPIRED":
				if (JSON.parse(localStorage.getItem("staySigned"))) {
					await auth.methods.getLoggedUser().getIdToken(true);
				} else {
					auth.methods.signOut();
					router.push({ name: "Login" });
				}
				break;
			case "NOT_AUTHENTICATED":
				router.push({ name: "Login" });
				break;
			default:
				router.push({ name: "SignOut" });
				throw new Error("Nejste autentikován");
		}
	}

	if (notFound) {
		throw new Error(response.message || response.statusText);
	}

	if (success) {
		return { data, status: response.status };
	}

	throw new Error(await getErrorsFromResponse(data));
};

export const fetcher = async ({ uri, auth = true, method, body, contentType }) => {
	let url = "";
	if (auth) {
		url = `${CONST.API}/${uri}`;
	} else {
		url = `${CONST.API}/public/${uri}`;
	}

	let headers = {};

	headers = {
		"Content-Type": contentType || "application/json;charset=utf-8",
	};
	await getToken().then(({ token }) => {
		headers.Authentication = token;
	});

	const config = { headers };

	if (method) {
		config.method = method;
	}

	if (body) {
		config.body = JSON.stringify(body);
	}

	const response = await fetch(url, config);

	return getResponseJSON(response);
};

export const upload = async ({ uri, body, contentType }) => {
	const url = `${CONST.API}/${uri}`;

	let headers = {};

	headers = {
		"Content-Type": `${contentType};charset=utf-8` || "application/json;charset=utf-8",
	};
	await getToken().then(({ token }) => {
		headers.Authentication = token;
	});

	const config = { headers };

	config.method = "PUT";

	config.body = body;

	const response = await fetch(url, config);

	return getResponseJSON(response);
};
