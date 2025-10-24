// Allow importing CSS files (global side-effect imports and CSS modules)
declare module '*.css' {
	export { };
}
declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}
declare module '*.scss' {
	export { };
}
declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}
declare module '*.sass' {
	export { };
}
declare module '*.module.sass' {
	const classes: { [key: string]: string };
	export default classes;
}

export { };
