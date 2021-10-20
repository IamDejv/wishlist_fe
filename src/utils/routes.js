// Imports
import { kebabCase } from "lodash";
import { leadingSlash, trailingSlash } from "@/utils/helpers";

export function abort(code = 404) {
	return {
		name: "FourOhFour",
		path: "*",
		component: () => error(code),
	};
}

export function error(code = 404) {
	return import(
		/* webpackChunkName: "error-[request]" */
		`@/views/${code}.vue`
	);
}

export function layout(layout = "Default", children, path = "", meta = {}, beforeEnter = null) {
	const dir = kebabCase(layout);

	return {
		children,
		component: () =>
			import(
				/* webpackChunkName: "layout-[request]" */
				`@/layouts/${dir}/Index`
			),
		path,
		meta,
		beforeEnter,
	};
}

export function redirect(path = "*", rhandler) {
	if (typeof path === "function") {
		rhandler = path;
		path = "*";
	}

	return {
		path,
		redirect: (to) => {
			const rpath = rhandler(to);
			const url = rpath !== "" ? leadingSlash(trailingSlash(rpath)) : rpath;

			return `/${url}`;
		},
	};
}

export function route(name, component, path = "", meta = {}, beforeEnter = null, children = []) {
	component = Object(component) === component ? component : { default: name.replace(" ", "") };

	const components = {};

	for (const [key, value] of Object.entries(component)) {
		components[key] = () =>
			import(
				/* webpackChunkName: "views-[request]" */
				`@/views/${value}`
			);
	}

	return {
		name,
		components,
		path,
		meta,
		beforeEnter,
		children,
	};
}
