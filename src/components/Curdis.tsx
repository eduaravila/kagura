import React, { useEffect, useState } from 'react';

interface Props {
  PAGE_ID: string;
  PAGE_URL: string;
  PAGE_TITLE: string;
}
function ReactCusdis(props: {
  attrs: {
    host: string,
    appId: string,
    pageId: string,
    pageTitle?: string,
    pageUrl?: string,
    theme?: 'light' | 'dark' | 'auto',
  },
  lang?: string,
  style?: React.CSSProperties
}) {

  const divRef = React.useRef<HTMLDivElement>(null)

  const host = props.attrs.host || 'https://cusdis.com'

  React.useLayoutEffect(() => {
    // @ts-expect-error
    const render = window.renderCusdis
    if (render) {
      render(divRef.current)
    }
  }, [
    props.attrs.appId,
    props.attrs.host,
    props.attrs.pageId,
    props.attrs.pageTitle,
    props.attrs.pageUrl,
    props.lang
  ])

  return (
    <>
      <div
        id="cusdis_thread"
        data-host={host}
        data-page-id={props.attrs.pageId}
        data-app-id={props.attrs.appId}
        data-page-title={props.attrs.pageTitle}
        data-page-url={props.attrs.pageUrl}
        data-theme={props.attrs.theme}
        style={props.style}
        ref={divRef}
      >

      </div>
    </>
  )
}



export default function ({ PAGE_ID, PAGE_URL, PAGE_TITLE }: Props) {
  function getThemePreference(): string {
    if (typeof window === "undefined" || typeof localStorage){
      return "light";
    }

    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") as string;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  const [theme, setTheme] = useState< "light" | "dark" | "auto">( getThemePreference() as "light" | "dark" | "auto");
    const handleLocalStorage = () => {
      window.dispatchEvent(new Event("storage"));
      setTheme(getThemePreference() as "light" | "dark" | "auto");
    }

  useEffect(() => {

    window.addEventListener("storage", handleLocalStorage);

    return () => {
      window.removeEventListener("storage", handleLocalStorage);
    }
  },[theme, setTheme])

  return <div className="font-light mt-14">
    <ReactCusdis
    attrs={{
      host: "https://cusdis.com",
      appId: "4da780ff-6c97-43c9-8267-c97634af20c6",
      pageId: PAGE_ID,
      pageTitle: PAGE_TITLE,
      pageUrl: PAGE_URL,
      theme: theme,
    }}
    />
  </div>
}
