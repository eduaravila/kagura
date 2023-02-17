import { StreamLanguage } from "@codemirror/language";
import { go } from "@codemirror/legacy-modes/mode/go";
import CodeMirror from "@uiw/react-codemirror";

import { useCallback, useState } from "react";
import useTheme from "src/hooks/useTheme";

interface props {
	children: React.ReactNode;
	defaultCode: string;
}

export default function ({ children, defaultCode }: props) {
	const [code, setCode] = useState(defaultCode);
	const theme = useTheme();
	const [result, setResult] = useState("");
	const runCode = async () => {
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams({
				code: code,
			}),
		};

		try {
			const res = await fetch(import.meta.env.PUBLIC_GOPLAYGROUND_API, options);
			const data = await res.json();
			if (data.Evetns !== null) {
				setResult(data.Errors);
			} else {
				setResult(data.Events[0].Message);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const onChange = useCallback((value: string) => {
		setCode(value);
	}, []);

	return (
		<div>
			<CodeMirror
				value={code}
				extensions={[StreamLanguage.define(go)]}
				onChange={onChange}
				height="200px"
				theme={theme}
			/>
			<button onClick={runCode}>Run</button>
			<div>{result}</div>
		</div>
	);
}
