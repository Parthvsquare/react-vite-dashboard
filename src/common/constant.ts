const API_BASE_URL: string = import.meta.env.VITE_BASE_API_DOMAIN;
const DEBUG: string = process.env.NODE_ENV === "development" ? "true" : "false";

export { API_BASE_URL, DEBUG };
