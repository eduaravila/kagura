import React from "react";
import useTheme from "src/hooks/useTheme";

interface Props {
	PAGE_ID: string;
	PAGE_URL: string;
	PAGE_TITLE: string;
}

function ReactCusdis(props: {
	attrs: {
		host: string;
		appId: string;
		pageId: string;
		pageTitle?: string;
		pageUrl?: string;
		theme?: "light" | "dark" | "auto";
	};
	lang?: string;
	style?: React.CSSProperties;
}) {
	const divRef = React.useRef<HTMLDivElement>(null);

	const host = props.attrs.host || "https://cusdis.com";

	React.useLayoutEffect(() => {
		// @ts-expect-error
		const render = window.renderCusdis;
		if (render) {
			render(divRef.current);
		}
	}, [
		props.attrs.appId,
		props.attrs.host,
		props.attrs.pageId,
		props.attrs.pageTitle,
		props.attrs.pageUrl,
		props.lang,
	]);

	return (
		<div
			id="cusdis_thread"
			className="mt-14 font-serif"
			data-host={host}
			data-page-id={props.attrs.pageId}
			data-app-id={props.attrs.appId}
			data-page-title={props.attrs.pageTitle}
			data-page-url={props.attrs.pageUrl}
			data-theme={props.attrs.theme}
			ref={divRef}
			style={{ fontFamily: "monospace" }}
		></div>
	);
}

export default function ({ PAGE_ID, PAGE_URL, PAGE_TITLE }: Props) {
	const theme = useTheme();

	return (
		<ReactCusdis
			attrs={{
				host: "https://cusdis.com",
				appId: "4da780ff-6c97-43c9-8267-c97634af20c6",
				pageId: PAGE_ID,
				pageTitle: PAGE_TITLE,
				pageUrl: PAGE_URL,
				theme,
			}}
		/>
	);
}
