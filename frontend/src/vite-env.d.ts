interface ImportMetaEnv {
	readonly VITE_API_URL_DEV: string;
	readonly VITE_API_URL_PROD: string;
}

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
