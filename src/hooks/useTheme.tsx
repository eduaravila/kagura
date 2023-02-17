import { useState } from "react";

const useTheme = () => {
	function getThemePreference(): string {
		if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
			return localStorage.getItem("theme") as string;
		}
		if (typeof window === "undefined" || !window.matchMedia) {
			return "light";
		}
		return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	const [theme] = useState<"light" | "dark" | "auto">(
		getThemePreference() as "light" | "dark" | "auto"
	);

	return theme;
};
export default useTheme;
